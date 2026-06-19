"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Uma "caixinha com etiqueta": a metáfora central de variável.
 * Mostra o nome (etiqueta) e o valor guardado dentro.
 */
export function Caixa({
  nome,
  valor,
  cor = "primary",
  className,
}: {
  nome: string;
  valor: string;
  cor?: "primary" | "sky" | "sun" | "rose" | "grape";
  className?: string;
}) {
  const corBorda = {
    primary: "border-primary/50",
    sky: "border-sky/50",
    sun: "border-sun/50",
    rose: "border-rose/50",
    grape: "border-grape/50",
  }[cor];
  const corTexto = {
    primary: "bg-primary text-primary-foreground",
    sky: "bg-sky text-background",
    sun: "bg-sun text-background",
    rose: "bg-rose text-white",
    grape: "bg-grape text-white",
  }[cor];

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* etiqueta */}
      <span
        className={cn(
          "z-10 -mb-1.5 rounded-md px-2.5 py-0.5 font-mono text-xs font-semibold",
          corTexto
        )}
      >
        {nome}
      </span>
      {/* caixa */}
      <div
        className={cn(
          "flex min-h-[60px] min-w-[90px] items-center justify-center rounded-xl border-2 bg-card px-4 pt-2 text-center",
          corBorda
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={valor}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="font-mono text-sm text-foreground"
          >
            {valor}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Demonstração de atribuição/reatribuição: passa por uma lista de valores,
 * mostrando a linha de código e a caixa mudando de conteúdo.
 */
export function CenaVariavel({
  nome = "idade",
  passos,
  cor = "primary",
}: {
  nome?: string;
  /** cada passo é o valor (em código) que a variável recebe */
  passos: string[];
  cor?: "primary" | "sky" | "sun" | "rose" | "grape";
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
      passo++;
      if (passo >= passos.length) {
        clearInterval(id);
        return;
      }
      setI(passo);
    }, 1600);
    return () => clearInterval(id);
  }, [inView, tocar, passos.length]);

  // mostra o valor "cru" pra exibir na caixa (tira aspas pra ficar amigável)
  const exibir = (passos[i] ?? "").replace(/^["']|["']$/g, "");

  return (
    <div
      ref={ref}
      className="my-6 flex flex-col items-center gap-5 rounded-2xl border border-border bg-card/30 p-6"
    >
      <div className="flex flex-col items-center gap-1 font-mono text-sm">
        {passos.map((p, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: idx === i ? 1 : 0.3,
              scale: idx === i ? 1 : 0.96,
            }}
            className={cn(
              "rounded-md px-3 py-1",
              idx === i && "bg-secondary"
            )}
          >
            <span className="text-foreground/90">{nome}</span>
            <span className="text-foreground/50"> = </span>
            <span className="text-sun">{p}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        key={i}
        transition={{ duration: 0.4 }}
      >
        <Caixa nome={nome} valor={exibir} cor={cor} />
      </motion.div>

      <button
        onClick={() => setTocar((t) => t + 1)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" /> ver de novo
      </button>
    </div>
  );
}
