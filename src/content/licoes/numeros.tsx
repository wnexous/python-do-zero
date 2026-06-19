"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";

export default function Numeros() {
  return (
    <article className="leitura">
      <Hero
        emoji="🔢"
        titulo="Números e contas"
        subtitulo="Mais, menos, vezes, dividir e o resto que sobra"
      />

      <p>
        Bora falar de matemática. Calma, <strong>não foge!</strong> 😅 Não é
        aquela matemática chata da escola que te dava sono. Aqui você só vai{" "}
        <strong>mandar o computador fazer a conta pra você</strong>. Você escreve
        a continha, ele resolve. É tipo ter um nerd particular que adora
        calcular e nunca reclama.
      </p>

      <Frase>
        O Python é uma calculadora gigante que também faz mil outras coisas. Mas
        calculadora ela é, e das boas.
      </Frase>

      <H2>Lembra dos números? int e float 🧠</H2>

      <p>
        A gente já se esbarrou com eles lá na lição de tipos. Recapitulando bem
        rapidinho, porque vai ser importante agora:
      </p>

      <ul>
        <li>
          <strong>int</strong> (de <em>integer</em>, &ldquo;inteiro&rdquo;) → número
          redondinho, sem ponto. Tipo <code>5</code>, <code>27</code>,{" "}
          <code>1000</code>, <code>-3</code>. É número de contar coisa: 3 maçãs,
          10 dedos, 0 amigos (brincadeira, você tem eu 💚).
        </li>
        <li>
          <strong>float</strong> (&ldquo;flutuante&rdquo;, mas pensa só em{" "}
          <em>decimal</em>) → número com <strong>ponto</strong>. Tipo{" "}
          <code>1.5</code>, <code>3.14</code>, <code>0.99</code>. É número de
          medir coisa: metro e meio, 36.5 graus de febre, R$ 9.90.
        </li>
      </ul>

      <Callout tipo="cuidado" titulo="Ponto, não vírgula!">
        <p>
          Em Python (e em programação no geral) o decimal usa{" "}
          <strong>ponto</strong>, igual no inglês. É <code>1.5</code>, não{" "}
          <code>1,5</code>. Se você botar vírgula, o Python entende uma{" "}
          <em>outra coisa completamente diferente</em> e tudo dá ruim. Já já eu te
          mostro o estrago. Por enquanto: <strong>número com ponto</strong>.
        </p>
      </Callout>

      <H2>As quatro continhas de sempre ➕➖✖️➗</H2>

      <p>
        Você já conhece essas da vida: somar, subtrair, multiplicar, dividir. Em
        Python elas têm uns símbolos (a gente chama de{" "}
        <strong>operadores</strong>). Olha a tabelinha:
      </p>

      <ul>
        <li>
          <code>+</code> → <strong>soma</strong>. Igualzinho à escola.
        </li>
        <li>
          <code>-</code> → <strong>subtração</strong>. Também igual.
        </li>
        <li>
          <code>*</code> → <strong>multiplicação</strong>. Repara: é{" "}
          <strong>asterisco</strong> (aquela estrelinha), <em>não</em> a letra
          &ldquo;x&rdquo;! No computador, &ldquo;x&rdquo; é só uma letra.
        </li>
        <li>
          <code>/</code> → <strong>divisão</strong>. A barrinha inclinada.
        </li>
      </ul>

      <p>Bora ver o nerd particular trabalhando:</p>

      <Terminal
        arquivo="contas.py"
        code={`print(2 + 3)
print(10 - 4)
print(5 * 6)
print(20 / 5)`}
        saida={`5
6
30
4.0`}
        velocidade={28}
      />

      <p>
        Repara que os números <strong>não vão entre aspas</strong>. Número é
        pelado, lembra? Aspas são só pra texto. Aqui é conta de verdade, e o
        Python resolve na hora.
      </p>

      <Callout tipo="curiosidade" titulo="Ué, por que 20 / 5 deu 4.0 e não 4?">
        <p>
          Boa pergunta, olho de águia! A divisão com <code>/</code> em Python{" "}
          <strong>SEMPRE</strong> devolve um número com ponto (um float), mesmo
          quando a conta dá redonda. <code>{"10 / 2"}</code> não dá{" "}
          <code>5</code>, dá <code>5.0</code>. É uma manha da linguagem. Decora
          essa: <strong>divisão com barra = float, sempre</strong>.
        </p>
      </Callout>

      <H2>A divisão que sobra resto 🍬</H2>

      <p>
        Agora vem a parte mais legal (e que confunde todo mundo no começo, então
        respira). Lembra da divisão da escola, aquela com{" "}
        <strong>resto</strong>? Tipo: 7 dividido por 2 dá 3, e <em>sobra</em> 1?
      </p>

      <p>
        Python tem um jeito de pegar cada pedacinho dessa conta. São dois
        operadores:
      </p>

      <ul>
        <li>
          <code>{"//"}</code> → <strong>divisão inteira</strong>. Pega só a parte
          de cima, o resultado &ldquo;redondo&rdquo;, e <em>joga o resto fora</em>.
        </li>
        <li>
          <code>{"%"}</code> → <strong>resto</strong> (a galera chama de
          &ldquo;módulo&rdquo;, mas pode chamar de &ldquo;o que sobra&rdquo;).
          Pega justamente o que sobrou.
        </li>
      </ul>

      <p>
        Pensa assim: você tem <strong>7 balas</strong> e quer dividir igualzinho
        pra <strong>2 crianças</strong>. Cada uma recebe 3 balas (3 + 3 = 6), e{" "}
        <strong>sobra 1 bala</strong> na sua mão (porque você não vai partir bala
        no meio, né, isso é coisa de monstro).
      </p>

      <ul>
        <li>
          <code>{"7 // 2"}</code> → quantas balas <em>cada criança</em> ganha ={" "}
          <strong>3</strong>
        </li>
        <li>
          <code>{"7 % 2"}</code> → quantas balas <em>sobraram</em> ={" "}
          <strong>1</strong>
        </li>
      </ul>

      <Terminal
        arquivo="balas.py"
        code={`print(7 // 2)
print(7 % 2)`}
        saida={`3
1`}
        velocidade={40}
      />

      <p>Mais uns exemplos pra fixar bem na cabeça:</p>

      <Terminal
        arquivo="resto.py"
        code={`print(10 // 3)
print(10 % 3)
print(20 // 6)
print(20 % 6)`}
        saida={`3
1
3
2`}
        velocidade={26}
      />

      <p>
        Olha o <code>{"10 // 3"}</code>: 3 cabe 3 vezes no 10 (3 × 3 = 9), e{" "}
        <strong>sobra 1</strong>. Por isso <code>{"10 % 3"}</code> deu{" "}
        <strong>1</strong>. Mesma lógica no <code>20</code>: 6 cabe 3 vezes (3 ×
        6 = 18), sobram 2.
      </p>

      <Callout tipo="dica" titulo="O truque mais útil do mundo: par ou ímpar">
        <p>
          O <code>{"%"}</code> parece bobo, mas é usado <em>pra caralho</em> na
          programação de verdade. O uso mais clássico: descobrir se um número é{" "}
          <strong>par</strong>. Todo número par dividido por 2 não sobra nada
          (resto 0). Então <code>{"n % 2 == 0"}</code> quer dizer{" "}
          &ldquo;esse número é par?&rdquo;. Se sobrar 1, é ímpar. Guarda essa,
          ela volta MUITO mais pra frente.
        </p>
      </Callout>

      <Terminal
        arquivo="par.py"
        code={`print(8 % 2)
print(9 % 2)`}
        saida={`0
1`}
        velocidade={42}
      />

      <p>
        O <code>8</code> deu resto <strong>0</strong> → é par. O <code>9</code>{" "}
        deu resto <strong>1</strong> → é ímpar. Magia da matemática, viu? 🪄
      </p>

      <H2>Elevar à potência 💪</H2>

      <p>
        Lembra de &ldquo;2 elevado ao cubo&rdquo;, &ldquo;dois ao quadrado&rdquo;
        e essas coisas? É só multiplicar o número por ele mesmo várias vezes. Em
        Python isso tem um símbolo: <strong>dois asteriscos juntos</strong>,{" "}
        <code>{"**"}</code>.
      </p>

      <p>
        <code>{"2 ** 3"}</code> quer dizer &ldquo;2 multiplicado por ele mesmo 3
        vezes&rdquo;, ou seja 2 × 2 × 2 = <strong>8</strong>.
      </p>

      <Terminal
        arquivo="potencia.py"
        code={`print(2 ** 3)
print(5 ** 2)
print(10 ** 6)`}
        saida={`8
25
1000000`}
        velocidade={32}
      />

      <p>
        O <code>{"5 ** 2"}</code> é &ldquo;cinco ao quadrado&rdquo; = 25. E{" "}
        <code>{"10 ** 6"}</code> é um 1 com seis zeros, ou seja{" "}
        <strong>um milhão</strong>. Tenta fazer essa na mão, vai. 😏
      </p>

      <Callout tipo="cuidado" titulo="Um asterisco ≠ dois asteriscos">
        <p>
          Cuidado pra não confundir! <code>{"*"}</code> (um) é{" "}
          <strong>multiplicação</strong>. <code>{"**"}</code> (dois colados) é{" "}
          <strong>potência</strong>. <code>{"2 * 3"}</code> dá{" "}
          <strong>6</strong> (2 vezes 3). Já <code>{"2 ** 3"}</code> dá{" "}
          <strong>8</strong> (2 elevado a 3). Um errinho de asterisco e a conta
          vira outra completamente. Fica esperto.
        </p>
      </Callout>

      <H2>Ordem das operações (sim, parênteses!) 🧮</H2>

      <p>
        Aqui é igualzinho à escola, não inventaram nada novo. Multiplicação e
        divisão acontecem <strong>antes</strong> de soma e subtração. O Python
        respeita essa ordem certinho.
      </p>

      <p>
        Então <code>2 + 3 * 4</code> <strong>não</strong> dá 20. Ele faz primeiro
        o <code>3 * 4</code> (que é 12) e depois soma o 2, dando{" "}
        <strong>14</strong>:
      </p>

      <Terminal
        arquivo="ordem.py"
        code={`print(2 + 3 * 4)`}
        saida={`14`}
        velocidade={45}
      />

      <p>
        Mas e se você <em>quisesse</em> somar o 2 com o 3 primeiro? Aí você usa{" "}
        <strong>parênteses</strong> pra agrupar, igual na matemática. O que tá
        dentro dos parênteses é resolvido primeiro:
      </p>

      <Terminal
        arquivo="parenteses.py"
        code={`print((2 + 3) * 4)`}
        saida={`20`}
        velocidade={45}
      />

      <p>
        Agora sim deu 20: ele fez <code>2 + 3</code> (= 5) primeiro, e só depois
        multiplicou por 4. <strong>Os parênteses mandam.</strong> Na dúvida,
        coloca parênteses — não tem vergonha nenhuma em deixar a conta mais clara.
      </p>

      <Frase>
        Parênteses são tipo cerca: o que tá dentro fica protegido e resolve
        primeiro. Use sem medo.
      </Frase>

      <H2>Contas com variáveis 📦</H2>

      <p>
        Aqui o brinquedo fica divertido. Lembra das <strong>variáveis</strong>,
        as caixinhas que guardam valores? Pois é, você pode fazer conta{" "}
        <em>com elas</em>. Em vez de escrever o número direto, você usa o nome da
        caixinha e o Python pega o valor lá de dentro:
      </p>

      <Terminal
        arquivo="loja.py"
        code={`preco = 10
total = preco * 3
print(total)`}
        saida={`30`}
        velocidade={30}
      />

      <p>
        Lê comigo, devagar: a caixinha <code>preco</code> guarda{" "}
        <strong>10</strong>. Aí <code>total</code> recebe{" "}
        <code>preco * 3</code>, que é 10 × 3 = <strong>30</strong>. No fim a
        gente imprime o <code>total</code>. É o preço de 3 unidades de uma coisa
        que custa 10. Você acabou de fazer a conta de um carrinho de compras. 🛒
      </p>

      <p>
        E o mais legal: se você mudar o <code>preco</code>, a conta toda muda
        sozinha. Troca o 10 por 25 e o total vira 75. É por isso que variável é
        tão poderosa — você escreve a receita uma vez e ela serve pra qualquer
        número.
      </p>

      <Callout tipo="curiosidade" titulo="Dá pra usar a mesma caixinha dos dois lados">
        <p>
          Você pode fazer <code>{"idade = idade + 1"}</code>. Parece doideira
          (&ldquo;idade igual idade mais um&rdquo;?!), mas o Python lê assim:
          &ldquo;pega o valor que tá em <code>idade</code>, soma 1, e guarda de
          volta na <code>idade</code>&rdquo;. É como envelhecer um aninho. A gente
          usa isso o tempo todo mais pra frente.
        </p>
      </Callout>

      <H2>Conta dentro do print (e na f-string) 🖨️</H2>

      <p>
        Você não precisa guardar a conta numa variável antes de mostrar. Dá pra
        fazer a continha <strong>direto dentro do print</strong>, que o Python
        resolve e cospe o resultado:
      </p>

      <Terminal
        arquivo="direto.py"
        code={`print(preco * 3)`}
        saida={`30`}
        velocidade={42}
      />

      <p>
        E lembra daquela <strong>f-string</strong> chiquérrima, com o{" "}
        <code>f</code> antes das aspas e as <code>{"{ }"}</code> que viram
        valores? Pois é, <strong>dentro das chavinhas também cabe conta</strong>:
      </p>

      <Terminal
        arquivo="fstring.py"
        code={`preco = 10
print(f"Total: {preco * 3}")
print(f"Metade: {preco / 2}")`}
        saida={`Total: 30
Metade: 5.0`}
        velocidade={26}
      />

      <p>
        Sacou? O <code>{"{preco * 3}"}</code> virou <strong>30</strong> ali no
        meio da frase, e o <code>{"{preco / 2}"}</code> virou{" "}
        <strong>5.0</strong> (com ponto, porque divisão com barra é sempre float,
        eu avisei 😎). Você junta texto bonito + conta no mesmo lugar. Chique
        demais.
      </p>

      <H2>Os errinhos clássicos de número 🤦</H2>

      <p>
        Pra você já chegar esperto e não chorar na frente da tela, os tropeços
        mais comuns:
      </p>

      <Callout tipo="cuidado" titulo="A lista dos perrengues">
        <p>
          <strong>1. Achar que <code>/</code> dá número redondo.</strong> Não dá!{" "}
          <code>{"10 / 2"}</code> é <code>5.0</code>, não <code>5</code>. Se você
          quer o resultado redondinho sem ponto, use <code>{"//"}</code>.
        </p>
        <p>
          <strong>2. Usar &ldquo;x&rdquo; pra multiplicar.</strong>{" "}
          <code>{"3 x 4"}</code> <em>não funciona</em>, dá erro feio. É{" "}
          <strong>asterisco</strong>: <code>{"3 * 4"}</code>.
        </p>
        <p>
          <strong>3. Botar vírgula no número.</strong> Escrever{" "}
          <code>1,5</code> achando que é &ldquo;um e meio&rdquo; é cilada! A
          vírgula em Python <strong>separa coisas</strong> (vira dois números, o 1
          e o 5). Decimal é com <strong>ponto</strong>: <code>1.5</code>.
        </p>
        <p>
          <strong>4. Confundir <code>{"*"}</code> com <code>{"**"}</code>.</strong>{" "}
          Um asterisco multiplica, dois elevam à potência. Conta totalmente
          diferente. Olha o número de asteriscos!
        </p>
      </Callout>

      <p>Pra ficar bem claro o estrago da vírgula, olha o que acontece:</p>

      <CodeBlock code={`print(1,5)      # você QUERIA "um e meio"
# mas o Python entende DOIS números: 1 e 5
# e mostra: 1 5  (com espaço!)

print(1.5)      # ISSO sim é "um e meio"`} />

      <p>
        Viu a treta? <code>1,5</code> com vírgula virou &ldquo;1 e 5&rdquo;
        separados. <code>1.5</code> com ponto é o número que você queria. Ponto. É
        ponto. Sempre ponto. 🙏
      </p>

      <H2>Hora de calcular você mesmo 🧑‍🔬</H2>

      <p>
        Chega de só ler, bora botar a mão na massa. Faz esses dois exercícios e
        veja o nerd particular obedecer:
      </p>

      <Exercicio
        licao="Números e contas"
        enunciado="Quantos minutos tem em 3 horas? Faça a conta no Python (cada hora tem 60 minutos) e mostre o resultado na tela com print. Dica: é uma multiplicação."
        criterio={`O objetivo é calcular 3 * 60 = 180 e imprimir. A resposta ideal é algo como: print(3 * 60) que mostra 180. TAMBÉM aceite versões com variáveis, como: horas = 3; minutos = horas * 60; print(minutos), ou usando f-string como print(f"{3 * 60} minutos") ou print(f"{horas * 60}"). Aceite a ordem trocada (60 * 3). O importante é: usar multiplicação (operador *), o resultado da conta ser 180, e haver um print mostrando isso. Se a pessoa escrever 3 x 60 (com a letra x), marque como 'quase' e explique com carinho que multiplicação em Python é com asterisco *, não com x. Se esquecer o print mas a conta estiver certa, marque como 'quase' e lembre que precisa mostrar o resultado.`}
        placeholder={`print(... * ...)`}
      />

      <Exercicio
        licao="Números e contas"
        enunciado="Descubra o RESTO da divisão de 17 por 5 (ou seja: 17 dividido por 5, quanto sobra?) e mostre na tela com print. Dica: tem um operador especial pra pegar só o resto."
        criterio={`O objetivo é usar o operador de resto (módulo) % para calcular 17 % 5, que dá 2, e imprimir. A resposta ideal é: print(17 % 5) mostrando 2. TAMBÉM aceite versões com variável (ex: resto = 17 % 5; print(resto)) ou com f-string (print(f"{17 % 5}")). O essencial é: usar o operador % (resto), com 17 e 5 nessa ordem, e ter um print. Se a pessoa usar // (divisão inteira) por engano, marque como 'quase' e explique a diferença: // dá a parte de cima (3), % dá o resto (2). Se esquecer o print mas usar o % certo, marque como 'quase' e lembre de mostrar o resultado.`}
        placeholder={`print(17 % 5)`}
      />

      <p>
        Mandou os dois? Você oficialmente fez o computador calcular pra você.
        Sente o poder. 💪
      </p>

      <Frase>
        Agora você tem uma calculadora que obedece. O próximo passo é fazer ela{" "}
        <em>te ouvir</em>.
      </Frase>

      <p>
        Até agora você que mandava todos os números no código. Mas e se o
        programa pudesse <strong>te perguntar</strong> as coisas e usar a sua
        resposta na conta? Tipo perguntar sua idade, seu nome, quanto custou a
        cerveja? 🍺 Na próxima lição a gente aprende o <code>input()</code> — o
        jeito do computador <strong>fazer perguntas pra você</strong>. Aí o
        negócio fica interativo de verdade. Bora! 👇
      </p>
    </article>
  );
}
