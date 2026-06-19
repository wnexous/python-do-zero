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

/**
 * Descreve EXATAMENTE o que está no viewport do aluno neste instante
 * (título da lição + seção atual + o texto dos blocos visíveis na tela).
 * É recalculado a cada scroll/troca de página pra alimentar o professor ao vivo.
 */
export function coletarVisivel(pathname: string): string {
  const partes: string[] = [];

  const m = pathname.match(/\/licao\/([^/?#]+)/);
  const slug = m?.[1];
  if (slug) {
    const meta = getLicaoMeta(slug);
    const mod = getModuloDaLicao(slug);
    if (meta)
      partes.push(`Lição: "${meta.titulo}"${mod ? ` (Módulo ${mod.id})` : ""}.`);
  } else if (pathname === "/") {
    partes.push("Tela: página inicial (lista dos módulos e lições).");
  }

  if (typeof document !== "undefined") {
    const vh = window.innerHeight;

    const article = document.querySelector("article.leitura") as HTMLElement | null;
    if (article) {
      const headings = Array.from(
        article.querySelectorAll("h1, h2")
      ) as HTMLElement[];
      let atual: HTMLElement | null = headings[0] ?? null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= vh * 0.4) atual = h;
        else break;
      }
      const sec = atual?.textContent?.trim();
      if (sec) partes.push(`Seção em foco agora: "${sec}".`);
    }

    // blocos realmente dentro do viewport
    const blocos = Array.from(
      document.querySelectorAll(
        "article.leitura h1, article.leitura h2, article.leitura h3, article.leitura p, article.leitura li, article.leitura pre"
      )
    ) as HTMLElement[];
    const visiveis: string[] = [];
    for (const el of blocos) {
      const r = el.getBoundingClientRect();
      const dentro = r.bottom > 0 && r.top < vh;
      if (!dentro) continue;
      const txt = el.innerText?.trim();
      if (txt) visiveis.push(el.tagName === "PRE" ? `[código]\n${txt}` : txt);
    }

    if (visiveis.length === 0 && pathname === "/") {
      partes.push("O aluno está vendo a tela inicial com os módulos do curso.");
    } else if (visiveis.length > 0) {
      let texto = visiveis.join("\n");
      if (texto.length > 1800) texto = texto.slice(0, 1800) + "…";
      partes.push(`Conteúdo visível na tela agora:\n"""${texto}"""`);
    }

    // o que o aluno digitou num exercício visível
    const areas = Array.from(
      document.querySelectorAll("textarea")
    ) as HTMLTextAreaElement[];
    for (const ta of areas) {
      const r = ta.getBoundingClientRect();
      const dentro = r.bottom > 0 && r.top < vh;
      const val = ta.value?.trim();
      if (dentro && val) {
        partes.push(`[RESPOSTA DO EXERCÍCIO] O aluno digitou:\n"""${val.slice(0, 600)}"""`);
      }
    }
  }

  return partes.join("\n");
}
