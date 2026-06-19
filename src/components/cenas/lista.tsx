"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Play, RotateCcw, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { id: number; v: string };

const POOL = ["🍎", "🍌", "🍇", "🍊", "🍓", "🥝", "🍐", "🍒"];

/**
 * Faixa de caixinhas com índice embaixo. Cada caixinha mostra o valor e a
 * posição (0, 1, 2...). Animado pra entrar/sair.
 */
function Faixa({
  itens,
  destaque,
  trancada = false,
}: {
  itens: Item[];
  destaque?: number;
  trancada?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-2">
      <AnimatePresence mode="popLayout">
        {itens.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              borderColor:
                destaque === idx ? "hsl(95 70% 55%)" : undefined,
            }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-xl border-2 bg-card text-2xl transition-colors",
                destaque === idx
                  ? "border-primary bg-primary/10"
                  : trancada
                    ? "border-rose/40"
                    : "border-border"
              )}
            >
              {item.v}
            </div>
            <span className="font-mono text-xs text-muted-foreground">{idx}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      {itens.length === 0 && (
        <span className="py-5 font-mono text-sm text-muted-foreground">
          [ ] (lista vazia)
        </span>
      )}
    </div>
  );
}

/** Demo interativa de lista: dá pra adicionar, remover e percorrer. */
export function CenaLista() {
  const [itens, setItens] = useState<Item[]>([
    { id: 1, v: "🍎" },
    { id: 2, v: "🍌" },
    { id: 3, v: "🍇" },
  ]);
  const [destaque, setDestaque] = useState<number | undefined>();
  const [percorrendo, setPercorrendo] = useState(false);
  const [contador, setContador] = useState(4);

  function adicionar() {
    if (itens.length >= 7) return;
    const v = POOL[Math.floor((contador + itens.length) % POOL.length)];
    setItens((l) => [...l, { id: contador, v }]);
    setContador((c) => c + 1);
  }
  function remover() {
    setItens((l) => l.slice(0, -1));
  }
  async function percorrer() {
    if (percorrendo || itens.length === 0) return;
    setPercorrendo(true);
    for (let i = 0; i < itens.length; i++) {
      setDestaque(i);
      await new Promise((r) => setTimeout(r, 600));
    }
    setDestaque(undefined);
    setPercorrendo(false);
  }

  const codigo = `frutas = [${itens.map((i) => `"${i.v}"`).join(", ")}]`;

  return (
    <div className="my-6 rounded-2xl border border-border bg-card/30 p-5">
      <div className="mb-4 overflow-x-auto rounded-lg bg-[#0c0c0c] px-3 py-2">
        <code className="whitespace-pre font-mono text-[13px] text-foreground/90">
          <span className="text-foreground/90">frutas</span>
          <span className="text-foreground/50"> = [</span>
          <span className="text-sun">
            {itens.map((i) => `"${i.v}"`).join(", ")}
          </span>
          <span className="text-foreground/50">]</span>
        </code>
      </div>

      <div className="min-h-[88px] py-2">
        <Faixa itens={itens} destaque={destaque} />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Botao onClick={adicionar} disabled={itens.length >= 7}>
          <Plus className="size-4" /> adicionar
        </Botao>
        <Botao onClick={remover} disabled={itens.length === 0}>
          <Minus className="size-4" /> remover
        </Botao>
        <Botao onClick={percorrer} disabled={percorrendo || itens.length === 0}>
          <Play className="size-4" /> percorrer
        </Botao>
      </div>
    </div>
  );
}

/** Demo de tupla: trancada. Tentar mudar dá erro (treme e mostra ❌). */
export function CenaTupla() {
  const itens: Item[] = [
    { id: 1, v: "🔴" },
    { id: 2, v: "🟢" },
    { id: 3, v: "🔵" },
  ];
  const [tremendo, setTremendo] = useState(false);
  const [erro, setErro] = useState(false);

  function tentarMudar() {
    setTremendo(true);
    setErro(true);
    setTimeout(() => setTremendo(false), 500);
  }

  return (
    <div className="my-6 rounded-2xl border border-rose/30 bg-rose/[0.04] p-5">
      <div className="mb-4 flex items-center justify-center gap-2 overflow-x-auto rounded-lg bg-[#0c0c0c] px-3 py-2">
        <Lock className="size-3.5 shrink-0 text-rose" />
        <code className="whitespace-pre font-mono text-[13px]">
          <span className="text-foreground/90">cores</span>
          <span className="text-foreground/50"> = (</span>
          <span className="text-sun">{itens.map((i) => `"${i.v}"`).join(", ")}</span>
          <span className="text-foreground/50">)</span>
        </code>
      </div>

      <motion.div
        animate={tremendo ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        className="min-h-[88px] py-2"
      >
        <Faixa itens={itens} trancada />
      </motion.div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <Botao onClick={tentarMudar}>tentar trocar a primeira cor 🔧</Botao>
        <AnimatePresence>
          {erro && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center font-mono text-xs text-rose"
            >
              ❌ TypeError: não dá pra mudar uma tupla! (e tá tudo bem 😎)
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Botao({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-xs text-foreground transition-all hover:bg-secondary/70 active:scale-95 disabled:opacity-40"
    >
      {children}
    </button>
  );
}
