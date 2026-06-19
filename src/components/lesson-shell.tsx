"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Home,
} from "lucide-react";
import { getVizinhas, getModuloDaLicao, type LicaoMeta } from "@/content/curso";
import { useProgresso } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LessonShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const barra = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const { anterior, proxima, indice, total } = getVizinhas(slug);
  const modulo = getModuloDaLicao(slug);
  const { estaConcluida, concluir, desfazer, carregado } = useProgresso();
  const feito = estaConcluida(slug);

  return (
    <div className="min-h-screen">
      {/* barra de progresso de leitura */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX: barra }}
      />

      {/* topo */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Link
            href="/"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Voltar pro início"
          >
            <Home className="size-[18px]" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">
              {modulo?.emoji} Módulo {modulo?.id} · {modulo?.titulo}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {indice + 1}/{total}
          </span>
        </div>
      </header>

      {/* conteúdo */}
      <main className="mx-auto max-w-2xl px-4 pb-10 pt-6 sm:px-5">
        {children}

        {/* botão concluir */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border/60 pt-8">
          {carregado && (
            <Button
              variant={feito ? "secondary" : "default"}
              size="lg"
              onClick={() => (feito ? desfazer(slug) : concluir(slug))}
              className="w-full sm:w-auto"
            >
              {feito ? (
                <>
                  <CircleCheck className="size-5" /> Concluída! (clique pra desfazer)
                </>
              ) : (
                <>
                  <Check className="size-5" /> Marcar como concluída
                </>
              )}
            </Button>
          )}
          <p className="text-center text-xs text-muted-foreground">
            Seu progresso fica salvo nesse aparelho. Sem cadastro, sem senha, sem
            spam. 😌
          </p>
        </div>

        {/* navegação anterior / próxima */}
        <nav className="mt-8 grid gap-3 sm:grid-cols-2">
          <NavCard licao={anterior} direcao="anterior" />
          <NavCard licao={proxima} direcao="proxima" />
        </nav>
      </main>
    </div>
  );
}

function NavCard({
  licao,
  direcao,
}: {
  licao: LicaoMeta | null;
  direcao: "anterior" | "proxima";
}) {
  if (!licao) {
    // fim do curso ou começo
    return (
      <Link
        href="/"
        className={cn(
          "flex flex-col justify-center rounded-xl border border-border/70 bg-card/40 p-4 transition-colors hover:border-border hover:bg-card",
          direcao === "anterior" ? "items-start" : "items-end text-right"
        )}
      >
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {direcao === "anterior" ? "Início" : "🎉 Fim da trilha"}
        </span>
        <span className="mt-0.5 text-sm text-foreground">
          {direcao === "anterior" ? "Voltar pra home" : "Você chegou ao fim!"}
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={`/licao/${licao.slug}`}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card",
        direcao === "proxima" && "sm:flex-row-reverse sm:text-right"
      )}
    >
      {direcao === "anterior" ? (
        <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      ) : (
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">
          {direcao === "anterior" ? "Anterior" : "Próxima"}
        </span>
        <span className="mt-0.5 block truncate text-sm text-foreground">
          {licao.emoji} {licao.titulo}
        </span>
      </span>
    </Link>
  );
}
