// Fonte única da verdade do curso: módulos, lições, ordem.
// A navegação, a home e o progresso leem tudo daqui.

export type LicaoMeta = {
  slug: string;
  titulo: string;
  subtitulo: string; // chamada curta e descontraída
  emoji: string;
  duracao: string; // ex: "5 min"
};

export type Modulo = {
  id: number;
  titulo: string;
  emoji: string;
  descricao: string;
  cor: string; // classe tailwind de texto pro accent do módulo
  licoes: LicaoMeta[];
};

export const CURSO: Modulo[] = [
  {
    id: 1,
    titulo: "Primeiros passos",
    emoji: "🐣",
    descricao: "O básico do básico. Você vai fazer o computador te obedecer.",
    cor: "text-primary",
    licoes: [
      {
        slug: "o-que-e-programar",
        titulo: "O que é programar?",
        subtitulo: "Dar ordem pro computador (ele é meio burro, mas obedece)",
        emoji: "🤖",
        duracao: "6 min",
      },
      {
        slug: "print",
        titulo: "print() — fazer o PC falar",
        subtitulo: "Sua primeira mágica: a tela escreve o que você mandar",
        emoji: "🗣️",
        duracao: "6 min",
      },
      {
        slug: "variaveis",
        titulo: "Variáveis — caixinhas com etiqueta",
        subtitulo: "Guardar coisas pra usar depois sem decorar nada",
        emoji: "📦",
        duracao: "8 min",
      },
      {
        slug: "tipos",
        titulo: "Tipos de coisas",
        subtitulo: "Texto, número e o tal do verdadeiro/falso",
        emoji: "🏷️",
        duracao: "7 min",
      },
    ],
  },
  {
    id: 2,
    titulo: "Texto e Números",
    emoji: "✏️",
    descricao: "Brincar com palavras e fazer conta sem usar a calculadora do celular.",
    cor: "text-sky",
    licoes: [
      {
        slug: "strings",
        titulo: "Strings — brincando com texto",
        subtitulo: "Juntar, gritar (MAIÚSCULA) e cochichar (minúscula)",
        emoji: "🔤",
        duracao: "9 min",
      },
      {
        slug: "numeros",
        titulo: "Números e contas",
        subtitulo: "Mais, menos, vezes, dividir e o resto que sobra",
        emoji: "🔢",
        duracao: "9 min",
      },
      {
        slug: "input",
        titulo: "input() — o PC te pergunta",
        subtitulo: "Agora o programa conversa com quem tá usando",
        emoji: "💬",
        duracao: "7 min",
      },
    ],
  },
  {
    id: 3,
    titulo: "Tomar decisões",
    emoji: "🤔",
    descricao: "Ensinar o programa a escolher caminhos, tipo: SE chover, leva guarda-chuva.",
    cor: "text-sun",
    licoes: [
      {
        slug: "booleanos",
        titulo: "Verdadeiro ou falso",
        subtitulo: "Comparar coisas e os parças: e / ou / não",
        emoji: "⚖️",
        duracao: "8 min",
      },
      {
        slug: "condicionais",
        titulo: "if / elif / else",
        subtitulo: "O programa finalmente escolhe o que fazer",
        emoji: "🚦",
        duracao: "10 min",
      },
      {
        slug: "match-case",
        titulo: "match / case — o switch do Python",
        subtitulo: "Muita opção? Esse é mais limpo que um monte de elif",
        emoji: "🔀",
        duracao: "9 min",
      },
    ],
  },
  {
    id: 4,
    titulo: "Repetir tarefas",
    emoji: "🔁",
    descricao: "Mandar o computador fazer a mesma coisa 1000 vezes sem reclamar.",
    cor: "text-grape",
    licoes: [
      {
        slug: "while",
        titulo: "while — repetir enquanto",
        subtitulo: "Pula corda até cansar (ou até o programa cansar)",
        emoji: "♾️",
        duracao: "9 min",
      },
      {
        slug: "for",
        titulo: "for e range — repetir contando",
        subtitulo: "Repetir um número certinho de vezes",
        emoji: "🔂",
        duracao: "9 min",
      },
    ],
  },
  {
    id: 5,
    titulo: "Guardar muitas coisas",
    emoji: "📦",
    descricao: "Quando uma caixinha não basta: guarde uma fila inteira de coisas.",
    cor: "text-rose",
    licoes: [
      {
        slug: "listas",
        titulo: "Listas — uma fila de caixinhas",
        subtitulo: "Guardar várias coisas numa coisa só",
        emoji: "📝",
        duracao: "11 min",
      },
      {
        slug: "tuplas",
        titulo: "Tuplas — listas que não mudam",
        subtitulo: "Quando você NÃO quer ninguém mexendo",
        emoji: "🔒",
        duracao: "7 min",
      },
    ],
  },
];

// ---- helpers derivados ----

export const TODAS_LICOES: (LicaoMeta & { moduloId: number; moduloTitulo: string })[] =
  CURSO.flatMap((m) =>
    m.licoes.map((l) => ({ ...l, moduloId: m.id, moduloTitulo: m.titulo }))
  );

export function getLicaoMeta(slug: string) {
  return TODAS_LICOES.find((l) => l.slug === slug);
}

export function getVizinhas(slug: string) {
  const i = TODAS_LICOES.findIndex((l) => l.slug === slug);
  return {
    anterior: i > 0 ? TODAS_LICOES[i - 1] : null,
    proxima: i < TODAS_LICOES.length - 1 ? TODAS_LICOES[i + 1] : null,
    indice: i,
    total: TODAS_LICOES.length,
  };
}

export function getModuloDaLicao(slug: string) {
  return CURSO.find((m) => m.licoes.some((l) => l.slug === slug));
}
