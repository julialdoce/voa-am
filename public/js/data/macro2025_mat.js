// js/data/macro2025_mat.js — Questões de Matemática MACRO 2025
// ============================================================
//  TEMPLATE — Preencha cada questão conforme o modelo abaixo
// ============================================================
//
//  ESTRUTURA DE UMA QUESTÃO:
//  {
//    "num": 1,                           ← número da questão na prova (inteiro)
//    "enunciado": "Texto da questão...", ← texto completo do enunciado
//    "img": "assets/documents/MACRO/2025/questions/q1.png",
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
//    - Salve em: public/assets/documents/MACRO/2025/questions/
//    - Nomeie como: q<num>.png  (ex: q1.png, q41.png)
//    - Se não houver imagem, use: "img": null
//
// ============================================================

const MACRO2025_MAT = {
  prova: 'MACRO 2025',
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
        "1": "C" ,      "2": "A" ,      "3": "B" ,      "4": "D" ,      "5": "E" ,
        "6": "A" ,      "7": "C" ,      "8": "D" ,      "9": "B" ,      "10": "D" ,
        "11": "A" ,      "12": "E" ,      "13": "B" ,      "14": "C" ,      "15": "D" ,
        "16": "B" ,      "17": "B" ,      "18": "D" ,      "19": "C" ,      "20": "A" ,
        "21": "E" ,      "22": "B" ,      "23": "E" ,      "24": "D" ,      "25": "B"
  },

  // ── ASSUNTOS ────────────────────────────────────────────────
  assuntos: {
    "1": "Grandezas Proporcionais – Regra de Três",
    "2": "Porcentagem – Aumentos e Descontos Sucessivos",
    "3": "Estatística – Média e Moda",
    "4": "Funções do 1º Grau – Lei da Função",
    "5": "Funções Quadráticas – Ponto de Mínimo",
    "6": "Álgebra – Sistema de Equações",
    "7": "Probabilidade",
    "8": "Geometria Plana – Área (Retângulo Dividido)",
    "9": "Trigonometria – Razões no Triângulo Retângulo",
    "10": "Estatística – Média Aritmética",
    "11": "Geometria Espacial – Volume (Prisma Retangular)",
    "12": "Álgebra – Sistema de Equações",
    "13": "Grandezas e Medidas – Velocidade",
    "14": "Grandezas Proporcionais – Regra de Três",
    "15": "Grandezas Proporcionais – Produção",
    "16": "Álgebra – Equação do 1º Grau",
    "17": "Trigonometria – Razões no Triângulo Retângulo",
    "18": "Geometria Plana – Área de Figuras Compostas",
    "19": "Funções do 1º Grau – Interseção com Eixos",
    "20": "Grandezas Proporcionais – Divisão Proporcional",
    "21": "Probabilidade – Conjuntos",
    "22": "Álgebra – Sistema de Equações",
    "23": "Trigonometria – Funções Trigonométricas",
    "24": "Matrizes – Determinante",
    "25": "Geometria Espacial – Cone (Fusão de Sólidos)"
  },

  // ── QUESTÕES ────────────────────────────────────────────────
  questoes: [

    // ── QUESTÃO 1 ──
    {
      "num": 1,
      "enunciado": "Uma papelaria colocou em promoção canetas, borrachas e lápis, no total de 216 unidades e vendeu todas essas unidades. O número de unidades vendidas de cada um desses itens, na ordem apresentada, foi diretamente proporcional aos números 5, 3 e 4. Sabendo que todas as canetas foram vendidas por R$ 2,50 cada uma, o valor arrecadado com a venda dessas canetas foi",
      "img": null,
      "alt": {
        "A": "R$ 180,00",
        "B": "R$ 135,00",
        "C": "R$ 225,00",
        "D": "R$ 200,00",
        "E": "R$ 212,00"
      }
    },

    // ── QUESTÃO 2 ──
    {
      "num": 2,
      "enunciado": "No mês de março, determinado produto custava R$ 20,00. No mês de abril, esse preço sofreu um aumento de 20% e, no mês de maio, o preço aumentou 25% sobre o valor do mês de abril. O valor desse produto no mês de maio, em relação ao valor de R$ 20,00 de março, apresentou um aumento de",
      "img": null,
      "alt": {
        "A": "50%",
        "B": "35%",
        "C": "45%",
        "D": "30%",
        "E": "40%"
      }
    },

    // ── QUESTÃO 3 ──
    {
      "num": 3,
      "enunciado": "Um estudante leu, nos últimos anos, livros de poesia, de romance, de ficção e de aventura, e notou que o número de livros lidos de cada gênero, na ordem citada, formava uma progressão aritmética (PA). Sabendo que ele leu somente 1 livro de poesia e que a diferença entre o número de livros lidos de aventura e de romance foi 4, o número de livros de aventura lidos foi",
      "img": null,
      "alt": {
        "A": "5",
        "B": "7",
        "C": "4",
        "D": "9",
        "E": "11"
      }
    },

    // ── QUESTÃO 4 ──
    {
      "num": 4,
      "enunciado": "Considere a função f(x) = ax + b, em que a e b são números reais não nulos. Sabendo que os pontos P (0, – 3) e Q (– 1, – 4) pertencem a essa função, o valor de f(– 2) + f(8) é igual a",
      "img": null,
      "alt": {
        "A": "-1",
        "B": "2",
        "C": "1",
        "D": "0",
        "E": "3"
      }
    },

    // ── QUESTÃO 5 ──
    {
      "num": 5,
      "enunciado": "O gráfico da função f(x) = x2 + 2x – 3 apresenta um ponto de mínimo. As coordenadas desse ponto são",
      "img": null,
      "alt": {
        "A": "(1, –4)",
        "B": "(–1, –3)",
        "C": "(1, 4)",
        "D": "(0, 3)",
        "E": "(–1, –4)"
      }
    },

    // ── QUESTÃO 6 ──
    {
      "num": 6,
      "enunciado": "Em uma biblioteca, há 2 caixas, L e P, ambas com livros, sendo que a caixa P contém 3 livros a mais do que a caixa L. Se forem retirados 5 livros da caixa L e colocados na caixa P, a caixa P ficará com o dobro de livros da caixa L. O número de livros que há na caixa P é",
      "img": null,
      "alt": {
        "A": "21",
        "B": "24",
        "C": "18",
        "D": "15",
        "E": "12"
      }
    },

    // ── QUESTÃO 7 ──
    {
      "num": 7,
      "enunciado": "Em um grupo de jovens, 6 deles estão usando camisas xadrez. Sorteando-se um jovem desse grupo, a probabilidade de que ele não esteja usando uma camisa xadrez é 2/3.O número de jovens desse grupo que não estão usando camisas xadrez é",
      "img": null,
      "alt": {
        "A": "15",
        "B": "18",
        "C": "12",
        "D": "21",
        "E": "24"
      }
    },

    // ── QUESTÃO 8 ──
    {
      "num": 8,
      "enunciado": "Um terreno retangular ABCD, com 20 m de comprimento, foi dividido em duas regiões, R1 e R2, por uma cerca ED de 25 m de comprimento, sendo E um ponto sobre o lado AB, com EB = 3 m, conforme mostra a figura.\nA medida x do lado CD do retângulo é igual a",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-GERAIS/questions/q56.png",
      "alt": {
        "A": "13 m",
        "B": "16 m",
        "C": "15 m",
        "D": "18 m",
        "E": "12 m"
      }
    },

    // ── QUESTÃO 9 ──
    {
      "num": 9,
      "enunciado": "Considere o triângulo retângulo ABC, reto em A, com AB = 18 cm, BC = 30 cm e o ângulo ACB = α. Sejam E e D pontos sobre os lados AC e BC, respectivamente, tais que o triângulo CDE é retângulo em D, com ED = 9 cm, conforme mostra a figura.\nSabendo que sen α = 3/5, a medida do segmento AE é",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-GERAIS/questions/q57.png",
      "alt": {
        "A": "6 cm",
        "B": "9 cm",
        "C": "12 cm",
        "D": "15 cm",
        "E": "8 cm"
      }
    },

    // ── QUESTÃO 10 ──
    {
      "num": 10,
      "enunciado": "Foi solicitado a um grupo de 16 alunos que cada um deles atribuísse, a si mesmo, uma nota de 1 a 5, avaliando o pró-prio desempenho em uma atividade cultural. A nota que cada aluno atribuiu a si mesmo está registrada na tabela.\nA média, a moda e a mediana dessas notas são, respectivamente,",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-GERAIS/questions/q58.png",
      "alt": {
        "A": "3; 3,5 e 3,75",
        "B": "3,75; 3,5 e 3",
        "C": "3,75; 3 e 4",
        "D": "3,75; 3 e 3,5",
        "E": "3,5; 4 e 3,75"
      }
    },

    // ── QUESTÃO 11 ──
    {
      "num": 11,
      "enunciado": "Um sólido no formato de um prisma reto de base retangular tem uma das arestas da base medindo 2 cm a mais do que a outra, e a medida de sua altura é 31 cm, conforme mostra a figura, com medidas indicadas em centímetros.\nSabendo que a área da face lateral, destacada na figura, é 217 cm^2, o volume desse sólido é",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-GERAIS/questions/q59.png",
      "alt": {
        "A": "1953 cm^3",
        "B": "1825 cm^3",
        "C": "1746 cm^3",
        "D": "2531 cm^3",
        "E": "1519 cm^3"
      }
    },

    // ── QUESTÃO 12 ──
    {
      "num": 12,
      "enunciado": "Em uma reunião, foram consumidos copos com água e copos com café, no total de 20 copos, de modo que a razão do número de copos com água para o número de copos com café foi 2/3. Se 1 copo a mais de água tivesse sido consumido, a razão do número de copos com água para o número de copos com café seria:",
      "img": null,
      "alt": {
        "A": "1/3",
        "B": "1/2",
        "C": "1",
        "D": "3/2",
        "E": "3/4"
      }
    },

    // ── QUESTÃO 13 ──
    {
      "num": 13,
      "enunciado": "Como um míssil minúsculo e cintilante, a formiga-prateada--do-saara reluz sobre a areia quente em busca de animais mortos que sucumbiram ao calor. Agora, novo estudo revela que essas ágeis forrageiras não apenas são as formigas mais rápidas vivas como também estão entre os insetos mais rápidos do planeta. Em um experimento recente nas dunas ensolaradas de Douz, na Tunísia, os insetos atingiram a velocidade escalar máxima de 85 centímetros por segundo.\nMovendo-se em linha reta pelas dunas de Douz, em sua velocidade escalar máxima, uma dessas formigas percorre, no intervalo de tempo de dois minutos, a distância de",
      "img": null,
      "alt": {
        "A": "850 m",
        "B": "102 m",
        "C": "425 m",
        "D": "170 m",
        "E": "141 m"
      }
    },

    // ── QUESTÃO 14 ──
    {
      "num": 14,
      "enunciado": "Uma jarra contém 1750 mL de água, o que corresponde a 5/8 de sua capacidade total. Se essa jarra estiver com a sua capacidade total preenchida com água, o número máximo de copos que podem ser enchidos com 350 mL de água em cada um é",
      "img": null,
      "alt": {
        "A": "7",
        "B": "6",
        "C": "8",
        "D": "5",
        "E": "9"
      }
    },

    // ── QUESTÃO 15 ──
    {
      "num": 15,
      "enunciado": "Uma livraria colocou 200 livros em promoção, durante 3 dias, e vendeu determinado número deles no primeiro dia. No segundo dia, vendeu 60% dos livros que restaram e, no terceiro dia, vendeu os últimos 56 livros. Em relação aos 200 livros colocados em promoção, o número de livros vendidos no primeiro dia correspondeu a",
      "img": null,
      "alt": {
        "A": "40%",
        "B": "45%",
        "C": "25%",
        "D": "30%",
        "E": "35%"
      }
    },

    // ── QUESTÃO 16 ──
    {
      "num": 16,
      "enunciado": "Estavam presentes em uma festa adultos e crianças, de modo que o número de adultos era 8 a mais do que o número de crianças. Após a saída de 29 adultos, e de nenhuma criança, e sabendo que ninguém mais chegou para a festa, o número de adultos passou a ser a metade do número de crianças. O número total de pessoas, adultos mais crianças, que estavam nessa festa, antes da saída dos 29 adultos, era",
      "img": null,
      "alt": {
        "A": "100",
        "B": "92",
        "C": "108",
        "D": "104",
        "E": "96"
      }
    },

    // ── QUESTÃO 17 ──
    {
      "num": 17,
      "enunciado": "Considere o triângulo retângulo ABC, reto em C, com BC = 9 cm e o ângulo CÂB = α . Considere também o triângulo retângulo DAE, reto em E, com os pontos D e E, respectivamente, sobre os lados AC e AB, com CD = 7 cm e BE = 11 cm, conforme mostra a figura.\nSabendo que sen α = 3/5, a área do polígono BCDE, destacado",
      "img": null,
      "alt": {
        "A": "49 cm^2",
        "B": "48 cm^2",
        "C": "50 cm^2",
        "D": "46 cm^2",
        "E": "45 cm^2"
      }
    },

    // ── QUESTÃO 18 ──
    {
      "num": 18,
      "enunciado": "Considere o quadrado ABCD e o triângulo EFG, de modo que os pontos F, A, G e B estejam alinhados, o ponto E sobre o lado AD e todos os lados do quadrado divididos em 3 segmentos congruentes, conforme mostra a figura.\nSabendo que a área do triângulo EFG é 16 cm2 e que a medida do segmento AF é igual à medida do lado do quadrado, o perímetro do quadrado é",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/questions/q5.png",
      "alt": {
        "A": "34 cm",
        "B": "36 cm",
        "C": "30 cm",
        "D": "24 cm",
        "E": "28 cm"
      }
    },

    // ── QUESTÃO 19 ──
    {
      "num": 19,
      "enunciado": "Em um plano cartesiano, os pontos P(1, 0) e Q(0, 3) pertencem ao gráfico descrito pela função f(x) = x2 + bx + c, em que b e c são números reais. As coordenadas do ponto de mínimo dessa função são",
      "img": null,
      "alt": {
        "A": "(2, 3)",
        "B": "(– 3, – 1)",
        "C": "(2, – 1)",
        "D": "(4, 3)",
        "E": "(– 2, 2)"
      }
    },

    // ── QUESTÃO 20 ──
    {
      "num": 20,
      "enunciado": "Um estudante resolveu exercícios de Química, Física e Matemática, totalizando 36 exercícios. Sabendo que o nú-mero de exercícios resolvidos de cada matéria, na ordem citada, formava uma progressão aritmética (PA) de razão 3, o número de exercícios resolvidos de Matemática foi",
      "img": null,
      "alt": {
        "A": "15",
        "B": "10",
        "C": "12",
        "D": "16",
        "E": "9"
      }
    },

    // ── QUESTÃO 21 ──
    {
      "num": 21,
      "enunciado": "Em uma empresa há 18 técnicos. Desse total, 1/3 fala espanhol e, entre os que falam espanhol, 1/3 também fala alemão. Entre os técnicos que não falam espanhol, 1/6 fala alemão. Sorteando-se um desses 18 técnicos, a probabilidade de que ele fale alemão é",
      "img": null,
      "alt": {
        "A": "3/5",
        "B": "2/3",
        "C": "4/9",
        "D": "1/3",
        "E": "2/9"
      }
    },

    // ── QUESTÃO 22 ──
    {
      "num": 22,
      "enunciado": "Uma pessoa comprou canetas, lápis e marca textos. A tabela mostra o número de unidades compradas de canetas e de marca textos e o valor unitário dos itens comprados.\nConsiderando-se o número total de itens comprados, na média, o valor de cada item saiu por R$ 3,00. O número de lápis comprados foi",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/questions/q9.png",
      "alt": {
        "A": "6",
        "B": "7",
        "C": "5",
        "D": "4",
        "E": "3"
      }
    },

    // ── QUESTÃO 23 ──
    {
      "num": 23,
      "enunciado": "Considere a função f(x) = 2 sen(x/2) + cos(3x/4). O valor de f(0) + f(2π) é igual a",
      "img": null,
      "alt": {
        "A": "–1",
        "B": "0",
        "C": "2",
        "D": "3",
        "E": "1"
      }
    },

    // ── QUESTÃO 24 ──
    {
      "num": 24,
      "enunciado": "Considere a seguinte matriz quadrada de ordem 3, em que x é um número real.\nSabendo que o determinante dessa matriz é igual a 1, o valor de x é",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/questions/q11.png",
      "alt": {
        "A": "1",
        "B": "4",
        "C": "5",
        "D": "3",
        "E": "2"
      }
    },

    // ── QUESTÃO 25 ──
    {
      "num": 25,
      "enunciado": "Um sólido no formato de um cone maciço de metal, com 3 cm de raio (R) da base e 12 cm de altura (H), foi totalmente derretido. Com todo esse metal derretido foram fabricados cilindros retos maciços, cada um com raio (r) de base igual a 1 cm e altura (h) igual a 3 cm, conforme mostra a figura.\nO volume de um cone é calculado pela expressão V = 1/3 · πR^2 · H, em que R é o raio da base do cone e H ésua altura, e o volume de um cilindro é calculado pela expressão V = πr^2 · h, em que r é o raio da base do cilindroe h é sua altura.\nSabendo que não ocorreu desperdício de metal, o número de cilindros que foram feitos, utilizando todo o metal derretido do cone, foi igual a",
      "img": "assets/documents/MACRO/2025/CONHECIMENTOS-ESPECIFICOS/questions/q12.png",
      "alt": {
        "A": "9",
        "B": "12",
        "C": "6",
        "D": "8",
        "E": "10"
      }
    }

  ] // fim de questoes
};
