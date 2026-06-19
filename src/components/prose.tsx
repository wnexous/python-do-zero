"use client";

import { motion } from "motion/react";

/** Abertura da lição: emojizão, título e a chamada descontraída. */
export function Hero({
  emoji,
  titulo,
  subtitulo,
}: {
  emoji: string;
  titulo: string;
  subtitulo: string;
}) {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="mb-4 text-6xl sm:text-7xl"
      >
        {emoji}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-balance text-3xl leading-tight text-foreground sm:text-4xl"
      >
        {titulo}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-3 text-pretty text-lg italic text-muted-foreground"
      >
        {subtitulo}
      </motion.p>
    </div>
  );
}

/** Título de seção dentro da lição. */
export function H2({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4 }}
      className="mt-12 mb-4 flex items-center gap-3 text-2xl text-foreground sm:text-[26px]"
    >
      <span className="h-6 w-1.5 shrink-0 rounded-full bg-primary" />
      {children}
    </motion.h2>
  );
}

/** Texto grande de destaque (tipo uma frase de efeito). */
export function Frase({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="my-7 text-balance border-l-2 border-primary/50 pl-4 font-serif text-xl italic text-foreground/90 sm:text-2xl"
    >
      {children}
    </motion.p>
  );
}
