"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Caso = { valor: string; resultado: string };

/**
 * Demonstra o match/case: o usuário escolhe um valor e o "case" que combina
 * acende, mostrando o resultado. Se nada combinar, acende o coringa `case _`.
 */
export function CenaMatch({
  variavel = "fruta",
  casos = [
    { valor: "🍎", resultado: 'print("É uma maçã!")' },
    { valor: "🍌", resultado: 'print("É uma banana!")' },
    { valor: "🍇", resultado: 'print("É uma uva!")' },
  ],
  defaultResultado = 'print("Fruta desconhecida 🤷")',
}: {
  variavel?: string;
  casos?: Caso[];
  defaultResultado?: string;
}) {
  const [escolhido, setEscolhido] = useState<string | null>(null);
  const matchIdx = casos.findIndex((c) => c.valor === escolhido);
  const ehDefault = escolhido !== null && matchIdx === -1;

  return (
    <div className="my-6 rounded-2xl border border-border bg-card/30 p-5">
      {/* escolha */}
      <p className="mb-2 text-center text-xs uppercase tracking-wide text-muted-foreground">
        escolhe um valor pra {variavel}:
      </p>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {casos.map((c) => (
          <Chip
            key={c.valor}
            ativo={escolhido === c.valor}
            onClick={() => setEscolhido(c.valor)}
          >
            {c.valor}
          </Chip>
        ))}
        <Chip ativo={ehDefault} onClick={() => setEscolhido("🥥")}>
          🥥 (outra)
        </Chip>
      </div>

      {/* o código com os cases */}
      <div className="space-y-1.5 rounded-xl bg-[#0c0c0c] p-3 font-mono text-[12.5px] sm:text-[13.5px]">
        <div className="text-foreground/80">
          <span className="text-rose">match</span> {variavel}
          <span className="text-foreground/50">:</span>
        </div>
        {casos.map((c, i) => (
          <Linha key={i} ativo={escolhido === c.valor}>
            <span className="text-rose">case</span>{" "}
            <span className="text-sun">&ldquo;{c.valor}&rdquo;</span>
            <span className="text-foreground/50">:</span>{" "}
            <span className="text-primary/90">{c.resultado}</span>
          </Linha>
        ))}
        <Linha ativo={ehDefault}>
          <span className="text-rose">case</span>{" "}
          <span className="text-grape">_</span>
          <span className="text-foreground/50">:</span>{" "}
          <span className="text-primary/90">{defaultResultado}</span>
          <span className="ml-2 text-foreground/40">{"# qualquer outra"}</span>
        </Linha>
      </div>

      {/* saída */}
      <div className="mt-3 min-h-[2.25rem] rounded-xl bg-[#0c0c0c] px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          saída
        </span>
        {escolhido ? (
          <motion.div
            key={escolhido}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[13px] text-primary"
          >
            {ehDefault
              ? defaultResultado.replace(/^print\(["']|["']\)$/g, "")
              : casos[matchIdx]?.resultado.replace(/^print\(["']|["']\)$/g, "")}
          </motion.div>
        ) : (
          <div className="font-mono text-[13px] text-muted-foreground/40">
            (toca num valor lá em cima)
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  children,
  ativo,
  onClick,
}: {
  children: React.ReactNode;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg border-2 px-3 py-2 text-lg transition-all active:scale-95",
        ativo
          ? "border-primary bg-primary/10"
          : "border-border bg-secondary hover:bg-secondary/70"
      )}
    >
      {children}
    </button>
  );
}

function Linha({
  children,
  ativo,
}: {
  children: React.ReactNode;
  ativo: boolean;
}) {
  return (
    <motion.div
      animate={{
        backgroundColor: ativo ? "hsl(95 70% 55% / 0.12)" : "hsl(0 0% 100% / 0)",
        opacity: ativo ? 1 : 0.55,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-md px-2 py-1 pl-5"
    >
      {children}
    </motion.div>
  );
}
