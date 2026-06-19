"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaLista } from "@/components/cenas/lista";

export default function Listas() {
  return (
    <article className="leitura">
      <Hero
        emoji="📝"
        titulo="Listas — uma fila de caixinhas"
        subtitulo="Guardar várias coisas numa coisa só (sem virar bagunça)"
      />

      <p>
        Lembra das <strong>variáveis</strong>? Cada variável é uma caixinha que
        guarda <em>uma</em> coisa. Beleza. Mas e quando você quer guardar{" "}
        <strong>várias</strong> coisas? Tipo, a sua lista de compras inteira?
      </p>

      <p>O jeito ruim seria fazer assim:</p>

      <CodeBlock
        code={`fruta1 = "maçã"
fruta2 = "banana"
fruta3 = "uva"`}
      />

      <p>
        Ok, funciona. Mas agora imagina 50 frutas. Ou 500.{" "}
        <code>fruta1</code>, <code>fruta2</code>, <code>fruta3</code>...{" "}
        <code>fruta499</code>, <code>fruta500</code>. Você ia <strong>surtar</strong>.
        Ninguém merece. 😵
      </p>

      <Frase>
        Quando você se pega criando <em>coisa1</em>, <em>coisa2</em>,{" "}
        <em>coisa3</em>... é o universo gritando: usa uma LISTA, criatura!
      </Frase>

      <H2>O que é uma lista? 🚂</H2>

      <p>
        Uma <strong>lista</strong> é uma caixa grandona que guarda{" "}
        <strong>várias coisas em ordem</strong>, uma do lado da outra. Pensa
        assim:
      </p>

      <ul>
        <li>
          uma <strong>fileira de caixinhas numeradas</strong>, cada uma com uma
          coisa dentro;
        </li>
        <li>
          uma <strong>lista de compras</strong> no papel, item embaixo de item;
        </li>
        <li>
          um <strong>trem</strong>, e cada vagão carrega uma coisa diferente. 🚃🚃🚃
        </li>
      </ul>

      <p>
        Em vez de 500 variáveis espalhadas, você junta tudo numa lista só e
        pronto. Uma caixona, vários compartimentos.
      </p>

      <H2>Como criar uma lista 📦</H2>

      <p>
        É molezinha. Você usa <strong>colchetes</strong> <code>[ ]</code> e
        separa os itens por <strong>vírgula</strong>:
      </p>

      <Terminal
        arquivo="frutas.py"
        code={`frutas = ["maçã", "banana", "uva"]
print(frutas)`}
        saida={`['maçã', 'banana', 'uva']`}
        velocidade={30}
      />

      <p>
        Olha que coisa linda. Uma variável só — <code>frutas</code> — guardando
        três coisas. Os colchetes <code>[ ]</code> são o &ldquo;saco&rdquo; que
        segura tudo junto, e a vírgula separa um item do outro.
      </p>

      <p>
        E a lista é <strong>esperta</strong>: pode guardar texto, pode guardar
        número, pode até misturar tudo no mesmo saco:
      </p>

      <Terminal
        arquivo="misturada.py"
        code={`idades = [10, 27, 5, 99]
mistura = ["André", 27, "Python", True]
vazia = []

print(idades)
print(mistura)
print(vazia)`}
        saida={`[10, 27, 5, 99]
['André', 27, 'Python', True]
[]`}
        velocidade={24}
      />

      <p>
        Reparou no <code>vazia = []</code>? Isso é uma{" "}
        <strong>lista vazia</strong>, sem nada dentro. Parece inútil agora, mas é
        super comum: você cria a lista vazinha e vai jogando coisa dentro depois.
        Já já a gente faz isso.
      </p>

      <Callout tipo="curiosidade" titulo="Colchetes, parênteses, chaves... que confusão!">
        <p>
          Calma que tem lógica. <strong>Parênteses</strong> <code>( )</code> são
          do <code>print</code>. <strong>Colchetes</strong> <code>[ ]</code>{" "}
          (esses quadradões) são das <strong>listas</strong>. Cada um tem seu
          trabalho. Por enquanto guarda só: <strong>lista = colchete</strong>.
        </p>
      </Callout>

      <H2>O índice: cada item tem uma posição 🔢</H2>

      <p>
        Aqui mora o conceito mais importante da lição inteira, então senta que lá
        vem história. Cada item da lista tem uma <strong>posição</strong>, e essa
        posição tem um número. Esse número se chama <strong>índice</strong>.
      </p>

      <p>
        Pra pegar um item, você escreve o nome da lista e, entre colchetes, o
        número da posição. Tipo <code>{"frutas[0]"}</code>. Aí o Python vai lá e
        te entrega aquele item.
      </p>

      <p>
        MAS — e esse &ldquo;mas&rdquo; é gigante, escrito em néon piscando — a
        contagem <strong>começa no ZERO</strong>. Não no um. No{" "}
        <strong>zero</strong>. 😱
      </p>

      <Frase>
        Programador conta nos dedos começando do zero. Sim, é estranho. Sim, você
        vai errar. Todo mundo erra. Faz parte.
      </Frase>

      <p>Então, na nossa lista de frutas, fica assim:</p>

      <CodeBlock
        code={`frutas = ["maçã", "banana", "uva"]
#           ↑0       ↑1        ↑2`}
      />

      <ul>
        <li>
          <code>{"frutas[0]"}</code> → a <strong>primeira</strong> fruta (maçã)
        </li>
        <li>
          <code>{"frutas[1]"}</code> → a <strong>segunda</strong> (banana)
        </li>
        <li>
          <code>{"frutas[2]"}</code> → a <strong>terceira</strong> (uva)
        </li>
      </ul>

      <Terminal
        arquivo="indice.py"
        code={`frutas = ["maçã", "banana", "uva"]

print(frutas[0])
print(frutas[1])
print(frutas[2])`}
        saida={`maçã
banana
uva`}
        velocidade={26}
      />

      <Callout tipo="cuidado" titulo="O ZERO vai te pegar (todo mundo cai uma vez)">
        <p>
          Pra pegar a <strong>primeira</strong> coisa da lista, você usa{" "}
          <code>{"frutas[0]"}</code>, e NÃO <code>{"frutas[1]"}</code>. Eu sei,
          parece errado. Seu cérebro grita &ldquo;primeiro é UM!&rdquo;. Mas em
          Python, primeiro é <strong>ZERO</strong>.
        </p>
        <p>
          Um truque pra lembrar: o índice é &ldquo;quantos passos você anda a
          partir do começo&rdquo;. Pro primeiro item você não anda nada — fica
          parado no <strong>zero</strong>. Pro segundo, anda <strong>um</strong>{" "}
          passo. E por aí vai. 👣
        </p>
      </Callout>

      <H2>Índice negativo: contando de trás pra frente 🔙</H2>

      <p>
        Agora um truque lindo. E se a lista tiver 500 itens e você quiser o{" "}
        <strong>último</strong>? Você ia ter que contar tudo? Que saco. Python
        resolve isso com o <strong>índice negativo</strong>:
      </p>

      <ul>
        <li>
          <code>{"frutas[-1]"}</code> → a <strong>última</strong> fruta
        </li>
        <li>
          <code>{"frutas[-2]"}</code> → a <strong>penúltima</strong>
        </li>
      </ul>

      <Terminal
        arquivo="negativo.py"
        code={`frutas = ["maçã", "banana", "uva"]

print(frutas[-1])
print(frutas[-2])`}
        saida={`uva
banana`}
        velocidade={28}
      />

      <p>
        Pensa no <code>-1</code> como &ldquo;o último da fila&rdquo;. Não importa
        se a lista tem 3 itens ou 3 milhões, <code>{"frutas[-1]"}</code> sempre te
        dá o último. Mão na roda. 🙌
      </p>

      <H2>Mudar um item de lugar ✏️</H2>

      <p>
        Lista não é coisa congelada — você pode <strong>trocar</strong> um item.
        Basta apontar a posição e mandar o novo valor, igual você faz com
        variável:
      </p>

      <Terminal
        arquivo="trocar.py"
        code={`frutas = ["maçã", "banana", "uva"]
frutas[0] = "morango"

print(frutas)`}
        saida={`['morango', 'banana', 'uva']`}
        velocidade={28}
      />

      <p>
        A maçã saiu, o morango entrou no lugar dela (posição 0). O resto da lista
        nem percebeu. 🍓
      </p>

      <H2>Quantos itens tem? len() 📏</H2>

      <p>
        Às vezes você quer saber o <strong>tamanho</strong> da lista, quantas
        coisas tem ali dentro. Pra isso existe o <code>len</code> (de{" "}
        <em>length</em>, &ldquo;comprimento&rdquo; em inglês):
      </p>

      <Terminal
        arquivo="tamanho.py"
        code={`frutas = ["maçã", "banana", "uva"]

print(len(frutas))`}
        saida={`3`}
        velocidade={30}
      />

      <Callout tipo="dica" titulo="O len conta do jeito normal!">
        <p>
          Olha que sacanagem boa: o <code>len</code> conta <strong>começando do
          1</strong>, igual gente normal. A lista tem 3 itens, o{" "}
          <code>len</code> diz 3. Mas os índices vão de 0 a 2. Ou seja: a última
          posição é sempre <code>len - 1</code>. Guarda isso no cantinho da
          cabeça, vai te salvar um dia.
        </p>
      </Callout>

      <H2>Adicionar e remover coisas ➕➖</H2>

      <p>
        Lembra da lista vazia? Pois é, agora a brincadeira começa. Você pode
        jogar coisas dentro da lista a qualquer momento com o{" "}
        <code>.append</code> (que em inglês quer dizer &ldquo;anexar&rdquo;, ou
        seja, &ldquo;grudar no fim&rdquo;):
      </p>

      <Terminal
        arquivo="append.py"
        code={`frutas = ["maçã", "banana", "uva"]
frutas.append("laranja")

print(frutas)`}
        saida={`['maçã', 'banana', 'uva', 'laranja']`}
        velocidade={26}
      />

      <p>
        A laranja entrou no <strong>fim</strong> da fila. Repara na sintaxe: você
        escreve o nome da lista, um <strong>ponto</strong>, a palavra{" "}
        <code>append</code>, e entre <strong>parênteses</strong> a coisa que quer
        adicionar. Esse ponto é tipo dizer &ldquo;ó lista, faz isso aqui pra
        mim&rdquo;.
      </p>

      <p>E pra tirar coisas? Tem dois jeitos comuns:</p>

      <ul>
        <li>
          <code>.remove(&ldquo;uva&rdquo;)</code> → tira o item que você{" "}
          <strong>nomear</strong> (a uva, no caso);
        </li>
        <li>
          <code>.pop()</code> → tira o <strong>último</strong> item da lista
          (sem você precisar dizer qual).
        </li>
      </ul>

      <Terminal
        arquivo="remover.py"
        code={`frutas = ["maçã", "banana", "uva", "laranja"]

frutas.remove("uva")
print(frutas)

frutas.pop()
print(frutas)`}
        saida={`['maçã', 'banana', 'laranja']
['maçã', 'banana']`}
        velocidade={24}
      />

      <p>
        Primeiro o <code>remove</code> tirou a uva pelo nome. Depois o{" "}
        <code>pop</code> chegou e arrancou o último (a laranja), sem dó. Sobrou
        maçã e banana. 🍌
      </p>

      <H2>Vê a lista funcionando 🎬</H2>

      <p>
        Chega de eu falar. Brinca você mesmo: adiciona item, remove item, percorre
        a lista. Mexe à vontade que não quebra nada:
      </p>

      <CenaLista />

      <H2>Checar se uma coisa está na lista 🔍</H2>

      <p>
        Quer saber se um item <strong>existe</strong> na lista? Usa a palavrinha{" "}
        <code>in</code>. Ela responde <code>True</code> (verdadeiro) ou{" "}
        <code>False</code> (falso):
      </p>

      <Terminal
        arquivo="tem.py"
        code={`frutas = ["maçã", "banana", "uva"]

print("maçã" in frutas)
print("abacaxi" in frutas)`}
        saida={`True
False`}
        velocidade={26}
      />

      <p>
        Dá pra ler quase em voz alta: &ldquo;maçã <em>está em</em> frutas?&rdquo;
        → True. &ldquo;abacaxi <em>está em</em> frutas?&rdquo; → False. Isso
        combina lindamente com aquele <code>if</code> que a gente já viu, pra
        decidir coisas. 😎
      </p>

      <H2>Percorrer a lista inteira com for 🔄</H2>

      <p>
        Esse aqui é o casamento perfeito. Lembra do <code>for</code>, que repete
        coisa? Pois ele <strong>adora</strong> lista. Você pode passar item por
        item da lista, fazendo algo com cada um, sem precisar saber quantos são:
      </p>

      <Terminal
        arquivo="percorrer.py"
        code={`frutas = ["maçã", "banana", "uva"]

for fruta in frutas:
    print("Tenho:", fruta)`}
        saida={`Tenho: maçã
Tenho: banana
Tenho: uva`}
        velocidade={26}
      />

      <p>
        Lê assim: &ldquo;<strong>pra cada</strong> fruta <strong>dentro
        de</strong> frutas, faça <code>print</code>&rdquo;. O Python pega a
        primeira fruta, guarda na variável <code>fruta</code>, roda o que tá
        embaixo, depois pega a próxima, e assim por diante até acabar a lista.
        Sozinho. Sem você contar nada. ✨
      </p>

      <Callout tipo="dica" titulo="Aquele espacinho embaixo do for tem que ter">
        <p>
          Reparou que a linha do <code>print</code> tá <strong>afastada pra
          direita</strong>? Aquele espacinho (a famosa{" "}
          <strong>indentação</strong>) é o jeito do Python saber{" "}
          &ldquo;essa linha faz parte do for&rdquo;. Não é enfeite, é
          obrigatório. A gente falou disso na lição do <code>for</code> — agora
          tá vendo ele brilhar de novo. 💡
        </p>
      </Callout>

      <H2>Os errinhos clássicos (evita esses) 🤦</H2>

      <Callout tipo="cuidado" titulo="As armadilhas das listas">
        <p>
          <strong>1. Índice começa no ZERO.</strong> Numa lista de 3 itens, as
          posições válidas são <code>0</code>, <code>1</code> e <code>2</code>.
          Se você pedir <code>{"frutas[3]"}</code> nessa lista, o Python surta e
          grita <code>IndexError: list index out of range</code> (&ldquo;índice
          fora do alcance&rdquo;). Traduzindo: você pediu uma caixinha que não
          existe.
        </p>
        <p>
          <strong>2. Não esquece a vírgula</strong> entre os itens. É{" "}
          <code>[&ldquo;a&rdquo;, &ldquo;b&rdquo;]</code>, não{" "}
          <code>[&ldquo;a&rdquo; &ldquo;b&rdquo;]</code>. Sem a vírgula, o Python
          se perde.
        </p>
        <p>
          <strong>3. O append precisa dos parênteses.</strong> É{" "}
          <code>frutas.append(&ldquo;x&rdquo;)</code> com os{" "}
          <code>( )</code>. Escrever <code>frutas.append</code> sem parênteses
          não faz nada de útil. Os parênteses são onde você entrega a coisa.
        </p>
      </Callout>

      <Frase>
        Domou a lista, domou metade do Python. Quase tudo na programação é
        &ldquo;várias coisas em ordem&rdquo; — e lista é exatamente isso.
      </Frase>

      <H2>Bora praticar 💪</H2>

      <Exercicio
        licao="Listas"
        enunciado="Cria uma lista chamada comidas com as suas 3 comidas favoritas (entre colchetes, separadas por vírgula). Depois imprime na tela só a PRIMEIRA comida da lista. Lembra: a primeira tem índice... zero! 😉"
        criterio={`A resposta esperada é algo como: comidas = ["pizza", "lasanha", "brigadeiro"] seguido de print(comidas[0]). O essencial: (1) criar uma LISTA usando colchetes [ ] com 3 itens de texto separados por vírgula; (2) acessar o PRIMEIRO item com índice 0, ou seja comidas[0] (o nome da variável pode variar). Aceite qualquer nome de variável e quaisquer 3 comidas. Aceite aspas simples ou duplas. ATENÇÃO AO ÍNDICE: o primeiro item é índice 0. Se a pessoa usar comidas[1] achando que é o primeiro, marque como 'quase' e corrija com muito carinho, explicando que em Python a contagem começa no zero, então o primeiro item é [0] e não [1]. Se a pessoa esquecer os colchetes na criação da lista, ou esquecer alguma vírgula, aponte gentilmente. Não exija perfeição de formatação, valorize o entendimento de lista + índice 0.`}
        placeholder={`comidas = ["...", "...", "..."]\nprint(comidas[0])`}
      />

      <Exercicio
        licao="Listas"
        enunciado="Agora pega a sua lista comidas e adiciona uma QUARTA comida nela usando o .append(). No fim, imprime a lista inteira pra ver as 4 comidas. Capricha nos parênteses do append!"
        criterio={`A resposta esperada é algo como: comidas = ["pizza", "lasanha", "brigadeiro"], depois comidas.append("sushi"), depois print(comidas). O essencial: (1) ter uma lista criada com colchetes; (2) usar o método .append() COM PARÊNTESES pra adicionar um item no fim; (3) imprimir a lista inteira com print(comidas). Aceite qualquer nome de variável e quaisquer comidas. Se a pessoa escrever comidas.append sem os parênteses, marque como 'quase' e explique com carinho que o append precisa dos parênteses pra receber o item, ex: comidas.append("sushi"). Se a pessoa usar índice errado ou tentar adicionar de outro jeito estranho, oriente gentilmente pro append. Valorize o entendimento; não seja rígido com a escolha das comidas.`}
        placeholder={`comidas = ["...", "...", "..."]\ncomidas.append("...")\nprint(comidas)`}
      />

      <p>
        Mandou bem! Você já sabe guardar um monte de coisa em ordem, pegar pelo
        índice, adicionar, remover e percorrer tudo. Isso é PODER. 🦾
      </p>

      <p>
        Na próxima a gente conhece a prima mais durona da lista: a{" "}
        <strong>tupla</strong> — uma lista que <em>não muda</em>, trancada a sete
        chaves. Parece chato, mas tem hora que você vai querer exatamente isso.
        Te vejo lá! 🔒
      </p>
    </article>
  );
}
