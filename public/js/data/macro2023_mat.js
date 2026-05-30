// js/data/macro2023_mat.js — Questões de Matemática MACRO 2023
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...", ← texto completo do enunciado
//    "img": "assets/documents/MACRO/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/MACRO/2023/questions/
//    - Nomeie como: q<num>.png  (ex: q1.png, q41.png)
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const MACRO2023_MAT = {
  prova: 'MACRO 2023',
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
        "1": "A" ,      "2": "A" ,      "3": "C" ,      "4": "D" ,      "5": "E" ,
        "6": "B" ,      "7": "E" ,      "8": "C" ,      "9": "D" ,      "10": "B" ,
        "11": "B" ,      "12": "E" ,      "13": "A" ,      "14": "D" ,      "15": "C" ,
        "16": "B" ,      "17": "B" ,      "18": "D" ,      "19": "D" ,      "20": "C" ,
        "21": "A" ,      "22": "E" ,      "23": "B" ,      "24": "D" ,      "25": "B"
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
      "enunciado": "Uma empresa promoveu uma atividade motivacional na qual estavam presentes 50 funcionários. Todos esses funcionários foram divididos em 3 grupos, A, B e C, de modo que o número de participantes desses grupos era, respectivamente, 15, 17 e 18. Para a realização de determinada tarefa, 100 folhas de papel foram distribuídas entres esses grupos, de maneira diretamente proporcional ao número de participantes de cada grupo. O número de folhas de papel recebidas pelo grupo com o maior número de participantes foi",
      "img": null,
      "alt": {
        "A": "36",
        "B": "42",
        "C": "40",
        "D": "39",
        "E": "35"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Um aluno errou 15% do número total de questões de uma prova e acertou as outras 68 questões. Entre as questões que ele errou, 25% foi por distração no momento de preencher a folha de respostas. Se esse aluno tivesse marcado corretamente as questões que errou por distração no preenchimento, o número total de questões certas, em relação ao número total de questões da prova, corresponderia a",
      "img": null,
      "alt": {
        "A": "88,75%",
        "B": "85,25%",
        "C": "78,50%",
        "D": "90,35%",
        "E": "82,15%"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "O salário de determinado estagiário em uma empresa, em janeiro, era de R$ 1.500,00. Esse salário teve um acréscimo mensal constante, sempre sobre o valor recebido no mês anterior, durante os meses de fevereiro, março, abril e maio. Se o salário no mês de maio foi de R$ 5.000,00, o salário no mês de abril foi de",
      "img": null,
      "alt": {
        "A": "R$ 3.250,00",
        "B": "R$ 4.575,00",
        "C": "R$ 4.125,00",
        "D": "R$ 2.375,00",
        "E": "R$ 2.950,00"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um assinante de TV paga selecionou 6 filmes para assistir, porém sem ordem de preferência. Sabendo que em um domingo esse assinante assistirá a 2 desses filmes selecionados, o número de maneiras distintas de ele fazer essa escolha é",
      "img": null,
      "alt": {
        "A": "10",
        "B": "30",
        "C": "12",
        "D": "15",
        "E": "24"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Em um plano cartesiano, a parábola descrita pela função quadrática f(x) = x^2 - 4x + 3 tem vértice no ponto V, de abscissa 2, e passa pelo ponto P de abscissa 4.\nA reta que passa pelos pontos P e V intersecta o eixo y no ponto de ordenada igual a",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q53.png",
      "alt": {
        "A": "-2",
        "B": "-1",
        "C": "-4",
        "D": "-3",
        "E": "-5"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "O interior do quadrado ABCD foi dividido em 3 quadrados menores, Q1, Q2 e Q3, e 2 polígonos, P1 e P2, conforme figura.\nSabendo que as áreas dos quadrados Q1, Q2 e Q3 são, respectivamente, 16 cm2, 1 cm2 e 9 cm2, o perímetro do polígono P1, destacado na figura, é",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q54.png",
      "alt": {
        "A": "16 cm",
        "B": "18 cm",
        "C": "14 cm",
        "D": "15 cm",
        "E": "12 cm"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Uma faculdade oferece dois cursos de especialização, P e Q. A tabela apresenta algumas informações sobre o número de matriculados e o número de aprovados em cada curso.\nSe no curso Q houvesse um aluno a mais matriculado do que o curso P e esse aluno não tivesse sido aprovado, a razão do número de alunos matriculados para o número de alunos aprovados no curso Q seria a mesma que no curso P. A soma do número de alunos matriculados nesses dois cursos é",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q55.png",
      "alt": {
        "A": "80",
        "B": "100",
        "C": "95",
        "D": "85",
        "E": "90"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Em uma caneca, no formato de um cubo com arestas internas medindo 7 cm, foram colocados 245 mL de café, que não preencheram totalmente a caneca, restando ainda um espa-ço entre a superfície do café e a borda superior da caneca, conforme figura.\nA distância entre a altura do café, no interior da caneca, e a borda superior da caneca, indicada na figura pela letra d, é igual a",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q56.png",
      "alt": {
        "A": "3 cm",
        "B": "4 cm",
        "C": "2 cm",
        "D": "5 cm",
        "E": "1 cm"
      }
    },

    // ── QUESTÃO 9 ──
    {
      "num": 9,
      "enunciado": "Considere as funções polinomiais do 1o grau f(x) = 2x + 3 e g(x) = -x + 6. Sobre essas funções, afirma-se que",
      "img": null,
      "alt": {
        "A": "possuem pontos de máximo",
        "B": "são crescentes",
        "C": "possuem domínios diferentes",
        "D": "têm o ponto (1,5) em comum",
        "E": "suas representações gráficas não se intersectam"
      }
    },

    // ── QUESTÃO 10 ──
    {
      "num": 10,
      "enunciado": "Determinado produto é vendido por 5 sites diferentes na internet, P, Q, R, S e T. A tabela apresenta o valor desse produto em 4 desses sites.\nSabendo que o preço desse produto no site R é R$ 13,00 a menos do que a média aritmética dos preços nesses 5 sites, então, a diferença entre o maior e o menor preço desse produto, nesses sites, é",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q58.png",
      "alt": {
        "A": "R$ 15,00",
        "B": "R$ 20,00",
        "C": "R$ 22,00",
        "D": "R$ 12,00",
        "E": "R$ 18,00"
      }
    },

    // ── QUESTÃO 11 ──
    {
      "num": 11,
      "enunciado": "Considere o retângulo ABCD e o triângulo retângulo BEF, com a hipotenusa BF intersectando o lado DC do retângulo, no ponto Q, e os pontos B, C e E alinhados, conforme a figura.\nSabendo que EF = 8 cm, BE = 15 cm, CE = 6 cm e DQ = 1,2 cm, a área do retângulo ABCD é igual a",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-GERAIS/questions/q59.png",
      "alt": {
        "A": "72,0 cm^2",
        "B": "54,0 cm^2",
        "C": "63,0 cm^2",
        "D": "67,5 cm^2",
        "E": "58,5 cm^2"
      }
    },

    // ── QUESTÃO 12 ──
    {
      "num": 12,
      "enunciado": "Uma pessoa fez uma compra no valor de R$ 1.500,00 e pagou-a em uma só vez, 3 meses depois. Sobre esse valor foi cobrada, mensalmente, uma taxa de juros simples, de modo que, após esses 3 meses, o valor pago foi R$ 1.527,00. A taxa mensal de juros simples cobrada foi",
      "img": null,
      "alt": {
        "A": "0,7%",
        "B": "0,4%",
        "C": "0,8%",
        "D": "0,5%",
        "E": "0,6%"
      }
    },

    // ── QUESTÃO 13 ──
    {
      "num": 13,
      "enunciado": "Um motorista faz uma viagem de carro por uma rodovia cuja velocidade máxima permitida é de 110 km/h. Durante a viagem, o motorista repara que o velocímetro de seu carro está quebrado, o que impede que a velocidade do automóvel seja monitorada ao longo do percurso. Ao chegar a seu destino, o motorista percebe que levou 2,5 horas para fazer a viagem. Sabendo que o caminho percorrido foi de 300 km e que a rodovia possui monitoramento de velocidade por toda sua extensão, o motorista",
      "img": null,
      "alt": {
        "A": "receberá uma multa, pois a velocidade média do carro foi de 120 km/h",
        "B": "receberá uma multa, pois a velocidade média do carro foi de 130 km/h",
        "C": "não receberá uma multa, pois a velocidade média do carro foi de 110 km/h",
        "D": "receberá uma multa, pois a velocidade média do carro foi de 150 km/h",
        "E": "não receberá uma multa, pois a velocidade média do carro foi de 90 km/h"
      }
    },

    // ── QUESTÃO 14 ──
    {
      "num": 14,
      "enunciado": "Em uma indústria, a máquina A pinta 5 peças em 2 minutos e a máquina B pinta 7 peças em 3 minutos, ambas as máquinas trabalhando sem interrupções. Nessas mesmas condições e mantida sempre essa mesma proporcionalidade, se essas duas máquinas trabalharem simultaneamente durante 1 hora e 12 minutos, o número de peças que a máquina A irá pintar a mais do que a máquina B será",
      "img": null,
      "alt": {
        "A": "6",
        "B": "10",
        "C": "14",
        "D": "12",
        "E": "8"
      }
    },

    // ── QUESTÃO 15 ──
    {
      "num": 15,
      "enunciado": "Em um plano cartesiano, a parábola descrita pela função f(x) = – x2 + bx + c, em que b e c são números reais, inter secta os eixos coordenados nos pontos M, N e T, e as coordenadas do ponto de máximo V são (1, 4).\nA equação da reta que passa pelos pontos N e T é dada por",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-ESPECIFICOS/questions/q2.png",
      "alt": {
        "A": "y = – x – 1",
        "B": "y = x + 2",
        "C": "y = – x + 3",
        "D": "y = x + 5",
        "E": "y = – x + 4"
      }
    },

    // ── QUESTÃO 16 ──
    {
      "num": 16,
      "enunciado": "As notas de matemática obtidas por um estudante na 1a, 2a e 3a provas do ano formam, nessa ordem, uma progressão aritmética de razão 3. Se o estudante tivesse obtido um ponto a mais na 1a prova e mantivesse as mesmas notas da 2a e da 3a provas, essa nova sequência de notas, nessa ordem, formaria uma progressão geométrica de razão . A nota obtida por ele na 3a prova foi",
      "img": null,
      "alt": {
        "A": "6",
        "B": "9",
        "C": "8",
        "D": "7",
        "E": "10"
      }
    },

    // ── QUESTÃO 17 ──
    {
      "num": 17,
      "enunciado": "O ponto A (5, 4) pertence à função f(x) = 2x – k, e o ponto B (2, 4) pertence à função g(x) = k · x + c, em que c e k são números reais. O valor de f(k) + g(1) é",
      "img": null,
      "alt": {
        "A": "3",
        "B": "2",
        "C": "0",
        "D": "4",
        "E": "1"
      }
    },

    // ── QUESTÃO 18 ──
    {
      "num": 18,
      "enunciado": "Um grupo de 9 amigos irá viajar em dois carros. No carro maior irão 5 pessoas e no carro menor irão 4 pessoas. Sabendo que todos sabem dirigir, o número de maneiras distintas de esses 9 amigos se dividirem entre esses dois carros é",
      "img": null,
      "alt": {
        "A": "98",
        "B": "63",
        "C": "82",
        "D": "126",
        "E": "120"
      }
    },

    // ── QUESTÃO 19 ──
    {
      "num": 19,
      "enunciado": "Considere o retângulo ABCD, de diagonal BD, e o quadrado EFGH, cujas áreas são, respectivamente, iguais a 32 cm2 e 16 cm2. Os vértices do quadrado estão sobre os lados do retângulo, e a diagonal BD intersecta os lados do quadrado nos pontos P e Q, conforme mostra a figura.\nSabendo que os segmentos AE e FB possuem a mesma medida, a área do trapézio GHPQ, destacado na figura, é igual a",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-ESPECIFICOS/questions/q6.png",
      "alt": {
        "A": "8,5 cm^2",
        "B": "9,5 cm^2",
        "C": "9,0 cm^2",
        "D": "8,0 cm^2",
        "E": "10,0 cm^2"
      }
    },

    // ── QUESTÃO 20 ──
    {
      "num": 20,
      "enunciado": "Considere a função f(x) = 4 · sen (2x). O valor de f(π/3) é",
      "img": null,
      "alt": {
        "A": "√2/2",
        "B": "√3/2",
        "C": "2√3",
        "D": "2√2",
        "E": "√3"
      }
    },

    // ── QUESTÃO 21 ──
    {
      "num": 21,
      "enunciado": "Considere o polinômio p(x) = 3x3 – kx2 – 5x + 1, em que k é um número real. Se p(–1) = 1, o valor de p(k) é igual a",
      "img": null,
      "alt": {
        "A": "7",
        "B": "6",
        "C": "8",
        "D": "5",
        "E": "4"
      }
    },

    // ── QUESTÃO 22 ──
    {
      "num": 22,
      "enunciado": "A medida da altura de um prisma reto de base quadrada é o triplo da medida da aresta da base, conforme mostra a figura.\nSabendo que a soma das medidas das 12 arestas desse prisma é 80 cm, seu volume é",
      "img": "assets/documents/MACRO/2023/CONHECIMENTOS-ESPECIFICOS/questions/q9.png",
      "alt": {
        "A": "216 cm^3",
        "B": "144 cm^3",
        "C": "120 cm^3",
        "D": "168 cm^3",
        "E": "192 cm^3"
      }
    },

    // ── QUESTÃO 23 ──
    {
      "num": 23,
      "enunciado": "A média aritmética das notas das cinco melhores provas de matemática de uma turma é 8,0. Sabendo que somente duas dessas notas são iguais e que a média aritmética das outras três notas é 7,0, a nota que aparece repetida é",
      "img": null,
      "alt": {
        "A": "8,0",
        "B": "9,5",
        "C": "7,5",
        "D": "9,0",
        "E": "8,5"
      }
    },

    // ── QUESTÃO 24 ──
    {
      "num": 24,
      "enunciado": "Uma pessoa colocou um capital de R$ 2.000,00 em uma aplicação financeira, a juros simples, durante 15 meses. Após esses 15 meses, essa pessoa retirou o montante (capital +juros) e utilizou 30% desse valor, restando ainda R$ 1.568,00 do valor retirado. A taxa mensal de juros simples dessa aplicação era de",
      "img": null,
      "alt": {
        "A": "0,9%",
        "B": "1,0%",
        "C": "0,6%",
        "D": "0,8%",
        "E": "0,7%"
      }
    },

    // ── QUESTÃO 25 ──
    {
      "num": 25,
      "enunciado": "Em uma urna há 5 bolas vermelhas e as demais bolas são amarelas, de modo que, ao retirar-se aleatoriamente uma bola dessa urna, a probabilidade de ela ser amarela é 2/3. O número total de bolas que há nessa urna é",
      "img": null,
      "alt": {
        "A": "10",
        "B": "15",
        "C": "21",
        "D": "12",
        "E": "18"
      }
    },

  ] // fim de questoes
};
