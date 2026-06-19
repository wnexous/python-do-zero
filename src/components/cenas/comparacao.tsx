"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Check, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Caso = { a: string; op: string; b: string; resultado: boolean };

/**
 * Mostra comparações virando Verdadeiro/Falso, uma de cada vez.
 * A "lâmpada" acende verde (True) ou vermelha (False).
 */
export function CenaComparacao({
  casos = [
    { a: "10", op: ">", b: "3", resultado: true },
    { a: "5", op: "==", b: "5", resultado: true },
    { a: "2", op: ">", b: "9", resultado: false },
    { a: "7", op: "!=", b: "7", resultado: false },
  ],
}: {
  casos?: Caso[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const [i, setI] = useState(0);
  const [tocar, setTocar] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setI(0);
    let passo = 0;
    const id = setInterval(() => {
      passo = (passo + 1) % casos.length;
      setI(passo);
    }, 1900);
    return () => clearInterval(id);
  }, [inView, tocar, casos.length]);

  const caso = casos[i];

  return (
    <div
      ref={ref}
      className="my-6 flex flex-col items-center gap-5 rounded-2xl border border-border bg-card/30 p-6"
    >
      <div className="flex items-center gap-3 font-mono text-2xl sm:text-3xl">
        <Pastilha>{caso.a}</Pastilha>
        <motion.span
          key={`op-${i}`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-rose"
        >
          {caso.op}
        </motion.span>
        <Pastilha>{caso.b}</Pastilha>
      </div>

      <motion.div
        animate={{ rotate: [0, -4, 0] }}
        key={`arrow-${i}`}
        className="text-2xl text-muted-foreground"
      >
        ↓
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`res-${i}`}
          initial={{ scale: 0.6, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className={cn(
            "flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 font-mono text-lg font-semibold",
            caso.resultado
              ? "border-primary bg-primary/10 text-primary"
              : "border-rose bg-rose/10 text-rose"
          )}
        >
          {caso.resultado ? (
            <Check className="size-5" />
          ) : (
            <X className="size-5" />
          )}
          {caso.resultado ? "True" : "False"}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => setTocar((t) => t + 1)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" /> ver de novo
      </button>
    </div>
  );
}

function Pastilha({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex min-w-[52px] items-center justify-center rounded-xl border-2 border-sky/50 bg-sky/10 px-3 py-1.5 text-sky">
      {children}
    </span>
  );
}
