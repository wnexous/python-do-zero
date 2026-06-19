// Destacador de sintaxe de Python bem simples (sem dependência externa).
// Não é um parser de verdade — é só o suficiente pra deixar o código bonito
// e legível no celular. Cobre: comentários, strings (inclusive f-strings),
// números, palavras-chave, funções nativas, booleanos e o resto.

import { Fragment } from "react";

const KEYWORDS = new Set([
  "def", "return", "if", "elif", "else", "for", "while", "in", "not", "and",
  "or", "import", "from", "as", "pass", "break", "continue", "with", "is",
  "lambda", "global", "del", "try", "except", "finally", "raise", "class",
]);

const BUILTINS = new Set([
  "print", "input", "len", "range", "int", "float", "str", "bool", "type",
  "list", "tuple", "dict", "set", "sum", "min", "max", "abs", "round",
  "sorted", "reversed", "enumerate", "zip", "append", "pop", "insert",
  "remove", "sort", "upper", "lower", "title", "strip", "replace", "split",
  "join", "format", "count", "index", "open", "map", "filter", "abs",
]);

const CONST = new Set(["True", "False", "None"]);

type Tok = { t: string; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];

    // comentário até o fim da linha
    if (c === "#") {
      let j = i;
      while (j < n && src[j] !== "\n") j++;
      out.push({ t: "comment", v: src.slice(i, j) });
      i = j;
      continue;
    }

    // string: aspas simples ou duplas (com prefixo f/r opcional)
    if (c === '"' || c === "'") {
      const quote = c;
      let j = i + 1;
      while (j < n && src[j] !== quote) {
        if (src[j] === "\\") j++; // pula escape
        j++;
      }
      j++; // fecha aspas
      out.push({ t: "string", v: src.slice(i, j) });
      i = j;
      continue;
    }

    // prefixo de string (f"...", r'...')
    if ((c === "f" || c === "r" || c === "F" || c === "R") && (src[i + 1] === '"' || src[i + 1] === "'")) {
      const quote = src[i + 1];
      let j = i + 2;
      while (j < n && src[j] !== quote) {
        if (src[j] === "\\") j++;
        j++;
      }
      j++;
      out.push({ t: "string", v: src.slice(i, j) });
      i = j;
      continue;
    }

    // número
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < n && /[0-9._]/.test(src[j])) j++;
      out.push({ t: "number", v: src.slice(i, j) });
      i = j;
      continue;
    }

    // identificador / palavra
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(src[j])) j++;
      const word = src.slice(i, j);
      let t = "name";
      if (KEYWORDS.has(word)) t = "kw";
      else if (CONST.has(word)) t = "const";
      else if (BUILTINS.has(word)) t = "builtin";
      out.push({ t, v: word });
      i = j;
      continue;
    }

    // operadores
    if (/[+\-*/%=<>!&|^~]/.test(c)) {
      let j = i;
      while (j < n && /[+\-*/%=<>!&|^~]/.test(src[j])) j++;
      out.push({ t: "op", v: src.slice(i, j) });
      i = j;
      continue;
    }

    // qualquer outra coisa (espaços, parênteses, vírgulas, quebras)
    out.push({ t: "plain", v: c });
    i++;
  }
  return out;
}

const CLS: Record<string, string> = {
  comment: "text-muted-foreground italic",
  string: "text-sun",
  number: "text-sky",
  kw: "text-rose",
  const: "text-grape font-medium",
  builtin: "text-primary",
  op: "text-foreground/70",
  name: "text-foreground/90",
  plain: "text-foreground/80",
};

export function HighlightedPython({ code }: { code: string }) {
  const toks = tokenize(code);
  return (
    <>
      {toks.map((tok, idx) => (
        <Fragment key={idx}>
          <span className={CLS[tok.t] ?? "text-foreground/80"}>{tok.v}</span>
        </Fragment>
      ))}
    </>
  );
}
