"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mostra um loop rodando: a cada "volta" o contador sobe e sai mais uma linha
 * na tela. Bom pra while e pra for. O usuário aperta "rodar".
 */
export function CenaLoop({
  de = 1,
  ate = 5,
  rotulo = "volta",
  modelo = (n: number) => `Volta número ${n}`,
}: {
  de?: number;
  ate?: number;
  rotulo?: string;
  modelo?: (n: number) => string;
}) {
  const [atual, setAtual] = useState<number | null>(null);
  const [saidas, setSaidas] = useState<string[]>([]);
  const [rodando, setRodando] = useState(false);

  async function rodar() {
    if (rodando) return;
    setRodando(true);
    setSaidas([]);
    for (let n = de; n <= ate; n++) {
      setAtual(n);
      setSaidas((s) => [...s, modelo(n)]);
      await new Promise((r) => setTimeout(r, 700));
    }
    setAtual(null);
    setRodando(false);
  }

  return (
    <div className="my-6 grid gap-4 rounded-2xl border border-border bg-card/30 p-5 sm:grid-cols-[auto_1fr]">
      {/* contador */}
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          {rotulo}
        </span>
        <motion.div
          animate={atual ? { scale: [1, 1.15, 1] } : {}}
          key={atual}
          className={cn(
            "flex size-20 items-center justify-center rounded-2xl border-2 font-mono text-4xl",
            rodando
              ? "border-grape bg-grape/10 text-grape"
              : "border-border text-muted-foreground"
          )}
        >
          {atual ?? "–"}
        </motion.div>
        <button
          onClick={rodar}
          disabled={rodando}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground transition-all hover:bg-secondary/70 active:scale-95 disabled:opacity-40"
        >
          {rodando ? (
            <>
              <RotateCcw className="size-3.5 animate-spin" /> rodando...
            </>
          ) : (
            <>
              <Play className="size-3.5" /> rodar
            </>
          )}
        </button>
      </div>

      {/* tela de saída */}
      <div className="min-h-[140px] rounded-xl bg-[#0c0c0c] p-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          saída
        </span>
        <div className="mt-1 space-y-1">
          <AnimatePresence>
            {saidas.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-[13px] text-primary"
              >
                {s}
              </motion.div>
            ))}
          </AnimatePresence>
          {saidas.length === 0 && (
            <span className="font-mono text-[13px] text-muted-foreground/40">
              (aperta &ldquo;rodar&rdquo; pra ver a mágica)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
