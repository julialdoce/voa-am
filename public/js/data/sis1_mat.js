// js/data/sis1_mat.js — Questões de Matemática SIS 1ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/SIS/1/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/SIS/1/<ano>/questions/
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const SIS1_MAT = {
  prova: 'SIS 1ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 8,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "D" ,      "2": "C" ,      "3": "A" ,      "4": "D" ,      "5": "B" ,
        "6": "B" ,      "7": "E" ,      "8": "C"
    },
    "2024": {
        "1": "E" ,      "2": "A" ,      "3": "C" ,      "4": "D" ,      "5": "D" ,
        "6": "B" ,      "7": "B" ,      "8": "E"
    },
    "2025": {
        "1": "D" ,      "2": "E" ,      "3": "C" ,      "4": "A" ,      "5": "D" ,
        "6": "B" ,      "7": "C" ,      "8": "E"
    }
  },

  // ── ASSUNTOS (por ano) ──────────────────────────────────────
  assuntos: {
    "2023": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": "" ,      "9": "" ,      "10": "" ,
        "11": "" ,      "12": "" ,      "13": "" ,      "14": "" ,      "15": "" ,
        "16": "" ,      "17": "" ,      "18": "" ,      "19": "" ,      "20": ""
    },
    "2024": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": "" ,      "9": "" ,      "10": "" ,
        "11": "" ,      "12": "" ,      "13": "" ,      "14": "" ,      "15": "" ,
        "16": "" ,      "17": "" ,      "18": "" ,      "19": "" ,      "20": ""
    },
    "2025": {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": "" ,      "9": "" ,      "10": "" ,
        "11": "" ,      "12": "" ,      "13": "" ,      "14": "" ,      "15": "" ,
        "16": "" ,      "17": "" ,      "18": "" ,      "19": "" ,      "20": ""
    }
  },

  // ── QUESTÕES (por ano) ──────────────────────────────────────
  questoes: {
    "2023": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Bianca ganhou uma coleção com 264 revistas em quadrinhos e, após uma semana de leitura dessas revistas, a razão entre o número de revistas que ela leu para o número de revistas que não leu era 3/8. Na semana seguinte, ela leu, dessa cole-ção, 27 revistas que ainda não tinha lido, de maneira que a razão entre o número de revistas que Bianca leu para o nú-mero de revistas que não leu passou a ser",
      "img": null,
      "alt": {
        "A": "1/3",
        "B": "2/3",
        "C": "3/4",
        "D": "3/5",
        "E": "4/5"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "O cálculo da nota final em certa disciplina é feito pela mé-dia aritmética das notas de 5 atividades. A nota final de João nessa disciplina foi 7,6 e na última atividade ele tirou nota 10. Nas 3 primeiras atividades ele tirou notas iguais e na quarta atividade ele tirou 2 a mais do que na segunda atividade. A nota de João na primeira atividade foi",
      "img": null,
      "alt": {
        "A": "5,5",
        "B": "6",
        "C": "6,5",
        "D": "7",
        "E": "7,5"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "A função f: → é uma função polinomial do 1o grau tal que f(2) = 0 e f(- 3) = 2, conforme mostra o gráfico.\nA lei de formação da função f é",
      "img": "assets/documents/SIS/2023/1-ETAPA/questions/q39.png",
      "alt": {
        "A": "f(x) = -2x/5 + 4/5",
        "B": "f(x) = -3x + 2",
        "C": "f(x) = -3x - 2",
        "D": "f(x) = -3x/5 + 2/5",
        "E": "f(x) = -3x/5 + 2"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um triângulo retângulo BCD, cuja hipotenusa BD mede 13 cm, tem o lado BC em comum com o triângulo retângulo ABC, conforme a figura, que mostra apenas parte do triângulo BCD.\nA área do triângulo BCD é",
      "img": "assets/documents/SIS/2023/1-ETAPA/questions/q40.png",
      "alt": {
        "A": "6 cm^2",
        "B": "12 cm^2",
        "C": "24 cm^2",
        "D": "30 cm^2",
        "E": "60 cm^2"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Um retângulo ABCD de área 40 cm^2 tem o lado CD em comum com o retângulo CFGD, que tem um perímetro de 16 cm. Um ponto E sobre o lado AD do retângulo é tal que AE = ED e determina, juntamente com os pontos C, F e G, o trapézio CFGE, conforme mostra a figura.\nObservando que BC = 8 cm, a área do trapézio CFGE é",
      "img": "assets/documents/SIS/2023/1-ETAPA/questions/q41.png",
      "alt": {
        "A": "20 cm^2",
        "B": "25 cm^2",
        "C": "30 cm^2",
        "D": "35 cm^2",
        "E": "40 cm^2"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Considere que em uma circunferência de raio R está inscrito um triângulo que tenha um ângulo de medida α oposto a um lado do triângulo de medida ℓ, conforme figura 1. A lei dos senos afirma que ℓ = 2R⋅ sen α.\nUm triângulo que tem um lado de medida aproximadamente igual a 7,9 cm está inscrito em uma circunferência de raio 4 cm, conforme mostra a figura 2.\nSabendo que sen β = 15/16, o perímetro do triângulo da figura 2 é, aproximadamente,",
      "img": "assets/documents/SIS/2023/1-ETAPA/questions/q42.png",
      "alt": {
        "A": "19 cm",
        "B": "19,4 cm",
        "C": "19,9 cm",
        "D": "20,5 cm",
        "E": "21 cm"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Permutando-se os algarismos do número 15792, obtemos 120 números distintos, incluindo o próprio número 15792. O total dessas permutações que são números maiores que 30000 e menores que 70000 é",
      "img": null,
      "alt": {
        "A": "96",
        "B": "60",
        "C": "48",
        "D": "30",
        "E": "24"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Uma sorveteria oferece 10 sabores diferentes de sorvete e 4 tipos diferentes de acompanhamentos. Rogério deve escolher 2 sabores diferentes de sorvete e 2 acompanhamentos diferentes, mas não escolherá sorvete de chocolate, que é um dos 10 sabores. O número de maneiras distintas de Rogério fazer essa escolha é",
      "img": null,
      "alt": {
        "A": "72",
        "B": "144",
        "C": "216",
        "D": "432",
        "E": "864"
      }
    }
    ],
    "2024": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Dentre 15000 pessoas que participaram de um estudo, 46% eram crianças. Dentre essas crianças, apenas 14% consumiam a quantidade diária de açúcar de acordo com o recomendado pela Organização Mundial da Saúde (OMS). O número de crianças participantes desse estudo que consumiam, diariamente, a quantidade de açúcar recomendada pela OMS é",
      "img": null,
      "alt": {
        "A": "480",
        "B": "600",
        "C": "884",
        "D": "900",
        "E": "966"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "A média aritmética das idades de 60 funcionários de uma empresa é igual a 39,6 anos. Considerando apenas os homens, a média das idades é igual a 43 anos e, considerando apenas as mulheres, a média das idades é igual a 37 anos. O número de funcionárias mulheres nessa empresa é",
      "img": null,
      "alt": {
        "A": "34",
        "B": "35",
        "C": "36",
        "D": "37",
        "E": "38"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Considere a função polinomial do segundo grauf(x) = x^2 + kx + 7, em que k é uma constante real positiva. Sabendo que o menor valor assumido por essa função é 3,a soma f(1) + f(–1) é igual a",
      "img": null,
      "alt": {
        "A": "4",
        "B": "10",
        "C": "16",
        "D": "22",
        "E": "28"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um ponto E está sobre o lado CD de um retângulo ABCD e um ponto F está sobre o segmento AE, tal que o segmento BF é perpendicular ao segmento AE, conforme mostra a figura.\nSabendo que o lado AB mede o triplo do segmento AF e que o segmento DE mede 1 cm a mais do que o segmento AF, a medida do segmento EF é",
      "img": "assets/documents/SIS/2024/1-ETAPA/questions/q40.png",
      "alt": {
        "A": "6 cm",
        "B": "7 cm",
        "C": "8 cm",
        "D": "9 cm",
        "E": "10 cm"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Um retângulo ABCD foi dividido em quatro retângulos de mesma área, conforme mostra a figura.\nA área do retângulo ABCD é",
      "img": "assets/documents/SIS/2024/1-ETAPA/questions/q41.png",
      "alt": {
        "A": "432 cm^2",
        "B": "480 cm^2",
        "C": "576 cm^2",
        "D": "648 cm^2",
        "E": "696 cm^2"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Um encontro de professores e responsáveis ocorrerá em seis salas de aula que ficam lado a lado. Seis professores foram convocados para esse encontro, sendo que cada professor ficará em uma única sala e não ficarão dois professores na mesma sala. Ana, que é a professora de matemática, não quer ficar na primeira sala, e Carlos, que é professor de física, quer ficar na última sala. O número de maneiras distintas de distribuir os seis professores pelas seis salas, satisfazendo os pedidos de Ana e Carlos, é",
      "img": null,
      "alt": {
        "A": "48",
        "B": "96",
        "C": "120",
        "D": "144",
        "E": "150"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "A distribuição dos salários dos funcionários de uma empresa é dada pela tabela a seguir.\nA mediana dos salários desses funcionários é",
      "img": "assets/documents/SIS/2024/1-ETAPA/questions/q43.png",
      "alt": {
        "A": "R$ 2.482,00",
        "B": "R$ 2.500,00",
        "C": "R$ 2.575,00",
        "D": "R$ 2.700,00",
        "E": "R$ 2.792,00"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "No plano cartesiano, o gráfico que representa uma função polinomial de 1o grau passa pelos pontos B, C e D.\nAs coordenadas do ponto B são",
      "img": "assets/documents/SIS/2024/1-ETAPA/questions/q44.png",
      "alt": {
        "A": "(3, 0)",
        "B": "(2, 0)",
        "C": "(0, 1)",
        "D": "(0, 2)",
        "E": "(0, 3)"
      }
    }
    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Para uma reunião escolar foram convidados 120 pais e 160 mães. Entre os convidados, 60% dos pais compareceram à reunião e 15% das mães não compareceram. O total de convidados presentes na reunião foi",
      "img": null,
      "alt": {
        "A": "96",
        "B": "135",
        "C": "183",
        "D": "208",
        "E": "210"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Considere a tabela que registra as alturas de 20 alunos de uma turma.\nSeja Mo a moda das alturas desses 20 alunos. Um grupo foi formado com todos os alunos da turma que tinham alturas diferentes de Mo. A média das alturas dos alunos do grupo formado é igual a",
      "img": "assets/documents/SIS/2025/1-ETAPA/questions/q38.png",
      "alt": {
        "A": "158 cm",
        "B": "159 cm",
        "C": "160 cm",
        "D": "163 cm",
        "E": "165 cm"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Sobre um segmento de reta AB, de medida 13 cm, estão os vértices P e R de um triângulo retângulo PQR, conforme mostra a figura.\nSabendo que a distância do ponto A ao ponto P é 2 cm, a distância do ponto B ao ponto R é",
      "img": "assets/documents/SIS/2025/1-ETAPA/questions/q39.png",
      "alt": {
        "A": "4,5 cm",
        "B": "5 cm",
        "C": "6 cm",
        "D": "8,5 cm",
        "E": "11 cm"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um jardim foi construído em um terreno retangular de 10 m de largura por 18 m de comprimento. No interior do terreno foram delimitadas 4 regiões quadradas, cada uma com 8 m de perímetro, destinadas ao plantio de árvores.\nA parte desse terreno não destinada ao plantio de árvores tem área",
      "img": "assets/documents/SIS/2025/1-ETAPA/questions/q40.png",
      "alt": {
        "A": "164 m^2",
        "B": "172 m^2",
        "C": "178 m^2",
        "D": "176 m^2",
        "E": "148 m^2"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Um jogo é praticado em um galpão que possui 4 salas conectadas por portas. Esse jogo se inicia com uma pessoa entrando no galpão por uma porta de entrada, que a leva para a Sala 1. A figura representa um esquema das salas nesse galpão, sendo que as setas indicam as portas que ligam as salas. Algumas portas só permitem a passagem entre as salas em um único sentido, indicado pela seta, e outras permitem que se passe nos dois sentidos. O objetivo do jogo é sair do galpão pelas portas indicadas com a palavra Saída.\nDefine-se uma sequência de movimentos como sendo o percurso feito pelo jogador até sair do galpão e o tamanho dessa sequência como sendo o número de portas pelas quais o jogador passou até sair (não se conta a porta de entrada, mas se conta a porta de saída). Por exemplo, existem exatamente 3 sequências de movimentos distintas de tamanho 2, e que são representadas por 1/2/saída, ou seja, o jogador vai da Sala 1 para a Sala 2 por alguma porta possível e da Sala 2 sai do galpão.\nNesse jogo, o número de sequências de movimentos distintas de tamanho 4 é",
      "img": "assets/documents/SIS/2025/1-ETAPA/questions/q41.png",
      "alt": {
        "A": "12",
        "B": "16",
        "C": "21",
        "D": "26",
        "E": "33"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Considere, no plano cartesiano, os 14 pontos destacados:\nO gráfico da função polinomial do primeiro grau f(x) = 2x - 1 separa o plano em duas partes, sendo que uma parte é a que contém a origem (0, 0) e M dos pontos destacados, e a outra parte é a que contém N dos pontos destacados.\nA diferença N - M é igual a",
      "img": "assets/documents/SIS/2025/1-ETAPA/questions/q42.png",
      "alt": {
        "A": "0",
        "B": "2",
        "C": "4",
        "D": "6",
        "E": "8"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Um levantamento feito em uma empresa identificou que, entre os 300 funcionários que trabalham na filial P, 120 são fluentes em inglês e, entre os 160 funcionários que trabalham na filial Q, 64 são fluentes em inglês. Considerando todos os funcionários das filiais P e Q dessa empresa, a razão entre o número dos que são fluentes em inglês e o número dos que não são fluentes é igual a",
      "img": null,
      "alt": {
        "A": "1/2",
        "B": "1/3",
        "C": "2/3",
        "D": "2/5",
        "E": "3/4"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Sejam f e g funções polinomiais do 2o grau tais que f(x) = x^2 + 2x e g(x) = - 3x^2 - 4x + 2. Seja m o menor valor assumido pela função f e seja n o maior valor assumido pela função g. A soma m + n é igual a:",
      "img": null,
      "alt": {
        "A": "-2",
        "B": "-1/3",
        "C": "2",
        "D": "5/3",
        "E": "7/3"
      }
    }
    ]
  } // fim de questoes
};
