"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";

export default function Input() {
  return (
    <article className="leitura">
      <Hero
        emoji="💬"
        titulo="input() — o PC te pergunta"
        subtitulo="Agora o programa conversa com quem tá usando"
      />

      <p>
        Até agora a nossa amizade com o computador era meio de mão única: você
        mandava o <code>print</code> e ele <strong>falava</strong>. Tagarela,
        coitado. Mas e se a gente quisesse que ele <em>escutasse</em> também? Que
        ele perguntasse algo pra você e usasse a sua resposta?
      </p>

      <p>
        É exatamente isso que o <code>input()</code> faz. Ele é o{" "}
        <strong>ouvido</strong> do programa.
      </p>

      <Frase>
        Com o <code>print</code> o computador fala. Com o <code>input</code> ele
        escuta. Agora vocês dois conversam de verdade.
      </Frase>

      <H2>O que o input() faz, na real 👂</H2>

      <p>
        Quando o computador chega numa linha com <code>input()</code>, acontece
        uma coisa mágica: ele <strong>para tudo</strong> e fica esperando. Tipo
        aquele garçom parado na sua mesa esperando você decidir o pedido. Ele não
        sai dali enquanto você não <strong>digitar alguma coisa e apertar
        Enter</strong>.
      </p>

      <p>Olha o exemplo mais simples possível:</p>

      <Terminal
        arquivo="pergunta.py"
        code={`input("Aperte Enter pra continuar... ")
print("Valeu!")`}
        saida={`Aperte Enter pra continuar... [você aperta Enter]
Valeu!`}
        velocidade={32}
      />

      <p>
        Repara: o programa mostrou a frase e <strong>congelou</strong>. Só
        depois que você aperta Enter ele segue pra próxima linha e fala
        &ldquo;Valeu!&rdquo;. O texto que você bota dentro do <code>input()</code>{" "}
        é a <strong>perguntinha</strong> que aparece na tela. É educado, avisa o
        que você tem que fazer.
      </p>

      <Callout tipo="dica" titulo="Por que essa saída tá meio estranha?">
        <p>
          Como o <code>input</code> depende de <strong>você digitar</strong>, não
          dá pra mostrar uma saída fixa de verdade. Então, nas telinhas dessa
          lição, a saída é só um <strong>exemplo de como ficaria</strong> se
          alguém tivesse digitado. O que tá entre colchetes (tipo{" "}
          <code>[você digita algo]</code>) é a sua parte na conversa. 😉
        </p>
      </Callout>

      <H2>Guardando a resposta numa caixinha 📦</H2>

      <p>
        Perguntar é legal, mas a resposta some no ar se você não{" "}
        <strong>guardar</strong> ela em algum lugar. E pra isso a gente usa as
        nossas queridas <strong>variáveis</strong> (lembra das caixinhas?).
      </p>

      <CodeBlock code={`nome = input("Qual seu nome? ")`} />

      <p>Lê isso da direita pra esquerda, devagar:</p>

      <ul>
        <li>
          <code>input("Qual seu nome? ")</code> → mostra a pergunta na tela e
          espera você digitar.
        </li>
        <li>
          O <code>=</code> → pega o que você digitou e{" "}
          <strong>guarda na caixinha</strong>.
        </li>
        <li>
          <code>nome</code> → é o nome da caixinha onde a resposta ficou
          guardada.
        </li>
      </ul>

      <p>
        Aí, com a resposta na mão, você faz o que quiser com ela. Tipo devolver
        um oizinho carinhoso:
      </p>

      <Terminal
        arquivo="oi.py"
        code={`nome = input("Qual seu nome? ")
print(f"Oi, {nome}! Prazer enorme. 😄")`}
        saida={`Qual seu nome? Maria
Oi, Maria! Prazer enorme. 😄`}
        velocidade={28}
      />

      <p>
        Tá vendo a conversa rolando? O programa perguntou, a pessoa (a Maria, no
        exemplo) digitou &ldquo;Maria&rdquo;, e o programa usou esse nome na
        resposta com aquele <code>f</code> mágico na frente das aspas (o{" "}
        <em>f-string</em>, que a gente já viu). <strong>Isso é um programa que
        conversa.</strong> Que chique.
      </p>

      <Callout tipo="dica" titulo="Põe um espacinho no fim da pergunta">
        <p>
          Repara que escrevi <code>{'"Qual seu nome? "'}</code> com um{" "}
          <strong>espaço depois do interrogação</strong>, antes de fechar as
          aspas. É só pra resposta não ficar grudada na pergunta, tipo{" "}
          <code>Qual seu nome?Maria</code>. Detalhe besta, mas deixa tudo mais
          bonito.
        </p>
      </Callout>

      <H2>⚠️ A PEGADINHA MAIS IMPORTANTE DA LIÇÃO ⚠️</H2>

      <p>
        Presta atenção AQUI, porque isso pega <strong>todo mundo</strong> que tá
        começando. Todo mundo mesmo. Eu, você, o papa, todos caímos nessa um dia.
      </p>

      <Frase>
        O <code>input()</code> SEMPRE devolve TEXTO. Sempre. Mesmo quando você
        digita um número.
      </Frase>

      <p>
        Isso quer dizer o seguinte: se você perguntar a idade de alguém e a
        pessoa digitar <code>27</code>, o computador <strong>não</strong> entende
        isso como o número vinte e sete. Ele guarda <code>{'"27"'}</code>, com
        aspas, como se fosse <strong>texto</strong>. Tipo a palavra
        &ldquo;banana&rdquo;, só que escrita com riscos de número.
      </p>

      <p>
        &ldquo;Tá, e qual o problema disso?&rdquo; O problema aparece na hora de
        fazer <strong>conta</strong>. Olha que coisa esquisita:
      </p>

      <Terminal
        arquivo="bug.py"
        code={`idade = input("Quantos anos você tem? ")
print(idade * 2)`}
        saida={`Quantos anos você tem? 27
2727`}
        velocidade={30}
      />

      <p>
        VIU?! Você esperava <strong>54</strong> (que é 27 vezes 2), mas o
        computador cuspiu <code>2727</code>. Que diabo é isso?
      </p>

      <p>
        Acontece que, pro Python, multiplicar <strong>texto</strong> por 2 não é
        somar nada — é <strong>repetir o texto duas vezes</strong>. Tipo
        &ldquo;abc&rdquo; vezes 2 vira &ldquo;abcabc&rdquo;. Então{" "}
        <code>{'"27"'}</code> vezes 2 virou <code>{'"2727"'}</code>. O
        computador fez exatamente o que você pediu — só que você pediu errado sem
        querer. Cachorro obediente, lembra? 🐶
      </p>

      <Callout tipo="cuidado" titulo="Texto e número são bichos diferentes">
        <p>
          <code>{'"27"'}</code> (com aspas) é <strong>texto</strong>.{" "}
          <code>27</code> (sem aspas) é <strong>número</strong>. Eles{" "}
          <em>parecem</em> iguais, mas o computador trata os dois de jeitos bem
          diferentes. E o <code>input()</code> sempre te entrega a versão{" "}
          <strong>texto</strong>, mesmo que pareça número. Grava isso.
        </p>
      </Callout>

      <H2>A solução: converter pra número 🔄</H2>

      <p>
        Calma, tem conserto, e é fácil. A gente só precisa avisar o Python:
        &ldquo;ó, isso aqui é pra ser tratado como número, viu?&rdquo;. E pra
        isso existem dois ajudantes:
      </p>

      <ul>
        <li>
          <code>int(...)</code> → transforma em <strong>número inteiro</strong>{" "}
          (sem vírgula, tipo 27, 100, 5).
        </li>
        <li>
          <code>float(...)</code> → transforma em <strong>número com
          vírgula</strong> (tipo 1.75, 3.14 — em Python a vírgula é um ponto).
        </li>
      </ul>

      <p>
        Pra idade, que é um número redondo, a gente usa o <code>int</code>. Olha
        ele em ação, sozinho primeiro:
      </p>

      <Terminal
        arquivo="conserto.py"
        code={`idade = input("Quantos anos você tem? ")
idade = int(idade)
print(idade * 2)`}
        saida={`Quantos anos você tem? 27
54`}
        velocidade={28}
      />

      <p>
        AÊ! Agora sim deu <strong>54</strong>. A linha{" "}
        <code>idade = int(idade)</code> pegou o texto <code>{'"27"'}</code> e
        transformou no número <code>27</code> de verdade. Aí a conta funcionou
        bonitinho.
      </p>

      <H2>O combo: input por fora, int por dentro 🎯</H2>

      <p>
        Aquele jeito de cima (em duas linhas) funciona, mas os programadores são
        preguiçosos (no bom sentido) e gostam de juntar tudo numa linha só. O
        truque é colocar <strong>um comando dentro do outro</strong>:
      </p>

      <CodeBlock code={`idade = int(input("Quantos anos você tem? "))`} />

      <p>
        Pode parecer um bicho de sete cabeças com esses parênteses todos, mas
        calma, vamos abrir essa cebola de <strong>dentro pra fora</strong>:
      </p>

      <ol>
        <li>
          Primeiro roda o que tá <strong>mais no centro</strong>:{" "}
          <code>input("Quantos anos você tem? ")</code> → pergunta e pega o texto
          que a pessoa digitou (ex: <code>{'"27"'}</code>).
        </li>
        <li>
          Esse texto cai dentro do <code>int( ... )</code> que tá em volta →
          converte pro número <code>27</code>.
        </li>
        <li>
          E aí o <code>=</code> guarda esse número na caixinha{" "}
          <code>idade</code>.
        </li>
      </ol>

      <p>
        É tipo uma <strong>boneca russa</strong> (aquelas que tem uma dentro da
        outra), ou um presente embrulhado dentro de outro presente. O Python abre
        de dentro pra fora, sempre.
      </p>

      <Callout tipo="lembrete" titulo="Conta os parênteses!">
        <p>
          Cada <code>(</code> que você abre precisa de um <code>)</code> pra
          fechar. No <code>int(input("..."))</code> tem{" "}
          <strong>DOIS parênteses fechando no fim</strong>: um fecha o{" "}
          <code>input</code> e o outro fecha o <code>int</code>. Se faltar um, o
          Python reclama. É só contar: abriu dois, fecha dois.
        </p>
      </Callout>

      <H2>Um programa completo, pra fechar com chave de ouro ✨</H2>

      <p>
        Bora juntar TUDO que a gente aprendeu num programinha só. Ele pergunta o
        nome e a idade, e faz uma continha pra dizer quantos anos a pessoa vai ter
        daqui a 10 anos. Repara que a idade <strong>precisa</strong> do{" "}
        <code>int</code>, senão a conta quebra:
      </p>

      <Terminal
        arquivo="conversa.py"
        code={`nome = input("Qual seu nome? ")
idade = int(input("Quantos anos você tem? "))

futuro = idade + 10

print(f"Olá, {nome}!")
print(f"Daqui a 10 anos, você vai ter {futuro} anos. 🎂")`}
        saida={`Qual seu nome? João
Quantos anos você tem? 30
Olá, João!
Daqui a 10 anos, você vai ter 40 anos. 🎂`}
        velocidade={24}
      />

      <p>
        Olha que lindo! O programa conversou de verdade: perguntou duas coisas,
        guardou as respostas, fez uma conta com a idade (que só funcionou porque a
        gente converteu pra número com o <code>int</code>) e ainda respondeu de
        forma personalizada usando o <code>f</code> na frente das aspas. Se o João
        tem 30, daqui a 10 anos terá 40. Matemática não mente. 🧮
      </p>

      <Frase>
        Pergunta, guarda, converte, calcula, responde. Esse é o ciclo da vida de
        um programa que conversa.
      </Frase>

      <H2>Os tombos clássicos (pra você não levar) 🤕</H2>

      <p>
        Antes do exercício, deixa eu te avisar dos buracos no caminho. Já caí em
        todos, sem orgulho nenhum:
      </p>

      <ul>
        <li>
          <strong>Esquecer que o input vem como texto.</strong> Repete comigo:{" "}
          <em>input sempre devolve texto</em>. Mesmo número digitado vira texto.
        </li>
        <li>
          <strong>Esquecer de converter antes da conta.</strong> Se você for fazer
          conta com a resposta, <code>int(...)</code> ou <code>float(...)</code>{" "}
          ANTES. Senão dá aquele <code>2727</code> bizarro.
        </li>
        <li>
          <strong>Errar a ordem dos parênteses.</strong> É{" "}
          <code>int(input("..."))</code> — o <code>input</code> fica{" "}
          <strong>dentro</strong> do <code>int</code>, nunca o contrário. E não
          esquece de fechar os <strong>dois</strong> parênteses no fim.
        </li>
      </ul>

      <Callout tipo="piada" titulo="A regrinha de bolso">
        <p>
          Texto a pessoa digitou e você só quer mostrar de volta? Usa o input
          pelado. Vai fazer <strong>conta</strong> com isso? Embrulha no{" "}
          <code>int()</code>. Pensa assim: número pra calcular precisa de{" "}
          <strong>roupa de número</strong>, e o <code>int()</code> é a roupa. 👔
        </p>
      </Callout>

      <Exercicio
        licao="input()"
        enunciado="Escreve um programinha que pergunta a idade da pessoa e mostra na tela quantos anos ela vai ter daqui a 5 anos. Dica gigante: lembra que o input vem como texto, então você vai precisar converter pra número antes de somar!"
        criterio={`O objetivo é o aluno usar input() para perguntar a idade, CONVERTER o resultado para número e fazer uma conta somando 5. A resposta ideal é algo como: idade = int(input("Quantos anos você tem? ")) seguido de print(idade + 5) — ou em duas linhas, com idade = int(idade) separado, ou usando print(f"... {idade + 5} ..."). O PONTO-CHAVE, o que realmente importa, é CONVERTER o input pra número (int() ou float()) antes de somar. Aceite variações: textos de pergunta diferentes, nomes de variável diferentes, somar 5 dentro ou fora do print, usar f-string ou print com vírgula. Se o aluno fez tudo certo COM a conversão (int/float), está CERTO. Se o aluno esqueceu o int()/float() e tentou somar direto no texto (ex: idade = input(...) e depois print(idade + 5)), marque como 'QUASE' e explique com carinho que input devolve texto, e que somar 5 num texto dá erro — falta envolver o input num int(). Se nem tentou perguntar ou nem somou 5, está errado, mas oriente gentilmente.`}
        placeholder={`idade = int(input("..."))\nprint(...)`}
      />

      <p>
        Mandou bem? Então respira, porque você acabou de desbloquear uma
        habilidade poderosa: <strong>programas que conversam com gente de
        verdade</strong>. Pergunta, escuta, responde. É o começo de tudo que é
        interativo.
      </p>

      <p>
        E agora vem a parte que muda o jogo de vez. Até aqui nossos programas
        sempre faziam a mesma coisa, do mesmo jeito, toda vez. No próximo módulo a
        gente ensina o computador a <strong>tomar decisões</strong>: fazer uma
        coisa OU outra dependendo da situação. &ldquo;Se a idade for maior que
        18... senão...&rdquo;. É hora de aprender sobre{" "}
        <strong>verdadeiro ou falso</strong>. Segura essa emoção e bora pro{" "}
        <strong>Módulo 3</strong>! 🚦
      </p>
    </article>
  );
}
