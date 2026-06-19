"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useProgresso } from "@/components/progress-provider";
import { coletarContexto, coletarVisivel, type ContextoPagina } from "./contexto";
import { LiveSessao, type StatusChamada } from "./live-client";
import {
  rolarPagina,
  irParaSecao,
  destacarTrecho,
  acharSlugLicao,
} from "./page-controller";
import { type QuadroDados } from "./quadro";

export type ChatMsg = {
  id: string;
  role: "user" | "model";
  texto: string;
  imagem?: string; // dataURL (só em memória, não persiste)
  pendente?: boolean;
};

type Ctx = {
  aberto: boolean;
  abrir: () => void;
  fechar: () => void;
  mensagens: ChatMsg[];
  enviando: boolean;
  enviar: (texto: string, imagemDataUrl?: string) => Promise<void>;
  limpar: () => void;
  pegarContexto: () => ReturnType<typeof coletarContexto>;

  // ligação ao vivo
  chamadaStatus: StatusChamada;
  chamadaMsg?: string;
  mudo: boolean;
  cameraLigada: boolean;
  cameraFrontal: boolean;
  camStream: MediaStream | null;
  falaProfessor: string;
  iniciarChamada: (comCamera?: boolean) => Promise<void>;
  encerrarChamada: () => Promise<void>;
  toggleMudoChamada: () => void;
  toggleCameraChamada: () => Promise<void>;
  virarCamera: () => Promise<void>;
  quadro: QuadroDados | null;
  fecharQuadro: () => void;
};

const AssistenteCtx = createContext<Ctx | null>(null);
const CHAVE = "python-do-zero:chat";

function montarPersonaVoz(ctx: ContextoPagina, memoria?: string): string {
  const partes: string[] = [
    `Você é o "Pyto", um professor de Python super gente boa numa LIGAÇÃO DE VOZ ao vivo com um aluno que está começando do zero (nível "explica pra criança").`,
    `Regras da ligação:`,
    `- Fale em português do Brasil, de forma NATURAL e curta, como numa conversa de telefone. Nada de textão nem de ficar listando item por item — é voz.`,
    `- Seja caloroso, paciente e bem-humorado. Pode rir, brincar um pouco. NUNCA seja grosso ou arrogante.`,
    `- Explique do jeito mais simples possível, com analogias do dia a dia. Faça pausas, pergunte se ele entendeu.`,
    `- Fique no nível básico (print, variáveis, tipos, strings, números, input, if, match/case, loops, listas, tuplas).`,
    `- Se o aluno mostrar a CÂMERA (um código no papel/tela, um caderno), comente o que está vendo e ajude.`,
    `- VISÃO DA TELA: você recebe, em tempo real, mensagens começando com "[TELA AGORA]" que descrevem EXATAMENTE o que está visível na tela do aluno neste momento (a seção e o texto que ele está lendo). Elas se atualizam quando ele rola a página ou troca de lição.`,
    `- Quando o aluno perguntar algo como "o que está na minha tela?", "o que tô vendo?" ou "me explica isso aqui", você SIM tem essa informação: responda com base na ÚLTIMA mensagem "[TELA AGORA]" que recebeu. NUNCA diga que não sabe o que está na tela.`,
    `- Nunca leia as mensagens "[TELA AGORA]" em voz alta nem comente que recebeu uma — use-as só como seus olhos.`,
    `- Você também recebe "[ALUNO SUBLINHOU] ..." quando ele seleciona um texto na tela (é o que ele quer entender) e "[RESPOSTA DO EXERCÍCIO] ..." com o que ele digitou num exercício. Se ele perguntar "tá certo?", avalie essa resposta com carinho e ajude a corrigir.`,
    `\nVOCÊ TEM PODERES NA TELA DO ALUNO (ferramentas/tools). Use-os de verdade, com naturalidade, pra ensinar melhor — não só fale, AJA:`,
    `- rolar_pagina e ir_para_secao: role a tela e leve o aluno até a parte que você está explicando.`,
    `- destacar_trecho: sublinhe na tela a frase/palavra exata que você está comentando ("olha bem AQUI ó").`,
    `- ir_para_licao: leve o aluno pra outra lição quando o assunto estiver melhor explicado lá, ou se ele pedir.`,
    `- abrir_quadro + quadro_fluxo / quadro_passos / quadro_codigo / quadro_comparacao: abra uma lousa e DESENHE pra explicar de forma visual (fluxogramas, passo a passo, exemplos de código, comparações). Use bastante isso — é muito mais didático que só falar. Feche com fechar_quadro quando não precisar mais.`,
    `- SEJA PROATIVO E AJA, não só fale: ao explicar QUALQUER conceito, já chame uma ferramenta — destaque o trecho na tela, role até a parte certa, ou abra um quadro e desenhe. Não peça permissão ("posso te mostrar?"), simplesmente faça e vá narrando. Use as ferramentas o tempo todo; uma aula sua quase sempre mexe na tela do aluno.`,
    `- Se o aluno pedir pra ver/ir/mostrar algo, use a ferramenta correspondente na hora. Se uma ferramenta falhar (você recebe o resultado dela), tente outra abordagem.`,
  ];
  if (ctx.licaoTitulo) partes.push(`\nAgora o aluno está na lição: "${ctx.licaoTitulo}".`);
  if (ctx.secaoVisivel) partes.push(`Seção visível na tela: "${ctx.secaoVisivel}".`);
  if (ctx.progresso) partes.push(`Progresso: ${ctx.progresso}.`);
  if (ctx.licaoTexto)
    partes.push(`\nConteúdo da lição (pra você ter o assunto na mão):\n"""${ctx.licaoTexto.slice(0, 5000)}"""`);
  if (memoria && memoria.trim()) {
    partes.push(
      `\n--- O QUE VOCÊS JÁ CONVERSARAM (memória, pra manter continuidade — NÃO repita, só use de base) ---\n${memoria.trim()}`
    );
  }
  partes.push(
    `\nSe já conversaram antes, retome com naturalidade ("voltando ao que a gente tava vendo..."). Senão, cumprimente rapidinho e pergunte no que pode ajudar.`
  );
  return partes.join("\n");
}

const CHAVE_MEMORIA = "python-do-zero:call-memory";

let _id = 0;
function novoId() {
  _id += 1;
  return `${Date.now().toString(36)}-${_id}`;
}

export function AssistenteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { concluidas } = useProgresso();
  const concluidasRef = useRef(0);
  concluidasRef.current = concluidas.size;
  const mensagensRef = useRef<ChatMsg[]>([]);

  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<ChatMsg[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [carregado, setCarregado] = useState(false);
  mensagensRef.current = mensagens;

  // ---- ligação ao vivo ----
  const sessaoRef = useRef<LiveSessao | null>(null);
  const transcricaoRef = useRef("");
  const ultimoFalanteRef = useRef<"aluno" | "prof" | null>(null);
  const [chamadaStatus, setChamadaStatus] = useState<StatusChamada>("idle");
  const [chamadaMsg, setChamadaMsg] = useState<string | undefined>();
  const [mudo, setMudo] = useState(false);
  const [cameraLigada, setCameraLigada] = useState(false);
  const [cameraFrontal, setCameraFrontal] = useState(true);
  const [camStream, setCamStream] = useState<MediaStream | null>(null);
  const [falaProfessor, setFalaProfessor] = useState("");
  const [quadro, setQuadro] = useState<QuadroDados | null>(null);

  // executa as ferramentas que o professor chama durante a ligação
  const executarFerramenta = useCallback(
    async (nome: string, args: Record<string, unknown>): Promise<string> => {
      const s = (k: string) => String(args[k] ?? "");
      const arr = (k: string) =>
        Array.isArray(args[k]) ? (args[k] as unknown[]).map((x) => String(x)) : [];
      switch (nome) {
        case "rolar_pagina":
          return rolarPagina(s("direcao") || "baixo");
        case "ir_para_secao":
          return irParaSecao(s("secao"));
        case "destacar_trecho":
          return destacarTrecho(s("trecho"));
        case "ir_para_licao": {
          const slug = acharSlugLicao(s("licao"));
          if (!slug) return "não achei essa lição no curso";
          router.push(`/licao/${slug}`);
          return `levei o aluno pra lição ${slug}`;
        }
        case "abrir_quadro":
          setQuadro({ tipo: "vazio", titulo: s("titulo") || "Quadro" });
          return "quadro aberto";
        case "quadro_fluxo":
          setQuadro({ tipo: "fluxo", titulo: s("titulo"), passos: arr("passos") });
          return "fluxograma desenhado";
        case "quadro_passos":
          setQuadro({ tipo: "passos", titulo: s("titulo"), passos: arr("passos") });
          return "passos mostrados";
        case "quadro_codigo":
          setQuadro({
            tipo: "codigo",
            titulo: s("titulo"),
            codigo: s("codigo"),
            legenda: s("legenda"),
          });
          return "código mostrado no quadro";
        case "quadro_comparacao":
          setQuadro({
            tipo: "comparacao",
            titulo: s("titulo"),
            tituloA: s("tituloA"),
            itensA: arr("itensA"),
            tituloB: s("tituloB"),
            itensB: arr("itensB"),
          });
          return "comparação mostrada";
        case "fechar_quadro":
          setQuadro(null);
          return "quadro fechado";
        default:
          return "não conheço essa ferramenta";
      }
    },
    [router]
  );

  // carrega conversa salva
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) {
        const arr = JSON.parse(raw) as ChatMsg[];
        if (Array.isArray(arr)) setMensagens(arr);
      }
    } catch {
      /* primeira visita */
    }
    setCarregado(true);
  }, []);

  // salva conversa (sem o blob da imagem, pra não estourar o localStorage)
  useEffect(() => {
    if (!carregado) return;
    try {
      const enxuto = mensagens
        .filter((m) => !m.pendente)
        .map(({ id, role, texto, imagem }) => ({
          id,
          role,
          texto,
          imagem: imagem ? "[imagem enviada]" : undefined,
        }));
      localStorage.setItem(CHAVE, JSON.stringify(enxuto.slice(-40)));
    } catch {
      /* sem espaço — tudo bem */
    }
  }, [mensagens, carregado]);

  const pegarContexto = useCallback(
    () => coletarContexto(pathname || "/", concluidasRef.current),
    [pathname]
  );

  const enviar = useCallback(
    async (texto: string, imagemDataUrl?: string) => {
      const limpo = texto.trim();
      if ((!limpo && !imagemDataUrl) || enviando) return;

      const idUser = novoId();
      const idBot = novoId();
      const userMsg: ChatMsg = {
        id: idUser,
        role: "user",
        texto: limpo,
        imagem: imagemDataUrl,
      };
      const botMsg: ChatMsg = { id: idBot, role: "model", texto: "", pendente: true };

      // histórico que vai pra API (antes de adicionar o placeholder do bot)
      const historico = [...mensagens, userMsg].map((m) => ({
        role: m.role,
        texto: m.texto,
      }));

      setMensagens((prev) => [...prev, userMsg, botMsg]);
      setEnviando(true);

      // separa mime + base64 da imagem
      let imagem: { data: string; mime: string } | null = null;
      if (imagemDataUrl) {
        const match = imagemDataUrl.match(/^data:([^;]+);base64,(.+)$/);
        if (match) imagem = { mime: match[1], data: match[2] };
      }

      const atualizarBot = (texto: string, pendente: boolean) =>
        setMensagens((prev) =>
          prev.map((m) => (m.id === idBot ? { ...m, texto, pendente } : m))
        );

      try {
        const dec = new TextDecoder();
        const continuacoes: Array<{
          calls: Array<{ id?: string; name: string; args?: Record<string, unknown> }>;
          results: Array<{ id?: string; name: string; result: string }>;
        }> = [];
        let acc = "";

        // laço agêntico: o professor pode chamar ferramentas e continuar
        for (let rodada = 0; rodada < 5; rodada++) {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mensagens: historico,
              imagem,
              contexto: pegarContexto(),
              continuacoes,
            }),
          });

          if (!res.ok || !res.body) {
            const txt = await res.text().catch(() => "");
            acc = acc || txt || "Deu um probleminha aqui. Tenta de novo 🙏";
            break;
          }

          const reader = res.body.getReader();
          let buf = "";
          let chamadas: Array<{
            id?: string;
            name: string;
            args?: Record<string, unknown>;
          }> = [];

          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            const linhas = buf.split("\n");
            buf = linhas.pop() ?? "";
            for (const ln of linhas) {
              const s = ln.trim();
              if (!s) continue;
              let ev: { type?: string; v?: string; calls?: typeof chamadas };
              try {
                ev = JSON.parse(s);
              } catch {
                continue;
              }
              if (ev.type === "text" && ev.v) {
                acc += ev.v;
                atualizarBot(acc, true);
              } else if (ev.type === "calls" && ev.calls) {
                chamadas = ev.calls;
              }
            }
          }

          if (chamadas.length === 0) break;

          // executa as ferramentas no navegador e volta os resultados pro modelo
          const results = await Promise.all(
            chamadas.map(async (c) => ({
              id: c.id,
              name: c.name,
              result: await executarFerramenta(c.name, c.args ?? {}),
            }))
          );
          continuacoes.push({ calls: chamadas, results });
          imagem = null; // imagem só na primeira rodada
        }

        atualizarBot(acc || "(pronto ✨)", false);
      } catch {
        atualizarBot("Sem conexão com a IA. Tenta de novo daqui a pouco.", false);
      } finally {
        setEnviando(false);
      }
    },
    [enviando, mensagens, pegarContexto, executarFerramenta]
  );

  const limpar = useCallback(() => {
    setMensagens([]);
    try {
      localStorage.removeItem(CHAVE);
    } catch {
      /* noop */
    }
  }, []);

  // acumula a transcrição da ligação (com quem falou) pra virar memória
  const registrar = useCallback((falante: "aluno" | "prof", texto: string) => {
    if (!texto) return;
    if (ultimoFalanteRef.current !== falante) {
      transcricaoRef.current += `\n${falante === "aluno" ? "Aluno" : "Pyto"}: `;
      ultimoFalanteRef.current = falante;
    }
    transcricaoRef.current += texto;
    if (transcricaoRef.current.length > 5000) {
      transcricaoRef.current = transcricaoRef.current.slice(-5000);
    }
  }, []);

  // ---- ligação ----
  const iniciarChamada = useCallback(
    async (comCamera = false) => {
      if (sessaoRef.current) return;
      setFalaProfessor("");
      setChamadaMsg(undefined);
      setMudo(false);
      ultimoFalanteRef.current = null;

      const sess = new LiveSessao({
        onStatus: (s, msg) => {
          setChamadaStatus(s);
          if (msg) setChamadaMsg(msg);
          if (s === "idle" || s === "erro") {
            sessaoRef.current = null;
            setCameraLigada(false);
            setCamStream(null);
          }
        },
        onFalaProfessor: (t) => {
          setFalaProfessor((prev) => (prev + t).slice(-400));
          registrar("prof", t);
        },
        onFalaAluno: (t) => registrar("aluno", t),
        onCameraStream: (st, frontal) => {
          setCamStream(st);
          setCameraLigada(!!st);
          setCameraFrontal(frontal);
        },
        onToolCall: executarFerramenta,
      });
      sessaoRef.current = sess;

      // memória: conversa anterior (voz) + chat escrito recente
      let memoria = "";
      try {
        memoria = localStorage.getItem(CHAVE_MEMORIA) || "";
      } catch {
        /* noop */
      }
      const chatRecente = mensagensRef.current
        .filter((m) => m.texto)
        .slice(-6)
        .map((m) => `${m.role === "user" ? "Aluno" : "Pyto"}: ${m.texto}`)
        .join("\n");
      const memoriaCompleta = [memoria, chatRecente && `No chat escrito:\n${chatRecente}`]
        .filter(Boolean)
        .join("\n\n");

      const ctx = coletarContexto(pathname || "/", concluidasRef.current);
      await sess.iniciar(montarPersonaVoz(ctx, memoriaCompleta), comCamera);
    },
    [pathname, executarFerramenta, registrar]
  );

  const encerrarChamada = useCallback(async () => {
    await sessaoRef.current?.encerrar();
    sessaoRef.current = null;
    // salva a conversa pra próxima ligação manter o contexto
    const t = transcricaoRef.current.trim();
    if (t) {
      try {
        const anterior = localStorage.getItem(CHAVE_MEMORIA) || "";
        const junto = `${anterior}\n${t}`.slice(-5000);
        localStorage.setItem(CHAVE_MEMORIA, junto);
      } catch {
        /* noop */
      }
    }
    transcricaoRef.current = "";
    setChamadaStatus("idle");
    setCameraLigada(false);
    setCamStream(null);
    setFalaProfessor("");
    setMudo(false);
  }, []);

  const toggleMudoChamada = useCallback(() => {
    const novo = sessaoRef.current?.toggleMudo() ?? false;
    setMudo(novo);
  }, []);

  const toggleCameraChamada = useCallback(async () => {
    const sess = sessaoRef.current;
    if (!sess) return;
    if (sess.cameraLigada) sess.desligarCamera();
    else await sess.ligarCamera();
  }, []);

  const virarCamera = useCallback(async () => {
    await sessaoRef.current?.virarCamera();
  }, []);

  const fecharQuadro = useCallback(() => setQuadro(null), []);

  // VISÃO DA TELA EM TEMPO REAL durante a ligação:
  // manda pro professor o que está visível no viewport, atualizando quando o
  // aluno rola a página ou troca de lição (com dedupe pra não repetir igual).
  useEffect(() => {
    if (chamadaStatus !== "live") return;

    let ultimo = "";
    let timer: ReturnType<typeof setTimeout> | null = null;

    const enviarAgora = () => {
      const sess = sessaoRef.current;
      if (!sess) return;
      const desc = coletarVisivel(pathname || "/");
      if (!desc || desc === ultimo) return;
      ultimo = desc;
      sess.enviarContexto(`[TELA AGORA]\n${desc}`);
    };

    // manda o estado inicial assim que a ligação fica de pé
    const inicial = setTimeout(enviarAgora, 300);

    const aoRolar = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(enviarAgora, 600);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });

    return () => {
      clearTimeout(inicial);
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [pathname, chamadaStatus]);

  // quando o aluno SUBLINHA/seleciona um texto, conta pro professor
  useEffect(() => {
    if (chamadaStatus !== "live") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let ultimo = "";
    const aoSelecionar = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const sel = window.getSelection?.()?.toString().trim() ?? "";
        if (sel.length >= 4 && sel !== ultimo) {
          ultimo = sel;
          sessaoRef.current?.enviarContexto(
            `[ALUNO SUBLINHOU] "${sel.slice(0, 400)}"`
          );
        }
      }, 600);
    };
    document.addEventListener("selectionchange", aoSelecionar);
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("selectionchange", aoSelecionar);
    };
  }, [chamadaStatus]);

  return (
    <AssistenteCtx.Provider
      value={{
        aberto,
        abrir: () => setAberto(true),
        fechar: () => setAberto(false),
        mensagens,
        enviando,
        enviar,
        limpar,
        pegarContexto,
        chamadaStatus,
        chamadaMsg,
        mudo,
        cameraLigada,
        cameraFrontal,
        camStream,
        falaProfessor,
        iniciarChamada,
        encerrarChamada,
        toggleMudoChamada,
        toggleCameraChamada,
        virarCamera,
        quadro,
        fecharQuadro,
      }}
    >
      {children}
    </AssistenteCtx.Provider>
  );
}

export function useAssistente() {
  const ctx = useContext(AssistenteCtx);
  if (!ctx) throw new Error("useAssistente precisa de <AssistenteProvider>");
  return ctx;
}
