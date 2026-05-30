// js/data/macro2024_mat.js — Questões de Matemática MACRO 2024
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...", ← texto completo do enunciado
//    "img": "assets/documents/MACRO/2024/questions/q1.png",
//                                        ← caminho da imagem (ou null se não houver)
//    "alt": {
//      "A": "Texto da alternativa A",
//      "B": "Texto da alternativa B",
//      "C": "Texto da alternativa C",
//      "D": "Texto da alternativa D",
//      "E": "Texto da alternativa E"
//    }
//  },
//
//  GABARITO: preencha com a letra correta de cada questão.
//  ASSUNTOS: preencha com o tópico de cada questão.
//
//  DIVISÃO DA PROVA:
//    Q1  – Q40 → Conhecimentos Gerais
//    Q41 – Q60 → Conhecimentos Específicos (Matemática)
//
//  IMAGENS:
//    - Salve em: public/assets/documents/MACRO/2024/questions/
//    - Nomeie como: q<num>.png  (ex: q1.png, q41.png)
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const MACRO2024_MAT = {
  prova: 'MACRO 2024',
  area: 'Matemática e suas Tecnologias',
  caderno: 'Conhecimentos Gerais e Conhecimentos Específicos',
  totalQuestoes: 25,
  tempoMinutos: 180,

  secoes: {
    'Conhecimentos Gerais':    { inicio: 1,  fim: 13 },
    'Conhecimentos Específicos': { inicio: 14, fim: 25 },
  },

  // ── GABARITO ────────────────────────────────────────────────
  gabarito: {
        "1": "C" ,      "2": "E" ,      "3": "B" ,      "4": "A" ,      "5": "D" ,
        "6": "C" ,      "7": "E" ,      "8": "A" ,      "9": "B" ,      "10": "E" ,
        "11": "E" ,      "12": "D" ,      "13": "C" ,      "14": "A" ,      "15": "D" ,
        "16": "C" ,      "17": "B" ,      "18": "E" ,      "19": "A" ,      "20": "D" ,
        "21": "C" ,      "22": "A" ,      "23": "D" ,      "24": "B" ,      "25": "A"
  },

  // ── ASSUNTOS ────────────────────────────────────────────────
  assuntos: {
        "1": "" ,      "2": "" ,      "3": "" ,      "4": "" ,      "5": "" ,
        "6": "" ,      "7": "" ,      "8": "" ,      "9": "" ,      "10": "" ,
        "11": "" ,      "12": "" ,      "13": "" ,      "14": "" ,      "15": "" ,
        "16": "" ,      "17": "" ,      "18": "" ,      "19": "" ,      "20": "" ,
        "21": "" ,      "22": "" ,      "23": "" ,      "24": "" ,      "25": ""
  },

  // ── QUESTÕES ────────────────────────────────────────────────
  questoes: [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma faculdade oferece dois cursos de especialização, um no período da manhã e o outro no período da noite. O número de alunos inscritos nesses dois cursos juntos totaliza 84 alunos, sendo que a razão entre o número de alunos inscritos no curso do período da manhã e o número de alunos inscritos nocurso do período da noite é 2/5. A diferença entre o número de alunos inscritos nesses dois cursos é",
      "img": null,
      "alt": {
        "A": "50",
        "B": "44",
        "C": "36",
        "D": "32",
        "E": "48"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Um estudante resolveu 185 exercícios de matemática em 10 dias. No primeiro dia ele resolveu determinado número de exercícios, no dia seguinte, e em todos os demais dias, resolveu três exercícios a mais do que no dia anterior. Sabendo que no último dia ele resolveu 27 exercícios a mais do que no primeiro dia, o número de exercícios resolvidos no sexto dia foi",
      "img": null,
      "alt": {
        "A": "18",
        "B": "30",
        "C": "26",
        "D": "24",
        "E": "20"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Em uma sala de reuniões há determinado número de cadeiras das quais 10% estão quebradas e não podem ser utilizadas. Dentre as cadeiras restantes, 25% precisam somente de alguns reparos e as outras 27 cadeiras estão em bom estado e não precisam de reparos. O número de cadeiras que não estão quebradas é",
      "img": null,
      "alt": {
        "A": "39",
        "B": "36",
        "C": "40",
        "D": "45",
        "E": "54"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Em uma urna foram colocadas 30 bolas do mesmo tipo, cada uma delas com listras de duas cores. Dessas 30 bolas, 12 possuem listras azuis e amarelas; 10 possuem listras azuis e vermelhas; e as demais possuem listras vermelhas e amarelas. Retirando-se aleatoriamente uma bola dessa urna, a probabilidade de que uma das suas listras seja vermelha é",
      "img": null,
      "alt": {
        "A": "3/5",
        "B": "2/5",
        "C": "4/5",
        "D": "2/3",
        "E": "1/3"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Considere as funções f(x) = x/3 - b e g(x) = x^2 + bx + c, em que b e c são números reais. Sabendo que f(3) = -1 e que f(-3) = g(-2), o valor de f(9) + g(2) é igual a",
      "img": null,
      "alt": {
        "A": "5",
        "B": "3",
        "C": "4",
        "D": "6",
        "E": "2"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Um estudante quer colocar 6 livros em uma prateleira, mas só há espaço para 4 deles. Sabendo que esse estudante não tem preferência pelos livros que ficarão na prateleira, o número de maneiras distintas de ele escolher os 4 livros que serão colocados nela é",
      "img": null,
      "alt": {
        "A": "18",
        "B": "21",
        "C": "15",
        "D": "24",
        "E": "30"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "No mês de abril, uma pessoa comprou, em determinada loja, 2 unidades do produto P e 1 unidade do produto Q, gastando nessa compra R$ 40,00. No mês de maio, o preço do produto P sofreu uma redução de R$ 4,00 em relação ao seu preço de abril, e o preço do produto Q sofreu um aumento de R$ 2,00, também em relação ao seu preço de abril. Dessa forma, se no mês de maio essa pessoa comprasse nessa mesma loja 3 unidades do produto P e 2 unidades do produto Q, pagaria pela compra R$ 56,00. No mês de maio, o preço do produto P era de",
      "img": null,
      "alt": {
        "A": "R$ 8,00",
        "B": "R$ 14,00",
        "C": "R$ 10,00",
        "D": "R$ 16,00",
        "E": "R$ 12,00"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Uma pessoa comprou 9 camisetas de modelos diferentes. A tabela mostra o número de camisetas compradas de cada modelo e o valor unitário de dois desses modelos.\nConsiderando-se o número total de camisetas compradas, na média, o preço de uma camiseta saiu por R$ 45,00. O valor unitário da camiseta de gola polo era",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-GERAIS/questions/q56.png",
      "alt": {
        "A": "R$ 58,50",
        "B": "R$ 44,10",
        "C": "R$ 45,20",
        "D": "R$ 51,50",
        "E": "R$ 53,60"
      }
    },

    // ── QUESTÃO 9 ──
    {
      "num": 9,
      "enunciado": "Considere o retângulo ABCD, com AD = 10 cm, DC = 16 cm e o triângulo DCP, em que P é o ponto médio do lado AB. Seja S o ponto médio do lado BC e Q um ponto no interior do retângulo ABCD, tal que BPQS seja um retângulo, conforme mostra a figura.\nSabendo que o lado PC intersecta o lado QS no ponto R, a área do triângulo PQR, destacado na figura, é",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-GERAIS/questions/q57.png",
      "alt": {
        "A": "15 cm^2",
        "B": "10 cm^2",
        "C": "20 cm^2",
        "D": "18 cm^2",
        "E": "8 cm^2"
      }
    },

    // ── QUESTÃO 10 ──
    {
      "num": 10,
      "enunciado": "Considere o retângulo ABCD, com AB = 12 cm, AD = 9 cm e EC = 13 cm, sendo E um ponto sobre o lado AD, conforme mostra a figura.\nO perímetro do triângulo ACE, destacado na figura, é igual a",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-GERAIS/questions/q58.png",
      "alt": {
        "A": "35 cm",
        "B": "28 cm",
        "C": "30 cm",
        "D": "25 cm",
        "E": "32 cm"
      }
    },

    // ── QUESTÃO 11 ──
    {
      "num": 11,
      "enunciado": "Uma fábrica de doces faz bombons maciços de chocolate na forma de um prisma reto de base quadrada e com 1,5 cm de altura, conforme mostra a figura.\nSabendo que para fabricar 85 bombons desse tipo são necessários 510 cm3 de massa de chocolate, a medida da aresta da base, indicada na figura pela letra x, é igual a",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-GERAIS/questions/q59.png",
      "alt": {
        "A": "1,5 cm",
        "B": "0,5 cm",
        "C": "2,5 cm",
        "D": "1,0 cm",
        "E": "2,0 cm"
      }
    },

    // ── QUESTÃO 12 ──
    {
      "num": 12,
      "enunciado": "O setor de vendas de determinada empresa dividiu um bônus de R$ 15.000,00 entre os três funcionários que obtiveram os maiores valores em vendas no 1o bimestre de 2024, de modo diretamente proporcional ao valor das vendas de cada um. Desses três vendedores, Marcos não foi quem obteve o maior valor em vendas, e Pedro, que recebeu R$ 4.500,00 de bônus, foi quem obteve o menor valor em vendas. Sabendo que o valor das vendas feitas por Pedro foi 90% do valor das vendas feitas por Marcos e que o valor total das vendas feitas por esses três vendedores foi R$ 900.000,00, o bônus recebido pelo funcioná-rio que obteve o maior valor em vendas foi",
      "img": null,
      "alt": {
        "A": "R$ 5.000,00",
        "B": "R$ 6.500,00",
        "C": "R$ 6.000,00",
        "D": "R$ 5.500,00",
        "E": "R$ 7.000,00"
      }
    },

    // ── QUESTÃO 13 ──
    {
      "num": 13,
      "enunciado": "O mostrador de um relógio digital possui um recurso gráfico visual que auxilia na contagem do tempo. Esse recurso consiste basicamente em um pequeno display circular segmentado em cinco partes iguais, conforme a figura. No sentido horário, a cada segundo, uma das cinco partes é acesa. Após todas as cinco partes estarem acesas, a contagem dos segundos continua, porém agora as partes são apagadas uma a uma, na mesma sequência. O processo se repete indefinidamente.\nConsiderando que no início da contagem dos segundos o display circular esteja totalmente apagado, durante o período de 1 minuto esse display ficará totalmente aceso",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-GERAIS/questions/q61.png",
      "alt": {
        "A": "1 vez",
        "B": "10 vezes",
        "C": "6 vezes",
        "D": "3 vezes",
        "E": "5 vezes"
      }
    },

    // ── QUESTÃO 14 ──
    {
      "num": 14,
      "enunciado": "Uma fábrica de biscoitos comercializa seus produtos em 2 tipos de embalagens, uma com 12 biscoitos e a outra com 20 biscoitos. Essa fábrica recebeu uma encomenda de 550 embalagens desses biscoitos, de modo que a razão entre o número de embalagens com 20 biscoitos e o número de embalagens com 12 biscoitos era 5/6. O número total de biscoitos dessa encomenda foi",
      "img": null,
      "alt": {
        "A": "8600",
        "B": "9000",
        "C": "8200",
        "D": "7800",
        "E": "7500"
      }
    },

    // ── QUESTÃO 15 ──
    {
      "num": 15,
      "enunciado": "Considere o quadrado ABCD de 4 cm de lado, com os pontos M e N sobre o lado BC, sendo M o ponto médio do lado BC, NC = 1 cm e o ponto E a intersecção dos segmentos DM e AN, conforme mostra a figura.\nA área do quadrilátero CDEN, destacado na figura, é igual a",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-ESPECIFICOS/questions/q2.png",
      "alt": {
        "A": "4,0 cm^2",
        "B": "3,8 cm^2",
        "C": "4,2 cm^2",
        "D": "3,6 cm^2",
        "E": "4,4 cm^2"
      }
    },

    // ── QUESTÃO 16 ──
    {
      "num": 16,
      "enunciado": "Considere a função f(x) = 5 - √2 · cos(x/4). O valor de f(π) é igual a",
      "img": null,
      "alt": {
        "A": "1",
        "B": "5",
        "C": "4",
        "D": "2",
        "E": "3"
      }
    },

    // ── QUESTÃO 17 ──
    {
      "num": 17,
      "enunciado": "Uma papelaria comercializa 4 tipos diferentes de lapiseiras, L1, L2, L3 e L4, sendo que os preços das lapiseiras L1, L2 e L3, nessa ordem,formam uma progressão aritmética (PA) de razão 6, e os preços das lapiseiras L1, L2 e L4, nessa ordem, formam uma progressão geométrica (PG). Sabendo que a diferença entre os preços das lapiseiras L4 e L1 é R$ 15,00, a razão dessa PG é",
      "img": null,
      "alt": {
        "A": "2",
        "B": "1,5",
        "C": "1",
        "D": "0,75",
        "E": "0,5"
      }
    },

    // ── QUESTÃO 18 ──
    {
      "num": 18,
      "enunciado": "Em uma sala de aula há determinado número de alunos, sendo que 2 deles escrevem com as duas mãos, 4 alunos só escrevem com a mão esquerda e os demais só escrevem com a mão direita. Sorteando-se aleatoriamente um aluno dessa sala, a probabilidade de que ele escreva com a mão esquerda é 3/20. O número de alunos dessa sala que escrevem com a mão direita é",
      "img": null,
      "alt": {
        "A": "38",
        "B": "40",
        "C": "34",
        "D": "32",
        "E": "36"
      }
    },

    // ── QUESTÃO 19 ──
    {
      "num": 19,
      "enunciado": "Considere as funções f(x) = x/3 + b e g(x) = x^2 -bx + 1, em que b é um número real. Sabendo que f(6) = 4, as coordenadas do vértice da parábola descrita pela função g(x) são:",
      "img": null,
      "alt": {
        "A": "(1, 0)",
        "B": "(-1, 0)",
        "C": "(-1, -1)",
        "D": "(1, 1)",
        "E": "(0, -1)"
      }
    },

    // ── QUESTÃO 20 ──
    {
      "num": 20,
      "enunciado": "Em determinada loja, na compra de uma unidade de cada um dos produtos P e Q, gasta-se o valor total de R$ 80,00. Após redução de 10% no preço do produto P e aumento de 50% no preço do produto Q, os preços unitários desses produtos passaram a ser os mesmos. Nessas condições, a diferença entre os preços desses produtos, antes das alterações, era de",
      "img": null,
      "alt": {
        "A": "R$ 15,00",
        "B": "R$ 10,00",
        "C": "R$ 5,00",
        "D": "R$ 20,00",
        "E": "R$ 25,00"
      }
    },

    // ── QUESTÃO 21 ──
    {
      "num": 21,
      "enunciado": "Em determinada escola, os alunos das turmas P, Q, R e S, de uma mesma série, compraram convites para uma festa beneficente. A tabela mostra o número de convites comprados por aluno nas turmas P, Q e R.\nConsiderando-se o número total de convites comprados pelos alunos das quatro turmas, na média, cada um comprou 4,5 convites. Portanto, cada aluno da turma S comprou um número de convites igual a",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-ESPECIFICOS/questions/q8.png",
      "alt": {
        "A": "2",
        "B": "1",
        "C": "5",
        "D": "3",
        "E": "4"
      }
    },

    // ── QUESTÃO 22 ──
    {
      "num": 22,
      "enunciado": "Uma pessoa fez o empréstimo de determinada quantia e, sobre esse valor, pagou uma taxa de juros simples de 8% ao mês. Após 5 meses, esse empréstimo foi quitado, e o valor total pago, incluindo os juros, foi R$ 3.500,00. O valor total dos juros cobrados foi",
      "img": null,
      "alt": {
        "A": "R$ 1.000,00",
        "B": "R$ 1.400,00",
        "C": "R$ 1.200,00",
        "D": "R$ 700,00",
        "E": "R$ 500,00"
      }
    },

    // ── QUESTÃO 23 ──
    {
      "num": 23,
      "enunciado": "Os 7 atletas de uma equipe de natação, entre eles 2 campeões olímpicos, vão se posicionar lado a lado para uma foto, de maneira que um dos campeões olímpicos fique à esquerda da foto e outro fique à direita. Nessas condições, o número de maneiras diferentes de esses atletas se posicionarem para a foto é",
      "img": null,
      "alt": {
        "A": "5040",
        "B": "120",
        "C": "720",
        "D": "240",
        "E": "360"
      }
    },

    // ── QUESTÃO 24 ──
    {
      "num": 24,
      "enunciado": "Em um plano cartesiano, os gráficos descritos pelas funções f(x) = x + 1/2 e g(x) = 2^x-2 se intersectam, no primeiro quadrante, no ponto P(a, b).\nSabendo que f(a) = 2, o valor de g(a + b) é igual a:",
      "img": "assets/documents/MACRO/2024/CONHECIMENTOS-ESPECIFICOS/questions/q11.png",
      "alt": {
        "A": "4",
        "B": "8",
        "C": "2",
        "D": "1",
        "E": "1/2"
      }
    },

    // ── QUESTÃO 25 ──
    {
      "num": 25,
      "enunciado": "Um sólido, no formato de um cilindro circular reto, tem volume igual a 54π cm^3, e sua área lateral (AL) é calculada pela expressão AL = 2π ⋅ R ⋅ H, em que R e H são, respectivamente, o raio da base e a altura do cilindro. Sabendo que a medida da altura desse cilindro é o dobro da medida do raio da sua base, a área lateral desse cilindro é",
      "img": null,
      "alt": {
        "A": "36π cm^2",
        "B": "27π cm^2",
        "C": "32π cm^2",
        "D": "40π cm^2",
        "E": "42π cm^2"
      }
    }

  ] // fim de questoes
};
