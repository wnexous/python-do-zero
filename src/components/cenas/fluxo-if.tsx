"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Decisão visual (if/else). O usuário liga/desliga a condição e vê o caminho
 * que o programa toma acendendo.
 */
export function CenaIf({
  condicao = "tá chovendo?",
  caminhoSim = "🌂 leva guarda-chuva",
  caminhoNao = "😎 vai de óculos escuros",
}: {
  condicao?: string;
  caminhoSim?: string;
  caminhoNao?: string;
}) {
  const [ligado, setLigado] = useState(true);

  return (
    <div className="my-6 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/30 p-6">
      {/* interruptor da condição */}
      <button
        onClick={() => setLigado((v) => !v)}
        className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-3 transition-colors hover:bg-secondary/70"
      >
        <span className="font-mono text-sm text-foreground">{condicao}</span>
        <span
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors",
            ligado ? "bg-primary" : "bg-muted"
          )}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "absolute top-0.5 size-5 rounded-full bg-white",
              ligado ? "right-0.5" : "left-0.5"
            )}
          />
        </span>
        <span
          className={cn(
            "w-12 text-left font-mono text-xs font-semibold",
            ligado ? "text-primary" : "text-muted-foreground"
          )}
        >
          {ligado ? "True" : "False"}
        </span>
      </button>

      <div className="text-xl text-muted-foreground">↓</div>

      {/* os dois caminhos */}
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        <Caminho
          rotulo="if (sim)"
          texto={caminhoSim}
          ativo={ligado}
          cor="primary"
        />
        <Caminho
          rotulo="else (não)"
          texto={caminhoNao}
          ativo={!ligado}
          cor="sky"
        />
      </div>
    </div>
  );
}

function Caminho({
  rotulo,
  texto,
  ativo,
  cor,
}: {
  rotulo: string;
  texto: string;
  ativo: boolean;
  cor: "primary" | "sky";
}) {
  return (
    <motion.div
      animate={{
        opacity: ativo ? 1 : 0.35,
        scale: ativo ? 1 : 0.96,
      }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center",
        ativo
          ? cor === "primary"
            ? "border-primary bg-primary/10"
            : "border-sky bg-sky/10"
          : "border-border bg-card"
      )}
    >
      <span
        className={cn(
          "font-mono text-[11px]",
          ativo
            ? cor === "primary"
              ? "text-primary"
              : "text-sky"
            : "text-muted-foreground"
        )}
      >
        {rotulo}
      </span>
      <span className="text-sm text-foreground">{texto}</span>
      {ativo && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
            cor === "primary"
              ? "bg-primary/20 text-primary"
              : "bg-sky/20 text-sky"
          )}
        >
          ▶ é por aqui
        </motion.span>
      )}
    </motion.div>
  );
}
