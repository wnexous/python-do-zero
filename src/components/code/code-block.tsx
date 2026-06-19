"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { HighlightedPython } from "./highlight";
import { cn } from "@/lib/utils";

/**
 * Bloco de código estático (sem animação de digitação). Bom pra mostrar
 * trechos curtos no meio do texto. Tem botão de copiar.
 */
export function CodeBlock({
  code,
  className,
  copiavel = true,
}: {
  code: string;
  className?: string;
  copiavel?: boolean;
}) {
  const [copiado, setCopiado] = useState(false);

  return (
    <div
      className={cn(
        "group relative my-5 overflow-hidden rounded-xl border border-border bg-[#0c0c0c]",
        className
      )}
    >
      {copiavel && (
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code).then(() => {
              setCopiado(true);
              setTimeout(() => setCopiado(false), 1500);
            });
          }}
          className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-md bg-secondary/60 text-muted-foreground opacity-0 transition-all hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
          aria-label="Copiar código"
        >
          {copiado ? (
            <Check className="size-4 text-primary" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      )}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13.5px] leading-relaxed sm:text-sm">
        <code className="whitespace-pre">
          <HighlightedPython code={code} />
        </code>
      </pre>
    </div>
  );
}
