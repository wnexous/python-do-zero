"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaLoop } from "@/components/cenas/loop";

export default function While() {
  return (
    <article className="leitura">
      <Hero
        emoji="♾️"
        titulo="while — repetir enquanto"
        subtitulo="Pula corda até cansar (ou até o programa cansar)"
      />

      <p>
        Até agora você mandou o computador fazer uma coisa, depois outra, depois
        outra — uma linha de cada vez, de cima pra baixo. Mas e quando você quer
        que ele <strong>repita</strong> a mesma coisa várias vezes? Tipo mostrar
        os números de 1 até 100?
      </p>

      <p>
        Você <em>poderia</em> escrever 100 <code>print</code> na mão. Mas aí você
        ia me xingar, e com razão. Existe coisa melhor: o <code>while</code>.
      </p>

      <H2>A ideia: repetir ENQUANTO 🔁</H2>

      <p>
        <code>while</code> é uma palavrinha em inglês que significa{" "}
        <strong>&ldquo;enquanto&rdquo;</strong>. E é exatamente isso que ela faz:
        ela repete um pedaço de código <strong>enquanto</strong> uma condição for
        verdadeira.
      </p>

      <p>Pensa na sua vida real, cheia de &ldquo;enquanto&rdquo;:</p>

      <ul>
        <li>
          <strong>Enquanto</strong> não chegar em casa → continue andando.
        </li>
        <li>
          <strong>Enquanto</strong> a panela não apitar → continue esperando.
        </li>
        <li>
          <strong>Enquanto</strong> tiver pinga no copo → continue a festa. 🍻
        </li>
      </ul>

      <p>
        Tá vendo o padrão? Tem uma <strong>condição</strong> (chegar em casa, a
        panela apitar) e tem uma <strong>ação que se repete</strong> (andar,
        esperar). Enquanto a condição não muda, a ação fica rolando de novo e de
        novo.
      </p>

      <Frase>
        O <em>while</em> é tipo pular corda: você fica pulando, pulando,
        pulando... até cansar. A condição é o seu fôlego.
      </Frase>

      <H2>Como se escreve isso em Python ✍️</H2>

      <p>
        A forma é parecida com o <code>if</code> que você já viu. Você escreve{" "}
        <code>while</code>, a condição, e termina a linha com{" "}
        <strong>dois pontos</strong> <code>:</code>. Depois, embaixo, vem o
        bloco <strong>indentado</strong> (aquele empurrãozinho de espaço pra
        dentro):
      </p>

      <CodeBlock
        code={`while condicao:
    faça isso
    e isso também`}
      />

      <p>
        Igualzinho ao <code>if</code>: tudo que estiver <strong>empurrado pra
        dentro</strong> faz parte do laço e vai se repetir. O que voltar pra
        margem (sem o empurrão) já não é mais do <code>while</code> — é o que
        acontece <em>depois</em> que ele termina.
      </p>

      <Callout tipo="lembrete" titulo="A indentação de novo, sim">
        <p>
          Lembra da lição do <code>if</code>? Aqueles 4 espacinhos pra dentro?
          Aqui é a mesma regra. A indentação é como o Python sabe o que está{" "}
          <em>dentro</em> do laço e o que está <em>fora</em>. Sem ela, o Python
          se perde e reclama. Use sempre <strong>4 espaços</strong>.
        </p>
      </Callout>

      <H2>O padrão do CONTADOR (decora esse) 🔢</H2>

      <p>
        Quase todo <code>while</code> de iniciante segue uma receitinha que tem 4
        passos. Eu chamo de <strong>padrão do contador</strong>. Olha que
        bonitinho:
      </p>

      <ol>
        <li>
          <strong>Antes do laço</strong>, você cria uma variável com um valor
          inicial. Ex: <code>{"contador = 1"}</code>.
        </li>
        <li>
          No <code>while</code>, você põe a <strong>condição</strong> que usa
          essa variável. Ex: <code>{"while contador <= 5:"}</code>.
        </li>
        <li>
          <strong>Dentro</strong> do laço, você faz alguma coisa (tipo um{" "}
          <code>print</code>).
        </li>
        <li>
          Ainda <strong>dentro</strong> do laço, você{" "}
          <strong>muda a variável</strong>. Ex: <code>{"contador = contador + 1"}</code>.
        </li>
      </ol>

      <p>
        Aquele <code>{"<="}</code> ali é &ldquo;menor ou igual a&rdquo; — você
        viu na lição de comparações. <code>{"contador <= 5"}</code> quer dizer
        &ldquo;o contador é menor ou igual a 5?&rdquo;. Enquanto a resposta for{" "}
        <code>True</code>, o laço continua girando.
      </p>

      <p>Bora ver o padrão completo rodando, contando de 1 até 5:</p>

      <Terminal
        arquivo="contar.py"
        code={`contador = 1
while contador <= 5:
    print(contador)
    contador = contador + 1`}
        saida={`1
2
3
4
5`}
        velocidade={30}
      />

      <p>
        Olha a mágica acontecendo aqui embaixo, passo a passo. O contador sobe, o
        laço checa a condição, mostra o número, e repete:
      </p>

      <CenaLoop de={1} ate={5} rotulo="contador" modelo={(n) => `contador = ${n}`} />

      <H2>Calma, vamos falar desse contador = contador + 1 ❤️</H2>

      <p>
        Essa linha aqui — <code>{"contador = contador + 1"}</code> — assusta todo
        mundo na primeira vez. &ldquo;Como assim a coisa é igual a ela mesma mais
        um? Isso não faz sentido matemático!&rdquo;. Calma, respira. <strong>Não é
        matemática</strong>, é uma <em>ordem</em>.
      </p>

      <p>Lê da direita pra esquerda, devagar, em 3 movimentos:</p>

      <ol>
        <li>
          <strong>Pega o valor atual</strong> do contador. Digamos que agora ele
          vale <code>3</code>.
        </li>
        <li>
          <strong>Soma 1</strong> nesse valor. <code>3 + 1</code> dá{" "}
          <code>4</code>.
        </li>
        <li>
          <strong>Guarda o resultado de volta</strong> na caixinha{" "}
          <code>contador</code>. Agora ela vale <code>4</code>. O <code>3</code>{" "}
          antigo foi embora, tchau.
        </li>
      </ol>

      <p>
        É tipo você ter R$ 3 na carteira, ganhar R$ 1, e agora ter R$ 4 na mesma
        carteira. A carteira é a mesma; o valor dentro dela mudou. Simples assim.
      </p>

      <Callout tipo="dica" titulo="Atalho preguiçoso (e bom)">
        <p>
          Escrever <code>{"contador = contador + 1"}</code> toda vez dá uma
          canseira. Os programadores, que são preguiçosos por natureza,
          inventaram um atalho: <code>{"contador += 1"}</code>. Esse{" "}
          <code>{"+="}</code> significa exatamente &ldquo;some isso em mim
          mesmo&rdquo;. <code>{"contador += 1"}</code> e{" "}
          <code>{"contador = contador + 1"}</code> são a <strong>mesma
          coisa</strong>. Use o que achar mais bonito. 😎
        </p>
      </Callout>

      <p>
        Pra você ver que é igualzinho, esse aqui faz exatamente o mesmo que o de
        cima:
      </p>

      <Terminal
        arquivo="contar2.py"
        code={`contador = 1
while contador <= 5:
    print(contador)
    contador += 1`}
        saida={`1
2
3
4
5`}
        velocidade={30}
      />

      <H2>⚠️ O PERIGO: o loop infinito (preste MUITA atenção)</H2>

      <p>
        Agora o assunto mais importante da lição inteira. Vou repetir pra deixar
        claro: <strong>o mais importante de tudo.</strong>
      </p>

      <p>
        Lembra do passo 4 do padrão do contador? &ldquo;Mude a variável dentro do
        laço.&rdquo; Se você <strong>esquecer</strong> de mudar a variável, a
        condição nunca vira <code>False</code>... e o laço{" "}
        <strong>nunca para</strong>. Nunca. Pra sempre. Eternamente.
      </p>

      <p>Olha o desastre:</p>

      <Terminal
        arquivo="desastre.py"
        code={`contador = 1
while contador <= 5:
    print(contador)
    # esqueci de mudar o contador! 😱`}
        saida={`1
1
1
1
1
1
1
... (pra sempre, até você matar o programa)`}
        velocidade={28}
      />

      <p>
        Tá vendo? O <code>contador</code> ficou eternamente valendo{" "}
        <code>1</code>. Aí <code>{"1 <= 5"}</code> é sempre <code>True</code>, e
        o laço imprime <code>1</code> até o fim dos tempos. O programa{" "}
        <strong>trava</strong>, o computador esquenta, e a vida perde o sentido.
        Isso se chama <strong>loop infinito</strong>.
      </p>

      <Frase>
        Loop infinito é tipo aquele amigo que conta a mesma história na festa e
        nunca chega no final. Alguém precisa interrompê-lo.
      </Frase>

      <p>
        Como evitar? <strong>Sempre garanta que algo dentro do laço empurra a
        condição pro fim.</strong> No padrão do contador, é o{" "}
        <code>{"contador += 1"}</code> que faz isso: a cada volta o contador
        chega mais perto do <code>5</code>, até passar dele e o laço parar.
        Esqueceu de atualizar = loop infinito = choro.
      </p>

      <Callout tipo="cuidado" titulo="Travou? Foi loop infinito (provavelmente)">
        <p>
          Se você rodar um programa e ele <strong>não parar nunca</strong>,
          ficar cuspindo a mesma coisa sem fim, ou simplesmente congelar:
          respira, é quase sempre um loop infinito. Você esqueceu de mudar a
          variável dentro do <code>while</code>. Pra interromper na marra, no
          terminal normalmente é só apertar <strong>Ctrl + C</strong>. Depois,
          procure a linha que deveria atualizar o contador — ela sumiu ou tá
          fora do laço.
        </p>
      </Callout>

      <H2>Contagem regressiva: dá pra descer também 🚀</H2>

      <p>
        O contador não precisa só subir. Dá pra começar grande e ir{" "}
        <strong>descendo</strong>, usando <code>{"contador = contador - 1"}</code>{" "}
        (ou o atalho <code>{"contador -= 1"}</code>). Bora fazer uma contagem
        regressiva de foguete, de 5 até 1:
      </p>

      <Terminal
        arquivo="foguete.py"
        code={`contador = 5
while contador >= 1:
    print(contador)
    contador -= 1
print("Decolar! 🚀")`}
        saida={`5
4
3
2
1
Decolar! 🚀`}
        velocidade={28}
      />

      <p>
        Repara em duas coisinhas espertas aqui. Primeiro, a condição agora é{" "}
        <code>{"contador >= 1"}</code> (&ldquo;maior ou igual a 1?&rdquo;) e a
        variável <em>desce</em> em vez de subir. Segundo: aquele último{" "}
        <code>print("Decolar! 🚀")</code> está <strong>na margem</strong>, sem
        indentação — então ele não faz parte do laço. Só roda{" "}
        <em>depois</em> que a contagem termina. Indentação importa!
      </p>

      <H2>Somando até bater a meta ➕</H2>

      <p>
        O <code>while</code> não serve só pra contar. Ele é ótimo pra ficar
        somando até atingir um objetivo. Imagina que você quer somar{" "}
        <code>1 + 2 + 3 + 4...</code> e parar quando a soma passar de{" "}
        <code>10</code>:
      </p>

      <Terminal
        arquivo="soma.py"
        code={`soma = 0
numero = 1
while soma <= 10:
    soma = soma + numero
    print("Somei", numero, "-> total agora:", soma)
    numero = numero + 1`}
        saida={`Somei 1 -> total agora: 1
Somei 2 -> total agora: 3
Somei 3 -> total agora: 6
Somei 4 -> total agora: 10
Somei 5 -> total agora: 15`}
        velocidade={24}
      />

      <p>
        Aqui a gente tem <strong>duas</strong> variáveis trabalhando juntas: a{" "}
        <code>soma</code> (que vai acumulando o total) e o <code>numero</code>{" "}
        (que vai de 1 em diante). O laço só para quando a <code>soma</code>{" "}
        finalmente passa de <code>10</code>. Note que ele rodou mais uma vez e
        chegou a <code>15</code> — porque ele só checa a condição{" "}
        <em>no começo</em> de cada volta.
      </p>

      <Callout tipo="curiosidade" titulo="Ele checa a condição lá no topo">
        <p>
          O <code>while</code> sempre olha a condição <strong>antes</strong> de
          começar cada volta. Se já entrou na volta, ele termina ela inteira —
          só depois volta lá em cima conferir de novo. Por isso a soma chegou a{" "}
          <code>15</code> e não parou exatamente em <code>10</code>. É sutil, mas
          bom saber.
        </p>
      </Callout>

      <H2>O break: parar na marra 🛑</H2>

      <p>
        Às vezes você quer sair do laço <strong>no meio</strong>, sem esperar a
        condição virar <code>False</code>. Pra isso existe o <code>break</code>{" "}
        (&ldquo;quebrar&rdquo;, em inglês). Quando o Python encontra um{" "}
        <code>break</code>, ele <strong>abandona o laço na hora</strong> e segue a
        vida.
      </p>

      <p>
        O exemplo clássico: pedir uma senha, ficar perguntando, e parar assim que
        a pessoa acertar:
      </p>

      <Terminal
        arquivo="senha.py"
        code={`senha_certa = "1234"
while True:
    print("Tentando a senha...")
    digitada = "1234"
    if digitada == senha_certa:
        print("Acertou! Bem-vindo. 🎉")
        break
    print("Errou, tenta de novo.")`}
        saida={`Tentando a senha...
Acertou! Bem-vindo. 🎉`}
        velocidade={24}
      />

      <p>
        Repara no <code>while True:</code> — isso é um laço{" "}
        <strong>de propósito infinito</strong>! A condição é literalmente
        &ldquo;verdadeiro&rdquo;, que nunca vira falso. A única forma de sair dele
        é o <code>break</code> lá dentro. É o único caso em que um laço infinito é
        amigo, e não inimigo: você usa o <code>break</code> como a porta de saída.
      </p>

      <Callout tipo="piada" titulo="while True com break é tipo...">
        <p>
          ...entrar numa balada que não fecha nunca. Você só vai pra casa quando{" "}
          <em>você</em> decidir dar o <code>break</code> e chamar o Uber. Sem o{" "}
          <code>break</code>, você dança até o sol nascer (e o programa trava). 🕺
        </p>
      </Callout>

      <H2>Recapitulando a receita 📋</H2>

      <p>Guarda esses pontos no coração, que é o que importa:</p>

      <ul>
        <li>
          <code>while condicao:</code> repete o bloco{" "}
          <strong>enquanto</strong> a condição for <code>True</code>.
        </li>
        <li>
          Não esqueça os <strong>dois pontos</strong> <code>:</code> nem a{" "}
          <strong>indentação</strong> de 4 espaços.
        </li>
        <li>
          Padrão do contador: <strong>cria</strong> a variável antes,{" "}
          <strong>usa</strong> na condição, e <strong>muda</strong> ela dentro do
          laço.
        </li>
        <li>
          <code>{"contador = contador + 1"}</code> (ou o atalho{" "}
          <code>{"contador += 1"}</code>) é o que evita o loop infinito.
        </li>
        <li>
          <strong>Esqueceu de mudar a variável? Loop infinito.</strong> O maior
          vilão dessa lição.
        </li>
        <li>
          <code>break</code> sai do laço na marra, na hora.
        </li>
      </ul>

      <Exercicio
        licao="while — repetir enquanto"
        enunciado="Escreve um while que mostra na tela os números de 1 até 5, cada um numa linha. Use o padrão do contador: crie a variável, faça o while com a condição, mostre o número, e (MUITO importante) mude a variável dentro do laço."
        criterio={`A resposta esperada é o padrão do contador completo, algo como:
contador = 1
while contador <= 5:
    print(contador)
    contador = contador + 1
(ou usando contador += 1, que é equivalente). Os 4 elementos que devem estar presentes: (1) inicializar uma variável antes do laço com valor 1; (2) um 'while' com condição que use essa variável (ex: contador <= 5, ou < 6); (3) um print mostrando o valor da variável dentro do laço; (4) ATUALIZAR a variável dentro do laço (contador = contador + 1 ou contador += 1). Aceite variações: nome de variável diferente (i, n, x), uso de += , condição com <= 5 ou < 6, indentação com qualquer quantidade consistente de espaços, e dois pontos presentes. Aceite também uma contagem regressiva de 5 a 1 se o aluno preferir (contador = 5, while contador >= 1, contador -= 1). PONTO CRÍTICO: se o aluno ESQUECER de atualizar a variável dentro do laço (faltar o contador = contador + 1 / contador += 1), marque como 'quase' e avise com humor que aquilo é um LOOP INFINITO — o programa vai imprimir 1 pra sempre até alguém apertar Ctrl+C, e que a galera vai começar a estranhar tanto número 1 na tela. Se faltar os dois pontos ':' ou a indentação, marque como 'quase' e aponte com carinho. Aceite pequenas variações de texto/espaçamento.`}
        placeholder={`contador = 1\nwhile contador <= 5:\n    print(contador)\n    contador = contador + 1`}
      />

      <p>
        Mandou bem? Então comemora, porque você acabou de domar uma das
        ferramentas mais poderosas (e perigosas) da programação. 🎉
      </p>

      <p>
        Mas confessa: ficar criando contador, lembrando de somar 1, torcendo pra
        não esquecer e travar tudo... é um saquinho, né? Pois é. Na próxima lição
        a gente conhece o <code>for</code> e o <code>range</code> — um jeito de
        repetir coisas que faz <strong>quase tudo isso sozinho</strong>, sem
        risco de loop infinito. Vai por mim, depois do <code>for</code> você vai
        olhar pro <code>while</code> com carinho de quem já sofreu. 😄
      </p>
    </article>
  );
}
