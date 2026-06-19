export const runtime = "nodejs";
export const maxDuration = 60;

// ============================================================================
// Chat do "professor Pyto" — texto + imagem, com streaming.
// A chave do Gemini fica SÓ aqui no servidor. O navegador só fala com esta rota.
// Devolve a resposta em pedacinhos (stream de texto puro) pra aparecer ao vivo.
// ============================================================================

type Mensagem = { role: "user" | "model"; texto: string };
type Imagem = { data: string; mime: string };
type Contexto = {
  licaoTitulo?: string;
  licaoTexto?: string;
  secaoVisivel?: string;
  progresso?: string;
  caminho?: string;
};

type Corpo = {
  mensagens?: Mensagem[];
  imagem?: Imagem | null;
  contexto?: Contexto;
};

const PERSONA = `Você é o "Pyto", um professor particular de Python super gente boa,
paciente e bem-humorado, que ensina gente que NUNCA programou (nível "explica pra
uma criança ou pro tio leigo"). Você está dentro de um curso online de Python,
ajudando o aluno ao vivo num chatzinho enquanto ele estuda.

Como você age:
- Português do Brasil, informal, leve, com uma piadinha de vez em quando. Pode soltar
  uma gíria. NUNCA seja grosso, arrogante ou humilhante — o aluno é iniciante e inseguro.
- Respostas CURTAS e diretas (é celular!). Vá ao ponto, use exemplos de código curtinhos
  quando ajudar. Nada de textão.
- Explique sempre do jeito mais simples possível, com analogias do dia a dia.
- Fique no nível básico do curso (do print até listas/tuplas, if, loops, match/case).
  Não puxe assunto avançado (classes, async, etc) a não ser que o aluno insista.
- Se o aluno mandar uma FOTO (print de tela, código, erro), olhe com atenção e ajude
  com base nela: aponte o erro, explique o que tá rolando.
- Se a pergunta não tiver nada a ver com programação/o curso, responda com simpatia mas
  traga de volta pro foco de aprender Python.
- Use markdown leve quando ajudar (código em crase, **negrito**), mas sem exagero.`;

function montarSystem(ctx?: Contexto): string {
  if (!ctx) return PERSONA;
  const partes: string[] = [PERSONA, "\n\n--- CONTEXTO DO QUE O ALUNO ESTÁ VENDO AGORA ---"];
  if (ctx.licaoTitulo) partes.push(`Lição atual: "${ctx.licaoTitulo}".`);
  if (ctx.secaoVisivel) partes.push(`Seção que está aparecendo na tela dele agora: "${ctx.secaoVisivel}".`);
  if (ctx.progresso) partes.push(`Progresso no curso: ${ctx.progresso}.`);
  if (ctx.licaoTexto) {
    partes.push(
      `\nConteúdo da lição que ele está lendo (use pra responder com o mesmo vocabulário e dar exemplos coerentes):\n"""${ctx.licaoTexto.slice(0, 6000)}"""`
    );
  }
  partes.push(
    "\nUse esse contexto pra responder de forma conectada ao que ele está estudando. Se ele perguntar algo genérico tipo 'não entendi', assuma que é sobre a seção/lição atual."
  );
  return partes.join("\n");
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "cole_sua_chave_aqui") {
    return new Response(
      "O professor ainda não foi ligado (falta a chave do Gemini no servidor). 🙈",
      { status: 503 }
    );
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
  // limita histórico pra não estourar (mantém as últimas trocas)
  const recentes = mensagens.slice(-16);

  // monta contents no formato do Gemini
  const contents = recentes.map((m, i) => {
    const ehUltima = i === recentes.length - 1;
    const parts: Array<Record<string, unknown>> = [{ text: m.texto || "(imagem)" }];
    // anexa a imagem só na última mensagem do usuário
    if (ehUltima && m.role === "user" && corpo.imagem?.data) {
      parts.push({
        inlineData: {
          mimeType: corpo.imagem.mime || "image/jpeg",
          data: corpo.imagem.data,
        },
      });
    }
    return { role: m.role === "model" ? "model" : "user", parts };
  });

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
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2048,
          thinkingConfig,
        },
      }),
      signal: AbortSignal.timeout(55000),
    });
  } catch {
    return new Response("Não consegui falar com a IA. Tenta de novo.", {
      status: 502,
    });
  }

  if (!upstream.ok || !upstream.body) {
    const detalhe = await upstream.text().catch(() => "");
    console.error("[chat] gemini erro", upstream.status, detalhe.slice(0, 300));
    return new Response(
      "A IA tropeçou aqui (chave ou limite de uso). Tenta de novo daqui a pouco.",
      { status: 502 }
    );
  }

  // transforma o SSE do Gemini num stream de TEXTO puro (só os deltas)
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
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
              const texto: string =
                obj?.candidates?.[0]?.content?.parts
                  ?.map((p: { text?: string }) => p.text ?? "")
                  .join("") ?? "";
              if (texto) controller.enqueue(encoder.encode(texto));
            } catch {
              /* fragmento parcial — ignora */
            }
          }
        }
      } catch (e) {
        console.error("[chat] stream erro", e);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
