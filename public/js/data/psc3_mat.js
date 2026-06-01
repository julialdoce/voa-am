// js/data/psc3_mat.js — Questões de Matemática PSC 3ª Etapa (2023–2025)
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...",
//    "img": "assets/documents/PSC/3/2023/questions/q1.png",
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
//    - Salve em: public/assets/documents/PSC/3/<ano>/questions/
//    - Nomeie como: q<num>.png
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const PSC3_MAT = {
  prova: 'PSC 3ª Etapa',
  area: 'Matemática',
  anos: [2023, 2024, 2025],
  totalQuestoesPorAno: 6,
  tempoMinutos: 60,

  // ── GABARITO (por ano) ──────────────────────────────────────
  gabarito: {
    "2023": {
        "1": "E" ,      "2": "B" ,      "3": "D" ,      "4": "B" ,      "5": "C" ,
        "6": "A"
    },
    "2024": {
        "1": "A" ,      "2": "E" ,      "3": "C" ,      "4": "A" ,      "5": "B" ,
        "6": "D"
    },
    "2025": {
        "1": "E" ,      "2": "B" ,      "3": "A" ,      "4": "C" ,      "5": "C" ,
        "6": "D"
    }
  },

  // ── ASSUNTOS (por ano) ──────────────────────────────────────
  assuntos: {
    "2023": {
        "1": "Geometria Analítica – Circunferência e Reta",
        "2": "Polinômios – Divisibilidade",
        "3": "Polinômios – Raízes e Relações de Girard",
        "4": "Números Complexos – Potenciação",
        "5": "Estatística – Média e Desvio Padrão",
        "6": "Geometria Analítica – Circunferência"
    },
    "2024": {
        "1": "Polinômios – Divisibilidade",
        "2": "Números Complexos – Forma Trigonométrica",
        "3": "Geometria Analítica – Posição Relativa de Circunferências",
        "4": "Geometria Analítica – Elipse",
        "5": "Estatística – Mediana e Média (Distribuição de Frequência)",
        "6": "Geometria Analítica – Alinhamento de Pontos"
    },
    "2025": {
        "1": "Matrizes – Igualdade de Matrizes",
        "2": "Geometria Analítica – Coeficiente Angular e Ângulo de Inclinação",
        "3": "Sistemas Lineares – Escalonamento",
        "4": "Combinatória – Números com Restrição",
        "5": "Probabilidade – Múltiplos",
        "6": "Geometria Espacial – Volume (Cilindro e Cone)"
    }
  },

  // ── QUESTÕES (por ano) ──────────────────────────────────────
  questoes: {
    "2023": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Considere a reta dada pela equação:\n2𝑥 + 2𝑦 + 𝛿 = 0\nOs valores de 𝛿, de modo que a reta seja exterior à circunferência dada pela equação 𝑥^2 +𝑦^2 − 2𝑦 = 0, são:",
      "img": null,
      "alt": {
        "A": "𝛿 < −2− √2 ou 𝛿 > −2 + √2",
        "B": "𝛿 < −1− 2√2 ou 𝛿 > −1 + 2√2",
        "C": "𝛿 < −2− 2√3 ou 𝛿 > −2 + 2√3",
        "D": "𝛿 < −1− 2√3 ou 𝛿 > −1 + 2√3",
        "E": "𝛿 < −2− 2√2 ou 𝛿 > −2 + 2√2"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": ". Considere o polinômio:\n𝑃(𝑥) = 3𝑥3 + 4𝑥2 − 5𝑥 + 𝑐\nPara que o polinômio seja divisível por ℎ(𝑥) = 𝑥 − 1, o valor da constante 𝑐 deve ser igual a:",
      "img": null,
      "alt": {
        "A": "-4",
        "B": "-2",
        "C": "0",
        "D": "1",
        "E": "3"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Sejam 𝛼, 𝛽 e 1 as raízes da equação:\n8𝑥3 − 32𝑥 + 24 = 0\nLogo, o valor de 𝛼2 +𝛽2 é igual a:",
      "img": null,
      "alt": {
        "A": "3",
        "B": "4",
        "C": "6",
        "D": "7",
        "E": "9"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Seja o número complexo:\n𝑧 =1 −𝑖/1 +𝑖\nEntão, 𝑧^2024 é igual a:",
      "img": null,
      "alt": {
        "A": "-1",
        "B": "1",
        "C": "−𝑖",
        "D": "𝑖",
        "E": "4"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Em uma prova de seleção, o critério de aprovação leva em conta a média e o desvio padrão de três provas. Logo, a média e o desvio padrão de um candidato que obteve nas três provas 64, 57 e 62pontos são, respectivamente:",
      "img": null,
      "alt": {
        "A": "49 e √6,79",
        "B": "52 e √7,68",
        "C": "61 e √8,67",
        "D": "74 e √6,27",
        "E": "81 e √9,75"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "O conjunto dos pontos (𝑥, 𝑦) tais que:\n𝑥^2 + 𝑦^2 − 𝑥 − 𝑦 = 2\ntem como representação gráfica:",
      "img": null,
      "alt": {
        "A": "uma circunferência",
        "B": "duas retas concorrentes",
        "C": "uma elipse",
        "D": "duas retas paralelas",
        "E": "uma hipérbole"
      }
    }
    ],
    "2024": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Para que o polinômio 𝑃(𝑥) = −3𝑥^3 + 𝛼𝑥^2 + 𝛽 seja divisível pelo produto (𝑥 − 2)(𝑥 −3), os valores de 𝛼e 𝛽 valem, respectivamente:",
      "img": null,
      "alt": {
        "A": "57/5 e -108/5",
        "B": "66/5 e -110/5",
        "C": "78/7 e -112/7",
        "D": "85/8 e -116/7",
        "E": "92/9 e  -118/9"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Seja o número complexo:\n𝑧 =(1 − 𝑖)^2/1 +𝑖\nSua forma trigonométrica é:",
      "img": null,
      "alt": {
        "A": "√2 (−cos5𝜋/4 + 𝑖sen5𝜋/4)",
        "B": "1/√2 (cos5𝜋/4 − 𝑖sen5𝜋/4)",
        "C": "√2 (cos5𝜋/4 − 𝑖sen5𝜋/4)",
        "D": "1/√2 (cos5𝜋/4 + 𝑖sen5𝜋/4)",
        "E": "√2 (cos5𝜋/4 + 𝑖sen5𝜋/4)"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "As circunferências 𝑥^2 +𝑦^2 = 1 e 𝑥^2 − 8𝑥 +𝑦^2 = −6 são:",
      "img": null,
      "alt": {
        "A": "concêntricas",
        "B": "exteriores",
        "C": "secantes",
        "D": "tangentes exteriormente",
        "E": "tangentes interiormente"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Considere a elipse de equação:\n𝑥^2/𝑎^2 + 𝑦^2/𝑏^2 = 1\ncom 𝑎 > 0 e 𝑏 > 0, que passa pelos pontos (2,2) e (2√2, 0). Logo, 𝑎 + 𝑏 é igual a:",
      "img": null,
      "alt": {
        "A": "4√2",
        "B": "5√2",
        "C": "6√2",
        "D": "7√2",
        "E": "8√2"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Considere o conjunto de dados apresentados pela seguinte distribuição de frequência:\nA mediana e a média aproximada valem, respectivamente:",
      "img": "assets/documents/PSC/2024/3-ETAPA/questions/q53.png",
      "alt": {
        "A": "14 e 13,76",
        "B": "15 e 12,91",
        "C": "14 e 14,80",
        "D": "15 e 14,85",
        "E": "16 e 14,90"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Se os pontos (−3, 2), (3, 4) e (𝐴⁄2 , 5) estão numa mesma reta, então 𝐴 é igual a:",
      "img": null,
      "alt": {
        "A": "-12",
        "B": "-8",
        "C": "8",
        "D": "12",
        "E": "14"
      }
    }
    ],
    "2025": [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Sejam as matrizes:\nPara que 𝐴 = 𝐵, os valores de 𝑥, 𝑦 e 𝑧 valem, respectivamente,",
      "img": "assets/documents/PSC/2025/3-ETAPA/questions/q49.png",
      "alt": {
        "A": "1, 1 e −1",
        "B": "2, 2 e −2",
        "C": "3, 3 e −3",
        "D": "4, 4 e −4",
        "E": "5, 5 e −5"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "Os valores do coeficiente angular e da medida do ângulo de inclinação da reta que passa pelos pontos 𝐴 = (−9,−2√3) e 𝐵 = (3, 2√3) são, respectivamente,",
      "img": null,
      "alt": {
        "A": "√3/3 e 60°",
        "B": "√3 e 30°",
        "C": "√3 e 60°",
        "D": "1 e 45°",
        "E": "√3/3 e 30°"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Seja o sistema de equações lineares:\n",
      "img": "assets/documents/PSC/2025/3-ETAPA/questions/q51.png",
      "alt": {
        "A": "𝑆 = {(1 + ∝/2 −𝛽, 𝛼, −𝛼/2, 𝛽) , 𝛼 ∈ ℝ, 𝛽 ∈ ℝ }",
        "B": "𝑆 = {(1 + ∝/2 −𝛽, 𝛼, −𝛽/2, 𝛽) , 𝛼 ∈ ℝ, 𝛽 ∈ ℝ }",
        "C": "𝑆 = {(1 + ∝/2 −𝛽, 𝛼, 𝛼/2, 𝛽) , 𝛼 ∈ ℝ, 𝛽 ∈ ℝ }",
        "D": "𝑆 = {(1 + ∝/2 −𝛽, 𝛼, 𝛽/2, 𝛽) , 𝛼 ∈ ℝ, 𝛽 ∈ ℝ }",
        "E": "𝑆 = {(1 + ∝/2 −𝛽, 𝛼, 2𝛼, 𝛽) , 𝛼 ∈ ℝ, 𝛽 ∈ ℝ }"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "A quantidade de números, com cinco algarismosdistintos que podemos formar com os algarismos 1, 2, 3, 4, 5, 6, 7, 8 e 9, de modo que todos os números sejam números pares e que os algarismos 3 e 7 sempre estejam juntos, é igual a:",
      "img": null,
      "alt": {
        "A": "720",
        "B": "360",
        "C": "120",
        "D": "1865",
        "E": "1860"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "Considere a situação na qual são colocadas bolas,numeradas de 1 a 100, dentro de uma sacola, paraque uma delas seja sorteada ao acaso e determine o ganhador de uma rifa. Se uma pessoa comprou todas as rifas que são múltiplos de 2 e de 3, ao mesmo tempo, a chance dessa pessoa ser sorteada é de:",
      "img": null,
      "alt": {
        "A": "15%",
        "B": "16%",
        "C": "18%",
        "D": "20%",
        "E": "25%"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Um cilindro equilátero e um paralelepípedo reto retângulo possuem volumes iguais. Se as dimensões do paralelepípedo reto retângulo são dadas por 2𝜋 𝑐𝑚, 8 𝑐𝑚 e 27 𝑐𝑚, podemos afirmar que o volume de um cone circular reto, cujo raio da base e a altura desse cone são, respectivamente, o dobro e o triplo do raio da base do cilindro equilátero, é igual a:",
      "img": null,
      "alt": {
        "A": "864 𝑐𝑚^3",
        "B": "1290 𝑐𝑚^3",
        "C": "1290𝜋 𝑐𝑚^3",
        "D": "864𝜋 𝑐𝑚^3",
        "E": "1296𝜋 𝑐𝑚^3"
      }
    }
    ]
  } // fim de questoes
};
