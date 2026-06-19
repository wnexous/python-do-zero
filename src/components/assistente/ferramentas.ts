import { Type, type FunctionDeclaration } from "@google/genai";

// Ferramentas que o professor (Gemini Live) pode CHAMAR durante a ligação
// pra controlar a tela do aluno e mostrar coisas de forma visual.

export const FERRAMENTAS: FunctionDeclaration[] = [
  {
    name: "rolar_pagina",
    description:
      "Rola a tela do aluno. Use pra mostrar mais conteúdo enquanto explica, ou pra ir pro topo/fim da página.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        direcao: {
          type: Type.STRING,
          description: "Pra onde rolar.",
          enum: ["topo", "fim", "cima", "baixo"],
        },
      },
      required: ["direcao"],
    },
  },
  {
    name: "ir_para_secao",
    description:
      "Rola até um título/seção específico da lição atual e o destaca, pra chamar a atenção do aluno pra aquela parte. Passe o texto (ou parte dele) do título da seção.",
    parameters: {
      type: Type.OBJECT,
      properties: { secao: { type: Type.STRING } },
      required: ["secao"],
    },
  },
  {
    name: "destacar_trecho",
    description:
      "Encontra um trecho de texto que está na tela do aluno e o sublinha/destaca, rolando até ele. Use pra apontar EXATAMENTE a parte que você está explicando naquele momento.",
    parameters: {
      type: Type.OBJECT,
      properties: { trecho: { type: Type.STRING } },
      required: ["trecho"],
    },
  },
  {
    name: "ir_para_licao",
    description:
      "Leva o aluno para outra lição do curso. Passe o nome ou tema (ex: 'listas', 'variáveis', 'if', 'match', 'tuplas', 'for', 'while', 'strings', 'print', 'input', 'números', 'booleanos', 'tipos'). Use quando o assunto for melhor explicado em outra lição, ou se o aluno pedir.",
    parameters: {
      type: Type.OBJECT,
      properties: { licao: { type: Type.STRING } },
      required: ["licao"],
    },
  },
  {
    name: "abrir_quadro",
    description:
      "Abre um quadro/lousa visual em branco na tela do aluno, com um título. Use quando quiser explicar algo de forma visual.",
    parameters: {
      type: Type.OBJECT,
      properties: { titulo: { type: Type.STRING } },
    },
  },
  {
    name: "quadro_fluxo",
    description:
      "Desenha um FLUXOGRAMA no quadro: caixas em sequência ligadas por setas. Ótimo pra mostrar o passo a passo de um programa, ou como o computador executa o código.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        passos: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "As caixas do fluxo, em ordem.",
        },
      },
      required: ["passos"],
    },
  },
  {
    name: "quadro_passos",
    description: "Mostra uma lista de passos numerados no quadro.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        passos: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["passos"],
    },
  },
  {
    name: "quadro_codigo",
    description:
      "Mostra um exemplo de código Python no quadro, com uma legenda curtinha explicando. Use pra dar exemplos concretos.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        codigo: { type: Type.STRING, description: "O código Python (pode ter várias linhas)." },
        legenda: { type: Type.STRING, description: "Explicação curta do que o código faz." },
      },
      required: ["codigo"],
    },
  },
  {
    name: "quadro_comparacao",
    description:
      "Mostra uma comparação lado a lado (duas colunas) no quadro. Ótimo pra 'lista vs tupla', 'for vs while', '== vs =', etc.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        titulo: { type: Type.STRING },
        tituloA: { type: Type.STRING },
        itensA: { type: Type.ARRAY, items: { type: Type.STRING } },
        tituloB: { type: Type.STRING },
        itensB: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["tituloA", "itensA", "tituloB", "itensB"],
    },
  },
  {
    name: "fechar_quadro",
    description: "Fecha o quadro visual quando não precisar mais dele.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
];
