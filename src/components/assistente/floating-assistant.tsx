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
} from "lucide-react";
import { useAssistente } from "./provider";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";

export function FloatingAssistant() {
  const { aberto, abrir, fechar } = useAssistente();

  return (
    <>
      {/* botão flutuante */}
      <AnimatePresence>
        {!aberto && (
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

      {/* painel */}
      <AnimatePresence>{aberto && <Painel onFechar={fechar} />}</AnimatePresence>
    </>
  );
}

function Painel({ onFechar }: { onFechar: () => void }) {
  const { mensagens, enviar, enviando, limpar, pegarContexto } = useAssistente();
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
