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
import { coletarContexto } from "./contexto";

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
};

const AssistenteCtx = createContext<Ctx | null>(null);
const CHAVE = "python-do-zero:chat";

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
