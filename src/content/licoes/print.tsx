"use client";

import { Hero, H2, Frase } from "@/components/prose";
import { Terminal } from "@/components/code/terminal";
import { CodeBlock } from "@/components/code/code-block";
import { Callout } from "@/components/callout";
import { Exercicio } from "@/components/exercicio";
import { CenaPrint } from "@/components/cenas/tipos-print";

export default function Print() {
  return (
    <article className="leitura">
      <Hero
        emoji="🗣️"
        titulo="print() — fazer o PC falar"
        subtitulo="Sua primeira mágica de verdade: a tela escreve o que você mandar"
      />

      <p>
        Essa é a ordem mais usada do mundo inteiro quando se tá aprendendo. O{" "}
        <code>print</code> serve pra uma coisa só: <strong>mostrar algo na
        tela</strong>. É o computador <em>falando</em> com você.
      </p>

      <p>Olha só como é simples:</p>

      <Terminal
        arquivo="oi.py"
        code={`print("Oi, tudo bem?")`}
        saida={`Oi, tudo bem?`}
        velocidade={45}
      />

      <p>
        Você escreve <code>print</code>, abre parênteses, põe o texto entre aspas,
        fecha parênteses. O computador pega o que tá lá dentro e cospe na tela.
        <strong> Magia pura.</strong>
      </p>

      <CenaPrint
        exemplos={["Oi, tudo bem?", "Eu mandei isso aqui", "Python é molezinha 😎"]}
      />

      <H2>Anatomia desse troço 🔬</H2>

      <p>
        Vamos abrir o <code>print</code> e ver as tripas. São só 3 partes:
      </p>

      <CodeBlock code={`print("Oi, tudo bem?")`} />

      <ul>
        <li>
          <code>print</code> → o <strong>nome do comando</strong>. É a ordem
          &ldquo;ó, mostra isso na tela&rdquo;.
        </li>
        <li>
          <code>( )</code> → os <strong>parênteses</strong>. É onde você coloca o
          que quer mostrar. Sempre vêm logo depois do nome, colados.
        </li>
        <li>
          <code>&ldquo; &rdquo;</code> → as <strong>aspas</strong>. Tudo que é
          texto em Python <strong>tem que ir entre aspas</strong>. Sem aspas, o
          computador se perde.
        </li>
      </ul>

      <Callout tipo="cuidado" titulo="As aspas não são frescura">
        <p>
          Texto <strong>sempre</strong> entre aspas. Pode ser aspas duplas{" "}
          <code>&ldquo;assim&rdquo;</code> ou simples{" "}
          <code>&lsquo;assim&rsquo;</code>, tanto faz — mas tem que ter. Se você
          esquecer, o Python acha que você tá falando de outra coisa e dá erro.
          Guarda isso: <strong>texto = aspas</strong>.
        </p>
      </Callout>

      <H2>Dá pra falar várias coisas 🎤</H2>

      <p>
        Pode usar quantos <code>print</code> você quiser, um embaixo do outro.
        Cada um vira uma linha nova na tela:
      </p>

      <Terminal
        arquivo="lista.py"
        code={`print("Comprar:")
print("- arroz")
print("- feijão")
print("- cerveja 🍺")`}
        saida={`Comprar:
- arroz
- feijão
- cerveja 🍺`}
        velocidade={26}
      />

      <p>
        E se você quiser, dá pra mostrar <strong>várias coisas no mesmo
        print</strong>, separando por vírgula. O Python põe um espacinho entre
        elas sozinho:
      </p>

      <Terminal
        arquivo="virgula.py"
        code={`print("Meu nome é", "André", "e eu tenho", 27, "anos")`}
        saida={`Meu nome é André e eu tenho 27 anos`}
        velocidade={24}
      />

      <Callout tipo="curiosidade" titulo="Reparou no 27 sem aspas?">
        <p>
          Isso porque <strong>número não precisa de aspas</strong>! Texto precisa,
          número não. A gente vai falar disso direitinho na lição de{" "}
          <em>tipos de coisas</em>. Por enquanto: texto = aspas, número = pelado.
          😅
        </p>
      </Callout>

      <H2>O print vazio 🫥</H2>

      <p>
        Um truque bobo mas útil: <code>print()</code> sozinho, sem nada dentro,
        pula uma linha em branco. Serve pra dar uma respirada no meio do texto:
      </p>

      <Terminal
        arquivo="espaco.py"
        code={`print("linha de cima")
print()
print("linha de baixo")`}
        saida={`linha de cima

linha de baixo`}
        velocidade={28}
      />

      <Frase>
        Se você entendeu o print, você entendeu como mandar o computador te
        responder. O resto é detalhe.
      </Frase>

      <H2>Os errinhos que TODO mundo comete 🤦</H2>

      <p>Pra você já chegar esperto, os clássicos:</p>

      <ul>
        <li>
          Esquecer de fechar os parênteses ou as aspas. Abriu, <strong>fecha</strong>.
        </li>
        <li>
          Escrever <code>Print</code> ou <code>PRINT</code> com letra maiúscula.
          Python <strong>liga pra maiúscula/minúscula</strong>. É{" "}
          <code>print</code>, tudo minúsculo.
        </li>
        <li>
          Esquecer as aspas no texto. De novo: <strong>texto = aspas</strong> (eu
          vou repetir isso até você sonhar com aspas).
        </li>
      </ul>

      <Exercicio
        licao="print()"
        enunciado="Escreve uma linha de código que mostra na tela a frase: Eu vou aprender Python! (com a exclamação no final). Capricha nas aspas e nos parênteses."
        criterio={`A resposta certa é algo como: print("Eu vou aprender Python!") — o importante é: usar print, abrir e fechar parênteses, e colocar o texto entre aspas (simples ou duplas). A frase deve ser 'Eu vou aprender Python!'. Aceite pequenas variações de texto, mas exija a estrutura print("...") correta. Se faltar aspas ou parênteses, marque como 'quase' e aponte com carinho.`}
        placeholder={`print("...")`}
      />

      <p>
        Boa! Agora você já faz o computador falar. Na próxima lição a coisa fica
        séria de verdade: a gente vai aprender a <strong>guardar coisas</strong>{" "}
        em umas tais de <em>variáveis</em>. Vai por mim, é onde o brinquedo começa
        a ficar divertido. 🎁
      </p>
    </article>
  );
}
