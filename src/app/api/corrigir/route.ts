import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// ============================================================================
// Correção de exercício por IA (Gemini).
//
// A chave da API fica SÓ aqui no servidor (process.env.GEMINI_API_KEY).
// O navegador nunca vê a chave — ele só fala com esta rota.
// ============================================================================

type Corpo = {
  enunciado?: string; // a pergunta que o aluno respondeu
  criterio?: string; // o que conta como resposta boa (gabarito/critério)
  resposta?: string; // o que o aluno escreveu
  licao?: string; // título da lição (contexto)
};

type Resultado = {
  veredito: "certo" | "quase" | "errado";
  feedback: string;
  dica: string;
};

const PERSONA = `Você é o "Pyto", um professor de Python MUITO simpático, paciente e
engraçado, que ensina gente que NUNCA programou na vida (imagine explicar pra uma
criança ou pro seu tio que mal sabe ligar o computador).

Seu trabalho: corrigir a resposta de um exercício de Python básico.

Regras de ouro:
- Fale em português do Brasil, informal, leve e bem-humorado. Pode soltar uma
  piadinha boba, mas sem exagerar.
- NUNCA seja grosso, sarcástico de verdade nem humilhante. A pessoa é iniciante e
  insegura. Mesmo quando a resposta tá errada, seja gentil e animador.
- Seja CURTO: no máximo 3 ou 4 frases no feedback. Ninguém lê textão no celular.
- Se a resposta estiver certa, comemore e reforce rapidinho por que tá certa.
- Se estiver "quase", elogie o que acertou e aponte com carinho o que faltou.
- Se estiver errada, NÃO entregue a resposta pronta de mão beijada — dê um empurrão
  na direção certa pra pessoa tentar de novo.
- Não invente conceitos avançados (classes, etc). Fique no nível básico.
- Avalie a IDEIA da resposta, não exija sintaxe perfeita. Erro de acento, espaço ou
  aspas trocadas não reprova ninguém nesse nível.

Responda SOMENTE com um JSON válido, sem markdown, exatamente neste formato:
{"veredito":"certo|quase|errado","feedback":"...","dica":"..."}
O campo "dica" pode ser uma string vazia se não precisar.`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "cole_sua_chave_aqui") {
    return NextResponse.json(
      {
        erro: "ia_nao_configurada",
        mensagem:
          "A correção por IA ainda não foi ligada (falta a chave do Gemini no servidor).",
      },
      { status: 503 }
    );
  }

  let corpo: Corpo;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ erro: "json_invalido" }, { status: 400 });
  }

  const resposta = (corpo.resposta ?? "").trim();
  const enunciado = (corpo.enunciado ?? "").trim();
  const criterio = (corpo.criterio ?? "").trim();
  const licao = (corpo.licao ?? "").trim();

  if (!resposta) {
    return NextResponse.json(
      { erro: "resposta_vazia", mensagem: "Escreve alguma coisa primeiro 😄" },
      { status: 400 }
    );
  }
  // guarda-chuva contra abuso / textão
  if (resposta.length > 4000) {
    return NextResponse.json(
      { erro: "resposta_longa", mensagem: "Calma no textão! Resposta curtinha." },
      { status: 400 }
    );
  }

  const prompt = `Lição: ${licao || "Python básico"}

Exercício proposto ao aluno:
"""${enunciado}"""

O que conta como uma resposta boa (critério de correção, só pra você):
"""${criterio || "Use bom senso de Python básico."}"""

Resposta que o aluno escreveu:
"""${resposta}"""

Corrija com carinho seguindo suas regras e devolva o JSON.`;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PERSONA }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          responseMimeType: "application/json",
          maxOutputTokens: 1024,
          // gemini-2.5-flash "pensa" por padrão e isso consome os tokens de saída,
          // truncando o JSON. Pra uma correção simples a gente não precisa de
          // raciocínio longo — desligar deixa rápido, barato e sem cortar a resposta.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
      // não deixa pendurar pra sempre
      signal: AbortSignal.timeout(25000),
    });

    if (!r.ok) {
      const detalhe = await r.text().catch(() => "");
      console.error("[corrigir] Gemini erro", r.status, detalhe.slice(0, 300));
      return NextResponse.json(
        {
          erro: "ia_falhou",
          mensagem:
            "A IA tropeçou aqui (pode ser a chave ou o limite de uso). Tenta de novo daqui a pouco.",
        },
        { status: 502 }
      );
    }

    const data = await r.json();
    const texto: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      "";

    const resultado = parseResultado(texto);
    if (!resultado) {
      return NextResponse.json(
        {
          erro: "resposta_ininteligivel",
          mensagem: "A IA respondeu de um jeito estranho. Tenta enviar de novo.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(resultado);
  } catch (e) {
    console.error("[corrigir] exceção", e);
    return NextResponse.json(
      {
        erro: "erro_inesperado",
        mensagem: "Deu ruim no servidor. Tenta de novo daqui a pouco 🙏",
      },
      { status: 500 }
    );
  }
}

// Extrai o JSON mesmo se a IA enfeitar com ```json ... ``` ou texto em volta.
function parseResultado(texto: string): Resultado | null {
  if (!texto) return null;
  let limpo = texto.trim();

  // tira cercas de markdown
  limpo = limpo.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();

  // pega do primeiro { ao último }
  const ini = limpo.indexOf("{");
  const fim = limpo.lastIndexOf("}");
  if (ini === -1 || fim === -1) return null;

  try {
    const obj = JSON.parse(limpo.slice(ini, fim + 1));
    const veredito = ["certo", "quase", "errado"].includes(obj.veredito)
      ? obj.veredito
      : "quase";
    const feedback = typeof obj.feedback === "string" ? obj.feedback.trim() : "";
    if (!feedback) return null;
    return {
      veredito,
      feedback,
      dica: typeof obj.dica === "string" ? obj.dica.trim() : "",
    };
  } catch {
    return null;
  }
}
