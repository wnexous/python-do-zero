import { FERRAMENTAS } from "@/components/assistente/ferramentas";

export const runtime = "nodejs";
export const maxDuration = 60;

// ============================================================================
// Chat do "professor Pyto" — texto + imagem + FERRAMENTAS (mesmo poder da
// ligação). A chave do Gemini fica SÓ aqui no servidor.
//
// Resposta em NDJSON (uma linha JSON por evento):
//   {"type":"text","v":"..."}          -> pedaço de texto
//   {"type":"calls","calls":[...]}     -> o professor quer usar ferramentas
// O cliente executa as ferramentas e chama de novo com "continuacoes".
// ============================================================================

type Mensagem = { role: "user" | "model"; texto: string };
type Imagem = { data: string; mime: string };
type Contexto = {
  licaoTitulo?: string;
  licaoTexto?: string;
  secaoVisivel?: string;
  progresso?: string;
};
type Rodada = {
  calls: Array<{ id?: string; name: string; args?: Record<string, unknown> }>;
  results: Array<{ id?: string; name: string; result: string }>;
};
type Corpo = {
  mensagens?: Mensagem[];
  imagem?: Imagem | null;
  contexto?: Contexto;
  continuacoes?: Rodada[];
};

const PERSONA = `Você é o "Pyto", um professor particular de Python super gente boa,
paciente e bem-humorado, que ensina gente que NUNCA programou (nível "explica pra
uma criança ou pro tio leigo"). Você está dentro de um curso online de Python,
ajudando o aluno num chatzinho enquanto ele estuda.

Como você age:
- Português do Brasil, informal, leve, com uma piadinha de vez em quando. NUNCA seja
  grosso ou humilhante — o aluno é iniciante e inseguro.
- Respostas CURTAS e diretas (é celular!). Exemplos de código curtinhos. Nada de textão.
- Explique do jeito mais simples possível, com analogias do dia a dia.
- Fique no nível básico (print até listas/tuplas, if, match/case, loops). Sem assunto avançado.
- Se o aluno mandar FOTO (print de tela, código, erro), olhe com atenção e ajude.

VOCÊ TEM PODERES NA TELA DO ALUNO (ferramentas). Use de verdade pra ensinar melhor —
não só fale, AJA:
- rolar_pagina / ir_para_secao: leve o aluno até a parte certa da lição.
- destacar_trecho: sublinhe na tela a frase/palavra exata que você está comentando.
- ir_para_licao: leve o aluno pra outra lição quando fizer sentido.
- abrir_quadro + quadro_fluxo / quadro_passos / quadro_codigo / quadro_comparacao: abra uma
  lousa e DESENHE (fluxogramas, passos, código, comparações). Use bastante — é muito didático.
- Seja proativo: ao explicar um conceito, já destaque na tela ou desenhe. Não peça permissão.
Use markdown leve (código em crase, **negrito**), sem exagero.`;

function montarSystem(ctx?: Contexto): string {
  if (!ctx) return PERSONA;
  const p: string[] = [PERSONA, "\n--- O QUE O ALUNO ESTÁ VENDO AGORA ---"];
  if (ctx.licaoTitulo) p.push(`Lição atual: "${ctx.licaoTitulo}".`);
  if (ctx.secaoVisivel) p.push(`Seção na tela agora: "${ctx.secaoVisivel}".`);
  if (ctx.progresso) p.push(`Progresso: ${ctx.progresso}.`);
  if (ctx.licaoTexto)
    p.push(`\nConteúdo da lição:\n"""${ctx.licaoTexto.slice(0, 6000)}"""`);
  p.push(
    "\nResponda conectado ao que ele está estudando. Se ele perguntar algo genérico, assuma que é sobre a seção/lição atual."
  );
  return p.join("\n");
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "cole_sua_chave_aqui") {
    return new Response("O professor ainda não foi ligado (falta a chave). 🙈", {
      status: 503,
    });
  }

  let corpo: Corpo;
  try {
    corpo = await req.json();
  } catch {
    return new Response("Pedido inválido.", { status: 400 });
  }

  const mensagens = (corpo.mensagens ?? []).filter(
    (m) => m && typeof m.texto === "string"
  );
  if (mensagens.length === 0) {
    return new Response("Manda uma pergunta primeiro 😄", { status: 400 });
  }
  const recentes = mensagens.slice(-16);

  type Part = Record<string, unknown>;
  const contents: Array<{ role: string; parts: Part[] }> = recentes.map((m, i) => {
    const ehUltima = i === recentes.length - 1;
    const parts: Part[] = [{ text: m.texto || "(imagem)" }];
    if (ehUltima && m.role === "user" && corpo.imagem?.data) {
      parts.push({
        inlineData: { mimeType: corpo.imagem.mime || "image/jpeg", data: corpo.imagem.data },
      });
    }
    return { role: m.role === "model" ? "model" : "user", parts };
  });

  // rodadas de ferramentas já executadas nesta pergunta
  for (const rod of corpo.continuacoes ?? []) {
    contents.push({
      role: "model",
      parts: (rod.calls ?? []).map((c) => ({
        functionCall: { id: c.id, name: c.name, args: c.args ?? {} },
      })),
    });
    contents.push({
      role: "user",
      parts: (rod.results ?? []).map((r) => ({
        functionResponse: { id: r.id, name: r.name, response: { result: r.result } },
      })),
    });
  }

  const model = process.env.GEMINI_CHAT_MODEL || "gemini-3.5-flash";
  const thinkingConfig = /gemini-3/.test(model)
    ? { thinkingLevel: "low" }
    : { thinkingBudget: 0 };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: montarSystem(corpo.contexto) }] },
        contents,
        tools: [{ functionDeclarations: FERRAMENTAS }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048, thinkingConfig },
      }),
      signal: AbortSignal.timeout(55000),
    });
  } catch {
    return new Response("Não consegui falar com a IA. Tenta de novo.", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detalhe = await upstream.text().catch(() => "");
    console.error("[chat] gemini erro", upstream.status, detalhe.slice(0, 300));
    return new Response("A IA tropeçou aqui. Tenta de novo daqui a pouco.", { status: 502 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      const calls: Array<{ id?: string; name: string; args: Record<string, unknown> }> = [];
      const emitir = (obj: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const linhas = buffer.split("\n");
          buffer = linhas.pop() ?? "";
          for (const linha of linhas) {
            const t = linha.trim();
            if (!t.startsWith("data:")) continue;
            const json = t.slice(5).trim();
            if (!json || json === "[DONE]") continue;
            try {
              const obj = JSON.parse(json);
              const parts = obj?.candidates?.[0]?.content?.parts ?? [];
              for (const p of parts) {
                if (typeof p.text === "string" && p.text)
                  emitir({ type: "text", v: p.text });
                if (p.functionCall?.name)
                  calls.push({
                    id: p.functionCall.id,
                    name: p.functionCall.name,
                    args: p.functionCall.args ?? {},
                  });
              }
            } catch {
              /* fragmento parcial */
            }
          }
        }
        if (calls.length) emitir({ type: "calls", calls });
      } catch (e) {
        console.error("[chat] stream", e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
