// js/data/sis2_mat.js — Questões de Matemática SIS 2ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/SIS/2/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/SIS/2/<ano>/questions/
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const SIS2_MAT = {
  prova: 'SIS 2ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 8,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "E" ,      "2": "B" ,      "3": "A" ,      "4": "C" ,      "5": "D" ,
        "6": "A" ,      "7": "D" ,      "8": "B"
    },
    "2024": {
        "1": "C" ,      "2": "D" ,      "3": "E" ,      "4": "B" ,      "5": "A" ,
        "6": "E" ,      "7": "C" ,      "8": "C"
    },
    "2025": {
        "1": "C" ,      "2": "E" ,      "3": "B" ,      "4": "C" ,      "5": "D" ,
        "6": "A" ,      "7": "B" ,      "8": "A"
    }
  },

  // ── ASSUNTOS (por ano) ──────────────────────────────────────
  assuntos: {
    "2023": {
        "1": "Funções Logarítmicas – Gráfico",
        "2": "Funções – Análise de Algoritmo",
        "3": "Sequências – PA",
        "4": "Geometria Espacial – Volume (Prisma de Base Pentagonal)",
        "5": "Estatística – Gráfico de Setores",
        "6": "Trigonometria – Funções Trigonométricas",
        "7": "Geometria Espacial – Cilindro (Seção)",
        "8": "Estatística – Média e Desvio Padrão"
    },
    "2024": {
        "1": "Sequências – PA",
        "2": "Grandezas Proporcionais – Produção",
        "3": "Funções do 1º Grau – Gráfico",
        "4": "Juros Simples",
        "5": "Geometria Espacial – Volume (Paralelepípedo)",
        "6": "Geometria Plana – Área (Trapézio)",
        "7": "Estatística – Média e Desvio Padrão",
        "8": "Álgebra – Equação do 1º Grau"
    },
    "2025": {
        "1": "Porcentagem – Tabela e Comparação",
        "2": "Grandezas Proporcionais – Regra de Três Composta",
        "3": "Geometria Espacial – Volume (Prisma de Base Quadrada)",
        "4": "Funções do 1º Grau – Análise de Gráfico",
        "5": "Grandezas Proporcionais – Velocidade Média",
        "6": "Funções – Análise de Algoritmo",
        "7": "Geometria Espacial – Poliedros (Euler)",
        "8": "Estatística – Média Aritmética"
    }
  },

  // ── QUESTÕES (por ano) ──────────────────────────────────────
  questoes: {
    "2023": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Considere a função definida f:R* -> R por f(x) = log^4 x e o esboço de seu gráfico no plano cartesiano, que destaca também, por meio da linha tracejada, os pontos do plano cuja ordenada é 4.\nO valor de x para o qual f(x) = 4 é",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q37.png",
      "alt": {
        "A": "16",
        "B": "32",
        "C": "64",
        "D": "128",
        "E": "256"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Considere as seguintes funções de uma linguagem de programação e a explicação de seu uso:\n  Resto10(y); essa função recebe uma variável y representando um número real, calcula o resto da divisão de y por 10 e armazena o resultado na variável y. Por exemplo, se y = 23, após a execução de Resto10(y), o valor da variável y será 3, pois o resto da divisão de 23 por 10 é 3.\n•  Soma(y, q); essa função recebe uma variável y e um número q e executa a soma y + q, armazenando o resultado na variável y. Por exemplo, supondo-se que a variável y esteja armazenando o número 12; após a execução de Soma(y, 3), o valor da variável y passará a ser 15, pois 12 + 3 = 15.\nNessa linguagem, a instrução Repete n {...} executa todos os comandos entre chaves n vezes, em que n é uma variável que armazena um número inteiro. Considere o seguinte código escrito nessa linguagem:\nAo fim da execução desse código, o valor da variável y será",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q38.png",
      "alt": {
        "A": "12",
        "B": "20",
        "C": "24",
        "D": "36",
        "E": "40"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Em uma progressão aritmética com 30 termos, a soma dos 2 maiores termos é 139. Sabendo que a razão dessa progressão é 3, a soma dos seus 2 menores termos é",
      "img": null,
      "alt": {
        "A": "-29",
        "B": "-10",
        "C": "0",
        "D": "23",
        "E": "49"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um prisma reto tem por base um pentágono com dois ângulos retos, conforme mostra a figura 1.\nO volume desse prisma é igual a 168 cm3 e a figura 2 mostra uma vista desse prisma quando está apoiado sobre um dos pentágonos.\nA área total desse prisma é",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q40.png",
      "alt": {
        "A": "140 cm^2",
        "B": "164 cm^2",
        "C": "188 cm^2",
        "D": "212 cm^2",
        "E": "236 cm^2"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "A distribuição das idades dos 80 alunos de uma escola está representada por um gráfico de setores.\nA média das idades desses 80 alunos é",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q41.png",
      "alt": {
        "A": "15,5 anos",
        "B": "15,8 anos",
        "C": "16 anos",
        "D": "16,2 anos",
        "E": "16,5 anos"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Considere o gráfico da função trigonométrica f(x) = a⋅ cos x + b, em que a e b são constantes reais.\nO valor de a + b é igual a",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q42.png",
      "alt": {
        "A": "3",
        "B": "4",
        "C": "5",
        "D": "7",
        "E": "10"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Em um cilindro reto, sua secção transversal é um círculo de raio 6 cm e sua secção meridiana é um retângulo de área 96 cm2.\nA altura desse cilindro é",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q43.png",
      "alt": {
        "A": "6π cm",
        "B": "16 cm",
        "C": "4π cm",
        "D": "8 cm",
        "E": "6 cm"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "A média dos números de calçados de 20 jogadores de uma equipe de boliche é 41 e os números desses 20 calçados estão registrados na tabela:\nSeja M a moda dos números dessa tabela. Se os jogadores dessa equipe cujos números de calçados são menores do que 40 forem substituídos por jogadores cuja numeração de calçado é M, a nova média dos números dos 20 calçados será",
      "img": "assets/documents/SIS/2023/2-ETAPA/questions/q44.png",
      "alt": {
        "A": "41,5",
        "B": "41,75",
        "C": "42",
        "D": "42,25",
        "E": "42,5"
      }
    }
    ],
    "2024": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma progressão aritmética (PA) é formada por 21 termos, sendo –5 o primeiro termo e 19 o último termo. A razão dessa PA é",
      "img": null,
      "alt": {
        "A": "0,6",
        "B": "0,8",
        "C": "1,2",
        "D": "1,4",
        "E": "1,6"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Em uma fábrica 6 máquinas, com a mesma capacidade de produção e funcionando simultaneamente, produzem 504 peças em 7 horas. Considerando condições proporcionais de produção, o número necessário dessas máquinas para a produção de 480 dessas peças em 5 horas é",
      "img": null,
      "alt": {
        "A": "5",
        "B": "6",
        "C": "7",
        "D": "8",
        "E": "9"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "No plano cartesiano está representado o gráfico correspondente à função polinomial de 1o grau f(x) = mx + q, em quem e q são constantes reais.\nO valor da diferença m – q é igual a:",
      "img": "assets/documents/SIS/2024/2-ETAPA/questions/q39.png",
      "alt": {
        "A": "-5/3",
        "B": "-1",
        "C": "2/3",
        "D": "2",
        "E": "3"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "A quantia de R$ 40.000,00 será aplicada a uma taxa de 1,6% de juros simples ao mês. O tempo que essa quantia deverá ficar aplicada para que o montante totalize R$ 54.080,00 é de",
      "img": null,
      "alt": {
        "A": "1 ano e 7 meses",
        "B": "1 ano e 10 meses",
        "C": "2 anos e 2 meses",
        "D": "2 anos e 6 meses",
        "E": "2 anos e 11 meses"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Uma das faces de um paralelepípedo retorretângulo tem 44 cm^2 de área, sendo que nessa face a medida da maior aresta excede a medida da menor aresta em 7 cm. Sabendo que o volume desse paralelepípedo é 308 cm^3, sua área total é",
      "img": null,
      "alt": {
        "A": "298 cm^2",
        "B": "336 cm^2",
        "C": "352 cm^2",
        "D": "412 cm^2",
        "E": "448 cm^2"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Um trapézio ABCD tem ângulos retos nos vértices B e C. Sobre o lado AB desse trapézio está o ponto E, tal que CDE é um triângulo isósceles com m(EDC) = m(ECD), conforme mostra a figura.\nO valor da diferença β – α é igual a:",
      "img": "assets/documents/SIS/2024/2-ETAPA/questions/q42.png",
      "alt": {
        "A": "8º",
        "B": "9º",
        "C": "10º",
        "D": "11º",
        "E": "12º"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "As massas, em gramas, de 15 pacotes de arroz foram registradas em uma tabela.\nConsiderando esses 15 registros, a diferença entre a média aritmética e a mediana é igual a",
      "img": "assets/documents/SIS/2024/2-ETAPA/questions/q43.png",
      "alt": {
        "A": "0 g",
        "B": "0,3 g",
        "C": "0,6 g",
        "D": "0,9 g",
        "E": "1,2 g"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Uma assistência técnica especializada reparou 100 celulares no mês de fevereiro. O reparo de um celular pode demorar de 1 a 5 dias, e o gráfico registra os números de celulares pelo tempo que demorou o reparo.\nA análise dos dados do gráfico revela que",
      "img": "assets/documents/SIS/2024/2-ETAPA/questions/q44.png",
      "alt": {
        "A": "no dia 3 de fevereiro foi reparado o maior número de celulares",
        "B": "nos dois primeiros dias de fevereiro foram reparados 38 celulares",
        "C": "37% dos celulares levaram mais de 3 dias para o reparo",
        "D": "14 celulares foram reparados no dia de menor movimento da loja",
        "E": "em média foram reparados 20 celulares por dia"
      }
    }
    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma pesquisa foi feita com frequentadores de um centro de compras, dentre os quais havia adultos e crianças. Essa pesquisa perguntou, para cada entrevistado, o principal motivo que o fazia ir ao centro de compras. O gráfico registra as respostas obtidas para os três principais motivos elencados: vestuário, praça de alimentação e cinema.\nCom base nos dados do gráfico, afirma-se que",
      "img": "assets/documents/SIS/2025/2-ETAPA/questions/q37.png",
      "alt": {
        "A": "108 famílias responderam à pesquisa",
        "B": "o número de crianças entrevistadas foi maior que o nú-mero de adultos entrevistados",
        "C": "um terço das crianças foi ao centro de compras para ir à praça de alimentação",
        "D": "metade dos adultos foi ao centro de compras para ir ao cinema",
        "E": "4 crianças, desacompanhadas dos responsáveis, foram ao centro de compras para ir a lojas de vestuário"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Uma biblioteca possui 612 livros raros que são constantemente solicitados para consulta. A fim de minimizar o manuseio desses exemplares, todos passarão por um processo de digitalização e serão disponibilizados online, sendo cada livro processado por apenas uma pessoa. Essa biblioteca tem 3 funcionários especializados no trabalho de digitalização, e cada um deles demora 4 horas para digitalizar 1 livro. Os 3 funcionários trabalharão nos mesmos dias para executar essa tarefa, e cada um trabalhará na digitalização durante 8 horas por dia. Nessas condições, o número de dias necessários para que os 612 livros raros sejam digitalizados é",
      "img": null,
      "alt": {
        "A": "54",
        "B": "66",
        "C": "78",
        "D": "90",
        "E": "102"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "O volume de um prisma reto é igual a 198 cm^3. Sabendo que a base desse prisma é um quadrado de 36 cm^2 de área, a soma das áreas de todas as faces do prisma que não são quadradas é igual a",
      "img": null,
      "alt": {
        "A": "126 cm^2",
        "B": "132 cm^2",
        "C": "144 cm^2",
        "D": "162 cm^2",
        "E": "168 cm^2"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Considere que m representa uma constante real. No plano cartesiano, está representado o gráfico da função polinomial do 2o grau f(x) = -x^2 + 10x + m, destacando que o ponto (3, 5) pertence a esse gráfico.\nO valor de f(5) é",
      "img": "assets/documents/SIS/2025/2-ETAPA/questions/q40.png",
      "alt": {
        "A": "3",
        "B": "6",
        "C": "9",
        "D": "12",
        "E": "15"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Uma reforma foi feita em uma estrada que liga as cidades A e B. A reforma foi feita da cidade A para a cidade B e as condi-ções da estrada eram tais que, para reformar os 2 primeiros quilômetros de estrada, foram necessários 3 dias, depois, para reformar os próximos 2 quilômetros, foram necessários 6 dias, e cada trecho seguinte de 2 quilômetros levou 3 dias a mais de trabalho do que para os 2 quilômetros anteriores. Se o comprimento dessa estrada é de 30 km, o número de dias que levou essa reforma foi",
      "img": null,
      "alt": {
        "A": "40",
        "B": "90",
        "C": "180",
        "D": "360",
        "E": "420"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Em um código de programação escrito em linguagem natural, o comando Aumente o valor da variável Receita em Entrada soma os valores das variáveis Receita e Entrada e guarda o resultado na variável Receita. Considere o seguinte código de programação, escrito em linguagem natural.\nApós a execução desse código, o valor da variável Receita excede o valor da variável Despesa em",
      "img": "assets/documents/SIS/2025/2-ETAPA/questions/q42.png",
      "alt": {
        "A": "10",
        "B": "20",
        "C": "30",
        "D": "40",
        "E": "50"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Em uma pirâmide, seja V seu número de vértices e seja A seu número de arestas. Sabendo que V + A = 58, o número de lados do polígono que forma a base dessa pirâmide é igual a",
      "img": null,
      "alt": {
        "A": "18",
        "B": "19",
        "C": "20",
        "D": "21",
        "E": "22"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "No início de 2024, a média das alturas de Fábio e de seus filhos Gustavo e Henrique era igual a 159 cm, e a média das alturas de Gustavo e Henrique era 148,5 cm. Ao longo de 2024, cada um dos filhos de Fábio cresceu 9 cm, de maneira que, no fim de 2024, Gustavo tinha a mesma altura de seu pai. Sabendo que a altura de Fábio permaneceu igual ao longo de 2024, a altura de Henrique no fim de 2024 era",
      "img": null,
      "alt": {
        "A": "135 cm",
        "B": "140 cm",
        "C": "144 cm",
        "D": "153 cm",
        "E": "162 cm"
      }
    }
    ]
  } // fim de questoes
};
