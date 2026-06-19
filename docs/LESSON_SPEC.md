# Como escrever uma lição (spec pra quem cria conteúdo)

Cada lição é **um arquivo** em `src/content/licoes/<slug>.tsx` que exporta como
`default` um componente React de função. O arquivo COMEÇA com `"use client";`.

Veja os dois exemplos-ouro já prontos e copie o estilo:

- `src/content/licoes/o-que-e-programar.tsx`
- `src/content/licoes/print.tsx`

## Esqueleto obrigatório

```tsx
"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
// importe só as cenas que usar (veja lista abaixo)

export default function NomeDaLicao() {
  return (
    <article className="leitura">
      <Hero emoji="..." titulo="..." subtitulo="..." />
      {/* ...conteúdo... */}
    </article>
  );
}
```

O wrapper `<article className="leitura">` já estiliza `<p>`, `<strong>`, `<em>`,
`<code>`, `<ul>`, `<ol>`, `<li>`, `<h3>` automaticamente. Use HTML normal pra texto.

## Componentes disponíveis (caminhos EXATOS)

### Texto / estrutura
- `import { Hero, H2, Frase } from "@/components/prose";`
  - `<Hero emoji="🐍" titulo="Título" subtitulo="chamada curta e engraçada" />` — abre a lição (use UMA vez, no topo).
  - `<H2>Título da seção</H2>` — divisória de seção.
  - `<Frase>frase de efeito</Frase>` — citação de destaque, serifada.

### Código
- `import { Terminal } from "@/components/code/terminal";`
  - `<Terminal arquivo="exemplo.py" code={`...`} saida={`...`} velocidade={30} />`
  - `code` e `saida` SEMPRE em template literal (crase). `saida` é o que aparece ao "rodar".
  - `velocidade` ms por caractere (menor = mais rápido). Use 24–45. Snippet grande → 24.
  - Use Terminal pra TODO exemplo executável. É o componente principal. Use vários.
- `import { CodeBlock } from "@/components/code/code-block";`
  - `<CodeBlock code={`...`} />` — código estático (sem animar). Bom pra dissecar sintaxe.

### Recados (caixas coloridas)
- `import { Callout } from "@/components/callout";`
  - `<Callout tipo="dica" titulo="opcional">conteúdo em <p>...</p></Callout>`
  - tipos: `"dica"` | `"cuidado"` | `"curiosidade"` | `"lembrete"` | `"piada"`
  - O conteúdo deve ser `<p>...</p>` (um ou mais).

### Exercício com correção por IA (1 a 2 por lição, perto do fim)
- `import { Exercicio } from "@/components/exercicio";`
  - `<Exercicio licao="Título da lição" enunciado="..." criterio="..." placeholder="..." />`
  - `enunciado`: o que o aluno faz (claro, curtinho, pode ter humor).
  - `criterio`: instruções PRA IA de como corrigir (qual é a resposta boa, o que aceitar,
    o que é "quase"). Escreva detalhado — só a IA lê isso, o aluno não vê.
  - `placeholder`: dica do formato no campo (ex: `print("...")`).

### Cenas animadas (use a que combinar com o tema da lição)
- `import { CenaVariavel, Caixa } from "@/components/cenas/caixa-variavel";`
  - `<CenaVariavel nome="idade" passos={["10", "11", "100"]} cor="primary" />` — mostra a variável recebendo valores em sequência (animado). `cor`: primary|sky|sun|rose|grape.
  - `<Caixa nome="x" valor="5" cor="sky" />` — uma caixinha avulsa (presentacional).
- `import { CenaPrint, CenaTipos } from "@/components/cenas/tipos-print";`
  - `<CenaPrint exemplos={["a", "b", "c"]} />` — texto entra no print() e sai na telinha.
  - `<CenaTipos exemplos={[{valor:'"oi"',tipo:"str"},{valor:"27",tipo:"int"},{valor:"1.5",tipo:"float"},{valor:"True",tipo:"bool"}]} />` — cartões de tipo. tipos: str|int|float|bool.
- `import { CenaComparacao } from "@/components/cenas/comparacao";`
  - `<CenaComparacao casos={[{a:"10",op:">",b:"3",resultado:true}]} />` — comparações virando True/False.
- `import { CenaIf } from "@/components/cenas/fluxo-if";`
  - `<CenaIf condicao="tá com fome?" caminhoSim="🍕 come pizza" caminhoNao="😴 vai dormir" />` — decisão if/else interativa (toggle).
- `import { CenaLoop } from "@/components/cenas/loop";`
  - `<CenaLoop de={1} ate={5} rotulo="volta" modelo={(n) => `Volta ${n}`} />` — loop rodando, contador subindo, saídas acumulando.
- `import { CenaLista, CenaTupla } from "@/components/cenas/lista";`
  - `<CenaLista />` — demo interativa de lista (adicionar/remover/percorrer). Sem props.
  - `<CenaTupla />` — demo de tupla trancada (não deixa mudar). Sem props.

## Regras de JSX (pra não quebrar o build) ⚠️

1. Em `code={`...`}` e `saida={`...`}` use sempre **template literal (crase)**. Pode ter aspas, `<`, `>`, `{`, `}` à vontade lá dentro — é string.
2. No TEXTO em JSX (fora de strings), os caracteres `<`, `{` e `}` são proibidos crus.
   - Pra mostrar operadores no meio do texto, use `<code>` com string: `<code>{">"}</code>`, `<code>{">="}</code>`, `<code>{"<"}</code>`, `<code>{"i = i + 1"}</code>`.
   - Aspas (`"`/`'`) e `>` sozinho no texto até funcionam, mas prefira entidades pra ficar limpo: `&ldquo; &rdquo;` pras aspas, `&gt;`/`&lt;` pros sinais quando soltos.
3. Não use imagens externas, nem libs novas, nem `fetch`. Só os componentes acima.

## Tom & estilo (MUITO importante)

- Público: gente que **NUNCA programou** e tem medo/preguiça. Escreva como se
  explicasse pra uma criança ou pro seu tio leigo. Frases curtas. Zero jargão sem explicar.
- Descontraído, brincalhão, com piadinhas. Pode usar **gírias e palavrão leve** de
  vez em quando (porra, pra caralho, saco, mer*) — com moderação, sem ofender ninguém,
  nunca xingando o aluno. O humor é pra relaxar, não pra ser grosso.
- **Conteúdo GRANDE**: a pessoa pediu lições longas e completas. Capriche. Várias
  seções com `<H2>`, vários exemplos no `<Terminal>`, analogias do dia a dia,
  `<Callout>` espalhados, pelo menos uma `<Frase>` de efeito. Mas SEM textão massante:
  parágrafos curtos, muita animação no meio, leitura leve que não cansa.
- Use **analogias concretas** (caixinha, receita, fila do banco, gaveta, etc).
- Sempre traga ao menos 1 `<Callout tipo="cuidado">` com os errinhos clássicos do tema.
- Feche a lição com uma frase animando pra próxima lição.
- Nível: SÓ o básico. NADA de classes, funções definidas pelo usuário (def), dicionários
  avançados, arquivos, etc. Fique no escopo do tema.
- Português do Brasil, sempre.

## Tamanho alvo

Cada lição: aproximadamente 5 a 9 seções (`H2`), 4 a 8 blocos de `Terminal`/`CodeBlock`,
3 a 6 `Callout`, 1 a 2 `Exercicio`, 1 a 2 cenas animadas relevantes ao tema.
É pra ser substancial — pense "capítulo de livro divertido", não "post de blog".
