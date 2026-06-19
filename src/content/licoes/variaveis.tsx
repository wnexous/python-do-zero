"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaVariavel, Caixa } from "@/components/cenas/caixa-variavel";

export default function Variaveis() {
  return (
    <article className="leitura">
      <Hero
        emoji="📦"
        titulo="Variáveis — caixinhas com etiqueta"
        subtitulo="Guardar coisas pra usar depois sem ter que decorar nada"
      />

      <p>
        Até agora você mandou o computador <strong>falar</strong> com o{" "}
        <code>print</code>. Show. Mas tem um problema: tudo que você escreveu
        ficou <em>solto</em>, jogado dentro do print. Se você precisar do mesmo
        texto de novo lá na frente, tem que escrever tudo outra vez. Que saco,
        né?
      </p>

      <p>
        É aí que entra a estrela de hoje: a <strong>variável</strong>. E calma
        com esse nome chique de matemática — não tem nada de assustador aqui.
      </p>

      <Frase>
        Variável é só uma <strong>caixinha com etiqueta</strong> onde você guarda
        uma coisa pra usar depois.
      </Frase>

      <H2>A famosa caixinha 📦</H2>

      <p>
        Imagina uma caixa de sapato vazia. Você pega uma coisa — um número, um
        nome, qualquer treco — e <strong>coloca dentro</strong>. Depois cola uma{" "}
        <strong>etiqueta</strong> na caixa pra saber o que tem lá dentro sem
        precisar abrir.
      </p>

      <p>Em Python a caixinha fica assim:</p>

      <Caixa nome="nome" valor="André" cor="sky" />

      <p>
        A <strong>etiqueta</strong> é <code>nome</code>. Lá <strong>dentro</strong>{" "}
        da caixa tá guardado o texto <code>&ldquo;André&rdquo;</code>. Pronto, é
        isso. Quando você quiser esse valor de novo, é só chamar pela etiqueta —
        não precisa decorar nem reescrever. A caixa lembra por você. 🧠
      </p>

      <Callout tipo="dica" titulo="Por que isso é tão bom?">
        <p>
          Porque você guarda uma vez e usa <strong>mil vezes</strong>. E se o
          valor mudar (tipo a idade da pessoa no aniversário), você troca só{" "}
          <em>dentro da caixa</em> e o resto do programa todo já pega o valor novo
          sozinho. Preguiça inteligente, do jeito que a gente gosta.
        </p>
      </Callout>

      <H2>Criando uma caixinha 🛠️</H2>

      <p>Pra criar uma variável, a receita é sempre essa:</p>

      <CodeBlock code={`etiqueta = valor`} />

      <p>
        Você escreve o <strong>nome</strong> (a etiqueta), um sinal de{" "}
        <code>=</code>, e o <strong>valor</strong> que vai pra dentro da caixa. Na
        prática:
      </p>

      <Terminal
        arquivo="caixinhas.py"
        code={`nome = "André"
idade = 27`}
        saida={``}
        velocidade={40}
      />

      <p>
        Rodou e não apareceu nada na tela? <strong>Tá certíssimo!</strong> Criar
        uma variável é silencioso — você só <em>guardou</em> as coisas nas caixas.
        Ninguém mandou mostrar nada ainda. Guardar não é falar.
      </p>

      <p>
        Agora vem a parte legal: usar a caixa depois. Você joga a etiqueta dentro
        do <code>print</code> (<strong>sem aspas!</strong>) e o Python troca pela
        coisa que tá guardada lá dentro:
      </p>

      <Terminal
        arquivo="usando.py"
        code={`nome = "André"
idade = 27

print(nome)
print(idade)`}
        saida={`André
27`}
        velocidade={28}
      />

      <Callout tipo="cuidado" titulo="Etiqueta NÃO leva aspas">
        <p>
          Olha a diferença: <code>print(&ldquo;nome&rdquo;)</code> com aspas
          mostra a palavra <strong>nome</strong> crua. Já{" "}
          <code>print(nome)</code> sem aspas mostra <strong>o que tá guardado na
          caixa</strong> chamada nome (no caso, André). Aspas = texto literal. Sem
          aspas = a etiqueta da caixinha. Essa pega muita gente!
        </p>
      </Callout>

      <H2>O segredo do sinal &ldquo;=&rdquo; 🤫</H2>

      <p>
        Agora presta atenção que isso aqui é <strong>o ponto mais confuso</strong>{" "}
        pra quem tá começando. Olha de novo:
      </p>

      <CodeBlock code={`idade = 27`} />

      <p>
        Na escola, o sinal <code>=</code> queria dizer &ldquo;é igual a&rdquo;. Na
        programação <strong>esquece isso</strong>. Aqui o <code>=</code> não é
        &ldquo;igual&rdquo; — ele quer dizer <strong>&ldquo;recebe&rdquo;</strong>{" "}
        ou <strong>&ldquo;guarda&rdquo;</strong>.
      </p>

      <Frase>
        <code>idade = 27</code> lê-se &ldquo;<strong>idade recebe 27</strong>
        &rdquo;. Não é &ldquo;idade é igual a 27&rdquo;.
      </Frase>

      <p>
        Pensa numa seta apontando da direita pra esquerda: o <strong>27</strong>{" "}
        (da direita) entra na caixa <strong>idade</strong> (da esquerda). O valor
        viaja da direita pra dentro da etiqueta da esquerda. Sempre nessa direção.
      </p>

      <Callout tipo="curiosidade" titulo="Por que isso importa?">
        <p>
          Porque por causa disso uma coisa que parece sem sentido na matemática
          fica <strong>normal</strong> na programação:{" "}
          <code>{"idade = idade + 1"}</code>. Em matemática isso seria impossível
          (um número igual a ele mesmo mais um?!). Mas lendo como{" "}
          &ldquo;recebe&rdquo;, vira: &ldquo;a idade <strong>recebe</strong> o que
          ela tinha, mais 1&rdquo;. Ou seja: faz aniversário. 🎂 Faz total
          sentido!
        </p>
      </Callout>

      <H2>A caixa pode trocar de conteúdo 🔄</H2>

      <p>
        Uma caixa não é pra sempre. Você pode <strong>esvaziar e botar outra
        coisa</strong> dentro quando quiser. Quando você guarda um valor novo na
        mesma etiqueta, o valor velho <strong>some</strong> e o novo entra no
        lugar. Isso se chama <strong>reatribuição</strong> (nome feio, ideia
        simples).
      </p>

      <p>Olha a caixinha <code>idade</code> trocando de valor, ao vivo:</p>

      <CenaVariavel nome="idade" passos={["27", "28", "100"]} cor="primary" />

      <p>
        Cada vez que um valor novo entra, o anterior é jogado fora. A caixa só
        guarda <strong>uma coisa de cada vez</strong>. No código fica assim:
      </p>

      <Terminal
        arquivo="trocando.py"
        code={`idade = 27
print(idade)

idade = 28
print(idade)`}
        saida={`27
28`}
        velocidade={28}
      />

      <p>
        Reparou? O primeiro <code>print</code> mostrou <strong>27</strong>, porque
        naquele momento era isso que tava na caixa. Aí a gente trocou pra 28, e o
        segundo <code>print</code> já mostrou o valor novo. O computador lê de cima
        pra baixo, lembra? Então <strong>a ordem importa</strong>: ele mostra o que
        estiver na caixa <em>naquele instante</em>.
      </p>

      <Callout tipo="piada" titulo="A caixa é meio amnésica">
        <p>
          Botou valor novo? O velho <strong>já era</strong>, foi pro além. A caixa
          não guarda histórico, não tem memória afetiva, não chora pelo ex-valor.
          Ela só segura o que tá lá <em>agora</em>. Cruel, porém prática.
        </p>
      </Callout>

      <H2>Variável guarda qualquer coisa 🎁</H2>

      <p>
        A caixinha não é exigente. Ela guarda <strong>texto</strong>, guarda{" "}
        <strong>número inteiro</strong>, guarda <strong>número com vírgula</strong>
        , guarda quase tudo. Olha esse monte de caixas diferentes:
      </p>

      <Terminal
        arquivo="varios.py"
        code={`nome = "Maria"
idade = 30
altura = 1.65
cidade = "Recife"

print(nome)
print(idade)
print(altura)
print(cidade)`}
        saida={`Maria
30
1.65
Recife`}
        velocidade={24}
      />

      <p>
        Repara de novo numa coisa que você já viu na lição do print:{" "}
        <strong>texto vai entre aspas</strong> (<code>&ldquo;Maria&rdquo;</code>,{" "}
        <code>&ldquo;Recife&rdquo;</code>) e <strong>número vai pelado</strong>,
        sem aspas (<code>30</code>, <code>1.65</code>). Isso é regra de Python, não
        é frescura — e a gente vai aprofundar isso na próxima lição.
      </p>

      <H2>Como nomear sua caixinha (as regras) 🏷️</H2>

      <p>
        Você é quem escolhe a etiqueta. Mas tem algumas regrinhas pra o Python não
        surtar — e uns conselhos pra você não se odiar depois:
      </p>

      <ul>
        <li>
          <strong>Sem espaço no nome.</strong> Nada de{" "}
          <code>nome do aluno</code>. Use o famoso{" "}
          <strong>snake_case</strong>: grude as palavras com <code>_</code>, tipo{" "}
          <code>nome_do_aluno</code>. (Chama snake_case porque parece uma cobrinha
          rastejando, sacou? 🐍)
        </li>
        <li>
          <strong>Não pode começar com número.</strong> <code>2nome</code> é
          proibido. Mas <code>nome2</code> pode, número no meio ou no fim é de boa.
        </li>
        <li>
          <strong>Maiúscula é diferente de minúscula.</strong> Pra o Python,{" "}
          <code>nome</code>, <code>Nome</code> e <code>NOME</code> são{" "}
          <strong>três caixas diferentes</strong>. Se você guardar numa e chamar
          outra, ele não acha.
        </li>
        <li>
          <strong>Use nomes que façam sentido.</strong> Não chame de{" "}
          <code>x</code> ou <code>a1</code>. Chame de <code>idade</code>,{" "}
          <code>preco_total</code>, <code>nome_do_cachorro</code>. Daqui a uma
          semana você lê o código e entende na hora.
        </li>
      </ul>

      <Terminal
        arquivo="nomes.py"
        code={`nome_do_aluno = "Joana"
idade_em_anos = 19
preco_total = 49.90

print(nome_do_aluno, idade_em_anos, preco_total)`}
        saida={`Joana 19 49.9`}
        velocidade={26}
      />

      <Callout tipo="dica" titulo="Nome bom é presente pro seu eu do futuro">
        <p>
          Ninguém lembra o que era a variável <code>x</code> três dias depois.
          Mas <code>total_da_compra</code> se explica sozinho. Escrever um
          nomezinho a mais agora economiza dor de cabeça depois. O seu eu do futuro
          agradece (e ele já tem problema demais, coitado).
        </p>
      </Callout>

      <H2>Juntando as caixinhas no print 🎤</H2>

      <p>
        A graça de verdade aparece quando você usa <strong>várias variáveis
        juntas</strong>. Lembra que dá pra mostrar várias coisas no mesmo print
        separando por vírgula? Pois é, funciona com caixinha também:
      </p>

      <Terminal
        arquivo="juntando.py"
        code={`nome = "André"
idade = 27

print("Oi, eu sou o", nome, "e tenho", idade, "anos")`}
        saida={`Oi, eu sou o André e tenho 27 anos`}
        velocidade={24}
      />

      <p>
        Bonito, né? O texto entre aspas o Python mostra do jeitinho que tá. As
        etiquetas <code>nome</code> e <code>idade</code> (sem aspas) ele troca pelo
        conteúdo das caixas. E o melhor: se a idade mudar, é só trocar dentro da
        caixa que essa frase se atualiza sozinha.
      </p>

      <p>
        Existe um jeito ainda mais elegante de costurar variável no meio do texto,
        chamado <strong>f-string</strong>. Dá uma espiadinha rápida:
      </p>

      <Terminal
        arquivo="fstring.py"
        code={`nome = "André"

print(f"Oi, {nome}!")`}
        saida={`Oi, André!`}
        velocidade={36}
      />

      <p>
        Aquele <code>f</code> antes das aspas é meio mágico: ele deixa você botar a
        etiqueta da caixa <strong>dentro</strong> do texto, entre chaves, e o
        Python troca pelo valor. <strong>Não esquenta agora</strong> com os
        detalhes — tem uma lição inteirinha só pra f-string mais pra frente. Por
        enquanto só saiba que existe e que é uma fofura.
      </p>

      <H2>Os errinhos que TODO mundo comete 🤦</H2>

      <p>Os clássicos das variáveis, pra você já chegar esperto na fila:</p>

      <Callout tipo="cuidado" titulo="A trinca dos erros clássicos">
        <p>
          <strong>1. Esquecer as aspas no texto.</strong> Escrever{" "}
          <code>nome = André</code> sem aspas. Aí o Python pensa que André é outra
          caixa (que não existe) e <strong>dá erro</strong>. Texto{" "}
          <strong>sempre</strong> entre aspas: <code>nome = &ldquo;André&rdquo;</code>.
        </p>
        <p>
          <strong>2. Pôr espaço no nome da caixa.</strong>{" "}
          <code>nome do aluno = ...</code> não rola. Cola as palavras com{" "}
          underline: <code>nome_do_aluno</code>.
        </p>
        <p>
          <strong>3. Achar que <code>=</code> é &ldquo;igual&rdquo;.</strong> Não
          é! É <strong>&ldquo;recebe&rdquo;</strong>. O valor da direita entra na
          caixa da esquerda. Decora essa: caixa da esquerda{" "}
          <em>recebe</em> o que vem da direita.
        </p>
      </Callout>

      <Callout tipo="lembrete" titulo="Resumindo numa frase">
        <p>
          Variável é <strong>caixinha com etiqueta</strong>, o <code>=</code> quer
          dizer <strong>&ldquo;recebe&rdquo;</strong>, e você usa a etiqueta{" "}
          <strong>sem aspas</strong> pra pegar o que tá guardado. Se gravou isso,
          gravou a lição inteira. 👏
        </p>
      </Callout>

      <H2>Hora de pôr a mão na massa ✍️</H2>

      <p>
        Bora praticar. Cria duas caixinhas e mostra as duas na tela. Tranquilo,
        você já tem tudo que precisa:
      </p>

      <Exercicio
        licao="Variáveis"
        enunciado="Cria uma variável com o SEU nome e outra com a SUA idade. Depois dá um print mostrando as duas usando essas variáveis (não vale escrever o nome e a idade direto dentro do print — tem que ser pelas caixinhas!)."
        criterio={`O aluno deve (1) criar uma variável de texto com um nome, algo como nome = "Maria" (texto entre aspas), (2) criar uma variável de número com a idade, algo como idade = 30 (número sem aspas), e (3) usar essas DUAS variáveis dentro de um print. Exemplos válidos: print(nome, idade) — ou — print(nome, "tem", idade, "anos") — ou com f-string: print(f"{nome} tem {idade} anos"). O ESSENCIAL é que o print use as VARIÁVEIS (sem aspas, pela etiqueta), e não texto cru digitado direto no print. Aceite qualquer nome e qualquer idade. Aceite aspas simples ou duplas no texto. Aceite a idade entre aspas como texto se o aluno fez isso (ex: idade = "30"), não é o ideal mas não está errado pro nível dele — comente com carinho que número costuma ir sem aspas. Se o aluno escreveu print("Maria", "30") com tudo cru, sem criar variável nenhuma, marque como 'quase' e explique gentilmente que o objetivo era usar as caixinhas (variáveis), não digitar tudo dentro do print. Se faltar aspas no texto do nome (nome = Maria) aponte que texto vai entre aspas. Seja gentil e encorajador.`}
        placeholder={'nome = "..."\nidade = ...\nprint(nome, idade)'}
      />

      <Callout tipo="dica" titulo="Travou? Respira.">
        <p>
          Lembra da receita: <code>etiqueta = valor</code>. Primeiro cria as duas
          caixas, uma embaixo da outra. Depois, na última linha, chama as duas
          etiquetas dentro de um <code>print</code>, sem aspas, separadas por
          vírgula. É isso. Você consegue. 💪
        </p>
      </Callout>

      <Frase>
        Agora você não só faz o computador falar — você faz ele <strong>lembrar
        das coisas por você</strong>.
      </Frase>

      <p>
        Maravilha! Você acabou de aprender a guardar informação, que é metade de
        tudo em programação. Mas ó, você reparou que umas caixas levam aspas e
        outras não? Que o <code>27</code> é diferente do <code>&ldquo;27&rdquo;</code>?
        Isso não é à toa. Na próxima lição a gente descobre que existem{" "}
        <strong>tipos de coisas</strong> diferentes — texto, número, e até um tal
        de verdadeiro/falso. É onde tudo começa a fazer sentido de vez. Vira a
        página! 👇
      </p>
    </article>
  );
}
