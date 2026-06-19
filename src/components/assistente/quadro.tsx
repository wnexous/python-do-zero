"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ArrowDown, PencilRuler } from "lucide-react";
import { CodeBlock } from "@/components/code/code-block";

export type QuadroDados =
  | { tipo: "vazio"; titulo?: string }
  | { tipo: "fluxo"; titulo?: string; passos: string[] }
  | { tipo: "passos"; titulo?: string; passos: string[] }
  | { tipo: "codigo"; titulo?: string; codigo: string; legenda?: string }
  | {
      tipo: "comparacao";
      titulo?: string;
      tituloA: string;
      itensA: string[];
      tituloB: string;
      itensB: string[];
    };

export function Quadro({
  dados,
  onFechar,
}: {
  dados: QuadroDados;
  onFechar: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm"
      onClick={onFechar}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-2xl"
      >
        <header className="flex items-center gap-2 border-b border-border bg-secondary/30 px-4 py-3">
          <PencilRuler className="size-[18px] text-primary" />
          <span className="flex-1 truncate font-serif text-lg text-foreground">
            {dados.titulo || "Quadro do professor"}
          </span>
          <button
            onClick={onFechar}
            aria-label="Fechar quadro"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-5">
          <Conteudo dados={dados} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Conteudo({ dados }: { dados: QuadroDados }) {
  if (dados.tipo === "vazio") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
        <motion.span
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl"
        >
          ✍️
        </motion.span>
        <p className="text-sm">O professor está preparando algo aqui...</p>
      </div>
    );
  }

  if (dados.tipo === "fluxo") {
    return (
      <div className="flex flex-col items-center gap-2">
        <AnimatePresence>
          {dados.passos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.25, type: "spring", stiffness: 250, damping: 20 }}
              className="flex w-full flex-col items-center"
            >
              <div className="w-full max-w-xs rounded-xl border-2 border-primary/50 bg-primary/[0.07] px-4 py-3 text-center text-sm text-foreground">
                {p}
              </div>
              {i < dados.passos.length - 1 && (
                <ArrowDown className="my-1 size-5 text-primary/70" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  if (dados.tipo === "passos") {
    return (
      <ol className="space-y-2.5">
        {dados.passos.map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
            className="flex items-start gap-3"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <span className="pt-0.5 text-[15px] text-foreground/90">{p}</span>
          </motion.li>
        ))}
      </ol>
    );
  }

  if (dados.tipo === "codigo") {
    return (
      <div>
        <CodeBlock code={dados.codigo} />
        {dados.legenda && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            💡 {dados.legenda}
          </motion.p>
        )}
      </div>
    );
  }

  // comparação
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { t: dados.tituloA, itens: dados.itensA, cor: "primary" as const },
        { t: dados.tituloB, itens: dados.itensB, cor: "sky" as const },
      ].map((col, ci) => (
        <motion.div
          key={ci}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ci * 0.15 }}
          className={
            "rounded-xl border-2 p-3 " +
            (col.cor === "primary"
              ? "border-primary/40 bg-primary/[0.06]"
              : "border-sky/40 bg-sky/[0.06]")
          }
        >
          <p
            className={
              "mb-2 text-center text-sm font-semibold " +
              (col.cor === "primary" ? "text-primary" : "text-sky")
            }
          >
            {col.t}
          </p>
          <ul className="space-y-1.5">
            {col.itens.map((it, ii) => (
              <li key={ii} className="text-[13px] leading-snug text-foreground/90">
                • {it}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
