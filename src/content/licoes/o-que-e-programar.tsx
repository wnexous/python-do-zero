"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";

export default function OQueEProgramar() {
  return (
    <article className="leitura">
      <Hero
        emoji="🤖"
        titulo="O que é programar?"
        subtitulo="Dar ordem pro computador (ele é meio burro, mas obedece tudo)"
      />

      <p>
        Bora começar do <strong>comecinho de tudo</strong>, sem enrolação. Você
        provavelmente acha que programar é coisa de gênio com óculos digitando
        verde igual no filme. <strong>Não é.</strong>
      </p>

      <p>
        Programar é só uma coisa: <strong>dar ordens pro computador</strong>. Só
        isso. Você escreve uma listinha de instruções, ele lê de cima pra baixo e
        faz <em>exatamente</em> o que você mandou. Nem mais, nem menos.
      </p>

      <Frase>
        O computador é tipo um cachorro <em>muito</em> obediente, só que sem
        bom-senso nenhum.
      </Frase>

      <p>
        Se você mandar ele &ldquo;buscar a bolinha&rdquo;, ele busca. Se você
        mandar ele &ldquo;pular do prédio&rdquo;... ele pula, porque ele não pensa,
        só obedece. Toda a &ldquo;inteligência&rdquo; tem que vir de você, na hora
        de escrever as ordens. Por isso programar dá um trabalhinho — mas é um
        trabalho que qualquer um aprende.
      </p>

      <H2>Tipo uma receita de bolo 🍰</H2>

      <p>
        Pensa numa receita. Ela é uma sequência de passos, na ordem certa, bem
        explicadinhos:
      </p>

      <ol>
        <li>Quebre 2 ovos numa tigela</li>
        <li>Coloque 1 xícara de farinha</li>
        <li>Misture tudo</li>
        <li>Leve ao forno por 30 minutos</li>
      </ol>

      <p>
        Um <strong>programa</strong> é a mesma coisa, só que em vez de bolo a
        gente manda o computador fazer outras coisas: mostrar um texto, fazer uma
        conta, guardar uma informação. Cada linha que você escreve é{" "}
        <strong>um passo da receita</strong>.
      </p>

      <Callout tipo="curiosidade" titulo="Por que o computador é burro?">
        <p>
          Ele só sabe fazer coisinhas ridiculamente simples: somar, comparar,
          guardar um número. A graça é que ele faz isso{" "}
          <strong>bilhões de vezes por segundo</strong> sem reclamar nem tomar
          café. A esperteza vem de juntar várias ordens simples até virar algo
          útil.
        </p>
      </Callout>

      <H2>E o Python, onde entra nessa história? 🐍</H2>

      <p>
        Aqui vem o pulo do gato. O computador, lá no fundo, só entende{" "}
        <strong>0 e 1</strong> (sério, é só isso, um monte de liga-desliga). Tentar
        falar com ele nessa língua seria um inferno.
      </p>

      <p>
        Então criaram <strong>linguagens de programação</strong>: um jeito de
        escrever ordens que <em>você</em> entende, e que o computador também
        consegue traduzir. O <strong>Python</strong> é uma dessas linguagens — e é
        a mais <em>fofa</em> de todas, porque ela é quase igual escrever em inglês.
        Olha que coisa linda:
      </p>

      <Terminal
        arquivo="primeiro.py"
        code={`print("Tô aprendendo a programar!")`}
        saida={`Tô aprendendo a programar!`}
        velocidade={42}
      />

      <p>
        Tá vendo? Você quase consegue <em>ler em voz alta</em>: &ldquo;print
        (imprime) esse texto aqui&rdquo;. E o computador, obediente, escreveu o
        texto na tela. <strong>Isso já é um programa de verdade.</strong> Parabéns,
        tecnicamente você já programou (eu fiz, mas conta como seu).
      </p>

      <Callout tipo="dica" titulo="Não precisa decorar nada agora">
        <p>
          Você não precisa entender cada pedacinho desse código ainda. Calma. A
          gente vai destrinchar tudo nas próximas lições, devagarzinho, sem
          pressa. Por enquanto só absorve a ideia: <strong>código = ordens</strong>.
        </p>
      </Callout>

      <H2>Como o computador lê seu código 👀</H2>

      <p>
        Isso é importante e a galera esquece: o computador lê seu programa{" "}
        <strong>de cima pra baixo</strong>, uma linha de cada vez, igual você lê um
        texto. Linha 1, depois linha 2, depois linha 3...
      </p>

      <Terminal
        arquivo="ordem.py"
        code={`print("primeiro isso")
print("depois isso")
print("e por último isso")`}
        saida={`primeiro isso
depois isso
e por último isso`}
        velocidade={30}
      />

      <p>
        A ordem importa! Se você trocar as linhas de lugar, a saída muda. O
        computador não &ldquo;adivinha&rdquo; o que você quis dizer — ele faz na
        sequência que tá escrito. Guarda isso no coração. 💚
      </p>

      <Frase>
        Programar não é decorar. É aprender a pensar em passos bem explicadinhos.
      </Frase>

      <p>
        E é exatamente isso que a gente vai treinar daqui pra frente. Sem pressa,
        com bastante desenho se mexendo pra clarear a cabeça. Bora?
      </p>

      <Exercicio
        licao="O que é programar?"
        enunciado="Sem usar código nenhum! Escreve em português, em passos numerados (tipo receita), como você ensinaria um robô totalmente burro a escovar os dentes. Quanto mais detalhado e na ordem certa, melhor."
        criterio="O aluno deve listar passos curtos, em ordem lógica e bem explicados (ex: 1. pegar a escova, 2. abrir a pasta, 3. colocar pasta na escova, 4. escovar, 5. cuspir, 6. enxaguar). O ponto é demonstrar que entendeu que 'programar = quebrar uma tarefa em passos simples e ordenados'. Não é código Python, é pensamento em passos. Valorize ordem e clareza; não exija perfeição."
        placeholder={"1. ...\n2. ...\n3. ..."}
      />

      <p>
        Mandou o exercício? Maravilha. Na próxima a gente aprende a fazer o
        computador <strong>falar</strong> com aquele tal de{" "}
        <code>print()</code>. Vira a página (ou aperta &ldquo;Próxima&rdquo; ali
        embaixo 👇).
      </p>
    </article>
  );
}
