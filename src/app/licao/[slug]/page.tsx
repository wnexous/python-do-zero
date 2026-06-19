import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LessonShell } from "@/components/lesson-shell";
import { LICOES } from "@/content/licoes";
import { TODAS_LICOES, getLicaoMeta } from "@/content/curso";

export function generateStaticParams() {
  return TODAS_LICOES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getLicaoMeta(slug);
  if (!meta) return { title: "Lição não encontrada" };
  return {
    title: `${meta.titulo} — Python do Zero`,
    description: meta.subtitulo,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Licao = LICOES[slug];
  if (!Licao) notFound();

  return (
    <LessonShell slug={slug}>
      <Licao />
    </LessonShell>
  );
}
