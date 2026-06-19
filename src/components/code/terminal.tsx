"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useInView } from "motion/react";
import { RotateCcw, Play, Terminal as TerminalIcon } from "lucide-react";
import { HighlightedPython } from "./highlight";
import { cn } from "@/lib/utils";

type Props = {
  /** código Python a "digitar" */
  code: string;
  /** o que aparece no terminal depois de rodar */
  saida?: string;
  /** nome do arquivinho mostrado no topo */
  arquivo?: string;
  /** velocidade da digitação (ms por caractere). Menor = mais rápido */
  velocidade?: number;
  className?: string;
};

/**
 * Terminalzinho que digita o código sozinho quando aparece na tela e depois
 * mostra o resultado, como se você tivesse apertado "rodar". Dá pra repetir.
 */
export function Terminal({
  code,
  saida,
  arquivo = "exemplo.py",
  velocidade = 28,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const [typed, setTyped] = useState("");
  const [fase, setFase] = useState<"esperando" | "digitando" | "rodando" | "pronto">(
    "esperando"
  );
  const [run, setRun] = useState(0); // pra forçar replay

  useEffect(() => {
    if (!inView && run === 0) return;

    // acessibilidade: sem animação, mostra tudo de uma vez
    if (reduce) {
      setTyped(code);
      setFase("pronto");
      return;
    }

    let cancelado = false;
    setTyped("");
    setFase("digitando");

    let i = 0;
    const tick = () => {
      if (cancelado) return;
      i++;
      setTyped(code.slice(0, i));
      if (i < code.length) {
        // pausa um tiquinho a mais nas quebras de linha (parece mais natural)
        const extra = code[i - 1] === "\n" ? 90 : 0;
        timer = setTimeout(tick, velocidade + extra);
      } else {
        setFase("rodando");
        timer = setTimeout(() => {
          if (!cancelado) setFase("pronto");
        }, 520);
      }
    };
    let timer = setTimeout(tick, 280);
    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, run, code, velocidade, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-border bg-[#0c0c0c] shadow-lg shadow-black/40",
        className
      )}
    >
      {/* topo da janela */}
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-rose/70" />
          <span className="size-3 rounded-full bg-sun/70" />
          <span className="size-3 rounded-full bg-primary/70" />
        </div>
        <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <TerminalIcon className="size-3.5" />
          {arquivo}
        </span>
        <button
          onClick={() => setRun((r) => r + 1)}
          className="ml-auto flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Rodar de novo"
        >
          <RotateCcw className="size-3" />
          de novo
        </button>
      </div>

      {/* código */}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13.5px] leading-relaxed sm:text-sm">
        <code className="whitespace-pre">
          <HighlightedPython code={typed} />
          {(fase === "digitando" || fase === "esperando") && (
            <span className="ml-px inline-block w-[7px] animate-blink bg-primary align-middle">
              &nbsp;
            </span>
          )}
        </code>
      </pre>

      {/* saída */}
      {saida !== undefined && (
        <div className="border-t border-border/70">
          <div className="flex items-center gap-1.5 px-4 pt-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            <Play className="size-2.5 fill-current" />
            saída
          </div>
          <div className="min-h-[2.25rem] px-4 pb-3.5 pt-1">
            <AnimatePresence mode="wait">
              {fase === "rodando" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1 py-1"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="size-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}
              {fase === "pronto" && (
                <motion.pre
                  key="saida"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13.5px] leading-relaxed text-primary sm:text-sm"
                >
                  {saida || " "}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
