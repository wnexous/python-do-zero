import { Fragment, type ReactNode } from "react";

// Renderizador de markdown BEM simples pras respostas do professor:
// blocos ``` ```, `código inline`, **negrito** e quebras de linha. Nada além disso.

function inline(texto: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // divide por `code` e **bold**
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  const partes = texto.split(regex);
  partes.forEach((p, i) => {
    if (!p) return;
    if (p.startsWith("`") && p.endsWith("`")) {
      nodes.push(
        <code
          key={`${keyBase}-c-${i}`}
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {p.slice(1, -1)}
        </code>
      );
    } else if (p.startsWith("**") && p.endsWith("**")) {
      nodes.push(
        <strong key={`${keyBase}-b-${i}`} className="font-semibold text-foreground">
          {p.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(<Fragment key={`${keyBase}-t-${i}`}>{p}</Fragment>);
    }
  });
  return nodes;
}

export function Markdown({ texto }: { texto: string }) {
  // separa blocos de código ```...```
  const blocos = texto.split(/```(?:\w+)?\n?/);
  return (
    <div className="space-y-2 whitespace-pre-wrap break-words leading-relaxed">
      {blocos.map((bloco, i) => {
        const ehCodigo = i % 2 === 1;
        if (ehCodigo) {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg bg-[#0c0c0c] p-3 font-mono text-[12.5px] text-foreground/90"
            >
              <code>{bloco.replace(/\n$/, "")}</code>
            </pre>
          );
        }
        // texto normal: processa linha a linha pra manter as quebras
        return (
          <span key={i}>
            {bloco.split("\n").map((linha, j, arr) => (
              <Fragment key={j}>
                {inline(linha, `${i}-${j}`)}
                {j < arr.length - 1 && <br />}
              </Fragment>
            ))}
          </span>
        );
      })}
    </div>
  );
}
