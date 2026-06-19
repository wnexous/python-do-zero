"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaComparacao } from "@/components/cenas/comparacao";

export default function Booleanos() {
  return (
    <article className="leitura">
      <Hero
        emoji="⚖️"
        titulo="Verdadeiro ou falso"
        subtitulo="Comparar coisas e os parças: e / ou / não"
      />

      <p>
        Até agora você mandou o computador <strong>falar</strong> e{" "}
        <strong>guardar coisas</strong>. Agora ele vai aprender a fazer uma coisa
        que vai mudar a sua vida: <strong>responder sim ou não</strong>. É a base
        de toda decisão que um programa toma. Bora?
      </p>

      <H2>O mundo do sim/não ⚖️</H2>

      <p>
        Tem um tipo de coisa em Python que é o mais simples do universo: ele só
        pode ser <strong>uma de duas coisas</strong>. Ou é{" "}
        <strong>verdade</strong>, ou é <strong>mentira</strong>. Não tem meio
        termo, não tem &ldquo;talvez&rdquo;, não tem &ldquo;depende&rdquo;.
      </p>

      <p>
        Esses dois valores mágicos se chamam <strong>booleanos</strong> (nome
        chique, ignora). E em Python eles se escrevem assim:
      </p>

      <ul>
        <li>
          <code>True</code> → verdadeiro, sim, ligado, ✅
        </li>
        <li>
          <code>False</code> → falso, não, desligado, ❌
        </li>
      </ul>

      <p>
        Pensa num <strong>interruptor de luz</strong>: ou tá ligado, ou tá
        desligado. Pensa num <strong>botão de sim/não</strong> daquelas
        perguntas chatas de site. É <em>exatamente</em> isso. Dois estados, e
        pronto.
      </p>

      <Frase>
        Booleano é o &ldquo;sim ou não&rdquo; do computador. Sem enrolação, sem
        &ldquo;ah, mais ou menos&rdquo;.
      </Frase>

      <Callout tipo="cuidado" titulo="MAIÚSCULA no T e no F!">
        <p>
          É <code>True</code> e <code>False</code>, com a primeira letra{" "}
          <strong>MAIÚSCULA</strong>. Se você escrever <code>true</code> ou{" "}
          <code>FALSE</code> ou <code>verdadeiro</code>, o Python não entende e
          chora. Decora: <strong>só a primeira letra é grandona</strong>.
        </p>
      </Callout>

      <Terminal
        arquivo="booleano.py"
        code={`ta_chovendo = True
gosto_de_segunda = False

print(ta_chovendo)
print(gosto_de_segunda)`}
        saida={`True
False`}
        velocidade={28}
      />

      <p>
        Viu? Dá pra guardar um booleano numa variável igual qualquer outra
        coisa. Mas o mais legal é que <strong>o computador consegue produzir</strong>{" "}
        esses True e False <em>sozinho</em>, comparando coisas. É aí que a mágica
        acontece. Segura aí.
      </p>

      <H2>Comparando coisas 🔍</H2>

      <p>
        Quando você compara duas coisas, o Python te devolve um{" "}
        <strong>True ou False</strong> como resposta. Tipo perguntar pra ele e ele
        responder na lata. Olha os comparadores:
      </p>

      <ul>
        <li>
          <code>{">"}</code> → maior que. Ex: <code>{"10 > 3"}</code> (dez é maior
          que três? sim!)
        </li>
        <li>
          <code>{"<"}</code> → menor que. Ex: <code>{"2 < 9"}</code>
        </li>
        <li>
          <code>{">="}</code> → maior <strong>ou igual</strong> a
        </li>
        <li>
          <code>{"<="}</code> → menor <strong>ou igual</strong> a
        </li>
        <li>
          <code>{"=="}</code> → <strong>igual a</strong> (presta MUITA atenção
          nesse, já já)
        </li>
        <li>
          <code>{"!="}</code> → <strong>diferente de</strong> (aquele{" "}
          <code>!</code> quer dizer &ldquo;não&rdquo;)
        </li>
      </ul>

      <p>
        Deixa eu te mostrar isso <em>acontecendo</em>. Repara como cada
        comparação vira um True ou um False, dependendo se ela é verdade ou não:
      </p>

      <CenaComparacao
        casos={[
          { a: "10", op: ">", b: "3", resultado: true },
          { a: "5", op: "==", b: "5", resultado: true },
          { a: "2", op: ">", b: "9", resultado: false },
          { a: "7", op: "!=", b: "7", resultado: false },
        ]}
      />

      <p>
        Sacou a lógica? O computador olha a conta, vê se ela bate com a realidade,
        e cospe <code>True</code> se for verdade ou <code>False</code> se for
        mentira. Bora rodar isso pra valer:
      </p>

      <Terminal
        arquivo="comparar.py"
        code={`print(10 > 3)
print(5 == 5)
print(2 > 9)
print(7 != 7)`}
        saida={`True
True
False
False`}
        velocidade={26}
      />

      <p>
        Lê com calma: <code>{"10 > 3"}</code> é verdade, então deu{" "}
        <code>True</code>. <code>{"2 > 9"}</code> é mentira (dois NÃO é maior que
        nove), então deu <code>False</code>. <code>{"7 != 7"}</code> pergunta
        &ldquo;sete é diferente de sete?&rdquo; — claro que não, são iguais, então{" "}
        <code>False</code>. Faz sentido, né?
      </p>

      <Callout tipo="dica" titulo="Lê em voz alta que clareia">
        <p>
          Sempre que bater o olho num comparador, leia ele como uma pergunta:{" "}
          <code>{"idade > 18"}</code> vira &ldquo;a idade é maior que 18?&rdquo;. A
          resposta é sim (True) ou não (False). Pronto, desmistificou.
        </p>
      </Callout>

      <H2>O ERRO Nº 1 DO MUNDO: == vs = 🚨</H2>

      <p>
        Para tudo. Respira. Esse pedaço aqui é o errinho que{" "}
        <strong>TODO mundo</strong> comete — do iniciante ao programador de
        empresa grandona. Eu vou bater na tecla até doer:
      </p>

      <ul>
        <li>
          <code>=</code> (UM sinal de igual) → é o <strong>recebe</strong>. Serve
          pra <em>guardar</em> um valor numa variável. Lembra da lição de
          variáveis? <code>idade = 18</code> quer dizer &ldquo;a caixinha idade
          recebe 18&rdquo;.
        </li>
        <li>
          <code>{"=="}</code> (DOIS sinais de igual) → é o{" "}
          <strong>comparar</strong>. Serve pra <em>perguntar</em> se duas coisas
          são iguais. <code>{"idade == 18"}</code> quer dizer &ldquo;a idade é
          igual a 18?&rdquo;.
        </li>
      </ul>

      <Frase>
        Um sinal <strong>guarda</strong>. Dois sinais <strong>perguntam</strong>.
        Tatua isso no braço.
      </Frase>

      <CodeBlock
        code={`idade = 18      # GUARDA 18 na variável (recebe)
idade == 18     # PERGUNTA se idade é igual a 18 (compara)`}
      />

      <p>
        Olha os dois funcionando na prática, lado a lado, pra nunca mais confundir:
      </p>

      <Terminal
        arquivo="igual.py"
        code={`idade = 18
print(idade == 18)
print(idade == 30)`}
        saida={`True
False`}
        velocidade={28}
      />

      <p>
        Na primeira linha a gente <strong>guardou</strong> 18 com um sinal só.
        Depois a gente <strong>perguntou</strong> com dois sinais: &ldquo;idade é
        igual a 18?&rdquo; (sim, True) e &ldquo;idade é igual a 30?&rdquo; (não,
        False). Dois usos completamente diferentes do mesmo carinha.
      </p>

      <Callout tipo="cuidado" titulo="Esse erro vai te pegar. Prometo.">
        <p>
          Uma hora você vai escrever <code>=</code> querendo perguntar, ou{" "}
          <code>{"=="}</code> querendo guardar, e vai ficar 10 minutos olhando pra
          tela sem entender o erro. Quando isso rolar, lembra do velho conselho:{" "}
          <strong>um guarda, dois perguntam</strong>. Tá tudo bem, acontece com
          todo mundo. 😌
        </p>
      </Callout>

      <H2>Juntando perguntas: e / ou / não 🤝</H2>

      <p>
        Beleza, você já sabe fazer <em>uma</em> pergunta. Mas e quando a vida é
        complicada e você precisa de <strong>várias condições ao mesmo
        tempo</strong>? Pra isso existem três parças muito úteis:{" "}
        <code>and</code>, <code>or</code> e <code>not</code>.
      </p>

      <Callout tipo="lembrete" titulo="Em inglês e minúsculo!">
        <p>
          É <code>and</code>, <code>or</code> e <code>not</code> — em inglês e
          tudo <strong>minúsculo</strong>. Nada de <code>E</code>,{" "}
          <code>OU</code>, <code>NÃO</code> em português. O Python só fala
          inglês nessa parte, fazer o quê.
        </p>
      </Callout>

      <H2>and (E) — precisa das DUAS 🎟️</H2>

      <p>
        O <code>and</code> só dá <code>True</code> quando{" "}
        <strong>as duas condições</strong> são verdade. Se uma falhar, já era,
        deu False.
      </p>

      <p>
        Pensa na <strong>entrada de uma festa</strong>: pra entrar você precisa
        ter ingresso <strong>E</strong> ser maior de idade. Faltou um dos dois?
        Não entra. Os dois? Bem-vindo, pode entrar e pegar o salgadinho.
      </p>

      <Terminal
        arquivo="festa.py"
        code={`tem_ingresso = True
maior_de_idade = True

print(tem_ingresso and maior_de_idade)`}
        saida={`True`}
        velocidade={30}
      />

      <p>
        Os dois são True, então o <code>and</code> deu True: pode entrar. Mas
        olha o que acontece se faltar um:
      </p>

      <Terminal
        arquivo="festa2.py"
        code={`tem_ingresso = True
maior_de_idade = False

print(tem_ingresso and maior_de_idade)`}
        saida={`False`}
        velocidade={30}
      />

      <p>
        Tinha ingresso, mas era de menor. Como o <code>and</code> exige{" "}
        <strong>os dois</strong>, deu <code>False</code>. Sem festa hoje, amigão.
      </p>

      <Callout tipo="dica" titulo="Tabelinha do and (decora a regrinha)">
        <p>
          <code>True and True</code> → <strong>True</strong> ✅<br />
          <code>True and False</code> → False<br />
          <code>False and True</code> → False<br />
          <code>False and False</code> → False<br />
          Resumindo: <strong>só dá True quando OS DOIS são True</strong>.
        </p>
      </Callout>

      <H2>or (OU) — basta UMA 🎉</H2>

      <p>
        O <code>or</code> é o bonzinho. Ele dá <code>True</code> se{" "}
        <strong>pelo menos uma</strong> das condições for verdade. Só dá False se{" "}
        <strong>as duas</strong> forem mentira.
      </p>

      <p>
        Pensa assim: &ldquo;pra ganhar o desconto, você precisa ser estudante{" "}
        <strong>OU</strong> ter mais de 60 anos&rdquo;. Basta encaixar em{" "}
        <em>um</em> dos casos que o desconto é seu.
      </p>

      <Terminal
        arquivo="desconto.py"
        code={`eh_estudante = False
tem_mais_de_60 = True

print(eh_estudante or tem_mais_de_60)`}
        saida={`True`}
        velocidade={30}
      />

      <p>
        Não é estudante, mas tem mais de 60. Como o <code>or</code> só precisa de{" "}
        <strong>uma</strong> verdade, deu <code>True</code>. Desconto liberado! 🤑
      </p>

      <Callout tipo="dica" titulo="Tabelinha do or">
        <p>
          <code>True or True</code> → True<br />
          <code>True or False</code> → True<br />
          <code>False or True</code> → True<br />
          <code>False or False</code> → <strong>False</strong> ❌<br />
          Resumindo: <strong>só dá False quando OS DOIS são False</strong>.
        </p>
      </Callout>

      <H2>not (NÃO) — vira do avesso 🔄</H2>

      <p>
        O <code>not</code> é o rebelde: ele simplesmente{" "}
        <strong>inverte</strong> o valor. O que era True vira False, o que era
        False vira True. É o &ldquo;ô, é o contrário disso aí&rdquo;.
      </p>

      <Terminal
        arquivo="nao.py"
        code={`print(not True)
print(not False)

ta_chovendo = False
print(not ta_chovendo)`}
        saida={`False
True
True`}
        velocidade={28}
      />

      <p>
        <code>not True</code> vira <code>False</code>. <code>not False</code> vira{" "}
        <code>True</code>. E <code>not ta_chovendo</code> (que era False) virou{" "}
        <code>True</code> — ou seja, &ldquo;NÃO tá chovendo&rdquo; é verdade.
        Cabeça de pelourinho, mas você pega o jeito rapidinho. 😄
      </p>

      <H2>Guardando o resultado numa variável 📦</H2>

      <p>
        Aqui mora a sacada que vai te servir pra sempre: você pode pegar o
        resultado de uma comparação e <strong>guardar numa variável</strong>,
        igual qualquer outro valor. Olha que elegante:
      </p>

      <Terminal
        arquivo="maioridade.py"
        code={`idade = 20
maior_de_idade = idade >= 18

print(maior_de_idade)`}
        saida={`True`}
        velocidade={28}
      />

      <p>
        A linha <code>{"maior_de_idade = idade >= 18"}</code> faz duas coisas de
        uma vez: o Python primeiro <strong>responde a pergunta</strong>{" "}
        <code>{"idade >= 18"}</code> (que dá True, porque 20 é maior ou igual a
        18) e depois <strong>guarda</strong> essa resposta na caixinha{" "}
        <code>maior_de_idade</code>. Repara: o <code>=</code> sozinho guarda, e o{" "}
        <code>{">="}</code> compara. Os dois na mesma linha, cada um no seu papel.
      </p>

      <Frase>
        Comparar gera um sim/não. Guardar esse sim/não te deixa usar a resposta
        depois. É assim que programa começa a &ldquo;pensar&rdquo;.
      </Frase>

      <H2>Os errinhos clássicos (chega esperto) 🤦</H2>

      <Callout tipo="cuidado" titulo="A lista dos tropeços">
        <p>
          • Usar <code>=</code> (um) quando queria <code>{"=="}</code> (dois) pra
          comparar. <strong>Um guarda, dois perguntam.</strong> O campeão de erros.
          <br />• Escrever <code>true</code> / <code>false</code> minúsculo. É{" "}
          <code>True</code> e <code>False</code>, com a inicial maiúscula.
          <br />• Usar <code>E</code>, <code>OU</code>, <code>NÃO</code> em
          português. É <code>and</code>, <code>or</code> e <code>not</code>, em
          inglês e minúsculo.
          <br />• Inverter <code>{">="}</code> pra <code>{"=>"}</code>. O certo é
          o sinal de maior/menor PRIMEIRO, o igual DEPOIS: <code>{">="}</code> e{" "}
          <code>{"<="}</code>.
        </p>
      </Callout>

      <Exercicio
        licao="Verdadeiro ou falso"
        enunciado="Imagina que existe uma variável chamada idade. Escreve UMA expressão que seja True quando a pessoa tem 18 anos OU mais (ou seja, é maior de idade). Dica: você vai precisar de um comparador especial que aceita o 'ou igual'."
        criterio={`A resposta esperada é exatamente: idade >= 18 (a variável idade, o operador maior-ou-igual, e o número 18). Aceite variações equivalentes como '18 <= idade'. O ponto CENTRAL é usar o operador >= (maior OU igual) e não apenas > , porque a pessoa de 18 anos exatos também é maior de idade — se o aluno escrever 'idade > 18' marque como 'quase' e explique com carinho que assim quem tem 18 anos crava ficaria de fora, e que o correto é >=. Aceite com ou sem espaços (idade>=18). Se o aluno guardar numa variável, tipo 'maior_de_idade = idade >= 18', também está ótimo. Se o aluno usar = (um sinal só) no lugar de >= ou ==, aponte gentilmente que um sinal só serve pra guardar, não pra comparar. Não exija parênteses nem print.`}
        placeholder={"idade >= ..."}
      />

      <Exercicio
        licao="Verdadeiro ou falso"
        enunciado="Agora junta DUAS condições! Escreve uma expressão que só seja True quando a pessoa tem ingresso E é maior de idade ao mesmo tempo. Considere que existem as variáveis tem_ingresso e maior_de_idade (as duas valem True ou False)."
        criterio={`A resposta esperada é: tem_ingresso and maior_de_idade — ou seja, as duas variáveis ligadas pelo operador 'and' (em inglês e minúsculo). O ponto central é usar 'and' (e NÃO 'or'), porque a festa exige as DUAS condições verdadeiras ao mesmo tempo. Aceite a ordem invertida (maior_de_idade and tem_ingresso). Se o aluno usar 'or', marque como 'quase' e explique que 'or' deixaria entrar quem tem só uma das condições, e que aqui precisamos das duas, então é 'and'. Se o aluno escrever 'E' ou 'AND' em maiúsculo ou em português, aponte gentilmente que é 'and' em inglês e minúsculo. Não exija comparações com == True; usar as variáveis direto está perfeito.`}
        placeholder={"tem_ingresso and ..."}
      />

      <p>
        Mandou bem! Agora você sabe fazer o computador <strong>responder
        perguntas</strong> e <strong>juntar condições</strong>. &ldquo;Mas pra que
        serve isso tudo?&rdquo;, você pergunta. Serve pra <strong>tomar
        decisões</strong>! Na próxima lição a gente usa esses True e False pra
        fazer o programa escolher caminhos: &ldquo;SE isso for verdade, faz aquilo;
        SENÃO, faz outra coisa&rdquo;. É o tão esperado{" "}
        <code>if / elif / else</code>. Aí o brinquedo fica vivo de verdade. Bora! 🚦
      </p>
    </article>
  );
}
