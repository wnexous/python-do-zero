import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="dot-grid flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="text-7xl">🐍</div>
      <h1 className="mt-4 text-3xl text-foreground">Essa página fugiu</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        A cobrinha não encontrou nada por aqui. Deve ter escorregado pra outro
        lugar. Bora voltar pro começo?
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Voltar pro início</Link>
      </Button>
    </div>
  );
}
