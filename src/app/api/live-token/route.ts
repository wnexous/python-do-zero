import { GoogleGenAI, Modality } from "@google/genai";

export const runtime = "nodejs";

// ============================================================================
// Gera um TOKEN EFÊMERO pra ligação ao vivo (Gemini Live API).
//
// A chave principal NUNCA vai pro navegador. O cliente recebe só este token
// temporário (1 uso, expira em poucos minutos, travado no modelo da Live),
// e é com ele que o navegador abre o WebSocket da Live API.
// ============================================================================

export async function POST() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "cole_sua_chave_aqui") {
    return Response.json(
      { erro: "ia_nao_configurada", mensagem: "Falta a chave do Gemini no servidor." },
      { status: 503 }
    );
  }

  const model = process.env.GEMINI_LIVE_MODEL || "gemini-3.1-flash-live-preview";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const expireTime = new Date(Date.now() + 25 * 60 * 1000).toISOString();

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime,
        liveConnectConstraints: {
          model,
          config: {
            sessionResumption: {},
            temperature: 0.85,
            responseModalities: [Modality.AUDIO],
          },
        },
        httpOptions: { apiVersion: "v1alpha" },
      },
    });

    return Response.json({ token: token.name, model });
  } catch (e) {
    console.error("[live-token]", e);
    return Response.json(
      {
        erro: "falha_token",
        mensagem: "Não consegui abrir a ligação agora. Tenta de novo daqui a pouco.",
      },
      { status: 502 }
    );
  }
}
