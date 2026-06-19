"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaTipos } from "@/components/cenas/tipos-print";

export default function Tipos() {
  return (
    <article className="leitura">
      <Hero
        emoji="🏷️"
        titulo="Tipos de coisas"
        subtitulo="Texto, número e o tal do verdadeiro/falso"
      />

      <p>
        Imagina que toda informação dentro do Python anda por aí com uma{" "}
        <strong>etiqueta colada</strong> dizendo o que ela é. Tipo aquelas
        etiquetas de mudança: &ldquo;COZINHA&rdquo;, &ldquo;ROUPA&rdquo;,
        &ldquo;FRÁGIL&rdquo;. Cada coisinha tem uma.
      </p>

      <p>
        Essa etiqueta é o que a gente chama de <strong>tipo</strong>. E sim, isso
        é importante pra caramba — porque o Python trata cada tipo de um jeito
        diferente. Ele não mistura as estações alegremente: texto é texto, número
        é número, e ai de você se confundir os dois (já já a gente vê o tombo que
        dá).
      </p>

      <Frase>
        Em Python, tudo tem um tipo. É como se cada coisa nascesse com uma
        etiqueta na testa.
      </Frase>

      <H2>Pensa em caixas diferentes 📦</H2>

      <p>
        Pensa que o Python tem caixas de tipos diferentes na garagem. Numa você
        guarda <strong>texto</strong>. Noutra, <strong>número inteiro</strong>.
        Noutra, número <strong>com casa decimal</strong>. E numa caixinha bem
        pequena só cabe <strong>sim ou não</strong>.
      </p>

      <p>
        Cada caixa tem um nome esquisito de três ou quatro letras (culpa dos
        programadores, que têm preguiça de escrever por extenso). Olha os quatro
        tipos básicos que você vai usar o tempo todo:
      </p>

      <CenaTipos
        exemplos={[
          { valor: '"André"', tipo: "str" },
          { valor: "27", tipo: "int" },
          { valor: "1.75", tipo: "float" },
          { valor: "True", tipo: "bool" },
        ]}
      />

      <p>
        Calma que a gente vai um por um, sem pressa. Pega um café (ou uma
        cerveja, não julgo).
      </p>

      <H2>str — o TEXTO ✍️</H2>

      <p>
        <code>str</code> vem de <em>string</em>, que em inglês é tipo
        &ldquo;cordão de letras&rdquo;. É <strong>qualquer texto</strong>: seu
        nome, uma frase, um emoji, um endereço. A regra de ouro você já conhece da
        lição do print:
      </p>

      <Frase>Texto sempre vai entre aspas. Sempre. SEMPRE.</Frase>

      <p>
        Pode ser aspas duplas <code>&ldquo;assim&rdquo;</code> ou simples{" "}
        <code>&lsquo;assim&rsquo;</code>, tanto faz. O que importa é que tenha
        aspas. Exemplos de texto:
      </p>

      <CodeBlock
        code={`"André"
"oi, tudo bem?"
"Rua das Flores, 42"
"😎🐍🔥"`}
      />

      <Callout tipo="cuidado" titulo="Olha essa pegadinha marota">
        <p>
          Repara nesse aqui: <code>&ldquo;123&rdquo;</code>. Tem aspas, né? Então,
          mesmo sendo só números, pro Python <strong>isso é TEXTO</strong>, não é
          número! As aspas mandam. É tipo escrever o número 123 num post-it: o
          post-it não vira uma calculadora, continua sendo um papelzinho. 😅
        </p>
      </Callout>

      <H2>int — o número INTEIRO 🔢</H2>

      <p>
        <code>int</code> vem de <em>integer</em> (inteiro). É número{" "}
        <strong>sem vírgula, sem casa decimal</strong>. Coisa redonda, fechada.
        Pode ser positivo, negativo ou o famoso zero:
      </p>

      <CodeBlock
        code={`27
-5
0
1000000`}
      />

      <p>
        E olha que beleza: número <strong>não precisa de aspas</strong>. Você
        escreve ele pelado mesmo. Aliás, é justamente a falta de aspas que avisa
        pro Python &ldquo;ó, isso aqui é número de verdade, dá pra fazer conta&rdquo;.
      </p>

      <H2>float — o número COM vírgula (mas com PONTO) 🎯</H2>

      <p>
        <code>float</code> é o número <strong>com casa decimal</strong>: sua
        altura, um preço, a nota da prova. Tipo <code>1.75</code>, <code>3.14</code>,
        <code> 9.99</code>.
      </p>

      <p>
        E aqui mora <strong>o erro mais clássico de iniciante do planeta</strong>,
        então cola o olho: em Python (e em programação no geral), a casa decimal se
        escreve com <strong>PONTO</strong>, e não com vírgula igual a gente
        aprende na escola.
      </p>

      <CodeBlock
        code={`1.75    ✅ certo
3.14    ✅ certo

1,75    ❌ ERRADO (vírgula não!)`}
      />

      <Callout tipo="cuidado" titulo="Vírgula no número = dor de cabeça">
        <p>
          Se você escrever <code>1,75</code> com vírgula, o Python{" "}
          <strong>não</strong> entende &ldquo;um e setenta e cinco&rdquo;. Ele acha
          que são <em>duas coisas separadas</em> (o <code>1</code> e o{" "}
          <code>75</code>), porque pra ele vírgula é separador de coisas. Aí já
          viu: confusão na certa. Decimal é com <strong>ponto</strong>, e ponto
          final. Trocadilho proposital. 😏
        </p>
      </Callout>

      <H2>bool — o verdadeiro ou falso ✅❌</H2>

      <p>
        <code>bool</code> (de <em>booleano</em>, nome de um cara chamado Boole, não
        precisa decorar) é o tipo mais simplório de todos: ele só pode ter{" "}
        <strong>dois valores</strong>. Ou é <code>True</code> (verdadeiro) ou é{" "}
        <code>False</code> (falso). Acabou. É o &ldquo;sim ou não&rdquo; da vida.
      </p>

      <p>
        Detalhe importante: é <code>True</code> e <code>False</code> com a{" "}
        <strong>primeira letra MAIÚSCULA</strong>, em inglês. Não é{" "}
        <code>true</code>, não é <code>verdadeiro</code>. É <code>True</code> e{" "}
        <code>False</code>, do jeitinho certo, ou o Python reclama.
      </p>

      <Callout tipo="dica" titulo="Não esquenta com o bool agora">
        <p>
          O <code>bool</code> vai brilhar mesmo lá na frente, quando a gente
          aprender o computador a <strong>tomar decisões</strong> (&ldquo;se tá com
          fome, come&rdquo;). Por enquanto só guarda que ele existe e que só tem
          dois valores: <code>True</code> e <code>False</code>. Só isso. 👍
        </p>
      </Callout>

      <H2>Como descobrir o tipo de algo: type() 🔍</H2>

      <p>
        &ldquo;Tá, André, mas e se eu não souber qual é o tipo de uma coisa?&rdquo;
        Boa pergunta! O Python tem um detetive pra isso: a função{" "}
        <code>type()</code>. Você joga qualquer coisa dentro dela e ela te diz a
        etiqueta. Olha:
      </p>

      <Terminal
        arquivo="detetive.py"
        code={`print(type("oi"))`}
        saida={`<class 'str'>`}
        velocidade={42}
      />

      <p>
        Não se assusta com esse <code>&lt;class &lsquo;str&rsquo;&gt;</code> cheio
        de símbolo. Traduzindo do &ldquo;pythonês&rdquo;: ele tá dizendo &ldquo;ó,
        isso aqui é da turma (<em>class</em>) dos <code>str</code>&rdquo;. Ou seja:
        é texto. Ignora o resto, olha só a palavrinha do tipo.
      </p>

      <p>Bora testar com os outros tipos pra você pegar o jeito:</p>

      <Terminal
        arquivo="tipos.py"
        code={`print(type(27))
print(type(1.75))
print(type(True))`}
        saida={`<class 'int'>
<class 'float'>
<class 'bool'>`}
        velocidade={26}
      />

      <p>
        Tá vendo a brincadeira? <code>27</code> é <code>int</code>,{" "}
        <code>1.75</code> é <code>float</code>, <code>True</code> é{" "}
        <code>bool</code>. O detetive nunca erra.
      </p>

      <p>
        E agora aquela pegadinha das aspas, pra fechar com chave de ouro. Olha a
        diferença entre o número <code>123</code> e o texto{" "}
        <code>&ldquo;123&rdquo;</code>:
      </p>

      <Terminal
        arquivo="pegadinha.py"
        code={`print(type(123))
print(type("123"))`}
        saida={`<class 'int'>
<class 'str'>`}
        velocidade={30}
      />

      <p>
        Mesmo &ldquo;número&rdquo; na tela, tipos <strong>completamente
        diferentes</strong>, só por causa das aspas. O primeiro é número de
        verdade (<code>int</code>), o segundo é texto disfarçado (<code>str</code>
        ). Guarda isso no bolso.
      </p>

      <H2>Por que isso importa? Porque dá ERRO 💥</H2>

      <p>
        &ldquo;Beleza, mas por que eu tenho que ligar pra isso?&rdquo; Porque o
        Python <strong>não deixa você misturar tipos de qualquer jeito</strong>.
        Principalmente texto com número.
      </p>

      <p>
        Pensa assim: somar <code>2 + 3</code> é fácil, dá <code>5</code>. Mas e
        somar a <em>palavra</em> &ldquo;banana&rdquo; com o número <code>3</code>?
        Não faz sentido nenhum, né? Banana mais três é o quê? Pois é, o Python
        acha a mesma coisa.
      </p>

      <Terminal
        arquivo="confusao.py"
        code={`print("5" + 5)`}
        saida={`TypeError: can only concatenate str (not "int") to str`}
        velocidade={36}
      />

      <p>
        Esse <code>&ldquo;5&rdquo;</code> com aspas é <strong>texto</strong>, e o{" "}
        <code>5</code> sem aspas é <strong>número</strong>. O Python travou e
        gritou <code>TypeError</code> (&ldquo;erro de tipo&rdquo;) — que é ele
        dizendo &ldquo;mano, não dá pra juntar essas duas coisas, são tipos
        diferentes!&rdquo;.
      </p>

      <Callout tipo="curiosidade" titulo="Erro não é o fim do mundo">
        <p>
          Tomar <code>TypeError</code> é super normal, todo programador toma{" "}
          <strong>todo santo dia</strong>, até os feras. O Python tá só te
          avisando que algo não bateu. Leia a mensagem com calma, ela quase sempre
          aponta o problema. Erro é amigo, não inimigo. 🤝
        </p>
      </Callout>

      <H2>A solução: converter de um tipo pro outro 🔄</H2>

      <p>
        E se você <em>realmente</em> precisar somar aquele <code>&ldquo;5&rdquo;</code>{" "}
        texto com um número? Aí você <strong>converte</strong> o texto em número
        primeiro. É tipo trocar a etiqueta da caixa. O Python tem umas funçõezinhas
        prontas pra isso, com os mesmos nomes dos tipos:
      </p>

      <ul>
        <li>
          <code>int(...)</code> → transforma em número inteiro
        </li>
        <li>
          <code>float(...)</code> → transforma em número com decimal
        </li>
        <li>
          <code>str(...)</code> → transforma em texto
        </li>
      </ul>

      <p>
        Olha o <code>int()</code> resolvendo a treta de antes. A gente converte o{" "}
        <code>&ldquo;5&rdquo;</code> texto em <code>5</code> número, e aí a conta
        funciona:
      </p>

      <Terminal
        arquivo="convertendo.py"
        code={`print(int("5") + 5)`}
        saida={`10`}
        velocidade={36}
      />

      <p>
        Funcionou! O <code>int(&ldquo;5&rdquo;)</code> pegou o texto e devolveu o
        número de verdade, aí <code>5 + 5</code> deu <code>10</code> numa boa.
      </p>

      <p>Dá pra ir pros dois lados. Olha o caminho contrário:</p>

      <Terminal
        arquivo="ida-e-volta.py"
        code={`print(str(5))
print(float("1.5"))`}
        saida={`5
1.5`}
        velocidade={30}
      />

      <p>
        O <code>str(5)</code> pegou o número <code>5</code> e transformou no texto{" "}
        <code>&ldquo;5&rdquo;</code> (com aspas invisíveis ali, agora ele é
        texto). E o <code>float(&ldquo;1.5&rdquo;)</code> pegou aquele texto e virou
        número decimal de verdade.
      </p>

      <Callout tipo="dica" titulo="Por que isso vai te salvar a vida">
        <p>
          Daqui a pouco você vai aprender a <strong>perguntar coisas pro
          usuário</strong> (tipo &ldquo;qual sua idade?&rdquo;). E adivinha: o que a
          pessoa digita <strong>SEMPRE chega como texto</strong>, mesmo que ela
          digite um número! Então pra fazer conta com aquilo, você vai precisar
          converter com <code>int()</code> ou <code>float()</code>. Anota essa,
          você vai usar MUITO. 📌
        </p>
      </Callout>

      <Callout tipo="cuidado" titulo="Os tropeços clássicos dos tipos">
        <p>
          Resumão pra você não cair nas armadilhas: 1) decimal é com{" "}
          <strong>ponto</strong> (<code>1.75</code>), nunca vírgula. 2){" "}
          <code>&ldquo;123&rdquo;</code> com aspas é <strong>texto</strong>, não
          número — as aspas decidem tudo. 3) <code>True</code> e <code>False</code>{" "}
          são com a <strong>primeira letra maiúscula</strong> e em inglês. Grava
          esses três e você já tá na frente da galera.
        </p>
      </Callout>

      <Frase>
        Saber o tipo de uma coisa é saber o que dá pra fazer com ela. Texto você
        gruda; número você soma.
      </Frase>

      <Exercicio
        licao="Tipos de coisas"
        enunciado="A gente tem o texto &ldquo;10&rdquo; (com aspas, então é texto, lembra?). Escreve uma linha que transforma esse texto em número, soma 5 nele, e mostra o resultado na tela. A resposta tem que aparecer como 15."
        criterio={`A resposta esperada é algo como: print(int("10") + 5) — que mostra 15 na tela. O essencial é: usar int() (ou float()) pra converter o texto "10" em número, somar 5, e imprimir com print. Aceite variações: pode salvar em variável antes (ex: x = int("10"); print(x + 5)), pode usar aspas simples, pode escrever int('10')+5 dentro do print. O resultado precisa dar 15. Se a pessoa esquecer o int() e fizer print("10" + 5), explique com carinho que isso dá TypeError porque tá misturando texto com número, e que precisa converter primeiro. Se ela converter mas esquecer o print, marque como 'quase' e elogie o raciocínio.`}
        placeholder={`print(int("...") + ...)`}
      />

      <Exercicio
        licao="Tipos de coisas"
        enunciado="Sem rodar nada no computador, só na cabeça: diz qual é o tipo (str, int, float ou bool) de cada um desses quatro valores: &ldquo;banana&rdquo;  ,  42  ,  3.5  ,  False"
        criterio={`As respostas certas são: "banana" é str (texto, tem aspas), 42 é int (número inteiro, sem casa decimal), 3.5 é float (número com casa decimal/ponto), e False é bool (só pode ser True ou False). Aceite a resposta em qualquer formato (lista, frase, etc) desde que associe corretamente cada valor ao seu tipo. Se errar algum, aponte gentilmente o porquê: aspas = str, número redondo = int, número com ponto = float, True/False = bool. Acertou 3 ou 4: parabenize bastante.`}
        placeholder={`"banana" = ...\n42 = ...\n3.5 = ...\nFalse = ...`}
      />

      <p>
        Mandou bem! Agora você sabe que cada coisa tem sua etiqueta, sabe espiar
        ela com <code>type()</code> e sabe trocar de etiqueta com{" "}
        <code>int()</code>, <code>str()</code> e companhia. Na próxima a gente vai
        se divertir pra valer com o tipo mais bagunceiro de todos:{" "}
        <strong>strings — brincando com texto</strong>. Vai ter junção de palavra,
        letra por letra, um monte de truque legal. Vem! 🎈
      </p>
    </article>
  );
}
