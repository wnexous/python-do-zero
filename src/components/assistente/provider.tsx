"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { useProgresso } from "@/components/progress-provider";
import { coletarContexto, coletarVisivel, type ContextoPagina } from "./contexto";
import { LiveSessao, type StatusChamada } from "./live-client";

export type ChatMsg = {
  id: string;
  role: "user" | "model";
  texto: string;
  imagem?: string; // dataURL (só em memória, não persiste)
  pendente?: boolean;
};

type Ctx = {
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
  mensagens: ChatMsg[];
  enviando: boolean;
  enviar: (texto: string, imagemDataUrl?: string) => Promise<void>;
  limpar: () => void;
  pegarContexto: () => ReturnType<typeof coletarContexto>;

  // ligação ao vivo
  chamadaStatus: StatusChamada;
  chamadaMsg?: string;
  mudo: boolean;
  cameraLigada: boolean;
  camStream: MediaStream | null;
  falaProfessor: string;
  iniciarChamada: (comCamera?: boolean) => Promise<void>;
  encerrarChamada: () => Promise<void>;
  toggleMudoChamada: () => void;
  toggleCameraChamada: () => Promise<void>;
};

const AssistenteCtx = createContext<Ctx | null>(null);
const CHAVE = "python-do-zero:chat";

function montarPersonaVoz(ctx: ContextoPagina): string {
  const partes: string[] = [
    `Você é o "Pyto", um professor de Python super gente boa numa LIGAÇÃO DE VOZ ao vivo com um aluno que está começando do zero (nível "explica pra criança").`,
    `Regras da ligação:`,
    `- Fale em português do Brasil, de forma NATURAL e curta, como numa conversa de telefone. Nada de textão nem de ficar listando item por item — é voz.`,
    `- Seja caloroso, paciente e bem-humorado. Pode rir, brincar um pouco. NUNCA seja grosso ou arrogante.`,
    `- Explique do jeito mais simples possível, com analogias do dia a dia. Faça pausas, pergunte se ele entendeu.`,
    `- Fique no nível básico (print, variáveis, tipos, strings, números, input, if, match/case, loops, listas, tuplas).`,
    `- Se o aluno mostrar a CÂMERA (um código no papel/tela, um caderno), comente o que está vendo e ajude.`,
    `- VISÃO DA TELA: você recebe, em tempo real, mensagens começando com "[TELA AGORA]" que descrevem EXATAMENTE o que está visível na tela do aluno neste momento (a seção e o texto que ele está lendo). Elas se atualizam quando ele rola a página ou troca de lição.`,
    `- Quando o aluno perguntar algo como "o que está na minha tela?", "o que tô vendo?" ou "me explica isso aqui", você SIM tem essa informação: responda com base na ÚLTIMA mensagem "[TELA AGORA]" que recebeu. NUNCA diga que não sabe o que está na tela.`,
    `- Nunca leia as mensagens "[TELA AGORA]" em voz alta nem comente que recebeu uma — use-as só como seus olhos.`,
  ];
  if (ctx.licaoTitulo) partes.push(`\nAgora o aluno está na lição: "${ctx.licaoTitulo}".`);
  if (ctx.secaoVisivel) partes.push(`Seção visível na tela: "${ctx.secaoVisivel}".`);
  if (ctx.progresso) partes.push(`Progresso: ${ctx.progresso}.`);
  if (ctx.licaoTexto)
    partes.push(`\nConteúdo da lição (pra você ter o assunto na mão):\n"""${ctx.licaoTexto.slice(0, 5000)}"""`);
  partes.push(`\nCumprimente rapidinho e pergunte no que pode ajudar.`);
  return partes.join("\n");
}

let _id = 0;
function novoId() {
  _id += 1;
  return `${Date.now().toString(36)}-${_id}`;
}

export function AssistenteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { concluidas } = useProgresso();
  const concluidasRef = useRef(0);
  concluidasRef.current = concluidas.size;

  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<ChatMsg[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // ---- ligação ao vivo ----
  const sessaoRef = useRef<LiveSessao | null>(null);
  const [chamadaStatus, setChamadaStatus] = useState<StatusChamada>("idle");
  const [chamadaMsg, setChamadaMsg] = useState<string | undefined>();
  const [mudo, setMudo] = useState(false);
  const [cameraLigada, setCameraLigada] = useState(false);
  const [camStream, setCamStream] = useState<MediaStream | null>(null);
  const [falaProfessor, setFalaProfessor] = useState("");

  // carrega conversa salva
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) {
        const arr = JSON.parse(raw) as ChatMsg[];
        if (Array.isArray(arr)) setMensagens(arr);
      }
    } catch {
      /* primeira visita */
    }
    setCarregado(true);
  }, []);

  // salva conversa (sem o blob da imagem, pra não estourar o localStorage)
  useEffect(() => {
    if (!carregado) return;
    try {
      const enxuto = mensagens
        .filter((m) => !m.pendente)
        .map(({ id, role, texto, imagem }) => ({
          id,
          role,
          texto,
          imagem: imagem ? "[imagem enviada]" : undefined,
        }));
      localStorage.setItem(CHAVE, JSON.stringify(enxuto.slice(-40)));
    } catch {
      /* sem espaço — tudo bem */
    }
  }, [mensagens, carregado]);

  const pegarContexto = useCallback(
    () => coletarContexto(pathname || "/", concluidasRef.current),
    [pathname]
  );

  const enviar = useCallback(
    async (texto: string, imagemDataUrl?: string) => {
      const limpo = texto.trim();
      if ((!limpo && !imagemDataUrl) || enviando) return;

      const idUser = novoId();
      const idBot = novoId();
      const userMsg: ChatMsg = {
        id: idUser,
        role: "user",
        texto: limpo,
        imagem: imagemDataUrl,
      };
      const botMsg: ChatMsg = { id: idBot, role: "model", texto: "", pendente: true };

      // histórico que vai pra API (antes de adicionar o placeholder do bot)
      const historico = [...mensagens, userMsg].map((m) => ({
        role: m.role,
        texto: m.texto,
      }));

      setMensagens((prev) => [...prev, userMsg, botMsg]);
      setEnviando(true);

      // separa mime + base64 da imagem
      let imagem: { data: string; mime: string } | null = null;
      if (imagemDataUrl) {
        const match = imagemDataUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (match) imagem = { mime: match[1], data: match[2] };
      }

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensagens: historico,
            imagem,
            contexto: pegarContexto(),
          }),
        });

        if (!res.ok || !res.body) {
          const txt = await res.text().catch(() => "");
          setMensagens((prev) =>
            prev.map((m) =>
              m.id === idBot
                ? {
                    ...m,
                    pendente: false,
                    texto: txt || "Deu um probleminha aqui. Tenta de novo 🙏",
                  }
                : m
            )
          );
          return;
        }

        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setMensagens((prev) =>
            prev.map((m) =>
              m.id === idBot ? { ...m, texto: acc, pendente: true } : m
            )
          );
        }
        setMensagens((prev) =>
          prev.map((m) =>
            m.id === idBot
              ? { ...m, texto: acc || "(sem resposta)", pendente: false }
              : m
          )
        );
      } catch {
        setMensagens((prev) =>
          prev.map((m) =>
            m.id === idBot
              ? {
                  ...m,
                  pendente: false,
                  texto: "Sem conexão com a IA. Tenta de novo daqui a pouco.",
                }
              : m
          )
        );
      } finally {
        setEnviando(false);
      }
    },
    [enviando, mensagens, pegarContexto]
  );

  const limpar = useCallback(() => {
    setMensagens([]);
    try {
      localStorage.removeItem(CHAVE);
    } catch {
      /* noop */
    }
  }, []);

  // ---- ligação ----
  const iniciarChamada = useCallback(
    async (comCamera = false) => {
      if (sessaoRef.current) return;
      setFalaProfessor("");
      setChamadaMsg(undefined);
      setMudo(false);

      const sess = new LiveSessao({
        onStatus: (s, msg) => {
          setChamadaStatus(s);
          if (msg) setChamadaMsg(msg);
          if (s === "idle" || s === "erro") {
            sessaoRef.current = null;
            setCameraLigada(false);
            setCamStream(null);
          }
        },
        onFalaProfessor: (t) => setFalaProfessor((prev) => (prev + t).slice(-400)),
        onCameraStream: (st) => {
          setCamStream(st);
          setCameraLigada(!!st);
        },
      });
      sessaoRef.current = sess;

      const ctx = coletarContexto(pathname || "/", concluidasRef.current);
      await sess.iniciar(montarPersonaVoz(ctx), comCamera);
    },
    [pathname]
  );

  const encerrarChamada = useCallback(async () => {
    await sessaoRef.current?.encerrar();
    sessaoRef.current = null;
    setChamadaStatus("idle");
    setCameraLigada(false);
    setCamStream(null);
    setFalaProfessor("");
    setMudo(false);
  }, []);

  const toggleMudoChamada = useCallback(() => {
    const novo = sessaoRef.current?.toggleMudo() ?? false;
    setMudo(novo);
  }, []);

  const toggleCameraChamada = useCallback(async () => {
    const sess = sessaoRef.current;
    if (!sess) return;
    if (sess.cameraLigada) sess.desligarCamera();
    else await sess.ligarCamera();
  }, []);

  // VISÃO DA TELA EM TEMPO REAL durante a ligação:
  // manda pro professor o que está visível no viewport, atualizando quando o
  // aluno rola a página ou troca de lição (com dedupe pra não repetir igual).
  useEffect(() => {
    if (chamadaStatus !== "live") return;

    let ultimo = "";
    let timer: ReturnType<typeof setTimeout> | null = null;

    const enviarAgora = () => {
      const sess = sessaoRef.current;
      if (!sess) return;
      const desc = coletarVisivel(pathname || "/");
      if (!desc || desc === ultimo) return;
      ultimo = desc;
      sess.enviarContexto(`[TELA AGORA]\n${desc}`);
    };

    // manda o estado inicial assim que a ligação fica de pé
    const inicial = setTimeout(enviarAgora, 300);

    const aoRolar = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(enviarAgora, 600);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    // rede de segurança: revê de tempos em tempos (pega animações que revelam conteúdo)
    const intervalo = setInterval(enviarAgora, 4000);

    return () => {
      clearTimeout(inicial);
      if (timer) clearTimeout(timer);
      clearInterval(intervalo);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [pathname, chamadaStatus]);

  return (
    <AssistenteCtx.Provider
      value={{
        aberto,
        abrir: () => setAberto(true),
        fechar: () => setAberto(false),
        mensagens,
        enviando,
        enviar,
        limpar,
        pegarContexto,
        chamadaStatus,
        chamadaMsg,
        mudo,
        cameraLigada,
        camStream,
        falaProfessor,
        iniciarChamada,
        encerrarChamada,
        toggleMudoChamada,
        toggleCameraChamada,
      }}
    >
      {children}
    </AssistenteCtx.Provider>
  );
}

export function useAssistente() {
  const ctx = useContext(AssistenteCtx);
  if (!ctx) throw new Error("useAssistente precisa de <AssistenteProvider>");
  return ctx;
}
