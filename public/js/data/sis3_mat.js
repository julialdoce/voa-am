// js/data/sis3_mat.js — Questões de Matemática SIS 3ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/SIS/3/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/SIS/3/<ano>/questions/
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const SIS3_MAT = {
  prova: 'SIS 3ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 40,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "D" ,      "2": "B" ,      "3": "A" ,      "4": "C" ,      "5": "B" ,
        "6": "D" ,      "7": "E" ,      "8": "C"
    },
    "2024": {
        "1": "D" ,      "2": "B" ,      "3": "B" ,      "4": "A" ,      "5": "D" ,
        "6": "C" ,      "7": "E" ,      "8": "E"
    },
    "2025": {
        "1": "E" ,      "2": "C" ,      "3": "D" ,      "4": "B" ,      "5": "A" ,
        "6": "C" ,      "7": "D" ,      "8": "E"
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
      "enunciado": "Sejam m e n duas constantes reais e sejam A = (m, 4) e B = (6, n) dois pontos do plano cartesiano. Se r = AB é a reta de equação 5x - 4y + 6 = 0, então o valor de m + n é",
      "img": null,
      "alt": {
        "A": "1",
        "B": "7",
        "C": "10",
        "D": "11",
        "E": "15"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "No plano cartesiano, os quadrados ABCD e EFGH são congruentes e têm lados paralelos aos eixos, conforme mostra a figura.\nDados B = (-1, 2), C = (2, 2) e F = (5, 5), a equação da reta que passa pelos pontos D e H é",
      "img": "assets/documents/SIS/2023/3-ETAPA/questions/q38.png",
      "alt": {
        "A": "x - y - 5 = 0",
        "B": "x - 2y - 4 = 0",
        "C": "x - 2y - 5 = 0",
        "D": "2x - y - 4 = 0",
        "E": "2x - y - 5 = 0"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Considere o número complexo z = 3i, em que i^2 = -1, e as constantes reais m e n. Definindo y como o número complexo y = m + ni e sabendo que yz = 6 + 15i, o valor de m + n é igual a",
      "img": null,
      "alt": {
        "A": "3",
        "B": "4",
        "C": "5",
        "D": "6",
        "E": "7"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "No plano complexo estão representados o afixo P de um número complexo z e seu módulo |z|.\nA forma trigonométrica de z é",
      "img": "assets/documents/SIS/2023/3-ETAPA/questions/q40.png",
      "alt": {
        "A": "z = 7(cos 30º + isen 30º)",
        "B": "z = 14(cos 30º + isen 30º)",
        "C": "z = 28(cos 30º + isen 30º)",
        "D": "z = 14(cos 60º + isen 60º)",
        "E": "z = 7(cos 60º + isen 60º)"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "As raízes do polinômio p(x) = x^2 - x - 20 também são raízes do polinômio q(x) = x^3 - 4x^2 - 17x + 60. A soma das duas maiores raízes de q(x) é igual a",
      "img": null,
      "alt": {
        "A": "1",
        "B": "8",
        "C": "20",
        "D": "25",
        "E": "40"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "As notas que 12 alunos tiraram em certa avaliação escolar estão tabeladas a seguir.\nSeja M a média aritmética dessas 12 notas. Considere uma nova tabela construída a partir da tabela dada em que a maior e a menor nota foram excluídas; seja m a média aritmética das 10 notas dessa nova tabela. O valor de m - M é igual a",
      "img": "assets/documents/SIS/2023/3-ETAPA/questions/q42.png",
      "alt": {
        "A": "0,5",
        "B": "0,6",
        "C": "0,7",
        "D": "0,8",
        "E": "0,9"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Dado o polinômio r(x) = x^4 - 10x^3 + px^2 + 52x + q, em que p e q são constantes reais, sabe-se que -1 é uma raiz de multiplicidade 2. Se as outras duas raízes desse polinômio são tais que uma é o dobro da outra, o valor de q - p é",
      "img": null,
      "alt": {
        "A": "15",
        "B": "17",
        "C": "19",
        "D": "21",
        "E": "23"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Uma prova com 10 testes foi aplicada para os 301 alunos de uma escola. Nessa prova, os alunos acertaram pelo menos 3 testes e ninguém acertou exatamente 8 testes. Considere o gráfico que indica o número de alunos por número de testes certos.\nDe acordo com os dados apresentados, a mediana e a moda dos números de testes certos nessa prova foram, respectivamente,",
      "img": "assets/documents/SIS/2023/3-ETAPA/questions/q44.png",
      "alt": {
        "A": "4 e 9",
        "B": "5 e 7",
        "C": "6 e 7",
        "D": "6,5 e 7",
        "E": "7 e 6,5"
      }
    }
    ],
    "2024": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Considere a matriz B = (bij)2×3, tal que bij = i + 2j – 2. SejamM e m, respectivamente, o maior e o menor elemento damatriz B. A diferença M – m é igual a",
      "img": null,
      "alt": {
        "A": "-12",
        "B": "-4",
        "C": "0",
        "D": "5",
        "E": "11"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Considere a matriz, em que k é uma constante real. Seja D o determinante da matriz M. Sabendo que2(D – 3) = –3(9 – k), o valor da constante k é",
      "img": "assets/documents/SIS/2024/3-ETAPA/questions/q38.png",
      "alt": {
        "A": "-42",
        "B": "-3",
        "C": "8",
        "D": "11",
        "E": "14"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Todos os alunos de um curso de geologia farão uma viagem de estudos e, para isso, precisam escolher se farão a viagem de 2 dias, com um custo por aluno de R$ 350,00, ou a viagem de 3 dias, com um custo por aluno de R$ 380,00. O custo total da viagem de 3 dias é R$ 3.540,00 mais caro do que o custo total da viagem em 2 dias. O número de alunos desse curso é",
      "img": null,
      "alt": {
        "A": "60",
        "B": "118",
        "C": "177",
        "D": "236",
        "E": "295"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Um ponto E está no interior de um quadrilátero ABCD de área 32 cm^2 e o divide em 4 triângulos, conforme mostra a figura.\nA área do triângulo ADE é 4 cm^2 a mais do que a área do triângulo CDE. A área do triângulo CDE é 2 cm^2 a mais do que a área do triângulo BCE. Sabendo que os triângulos BCE e ABE têm a mesma área, a altura do triângulo ADE, relativamente ao vértice E, é",
      "img": "assets/documents/SIS/2024/3-ETAPA/questions/q40.png",
      "alt": {
        "A": "3 cm",
        "B": "3,5 cm",
        "C": "4 cm",
        "D": "4,5 cm",
        "E": "5 cm"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Um prisma reto, de base triangular, tem 496 cm^3 de volume e uma de suas bases é a base de uma pirâmide cuja altura é igual à metade da altura do prisma, conforme mostra a figura.\nSabendo que a área da base do prisma é 62 cm^2, a altura da pirâmide tem medida igual a:",
      "img": "assets/documents/SIS/2024/3-ETAPA/questions/q41.png",
      "alt": {
        "A": "4/3 cm",
        "B": "8/3 cm",
        "C": "3 cm",
        "D": "4 cm",
        "E": "14/3 cm"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Considere as retas r e s representadas no plano cartesiano.\nSendo mr o coeficiente angular da reta r e ms o coeficiente angular da reta s, o produto mr·ms é igual a:",
      "img": "assets/documents/SIS/2024/3-ETAPA/questions/q42.png",
      "alt": {
        "A": "-1",
        "B": "-1/6",
        "C": "-2/5",
        "D": "2/3",
        "E": "1"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Uma fila será formada por 6 atletas que representam 6 clubes diferentes, e o atleta que ficar na primeira posição da fila carregará a Bandeira Nacional. A cor do uniforme de 2 desses clubes é predominantemente branca e, por isso, se um desses dois estiver na primeira posição da fila, o outro não pode ficar na sexta posição. Nessas condições, o número de maneiras diferentes de formar essa fila é",
      "img": null,
      "alt": {
        "A": "192",
        "B": "288",
        "C": "480",
        "D": "600",
        "E": "672"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Um jogo on-line é disputado por 8 pessoas, uma delas é a Alice e a outra é o Ricardo, que são irmãos. Uma das fases desse jogo não depende de habilidade, mas sim de um sorteio realizado pelo computador, que bonificará 3 jogadores. Se a chance de cada jogador ser escolhido nesse sorteio é a mesma, a probabilidade de Alice ou Ricardo serem escolhidos é igual a",
      "img": null,
      "alt": {
        "A": "3/4",
        "B": "3/8",
        "C": "5/8",
        "D": "3/11",
        "E": "9/14"
      }
    }
    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma loja possui 3 manequins, dois representando adultos, sendo um maior do que o outro, e um representando uma criança. Esses manequins sempre ficam lado a lado e na mesma posição. A loja recebeu uma nova coleção de roupas de inverno, com 4 modelos de roupas destinados a crianças e 7 modelos de roupas destinados a adultos, dispondo de vá-rias unidades de cada modelo, cada modelo tendo tamanho único. O número de maneiras distintas de vestir esses manequins com os modelos de roupas da nova coleção de inverno, de acordo com a destinação de cada modelo, é igual a",
      "img": null,
      "alt": {
        "A": "18",
        "B": "46",
        "C": "84",
        "D": "168",
        "E": "196"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Um roupeiro é formado por dois prismas retos, um deles no formato de cubo e um deles com uma aresta de medida h. Esses prismas têm dois vértices em comum, de maneira que uma face do cubo está sobre uma face do outro prisma e a medida da aresta do cubo mede o dobro da medida de uma das arestas do outro prisma, conforme mostra a figura.\nSabendo que o roupeiro ocupa um volume de 225000 cm^3 e que x = 25 cm, a medida de h é",
      "img": "assets/documents/SIS/2025/3-ETAPA/questions/q38.png",
      "alt": {
        "A": "50 cm",
        "B": "65 cm",
        "C": "80 cm",
        "D": "125 cm",
        "E": "150 cm"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Sejam A, B e C matrizes do tipo 2 × 3, com\nA soma de todos os elementos da segunda linha da matriz D é igual a",
      "img": "assets/documents/SIS/2025/3-ETAPA/questions/q39.png",
      "alt": {
        "A": "21",
        "B": "31",
        "C": "41",
        "D": "51",
        "E": "61"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Uma gincana foi organizada em uma escola e todos os alunos participaram das duas atividades principais, uma no período da manhã e a outra no período da tarde. As atividades foram realizadas na quadra de esportes e nas 14 salas do bloco azul dessa escola. Na atividade que aconteceu no período da manhã, os alunos do ensino fundamental ficaram na quadra de esportes e os alunos do ensino médio ocuparam todas as salas do bloco azul, da seguinte maneira: 15 alunos em uma das salas e N alunos em cada uma das demais salas. Na atividade que aconteceu no período da tarde, os alunos do ensino fundamental ocuparam todas as salas do bloco azul, e cada sala ficou com o mesmo número de alunos. Nesse período, os alunos do ensino médio ficaram na quadra e foram divididos em 6 equipes, com 3N alunos em cada equipe.\nSabendo que o número de alunos do ensino fundamental excede em 240 o número de alunos do ensino médio, o número de alunos por sala no bloco azul, na atividade que aconteceu no período da tarde, era igual a",
      "img": null,
      "alt": {
        "A": "18",
        "B": "21",
        "C": "24",
        "D": "27",
        "E": "30"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "No plano, a figura F sofrerá uma reflexão em relação à reta r, gerando a imagem F . Em seguida, F sofrerá uma reflexão em relação à reta s, gerando a imagem F.\nA imagem F , em relação às retas r e s, está representada em:",
      "img": "assets/documents/SIS/2025/3-ETAPA/questions/q41.png",
      "alt": {
        "A": "A",
        "B": "B",
        "C": "C",
        "D": "D",
        "E": "E"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Um jogo é disputado por 2 pessoas e começa com a preparação de uma urna contendo 82 bolas numeradas de 1 a 82. Em seguida, cada jogador pega, aleatoriamente e sem reposição, uma bola da urna. Finalmente, uma terceira bola é retirada aleatoriamente da urna. Um jogador é declarado vencedor caso a diferença entre o número da bola que ele retirou e o número da terceira bola seja menor do que a diferença entre o número da bola que o adversário retirou e o número da terceira bola. Nesse jogo, a diferença é sempre entendida como o resultado de um número maior subtraído de um número menor e, caso essa diferença seja igual, o jogo termina em empate. Por exemplo, se o primeiro a pegar uma bola retirar o número 10, o segundo retirar o número 15 e a terceira bola tiver o número 12, o primeiro jogador ganha, pois (12 - 10) < (15 - 12).\nEm uma partida desse jogo, Paulo retirou a bola número 16, César retirou a bola número 60 e a terceira bola será retirada agora. A probabilidade de Paulo vencer o jogo é:",
      "img": null,
      "alt": {
        "A": "1/5",
        "B": "2/5",
        "C": "9/20",
        "D": "11/20",
        "E": "19/40"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Os funcionários que trabalham em uma empresa estão distribuídos em 4 prédios: A, B, C e D. O gráfico de setores indica a porcentagem de funcionários, em relação ao número total de funcionários dessa empresa, que trabalha em cada um dos prédios.\nO ângulo, nesse gráfico, do setor correspondente aos funcionários que trabalham no prédio C é",
      "img": "assets/documents/SIS/2025/3-ETAPA/questions/q43.png",
      "alt": {
        "A": "30,6º",
        "B": "36º",
        "C": "57,4º",
        "D": "64,8º",
        "E": "72º"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Sendo x um número inteiro, as medidas dos lados de um retângulo, em cm, são expressas por (26 + 18x) e (142 - 10x), como mostra a figura.\nSe o perímetro desse retângulo é igual a 464 cm, a diferença entre o lado maior e o lado menor é igual a",
      "img": "assets/documents/SIS/2025/3-ETAPA/questions/q44.png",
      "alt": {
        "A": "176 cm",
        "B": "160 cm",
        "C": "144 cm",
        "D": "116 cm",
        "E": "108 cm"
      }
    }
    ]
  } // fim de questoes
};
