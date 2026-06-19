import { TODAS_LICOES } from "@/content/curso";

// Operações que o professor executa na PÁGINA do aluno (puro DOM).

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function rolarPagina(direcao: string): string {
  const passo = window.innerHeight * 0.8;
  if (direcao === "topo") window.scrollTo({ top: 0, behavior: "smooth" });
  else if (direcao === "fim")
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  else if (direcao === "cima")
    window.scrollBy({ top: -passo, behavior: "smooth" });
  else window.scrollBy({ top: passo, behavior: "smooth" });
  return "rolei a tela";
}

function piscar(el: HTMLElement) {
  el.classList.add("prof-flash");
  setTimeout(() => el.classList.remove("prof-flash"), 2200);
}

export function irParaSecao(secao: string): string {
  const article = document.querySelector("article.leitura");
  if (!article) return "não tem lição aberta agora";
  const headings = Array.from(
    article.querySelectorAll("h1, h2, h3")
  ) as HTMLElement[];
  const alvo =
    headings.find((h) => norm(h.textContent || "").includes(norm(secao))) ??
    headings.find((h) =>
      norm(secao).includes(norm((h.textContent || "").slice(0, 12)))
    );
  if (!alvo) return "não achei essa seção na lição";
  alvo.scrollIntoView({ behavior: "smooth", block: "center" });
  piscar(alvo);
  return "fui até a seção e destaquei";
}

export function destacarTrecho(trecho: string): string {
  const root = document.querySelector("article.leitura");
  if (!root || trecho.trim().length < 3) return "trecho muito curto";
  const alvo = norm(trecho.trim());
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const txt = node.textContent || "";
    const idx = norm(txt).indexOf(alvo);
    if (idx >= 0) {
      try {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, Math.min(txt.length, idx + trecho.length));
        const mark = document.createElement("mark");
        mark.className = "prof-marca";
        range.surroundContents(mark);
        mark.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          const p = mark.parentNode;
          if (p) {
            while (mark.firstChild) p.insertBefore(mark.firstChild, mark);
            p.removeChild(mark);
            p.normalize();
          }
        }, 7000);
        return "destaquei o trecho na tela";
      } catch {
        // trecho atravessa vários elementos — destaca o bloco inteiro
        const el = (node.parentElement as HTMLElement) || null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          piscar(el);
          return "destaquei a parte na tela";
        }
      }
    }
  }
  return "não achei esse trecho na tela do aluno";
}

export function acharSlugLicao(nome: string): string | null {
  const alvo = norm(nome);
  // tenta por slug, depois por título
  const porSlug = TODAS_LICOES.find((l) => norm(l.slug).includes(alvo) || alvo.includes(norm(l.slug)));
  if (porSlug) return porSlug.slug;
  const porTitulo = TODAS_LICOES.find((l) => norm(l.titulo).includes(alvo));
  if (porTitulo) return porTitulo.slug;
  // palavras-chave soltas
  const palavras = alvo.split(/\s+/).filter((p) => p.length > 2);
  const achou = TODAS_LICOES.find((l) =>
    palavras.some((p) => norm(l.titulo).includes(p) || norm(l.slug).includes(p))
  );
  return achou?.slug ?? null;
}
