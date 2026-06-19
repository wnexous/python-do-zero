"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowRight, Monitor, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Máquina do print": o texto entra na máquina print() e aparece na telinha.
 */
export function CenaPrint({
  exemplos = ["Oi, mundo!", "Eu mandei aqui 😎", "Python é fácil"],
}: {
  exemplos?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const [i, setI] = useState(0);
  const [tela, setTela] = useState<string[]>([]);
  const [tocar, setTocar] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setTela([]);
    setI(0);
    let passo = 0;
    setTela([exemplos[0]]);
    const id = setInterval(() => {
      passo++;
      if (passo >= exemplos.length) {
        clearInterval(id);
        return;
      }
      setI(passo);
      setTela((t) => [...t, exemplos[passo]]);
    }, 1500);
    return () => clearInterval(id);
  }, [inView, tocar, exemplos]);

  return (
    <div
      ref={ref}
      className="my-6 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/30 p-6"
    >
      <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
        {/* entrada */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`in-${i}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[110px] rounded-lg border border-sun/50 bg-sun/10 px-2.5 py-2 text-center font-mono text-xs text-sun"
          >
            &ldquo;{exemplos[i]}&rdquo;
          </motion.div>
        </AnimatePresence>

        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />

        {/* máquina print */}
        <motion.div
          key={`m-${i}`}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 0.5 }}
          className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-primary bg-primary/10"
        >
          <span className="font-mono text-[11px] font-semibold text-primary">
            print
          </span>
          <span className="font-mono text-[10px] text-primary/70">( )</span>
        </motion.div>

        <ArrowRight className="size-4 shrink-0 text-muted-foreground" />

        {/* tela */}
        <div className="flex w-[120px] flex-col rounded-lg border-2 border-border bg-[#0c0c0c] p-2 sm:w-[150px]">
          <Monitor className="mb-1 size-3 text-muted-foreground/50" />
          <div className="min-h-[52px] space-y-0.5">
            {tela.map((linha, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="break-words font-mono text-[11px] leading-tight text-primary"
              >
                {linha}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setTocar((t) => t + 1)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" /> ver de novo
      </button>
    </div>
  );
}

type TipoEx = { valor: string; tipo: "str" | "int" | "float" | "bool" };

const CORES: Record<TipoEx["tipo"], string> = {
  str: "border-sun/50 bg-sun/10 text-sun",
  int: "border-sky/50 bg-sky/10 text-sky",
  float: "border-grape/50 bg-grape/10 text-grape",
  bool: "border-primary/50 bg-primary/10 text-primary",
};

const NOMES: Record<TipoEx["tipo"], string> = {
  str: "str (texto)",
  int: "int (inteiro)",
  float: "float (com vírgula)",
  bool: "bool (sim/não)",
};

/** Cartões mostrando valores e o "tipo" de cada um. */
export function CenaTipos({
  exemplos = [
    { valor: '"André"', tipo: "str" },
    { valor: "27", tipo: "int" },
    { valor: "1.75", tipo: "float" },
    { valor: "True", tipo: "bool" },
  ],
}: {
  exemplos?: TipoEx[];
}) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3">
      {exemplos.map((ex, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.08 }}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 p-4",
            CORES[ex.tipo]
          )}
        >
          <span className="font-mono text-lg">{ex.valor}</span>
          <span className="rounded-full bg-background/40 px-2.5 py-0.5 font-mono text-[11px]">
            {NOMES[ex.tipo]}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
