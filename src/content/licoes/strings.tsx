"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaPrint } from "@/components/cenas/tipos-print";

export default function Strings() {
  return (
    <article className="leitura">
      <Hero
        emoji="🔤"
        titulo="Strings — brincando com texto"
        subtitulo="Juntar, gritar (MAIÚSCULA) e cochichar (minúscula)"
      />

      <p>
        Calma com o nome estranho. <strong>String</strong> é só o jeito chique de
        falar <strong>texto</strong>. Qualquer coisa que seja palavra, frase,
        nome, emoji, recado — se tá entre <strong>aspas</strong>, é uma string.
      </p>

      <p>
        Você já viu isso lá no <code>print</code>: aquele textinho entre aspas era
        uma string o tempo todo. Agora a gente vai aprender a{" "}
        <strong>brincar</strong> com ele: grudar texto, transformar em maiúscula,
        contar letras, trocar pedaços... vai ser divertido pra caramba.
      </p>

      <Frase>
        Se tá entre aspas, é texto. Se é texto, é string. Pronto, você já sabe
        metade da lição.
      </Frase>

      <H2>Recapitulando: aspas simples ou duplas 🗣️</H2>

      <p>
        Toda string mora entre aspas. E o Python deixa você escolher: pode ser{" "}
        <strong>aspas duplas</strong> <code>&ldquo; &rdquo;</code> ou{" "}
        <strong>aspas simples</strong> <code>&lsquo; &rsquo;</code>. As duas
        funcionam igualzinho:
      </p>

      <Terminal
        arquivo="aspas.py"
        code={`print("eu uso aspas duplas")
print('eu uso aspas simples')`}
        saida={`eu uso aspas duplas
eu uso aspas simples`}
        velocidade={30}
      />

      <p>
        Tanto faz qual você usa. A única regra: <strong>abriu com uma, fecha com
        a mesma</strong>. Não dá pra abrir com aspas duplas e fechar com simples,
        senão o Python fica confuso (e ele se confunde fácil, coitado).
      </p>

      <Callout tipo="dica" titulo="Pra que servem as duas?">
        <p>
          Útil quando o texto <em>tem</em> aspas dentro. Quer escrever{" "}
          <em>Ela disse &ldquo;oi&rdquo;</em>? Bota aspas simples por fora:{" "}
          <code>{`'Ela disse "oi"'`}</code>. Aí as de dentro não atrapalham. Esperto,
          né?
        </p>
      </Callout>

      <H2>Juntando textos com + (concatenação) 🔗</H2>

      <p>
        Palavra difícil do dia: <strong>concatenação</strong>. Respira. Significa
        só <strong>grudar dois textos</strong> pra virar um só. E a ferramenta pra
        isso é o velho sinal de mais, o <code>+</code>:
      </p>

      <Terminal
        arquivo="juntar.py"
        code={`print("bom" + "dia")`}
        saida={`bomdia`}
        velocidade={36}
      />

      <p>
        Ué... saiu <code>bomdia</code> tudo grudado?! 😱 Pois é. O Python é{" "}
        <strong>literal demais</strong>: ele juntou exatamente o que você deu, e
        você não deu nenhum espaço. Ele não vai adivinhar que você queria um
        espacinho ali no meio.
      </p>

      <Callout tipo="cuidado" titulo="O erro clássico do espaço sumido">
        <p>
          Esse é o tropeço número 1 de quem tá começando. Você gruda dois textos e
          fica <code>tudogrudado</code> sem entender por quê. O culpado é sempre o{" "}
          <strong>espaço que faltou</strong>. Computador não tem bom-senso, lembra?
        </p>
      </Callout>

      <p>
        A solução é colocar o espaço <strong>na mão</strong>. O espaço é um
        caractere igual qualquer outro, então é só botar uma string com um
        espacinho dentro <code>{`" "`}</code> no meio:
      </p>

      <Terminal
        arquivo="juntar2.py"
        code={`print("bom" + " " + "dia")`}
        saida={`bom dia`}
        velocidade={32}
      />

      <p>
        Pronto, agora sim: <code>bom dia</code>. Aquele <code>{`" "`}</code> é só
        um texto com um espaço dentro. Parece bobagem, mas é exatamente disso que
        o Python precisa. Funciona também com variáveis:
      </p>

      <Terminal
        arquivo="juntar3.py"
        code={`nome = "André"
print("Olá, " + nome + "!")`}
        saida={`Olá, André!`}
        velocidade={28}
      />

      <p>
        Repara que dentro das aspas eu já deixei o espaço depois da vírgula
        (&ldquo;Olá,&nbsp;&rdquo;) pra não grudar no nome. Funciona! Mas... é meio
        chato ficar contando espaço, abrindo e fechando aspas, somando isso tudo.
        Tem um jeito <strong>muito melhor</strong>. Bora pro ponto alto da lição.
      </p>

      <H2>F-string: o jeito moderno e gostoso ✨</H2>

      <p>
        Essa aqui é a estrela do show. Decora o nome: <strong>f-string</strong>.
        É o jeito que todo mundo usa hoje pra montar texto com variáveis dentro, e
        depois que você aprende, não larga mais.
      </p>

      <p>A receita tem duas partes só:</p>

      <ul>
        <li>
          Você bota um <code>f</code> <strong>grudado antes da aspa de
          abertura</strong>. Esse <code>f</code> é de <em>format</em> (formatar). É
          um aviso pro Python: &ldquo;ó, esse texto tem surpresinhas dentro&rdquo;.
        </li>
        <li>
          Dentro do texto, onde você quiser enfiar o valor de uma variável, você
          usa <strong>chaves</strong> <code>{"{}"}</code> com o nome da variável
          dentro: <code>{"{nome}"}</code>. O Python troca isso pelo valor de
          verdade na hora.
        </li>
      </ul>

      <p>Olha que beleza:</p>

      <Terminal
        arquivo="fstring.py"
        code={`nome = "André"
print(f"Oi, {nome}!")`}
        saida={`Oi, André!`}
        velocidade={30}
      />

      <p>
        Viu a mágica? Você escreveu <code>{"{nome}"}</code> e na tela apareceu{" "}
        <strong>André</strong>. O Python pegou o valor que tava guardado na
        variável <code>nome</code> e encaixou no lugar das chaves. Sem somar nada,
        sem ficar contando aspas. Limpinho.
      </p>

      <Callout tipo="dica" titulo="Pensa nas chaves como uma janelinha">
        <p>
          As <code>{"{}"}</code> são tipo uma <strong>janelinha</strong> no meio do
          texto. Por ela, o valor da variável dá um &ldquo;oi&rdquo; e aparece. Tudo
          que tá <em>fora</em> das chaves é texto normal; tudo <em>dentro</em> das
          chaves o Python calcula e mostra o resultado.
        </p>
      </Callout>

      <p>
        E você pode usar <strong>quantas janelinhas quiser</strong> na mesma
        frase, misturando várias variáveis:
      </p>

      <Terminal
        arquivo="fstring2.py"
        code={`nome = "Maria"
cidade = "Recife"
print(f"A {nome} mora em {cidade}.")`}
        saida={`A Maria mora em Recife.`}
        velocidade={26}
      />

      <p>
        Funciona com número também — e aqui a f-string brilha, porque você nem
        precisa se preocupar se é texto ou número, ela resolve:
      </p>

      <Terminal
        arquivo="fstring3.py"
        code={`nome = "João"
idade = 27
print(f"O {nome} tem {idade} anos.")`}
        saida={`O João tem 27 anos.`}
        velocidade={26}
      />

      <p>
        E o melhor: dá pra fazer <strong>conta dentro das chaves</strong>! O Python
        calcula e já mostra o resultado. Olha só:
      </p>

      <Terminal
        arquivo="fstring4.py"
        code={`idade = 27
print(f"Ano que vem você faz {idade + 1}!")`}
        saida={`Ano que vem você faz 28!`}
        velocidade={26}
      />

      <Terminal
        arquivo="fstring5.py"
        code={`preco = 10
quantidade = 3
print(f"Total: {preco * quantidade} reais")`}
        saida={`Total: 30 reais`}
        velocidade={24}
      />

      <p>
        Sacou o poder? A f-string deixa você montar frases inteiras misturando
        texto, variáveis e contas, tudo de um jeito que dá pra <em>ler</em>. É por
        isso que ela é a queridinha. Use sem medo.
      </p>

      <CenaPrint
        exemplos={["Oi, André!", "A Maria mora em Recife.", "Total: 30 reais"]}
      />

      <Callout tipo="curiosidade" titulo="Por que f-string e não o +?">
        <p>
          Dá pra fazer tudo com <code>+</code>, mas vira uma sopa de aspas e
          espaços que ninguém consegue ler depois. A f-string é mais curta, mais
          clara e <strong>não esquece espaço</strong>, porque você escreve a frase
          do jeitinho natural. Menos dor de cabeça. 🙏
        </p>
      </Callout>

      <H2>Métodos: ações que o texto sabe fazer 🛠️</H2>

      <p>
        Toda string vem com uns <strong>truques embutidos</strong> — coisas que o
        texto sabe fazer sozinho. A gente chama esses truques de{" "}
        <strong>métodos</strong>. Pensa assim: o texto é um bonequinho que sabe
        umas habilidades, e você ativa cada uma com um <strong>ponto</strong>{" "}
        <code>.</code> seguido do nome do truque e <strong>parênteses</strong>.
      </p>

      <p>
        A fórmula é sempre: <code>texto.truque()</code>. Vamos ver os mais úteis,
        um por um.
      </p>

      <p>
        <code>.upper()</code> — deixa <strong>TUDO MAIÚSCULO</strong>. É o texto
        gritando:
      </p>

      <Terminal
        arquivo="upper.py"
        code={`print("estou gritando".upper())`}
        saida={`ESTOU GRITANDO`}
        velocidade={30}
      />

      <p>
        <code>.lower()</code> — o contrário: deixa{" "}
        <strong>tudo minúsculo</strong>. É o texto cochichando:
      </p>

      <Terminal
        arquivo="lower.py"
        code={`print("PARA DE GRITAR".lower())`}
        saida={`para de gritar`}
        velocidade={30}
      />

      <p>
        <code>.title()</code> — deixa a{" "}
        <strong>Primeira Letra De Cada Palavra Maiúscula</strong>. Ótimo pra
        nomes:
      </p>

      <Terminal
        arquivo="title.py"
        code={`print("maria da silva".title())`}
        saida={`Maria Da Silva`}
        velocidade={28}
      />

      <p>
        <code>.strip()</code> — <strong>tira os espaços das pontas</strong> do
        texto (sobra dos lados, mas não no meio). Útil quando o usuário digita com
        espaço sem querer:
      </p>

      <Terminal
        arquivo="strip.py"
        code={`bagunca = "   oi   "
print(bagunca.strip())`}
        saida={`oi`}
        velocidade={28}
      />

      <p>
        Difícil de ver no print porque espaço é invisível, mas confia: aqueles
        espaços antes e depois do <code>oi</code> sumiram. As pontas ficaram
        limpinhas.
      </p>

      <p>
        <code>.replace("a", "b")</code> — <strong>troca um pedaço por
        outro</strong>. Você fala o que quer substituir e por quê. Ele acha todas
        as ocorrências e troca:
      </p>

      <Terminal
        arquivo="replace.py"
        code={`frase = "eu odeio segunda"
print(frase.replace("odeio", "amo"))`}
        saida={`eu amo segunda`}
        velocidade={26}
      />

      <p>
        Mentira, ninguém ama segunda. Mas o <code>.replace</code> não julga, ele só
        troca. 😄 Repara que ele recebe <strong>duas coisas</strong> dentro dos
        parênteses: o que sai (<code>{`"odeio"`}</code>) e o que entra (
        <code>{`"amo"`}</code>), separados por vírgula.
      </p>

      <Callout tipo="curiosidade" titulo="O texto original não muda!">
        <p>
          Detalhe importante: esses métodos <strong>não estragam</strong> o seu
          texto original. Eles criam um texto <em>novo</em> com a mudança. Se você
          quiser guardar o resultado, bota numa variável:{" "}
          <code>{`maiusculo = nome.upper()`}</code>. Senão o resultado só aparece e
          some.
        </p>
      </Callout>

      <H2>Contando letras com len() 📏</H2>

      <p>
        Quer saber <strong>quantos caracteres</strong> tem um texto? Tem um
        comando pra isso: o <code>len</code> (de <em>length</em>, comprimento em
        inglês). Você bota o texto dentro dos parênteses e ele te dá o número:
      </p>

      <Terminal
        arquivo="len.py"
        code={`print(len("palavra"))`}
        saida={`7`}
        velocidade={32}
      />

      <p>
        Sete! P-a-l-a-v-r-a, conta aí, são 7 letrinhas. E atenção:{" "}
        <strong>espaço também conta</strong> como caractere, porque pro Python ele
        é um caractere igual qualquer outro:
      </p>

      <Terminal
        arquivo="len2.py"
        code={`nome = "André Silva"
print(len(nome))`}
        saida={`11`}
        velocidade={28}
      />

      <p>
        Onze: as 5 letras de &ldquo;André&rdquo;, mais o espaço, mais as 5 de
        &ldquo;Silva&rdquo;. O espaço entrou na conta. Repara que o{" "}
        <code>len</code> vem <strong>antes</strong> com o texto dentro dos
        parênteses — diferente dos métodos, que vêm depois com o ponto. São jeitos
        diferentes, mas dá pra acostumar.
      </p>

      <H2>Dá pra encaixar tudo junto 🎯</H2>

      <p>
        Agora a brincadeira fica boa: você pode misturar f-string com método. Por
        exemplo, gritar o nome de alguém dentro de uma frase:
      </p>

      <Terminal
        arquivo="combo.py"
        code={`nome = "andré"
print(f"BEM-VINDO, {nome.upper()}!")`}
        saida={`BEM-VINDO, ANDRÉ!`}
        velocidade={26}
      />

      <p>
        Dentro da janelinha <code>{"{}"}</code> você botou{" "}
        <code>nome.upper()</code> e o Python fez tudo: pegou a variável, gritou ela
        com o <code>.upper()</code> e encaixou na frase. Isso é o que dá pra fazer
        combinando as ferramentinhas que você acabou de aprender. 🤝
      </p>

      <Frase>
        Texto no Python não é só pra mostrar. É pra moldar, juntar, gritar e
        transformar do jeito que você quiser.
      </Frase>

      <H2>Os errinhos que pegam todo mundo 🤦</H2>

      <CodeBlock
        code={`# 1) Esqueceu o espaço ao juntar:
"bom" + "dia"        # → bomdia  (grudou!)
"bom" + " " + "dia"  # → bom dia (certo)

# 2) Esqueceu o f na f-string:
print("Oi, {nome}")   # → Oi, {nome}   (sai literal! 😱)
print(f"Oi, {nome}")  # → Oi, André    (certo)

# 3) Esqueceu os parênteses do método:
"texto".upper        # não faz nada de útil
"texto".upper()      # → TEXTO (certo)`}
      />

      <Callout tipo="cuidado" titulo="Os 3 tropeços campeões">
        <p>
          <strong>Espaço sumido:</strong> juntou com <code>+</code> e esqueceu o{" "}
          <code>{`" "`}</code> no meio? Vira tudo grudado.
        </p>
        <p>
          <strong>Esqueceu o <code>f</code>:</strong> sem o <code>f</code> antes
          das aspas, o <code>{"{nome}"}</code> aparece <em>literal</em> na tela,
          com chaves e tudo, em vez do valor. Bota o <code>f</code>!
        </p>
        <p>
          <strong>Esqueceu os <code>()</code>:</strong> todo método precisa dos
          parênteses no fim. É <code>.upper()</code>, não <code>.upper</code>.
          Sem os parênteses, ele não executa.
        </p>
      </Callout>

      <Callout tipo="piada" titulo="Resumo pra geladeira">
        <p>
          <strong>+</strong> gruda (cuidado com o espaço). <strong>f-string</strong>{" "}
          é a vida boa. <strong>.upper()</strong> grita,{" "}
          <strong>.lower()</strong> cochicha. <strong>len()</strong> conta. E o{" "}
          <code>f</code> some quando você menos espera, então fica de olho. 👀
        </p>
      </Callout>

      <Exercicio
        licao="Strings — brincando com texto"
        enunciado="Cria uma variável chamada nome com o seu nome dentro (ou de quem você quiser). Depois, usando f-string, mostra na tela uma saudação tipo: Olá, André, seja bem-vindo! — mas com o nome vindo da variável."
        criterio={`A resposta ideal usa f-string com a variável dentro das chaves, por exemplo:
nome = "André"
print(f"Olá, {nome}, seja bem-vindo!")

O que avaliar e valorizar:
- Criou uma variável (de preferência chamada 'nome') guardando um texto entre aspas.
- Usou a variável DENTRO do texto da saudação (esse é o ponto central do exercício).
- Idealmente usou f-string: um f antes das aspas e {nome} (ou similar) dentro das chaves.

Aceitar como correto também a concatenação correta com +, desde que os espaços estejam certos, por exemplo: print("Olá, " + nome + ", seja bem-vindo!").

Variações de texto da saudação são totalmente aceitáveis (qualquer frase de boas-vindas serve), assim como aspas simples ou duplas.

Marcar como 'quase' se: esqueceu o f mas usou {nome} (aí o {nome} sairia literal — aponte isso com carinho); ou se concatenou mas grudou as palavras por falta de espaço; ou se colocou o nome direto no texto sem usar a variável (explique que o exercício pede usar a variável dentro da frase). Seja gentil e encorajador ao apontar.`}
        placeholder={`nome = "..."\nprint(f"Olá, {nome}, ...")`}
      />

      <p>
        Mandou bem demais! Você já sabe juntar, transformar e medir texto como
        gente grande. Na próxima lição a gente troca as letras pelos{" "}
        <strong>números</strong> e aprende a fazer o Python virar uma{" "}
        <strong>calculadora</strong> — somar, multiplicar, dividir e tudo mais.
        Prepara a mente que vai ter conta. 🔢
      </p>
    </article>
  );
}
