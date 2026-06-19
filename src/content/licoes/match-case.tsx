"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaMatch } from "@/components/cenas/match";

export default function MatchCase() {
  return (
    <article className="leitura">
      <Hero
        emoji="🔀"
        titulo="match / case — o switch do Python"
        subtitulo="Quando tem MUITA opção, esse aqui é mais limpo que um monte de elif"
      />

      <p>
        Lembra do <code>if / elif / else</code> da lição passada? Ele é um
        canivete suíço, resolve quase tudo. Mas tem uma situação que deixa ele
        feio: quando você compara <strong>a mesma variável</strong> com{" "}
        <strong>um montão de valores</strong>. Aí vira aquela escadinha sem fim:
      </p>

      <CodeBlock
        code={`comando = "pular"

if comando == "andar":
    print("Você anda 🚶")
elif comando == "pular":
    print("Você pula 🦘")
elif comando == "correr":
    print("Você corre 🏃")
elif comando == "dormir":
    print("Você dorme 😴")
else:
    print("Não entendi 🤔")`}
      />

      <p>
        Funciona, mas é <em>cansativo</em> de ler e de escrever:{" "}
        <code>comando ==</code> isso, <code>comando ==</code> aquilo, repetindo o
        nome da variável umas mil vezes. Saco.
      </p>

      <Frase>
        Em muitas linguagens isso se chama <em>switch case</em>. No Python, ele
        tem outro nome: <strong>match / case</strong>.
      </Frase>

      <Callout tipo="curiosidade" titulo="Cadê o &lsquo;switch&rsquo;?">
        <p>
          Se você já ouviu falar de programação, deve ter escutado{" "}
          <strong>&ldquo;switch case&rdquo;</strong> — é o nome desse recurso em
          linguagens tipo C, Java, JavaScript. O Python demorou pra ter isso e,
          quando teve (lá na versão 3.10, em 2021), chamou de{" "}
          <code>match</code>. Então: <strong>match é o switch do Python</strong>.
          Mesma ideia, nome diferente.
        </p>
      </Callout>

      <H2>Como é a cara do match 🔬</H2>

      <p>
        Você escreve <code>match</code> seguido da variável que quer
        &ldquo;analisar&rdquo;, dois pontos <code>:</code>, e embaixo (indentado,
        igual no <code>if</code>) vários <code>case</code> — um pra cada valor
        possível:
      </p>

      <Terminal
        arquivo="comando.py"
        code={`comando = "pular"

match comando:
    case "andar":
        print("Você anda 🚶")
    case "pular":
        print("Você pula 🦘")
    case "correr":
        print("Você corre 🏃")`}
        saida={`Você pula 🦘`}
        velocidade={22}
      />

      <p>
        Lê-se mais ou menos assim: &ldquo;<strong>olha</strong> o{" "}
        <code>comando</code>: <strong>no caso</strong> de ser &lsquo;andar&rsquo;,
        faz isso; <strong>no caso</strong> de ser &lsquo;pular&rsquo;, faz
        aquilo&rdquo;. O Python compara a variável com cada <code>case</code> de
        cima pra baixo e, no <strong>primeiro que bate</strong>, executa o bloco e
        vai embora. Bem mais limpo, né?
      </p>

      <p>Toca aí pra ver qual case acende dependendo do valor:</p>

      <CenaMatch
        variavel="fruta"
        casos={[
          { valor: "🍎", resultado: 'print("É uma maçã!")' },
          { valor: "🍌", resultado: 'print("É uma banana!")' },
          { valor: "🍇", resultado: 'print("É uma uva!")' },
        ]}
        defaultResultado={'print("Fruta desconhecida 🤷")'}
      />

      <H2>O coringa: <code>case _</code> 🃏</H2>

      <p>
        E se a variável não bater com <em>nenhum</em> case? Por padrão, o Python
        simplesmente... não faz nada. Pra não deixar ninguém na mão, existe o{" "}
        <strong>coringa</strong>: <code>case _</code> (isso, um{" "}
        <strong>underline/underscore</strong> sozinho). Ele é o &ldquo;qualquer
        outra coisa&rdquo;, o plano B — exatamente como o <code>else</code> era no{" "}
        <code>if</code>.
      </p>

      <Terminal
        arquivo="coringa.py"
        code={`comando = "voar"

match comando:
    case "andar":
        print("Você anda 🚶")
    case "pular":
        print("Você pula 🦘")
    case _:
        print("Não dá pra fazer isso 🤔")`}
        saida={`Não dá pra fazer isso 🤔`}
        velocidade={22}
      />

      <Callout tipo="dica" titulo="O _ é tipo o &lsquo;etc&rsquo;">
        <p>
          Pensa no <code>_</code> como o <strong>&ldquo;senão&rdquo;</strong> da
          história. Sempre que você não souber todas as opções que podem chegar
          (e quase nunca sabe!), bota um <code>case _</code> no final pra dar uma
          resposta decente em vez de o programa ficar mudo.
        </p>
      </Callout>

      <H2>Vários valores no mesmo case com <code>|</code> 🎯</H2>

      <p>
        Às vezes opções diferentes devem fazer a <strong>mesma coisa</strong>. Em
        vez de repetir, junte os valores com a barrinha <code>|</code> (que aqui
        significa <strong>&ldquo;ou&rdquo;</strong>):
      </p>

      <Terminal
        arquivo="resposta.py"
        code={`resposta = "claro"

match resposta:
    case "sim" | "claro" | "pode":
        print("Combinado! ✅")
    case "não" | "nunca":
        print("Tudo bem, fica pra próxima 🙂")
    case _:
        print("Responde sim ou não 😅")`}
        saida={`Combinado! ✅`}
        velocidade={20}
      />

      <p>
        Aqui, digitar <code>&ldquo;sim&rdquo;</code>,{" "}
        <code>&ldquo;claro&rdquo;</code> ou <code>&ldquo;pode&rdquo;</code> cai
        todo mundo no mesmo lugar. Economia de digitação e de paciência. 😌
      </p>

      <H2>Um exemplo de verdade: menuzinho 🍔</H2>

      <p>
        Junta com o que você já aprendeu (<code>input</code> da lição do Módulo 2)
        e olha que coisa linda — um menu de lanchonete:
      </p>

      <Terminal
        arquivo="menu.py"
        code={`print("1 - Hambúrguer")
print("2 - Pizza")
print("3 - Açaí")

opcao = input("Escolhe um número: ")

match opcao:
    case "1":
        print("Saiu um hambúrguer! 🍔")
    case "2":
        print("Pizza chegando! 🍕")
    case "3":
        print("Açaí na tigela! 🍧")
    case _:
        print("Esse número não tá no cardápio 😅")`}
        saida={`1 - Hambúrguer
2 - Pizza
3 - Açaí
Escolhe um número: 2
Pizza chegando! 🍕`}
        velocidade={16}
      />

      <Callout tipo="cuidado" titulo="Os errinhos clássicos do match">
        <p>
          1) <strong>Precisa do Python 3.10 ou mais novo</strong> — em versões
          velhas o <code>match</code> nem existe.
          <br />
          2) Não esquece os <strong>dois pontos</strong> <code>:</code> no{" "}
          <code>match</code> e em cada <code>case</code>.
          <br />
          3) O conteúdo de cada <code>case</code> tem que estar{" "}
          <strong>indentado</strong> (recuado), igualzinho no <code>if</code>.
          <br />
          4) O coringa é <code>case _</code> com <strong>underline</strong>, não é{" "}
          a palavra &ldquo;else&rdquo;.
        </p>
      </Callout>

      <H2>match ou if? Qual eu uso? 🤷</H2>

      <p>Regrinha de bolso, sem complicar:</p>

      <ul>
        <li>
          <strong>match</strong> → quando você compara <em>uma variável</em> com
          vários <strong>valores fixos e certinhos</strong> (1, 2, 3; sim/não;
          nomes de comando). Fica lindo e organizado.
        </li>
        <li>
          <strong>if / elif</strong> → quando a decisão envolve{" "}
          <strong>condições mais soltas</strong>, tipo faixas e comparações (
          <code>{"idade >= 18"}</code>, <code>{"nota > 7 and presenca > 75"}</code>
          ). O match não curte muito esse tipo de coisa.
        </li>
      </ul>

      <Frase>
        Os dois fazem o programa <em>escolher</em>. O match é só o jeito mais
        arrumadinho quando as opções são muitas e fixas.
      </Frase>

      <Exercicio
        licao="match / case"
        enunciado="Escreve um match que olha uma variável chamada cor. Se for &ldquo;verde&rdquo;, mostra &lsquo;Pode passar 🟢&rsquo;; se for &ldquo;vermelho&rdquo;, mostra &lsquo;Pare 🔴&rsquo;; e pra qualquer outra coisa, mostra &lsquo;Sei lá, dirige com cuidado 😅&rsquo;."
        criterio={`O esperado é um bloco match/case tipo:
match cor:
    case "verde":
        print("Pode passar 🟢")
    case "vermelho":
        print("Pare 🔴")
    case _:
        print("Sei lá, dirige com cuidado 😅")
Aceite variações de texto e emojis. O que importa: usar 'match cor:' com dois pontos, ter pelo menos os case "verde" e "vermelho" com seus prints indentados, e um 'case _' como coringa/padrão. Se faltar o case _ (coringa), marque como "quase" e explique com carinho que é ele quem cuida do "qualquer outra cor". Se esquecer os dois pontos ou a indentação, também é "quase". Não exija sintaxe 100% perfeita de acento/aspas.`}
        placeholder={`match cor:\n    case "verde":\n        print(...)`}
      />

      <p>
        Mandou bem! Agora você tem <strong>dois</strong> jeitos de fazer o
        programa tomar decisão: o <code>if</code> flexível e o <code>match</code>{" "}
        arrumadinho. No próximo módulo a brincadeira muda: a gente vai aprender a
        mandar o computador <strong>repetir</strong> tarefas sem reclamar. Bora pro{" "}
        <code>while</code>! 🔁
      </p>
    </article>
  );
}
