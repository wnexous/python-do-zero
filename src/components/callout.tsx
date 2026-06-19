"use client";

import { motion } from "motion/react";
import { Lightbulb, TriangleAlert, Sparkles, Brain, Laugh } from "lucide-react";
import { cn } from "@/lib/utils";

type Tipo = "dica" | "cuidado" | "curiosidade" | "lembrete" | "piada";

const CONFIG: Record<
  Tipo,
  { icon: typeof Lightbulb; label: string; cls: string; iconCls: string }
> = {
  dica: {
    icon: Lightbulb,
    label: "Dica",
    cls: "border-primary/30 bg-primary/[0.06]",
    iconCls: "text-primary",
  },
  cuidado: {
    icon: TriangleAlert,
    label: "Cuidado",
    cls: "border-sun/30 bg-sun/[0.06]",
    iconCls: "text-sun",
  },
  curiosidade: {
    icon: Sparkles,
    label: "Curiosidade",
    cls: "border-sky/30 bg-sky/[0.06]",
    iconCls: "text-sky",
  },
  lembrete: {
    icon: Brain,
    label: "Pra não esquecer",
    cls: "border-grape/30 bg-grape/[0.06]",
    iconCls: "text-grape",
  },
  piada: {
    icon: Laugh,
    label: "Pausa pra rir",
    cls: "border-rose/30 bg-rose/[0.06]",
    iconCls: "text-rose",
  },
};

export function Callout({
  tipo = "dica",
  titulo,
  children,
}: {
  tipo?: Tipo;
  titulo?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, cls, iconCls } = CONFIG[tipo];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      className={cn("my-6 rounded-xl border p-4 sm:p-5", cls)}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className={cn("size-[18px] shrink-0", iconCls)} />
        <span className={cn("text-xs font-semibold uppercase tracking-wide", iconCls)}>
          {titulo ?? label}
        </span>
      </div>
      <div className="leitura !text-[15.5px] [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </motion.div>
  );
}
