"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Loader2,
  PartyPopper,
  ThumbsUp,
  Lightbulb,
  RefreshCw,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Veredito = "certo" | "quase" | "errado";
type Resultado = { veredito: Veredito; feedback: string; dica: string };

const ESTILO: Record<
  Veredito,
  { cls: string; icon: typeof PartyPopper; titulo: string; cor: string }
> = {
  certo: {
    cls: "border-primary/40 bg-primary/[0.07]",
    icon: PartyPopper,
    titulo: "Mandou bem!",
    cor: "text-primary",
  },
  quase: {
    cls: "border-sun/40 bg-sun/[0.07]",
    icon: ThumbsUp,
    titulo: "Quase lá!",
    cor: "text-sun",
  },
  errado: {
    cls: "border-sky/40 bg-sky/[0.07]",
    icon: Lightbulb,
    titulo: "Bora tentar de novo!",
    cor: "text-sky",
  },
};

export function Exercicio({
  enunciado,
  criterio,
  licao,
  placeholder = "Escreve sua resposta aqui...",
}: {
  enunciado: string;
  criterio: string;
  licao?: string;
  placeholder?: string;
}) {
  const [resposta, setResposta] = useState("");
  const [estado, setEstado] = useState<"parado" | "enviando">("parado");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function corrigir() {
    if (!resposta.trim() || estado === "enviando") return;
    setEstado("enviando");
    setErro(null);
    setResultado(null);
    try {
      const r = await fetch("/api/corrigir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enunciado, criterio, resposta, licao }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErro(data?.mensagem ?? "Deu algum probleminha. Tenta de novo.");
      } else {
        setResultado(data as Resultado);
      }
    } catch {
      setErro("Sem internet? Não consegui falar com a IA. Tenta de novo.");
    } finally {
      setEstado("parado");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="my-8 overflow-hidden rounded-2xl border border-grape/30 bg-grape/[0.05]"
    >
      <div className="flex items-center gap-2 border-b border-grape/20 bg-grape/[0.07] px-4 py-3">
        <Dumbbell className="size-[18px] text-grape" />
        <span className="text-xs font-semibold uppercase tracking-wide text-grape">
          Hora de praticar
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <p className="leitura !mt-0 !text-[15.5px] text-foreground/90">{enunciado}</p>

        <textarea
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder={placeholder}
          rows={4}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="mt-4 w-full resize-y rounded-xl border border-border bg-[#0c0c0c] p-3.5 font-mono text-[13.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-grape/50 focus:ring-2 focus:ring-grape/20 sm:text-sm"
        />

        <div className="mt-3 flex items-center gap-3">
          <Button
            onClick={corrigir}
            disabled={!resposta.trim() || estado === "enviando"}
            className="bg-grape text-white hover:bg-grape/90"
          >
            {estado === "enviando" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Corrigindo...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Corrigir com IA
              </>
            )}
          </Button>
          {resultado && (
            <button
              onClick={() => {
                setResultado(null);
                setErro(null);
              }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="size-3.5" /> tentar outra resposta
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {erro && (
            <motion.div
              key="erro"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-foreground/90">
                {erro}
              </div>
            </motion.div>
          )}

          {resultado && <FeedbackIA key="ok" resultado={resultado} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FeedbackIA({ resultado }: { resultado: Resultado }) {
  const { cls, icon: Icon, titulo, cor } = ESTILO[resultado.veredito];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn("mt-4 rounded-xl border p-4", cls)}
    >
      <div className="mb-2 flex items-center gap-2">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.1 }}
        >
          <Icon className={cn("size-5", cor)} />
        </motion.span>
        <span className={cn("text-sm font-semibold", cor)}>{titulo}</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          <Sparkles className="size-3" /> IA
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-foreground/90">
        {resultado.feedback}
      </p>
      {resultado.dica && (
        <p className="mt-2.5 flex gap-2 rounded-lg bg-background/40 p-2.5 text-[13.5px] text-muted-foreground">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-sun" />
          <span>{resultado.dica}</span>
        </p>
      )}
    </motion.div>
  );
}
