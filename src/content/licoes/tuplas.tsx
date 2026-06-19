"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaTupla } from "@/components/cenas/lista";

export default function Tuplas() {
  return (
    <article className="leitura">
      <Hero
        emoji="🔒"
        titulo="Tuplas — listas que não mudam"
        subtitulo="Quando você NÃO quer ninguém mexendo nas suas coisas"
      />

      <p>
        Chegamos na última lição do curso! E ela é tranquila, prometo. Se você
        entendeu lista, você já entendeu tupla — porque tupla é{" "}
        <strong>quase igualzinha à lista</strong>. A diferença é UMA só, mas é
        gigante. Bora ver.
      </p>

      <H2>Caderno vs pedra 🪨</H2>

      <p>
        Lembra que a lista é tipo um <strong>caderno</strong>? Você rabisca,
        apaga, escreve por cima, arranca página, cola adesivo. A lista{" "}
        <strong>muda</strong> o quanto você quiser.
      </p>

      <p>
        A tupla é o oposto: ela é tipo uma frase <strong>gravada na
        pedra</strong>. Ou escrita a caneta indelével. Ou um{" "}
        <strong>pacote lacrado</strong> com aquela fita de &ldquo;não
        viole&rdquo;. Depois de criada,{" "}
        <strong>não dá pra mudar nada</strong>. Acabou. Selado. É isso e
        pronto.
      </p>

      <Frase>
        Lista é um caderno: rabisca à vontade. Tupla é uma pedra: tá escrito,
        tá decidido.
      </Frase>

      <p>
        Essa palavra bonita pra &ldquo;não pode mudar&rdquo; é{" "}
        <strong>imutável</strong>. Guarda essa, porque é a única coisa nova de
        verdade na lição inteira.
      </p>

      <CenaTupla />

      <H2>Como criar uma tupla 📦</H2>

      <p>
        Igualzinho à lista, mas trocando os colchetes{" "}
        <code>{"[ ]"}</code> por <strong>parênteses</strong>{" "}
        <code>{"( )"}</code>. Os itens vão separados por vírgula, do mesmo
        jeito:
      </p>

      <Terminal
        arquivo="tupla.py"
        code={`cores = ("vermelho", "verde", "azul")
print(cores)`}
        saida={`('vermelho', 'verde', 'azul')`}
        velocidade={30}
      />

      <p>
        Pronto, nasceu uma tupla com três cores dentro. Repara que ela parece
        muito com a lista — só mudou o formato das &ldquo;paredes&rdquo;:
        parênteses no lugar de colchetes.
      </p>

      <CodeBlock
        code={`lista = ["vermelho", "verde", "azul"]   # colchetes → pode mudar
tupla = ("vermelho", "verde", "azul")   # parênteses → NÃO pode mudar`}
      />

      <H2>Acessar item: funciona igualzinho 🔢</H2>

      <p>
        Aqui é tudo que você já sabe de lista, sem novidade nenhuma. Pra pegar
        um item você usa o <strong>índice</strong> entre colchetes. E olha o
        detalhe que a gente vive repetindo: a contagem{" "}
        <strong>começa no zero</strong>, não no um.
      </p>

      <Terminal
        arquivo="acessar.py"
        code={`cores = ("vermelho", "verde", "azul")

print(cores[0])   # o primeiro
print(cores[1])   # o do meio
print(cores[2])   # o último`}
        saida={`vermelho
verde
azul`}
        velocidade={26}
      />

      <p>
        E o <code>len()</code>, que conta quantos itens tem, também funciona
        certinho na tupla:
      </p>

      <Terminal
        arquivo="tamanho.py"
        code={`cores = ("vermelho", "verde", "azul")
print(len(cores))`}
        saida={`3`}
        velocidade={32}
      />

      <Callout tipo="lembrete" titulo="O zero de novo, sim, de novo">
        <p>
          <code>cores[0]</code> é o <strong>primeiro</strong>,{" "}
          <code>cores[1]</code> é o segundo, e por aí vai. Computador conta a
          partir do zero. Eu sei que é estranho, mas você já tá acostumado das
          listas. 😉
        </p>
      </Callout>

      <H2>O que NÃO funciona (a tal da pedra) 🚫</H2>

      <p>
        Agora a parte importante. Na lista, você trocava um item assim:{" "}
        <code>{"cores[0] = \"rosa\""}</code>. Na tupla, se você tentar a
        MESMA coisa... o Python te dá um <strong>tapa na mão</strong>:
      </p>

      <Terminal
        arquivo="erro.py"
        code={`cores = ("vermelho", "verde", "azul")
cores[0] = "rosa"   # tentando mudar... 😬`}
        saida={`Traceback (most recent call last):
  File "erro.py", line 2, in <module>
    cores[0] = "rosa"
TypeError: 'tuple' object does not support item assignment`}
        velocidade={24}
      />

      <p>
        Esse <code>TypeError</code> aí é o Python falando, com todas as letras:
        &ldquo;<strong>tupla não aceita você trocar item</strong>, esquece&rdquo;.
        A tradução grosseira de{" "}
        <code>{"'tuple' object does not support item assignment"}</code> é
        exatamente isso: tupla não deixa você reatribuir nada. É pedra, lembra?
      </p>

      <p>
        E não adianta tentar pelos outros caminhos também. Aquele{" "}
        <code>.append()</code> que adicionava item na lista?{" "}
        <strong>Não existe em tupla.</strong> Nem ele, nem o{" "}
        <code>.remove()</code>, nem nada que mexa no conteúdo:
      </p>

      <Terminal
        arquivo="append.py"
        code={`cores = ("vermelho", "verde", "azul")
cores.append("rosa")   # tupla não tem isso!`}
        saida={`Traceback (most recent call last):
  File "append.py", line 2, in <module>
    cores.append("rosa")
AttributeError: 'tuple' object has no attribute 'append'`}
        velocidade={24}
      />

      <Callout tipo="cuidado" titulo="Erro não é o fim do mundo">
        <p>
          Se você ver um <code>TypeError</code> ou{" "}
          <code>AttributeError</code> desses, <strong>não entra em
          pânico</strong>. É só o Python avisando &ldquo;ó, aqui é tupla, não
          dá pra mexer&rdquo;. Ou você queria mesmo uma lista (use colchetes),
          ou você tentou mudar algo que era pra ficar quietinho. Respira e
          confere.
        </p>
      </Callout>

      <H2>Mas... por que diabos usar algo que não muda? 🤔</H2>

      <p>
        Boa pergunta! Parece meio inútil à primeira vista. &ldquo;Pra que eu
        quero uma coisa que não posso alterar?&rdquo; Resposta:{" "}
        <strong>às vezes você QUER que não mude</strong>. Sério. Tem dados que
        são pra ficar firmes, e mudar eles sem querer seria um problemão.
      </p>

      <p>Pensa nessas situações:</p>

      <ul>
        <li>
          <strong>Coordenadas</strong> de um ponto no mapa, tipo{" "}
          <code>{"(latitude, longitude)"}</code>. Esses dois andam sempre
          juntos e não faz sentido mexer num só.
        </li>
        <li>
          <strong>Data de nascimento</strong> — dia, mês e ano. Você nasceu uma
          vez só, né? Não é pra ficar mudando. 😅
        </li>
        <li>
          <strong>Dias da semana</strong> — são sempre os mesmos sete, na
          mesma ordem, desde que o mundo é mundo.
        </li>
        <li>
          <strong>Cores de um tema</strong> ou configurações fixas do seu
          programa, que não é pra alguém alterar por acidente.
        </li>
      </ul>

      <p>
        Usar tupla nesses casos é tipo colocar um <strong>cadeado</strong> nos
        dados: te dá segurança de que ninguém (nem você mesmo, distraído às 3 da
        manhã) vai mudar sem querer. E tem bônus: o Python ainda roda um{" "}
        <strong>tiquinho mais rápido</strong> com tupla, porque ele sabe que
        aquilo não vai mudar e não precisa ficar de prontidão. Ganha proteção e
        ganha velocidade. Belê?
      </p>

      <Callout tipo="curiosidade" titulo="Velocidade de brinde">
        <p>
          Como a tupla é &ldquo;congelada&rdquo;, o Python consegue cuidar dela
          de um jeito mais econômico que a lista. A diferença é pequenininha pra
          gente iniciante, mas em programas grandes ela conta. É vantagem de
          graça por usar a ferramenta certa. 🚀
        </p>
      </Callout>

      <H2>O truque mais lindo: desempacotar 🎁</H2>

      <p>
        Esse aqui é meu favorito e você vai usar pra <em>caramba</em>. Chama{" "}
        <strong>desempacotar</strong> (em inglês, <em>unpacking</em>). A ideia é
        abrir o pacote e jogar cada item dentro de uma variável,{" "}
        <strong>tudo de uma vez só</strong>:
      </p>

      <Terminal
        arquivo="unpack.py"
        code={`ponto = (10, 20)
x, y = ponto

print("x vale", x)
print("y vale", y)`}
        saida={`x vale 10
y vale 20`}
        velocidade={26}
      />

      <p>
        Olha que mágica! O <code>10</code> foi pra <code>x</code> e o{" "}
        <code>20</code> foi pra <code>y</code>, automático, na ordem. Sem fazer{" "}
        <code>{"x = ponto[0]"}</code> e <code>{"y = ponto[1]"}</code> na
        unha. Você pode até pular a variável do meio e escrever direto:
      </p>

      <Terminal
        arquivo="unpack2.py"
        code={`x, y = (10, 20)
print(x, y)`}
        saida={`10 20`}
        velocidade={32}
      />

      <p>
        É limpo, é bonito, é rápido. Toda vez que um monte de valores andam
        juntos (coordenadas, dia/mês/ano...), o desempacotar é seu melhor
        amigo.
      </p>

      <H2>Lista x Tupla — o resumão 📋</H2>

      <p>
        Pra não embolar, guarda essa tabelinha mental. É só o que muda entre
        as duas:
      </p>

      <ul>
        <li>
          <strong>Lista:</strong> usa colchetes <code>{"[ ]"}</code> •{" "}
          <strong>muda</strong> à vontade (add, remove, troca) • use quando a
          coleção <em>cresce, encolhe ou se altera</em>. Ex: carrinho de
          compras, lista de tarefas, nomes de uma turma que entra e sai gente.
        </li>
        <li>
          <strong>Tupla:</strong> usa parênteses <code>{"( )"}</code> •{" "}
          <strong>NÃO muda</strong> (é imutável, é pedra) • use quando os dados
          são <em>fixos e andam juntos</em>. Ex: coordenadas, data de
          nascimento, dias da semana, cores de um tema.
        </li>
      </ul>

      <p>
        Regrinha de bolso:{" "}
        <strong>se a coisa vai mudar, use lista. Se não vai (ou não pode),
        use tupla.</strong> Simples assim.
      </p>

      <Callout tipo="cuidado" titulo="As pegadinhas clássicas da tupla">
        <p>
          <strong>1.</strong> Tentar mudar tupla dá erro (<code>TypeError</code>
          ). Já viu, mas vale repetir: pedra não rabisca.
        </p>
        <p>
          <strong>2.</strong> Tupla de <strong>um item só</strong> precisa de
          uma vírgula no fim: <code>{"(5,)"}</code>. Sem a vírgula,{" "}
          <code>{"(5)"}</code> é só o número 5 entre parênteses, NÃO uma tupla.
          Essa pega muita gente!
        </p>
        <p>
          <strong>3.</strong> Não confunda os parênteses da tupla com os do{" "}
          <code>print()</code> ou de uma conta. <code>{"print()"}</code> é
          comando; <code>{"(\"a\", \"b\")"}</code> é tupla. O contexto diz qual
          é qual.
        </p>
      </Callout>

      <Terminal
        arquivo="umitem.py"
        code={`nao_e_tupla = (5)
e_tupla = (5,)

print(type(nao_e_tupla))
print(type(e_tupla))`}
        saida={`<class 'int'>
<class 'tuple'>`}
        velocidade={28}
      />

      <p>
        Viu? Aquela virgulinha solitária faz toda a diferença. Com vírgula é
        tupla; sem vírgula é só um número de chapéu (parênteses). Detalhe
        bobo, erro chato — agora você já tá esperto.
      </p>

      <H2>Hora de fechar com chave de ouro 🥇</H2>

      <p>
        Bora praticar essa última pra cravar a ideia da imutabilidade na
        cabeça:
      </p>

      <Exercicio
        licao="Tuplas — listas que não mudam"
        enunciado="Crie uma tupla chamada semaforo com as 3 cores na ordem: vermelho, amarelo, verde. Depois imprima SÓ a cor do meio (a do amarelo, que tá no índice 1)."
        criterio={`A resposta esperada é algo como:
semaforo = ("vermelho", "amarelo", "verde")
print(semaforo[1])
e a saída deve ser 'amarelo'.

O que avaliar:
- Usou PARÊNTESES pra criar a tupla (não colchetes). Se usou colchetes, é lista, não tupla: aponte com carinho que o exercício pedia tupla, mas valorize se o resto estiver certo.
- As 3 cores estão lá (a ordem ideal é vermelho, amarelo, verde, mas aceite pequenas variações de texto/ordem desde que o item do meio impresso seja o amarelo).
- Imprimiu o índice 1 (o do meio / amarelo). Se a pessoa usou índice 0 ou 2, marque como 'quase' e lembre que a contagem começa no zero, então o do meio é o [1].
Aceite o nome da variável diferente de 'semaforo'. Aspas simples ou duplas, tanto faz. O coração do exercício é: entender que tupla usa () e que o índice [1] pega o item do meio.`}
        placeholder={`semaforo = ("...", "...", "...")
print(semaforo[?])`}
      />

      <Exercicio
        licao="Tuplas — listas que não mudam"
        enunciado="Pergunta de cabeça (sem código!): pra guardar os DIAS DA SEMANA num programa, você usaria uma LISTA ou uma TUPLA? Escreve sua escolha e explique com suas palavras por quê."
        criterio={`Não há uma única resposta 'certa' obrigatória, mas a melhor escolha é TUPLA — porque os dias da semana são fixos, são sempre os mesmos sete, na mesma ordem, e não é pra mudar. Esse é o argumento ideal: dados fixos/que não mudam → tupla (imutabilidade dá proteção).

O que avaliar:
- Valorize MUITO se a pessoa escolheu tupla E justificou com a ideia de que os dias não mudam / são fixos / não é pra alterar. Isso mostra que entendeu a imutabilidade, que é o ponto central da lição.
- Se escolheu lista, NÃO marque como errado de cara: aceite se a justificativa for coerente (ex: 'porque talvez eu queira mexer'), mas gentilmente explique que, como os dias da semana nunca mudam, a tupla é mais adequada e protege os dados.
- O importante é a pessoa demonstrar que entendeu a diferença entre 'muda' (lista) e 'não muda' (tupla). Aceite respostas curtas e informais, sem exigir termos técnicos. Seja caloroso e encorajador.`}
        placeholder={`Eu usaria uma ________ porque ...`}
      />

      <H2>🎉 Você chegou ao fim. PARABÉNS de verdade!</H2>

      <p>
        Para tudo e respira um segundo, porque isso aqui merece comemoração.{" "}
        <strong>Você terminou o curso.</strong> 🎊
      </p>

      <p>
        Pensa no caminho que você fez. Você começou sem saber o que era
        programar — achando que era coisa de gênio com óculos digitando verde.
        E olha só onde chegou. Você aprendeu a:
      </p>

      <ul>
        <li>
          fazer o computador <strong>falar</strong> com o <code>print()</code>;
        </li>
        <li>
          <strong>guardar coisas</strong> em variáveis;
        </li>
        <li>
          lidar com os <strong>tipos</strong> (texto, número, verdadeiro/falso);
        </li>
        <li>
          <strong>comparar</strong> coisas e tomar <strong>decisões</strong>{" "}
          com if/else;
        </li>
        <li>
          <strong>repetir</strong> tarefas com loops sem cansar;
        </li>
        <li>
          organizar um monte de coisas em <strong>listas</strong>;
        </li>
        <li>
          e proteger dados em <strong>tuplas</strong>, fechando agora. 🔒
        </li>
      </ul>

      <Frase>
        Isso não é &ldquo;pouquinho&rdquo;, não. Isso é a BASE inteira da
        programação. Sério.
      </Frase>

      <p>
        Pode parecer pouco porque a gente foi devagarinho, mas escuta: com o que
        você aprendeu aqui, você já consegue entender a lógica de{" "}
        <strong>praticamente qualquer programa do mundo</strong>. As coisas mais
        avançadas são só combinações dessas peças que você já tem na mão. Você
        construiu uma fundação de verdade.
      </p>

      <Callout tipo="dica" titulo="O segredo pra não esquecer? Praticar.">
        <p>
          Programar é igual andar de bicicleta: ninguém aprende só lendo. Cai,
          erra, tenta de novo. Pega esses exemplinhos, muda os valores, quebra
          tudo de propósito pra ver o que acontece. <strong>Erro não é
          fracasso, é aula.</strong> Quanto mais você brinca, mais natural fica.
        </p>
      </Callout>

      <Callout tipo="piada" titulo="Tecnicamente falando...">
        <p>
          Você começou esse curso sem saber dar um <code>print()</code> e
          terminou desempacotando tupla feito gente grande. Se isso não é
          evolução, eu não sei o que é. Agora pode falar pros outros que você{" "}
          <strong>programa em Python</strong> — e dessa vez é verdade. 😎
        </p>
      </Callout>

      <p>
        Muito obrigado por ter chegado até aqui, por cada exercício, por cada
        erro que virou aprendizado. Tenho muito orgulho de você. 💚 Agora vai
        lá, abre um editor, e escreve qualquer bobaginha — só pela alegria de
        ver o computador obedecer você. <strong>Você é programador(a)
        agora.</strong>
      </p>

      <Frase>Nos vemos no próximo código. Boa jornada! 🐍🎉</Frase>
    </article>
  );
}
