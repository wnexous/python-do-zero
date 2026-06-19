"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaIf } from "@/components/cenas/fluxo-if";

export default function Condicionais() {
  return (
    <article className="leitura">
      <Hero
        emoji="🚦"
        titulo="if / elif / else"
        subtitulo="O programa finalmente escolhe o que fazer"
      />

      <p>
        Até agora seu programa era um obediente burrinho: lia tudo de cima pra
        baixo e fazia <em>sempre a mesma coisa</em>, toda vez, sem pensar. A
        partir de hoje ele cresceu. Ele vai começar a <strong>tomar
        decisões</strong>.
      </p>

      <p>
        E decisão é a coisa mais humana do mundo. Você faz isso o dia inteiro
        sem perceber:
      </p>

      <ul>
        <li>
          <strong>SE</strong> tá chovendo, leve o guarda-chuva.
        </li>
        <li>
          <strong>SE</strong> a comida tá pronta, vá comer.
        </li>
        <li>
          <strong>SE</strong> o sinal tá vermelho, pare o carro (por favor).
        </li>
      </ul>

      <p>
        Tá vendo o padrãozinho? Sempre tem um <strong>SE</strong> (uma
        condição) e uma <strong>ação</strong> que só acontece se aquilo for
        verdade. Em Python, esse &ldquo;SE&rdquo; se chama <code>if</code> (que
        é &ldquo;se&rdquo; em inglês, criativo né).
      </p>

      <Frase>
        Programar sem decisão é um trem só de ré. Com <code>if</code>, o
        trem ganha um volante.
      </Frase>

      <H2>Lembra do True e do False? 🎯</H2>

      <p>
        Na lição passada a gente viu que toda comparação vira um{" "}
        <strong>True</strong> (verdadeiro) ou um <strong>False</strong> (falso).
        Tipo <code>{"10 > 3"}</code> vira <code>True</code>, e{" "}
        <code>{"2 > 9"}</code> vira <code>False</code>.
      </p>

      <p>
        Pois é EXATAMENTE isso que o <code>if</code> usa. Ele olha uma
        condição. Se a condição der <strong>True</strong>, ele executa o
        bloco. Se der <strong>False</strong>, ele pula o bloco e nem liga.
        Simples assim:
      </p>

      <Frase>
        O <code>if</code> é um porteiro: se a condição é True, ele te deixa
        entrar. Se é False, te barra na porta.
      </Frase>

      <H2>O if na prática 🚪</H2>

      <p>Olha o primeiro <code>if</code> da sua vida:</p>

      <Terminal
        arquivo="chuva.py"
        code={`chovendo = True

if chovendo:
    print("Leva o guarda-chuva! ☔")`}
        saida={`Leva o guarda-chuva! ☔`}
        velocidade={30}
      />

      <p>
        Funcionou! Como <code>chovendo</code> era <code>True</code>, o porteiro
        deixou passar e o <code>print</code> rodou. Agora repara: se a gente
        trocar pra <code>False</code>, o programa fica calado, porque o
        porteiro barra:
      </p>

      <Terminal
        arquivo="chuva2.py"
        code={`chovendo = False

if chovendo:
    print("Leva o guarda-chuva! ☔")

print("Saí de casa.")`}
        saida={`Saí de casa.`}
        velocidade={28}
      />

      <p>
        Viu? O <code>print</code> do guarda-chuva <strong>nem apareceu</strong>,
        porque a condição era False. Já o &ldquo;Saí de casa&rdquo; apareceu,
        porque ele tá <em>fora</em> do if (já volto nesse detalhe, segura a
        ansiedade).
      </p>

      <H2>Repara nos DOIS PONTOS 👀</H2>

      <p>
        Olha de novo a linha do <code>if</code>. Tem uma coisinha discreta que é{" "}
        <strong>obrigatória</strong> e que todo iniciante esquece:
      </p>

      <CodeBlock code={`if chovendo:`} />

      <p>
        Esse <code>:</code> no final (os dois pontinhos) <strong>não é
        enfeite</strong>. Ele é o jeito do Python falar: &ldquo;ó, agora vem o
        que fazer se isso for verdade&rdquo;. É como o &ldquo;...&rdquo; antes de
        você contar o resto da frase.
      </p>

      <Callout tipo="lembrete" titulo="Decora isso aqui">
        <p>
          Todo <code>if</code> (e <code>elif</code> e <code>else</code>) termina
          com <strong>dois pontos</strong> <code>:</code>. Esqueceu os dois
          pontos? O Python te xinga na hora com um <em>SyntaxError</em>. É o erro
          número 1 da galera. Você foi avisado. 😄
        </p>
      </Callout>

      <H2>A INDENTAÇÃO (preste MUITA atenção aqui) 📏</H2>

      <p>
        Beleza, agora o assunto mais importante da lição. O que mais confunde
        quem tá começando. Respira fundo, que é tranquilo quando cai a ficha.
      </p>

      <p>
        Repara que a linha de dentro do <code>if</code> tem um{" "}
        <strong>espaço em branco no começo</strong>:
      </p>

      <CodeBlock
        code={`if chovendo:
    print("Leva o guarda-chuva! ☔")`}
      />

      <p>
        Esse recuozinho (esses 4 espaços antes do <code>print</code>) se chama{" "}
        <strong>indentação</strong>. E ele <strong>não é frescura, nem
        estética</strong>: é assim que o Python entende o que está{" "}
        <em>dentro</em> do if e o que está <em>fora</em>.
      </p>

      <Frase>
        A indentação é como uma gaveta: o que tá recuado pra dentro{" "}
        <em>pertence</em> ao if. O que tá pra fora, não.
      </Frase>

      <p>
        Pensa numa cômoda. A gaveta &ldquo;if&rdquo; tem coisas{" "}
        <strong>dentro</strong> dela. Pra mostrar que uma coisa tá dentro da
        gaveta, você empurra ela pra dentro — ou seja, dá o recuo. Olha o
        desenho:
      </p>

      <CodeBlock
        code={`if tá com fome:        ← a gaveta (a condição)
    pega o prato       ← dentro da gaveta (recuado)
    serve a comida     ← dentro da gaveta (recuado)
    come tudo          ← dentro da gaveta (recuado)

lava a louça           ← FORA da gaveta (sem recuo)`}
      />

      <p>
        As três linhas recuadas só rodam <strong>se</strong> você tiver fome.
        Já a &ldquo;lava a louça&rdquo; tá colada na margem, sem recuo, então
        ela roda <strong>sempre</strong> — com fome ou sem fome (a louça suja
        não escolhe lado).
      </p>

      <Terminal
        arquivo="idade.py"
        code={`idade = 20

if idade >= 18:
    print("É maior de idade.")
    print("Pode entrar na festa. 🎉")

print("Programa terminou.")`}
        saida={`É maior de idade.
Pode entrar na festa. 🎉
Programa terminou.`}
        velocidade={26}
      />

      <p>
        Os dois <code>print</code> recuados rodaram porque{" "}
        <code>{"20 >= 18"}</code> deu <code>True</code>. O último{" "}
        <code>print</code>, sem recuo, rodou de qualquer jeito. Tá pegando o
        esquema da gaveta? 🗄️
      </p>

      <Callout tipo="cuidado" titulo="Sem o recuo, dá ERRO">
        <p>
          Se você esquecer de indentar a linha de dentro do if, o Python entra
          em pânico e reclama com um <em>IndentationError</em>. Pra ele, um if
          sem nada dentro não faz sentido. Sempre que você puser{" "}
          <code>:</code> e der enter, a próxima linha <strong>precisa</strong>{" "}
          vir empurrada pra dentro.
        </p>
      </Callout>

      <Callout tipo="dica" titulo="Quantos espaços? Use 4 e seja feliz">
        <p>
          O padrão do mundo Python é <strong>4 espaços</strong> de recuo. A boa
          notícia: quase todo editor de código faz isso sozinho quando você
          aperta a tecla <strong>Tab</strong>. Aperta Tab e segue o baile. Só
          não fica misturando espaços com Tabs na bagunça, que o Python é
          chato com isso.
        </p>
      </Callout>

      <H2>E quando NÃO der certo? O else 🔀</H2>

      <p>
        Beleza, o <code>if</code> faz uma coisa quando é True. Mas e quando é
        False? Às vezes a gente quer fazer <strong>outra coisa</strong> no lugar.
        Pra isso existe o <code>else</code> — que é &ldquo;senão&rdquo; em
        inglês.
      </p>

      <p>
        A ideia é: <strong>SE</strong> isso for verdade, faça A.{" "}
        <strong>SENÃO</strong> (quer dizer, se for falso), faça B. Um ou outro,
        nunca os dois:
      </p>

      <Terminal
        arquivo="maioridade.py"
        code={`idade = 15

if idade >= 18:
    print("Pode entrar. 🍻")
else:
    print("Volta quando crescer, pequeno gafanhoto. 🚸")`}
        saida={`Volta quando crescer, pequeno gafanhoto. 🚸`}
        velocidade={26}
      />

      <p>
        Como <code>15</code> não é maior nem igual a <code>18</code>, a
        condição deu <code>False</code>, então o Python pulou o{" "}
        <code>if</code> e foi direto pro <code>else</code>. Repara que o{" "}
        <code>else</code> também tem <strong>dois pontos</strong> e o que tá
        dentro dele também é <strong>indentado</strong>. As mesmas regrinhas
        valem pra ele.
      </p>

      <Callout tipo="curiosidade" titulo="O else não tem condição">
        <p>
          Reparou que o <code>else</code> não tem nenhuma comparação do lado?
          É porque ele é o &ldquo;resto&rdquo;, o &ldquo;em todos os outros
          casos&rdquo;. Ele só entra em cena quando o <code>if</code> falhou. Ou
          seja: ele é o plano B preguiçoso que só age quando o plano A não
          rolou. 😎
        </p>
      </Callout>

      <H2>Brinca com a decisão aí 🎮</H2>

      <p>
        Antes de seguir, dá uma mexida nessa cena pra sentir na pele como o{" "}
        <code>if</code>/<code>else</code> funciona. Clica e vê o caminho mudar:
      </p>

      <CenaIf
        condicao="tá com fome?"
        caminhoSim="🍕 come pizza"
        caminhoNao="😴 vai dormir"
      />

      <p>
        É literalmente isso que acontece dentro do seu programa: uma
        bifurcação. True vai por um lado, False vai pelo outro. Nunca os dois ao
        mesmo tempo.
      </p>

      <H2>Mais de duas opções? Chama o elif 🪜</H2>

      <p>
        Às vezes a vida não é só &ldquo;sim ou não&rdquo;. Tem casos com{" "}
        <strong>várias possibilidades</strong>. Pensa na nota de uma prova: pode
        ser A, B, C ou reprovado. São quatro caminhos! O <code>if</code> sozinho
        não dá conta.
      </p>

      <p>
        Pra isso existe o <code>elif</code>. É a abreviação de{" "}
        <em>&ldquo;else if&rdquo;</em>, ou seja, <strong>&ldquo;senão,
        se&rdquo;</strong>. Você vai testando as condições em cadeia, uma
        embaixo da outra, e o Python para na <strong>primeira que der
        True</strong>:
      </p>

      <Terminal
        arquivo="nota.py"
        code={`nota = 75

if nota >= 90:
    print("Conceito A — show de bola! 🌟")
elif nota >= 70:
    print("Conceito B — mandou bem! 👍")
elif nota >= 50:
    print("Conceito C — passou raspando. 😅")
else:
    print("Reprovado. Bora estudar. 📚")`}
        saida={`Conceito B — mandou bem! 👍`}
        velocidade={24}
      />

      <p>
        Olha o que rolou aqui, passo a passo, que é importante:
      </p>

      <ol>
        <li>
          A nota é <code>75</code>. O Python testa o primeiro:{" "}
          <code>{"75 >= 90"}</code>? Não, é False. Pula.
        </li>
        <li>
          Testa o próximo: <code>{"75 >= 70"}</code>? <strong>Sim!</strong> É
          True. Roda esse bloco e <strong>para tudo</strong>.
        </li>
        <li>
          Os outros <code>elif</code> e o <code>else</code> nem são olhados. O
          Python já achou o caminho dele e foi embora satisfeito.
        </li>
      </ol>

      <Callout tipo="dica" titulo="A ordem dos elif importa!">
        <p>
          Como o Python para no primeiro True, você vai do mais{" "}
          <strong>específico</strong>/exigente pro mais geral. No exemplo da
          nota, a gente testa <code>{">= 90"}</code> antes de{" "}
          <code>{">= 70"}</code>. Se invertesse a ordem, todo mundo cairia no{" "}
          <code>{">= 70"}</code> primeiro e o A nunca apareceria. Pensa na
          escadinha: degrau por degrau, do mais alto pro mais baixo.
        </p>
      </Callout>

      <p>
        Você pode ter quantos <code>elif</code> quiser — um, dois, dez. E o{" "}
        <code>else</code> no final é opcional: ele é o &ldquo;se nada acima
        bateu, faça isso&rdquo;. Tipo o pega-tudo no fim da fila.
      </p>

      <H2>Exemplos do dia a dia 🌎</H2>

      <p>
        Bora ver mais umas situações que você reconhece da vida real, pra
        cimentar a ideia.
      </p>

      <p>
        <strong>Senha certa ou errada</strong> — clássico de toda tela de login:
      </p>

      <Terminal
        arquivo="senha.py"
        code={`senha_digitada = "python123"

if senha_digitada == "python123":
    print("Acesso liberado. Bem-vindo! 🔓")
else:
    print("Senha errada. Tente de novo. 🔒")`}
        saida={`Acesso liberado. Bem-vindo! 🔓`}
        velocidade={26}
      />

      <p>
        Repara que pra <strong>comparar</strong> se a senha é igual, a gente usa{" "}
        <strong>dois iguais</strong> <code>{"=="}</code>. Isso vai ser
        importante daqui a pouco, guarda essa.
      </p>

      <p>
        <strong>Par ou ímpar</strong> — agora um truquezinho esperto. Lembra do{" "}
        <code>%</code> (o resto da divisão) de umas lições atrás? Um número é
        par quando dividido por 2 não sobra resto. Ou seja:{" "}
        <code>{"numero % 2 == 0"}</code>:
      </p>

      <Terminal
        arquivo="parimpar.py"
        code={`numero = 7

if numero % 2 == 0:
    print(numero, "é PAR. 🟢")
else:
    print(numero, "é ÍMPAR. 🔵")`}
        saida={`7 é ÍMPAR. 🔵`}
        velocidade={26}
      />

      <p>
        Como <code>{"7 % 2"}</code> dá resto <code>1</code> (e{" "}
        <code>1</code> não é <code>0</code>), a condição deu False e caiu no{" "}
        <code>else</code>. Sacou? Você acabou de fazer o computador decidir se um
        número é par. Isso é poder. 💪
      </p>

      <Callout tipo="piada" titulo="O computador nunca erra a conta">
        <p>
          Diferente de você na fila do mercado tentando calcular o troco, o{" "}
          <code>%</code> nunca se confunde. Ele faz par ou ímpar de bilhões de
          números antes de você terminar de ler esta frase. E não pede aumento.
        </p>
      </Callout>

      <H2>Os 3 errinhos clássicos 🚨</H2>

      <p>
        Esses três erros vão te pegar pelo menos uma vez na vida. Tudo bem,
        acontece com todo mundo. Mas se você já chegar sabendo, sofre menos:
      </p>

      <Callout tipo="cuidado" titulo="Os três cavaleiros do apocalipse do if">
        <p>
          <strong>1. Esquecer os dois pontos</strong> <code>:</code> no final
          do <code>if</code>/<code>elif</code>/<code>else</code>. Sem eles, o
          Python não entende que vem um bloco e reclama.
        </p>
        <p>
          <strong>2. Errar a indentação.</strong> Esquecer o recuo, ou recuar
          demais, ou misturar. Lembra da gaveta: o que é de dentro fica
          recuado, certinho, com 4 espaços.
        </p>
        <p>
          <strong>3. Usar um igual no lugar de dois.</strong> Pra{" "}
          <em>comparar</em>, é <code>{"=="}</code> (dois iguais). Um igual só,{" "}
          <code>{"="}</code>, serve pra <em>guardar</em> um valor numa variável.
          São coisas diferentes! Na condição, quase sempre você quer{" "}
          <code>{"=="}</code>.
        </p>
      </Callout>

      <p>
        Esse terceiro é traiçoeiro porque parece igual mas não é. Decora o
        bordão:
      </p>

      <Frase>
        Um <code>{"="}</code> guarda. Dois <code>{"=="}</code> comparam.
      </Frase>

      <H2>Juntando tudo num programa só 🧩</H2>

      <p>
        Pra fechar com chave de ouro, um exemplinho que mistura{" "}
        <code>if</code>, <code>elif</code> e <code>else</code> contando a idade
        e dando uma resposta diferente pra cada faixa:
      </p>

      <Terminal
        arquivo="vida.py"
        code={`idade = 8

if idade < 13:
    print("Você é uma criança. 🧒")
elif idade < 18:
    print("Você é adolescente. 🧑")
elif idade < 60:
    print("Você é adulto. 🧓")
else:
    print("Você é da melhor idade. 👴")`}
        saida={`Você é uma criança. 🧒`}
        velocidade={24}
      />

      <p>
        Mexe nesse <code>idade = 8</code> de cabeça: se fosse{" "}
        <code>15</code>, qual frase apareceria? E se fosse <code>40</code>? Tenta
        seguir a escadinha com o dedo, de cima pra baixo, parando no primeiro
        True. Esse é o jeito certo de ler um if. 🪜
      </p>

      <Exercicio
        licao="if / elif / else"
        enunciado="Imagina que já existe uma variável chamada idade com um número dentro. Escreve um if/else que imprime 'Pode entrar' se a idade for 18 ou mais, e 'Não pode' caso contrário. Capricha nos dois pontos e na indentação!"
        criterio={`A resposta esperada é uma estrutura if/else mais ou menos assim:

if idade >= 18:
    print("Pode entrar")
else:
    print("Não pode")

O que importa para considerar CORRETO:
1. Usar 'if' com a condição idade >= 18 (aceite variações equivalentes como idade > 17; mas idade >= 18 é o ideal).
2. Os dois pontos ':' no final da linha do if E na linha do else.
3. Indentação (recuo) nas linhas dos prints dentro do if e do else.
4. Um print para "Pode entrar" no ramo verdadeiro e outro para "Não pode" no ramo falso (aceite variações de texto, maiúsculas/minúsculas, acentos, e aspas simples ou duplas — o sentido é o que vale).

Seja gentil e encorajador. Aceite pequenas variações de texto livremente.
Se a LÓGICA estiver certa mas faltarem os dois pontos ':' OU a indentação estiver errada/ausente, marque como 'quase' e explique com carinho qual detalhe corrigir (lembrando que sem os dois pontos ou sem o recuo o Python dá erro). Se usou '=' em vez de '==' numa comparação, aponte gentilmente — embora aqui a condição use >=, então provavelmente não é o caso.`}
        placeholder={`if idade >= 18:\n    print("Pode entrar")\nelse:\n    print("Não pode")`}
      />

      <p>
        Mandou bem? Então você acabou de dar o passo mais importante da
        programação: fazer o computador <strong>escolher</strong>. A partir de
        agora seus programas têm cérebro. 🧠
      </p>

      <Frase>
        Quem domina o <code>if</code>, domina metade da programação. A outra
        metade vem agora.
      </Frase>

      <p>
        Porque tem uma coisa que o computador faz melhor que qualquer um:{" "}
        <strong>repetir tarefas chatas sem reclamar</strong>, milhares de vezes,
        sem cansar nem pedir café. No <strong>Módulo 4</strong> a gente vai
        aprender o <code>while</code> — o jeito de mandar o computador{" "}
        <em>repetir</em> uma coisa enquanto uma condição for verdade. Spoiler:
        usa <code>if</code> por baixo dos panos. Te vejo lá! 🔁
      </p>
    </article>
  );
}
