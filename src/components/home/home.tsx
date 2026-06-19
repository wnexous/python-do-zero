"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, ChevronRight, Sparkles, Clock } from "lucide-react";
import { CURSO, TODAS_LICOES } from "@/content/curso";
import { useProgresso } from "@/components/progress-provider";
import { Terminal } from "@/components/code/terminal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Home() {
  const { concluidas, estaConcluida, carregado } = useProgresso();
  const total = TODAS_LICOES.length;
  const feitas = carregado ? concluidas.size : 0;
  const pct = Math.round((feitas / total) * 100);

  // primeira lição não concluída (pra "continuar")
  const proxima =
    TODAS_LICOES.find((l) => !concluidas.has(l.slug)) ?? TODAS_LICOES[0];
  const comecou = feitas > 0;

  return (
    <div className="dot-grid min-h-screen">
      <div className="mx-auto max-w-2xl px-4 pb-20 pt-10 sm:px-5 sm:pt-16">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1 text-xs text-primary">
            <Sparkles className="size-3.5" />
            de graça, sem cadastro, feito pro celular
          </div>
          <h1 className="text-balance text-5xl leading-[0.95] text-foreground sm:text-6xl">
            Python <span className="italic text-primary">do zero</span>
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Aprender a programar parece coisa de gênio, né? <strong className="text-foreground">Não é.</strong>{" "}
            Aqui a gente explica fácil, com desenho que se mexe e umas piadas, até
            você fazer o computador te obedecer. Do começo de tudo até listas e
            tuplas.
          </p>
        </motion.div>

        {/* terminal de boas-vindas */}
        <Terminal
          arquivo="oi.py"
          code={`print("Oi! Bora aprender Python? 🐍")`}
          saida={`Oi! Bora aprender Python? 🐍`}
          velocidade={45}
        />

        {/* CTA + progresso */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/licao/${proxima.slug}`}>
              {comecou ? "Continuar de onde parei" : "Começar do comecinho"}
              <ChevronRight className="size-5" />
            </Link>
          </Button>

          {carregado && comecou && (
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Seu progresso</span>
                <span className="font-mono">
                  {feitas}/{total} lições ({pct}%)
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* MÓDULOS */}
        <div className="mt-14 space-y-8">
          {CURSO.map((modulo, mi) => (
            <motion.section
              key={modulo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: mi * 0.03 }}
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="text-3xl">{modulo.emoji}</span>
                <div>
                  <h2 className="text-xl text-foreground sm:text-2xl">
                    <span className="font-mono text-sm text-muted-foreground">
                      módulo {modulo.id}
                    </span>
                    <br />
                    {modulo.titulo}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {modulo.descricao}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {modulo.licoes.map((licao, li) => {
                  const ok = carregado && estaConcluida(licao.slug);
                  return (
                    <motion.div
                      key={licao.slug}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.3, delay: li * 0.04 }}
                    >
                      <Link
                        href={`/licao/${licao.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-3.5 transition-all hover:border-primary/40 hover:bg-card active:scale-[0.99]"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg text-lg transition-colors",
                            ok
                              ? "bg-primary/15"
                              : "bg-secondary group-hover:bg-secondary/80"
                          )}
                        >
                          {ok ? (
                            <Check className="size-5 text-primary" />
                          ) : (
                            licao.emoji
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-medium text-foreground">
                            {licao.titulo}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {licao.subtitulo}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
                          <Clock className="size-3" />
                          {licao.duracao}
                        </span>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {/* rodapé */}
        <footer className="mt-16 border-t border-border/60 pt-8 text-center text-sm text-muted-foreground">
          <p>
            Feito com 🐍 e paciência. Programar é só dar ordem pro computador —
            e ele <em>adora</em> obedecer.
          </p>
        </footer>
      </div>
    </div>
  );
}
