// js/data/psc1_mat.js — Questões de Matemática PSC 1ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/PSC/1/2023/questions/q1.png",
//                                        ← caminho da imagem (ou null se não houver)
//    "alt": {
//      "A": "",
//      "B": "",
//      "C": "",
//      "D": "",
//      "E": ""
//    }
//  },
//
//  ORGANIZAÇÃO: os dados de 2023, 2024 e 2025 ficam juntos neste arquivo.
//  Cada ano tem seu próprio bloco de questões, gabarito e assuntos.
//
//  IMAGENS:
//    - Salve em: assets/documents/PSC/<ano>/<etapa>/questions/<questao>
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const PSC1_MAT = {
  prova: 'PSC 1ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 8,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "E" ,      "2": "A" ,      "3": "C" ,      "4": "E" ,      "5": "C" ,
        "6": "A" ,      "7": "A" ,      "8": "D"
    },
    "2024": {
        "1": "B" ,      "2": "A" ,      "3": "C" ,      "4": "E" ,      "5": "D" ,
        "6": "E" ,      "7": "A" ,      "8": "D"
    },
    "2025": {
        "1": "B" ,      "2": "A" ,      "3": "E" ,      "4": "C" ,      "5": "C" ,
        "6": "A" ,      "7": "B" ,      "8": "D"
    }
  },

  // ── ASSUNTOS (por ano) ──────────────────────────────────────
  assuntos: {
    "2023": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": ""
    },
    "2024": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": ""
    },
    "2025": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": ""
    }
  },

  // ── QUESTÕES (por ano) ──────────────────────────────────────
  questoes: {
    "2023": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Considere o gráfico a seguir:\nA lei que melhor representa a função afim 𝑦 = 𝑓(𝑥) do gráfico é dada por:",
      "img": "assets/documents/PSC/2023/1-ETAPA/questions/q47.png",
      "alt": {
        "A": "f(x) = 12 - 4x",
        "B": "f(x) = 12 - 2x",
        "C": "f(x) = 12 + 6x",
        "D": "f(x) = 12 + 12x",
        "E": "f(x) = 12 - 6x"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Os triângulos 𝐴𝐵𝐶 e 𝑃𝑄𝑅 são congruentes. O perímetro do triângulo 𝑃𝑄𝑅 é igual a 77 𝑐𝑚. Os lados do triângulo 𝐴𝐵𝐶 medem, respectivamente, 𝑥 + 7,3𝑥 +6 e 4𝑥. Logo, o valor de 𝑥 é igual a:",
      "img": null,
      "alt": {
        "A": "8",
        "B": "9",
        "C": "10",
        "D": "12",
        "E": "13"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Um estudante tem, em sua residência, internet com velocidade de 20 𝑀𝐵⁄𝑠. Ele precisa fazer o download de uma coletânea de exercícios, cujo arquivo zipado tem 1,5 𝐺𝐵. Considerando que 1 𝐺𝐵 = 1024 𝑀𝐵, podemos afirmar que o intervalo de tempo necessário para que o arquivo zipado seja completamente baixado, caso a velocidade da internet se mantenha constante, será de:",
      "img": null,
      "alt": {
        "A": "65,0 s",
        "B": "75,0 s",
        "C": "76,8 s",
        "D": "80,8 s",
        "E": "90,8 s"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Considere a função 𝑓: ℝ → ℝ, definida por:\n𝑓(𝑥) = 𝑥2 −6𝑥 + 4O\nO menor valor que a função pode assumir é:",
      "img": null,
      "alt": {
        "A": "-6",
        "B": "-7",
        "C": "-3",
        "D": "-4",
        "E": "-5"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Ana planeja fazer um empréstimo de 𝑅$ 45.000,00para reforma de sua loja de conveniência. Ela decidiu utilizar o sistema de amortização constante (SAC),calculado pela razão entre o capital contratado e a quantidade de parcelas. Ela pretende saldar a dívida em 4 anos. Nesse caso, o valor amortizado em cada parcela mensal será de:",
      "img": null,
      "alt": {
        "A": "𝑅$ 837,50",
        "B": "𝑅$ 737,50.",
        "C": "𝑅$ 937,50",
        "D": "𝑅$ 1.152,50",
        "E": "𝑅$ 1.300,50"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "A pontuação final para determinado Processo Seletivo é dada pela média ponderada dos pontos da prova de Conhecimentos Gerais, com peso 2, e dos pontos da prova de Conhecimentos Específicos, com peso 3. Considerando que determinado candidato obteve 175 pontos na prova de Conhecimentos Gerais e 155 pontos na prova de Conhecimentos Específicos, podemos afirmar que sua pontuação final foi de:",
      "img": null,
      "alt": {
        "A": "163 pontos",
        "B": "170 pontos",
        "C": "280 pontos",
        "D": "300,5 pontos",
        "E": "407,5 pontos"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "A quantidade de anagramas da palavra DEFESA que começam e terminam em vogal, é:\nQuestão anulada. Selecione a alternativa A",
      "img": null,
      "alt": {
        "A": "120",
        "B": "144",
        "C": "288",
        "D": "600",
        "E": "720"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "A quantidade de números, com três algarismos distintos, que podemos formar com os algarismos 1, 2, 3, 4, 5, 6 e 8, é:",
      "img": null,
      "alt": {
        "A": "105",
        "B": "330",
        "C": "400",
        "D": "210",
        "E": "540"
      }
    }

    ],

    "2024": [

    // ── QUESTÃO 1 ──
        {
      "num": 1,
      "enunciado": "Suponha que, numa fábrica de calçados, o custo totalda produção, em reais, é dado por 𝐶𝐶(𝑥𝑥) = 𝑥2 − 40𝑥 + 500, em que 𝑥 é a quantidade de calçados produzidos. Nesse contexto, é CORRETO afirmar que:",
      "img": null,
      "alt": {
        "A": "a produção de 100 calçados é a que realiza o custo máximo da produção",
        "B": "a produção de 20 calçados é a que realiza o custo mínimo da produção",
        "C": "quando são produzidos 40 calçados, o custo total da produção é de R$ 1.600,00",
        "D": "o custo máximo da produção é de R$ 500,00",
        "E": "o custo mínimo da produção é de R$ 150,00"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Considere o triângulo retângulo a seguir.\nSabendo-se que AB = BC = 2cm e 𝛼 = 120°, então 2 ∙ AD é igual a:\nQuestão anulada. Selecione a alternativa A",
      "img": "assets/documents/PSC/2024/1-ETAPA/questions/q48.png",
      "alt": {
        "A": "4√6/3",
        "B": "4√3/3",
        "C": "−3√2",
        "D": "6√2/5",
        "E": "3√2"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "A área de um retângulo é 50 cm2 e sua base excede em 5 cm sua altura. A altura desse retângulo, nesse caso,mede:",
      "img": null,
      "alt": {
        "A": "6 cm",
        "B": "4 cm",
        "C": "5 cm",
        "D": "7 cm",
        "E": "8 cm"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um indivíduo aplicou 𝑅𝑅$ 50.000,00 à taxa de 2% a. m.- durante 6 meses - no regime de juros simples. Ao final dessa aplicação, o montante será de:",
      "img": null,
      "alt": {
        "A": "R$ 60.000,00",
        "B": "R$ 52.000,00",
        "C": "R$ 54.000,00",
        "D": "R$ 58.000,00",
        "E": "R$ 56.000,00"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Num triângulo ABC, uma reta 𝑟 é paralela ao lado BC e divide o lado AB em dois segmentos de retas cujas medidas são 6 cm e 8 cm. Se o lado AC do triângulo mede 21 cm, então as medidas dos segmentos de reta formados pela intersecção da reta 𝑟𝑟 com a lado AC são:",
      "img": null,
      "alt": {
        "A": "8 cm e 13 cm",
        "B": "6 cm e 15 cm",
        "C": "7 cm e 14 cm",
        "D": "9 cm e 12 cm",
        "E": "10 cm e 11 cm"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Uma turma de trabalhadores construiu 3/5 de uma obra em 15 dias. A partir desse momento, 6 trabalhadores deixaram a obra, que terminou com 4 dias de atraso. A quantidade de trabalhadores no início da obra era de:",
      "img": null,
      "alt": {
        "A": "40",
        "B": "28",
        "C": "30",
        "D": "32",
        "E": "21"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Seja 𝑓: ℝ → ℝ uma função tal 𝑓(3𝑥 + 2) = 2𝑥 + 3.\nEntão 𝑓(𝑓(𝑥)) é:\nQuestão anulada. Selecione a alternativa A",
      "img": null,
      "alt": {
        "A": "4x + 24/9",
        "B": "x - 2/3",
        "C": "x + 2/3",
        "D": "2x - 3/7",
        "E": "3x + 18/7"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "A quadro a seguir apresenta quatro medições de uma determinada peça.\nA média dessas medições é, aproximadamente,",
      "img": "assets/documents/PSC/2024/1-ETAPA/questions/q54.png",
      "alt": {
        "A": "0,27mm",
        "B": "0,22mm",
        "C": "0,23mm",
        "D": "0,25mm",
        "E": "0,28mm"
      }
    }

    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma empresa de tecnologia lançou dois modelos, A e B, de smartphones. O modelo A foi lançado a um preço inicial de R$ 2.500,00, enquanto o modelo B foi lançado por R$ 3.200,00. Após alguns meses, a empresa decidiu reduzir o preço dos aparelhos. O modelo A teve uma redução de 20% no preço, e o modelo B, de 25%. Após essas reduções, um cliente percebeu que a razão entre os novos preços dos modelos A e B era a mesma que a razão entre os preços originais. Dado esse cenário, podemos afirmar que o(a):",
      "img": null,
      "alt": {
        "A": "redução no preço do modelo B foi maior, em termos absolutos, mas não proporcionalmente",
        "B": "cliente está equivocado, pois a razão entre os novos preços é maior que a razão original",
        "C": "cliente está correto, pois a proporção entre os preços se manteve",
        "D": "cliente está equivocado, pois a razão entre os novos preços é menor que a razão original",
        "E": "diferença entre os novos preços é a mesma que a diferença entre os preços iniciais"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Uma empresa de engenharia está construindo uma ponte e precisa calcular a quantidade de cabos de aço necessários para a estrutura. Cada cabo de aço tem 2,5 𝑘𝑚 de comprimento, e a ponte requer um total de 1.250.000 𝑚𝑚 de cabos estendidos ao longo da construção. A quantidade mínima, para cobrir a extensão exigida na construção da ponte, é de:",
      "img": null,
      "alt": {
        "A": "um cabo",
        "B": "dois cabos",
        "C": "três cabos",
        "D": "quatro cabos",
        "E": "cinco cabos"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Um agricultor está analisando a produtividade de sua plantação de milho ao longo do tempo. A quantidade de milho colhida, em toneladas, pode ser modelada pela função quadrática:\n𝑄(𝑡) = −2𝑡^2 + 8𝑡 + 10\nonde 𝑡 é o número de meses após o início da plantação. Se o agricultor deseja saber durante quais meses a produção de milho está crescendo e a partir de qual mês começa a diminuir, é CORRETO afirmar que a quantidade de milho colhido:",
      "img": null,
      "alt": {
        "A": "cresce para 𝑡 < 4 e diminui para 𝑡 > 4",
        "B": "cresce para 𝑡 < 8 e diminui para 𝑡 > 8",
        "C": "cresce para 𝑡 > 2 e diminui para 𝑡 < 2",
        "D": "cresce para 𝑡 > 4 e diminui para 𝑡 < 4",
        "E": "cresce para 𝑡 < 2 e diminui para 𝑡 > 2"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um estudante está baixando um arquivo de 4 𝐺𝐵,utilizando uma conexão com velocidade de 20 megabits por segundo (20 𝑀𝑏⁄𝑠). Para estimar o tempo necessário para o download completo do arquivo, ele precisa converter as unidades de armazenamento e de velocidade de transferência corretamente. Sabendo que 1 𝐵 = 8 𝑏𝑖𝑡𝑠, 1 𝑀𝐵 =1024 𝑘𝑏 e 1 𝐺𝐵 = 1024 𝑀𝐵, podemos afirmar que o intervalo de tempo necessário para que o arquivo seja completamente baixado, caso a velocidade da internet se mantenha constante, será de:",
      "img": null,
      "alt": {
        "A": "15 min",
        "B": "22 min",
        "C": "27 min",
        "D": "34 min",
        "E": "42 min"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "A figura a seguir representa o esquema, fora de escala, do projeto de uma escada de cinco degraus, onde todos os triângulos apresentados nos degraus são congruentes e retângulos:\nCom base nessas informações, podemos afirmar que a distância 𝐻 do final do corrimão, em relação ao piso, é de:",
      "img": "assets/documents/PSC/2025/1-ETAPA/questions/q51.png",
      "alt": {
        "A": "45 cm",
        "B": "85 cm",
        "C": "90 cm",
        "D": "92 cm",
        "E": "100 cm"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Pedro está procurando cercar um terreno triangular. Ele sabe que dois lados desse terreno medem, respectivamente, 100 𝑚 e 60 𝑚 e formam entre si um ângulo de 120° e que o terreno será cercado com cinco voltas de arame farpado. Considerando que ometro de arame farpado custa R$ 3,00, podemos concluir que ele irá gastar com a compra:",
      "img": null,
      "alt": {
        "A": "𝑅$ 4.500,00",
        "B": "𝑅$ 4.700,00",
        "C": "𝑅$ 4.800,00",
        "D": "𝑅$ 5.500,00",
        "E": "𝑅$ 6.500,00"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Um recipiente de vidro, totalmente lacrado, possui oformato de um prisma reto com 20 𝑐𝑚 de altura e base quadrada, com 10 𝑐𝑚 de lado. Ele está apoiado sobre uma mesa horizontal e contém um líquido até a altura de 15 𝑐𝑚, conforme indicado na figura a seguir:\nSe o recipiente for virado e apoiado sobre uma de suas faces não quadradas, podemos afirmar que a nova altura do líquido dentro dele será de:",
      "img": "assets/documents/PSC/2025/1-ETAPA/questions/q53.png",
      "alt": {
        "A": "7,0 cm",
        "B": "7,5 cm",
        "C": "8,5 cm",
        "D": "9,5 cm",
        "E": "10,0 cm"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Uma fábrica de bicicletas produz três modelos diferentes, com cinco opções de cores e dois tipos de assentos. Além disso, opcionalmente, o cliente pode acrescentar o espelho retrovisor ou o assento traseiro,ou ambos. Podemos afirmar que a quantidade deopções diferentes de bicicletas que podem ser escolhidas pelo cliente é igual a:",
      "img": null,
      "alt": {
        "A": "12",
        "B": "60",
        "C": "600",
        "D": "120",
        "E": "1200"
      }
    }
    ]

  } // fim de questoes
};
