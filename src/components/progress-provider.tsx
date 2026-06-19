"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CHAVE = "python-do-zero:concluidas";

type Ctx = {
  concluidas: Set<string>;
  concluir: (slug: string) => void;
  desfazer: (slug: string) => void;
  estaConcluida: (slug: string) => boolean;
  carregado: boolean;
};

const ProgressoCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [concluidas, setConcluidas] = useState<Set<string>>(new Set());
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) setConcluidas(new Set(JSON.parse(raw)));
    } catch {
      /* ignora — primeira visita ou navegador zoado */
    }
    setCarregado(true);
  }, []);

  const salvar = useCallback((set: Set<string>) => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify([...set]));
    } catch {
      /* sem espaço / modo anônimo — tudo bem, só não persiste */
    }
  }, []);

  const concluir = useCallback(
    (slug: string) => {
      setConcluidas((prev) => {
        const next = new Set(prev).add(slug);
        salvar(next);
        return next;
      });
    },
    [salvar]
  );

  const desfazer = useCallback(
    (slug: string) => {
      setConcluidas((prev) => {
        const next = new Set(prev);
        next.delete(slug);
        salvar(next);
        return next;
      });
    },
    [salvar]
  );

  const estaConcluida = useCallback(
    (slug: string) => concluidas.has(slug),
    [concluidas]
  );

  return (
    <ProgressoCtx.Provider
      value={{ concluidas, concluir, desfazer, estaConcluida, carregado }}
    >
      {children}
    </ProgressoCtx.Provider>
  );
}

export function useProgresso() {
  const ctx = useContext(ProgressoCtx);
  if (!ctx) throw new Error("useProgresso precisa estar dentro de <ProgressProvider>");
  return ctx;
}
