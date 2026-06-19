import { getLicaoMeta, getModuloDaLicao, TODAS_LICOES } from "@/content/curso";

export type ContextoPagina = {
  licaoTitulo?: string;
  licaoTexto?: string;
  secaoVisivel?: string;
  progresso?: string;
  caminho?: string;
};

/**
 * Lê o que o aluno está vendo AGORA, direto do DOM:
 * - qual lição (pelo caminho /licao/<slug>)
 * - o texto da lição inteira (pra IA ter o assunto na mão)
 * - qual seção (H1/H2) está aparecendo na tela neste momento
 * - quanto do curso ele já concluiu
 */
export function coletarContexto(
  pathname: string,
  concluidas: number
): ContextoPagina {
  const total = TODAS_LICOES.length;
  const ctx: ContextoPagina = {
    caminho: pathname,
    progresso: `${concluidas} de ${total} lições concluídas`,
  };

  const m = pathname.match(/\/licao\/([^/?#]+)/);
  const slug = m?.[1];

  if (slug) {
    const meta = getLicaoMeta(slug);
    const modulo = getModuloDaLicao(slug);
    if (meta) {
      ctx.licaoTitulo = modulo
        ? `${meta.titulo} (Módulo ${modulo.id} — ${modulo.titulo})`
        : meta.titulo;
    }
  } else if (pathname === "/") {
    ctx.licaoTitulo = "Página inicial (índice dos módulos)";
  }

  if (typeof document !== "undefined") {
    const article = document.querySelector("article.leitura") as HTMLElement | null;
    if (article) {
      const texto = article.innerText?.trim();
      if (texto) ctx.licaoTexto = texto;

      // qual heading está "ativo" na tela: o último cujo topo já passou de ~40% da altura
      const headings = Array.from(
        article.querySelectorAll("h1, h2")
      ) as HTMLElement[];
      const limite = window.innerHeight * 0.4;
      let atual: HTMLElement | null = headings[0] ?? null;
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top <= limite) atual = h;
        else break;
      }
      const sec = atual?.textContent?.trim();
      if (sec) ctx.secaoVisivel = sec;
    }
  }

  return ctx;
}
