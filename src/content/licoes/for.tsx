"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaLoop } from "@/components/cenas/loop";

export default function For() {
  return (
    <article className="leitura">
      <Hero
        emoji="🔂"
        titulo="for e range — repetir contando"
        subtitulo="Repetir um número certinho de vezes, sem dor de cabeça"
      />

      <p>
        Lembra do <code>while</code>? Aquele que fica repetindo{" "}
        <strong>enquanto</strong> uma condição é verdadeira? Ótimo. Agora conhece
        o irmão dele, mais organizado e menos perigoso: o <code>for</code>.
      </p>

      <p>
        O <code>while</code> é meio doidão — ele repete &ldquo;até dar certo&rdquo;,
        e se você bobear ele repete pra sempre. Já o <code>for</code> é aquele
        irmão certinho, que chega e fala: <strong>&ldquo;quantas voltas a gente vai
        dar? Beleza, dou exatamente esse tanto e paro.&rdquo;</strong>
      </p>

      <Frase>
        Quando você JÁ SABE quantas vezes quer repetir, usa <em>for</em>. Simples
        assim.
      </Frase>

      <p>
        Pensa numa professora distribuindo prova pra fila de alunos. Ela não fica
        se perguntando &ldquo;será que tem mais alguém?&rdquo; — ela só passa por{" "}
        <strong>cada aluno da fila</strong>, um por um, entrega a prova, e quando
        a fila acaba, acabou. Isso é um <code>for</code>: dar uma volta pra cada
        item.
      </p>

      <H2>A maquininha de números: range() 🔢</H2>

      <p>
        Antes de usar o <code>for</code> de verdade, você precisa conhecer uma
        ferramentinha que anda sempre coladinha com ele: o <code>range</code>.
      </p>

      <p>
        O <code>range</code> é uma <strong>maquininha que cospe uma sequência de
        números</strong>. Você fala até onde quer ir, e ela gera os números pra
        você contar. Olha o caso mais comum:
      </p>

      <CodeBlock code={`range(5)`} />

      <p>
        Isso gera os números: <code>0, 1, 2, 3, 4</code>. E aqui vem{" "}
        <strong>a pegadinha que confunde TODO mundo</strong>, então cola o olho:
      </p>

      <Callout tipo="cuidado" titulo="O range NÃO inclui o último número!">
        <p>
          <code>range(5)</code> dá <strong>cinco números</strong>, mas eles são{" "}
          <code>0, 1, 2, 3, 4</code>. Repara: <strong>começa no ZERO</strong> e{" "}
          <strong>PARA antes do 5</strong>. O 5 não entra na festa!
        </p>
        <p>
          O jeito de lembrar: o número que você põe é a <em>quantidade</em> de
          voltas (cinco), não o último número. Se você quer contar &ldquo;5
          coisas&rdquo;, <code>range(5)</code> tá certo — só não espera ver o
          número 5 aparecer.
        </p>
      </Callout>

      <p>
        &ldquo;Mas por que começa no zero, isso é coisa de maluco?&rdquo; Eu sei,
        eu sei. Computador <strong>adora começar a contar do zero</strong> — é uma
        mania dele que você vai ver mil vezes. Por enquanto, só aceita e segue o
        baile. 😅
      </p>

      <H2>range com começo e fim 🎯</H2>

      <p>
        E se você não quiser começar no zero? Dá pra falar pro <code>range</code>{" "}
        <strong>onde começar</strong> e <strong>onde parar</strong>, separando por
        vírgula:
      </p>

      <CodeBlock code={`range(1, 6)`} />

      <p>
        Isso gera: <code>1, 2, 3, 4, 5</code>. Começa no <strong>1</strong> e vai
        até <strong>antes do 6</strong>. De novo: o último número (6){" "}
        <strong>não entra</strong>. É sempre &ldquo;do primeiro até antes do
        segundo&rdquo;.
      </p>

      <p>
        Repara que isso é molezinha pra contar de 1 a 5 de um jeito natural, sem
        aquele zero esquisito no começo. Pra contar de 1 até 10, você usaria{" "}
        <code>range(1, 11)</code> — tem que pôr 11 pra incluir o 10. (Eu avisei
        que essa parte confunde.)
      </p>

      <H2>range pulando de número em número 🦘</H2>

      <p>
        Tem ainda um terceiro poder secreto: você pode dizer de{" "}
        <strong>quanto em quanto</strong> a maquininha pula. Isso se chama{" "}
        <strong>passo</strong>:
      </p>

      <CodeBlock code={`range(0, 10, 2)`} />

      <p>
        Isso gera: <code>0, 2, 4, 6, 8</code>. Começa no 0, vai até antes do 10,
        mas pulando <strong>de 2 em 2</strong>. É tipo subir escada de dois
        degraus por vez. Perfeito pra listar só os números pares!
      </p>

      <Callout tipo="dica" titulo="O resumo do range numa caixinha">
        <p>
          <code>range(fim)</code> → começa no 0, vai até antes do fim.
        </p>
        <p>
          <code>range(início, fim)</code> → do início até antes do fim.
        </p>
        <p>
          <code>range(início, fim, passo)</code> → idem, pulando de{" "}
          <em>passo</em> em <em>passo</em>.
        </p>
        <p>
          E NUNCA esquece: o <strong>fim nunca entra</strong>. Tatua isso. 🖊️
        </p>
      </Callout>

      <H2>Juntando tudo: o for de verdade 🔂</H2>

      <p>
        Agora a mágica. O <code>for</code> pega cada número que o{" "}
        <code>range</code> cospe e faz alguma coisa com ele. A sintaxe é assim:
      </p>

      <CodeBlock code={`for i in range(5):
    print(i)`} />

      <p>Vamos quebrar isso em pedacinhos, com calma:</p>

      <ul>
        <li>
          <code>for</code> → a palavra mágica que diz &ldquo;vou repetir&rdquo;.
        </li>
        <li>
          <code>i</code> → uma <strong>variável</strong> que vai assumir{" "}
          <strong>cada valor da vez</strong>. Na primeira volta ela vale 0, na
          segunda vale 1, e por aí vai. (Pode ser qualquer nome — usar{" "}
          <code>i</code> é só costume de programador preguiçoso.)
        </li>
        <li>
          <code>in range(5)</code> → de onde vêm os valores. &ldquo;Pra cada{" "}
          <code>i</code> <em>dentro de</em> <code>range(5)</code>&rdquo;.
        </li>
        <li>
          <code>:</code> → os <strong>dois-pontos</strong>, igual no{" "}
          <code>if</code> e no <code>while</code>. Sem eles, dá erro.
        </li>
        <li>
          A linha de baixo, <strong>com espaços na frente</strong> (indentada), é
          o que vai ser repetido a cada volta.
        </li>
      </ul>

      <p>
        Olha esse mesmo código rodando, contador subindo voltinha por voltinha:
      </p>

      <CenaLoop de={1} ate={5} rotulo="i" modelo={(n) => `i vale ${n}`} />

      <p>
        Tá vendo o <code>i</code> mudando de valor a cada volta? É exatamente isso
        que acontece por dentro. Bora rodar de verdade:
      </p>

      <Terminal
        arquivo="contando.py"
        code={`for i in range(5):
    print(i)`}
        saida={`0
1
2
3
4`}
        velocidade={32}
      />

      <p>
        Cinco voltas, cinco números: 0 a 4. Exatamente o que o <code>range(5)</code>{" "}
        prometeu. 🎉
      </p>

      <H2>Imprimindo de 1 a 10 ✋</H2>

      <p>
        Beleza, mas o ser humano normal conta de 1 a 10, não de 0 a 4. Então usa o{" "}
        <code>range</code> com começo e fim. Pra chegar no 10, lembra de pôr{" "}
        <strong>11</strong> como fim (porque o fim não entra, né):
      </p>

      <Terminal
        arquivo="ate_dez.py"
        code={`for numero in range(1, 11):
    print(numero)`}
        saida={`1
2
3
4
5
6
7
8
9
10`}
        velocidade={24}
      />

      <p>
        Repara que aqui chamei a variável de <code>numero</code> em vez de{" "}
        <code>i</code>. Funciona igualzinho — o nome é com você. Quanto mais
        claro, melhor.
      </p>

      <H2>A tabuada do 5 (aquela do caderno) 📒</H2>

      <p>
        Agora um clássico da escola que faz o <code>for</code> brilhar de verdade.
        A tabuada do 5 é só multiplicar 5 por cada número de 1 a 10. Em vez de
        escrever dez linhas na mão, a gente deixa o <code>for</code> suar:
      </p>

      <Terminal
        arquivo="tabuada.py"
        code={`for n in range(1, 11):
    print("5 x", n, "=", 5 * n)`}
        saida={`5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`}
        velocidade={24}
      />

      <p>
        Olha que coisa linda. A cada volta, o <code>n</code> vale um número novo, e
        o <code>5 * n</code> calcula na hora. Dez linhas de tabuada com{" "}
        <strong>duas linhas de código</strong>. É pra isso que serve o{" "}
        <code>for</code>: você escreve o trabalho UMA vez, e ele repete por você.
      </p>

      <Callout tipo="piada" titulo="Preguiça produtiva">
        <p>
          Programador bom é programador preguiçoso. Por que escrever a tabuada
          inteira na mão se você pode mandar o computador fazer? Ele não reclama,
          não erra a conta, e não pede aumento. 😎
        </p>
      </Callout>

      <H2>Somando de 1 até 100 sem suar ➕</H2>

      <p>
        Lembra da história do menino Gauss que somou de 1 a 100 de cabeça e
        assustou o professor? Você não precisa ser gênio — basta um{" "}
        <code>for</code>. A ideia: uma variável <code>total</code> que começa em 0
        e vai <strong>acumulando</strong> cada número:
      </p>

      <Terminal
        arquivo="soma.py"
        code={`total = 0
for numero in range(1, 101):
    total = total + numero
print("A soma de 1 a 100 é:", total)`}
        saida={`A soma de 1 a 100 é: 5050`}
        velocidade={24}
      />

      <p>
        Repara em duas coisas espertas aqui. Primeiro: <code>range(1, 101)</code>{" "}
        pra incluir o 100 (de novo o fim que não entra — você já decorou, né?).
        Segundo: o <code>print</code> tá <strong>fora</strong> do{" "}
        <code>for</code> (sem os espaços na frente), então ele só aparece{" "}
        <strong>uma vez</strong>, no final, quando a soma já acabou.
      </p>

      <Callout tipo="dica" titulo="Dentro ou fora do loop?">
        <p>
          O que tá <strong>indentado</strong> (com espaços) roda a cada volta. O
          que volta a ficar <strong>colado na margem</strong> roda só uma vez,
          depois que o loop termina. Essa diferença de espaços muda TUDO. Cuidado
          com ela.
        </p>
      </Callout>

      <H2>Aperitivo: passar por uma lista 🍎🍌</H2>

      <p>
        Até agora a gente percorreu <strong>números</strong> com o{" "}
        <code>range</code>. Mas o <code>for</code> tem um truque ainda mais legal:
        ele consegue passar por <strong>cada item de uma lista</strong> também. E
        lista é tipo uma sacola de compras — um monte de coisas guardadas juntas.
      </p>

      <p>
        Olha esse spoiler do que vem por aí:
      </p>

      <Terminal
        arquivo="frutas.py"
        code={`for fruta in ["maçã", "banana", "uva"]:
    print("Comi uma", fruta)`}
        saida={`Comi uma maçã
Comi uma banana
Comi uma uva`}
        velocidade={26}
      />

      <p>
        Maravilha, né? Aqui o <code>for</code> não tá contando número nenhum — ele
        tá pegando <strong>cada fruta da fila</strong>, uma de cada vez, e fazendo
        algo com ela. A variável <code>fruta</code> vale &ldquo;maçã&rdquo; na
        primeira volta, &ldquo;banana&rdquo; na segunda, e assim vai.
      </p>

      <Callout tipo="curiosidade" titulo="Calma, lista é a próxima parada">
        <p>
          Aquele negócio entre colchetes <code>{"[ ]"}</code> é uma{" "}
          <strong>lista</strong>, e ela tem um módulo inteirinho só pra ela logo
          depois. Por enquanto só guarda essa ideia gostosa: <strong>o for passa
          por cada item</strong>, seja número ou fruta. 🛒
        </p>
      </Callout>

      <H2>Então... for ou while? 🤔</H2>

      <p>
        A pergunta de um milhão de dólares. A resposta é mais simples do que
        parece:
      </p>

      <ul>
        <li>
          <strong>Sabe quantas voltas vai dar?</strong> Usa <code>for</code>.
          (&ldquo;Repete 10 vezes&rdquo;, &ldquo;pra cada item da lista&rdquo;,
          &ldquo;de 1 a 100&rdquo;.)
        </li>
        <li>
          <strong>Não sabe, depende de uma condição?</strong> Usa{" "}
          <code>while</code>. (&ldquo;Continua perguntando a senha{" "}
          <em>até</em> acertar&rdquo;, &ldquo;repete <em>enquanto</em> o jogador
          tiver vidas&rdquo;.)
        </li>
      </ul>

      <Frase>
        Número de voltas conhecido → <em>for</em>. Voltas que dependem de
        &ldquo;até quando&rdquo; → <em>while</em>.
      </Frase>

      <p>
        Na prática, dá pra resolver muita coisa com os dois. Mas quando você{" "}
        <strong>já sabe o número de repetições</strong>, o <code>for</code> fica
        mais curto, mais limpo e quase impossível de virar loop infinito. Por isso
        ele é o queridinho.
      </p>

      <H2>Os tropeços clássicos do for 🤦</H2>

      <Callout tipo="cuidado" titulo="Os 3 erros que pegam todo iniciante">
        <p>
          <strong>1. Esquecer que o range não inclui o último.</strong> Quer
          chegar no 10? Põe <code>range(1, 11)</code>, não{" "}
          <code>range(1, 10)</code>. Esse é o erro número 1, dispara.
        </p>
        <p>
          <strong>2. Esquecer os dois-pontos.</strong> A linha do <code>for</code>{" "}
          SEMPRE termina com <code>:</code>. Esqueceu? Erro na cara.
        </p>
        <p>
          <strong>3. Bagunçar a indentação.</strong> O que é pra repetir tem que
          ter espaços na frente. O que é pra rodar só no final, não. Espaço aqui
          não é enfeite, é parte da regra.
        </p>
      </Callout>

      <Callout tipo="curiosidade" titulo="E se eu não usar o i pra nada?">
        <p>
          Às vezes você só quer repetir uma coisa X vezes e não liga pro número.
          Tipo <code>for i in range(3): print(&quot;oi&quot;)</code> imprime
          &ldquo;oi&rdquo; três vezes, e o <code>i</code> nem aparece. Tá tudo
          certo! O <code>for</code> conta as voltas mesmo que você ignore o
          contador. 😄
        </p>
      </Callout>

      <Exercicio
        licao="for e range"
        enunciado="Escreve um for que mostra a tabuada do 3 na tela, do 3x1 até o 3x10. Tipo: 3 x 1 = 3, depois 3 x 2 = 6, e assim por diante até o 3 x 10 = 30. Capricha no range!"
        criterio={`O aluno deve escrever um laço for usando range para percorrer os números de 1 a 10, e a cada volta imprimir a linha da tabuada do 3. A resposta ideal é algo como:

for n in range(1, 11):
    print("3 x", n, "=", 3 * n)

ou usando f-string:

for n in range(1, 11):
    print(f"3 x {n} = {3 * n}")

Aceite variações: nome da variável diferente (i, x, numero), formato do texto diferente (com ou sem espaços ao redor do x e do =), uso de print com vírgula OU f-string OU concatenação, e qualquer ordem de montagem da frase desde que o resultado seja a tabuada do 3 de 1 a 10. O essencial é: (1) usar for com range, (2) o range cobrir de 1 a 10 incluindo o 10, (3) multiplicar 3 pelo número da vez, (4) imprimir o resultado.

ATENÇÃO ESPECIAL ao limite do range: range(1, 11) é o correto para incluir o 10. Se o aluno usar range(1, 10), o loop para no 9 (não inclui o 10) — nesse caso marque como 'QUASE' e explique com carinho que o range é exclusivo no fim, então pra incluir o 10 precisa ser range(1, 11). Da mesma forma, range(10) ou range(0, 10) começa no 0 e também não chega corretamente — marque como 'quase' e aponte.

Se faltar os dois-pontos, ou a indentação do print estiver errada, aponte gentilmente como 'quase'. Se a estrutura estiver toda certa e o range correto, é acerto pleno — elogie!`}
        placeholder={`for n in range(1, 11):\n    print("3 x", n, "=", 3 * n)`}
      />

      <p>
        Mandou bem? Então respira, porque você acabou de fechar o módulo das{" "}
        <strong>repetições</strong>. Agora você sabe fazer o computador repetir
        coisas — tanto &ldquo;enquanto der&rdquo; (<code>while</code>) quanto
        &ldquo;um número certo de vezes&rdquo; (<code>for</code>). Isso é{" "}
        <em>muito</em> poder na sua mão. 💪
      </p>

      <Frase>
        Você não precisa repetir nada na mão nunca mais. Deixa o for ralar por
        você.
      </Frase>

      <p>
        E agora vem uma das partes mais legais de toda a programação. A gente ficou
        usando uma palavrinha misteriosa hoje — <strong>lista</strong> — naquele
        truque das frutas. No <strong>Módulo 5</strong> a gente vai fundo nisso:
        como <strong>guardar muitas coisas de uma vez só</strong> numa lista, e
        como o <code>for</code> e as listas viram melhores amigos. Prepara a sacola
        de compras, porque vamos encher ela. 🛒 Bora?
      </p>
    </article>
  );
}
