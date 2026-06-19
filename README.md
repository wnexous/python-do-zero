# 🐍 Python do Zero

Curso de Python pra quem **nunca programou na vida**. Explicado fácil, com
desenho que se mexe e umas piadas no meio — do `print()` até listas e tuplas.
Feito pra ser usado **no celular**, sem cadastro e sem login.

Os exercícios são corrigidos por **IA (Google Gemini)** com um tom gentil e
descontraído, do jeitinho de quem tá começando.

## 🧱 Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** (tema dark "editorial tech", accent verde-terminal)
- **motion** (Framer Motion) pras animações
- Ilustrações em **SVG/JSX animadas** feitas à mão
- **Google Gemini** pra correção dos exercícios (rodando no servidor, via Route Handler)

## 📚 Conteúdo (5 módulos, 14 lições)

1. **Primeiros passos** — o que é programar, `print()`, variáveis, tipos
2. **Texto e números** — strings, contas, `input()`
3. **Tomar decisões** — booleanos, `if / elif / else`, `match / case` (o "switch" do Python)
4. **Repetir tarefas** — `while`, `for` e `range`
5. **Guardar muitas coisas** — listas e tuplas

## 🔑 A chave da IA (Gemini)

A correção dos exercícios usa o Gemini. A chave fica **só no servidor** — o
navegador nunca a vê (por isso a variável **não** tem o prefixo `NEXT_PUBLIC_`).

Pega uma chave grátis em **https://aistudio.google.com/apikey**.

### Rodando localmente

```bash
npm install
cp .env.example .env.local      # cole sua chave em GEMINI_API_KEY
npm run dev                     # abre em http://localhost:3000
```

Sem a chave o site funciona normalmente; só a correção por IA mostra um aviso
amigável de "ainda não configurada".

## 🚀 Deploy na Vercel (recomendado)

1. Suba este repositório no GitHub (já está).
2. Entre em **https://vercel.com/new** e **importe** o repositório.
3. Em **Environment Variables**, adicione:
   - `GEMINI_API_KEY` = sua chave do AI Studio
   - (opcional) `GEMINI_MODEL` = `gemini-3.5-flash`
4. Clique em **Deploy**. Pronto — você recebe um link público `https://...vercel.app`.

> Por que Vercel e não GitHub Pages? Porque a correção por IA precisa de um
> servidorzinho (o GitHub Pages só serve arquivos estáticos). A Vercel roda o
> Route Handler `/api/corrigir` de graça.

## 🗂 Estrutura

```
src/
├── app/
│   ├── page.tsx                 # home (índice dos módulos)
│   ├── licao/[slug]/page.tsx    # página de cada lição
│   └── api/corrigir/route.ts    # correção por IA (Gemini, server-side)
├── components/
│   ├── code/                    # terminal animado, code block, highlight
│   ├── cenas/                   # animações didáticas (variável, lista, loop, if...)
│   ├── prose.tsx, callout.tsx, exercicio.tsx, lesson-shell.tsx ...
├── content/
│   ├── curso.ts                 # índice/ordem dos módulos e lições
│   └── licoes/*.tsx             # uma lição por arquivo
└── lib/utils.ts
```

Quer escrever ou editar uma lição? Veja `docs/LESSON_SPEC.md`.

---

Feito com 🐍 e paciência. Programar é só dar ordem pro computador — e ele
_adora_ obedecer.
