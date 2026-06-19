"use client";

import { GoogleGenAI, type Session } from "@google/genai";

// ============================================================================
// Cliente da Gemini Live API (ligação ao vivo com o professor).
//
// - pega um token efêmero em /api/live-token (a chave real fica no servidor)
// - captura o microfone em PCM 16kHz e manda em tempo real
// - toca o áudio (24kHz) que o professor responde
// - opcionalmente manda frames da câmera (1 quadro/seg)
// - injeta o contexto do que está na tela do aluno
// ============================================================================

export type StatusChamada = "idle" | "connecting" | "live" | "erro";

type Callbacks = {
  onStatus: (s: StatusChamada, msg?: string) => void;
  onFalaProfessor?: (texto: string) => void; // transcrição do que o professor diz
  onCameraStream?: (stream: MediaStream | null) => void;
};

function bufParaBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function base64ParaBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// toca pedaços de PCM 24kHz em sequência, sem buracos
class Reprodutor {
  private ctx: AudioContext;
  private proximo = 0;
  private fontes = new Set<AudioBufferSourceNode>();

  constructor() {
    this.ctx = new AudioContext({ sampleRate: 24000 });
  }
  async retomar() {
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }
  tocar(b64: string) {
    const bytes = base64ParaBytes(b64);
    const i16 = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
    const f32 = new Float32Array(i16.length);
    for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 0x8000;
    if (f32.length === 0) return;
    const buffer = this.ctx.createBuffer(1, f32.length, 24000);
    buffer.copyToChannel(f32, 0);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.connect(this.ctx.destination);
    const agora = this.ctx.currentTime;
    const inicio = Math.max(agora, this.proximo);
    src.start(inicio);
    this.proximo = inicio + buffer.duration;
    this.fontes.add(src);
    src.onended = () => this.fontes.delete(src);
  }
  limpar() {
    for (const s of this.fontes) {
      try {
        s.stop();
      } catch {
        /* já parou */
      }
    }
    this.fontes.clear();
    this.proximo = 0;
  }
  async fechar() {
    this.limpar();
    try {
      await this.ctx.close();
    } catch {
      /* noop */
    }
  }
}

export class LiveSessao {
  private cb: Callbacks;
  private session: Session | null = null;
  private micStream: MediaStream | null = null;
  private camStream: MediaStream | null = null;
  private inputCtx: AudioContext | null = null;
  private worklet: AudioWorkletNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private reprodutor: Reprodutor | null = null;
  private frameTimer: ReturnType<typeof setInterval> | null = null;
  private videoEl: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  public mudo = false;
  public cameraLigada = false;

  constructor(cb: Callbacks) {
    this.cb = cb;
  }

  async iniciar(systemInstruction: string, comCamera: boolean) {
    this.cb.onStatus("connecting");
    try {
      // 1) áudio e microfone PRIMEIRO, ainda dentro do gesto do usuário
      //    (alguns navegadores, tipo Safari, bloqueiam se vier depois de um await longo)
      this.reprodutor = new Reprodutor();
      await this.reprodutor.retomar();
      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
      });

      // 2) token efêmero
      const r = await fetch("/api/live-token", { method: "POST" });
      const data = await r.json();
      if (!r.ok || !data.token) {
        this.cb.onStatus("erro", data?.mensagem ?? "Não consegui abrir a ligação.");
        await this.encerrar();
        return;
      }
      const ai = new GoogleGenAI({
        apiKey: data.token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      // 3) conecta na Live API
      this.session = await ai.live.connect({
        model: data.model || "gemini-3.1-flash-live-preview",
        config: {
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: { parts: [{ text: systemInstruction }] },
        },
        callbacks: {
          onopen: () => {},
          onmessage: (m: unknown) => this.aoReceber(m),
          onerror: (e: { message?: string }) =>
            this.cb.onStatus("erro", e?.message ?? "Erro na ligação."),
          onclose: () => this.cb.onStatus("idle"),
        },
      });

      // 4) liga o microfone capturado no pipeline PCM 16kHz -> envia
      this.inputCtx = new AudioContext({ sampleRate: 16000 });
      if (this.inputCtx.state === "suspended") await this.inputCtx.resume();
      await this.inputCtx.audioWorklet.addModule("/assistente/capture-worklet.js");
      this.source = this.inputCtx.createMediaStreamSource(this.micStream);
      this.worklet = new AudioWorkletNode(this.inputCtx, "capture-processor");
      this.worklet.port.onmessage = (ev: MessageEvent<ArrayBuffer>) => {
        if (this.mudo || !this.session) return;
        this.session.sendRealtimeInput({
          audio: {
            data: bufParaBase64(ev.data),
            mimeType: "audio/pcm;rate=16000",
          },
        });
      };
      this.source.connect(this.worklet);
      // não conecta o worklet na saída (evita microfonia)

      if (comCamera) await this.ligarCamera();

      this.cb.onStatus("live");
    } catch (e) {
      console.error("[live] iniciar", e);
      const msg =
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "Precisa liberar o microfone pra ligação funcionar 🎤"
          : "Não consegui iniciar a ligação. Tenta de novo.";
      this.cb.onStatus("erro", msg);
      await this.encerrar();
    }
  }

  private aoReceber(m: unknown) {
    const msg = m as {
      data?: string;
      serverContent?: {
        modelTurn?: { parts?: Array<{ inlineData?: { data?: string }; text?: string }> };
        outputTranscription?: { text?: string };
        interrupted?: boolean;
      };
    };
    const sc = msg.serverContent;

    // o professor foi interrompido (aluno começou a falar) -> corta o áudio
    if (sc?.interrupted) this.reprodutor?.limpar();

    // áudio pode vir em message.data ou nas parts do modelTurn
    if (msg.data) this.reprodutor?.tocar(msg.data);
    const parts = sc?.modelTurn?.parts;
    if (parts) {
      for (const p of parts) {
        if (p.inlineData?.data) this.reprodutor?.tocar(p.inlineData.data);
      }
    }

    // legenda do que o professor falou
    const t = sc?.outputTranscription?.text;
    if (t && this.cb.onFalaProfessor) this.cb.onFalaProfessor(t);
  }

  async ligarCamera() {
    if (this.cameraLigada || !this.session) return;
    try {
      this.camStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
    } catch {
      return;
    }
    this.cameraLigada = true;
    this.cb.onCameraStream?.(this.camStream);

    this.videoEl = document.createElement("video");
    this.videoEl.srcObject = this.camStream;
    this.videoEl.muted = true;
    this.videoEl.playsInline = true;
    await this.videoEl.play().catch(() => {});
    this.canvas = document.createElement("canvas");

    // manda ~1 quadro por segundo
    this.frameTimer = setInterval(() => this.enviarFrame(), 1000);
  }

  desligarCamera() {
    this.cameraLigada = false;
    if (this.frameTimer) clearInterval(this.frameTimer);
    this.frameTimer = null;
    this.camStream?.getTracks().forEach((t) => t.stop());
    this.camStream = null;
    this.videoEl = null;
    this.cb.onCameraStream?.(null);
  }

  private enviarFrame() {
    if (!this.session || !this.videoEl || !this.canvas) return;
    const v = this.videoEl;
    if (!v.videoWidth) return;
    const c = this.canvas;
    c.width = 320;
    c.height = Math.round((v.videoHeight / v.videoWidth) * 320) || 240;
    const g = c.getContext("2d");
    if (!g) return;
    g.drawImage(v, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL("image/jpeg", 0.6);
    const base64 = dataUrl.split(",")[1];
    if (base64) {
      this.session.sendRealtimeInput({
        video: { data: base64, mimeType: "image/jpeg" },
      });
    }
  }

  /** avisa o professor do que o aluno está vendo agora (sem forçar resposta) */
  enviarContexto(texto: string) {
    if (!this.session) return;
    try {
      this.session.sendClientContent({
        turns: [{ role: "user", parts: [{ text: texto }] }],
        turnComplete: false,
      });
    } catch {
      /* noop */
    }
  }

  toggleMudo(): boolean {
    this.mudo = !this.mudo;
    return this.mudo;
  }

  async encerrar() {
    if (this.frameTimer) clearInterval(this.frameTimer);
    this.frameTimer = null;
    try {
      this.worklet?.disconnect();
      this.source?.disconnect();
    } catch {
      /* noop */
    }
    this.micStream?.getTracks().forEach((t) => t.stop());
    this.camStream?.getTracks().forEach((t) => t.stop());
    this.cb.onCameraStream?.(null);
    try {
      await this.inputCtx?.close();
    } catch {
      /* noop */
    }
    await this.reprodutor?.fechar();
    try {
      this.session?.close();
    } catch {
      /* noop */
    }
    this.session = null;
    this.micStream = null;
    this.camStream = null;
    this.inputCtx = null;
    this.worklet = null;
    this.source = null;
    this.reprodutor = null;
    this.videoEl = null;
    this.canvas = null;
    this.cameraLigada = false;
    this.mudo = false;
  }
}
