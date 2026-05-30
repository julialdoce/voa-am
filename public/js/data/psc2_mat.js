// js/data/psc2_mat.js — Questões de Matemática PSC 2ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/PSC/2/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/PSC/2/<ano>/questions/
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const PSC2_MAT = {
  prova: 'PSC 2ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 8,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "B" ,      "2": "C" ,      "3": "E" ,      "4": "A" ,      "5": "A" ,
        "6": "D" ,      "7": "D" ,      "8": "C"
    },
    "2024": {
        "1": "E" ,      "2": "C" ,      "3": "A" ,      "4": "D" ,      "5": "B" ,
        "6": "A" ,      "7": "B" ,      "8": "C"
    },
    "2025": {
        "1": "A" ,      "2": "D" ,      "3": "C" ,      "4": "E" ,      "5": "A" ,
        "6": "B" ,      "7": "D" ,      "8": "E"
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
      "enunciado": "Sejam 𝛼 e 𝛽, respectivamente, os determinantes das matrizes não singulares:\nLogo, a razão 𝛽⁄𝛼 é igual a:",
      "img": "assets/documents/PSC/2023/2-ETAPA/questions/q47.png",
      "alt": {
        "A": "−14",
        "B": "−12",
        "C": "10",
        "D": "12",
        "E": "14"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Considerando que o conjunto 𝐴 possui 5 elementose o conjunto 𝐵, 8 elementos, podemos afirmar que a quantidade de funções injetoras 𝑓: 𝐴 → 𝐵 que podemos formar é:",
      "img": null,
      "alt": {
        "A": "7200",
        "B": "8740",
        "C": "6720",
        "D": "25900",
        "E": "32768"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Uma piscina tem 10 𝑚 de comprimento, 8 𝑚 de largura e 1,8 𝑚 de profundidade. O volume, em litros,dessa piscina é:",
      "img": null,
      "alt": {
        "A": "110000",
        "B": "115000",
        "C": "125000",
        "D": "132000",
        "E": "144000"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Uma pirâmide regular, de base quadrada, possui área da base igual a 50 𝑑𝑚2. Sabendo que o apótema da pirâmide mede 6 𝑑𝑚, podemos afirmar que a altura dessa pirâmide mede:",
      "img": null,
      "alt": {
        "A": "√23,5 dm",
        "B": "√32,5 dm",
        "C": "√42,5 dm",
        "D": "√53,5 dm",
        "E": "√64,5 dm"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Considere os pontos 𝐴 = (0,−2) e 𝐵 = (4, 6). O ponto do eixo 𝑥 que é equidistante de 𝐴 e 𝐵, é:\nQuestão anulada, selecione a alternativa A",
      "img": null,
      "alt": {
        "A": "(−6, 0)",
        "B": "(−5, 0)",
        "C": "(4, 0)",
        "D": "(5, 0)",
        "E": "(6, 0)"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Assinale a alternativa CORRETA:",
      "img": null,
      "alt": {
        "A": "Dois planos que possuem três pontos em comum são coincidentes",
        "B": "Se dois planos 𝛼 e 𝛽 são perpendiculares aoplano 𝛾, então os planos 𝛼 e 𝛽 são paralelos",
        "C": "Existem dois planos distintos, passando ambos por um mesmo ponto e perpendiculares a uma reta",
        "D": "Duas retas perpendiculares a um plano são paralelas",
        "E": "Toda reta paralela a um plano é perpendicular a infinitas retas desse plano"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Um cilindro reto possui área total igual a 32𝜋 𝑐𝑚2. Sabendo que o raio da base é 1/3 da medida da altura desse cilindro, então a área lateral desse cilindro mede:",
      "img": null,
      "alt": {
        "A": "12𝜋 𝑐𝑚^2",
        "B": "18𝜋 𝑐𝑚^2",
        "C": "20𝜋 𝑐𝑚^2",
        "D": "24𝜋 𝑐𝑚^2",
        "E": "28𝜋 𝑐𝑚^2"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "A quantidade de anagramas distintos de ANO2013 que é possível formar, de modo que comecem por uma letra e terminem em um número é:",
      "img": null,
      "alt": {
        "A": "680",
        "B": "720",
        "C": "1440",
        "D": "840",
        "E": "925"
      }
    }
    ],
    "2024": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Estudos demográficos revelam que a população de certo país, no ano zero, é 𝑓0 e, decorridos 𝑡 anos, a população poderá ser estimada pela função:\n𝑓(𝑡) = 𝑓0 ∙ e^0,05t\nConsiderando ℓ𝑛 3 = 1,10, podemos afirmar que apopulação desse país deverá triplicar quando decorrerem, aproximadamente,",
      "img": null,
      "alt": {
        "A": "10 anos",
        "B": "16 anos",
        "C": "18 anos",
        "D": "20 anos",
        "E": "22 anos"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Seja a função 𝑓: ℝ → ℝ definida por:\n𝑓(𝑥) = 9^(𝑥+1)\nO valor de 𝑥, de modo que 𝑓(4 − 𝑥) = 3𝑓(𝑥), deve ser:",
      "img": null,
      "alt": {
        "A": "3/4",
        "B": "5/4",
        "C": "7/4",
        "D": "5/6",
        "E": "7/6"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "A tabela de distribuição de frequências, a seguir,representa o salário semanal de 37 parceiros de uma empresa:\nA partir dessas informações, podemos afirmar que os valores da média aproximada, da moda e da mediana são,respectivamente,",
      "img": "assets/documents/PSC/2024/2-ETAPA/questions/q49.png",
      "alt": {
        "A": "371,76, 345 e 375",
        "B": "373,74, 315 e 345",
        "C": "374,84, 345 e 315",
        "D": "375,93, 375 e 405",
        "E": "376,96, 375 e 435"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Em uma aula de geometria, a professora de Matemática orientou os alunos para que construíssem uma pirâmide de base quadrada com 4,0 𝑐𝑚 de lado e 12 𝑐𝑚 de altura. O volume dessa pirâmide é igual a:",
      "img": null,
      "alt": {
        "A": "36 𝑐𝑚^3",
        "B": "48 𝑐𝑚^3",
        "C": "52 𝑐𝑚^3",
        "D": "64 𝑐𝑚^3",
        "E": "72 𝑐𝑚^3"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Uma avenida possui 4055 𝑚 de extensão e vai receber em seu canteiro central o plantio de árvores de pequeno porte. A distância entre as mudas deve ser de 16 𝑚, com a primeira árvore sendo plantada a 7 𝑚 do início da avenida. A quantidade de árvores que deverão ser plantadas será igual a:",
      "img": null,
      "alt": {
        "A": "248",
        "B": "254",
        "C": "276",
        "D": "320",
        "E": "342"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Para a existência da expressão:\ncos 𝑥 =3𝑥 −2/4\nos valores de 𝑥 devem estar compreendidos no intervalo:",
      "img": null,
      "alt": {
        "A": "−2/3 ≤ 𝑥 ≤ 2.",
        "B": "−1 ≤ 𝑥 ≤ 1",
        "C": "−1 ≤ 𝑥 ≤ 2",
        "D": "−2 ≤ 𝑥 ≤ 3",
        "E": "−7/3 ≤ 𝑥 ≤ 4"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Considere a progressão geométrica (1, 4, 16, 64, … ). A quantidade de termos que devem ser somados,para que o resultado da adição seja 87381, é igual a:",
      "img": null,
      "alt": {
        "A": "8",
        "B": "9",
        "C": "10",
        "D": "13",
        "E": "16"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Para a função real definida por:\n𝑓(𝑥) = (𝑘 − 3)𝑥^2 − 5𝑥 − 6\né CORRETO afirmar que:",
      "img": null,
      "alt": {
        "A": "se 𝑘 = 4, então 𝑓(−1) = 1",
        "B": "o gráfico de 𝑓(𝑥) é uma parábola para todo 𝑘 ∈ ℝ",
        "C": "se 𝑘 = 1, então 𝑓(𝑥) é negativa para todo 𝑥 ∈ ℝ",
        "D": "se 𝑘 = 4, então 𝑓(6) = 2",
        "E": "se 𝑘 < 3, então o gráfico de 𝑓(𝑥) é uma parábola com a concavidade voltada para cima"
      }
    }
    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "O nível de intensidade sonora é medido em decibéis (dB) e segue a fórmula:\n𝐿 = 10 ⋅ log (𝐼/𝐼0)\nonde:\n• 𝐿 é o nível sonoro em decibéis.\n• 𝐼 é a intensidade do som.\n• 𝐼0 é a intensidade mínima perceptível pelo ouvido humano.\nEm um dia tranquilo, o ruído em uma biblioteca foi medido em 40 dB, enquanto, em uma avenida movimentada, o ruído atingiu 70 dB. Com base nessa informação, é correto afirmar que o som na avenida movimentada é",
      "img": null,
      "alt": {
        "A": "1000 vezes maior que o da biblioteca",
        "B": "1,75 vezes maior que o da biblioteca",
        "C": "3 vezes maior que o da biblioteca",
        "D": "10 vezes maior que o da biblioteca",
        "E": "100 vezes maior que o da biblioteca"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Uma construtora foi contratada para construir uma nova rodovia em uma região montanhosa. O engenheiro responsável decidiu que a rodovia principal deveria seguir uma trajetória retilínea para facilitar o deslocamento dos veículos. Ao projetar um acesso secundário, surgiram diferentes possibilidades de alinhamento em relação à via principal.\nCom base nessa situação, analise as seguintes afirmações:\nI. Se a rodovia principal e o acesso secundário forem projetados de modo que nunca se cruzem, independentemente de sua extensão, essas vias serãoparalelas.\nII. Se a rodovia principal e o acesso secundário se encontrarem em um único ponto, formando um ângulo de 90°, então essas vias serão perpendiculares.\nIII. Se o acesso secundário e a rodovia principal se cruzarem em um único ponto, formando um ângulo agudo ou obtuso, essas vias serão concorrentes, mas não perpendiculares.\nIV.Caso a rodovia principal e o acesso secundário sejam representados por equações de mesma inclinação e mesma posição inicial, elas serão, na prática, a mesma estrada.\nAssinale a sequência CORRETA:",
      "img": null,
      "alt": {
        "A": "F - V - V - F",
        "B": "V - F - V - V",
        "C": "V - V - F - V",
        "D": "V - V - V - V",
        "E": "V - F - F - V"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Maria fez um investimento de R$ 3.000,00 em uma conta que oferece juros simples de 4% ao mês. Ela pretende resgatar seu investimento após 8 meses, mas, antes de retirar o valor, ela decide adicionar R$ 1.000,00 ao investimento inicial, acreditando que a rentabilidade será maior.\nCom base nas informações acima, analise as afirmativas a seguir:\nI. Se Maria tivesse deixado o valor inicial de R$ 3.000,00 investido por 8 meses, o montante seria de R$ 3.960,00.\nII. Se Maria tivesse feito a adição de R$ 1.000,00 no final de 8 meses, o montante final seria maior do que R$ 4.960,00.\nIII. Caso Maria tivesse adicionado os R$ 1.000,00 logo no início do investimento, o montante final seria maior do que R$ 5.200,00.\nAssinale a alternativa correta:",
      "img": null,
      "alt": {
        "A": "Somente a afirmativa II é verdadeira",
        "B": "Somente a afirmativa I é verdadeira",
        "C": "Somente as afirmativas I e II são verdadeiras",
        "D": "Somente a afirmativa III é verdadeira",
        "E": "Somente as afirmativas I e III são verdadeiras"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Observe a sequência a seguir:\n2, 5, 10, 17, 26, …\nOs três próximos números da sequência são",
      "img": null,
      "alt": {
        "A": "40, 55, 72",
        "B": "37, 51, 67",
        "C": "38, 50, 66",
        "D": "38, 53, 70",
        "E": "37, 50, 65"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Seja 𝑓: ℝ → ℝ uma função definida por\n𝑓(𝑥) = 𝑎 + 𝑏 𝑠𝑒𝑛(2𝑥 −𝜋2) sendo 𝑎, 𝑏 ∈ ℝ.\nSe o conjunto imagem da aplicação é dado por 𝐼𝑚𝑓 =[-4,6], então 𝑓(𝜋) é:",
      "img": null,
      "alt": {
        "A": "-4",
        "B": "4",
        "C": "3",
        "D": "-3",
        "E": "8"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Se ∑12+𝑘=∞1 𝑘 = 1, onde 𝑘 ∈ ℕ, então podemos afirmar que ∑12𝑘+=∞1 2𝑘 + ∑12+𝑘=∞1 2𝑘−1 é igual a:",
      "img": null,
      "alt": {
        "A": "-1",
        "B": "1",
        "C": "1/2",
        "D": "3",
        "E": "1/4"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "O sólido representado na figura a seguir é um paralelepípedo reto retângulo de base quadrada.\nLogo, podemos afirmar que o volume do sólido, sendo 𝐷 =20𝑐𝑚 a medida da diagonal do paralelepípedo, é dado por:",
      "img": null,
      "alt": {
        "A": "60√3 𝑐𝑚^3",
        "B": "450√3 𝑐𝑚^3",
        "C": "650√3 𝑐𝑚^3",
        "D": "500√3 𝑐𝑚^3",
        "E": "440√3 𝑐𝑚^3"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Suponhamos que a cor dos olhos seja estabelecida por pares de genes, onde C seja dominante para olho escuro e c recessivo para olho claro. Um homem que possua os olhos escuros, mas com mãe de olhos claros, casou-se com uma mulher de olhos claros cujo pai possui olhos escuros. A probabilidade de nascer uma menina de olhos claros é de",
      "img": null,
      "alt": {
        "A": "10%",
        "B": "50%",
        "C": "20%",
        "D": "75%",
        "E": "25%"
      }
    }
    ]
  } // fim de questoes
};
