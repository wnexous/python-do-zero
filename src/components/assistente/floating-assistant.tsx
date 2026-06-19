"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  ImagePlus,
  Trash2,
  Loader2,
  GraduationCap,
  Sparkles,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  SwitchCamera,
} from "lucide-react";
import { useAssistente } from "./provider";
import { Markdown } from "./markdown";
import { Quadro } from "./quadro";
import { cn } from "@/lib/utils";

export function FloatingAssistant() {
  const { aberto, abrir, fechar, chamadaStatus, quadro, fecharQuadro } =
    useAssistente();
  const emChamada =
    chamadaStatus === "connecting" ||
    chamadaStatus === "live" ||
    chamadaStatus === "erro";
  const mostrarLauncher = !aberto && !emChamada;

  return (
    <>
      {/* botão flutuante */}
      <AnimatePresence>
        {mostrarLauncher && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={abrir}
            aria-label="Falar com o professor"
            className="fixed bottom-5 right-4 z-[60] flex h-14 items-center gap-2 rounded-full bg-primary pl-4 pr-5 text-primary-foreground shadow-lg shadow-primary/25 sm:bottom-6 sm:right-6"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
          >
            <span className="relative flex size-7 items-center justify-center">
              <GraduationCap className="size-6" />
              <motion.span
                className="absolute -right-1 -top-1 size-2.5 rounded-full bg-rose"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </span>
            <span className="text-sm font-semibold">Professor</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* painel de chat (escondido durante a ligação) */}
      <AnimatePresence>
        {aberto && !emChamada && <Painel onFechar={fechar} />}
      </AnimatePresence>

      {/* dock da ligação ao vivo (deixa a página visível e interativa) */}
      <AnimatePresence>{emChamada && <CallDock />}</AnimatePresence>

      {/* quadro/lousa que o professor desenha */}
      <AnimatePresence>
        {quadro && <Quadro dados={quadro} onFechar={fecharQuadro} />}
      </AnimatePresence>
    </>
  );
}

function Painel({ onFechar }: { onFechar: () => void }) {
  const { mensagens, enviar, enviando, limpar, pegarContexto, iniciarChamada } =
    useAssistente();
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ctx = pegarContexto();

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensagens]);

  function escolherImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagem(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function mandar() {
    if ((!texto.trim() && !imagem) || enviando) return;
    const t = texto;
    const img = imagem;
    setTexto("");
    setImagem(undefined);
    await enviar(t, img);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed inset-x-0 bottom-0 z-[60] flex h-[88dvh] flex-col overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:max-h-[85dvh] sm:w-[400px] sm:rounded-2xl"
    >
      {/* cabeçalho */}
      <header className="flex items-center gap-3 border-b border-border bg-secondary/30 px-4 py-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
          <GraduationCap className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            Professor Pyto <span className="text-base">🐍</span>
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {ctx.licaoTitulo ? `vendo: ${ctx.licaoTitulo}` : "tira-dúvidas de Python"}
          </p>
        </div>
        <button
          onClick={() => iniciarChamada(false)}
          aria-label="Ligar pro professor"
          className="flex h-9 items-center gap-1.5 rounded-lg bg-primary/15 px-2.5 text-primary transition-colors hover:bg-primary/25"
        >
          <Phone className="size-[18px]" />
          <span className="text-xs font-semibold">Ligar</span>
        </button>
        {mensagens.length > 0 && (
          <button
            onClick={limpar}
            aria-label="Limpar conversa"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Trash2 className="size-[18px]" />
          </button>
        )}
        <button
          onClick={onFechar}
          aria-label="Fechar"
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="size-5" />
        </button>
      </header>

      {/* mensagens */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {mensagens.length === 0 && <BoasVindas />}
        {mensagens.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px]",
                m.role === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-secondary text-foreground"
              )}
            >
              {m.imagem && m.imagem.startsWith("data:") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.imagem}
                  alt="imagem enviada"
                  className="mb-2 max-h-44 w-auto rounded-lg"
                />
              )}
              {m.role === "model" ? (
                m.texto ? (
                  <Markdown texto={m.texto} />
                ) : (
                  <Digitando />
                )
              ) : (
                <span className="whitespace-pre-wrap break-words">{m.texto}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* preview da imagem escolhida */}
      {imagem && (
        <div className="flex items-center gap-2 border-t border-border px-4 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagem} alt="prévia" className="size-12 rounded-lg object-cover" />
          <span className="flex-1 text-xs text-muted-foreground">
            Foto pronta pra enviar
          </span>
          <button
            onClick={() => setImagem(undefined)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remover foto"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* barra de entrada */}
      <div
        className="flex items-end gap-2 border-t border-border bg-background px-3 py-2.5"
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={escolherImagem}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Anexar foto"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ImagePlus className="size-5" />
        </button>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              mandar();
            }
          }}
          rows={1}
          placeholder="Pergunta o que quiser..."
          className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/40"
        />
        <button
          onClick={mandar}
          disabled={(!texto.trim() && !imagem) || enviando}
          aria-label="Enviar"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all active:scale-90 disabled:opacity-40"
        >
          {enviando ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
        </button>
      </div>
    </motion.div>
  );
}

function BoasVindas() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-3xl">
        🐍
      </span>
      <p className="font-serif text-lg text-foreground">Oi! Eu sou o Pyto 👋</p>
      <p className="max-w-[260px] text-sm text-muted-foreground">
        Sou seu professor particular de Python. Pode me perguntar{" "}
        <strong className="text-foreground">qualquer coisa</strong> sobre o que tá
        estudando — e até mandar uma <strong className="text-foreground">foto</strong>{" "}
        de um código ou erro que você não entendeu.
      </p>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Sparkles className="size-3" /> eu sei em qual parte da lição você está
      </div>
    </div>
  );
}

function Digitando() {
  return (
    <div className="flex gap-1 py-1">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
        />
      ))}
    </div>
  );
}


function CallDock() {
  const {
    chamadaStatus,
    chamadaMsg,
    mudo,
    cameraLigada,
    camStream,
    falaProfessor,
    encerrarChamada,
    toggleMudoChamada,
    toggleCameraChamada,
    virarCamera,
    pegarContexto,
  } = useAssistente();
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctx = pegarContexto();

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = camStream;
  }, [camStream]);

  const conectando = chamadaStatus === "connecting";
  const erro = chamadaStatus === "erro";

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-primary/30 bg-background/95 backdrop-blur-md"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-2xl px-3 pt-2.5">
        {/* linha de status + legenda + câmera */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold">
              <span
                className={cn(
                  "size-2 rounded-full",
                  erro
                    ? "bg-destructive"
                    : conectando
                      ? "bg-sun"
                      : "bg-primary"
                )}
              />
              <motion.span
                animate={!erro && !conectando ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1.4, repeat: Infinity }}
                className={erro ? "text-destructive" : "text-foreground"}
              >
                {erro ? "ligação falhou" : conectando ? "conectando..." : "Pyto ao vivo 🐍"}
              </motion.span>
              <span className="truncate text-muted-foreground">
                · {ctx.licaoTitulo ?? "Python do Zero"}
              </span>
            </p>
            <p className="mt-1 line-clamp-2 min-h-[2.5em] text-[13px] leading-snug text-foreground/80">
              {erro
                ? chamadaMsg ?? "Algo deu errado."
                : conectando
                  ? "abrindo a ligação, libera o microfone 🎤"
                  : falaProfessor || "tô te ouvindo — pode falar e me pedir o que quiser 😊"}
            </p>
          </div>
          {cameraLigada && camStream && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-16 w-12 -scale-x-100 rounded-lg border border-border object-cover"
            />
          )}
        </div>

        {/* controles */}
        <div className="mt-2 flex items-center justify-center gap-2.5 pb-1">
          {!erro && (
            <>
              <CtrlBtn
                ativo={!mudo}
                onClick={toggleMudoChamada}
                titulo={mudo ? "Ativar microfone" : "Mutar microfone"}
              >
                {mudo ? <MicOff className="size-5" /> : <Mic className="size-5" />}
              </CtrlBtn>
              <CtrlBtn
                ativo={cameraLigada}
                onClick={toggleCameraChamada}
                titulo={cameraLigada ? "Desligar câmera" : "Ligar câmera"}
              >
                {cameraLigada ? (
                  <Video className="size-5" />
                ) : (
                  <VideoOff className="size-5" />
                )}
              </CtrlBtn>
              {cameraLigada && (
                <CtrlBtn ativo={false} onClick={virarCamera} titulo="Virar câmera">
                  <SwitchCamera className="size-5" />
                </CtrlBtn>
              )}
            </>
          )}
          <button
            onClick={encerrarChamada}
            aria-label="Encerrar ligação"
            className="flex h-12 items-center gap-2 rounded-full bg-destructive px-5 text-white shadow-md shadow-destructive/30 transition-transform active:scale-90"
          >
            <PhoneOff className="size-5" />
            <span className="text-sm font-semibold">
              {erro ? "Fechar" : "Encerrar"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CtrlBtn({
  children,
  ativo,
  onClick,
  titulo,
}: {
  children: React.ReactNode;
  ativo: boolean;
  onClick: () => void;
  titulo: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={titulo}
      title={titulo}
      className={cn(
        "flex size-12 items-center justify-center rounded-full border transition-all active:scale-90",
        ativo
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-border bg-secondary text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
}
