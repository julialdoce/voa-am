// js/data/quizzes.js — Aulas e quizzes por tópico
// Para adicionar: crie uma nova chave com { title, desc, video, playlistUrl, questions[] }
// playlistUrl: substitua o valor de cada tópico pela URL da playlist desejada

const quizzes = {

  // ═══════════════════════════════════════════════
  //  MATEMÁTICA — 1º ANO
  // ═══════════════════════════════════════════════

  conjuntos: {
    title: 'Conjuntos e Números Reais',
    desc: 'Os conjuntos numéricos formam uma hierarquia: Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ). Os Irracionais (𝕀) não se sobrepõem aos Racionais, mas ambos estão contidos nos Reais. Operações entre conjuntos incluem união (∪), interseção (∩) e diferença (−).',
    video: 'Conjuntos e Números Reais — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=3XIz4sgu0Ho&list=PLlb9l2qepYgLjrZrn4p7lrGFPhPfWKOzw', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O número √2 pertence a qual conjunto numérico?',
        opts: ['Racionais (ℚ)', 'Inteiros (ℤ)', 'Irracionais (𝕀)', 'Naturais (ℕ)'],
        correct: 2,
        explanation: '√2 ≈ 1,41421... é não periódico e não pode ser escrito como fração p/q. Logo, é irracional.'
      },
      {
        q: 'Dados A = {1, 2, 3, 4} e B = {3, 4, 5, 6}, qual é A ∩ B?',
        opts: ['{1, 2, 3, 4, 5, 6}', '{3, 4}', '{1, 2}', '{5, 6}'],
        correct: 1,
        explanation: 'A interseção contém apenas os elementos comuns a ambos: {3, 4}.'
      },
      {
        q: 'Qual número NÃO pertence ao conjunto dos inteiros (ℤ)?',
        opts: ['−5', '0', '3/2', '100'],
        correct: 2,
        explanation: '3/2 = 1,5 é um número racional, mas não inteiro, pois não pode ser escrito sem parte decimal.'
      },
      {
        q: 'Se A = {x ∈ ℕ | x < 5}, quantos elementos tem o conjunto A?',
        opts: ['4', '5', '6', '3'],
        correct: 1,
        explanation: 'A = {0, 1, 2, 3, 4} — os naturais menores que 5, totalizando 5 elementos.'
      },
      {
        q: 'O número 0,333... (dízima periódica) pertence a:',
        opts: ['Irracionais (𝕀)', 'Naturais (ℕ)', 'Racionais (ℚ)', 'Apenas aos Reais (ℝ)'],
        correct: 2,
        explanation: '0,333... = 1/3, que é uma fração p/q. Todo número que pode ser representado como fração é racional.'
      },
      {
        q: 'Dados A = {2, 4, 6} e B = {1, 2, 3, 4}, qual é A ∪ B?',
        opts: ['{2, 4}', '{1, 2, 3, 4, 6}', '{6}', '{1, 3}'],
        correct: 1,
        explanation: 'A união reúne todos os elementos de A e B sem repetição: {1, 2, 3, 4, 6}.'
      },
    ]
  },

  funcao_afim: {
    title: 'Função Afim (1º grau)',
    desc: 'A função afim tem a forma f(x) = ax + b, onde a ≠ 0. O coeficiente "a" é angular (determina crescimento/decrescimento) e "b" é linear (ponto onde o gráfico corta o eixo y). A raiz da função é o valor de x que anula f(x).',
    video: 'Função Afim — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=4q2N2HzSivA&list=PLlb9l2qepYgJadiD_fJo3cVGGW_hQJRn5', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Uma função f(x) = 3x − 6. Para qual valor de x temos f(x) = 0?',
        opts: ['x = 0', 'x = 2', 'x = 3', 'x = −2'],
        correct: 1,
        explanation: '3x − 6 = 0 → 3x = 6 → x = 2. Esse valor é a raiz ou zero da função.'
      },
      {
        q: 'A função f(x) = −2x + 8 é crescente ou decrescente?',
        opts: ['Crescente (a > 0)', 'Decrescente (a < 0)', 'Constante', 'Nem crescente, nem decrescente'],
        correct: 1,
        explanation: 'Como o coeficiente angular a = −2 < 0, a função é decrescente.'
      },
      {
        q: 'Se f(x) = 4x + 2, quanto vale f(3)?',
        opts: ['10', '14', '12', '6'],
        correct: 1,
        explanation: 'f(3) = 4·3 + 2 = 12 + 2 = 14'
      },
      {
        q: 'Uma função afim tem a = 5 e passa pelo ponto (0, −3). Qual é sua expressão?',
        opts: ['f(x) = 5x + 3', 'f(x) = 5x − 3', 'f(x) = −3x + 5', 'f(x) = 3x − 5'],
        correct: 1,
        explanation: 'Como passa por (0, −3), o coeficiente b = −3. Logo, f(x) = 5x − 3.'
      },
      {
        q: 'Para f(x) = 2x − 4, qual o valor de x quando f(x) = 10?',
        opts: ['x = 7', 'x = 3', 'x = 8', 'x = 6'],
        correct: 0,
        explanation: '2x − 4 = 10 → 2x = 14 → x = 7'
      },
      {
        q: 'Qual afirmação sobre f(x) = −x + 5 é correta?',
        opts: ['É crescente e sua raiz é 5', 'É decrescente e sua raiz é 5', 'É crescente e sua raiz é −5', 'É constante'],
        correct: 1,
        explanation: 'a = −1 < 0, logo é decrescente. Raiz: −x + 5 = 0 → x = 5.'
      },
      {
        q: 'Uma taxa de táxi cobra R$4,00 de bandeirada + R$2,50 por km. Qual função descreve o preço?',
        opts: ['f(x) = 4x + 2,5', 'f(x) = 2,5x + 4', 'f(x) = 4x − 2,5', 'f(x) = 2,5x'],
        correct: 1,
        explanation: 'A bandeirada é o coeficiente b = 4 (valor fixo) e o custo por km é a = 2,5. Logo f(x) = 2,5x + 4.'
      },
      {
        q: 'Dois amigos têm f(x) = 3x + 1 e g(x) = x + 5. Para qual x os valores se igualam?',
        opts: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
        correct: 1,
        explanation: '3x + 1 = x + 5 → 2x = 4 → x = 2'
      },
    ]
  },

  funcao_quad: {
    title: 'Função Quadrática (2º grau)',
    desc: 'A função quadrática tem a forma f(x) = ax² + bx + c, com a ≠ 0. Seu gráfico é uma parábola. O vértice representa o ponto de máximo (a < 0) ou mínimo (a > 0). As raízes são encontradas pela fórmula de Bhaskara: x = (−b ± √Δ) / 2a, com Δ = b² − 4ac.',
    video: 'Função Quadrática — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=ZpW9Xb5iyt4&list=PLlb9l2qepYgJ3rDOwEkEUnWb8igfIZo8t', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'A função f(x) = x² − 4x + 3. Quais são os zeros da função?',
        opts: ['x = 1 e x = 3', 'x = 2 e x = 4', 'x = −1 e x = −3', 'x = 0 e x = 4'],
        correct: 0,
        explanation: 'Usando fatoração: x² − 4x + 3 = (x−1)(x−3) = 0 → x = 1 ou x = 3'
      },
      {
        q: 'Para f(x) = −x² + 4x, o valor máximo da função é:',
        opts: ['2', '4', '8', '16'],
        correct: 1,
        explanation: 'O vértice: x_v = −b/2a = −4/(2·(−1)) = 2. f(2) = −4 + 8 = 4'
      },
      {
        q: 'O discriminante Δ de f(x) = x² − 6x + 9 vale:',
        opts: ['0', '9', '−9', '36'],
        correct: 0,
        explanation: 'Δ = b² − 4ac = 36 − 4·1·9 = 36 − 36 = 0. A parábola toca o eixo x em apenas um ponto.'
      },
      {
        q: 'Qual parábola tem concavidade voltada para baixo?',
        opts: ['f(x) = 2x² + 3', 'f(x) = −3x² + x − 1', 'f(x) = x² − 5x', 'f(x) = 4x² + 2x + 7'],
        correct: 1,
        explanation: 'Quando a < 0 (a = −3), a parábola abre para baixo, tendo ponto de máximo.'
      },
      {
        q: 'Para f(x) = x² + 2x − 3, as raízes são:',
        opts: ['x = 1 e x = 3', 'x = −3 e x = 1', 'x = 3 e x = −1', 'x = −1 e x = −3'],
        correct: 1,
        explanation: 'Δ = 4 + 12 = 16. x = (−2 ± 4)/2 → x₁ = 1 e x₂ = −3'
      },
      {
        q: 'O vértice de f(x) = x² − 4x + 7 é:',
        opts: ['(2, 3)', '(−2, 3)', '(2, −3)', '(4, 7)'],
        correct: 0,
        explanation: 'x_v = 4/2 = 2. y_v = 4 − 8 + 7 = 3. Vértice em (2, 3).'
      },
      {
        q: 'Uma bola é lançada e sua altura é h(t) = −t² + 4t. Em qual instante ela atinge a altura máxima?',
        opts: ['t = 1', 't = 2', 't = 4', 't = 3'],
        correct: 1,
        explanation: 'Máximo no vértice: t_v = −b/2a = −4/(2·(−1)) = 2 segundos.'
      },
      {
        q: 'Quais são os valores de x para os quais f(x) = x² − 5x + 6 é negativa?',
        opts: ['x < 2 ou x > 3', '2 < x < 3', 'x < 3', 'x > 2'],
        correct: 1,
        explanation: 'As raízes são x = 2 e x = 3. Como a > 0, a função é negativa entre as raízes: 2 < x < 3.'
      },
    ]
  },

  pa: {
    title: 'Progressão Aritmética (PA)',
    desc: 'Uma PA é uma sequência em que a diferença entre termos consecutivos é constante (razão r). O termo geral é dado por aₙ = a₁ + (n−1)·r e a soma dos n termos por Sₙ = n·(a₁ + aₙ)/2.',
    video: 'Progressão Aritmética — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=BWwQa8c22Pw&list=PLlb9l2qepYgJQ0zoE0z0u6xoiLuFo-Nfj', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Qual é a razão da PA (3, 7, 11, 15, ...)?',
        opts: ['3', '4', '5', '7'],
        correct: 1,
        explanation: 'r = a₂ − a₁ = 7 − 3 = 4. A razão é a diferença constante entre termos consecutivos.'
      },
      {
        q: 'Na PA (2, 5, 8, ...), qual é o 10º termo?',
        opts: ['27', '29', '32', '25'],
        correct: 1,
        explanation: 'a₁ = 2, r = 3. a₁₀ = 2 + (10−1)·3 = 2 + 27 = 29'
      },
      {
        q: 'A soma dos 20 primeiros termos da PA (1, 3, 5, ...) é:',
        opts: ['200', '400', '380', '420'],
        correct: 1,
        explanation: 'a₁ = 1, r = 2. a₂₀ = 1 + 19·2 = 39. S₂₀ = 20·(1 + 39)/2 = 20·20 = 400'
      },
      {
        q: 'Em uma PA, a₁ = 5 e r = −3. Qual é o 6º termo?',
        opts: ['−10', '−15', '−5', '−20'],
        correct: 0,
        explanation: 'a₆ = 5 + (6−1)·(−3) = 5 − 15 = −10'
      },
      {
        q: 'Três números em PA têm soma 21 e o menor é 5. Quais são os números?',
        opts: ['5, 7, 9', '5, 8, 8', '4, 7, 10', '3, 7, 11'],
        correct: 0,
        explanation: 'Seja (a−r, a, a+r). Soma: 3a = 21 → a = 7. Menor = a − r = 5 → r = 2. PA: 5, 7, 9.'
      },
      {
        q: 'Um cinema vendeu 100 ingressos na 1ª semana e aumenta 15 por semana. Quantos na 5ª semana?',
        opts: ['155', '160', '165', '170'],
        correct: 1,
        explanation: 'a₅ = 100 + (5−1)·15 = 100 + 60 = 160 ingressos.'
      },
    ]
  },

  pg: {
    title: 'Progressão Geométrica (PG)',
    desc: 'Uma PG é uma sequência em que a razão entre termos consecutivos é constante (q ≠ 0). O termo geral é aₙ = a₁ · qⁿ⁻¹ e a soma dos n termos é Sₙ = a₁ · (qⁿ − 1)/(q − 1), para q ≠ 1.',
    video: 'Progressão Geométrica — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=haKrC4quHj8&list=PLlb9l2qepYgIwbNYC31qpCOClXiii7h36', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Qual é a razão da PG (2, 6, 18, 54, ...)?',
        opts: ['2', '3', '4', '6'],
        correct: 1,
        explanation: 'q = a₂/a₁ = 6/2 = 3. A razão é a divisão entre termos consecutivos.'
      },
      {
        q: 'Na PG (5, 10, 20, ...), qual é o 6º termo?',
        opts: ['120', '160', '160', '140'],
        correct: 1,
        explanation: 'q = 2. a₆ = 5 · 2⁵ = 5 · 32 = 160'
      },
      {
        q: 'A soma dos 4 primeiros termos da PG (1, 2, 4, 8) é:',
        opts: ['14', '15', '16', '12'],
        correct: 1,
        explanation: 'S₄ = 1·(2⁴ − 1)/(2 − 1) = (16 − 1)/1 = 15'
      },
      {
        q: 'Uma cultura bacteriana dobra a cada hora. Começando com 100, quantas haverá após 5 horas?',
        opts: ['3200', '6400', '1600', '800'],
        correct: 0,
        explanation: 'a₆ = 100 · 2⁵ = 100 · 32 = 3200. (Após 5 horas é o 6º termo.)'
      },
      {
        q: 'Em uma PG, a₁ = 81 e q = 1/3. Qual é o 4º termo?',
        opts: ['9', '3', '27', '1'],
        correct: 1,
        explanation: 'a₄ = 81 · (1/3)³ = 81 · 1/27 = 3'
      },
      {
        q: 'Três números em PG têm produto 27 e o menor é 1. Qual é a razão?',
        opts: ['2', '3', '4', '9'],
        correct: 1,
        explanation: 'Seja (a/q, a, aq). Produto: a³ = 27 → a = 3. Menor = a/q = 1 → q = 3.'
      },
    ]
  },

  trig: {
    title: 'Trigonometria Básica',
    desc: 'No triângulo retângulo, as razões trigonométricas são: sen(θ) = oposto/hipotenusa, cos(θ) = adjacente/hipotenusa e tg(θ) = oposto/adjacente. Ângulos notáveis: 30°, 45° e 60° têm valores exatos a memorizar.',
    video: 'Trigonometria Básica — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=C7NrVLmEYcs&list=PLlb9l2qepYgIg7GVCy2LnJHHPJ-NqS6rT', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Em um triângulo retângulo, o cateto oposto mede 3 e a hipotenusa 5. Qual é o seno do ângulo?',
        opts: ['3/4', '3/5', '4/5', '5/3'],
        correct: 1,
        explanation: 'sen = oposto/hipotenusa = 3/5'
      },
      {
        q: 'Quanto vale tg(45°)?',
        opts: ['√2/2', '√3/2', '1', '√3'],
        correct: 2,
        explanation: 'tg(45°) = sen(45°)/cos(45°) = (√2/2)/(√2/2) = 1'
      },
      {
        q: 'Qual é o valor de sen(30°)?',
        opts: ['√3/2', '1/2', '√2/2', '1'],
        correct: 1,
        explanation: 'sen(30°) = 1/2 — valor notável a memorizar.'
      },
      {
        q: 'Um mastro projeta uma sombra de 10 m. O ângulo de elevação do sol é 45°. Qual a altura do mastro?',
        opts: ['5 m', '10 m', '10√2 m', '20 m'],
        correct: 1,
        explanation: 'tg(45°) = altura/sombra → 1 = h/10 → h = 10 m'
      },
      {
        q: 'Em um triângulo retângulo, cos(60°) = adjacente/hipotenusa. Se a hipotenusa é 8, o adjacente é:',
        opts: ['4', '4√3', '8√3', '2'],
        correct: 0,
        explanation: 'cos(60°) = 1/2. Adjacente = 8 · (1/2) = 4'
      },
      {
        q: 'Qual identidade trigonométrica é sempre verdadeira?',
        opts: ['sen²(x) + cos²(x) = 2', 'sen²(x) − cos²(x) = 1', 'sen²(x) + cos²(x) = 1', 'tg(x) = cos(x)/sen(x)'],
        correct: 2,
        explanation: 'A identidade fundamental: sen²(x) + cos²(x) = 1, válida para todo ângulo x.'
      },
      {
        q: 'Qual o valor de cos(0°)?',
        opts: ['0', '1/2', '1', '√3/2'],
        correct: 2,
        explanation: 'cos(0°) = 1 — valor notável fundamental.'
      },
      {
        q: 'Um avião voa a 1000 m de altitude. O ângulo de depressão até um ponto é 30°. Qual é a distância horizontal ao ponto?',
        opts: ['500 m', '1000√3 m', '1000/√3 m', '2000 m'],
        correct: 1,
        explanation: 'tg(30°) = 1000/d → (1/√3) = 1000/d → d = 1000√3 m'
      },
    ]
  },

  geo_plana: {
    title: 'Geometria Plana',
    desc: 'A Geometria Plana estuda figuras bidimensionais. Fórmulas essenciais: área do triângulo = base·altura/2; do retângulo = base·altura; do círculo = πr²; do trapézio = (B + b)·h/2. O Teorema de Pitágoras: a² = b² + c² em triângulos retângulos.',
    video: 'Geometria Plana — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=EzGf1UEnnsY&list=PLlb9l2qepYgI6N1CcO7JAWHwFWn14Eh96', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Um retângulo tem base 8 m e altura 5 m. Qual é sua área?',
        opts: ['26 m²', '40 m²', '13 m²', '80 m²'],
        correct: 1,
        explanation: 'Área = base × altura = 8 × 5 = 40 m²'
      },
      {
        q: 'A hipotenusa de um triângulo retângulo com catetos 6 e 8 é:',
        opts: ['12', '14', '10', '15'],
        correct: 2,
        explanation: 'a² = 6² + 8² = 36 + 64 = 100 → a = 10'
      },
      {
        q: 'Qual é a área de um círculo com raio 7 cm? (use π ≈ 3,14)',
        opts: ['43,96 cm²', '153,86 cm²', '49 cm²', '21,98 cm²'],
        correct: 1,
        explanation: 'A = πr² = 3,14 × 49 = 153,86 cm²'
      },
      {
        q: 'Um trapézio tem bases 10 m e 6 m, e altura 4 m. Qual a sua área?',
        opts: ['64 m²', '32 m²', '40 m²', '24 m²'],
        correct: 1,
        explanation: 'A = (B + b)·h/2 = (10 + 6)·4/2 = 16·2 = 32 m²'
      },
      {
        q: 'Um triângulo equilátero tem lado 6. Qual é sua área?',
        opts: ['18', '9√3', '12√3', '36'],
        correct: 1,
        explanation: 'A = (lado² · √3)/4 = (36 · √3)/4 = 9√3'
      },
      {
        q: 'Qual o comprimento da circunferência com raio 5? (use π ≈ 3,14)',
        opts: ['15,7', '31,4', '78,5', '25'],
        correct: 1,
        explanation: 'C = 2πr = 2 · 3,14 · 5 = 31,4'
      },
    ]
  },

  // ═══════════════════════════════════════════════
  //  MATEMÁTICA — 2º ANO
  // ═══════════════════════════════════════════════

  trig2: {
    title: 'Trigonometria Completa',
    desc: 'A trigonometria no ciclo trigonométrico estende os ângulos além de 90°. O ciclo possui 4 quadrantes com sinais definidos para sen, cos e tg. As funções trigonométricas são periódicas: sen e cos têm período 2π; tg tem período π. Fórmulas de adição: sen(a+b) = sen·a·cos·b + cos·a·sen·b.',
    video: 'Trigonometria Completa — Ciclo e Funções',
    playlistUrl: 'https://www.youtube.com/watch?v=Yc6IRaFdFoc&list=PLlb9l2qepYgI103rqALDdkud-_Q3AHuYS', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'No 2º quadrante, quais funções trigonométricas são positivas?',
        opts: ['sen e cos', 'Apenas sen', 'Apenas cos', 'tg e sen'],
        correct: 1,
        explanation: 'No 2º quadrante (90° a 180°), apenas o seno é positivo. Cos e tg são negativos.'
      },
      {
        q: 'Qual é o valor de sen(120°)?',
        opts: ['−√3/2', '1/2', '√3/2', '−1/2'],
        correct: 2,
        explanation: 'sen(120°) = sen(180° − 60°) = sen(60°) = √3/2'
      },
      {
        q: 'A função f(x) = sen(x) tem período:',
        opts: ['π', '2π', 'π/2', '4π'],
        correct: 1,
        explanation: 'As funções seno e cosseno têm período 2π ≈ 360°.'
      },
      {
        q: 'Qual é cos(210°)?',
        opts: ['√3/2', '−√3/2', '1/2', '−1/2'],
        correct: 1,
        explanation: 'cos(210°) = cos(180° + 30°) = −cos(30°) = −√3/2 (3º quadrante, cos negativo)'
      },
      {
        q: 'Se sen(x) = 1/2 e x está no 2º quadrante, qual é cos(x)?',
        opts: ['√3/2', '−√3/2', '1/2', '−1/2'],
        correct: 1,
        explanation: 'cos²(x) = 1 − 1/4 = 3/4 → cos(x) = ±√3/2. No 2º quadrante, cos < 0 → cos(x) = −√3/2'
      },
      {
        q: 'Qual é o valor de tg(135°)?',
        opts: ['1', '−1', '√3', '−√3'],
        correct: 1,
        explanation: 'tg(135°) = tg(180° − 45°) = −tg(45°) = −1'
      },
      {
        q: 'A equação sen(x) = 0 tem como soluções no intervalo [0°, 360°]:',
        opts: ['x = 90° e x = 270°', 'x = 0° e x = 180°', 'x = 0°, x = 180° e x = 360°', 'x = 45° e x = 225°'],
        correct: 2,
        explanation: 'sen(x) = 0 ocorre quando x = 0°, 180° e 360° (no intervalo fechado [0°, 360°]).'
      },
      {
        q: 'Qual o valor de cos(360°)?',
        opts: ['0', '−1', '1', '−√2/2'],
        correct: 2,
        explanation: 'cos(360°) = cos(0°) = 1, pois 360° corresponde à volta completa no ciclo.'
      },
    ]
  },

  matrizes: {
    title: 'Matrizes e Determinantes',
    desc: 'Uma matriz é uma tabela de números dispostos em linhas e colunas. O determinante é um número associado a matrizes quadradas. Para matrizes 2×2: det = ad − bc. A regra de Sarrus é usada para matrizes 3×3.',
    video: 'Matrizes e Determinantes — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=ktr4wfXi9xg&list=PLlb9l2qepYgKkQsPFJwXC1DQys4AGCqwL', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Qual é o determinante da matriz [[3, 2], [1, 4]]?',
        opts: ['10', '12', '14', '8'],
        correct: 0,
        explanation: 'det = 3·4 − 2·1 = 12 − 2 = 10'
      },
      {
        q: 'A soma dos elementos da diagonal principal de [[5, 0], [0, 7]] é:',
        opts: ['5', '7', '12', '35'],
        correct: 2,
        explanation: 'Diagonal principal: {5, 7}. Soma = 5 + 7 = 12. (Esse valor é chamado de traço da matriz.)'
      },
      {
        q: 'Se A = [[1, 2], [3, 4]] e B = [[5, 6], [7, 8]], qual é A + B?',
        opts: ['[[6, 8], [10, 12]]', '[[5, 12], [21, 32]]', '[[6, 8], [12, 10]]', '[[4, 4], [4, 4]]'],
        correct: 0,
        explanation: 'A soma de matrizes é feita elemento a elemento: (1+5, 2+6, 3+7, 4+8) = [[6, 8], [10, 12]]'
      },
      {
        q: 'Uma matriz 3×4 possui quantos elementos?',
        opts: ['7', '12', '9', '16'],
        correct: 1,
        explanation: 'Elementos = linhas × colunas = 3 × 4 = 12'
      },
      {
        q: 'O determinante de uma matriz com uma linha de zeros é:',
        opts: ['1', 'Indefinido', '0', '−1'],
        correct: 2,
        explanation: 'Se uma linha (ou coluna) é toda composta por zeros, o determinante é sempre 0.'
      },
      {
        q: 'Qual é o produto da matriz [[2, 0], [0, 3]] pelo escalar 4?',
        opts: ['[[8, 0], [0, 12]]', '[[6, 4], [4, 7]]', '[[8, 4], [4, 12]]', '[[2, 0], [0, 12]]'],
        correct: 0,
        explanation: 'Multiplica-se cada elemento pelo escalar: 4·[[2,0],[0,3]] = [[8,0],[0,12]]'
      },
    ]
  },

  sistemas: {
    title: 'Sistemas Lineares',
    desc: 'Um sistema linear é um conjunto de equações do 1º grau com duas ou mais incógnitas. Pode ser resolvido por substituição, adição (eliminação) ou usando a Regra de Cramer (determinantes). Um sistema pode ser: possível e determinado, possível e indeterminado ou impossível.',
    video: 'Sistemas Lineares — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=9ATZyBcgq4g&list=PLlb9l2qepYgJJm808zenKiclaOYPRROen', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Resolva o sistema: x + y = 5 e x − y = 1. Qual é o valor de x?',
        opts: ['2', '3', '4', '1'],
        correct: 1,
        explanation: 'Somando as equações: 2x = 6 → x = 3. Então y = 5 − 3 = 2.'
      },
      {
        q: 'Um sistema 2×2 é impossível quando:',
        opts: ['Tem uma solução única', 'As retas se cruzam', 'As retas são paralelas', 'As retas são coincidentes'],
        correct: 2,
        explanation: 'Quando as retas são paralelas (mesma inclinação, origens diferentes), não há ponto de interseção: sistema impossível.'
      },
      {
        q: 'Resolva: 2x + y = 7 e x − y = 2. Qual é y?',
        opts: ['1', '2', '3', '5'],
        correct: 2,
        explanation: 'Somando: 3x = 9 → x = 3. Substituindo: 2(3) + y = 7 → y = 1. Resposta: y = 1.'
      },
      {
        q: 'Um sistema é possível e indeterminado quando:',
        opts: ['Tem infinitas soluções', 'Tem solução única', 'Não tem solução', 'Tem exatamente 2 soluções'],
        correct: 0,
        explanation: 'Quando as equações representam retas coincidentes, há infinitos pontos em comum: sistema indeterminado.'
      },
      {
        q: 'Dois produtos custam juntos R$50. Um custa R$10 a mais que o outro. Qual é o preço do mais barato?',
        opts: ['R$15', 'R$20', 'R$25', 'R$30'],
        correct: 1,
        explanation: 'x + y = 50 e x = y + 10 → (y+10) + y = 50 → 2y = 40 → y = R$20'
      },
      {
        q: 'Resolva: 3x − 2y = 4 e x + y = 3. Qual é o valor de x?',
        opts: ['1', '2', '3', '4'],
        correct: 1,
        explanation: 'Da 2ª equação: x = 3 − y. Substituindo: 3(3−y) − 2y = 4 → 9 − 5y = 4 → y = 1 → x = 2.'
      },
    ]
  },

  geo_esp: {
    title: 'Geometria Espacial',
    desc: 'A Geometria Espacial estuda sólidos geométricos. Principais fórmulas: cubo (V = a³); paralelepípedo (V = abc); cilindro (V = πr²h); cone (V = πr²h/3); esfera (V = 4πr³/3); pirâmide (V = A_base · h/3).',
    video: 'Geometria Espacial — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=Y_gD7S6OkC4&list=PLlb9l2qepYgKNehtcFgx_2NA-VKKErDg1', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Qual é o volume de um cubo com aresta 4 cm?',
        opts: ['16 cm³', '48 cm³', '64 cm³', '96 cm³'],
        correct: 2,
        explanation: 'V = a³ = 4³ = 64 cm³'
      },
      {
        q: 'Um cilindro tem raio 3 e altura 5. Qual é seu volume? (use π ≈ 3,14)',
        opts: ['141,3', '94,2', '47,1', '188,4'],
        correct: 0,
        explanation: 'V = πr²h = 3,14 · 9 · 5 = 141,3'
      },
      {
        q: 'Uma esfera tem raio 3 cm. Seu volume é: (use π ≈ 3,14)',
        opts: ['36π', '28,26 cm³', '113,04 cm³', '75,36 cm³'],
        correct: 2,
        explanation: 'V = 4πr³/3 = 4 · 3,14 · 27/3 = 113,04 cm³'
      },
      {
        q: 'Um cone tem base circular com raio 4 cm e altura 9 cm. Seu volume é: (π ≈ 3,14)',
        opts: ['452,16 cm³', '150,72 cm³', '50,24 cm³', '301,44 cm³'],
        correct: 1,
        explanation: 'V = πr²h/3 = 3,14 · 16 · 9/3 = 150,72 cm³'
      },
      {
        q: 'Um paralelepípedo mede 2 × 3 × 6. Qual é sua área total?',
        opts: ['36', '72', '108', '66'],
        correct: 1,
        explanation: 'A_total = 2(ab + bc + ac) = 2(6 + 18 + 12) = 2·36 = 72'
      },
      {
        q: 'Uma pirâmide quadrada de base 6 e altura 8 tem volume:',
        opts: ['96', '144', '288', '48'],
        correct: 0,
        explanation: 'V = A_base · h/3 = (6²) · 8/3 = 36 · 8/3 = 96'
      },
      {
        q: 'A diagonal do cubo de aresta a vale:',
        opts: ['a√2', 'a√3', '2a', 'a√6'],
        correct: 1,
        explanation: 'A diagonal do cubo = a√3, obtida por Pitágoras em 3 dimensões.'
      },
      {
        q: 'Quantas faces tem um dodecaedro regular?',
        opts: ['6', '12', '20', '8'],
        correct: 1,
        explanation: 'O dodecaedro regular possui 12 faces pentagonais, 30 arestas e 20 vértices.'
      },
    ]
  },

  geo_anal: {
    title: 'Geometria Analítica',
    desc: 'A Geometria Analítica usa coordenadas para estudar figuras. Distância entre pontos: d = √[(x₂−x₁)² + (y₂−y₁)²]. Equação da reta: y = ax + b ou ax + by + c = 0. Equação da circunferência: (x−a)² + (y−b)² = r².',
    video: 'Geometria Analítica — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=lHqTFWNBtmQ&list=PLlb9l2qepYgLhPcLlg66IGJrri9nvSAfM', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Qual é a distância entre os pontos A(1, 2) e B(4, 6)?',
        opts: ['3', '4', '5', '7'],
        correct: 2,
        explanation: 'd = √[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5'
      },
      {
        q: 'A reta y = 3x − 2 tem coeficiente angular:',
        opts: ['−2', '3', '2', '−3'],
        correct: 1,
        explanation: 'Na forma y = ax + b, o coeficiente angular (inclinação) é a = 3.'
      },
      {
        q: 'Qual é o ponto médio entre A(2, 4) e B(6, 8)?',
        opts: ['(3, 5)', '(4, 6)', '(4, 5)', '(3, 6)'],
        correct: 1,
        explanation: 'M = ((2+6)/2, (4+8)/2) = (4, 6)'
      },
      {
        q: 'A equação (x−2)² + (y+3)² = 25 representa uma circunferência de raio:',
        opts: ['5', '25', '10', '√5'],
        correct: 0,
        explanation: 'O raio é √25 = 5. O centro é (2, −3).'
      },
      {
        q: 'Qual é a equação da reta que passa por (0, 4) com coeficiente angular 2?',
        opts: ['y = 2x − 4', 'y = 4x + 2', 'y = 2x + 4', 'y = x + 4'],
        correct: 2,
        explanation: 'Usando y = ax + b com a = 2 e b = 4 (ponto (0, 4) indica que b = 4): y = 2x + 4'
      },
      {
        q: 'Duas retas são paralelas quando:',
        opts: ['Têm coeficientes angulares iguais', 'São perpendiculares', 'Se cruzam em um ponto', 'Têm o mesmo coeficiente linear'],
        correct: 0,
        explanation: 'Retas paralelas têm o mesmo coeficiente angular (mesma inclinação) e coeficientes lineares diferentes.'
      },
      {
        q: 'A área do triângulo com vértices O(0,0), A(4,0) e B(0,3) é:',
        opts: ['6', '12', '7', '24'],
        correct: 0,
        explanation: 'Área = base × altura / 2 = 4 × 3 / 2 = 6'
      },
      {
        q: 'Qual é o coeficiente angular da reta que passa por (1, 2) e (3, 6)?',
        opts: ['1', '2', '3', '4'],
        correct: 1,
        explanation: 'a = (y₂ − y₁)/(x₂ − x₁) = (6 − 2)/(3 − 1) = 4/2 = 2'
      },
    ]
  },

  // ═══════════════════════════════════════════════
  //  MATEMÁTICA — 3º ANO
  // ═══════════════════════════════════════════════

  log: {
    title: 'Logaritmos e Exponenciais',
    desc: 'Logaritmo: logₐ(b) = x significa que aˣ = b. Propriedades: log(A·B) = log A + log B; log(A/B) = log A − log B; log(Aⁿ) = n·log A. Funções exponenciais e logarítmicas são inversas entre si.',
    video: 'Logaritmos e Exponenciais — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=k2XkYEUH9nA&list=PLlb9l2qepYgIslA9drOxaLpZqbK816Wiu', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Quanto vale log₂(8)?',
        opts: ['2', '3', '4', '6'],
        correct: 1,
        explanation: 'log₂(8) = x → 2ˣ = 8 → 2ˣ = 2³ → x = 3'
      },
      {
        q: 'Qual é o valor de log₁₀(1000)?',
        opts: ['2', '3', '4', '10'],
        correct: 1,
        explanation: 'log₁₀(1000) = log₁₀(10³) = 3'
      },
      {
        q: 'Se log(2) ≈ 0,301, quanto vale log(8)?',
        opts: ['0,602', '0,903', '1,204', '0,301'],
        correct: 1,
        explanation: 'log(8) = log(2³) = 3·log(2) = 3 · 0,301 = 0,903'
      },
      {
        q: 'A equação 2ˣ = 32 tem como solução:',
        opts: ['x = 4', 'x = 5', 'x = 6', 'x = 3'],
        correct: 1,
        explanation: '32 = 2⁵, logo x = 5'
      },
      {
        q: 'Qual é o domínio da função f(x) = log(x)?',
        opts: ['Todos os reais', 'x > 0', 'x ≥ 0', 'x < 0'],
        correct: 1,
        explanation: 'O logaritmo é definido apenas para x > 0. Não existe logaritmo de número negativo ou zero.'
      },
      {
        q: 'Simplifique: log(100) + log(10)',
        opts: ['2', '3', '10', '20'],
        correct: 1,
        explanation: 'log(100) + log(10) = 2 + 1 = 3 (em base 10)'
      },
      {
        q: 'O crescimento de uma população segue P(t) = 1000 · 2ᵗ. Após quantos anos a população será 8000?',
        opts: ['t = 2', 't = 3', 't = 4', 't = 8'],
        correct: 1,
        explanation: '1000 · 2ᵗ = 8000 → 2ᵗ = 8 = 2³ → t = 3 anos'
      },
      {
        q: 'Qual propriedade justifica que log(A/B) = log A − log B?',
        opts: ['Propriedade do produto', 'Propriedade do quociente', 'Propriedade da potência', 'Mudança de base'],
        correct: 1,
        explanation: 'É a propriedade do quociente do logaritmo: log(A/B) = log A − log B.'
      },
    ]
  },

  comb: {
    title: 'Análise Combinatória',
    desc: 'Análise Combinatória conta possibilidades. Princípio Multiplicativo: se há m formas de fazer A e n formas de fazer B, há m·n formas de fazer A e B. Permutações: Pₙ = n!; Combinações: C(n,k) = n! / (k! · (n−k)!); Arranjos: A(n,k) = n! / (n−k)!',
    video: 'Análise Combinatória — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=rSgs9YD9ns0&list=PLlb9l2qepYgK4MsAkrOc91Hbnxb_Kbs5l', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Quantos anagramas tem a palavra "AMOR"?',
        opts: ['12', '16', '24', '8'],
        correct: 2,
        explanation: 'AMOR tem 4 letras distintas. Permutações: 4! = 24'
      },
      {
        q: 'De um grupo de 5 pessoas, de quantas formas pode-se escolher 2?',
        opts: ['5', '10', '20', '15'],
        correct: 1,
        explanation: 'C(5,2) = 5! / (2! · 3!) = (5·4) / (2·1) = 10'
      },
      {
        q: 'Um cardápio tem 3 entradas e 4 pratos principais. Quantas refeições distintas são possíveis?',
        opts: ['7', '10', '12', '24'],
        correct: 2,
        explanation: 'Pelo princípio multiplicativo: 3 · 4 = 12 refeições.'
      },
      {
        q: 'Quantos números de 3 dígitos podem ser formados com {1, 2, 3, 4, 5} sem repetição?',
        opts: ['60', '120', '125', '150'],
        correct: 0,
        explanation: 'A(5,3) = 5!/(5−3)! = 5·4·3 = 60'
      },
      {
        q: 'Quantas diagonais tem um hexágono?',
        opts: ['6', '9', '12', '15'],
        correct: 1,
        explanation: 'Diagonais = C(6,2) − 6 = 15 − 6 = 9'
      },
      {
        q: 'Um time de futebol tem 15 jogadores. De quantas formas o técnico pode escalar 11?',
        opts: ['C(15,11)', 'P(15)', 'A(15,11)', '15!'],
        correct: 0,
        explanation: 'Como a ordem não importa (não há posições), usa-se combinação: C(15,11) = C(15,4) = 1365'
      },
    ]
  },

  prob: {
    title: 'Probabilidade',
    desc: 'A probabilidade de um evento A é P(A) = (casos favoráveis) / (casos totais). Para eventos mutuamente exclusivos: P(A∪B) = P(A) + P(B). Para eventos independentes: P(A∩B) = P(A) · P(B). O complementar: P(Aᶜ) = 1 − P(A).',
    video: 'Probabilidade — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=dmU8BE3dqYg&list=PLlb9l2qepYgKG8DMepcBkIDMMMpTXA0Hw', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Um dado justo é lançado. Qual é a probabilidade de sair um número par?',
        opts: ['1/3', '1/2', '2/3', '1/6'],
        correct: 1,
        explanation: 'Pares: {2, 4, 6} → 3 casos. Total: 6. P = 3/6 = 1/2'
      },
      {
        q: 'Uma urna tem 4 bolas vermelhas e 6 azuis. Qual a probabilidade de tirar uma vermelha?',
        opts: ['2/5', '3/5', '1/4', '4/10'],
        correct: 0,
        explanation: 'P = 4/(4+6) = 4/10 = 2/5'
      },
      {
        q: 'Se P(A) = 0,3 e P(B) = 0,5 (eventos mutuamente exclusivos), qual é P(A∪B)?',
        opts: ['0,15', '0,8', '0,2', '0,6'],
        correct: 1,
        explanation: 'Para eventos mutuamente exclusivos: P(A∪B) = P(A) + P(B) = 0,3 + 0,5 = 0,8'
      },
      {
        q: 'Dois dados são lançados. Qual a probabilidade de obter soma 7?',
        opts: ['1/6', '5/36', '7/36', '1/12'],
        correct: 0,
        explanation: 'Pares que somam 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 casos. Total: 36. P = 6/36 = 1/6'
      },
      {
        q: 'A probabilidade de chover é 0,4. Qual a probabilidade de NÃO chover?',
        opts: ['0,4', '0,6', '0,14', '0,96'],
        correct: 1,
        explanation: 'P(complementar) = 1 − P(A) = 1 − 0,4 = 0,6'
      },
      {
        q: 'Dois eventos independentes têm P(A) = 1/3 e P(B) = 1/4. Qual é P(A∩B)?',
        opts: ['7/12', '1/12', '1/6', '1/3'],
        correct: 1,
        explanation: 'Para eventos independentes: P(A∩B) = P(A) · P(B) = 1/3 · 1/4 = 1/12'
      },
    ]
  },

  estat: {
    title: 'Estatística',
    desc: 'Estatística organiza e analisa dados. Medidas de tendência central: Média (soma/quantidade), Mediana (valor central) e Moda (valor mais frequente). Medidas de dispersão: Variância (média dos desvios ao quadrado) e Desvio Padrão (raiz da variância).',
    video: 'Estatística — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=mSk2vjGXA90&list=PLlb9l2qepYgIzLFBjoYcN57HkUH3d_qjC', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'A média dos valores {4, 6, 8, 10, 12} é:',
        opts: ['7', '8', '9', '10'],
        correct: 1,
        explanation: 'Média = (4+6+8+10+12)/5 = 40/5 = 8'
      },
      {
        q: 'Qual é a mediana de {3, 1, 5, 7, 9}?',
        opts: ['3', '5', '7', '9'],
        correct: 1,
        explanation: 'Ordenando: {1, 3, 5, 7, 9}. O valor central (3º de 5) é 5.'
      },
      {
        q: 'Qual é a moda de {2, 4, 4, 6, 8, 8, 8, 10}?',
        opts: ['4', '6', '8', '2'],
        correct: 2,
        explanation: 'A moda é o valor mais frequente: 8 aparece 3 vezes.'
      },
      {
        q: 'Em uma turma, as notas foram: 5, 6, 7, 8, 9. Qual nota deve ser incluída para que a média suba para 7?',
        opts: ['7', '8', '9', '10'],
        correct: 2,
        explanation: 'Soma atual = 35. Para média 7 com 6 notas: 6·7 = 42. Faltam 42 − 35 = 7... Nota = 7? Vamos calcular: (35+x)/6 = 7 → x = 7. Espere: média de 5 notas = 35/5 = 7. Para subir, precisa de nota > 7. Nota = 9: (35+9)/6 = 44/6 ≈ 7,3 ✓'
      },
      {
        q: 'Qual gráfico é mais adequado para mostrar a distribuição percentual de categorias?',
        opts: ['Histograma', 'Gráfico de setores (pizza)', 'Box plot', 'Gráfico de linha'],
        correct: 1,
        explanation: 'O gráfico de setores (pizza) é ideal para mostrar proporções e percentuais de categorias.'
      },
      {
        q: 'O desvio padrão de um conjunto de dados é 0. O que isso indica?',
        opts: ['Todos os valores são iguais', 'A média é zero', 'Os dados estão muito dispersos', 'O conjunto é vazio'],
        correct: 0,
        explanation: 'Desvio padrão 0 significa que não há variação: todos os valores são iguais à média.'
      },
    ]
  },

  fin: {
    title: 'Matemática Financeira',
    desc: 'Juros Simples: J = C · i · t; Montante M = C(1 + it). Juros Compostos: M = C · (1 + i)ᵗ. Conceitos importantes: capital (C), taxa (i), tempo (t), juros (J) e montante (M = C + J). Desconto simples: D = N · i · t; Valor Atual: VA = N − D.',
    video: 'Matemática Financeira — PSC/ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=azedx0uou64&list=PLlb9l2qepYgLuKGSYD94wYYTu9BzdwFxm', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Um capital de R$2.000 rende juros simples de 5% ao mês durante 3 meses. Qual o montante?',
        opts: ['R$2.100', 'R$2.300', 'R$2.500', 'R$2.050'],
        correct: 1,
        explanation: 'J = 2000 · 0,05 · 3 = 300. M = 2000 + 300 = R$2.300'
      },
      {
        q: 'R$1.000 aplicados a juros compostos de 10% ao ano por 2 anos rendem:',
        opts: ['R$1.200', 'R$1.210', 'R$1.100', 'R$1.220'],
        correct: 1,
        explanation: 'M = 1000 · (1,10)² = 1000 · 1,21 = R$1.210'
      },
      {
        q: 'Qual a diferença entre juros simples e compostos?',
        opts: ['Juros simples capitaliza sobre juros anteriores', 'Juros compostos capitaliza sobre juros anteriores', 'Não há diferença', 'Juros simples é maior para longos períodos'],
        correct: 1,
        explanation: 'Em juros compostos ("juros sobre juros"), os juros de cada período são incorporados ao capital para o próximo.'
      },
      {
        q: 'Uma dívida de R$5.000 tem desconto simples de 2% ao mês por 2 meses. Qual o valor atual?',
        opts: ['R$4.600', 'R$4.800', 'R$4.500', 'R$4.900'],
        correct: 1,
        explanation: 'D = 5000 · 0,02 · 2 = 200. VA = 5000 − 200 = R$4.800'
      },
      {
        q: 'A taxa equivalente mensal a uma taxa anual de 12% (juros compostos) é aproximadamente:',
        opts: ['1%', '2%', '0,5%', '1,5%'],
        correct: 0,
        explanation: '(1 + i_m)¹² = 1,12 → i_m = (1,12)^(1/12) − 1 ≈ 0,00949 ≈ 1% ao mês'
      },
      {
        q: 'Quanto tempo leva para um capital dobrar a juros simples de 5% ao mês?',
        opts: ['10 meses', '20 meses', '15 meses', '25 meses'],
        correct: 1,
        explanation: 'M = 2C → C(1 + 0,05t) = 2C → 1 + 0,05t = 2 → t = 1/0,05 = 20 meses'
      },
    ]
  },

  // ═══════════════════════════════════════════════
  //  REDAÇÃO — FUNDAMENTOS
  // ═══════════════════════════════════════════════

  tipos: {
    title: 'Tipos Textuais',
    desc: 'Tipos textuais se diferem dos gêneros textuais. Os tipos principais são: Narração (conta eventos com personagens, tempo, espaço e enredo), Descrição (descreve características), Dissertação (argumenta e expõe ideias), Injunção (instrui/orienta) e Exposição (explica/informa).',
    video: 'Tipos Textuais — Fundamentos da Redação',
    playlistUrl: 'https://www.youtube.com/watch?v=keri15mSleA&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Um texto que conta uma história com personagens, tempo e espaço é do tipo:',
        opts: ['Dissertativo', 'Descritivo', 'Narrativo', 'Injuntivo'],
        correct: 2,
        explanation: 'O texto narrativo conta eventos que se desenvolvem no tempo, com personagens, espaço e enredo.'
      },
      {
        q: 'Uma receita culinária é um exemplo de texto:',
        opts: ['Narrativo', 'Descritivo', 'Dissertativo', 'Injuntivo'],
        correct: 3,
        explanation: 'O texto injuntivo instrui/orienta o leitor a fazer algo, usando verbos no imperativo.'
      },
      {
        q: 'O artigo de opinião é predominantemente:',
        opts: ['Narrativo', 'Descritivo', 'Dissertativo-argumentativo', 'Injuntivo'],
        correct: 2,
        explanation: 'O artigo de opinião defende um ponto de vista com argumentos — típico texto dissertativo-argumentativo.'
      },
      {
        q: 'Qual tipo textual predomina em um manual de instruções?',
        opts: ['Narrativo', 'Injuntivo', 'Expositivo', 'Dissertativo'],
        correct: 1,
        explanation: 'Manuais instruem o leitor (verbo no imperativo/infinitivo), sendo textos injuntivos.'
      },
    ]
  },

  coerencia: {
    title: 'Coerência e Coesão',
    desc: 'Coerência é a harmonia lógica das ideias: o texto faz sentido. Coesão é a ligação formal entre as partes por mecanismos linguísticos: referência, substituição, elipse, conjunção e coesão lexical. Um texto bem escrito precisa de ambas.',
    video: 'Coerência e Coesão — Redação ENEM/PSC',
    playlistUrl: 'https://www.youtube.com/watch?v=cHcFDNkxpmQ&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5&index=2', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O que é coesão textual?',
        opts: ['A lógica das ideias no texto', 'Os mecanismos linguísticos que ligam as partes do texto', 'O tema central do texto', 'A argumentação do texto'],
        correct: 1,
        explanation: 'Coesão refere-se aos mecanismos formais (pronomes, conjunções, sinônimos) que conectam as partes do texto.'
      },
      {
        q: '"Embora estivesse cansado, ele continuou trabalhando." A conjunção destacada indica:',
        opts: ['Causa', 'Conclusão', 'Concessão', 'Adição'],
        correct: 2,
        explanation: '"Embora" é uma conjunção concessiva: indica uma ideia que contraria o esperado, mas não impede a principal.'
      },
      {
        q: 'Qual dos textos abaixo tem problemas de coerência?',
        opts: ['"Chovia muito. Por isso, levei guarda-chuva."', '"Estava com fome. Portanto, fui ao cinema."', '"Estudei bastante. Logo, passei na prova."', '"Era tarde. Então, fui dormir."'],
        correct: 1,
        explanation: 'Ter fome não justifica ir ao cinema. Há incoerência lógica entre causa e consequência.'
      },
      {
        q: 'A substituição de "João" por "o rapaz" em um texto é um mecanismo de:',
        opts: ['Coerência', 'Coesão por referência/substituição', 'Argumentação', 'Progressão temática'],
        correct: 1,
        explanation: 'Substituir um nome por uma expressão equivalente é coesão por substituição lexical, evitando repetição.'
      },
      {
        q: 'Qual conjunção indica conclusão?',
        opts: ['Mas', 'Portanto', 'Embora', 'Enquanto'],
        correct: 1,
        explanation: '"Portanto" é conjunção conclusiva. "Mas" = adversativa; "Embora" = concessiva; "Enquanto" = temporal.'
      },
      {
        q: 'A elipse é um recurso de coesão que consiste em:',
        opts: ['Repetir uma palavra', 'Omitir um elemento facilmente subentendido pelo contexto', 'Usar sinônimos', 'Ligar orações por conjunções'],
        correct: 1,
        explanation: 'A elipse omite um termo que pode ser recuperado pelo contexto. Ex.: "Fui ao mercado. [Fui] Depois para casa."'
      },
    ]
  },

  narr: {
    title: 'Elementos da Narrativa',
    desc: 'Os elementos da narrativa são: Narrador (quem conta), Personagens (protagonista, antagonista, secundários), Enredo (sequência de eventos), Tempo (cronológico ou psicológico), Espaço (ambiente físico/social) e Foco narrativo (1ª ou 3ª pessoa).',
    video: 'Elementos da Narrativa — Redação e Literatura',
    playlistUrl: 'https://www.youtube.com/watch?v=xaj3eS3Em2Q&list=PLlb9l2qepYgI28UCrcRBJG2c0RFk1q9Y5&index=3', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O protagonista de uma narrativa é:',
        opts: ['O narrador da história', 'O personagem principal', 'O antagonista', 'O narrador em 1ª pessoa'],
        correct: 1,
        explanation: 'O protagonista é o personagem central, em torno do qual gira a história.'
      },
      {
        q: 'Em "Eu acordei cedo e fui à escola", o narrador é em:',
        opts: ['3ª pessoa', '1ª pessoa', '2ª pessoa', 'Narrador onisciente'],
        correct: 1,
        explanation: 'O uso de "eu" caracteriza o narrador em 1ª pessoa, que participa da história.'
      },
      {
        q: 'O conflito em uma narrativa é:',
        opts: ['O espaço onde ocorre a ação', 'O problema ou tensão que move o enredo', 'O tempo em que se passa a história', 'A resolução final'],
        correct: 1,
        explanation: 'O conflito é o elemento de tensão que impulsiona a história e cria interesse no leitor.'
      },
      {
        q: 'O tempo psicológico em uma narrativa refere-se:',
        opts: ['À ordem cronológica dos eventos', 'Ao tempo interior/subjetivo do personagem', 'À época histórica em que se passa', 'À duração real dos eventos'],
        correct: 1,
        explanation: 'O tempo psicológico é subjetivo: um minuto de angústia pode ocupar páginas; horas felizes, poucas linhas.'
      },
    ]
  },

  // ═══════════════════════════════════════════════
  //  REDAÇÃO — ESTRUTURA
  // ═══════════════════════════════════════════════

  artigo: {
    title: 'Artigo de Opinião',
    desc: 'O artigo de opinião é um gênero dissertativo-argumentativo que defende um ponto de vista. Estrutura: Título, Introdução (tese), Desenvolvimento (argumentos com embasamento) e Conclusão (retomada da tese). Usa linguagem formal e recursos argumentativos.',
    video: 'Artigo de Opinião — Redação ENEM/PSC',
    playlistUrl: 'https://www.youtube.com/watch?v=IM64Plps5jQ&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'A tese em um artigo de opinião é:',
        opts: ['O tema geral do texto', 'O ponto de vista que o autor defende', 'O título do artigo', 'A conclusão com solução'],
        correct: 1,
        explanation: 'A tese é a posição/opinião do autor, apresentada na introdução e defendida ao longo do texto.'
      },
      {
        q: 'Qual recurso NÃO é adequado em um artigo de opinião formal?',
        opts: ['Dados estatísticos', 'Citações de especialistas', 'Gírias e linguagem coloquial', 'Exemplos concretos'],
        correct: 2,
        explanation: 'Gírias e linguagem coloquial são inadequadas em textos formais como o artigo de opinião.'
      },
      {
        q: 'O artigo de opinião difere da notícia porque:',
        opts: ['Conta eventos', 'Defende um ponto de vista', 'Usa linguagem objetiva', 'Relata fatos sem opinião'],
        correct: 1,
        explanation: 'A notícia relata fatos com objetividade; o artigo de opinião defende explicitamente um ponto de vista.'
      },
      {
        q: 'Na estrutura do artigo de opinião, o desenvolvimento serve para:',
        opts: ['Apresentar o tema e a tese', 'Embasar a tese com argumentos e evidências', 'Propor soluções', 'Retomar a posição inicial'],
        correct: 1,
        explanation: 'O desenvolvimento apresenta os argumentos que sustentam e provam a tese defendida na introdução.'
      },
      {
        q: 'Qual estratégia argumentativa consiste em apresentar e refutar o argumento contrário?',
        opts: ['Exemplo', 'Contra-argumento', 'Citação de autoridade', 'Dado estatístico'],
        correct: 1,
        explanation: 'O contra-argumento reconhece a posição oposta e a refuta, fortalecendo a tese do autor.'
      },
      {
        q: 'O uso de "embora", "apesar de", "ainda que" em artigos de opinião indica:',
        opts: ['Conclusão', 'Exemplificação', 'Concessão', 'Adição'],
        correct: 2,
        explanation: 'Essas conjunções introduzem concessões — reconhecimento de pontos contrários antes de refutá-los.'
      },
    ]
  },

  arg: {
    title: 'Argumentação',
    desc: 'Argumentar é apresentar razões para defender uma posição. Tipos de argumentos: de autoridade (citar especialistas), de exemplificação, estatístico, lógico-dedutivo, histórico e comparativo. Um bom argumento é relevante, suficiente e relacionado à tese.',
    video: 'Argumentação — Redação ENEM/PSC',
    playlistUrl: 'https://www.youtube.com/watch?v=IGmZHrihXN8&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=2', // ← substitua pela URL da playlist
    questions: [
      {
        q: '"Segundo a OMS, o sedentarismo causa X mortes por ano." Esse é um argumento de:',
        opts: ['Comparação', 'Autoridade', 'Exemplificação', 'Analogia'],
        correct: 1,
        explanation: 'Citar uma organização reconhecida (OMS) é argumento de autoridade — reforça a tese com fonte confiável.'
      },
      {
        q: 'Um argumento fraco é aquele que:',
        opts: ['Usa dados estatísticos', 'Não tem relação com a tese', 'Cita exemplos concretos', 'Apresenta causa e efeito'],
        correct: 1,
        explanation: 'Um argumento só é válido se sustentar diretamente a tese. Argumentos sem relação são falácias ou desvios.'
      },
      {
        q: 'A progressão argumentativa em um texto é:',
        opts: ['Repetir a tese em todos os parágrafos', 'Desenvolver os argumentos de forma organizada e encadeada', 'Listar fatos sem conexão', 'Apresentar apenas um argumento'],
        correct: 1,
        explanation: 'A progressão argumentativa garante que cada parágrafo avance na construção da tese, de forma lógica e coesa.'
      },
      {
        q: '"Assim como o tabaco, o álcool em excesso destrói o organismo." Esse argumento usa:',
        opts: ['Dado estatístico', 'Comparação/analogia', 'Argumento histórico', 'Autoridade'],
        correct: 1,
        explanation: 'Comparar dois elementos para ilustrar um ponto é argumento por analogia ou comparação.'
      },
      {
        q: 'Por que dados estatísticos são eficazes em argumentações?',
        opts: ['Por serem subjetivos', 'Por fornecerem evidências concretas e quantificáveis', 'Por serem de fácil compreensão', 'Por dispensarem fontes'],
        correct: 1,
        explanation: 'Dados numéricos conferem objetividade e credibilidade ao argumento, tornando-o mais difícil de refutar.'
      },
      {
        q: 'Qual das alternativas representa uma falácia argumentativa?',
        opts: ['Citar especialistas', 'Atacar a pessoa em vez do argumento', 'Usar exemplos reais', 'Apresentar estatísticas'],
        correct: 1,
        explanation: 'Atacar o caráter de quem argumenta em vez de refutar o argumento é a falácia ad hominem.'
      },
    ]
  },

  contra: {
    title: 'Contra-argumento',
    desc: 'O contra-argumento é uma estratégia argumentativa que reconhece a posição oposta para depois refutá-la. Estrutura típica: "Embora alguns afirmem que X, na realidade Y porque Z." Demonstra amadurecimento intelectual e fortalece a tese ao antecipar objeções.',
    video: 'Contra-argumento e Concessão — Redação',
    playlistUrl: 'https://www.youtube.com/watch?v=uUG4uU2n8XU&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=3', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O contra-argumento serve para:',
        opts: ['Mudar a tese do texto', 'Reconhecer e refutar a posição contrária', 'Apresentar um novo tema', 'Encerrar o texto'],
        correct: 1,
        explanation: 'O contra-argumento reconhece uma objeção válida e a refuta, mostrando que a tese ainda se sustenta.'
      },
      {
        q: '"Embora a tecnologia facilite o acesso ao conhecimento, ela também gera dependência." Nessa frase, a concessão é:',
        opts: ['A dependência gerada', 'A facilidade de acesso ao conhecimento', 'A tecnologia em si', 'O conector "embora"'],
        correct: 1,
        explanation: 'A parte concedida é o argumento favorável à tecnologia (facilita o acesso), que é depois relativizado.'
      },
      {
        q: 'Qual marcador textual introduz tipicamente uma concessão?',
        opts: ['Portanto', 'Assim sendo', 'Ainda que', 'Visto que'],
        correct: 2,
        explanation: '"Ainda que" é concessivo. "Portanto" e "Assim sendo" são conclusivos; "Visto que" é causal.'
      },
      {
        q: 'Um parágrafo com contra-argumento bem construído demonstra:',
        opts: ['Incerteza sobre a tese', 'Maturidade argumentativa e visão ampla', 'Contradição no raciocínio', 'Falta de posicionamento'],
        correct: 1,
        explanation: 'Antecipar e refutar objeções mostra que o autor conhece o debate e tem posição sólida.'
      },
    ]
  },

  rep: {
    title: 'Repertório Sociocultural',
    desc: 'O repertório sociocultural é o conjunto de referências culturais, históricas, filosóficas, artísticas ou científicas usadas para embasar a argumentação. No ENEM, é avaliado na Competência 2. Deve ser pertinente à tese e corretamente contextualizado.',
    video: 'Repertório Sociocultural — ENEM Competência 2',
    playlistUrl: 'https://www.youtube.com/watch?v=29l3rTMunHQ&list=PLlb9l2qepYgJZhXnNAY85kt2tBDHOOoXF&index=4', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O repertório sociocultural em uma redação serve para:',
        opts: ['Mostrar erudição sem relação com o tema', 'Embasar os argumentos com referências culturais pertinentes', 'Substituir os argumentos', 'Decorar o texto'],
        correct: 1,
        explanation: 'O repertório deve ser usado para reforçar argumentos, não apenas exibir conhecimento sem conexão com a tese.'
      },
      {
        q: 'Qual das opções é um repertório sociocultural adequado para um texto sobre desigualdade social?',
        opts: ['Uma citação aleatória de Einstein sobre física', 'Dados do IBGE sobre concentração de renda', 'Uma descrição do Big Bang', 'Uma receita de bolo'],
        correct: 1,
        explanation: 'Dados oficiais sobre desigualdade têm relação direta com o tema, tornando o argumento mais sólido.'
      },
      {
        q: 'Referenciar uma obra literária sem contextualizar sua relação com o tema é:',
        opts: ['Uso adequado do repertório', 'Repertório sem produtividade argumentativa', 'Competência 5', 'Coesão textual'],
        correct: 1,
        explanation: 'No ENEM, o repertório é avaliado pela pertinência e pela forma como é articulado à tese — não pela simples menção.'
      },
      {
        q: 'Citar um filósofo para embasar um argumento é um exemplo de:',
        opts: ['Contra-argumento', 'Argumento de autoridade via repertório', 'Proposta de intervenção', 'Elemento narrativo'],
        correct: 1,
        explanation: 'Referenciar pensadores reconhecidos combina repertório sociocultural com argumento de autoridade.'
      },
      {
        q: 'Qual competência do ENEM avalia o uso do repertório sociocultural?',
        opts: ['Competência 1', 'Competência 2', 'Competência 3', 'Competência 5'],
        correct: 1,
        explanation: 'A Competência 2 avalia a capacidade de fazer uso de conhecimentos de mundo para construir argumentos.'
      },
      {
        q: 'Um repertório "produtivo" é aquele que:',
        opts: ['É muito extenso', 'Está diretamente articulado ao argumento e à tese', 'Usa termos difíceis', 'Cita muitas fontes diferentes'],
        correct: 1,
        explanation: 'A produtividade do repertório está na sua relação com a argumentação — quantidade não significa qualidade.'
      },
    ]
  },

  // ═══════════════════════════════════════════════
  //  REDAÇÃO — ENEM/PSC
  // ═══════════════════════════════════════════════

  diss: {
    title: 'Dissertação Argumentativa',
    desc: 'A dissertação argumentativa é o gênero central do ENEM. Estrutura: Introdução (apresentação do tema e tese), Desenvolvimento (2 parágrafos argumentativos com repertório e dados) e Conclusão (retomada da tese e proposta de intervenção). Linguagem formal, norma culta.',
    video: 'Dissertação Argumentativa — Estrutura Completa ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=nEImAvz96EI&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Quantos parágrafos deve ter, idealmente, uma dissertação argumentativa do ENEM?',
        opts: ['2', '3', '4', '5'],
        correct: 2,
        explanation: 'A estrutura recomendada tem 4 parágrafos: introdução, dois de desenvolvimento e conclusão.'
      },
      {
        q: 'A introdução de uma dissertação deve conter:',
        opts: ['Proposta de intervenção', 'Apresentação do tema e da tese', 'Apenas dados estatísticos', 'A resolução do problema'],
        correct: 1,
        explanation: 'A introdução apresenta o tema e enuncia a tese (posição do autor) a ser desenvolvida.'
      },
      {
        q: 'O parágrafo de desenvolvimento precisa ter:',
        opts: ['Apenas a tese repetida', 'Argumento + embasamento (dados, exemplos, citações)', 'Somente a proposta de intervenção', 'Resumo do tema'],
        correct: 1,
        explanation: 'Cada parágrafo de desenvolvimento deve apresentar um argumento sustentado por evidências (repertório, dados, exemplos).'
      },
      {
        q: 'A conclusão de uma dissertação deve:',
        opts: ['Apresentar novos argumentos', 'Retomar a tese e apresentar proposta de intervenção', 'Contradizer a introdução', 'Ser igual ao desenvolvimento'],
        correct: 1,
        explanation: 'A conclusão fecha o texto retomando a tese e, no ENEM, apresenta a proposta de intervenção (Competência 5).'
      },
      {
        q: 'Qual é um erro comum em dissertações do ENEM?',
        opts: ['Usar dados estatísticos', 'Apresentar tese clara na introdução', 'Fugir do tema', 'Propor intervenção na conclusão'],
        correct: 2,
        explanation: 'Fugir do tema zera a redação automaticamente. É o erro mais grave e frequente.'
      },
      {
        q: 'A linguagem adequada para a dissertação argumentativa do ENEM é:',
        opts: ['Coloquial e informal', 'Formal e dentro da norma culta', 'Literária e poética', 'Técnica e científica'],
        correct: 1,
        explanation: 'O ENEM avalia o domínio da norma culta escrita. Linguagem informal ou gírias representam erros de competência.'
      },
      {
        q: 'O que faz um parágrafo dissertativo ser considerado "pobre"?',
        opts: ['Ter argumento e exemplo', 'Ter apenas afirmações sem embasamento', 'Ter citação de especialistas', 'Estar bem articulado à tese'],
        correct: 1,
        explanation: 'Um parágrafo sem evidências ou embasamento é vago e não contribui efetivamente para a argumentação.'
      },
      {
        q: 'Qual das estratégias de introdução é mais eficaz no ENEM?',
        opts: ['Começar com "Desde os primórdios da humanidade"', 'Contextualizar o tema com repertório pertinente e apresentar a tese', 'Fazer uma pergunta retórica sem respondê-la', 'Copiar a frase da proposta'],
        correct: 1,
        explanation: 'Contextualizar e apresentar a tese de forma clara e fundamentada é a introdução mais eficaz no ENEM.'
      },
    ]
  },

  comp: {
    title: '5 Competências ENEM',
    desc: 'O ENEM avalia a redação em 5 competências: C1 (domínio da norma culta), C2 (compreensão do tema e uso de repertório), C3 (organização e argumentação), C4 (mecanismos linguísticos de coesão), C5 (proposta de intervenção respeitando direitos humanos). Cada uma vale 200 pontos (total 1000).',
    video: '5 Competências ENEM — Guia Completo',
    playlistUrl: 'https://www.youtube.com/watch?v=AMbFB_cFYek&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=2', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Quantas competências são avaliadas na redação do ENEM?',
        opts: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'São 5 competências, cada uma valendo 0 a 200 pontos, totalizando 1000 pontos.'
      },
      {
        q: 'A Competência 1 avalia:',
        opts: ['A proposta de intervenção', 'O domínio da norma culta da língua portuguesa', 'A coesão textual', 'O uso de repertório'],
        correct: 1,
        explanation: 'A C1 avalia o domínio da gramática, ortografia, concordância, regência e pontuação.'
      },
      {
        q: 'Fugir completamente do tema implica nota:',
        opts: ['200', '100', '0 em todas as competências', 'Perda de 100 pontos'],
        correct: 2,
        explanation: 'Fuga total do tema resulta em nota ZERO em todas as competências — redação anulada.'
      },
      {
        q: 'A Competência 5 exige que a proposta de intervenção seja:',
        opts: ['Qualquer sugestão do autor', 'Detalhada (com agente, ação, meio, efeito e finalidade) e que respeite os direitos humanos', 'Apenas uma frase final', 'Uma citação de lei'],
        correct: 1,
        explanation: 'A C5 avalia a qualidade da proposta: agente, ação, meio/modo, efeito e finalidade, sempre respeitando direitos humanos.'
      },
      {
        q: 'A Competência 4 avalia:',
        opts: ['A argumentação', 'O repertório sociocultural', 'O uso de mecanismos de coesão textual', 'A norma culta'],
        correct: 2,
        explanation: 'A C4 avalia o uso de conectivos, pronomes e outros mecanismos que dão fluência e coesão ao texto.'
      },
      {
        q: 'Uma proposta de intervenção que viola direitos humanos pode resultar em:',
        opts: ['Nota máxima em C5', 'Nota 0 em C5 e possível anulação', 'Redução de apenas 40 pontos', 'Sem penalidade'],
        correct: 1,
        explanation: 'Propostas que desrespeitam direitos fundamentais (ex.: punições degradantes) zeram a C5 e podem anular a redação.'
      },
      {
        q: 'O que é avaliado na Competência 3?',
        opts: ['A gramática', 'A organização das ideias e o projeto argumentativo', 'O repertório', 'A proposta de intervenção'],
        correct: 1,
        explanation: 'A C3 avalia a organização do texto, a seleção dos argumentos e a coerência do projeto de dizer (argumentação).'
      },
      {
        q: 'Qual competência é diretamente afetada pelo uso inadequado de conectivos?',
        opts: ['C1', 'C2', 'C3', 'C4'],
        correct: 3,
        explanation: 'A C4 avalia especificamente o uso de conectivos e outros recursos de coesão entre as partes do texto.'
      },
      {
        q: 'Um texto que ignora totalmente o tema proposto recebe qual nota?',
        opts: ['200 em gramática', 'Nota zerada em todas as competências', 'Apenas perde pontos em C3', '500 pontos'],
        correct: 1,
        explanation: 'Fuga total ao tema implica nota 0 em todas as competências, independente da qualidade gramatical.'
      },
      {
        q: 'Qual é a pontuação máxima da redação do ENEM?',
        opts: ['500', '800', '900', '1000'],
        correct: 3,
        explanation: 'São 5 competências × 200 pontos = 1000 pontos possíveis.'
      },
    ]
  },

  interv: {
    title: 'Proposta de Intervenção',
    desc: 'A proposta de intervenção é exigida na conclusão da redação do ENEM (Competência 5). Deve conter 5 elementos: Agente (quem vai agir), Ação (o que será feito), Meio/Modo (como será feito), Efeito (qual o impacto esperado) e Finalidade (por que, qual o objetivo). Deve ser viável e respeitar os direitos humanos.',
    video: 'Proposta de Intervenção — Competência 5 ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=AMbFB_cFYek&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=2', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'Quantos elementos deve ter uma proposta de intervenção completa no ENEM?',
        opts: ['3', '4', '5', '6'],
        correct: 2,
        explanation: 'São 5 elementos: Agente, Ação, Meio/Modo, Efeito e Finalidade. Todos contribuem para a nota máxima na C5.'
      },
      {
        q: 'Em "O governo deve criar leis mais rígidas para...", o "governo" representa:',
        opts: ['A ação', 'O meio', 'O agente', 'A finalidade'],
        correct: 2,
        explanation: 'O agente é quem realiza a ação — nesse caso, o governo.'
      },
      {
        q: 'Por que a proposta deve respeitar os direitos humanos?',
        opts: ['É apenas uma sugestão do ENEM', 'Porque propostas que os violam zeram a C5 e podem anular a redação', 'Para ganhar pontos na C1', 'Não há essa exigência'],
        correct: 1,
        explanation: 'O ENEM é explícito: propostas que desrespeitam direitos fundamentais resultam em C5 = 0 e possível anulação.'
      },
      {
        q: '"...por meio de campanhas educativas nas escolas..." indica qual elemento da proposta?',
        opts: ['Agente', 'Efeito', 'Meio/Modo', 'Finalidade'],
        correct: 2,
        explanation: '"Por meio de..." especifica como a ação será realizada — o Meio/Modo da proposta.'
      },
      {
        q: 'Uma proposta vaga como "o problema deve ser resolvido" perde pontos em qual competência?',
        opts: ['C1', 'C3', 'C5', 'C2'],
        correct: 2,
        explanation: 'A vagueza da proposta de intervenção impacta diretamente a C5, que exige detalhamento dos 5 elementos.'
      },
      {
        q: '"...a fim de promover a conscientização da população" indica:',
        opts: ['Agente', 'Ação', 'Meio', 'Finalidade'],
        correct: 3,
        explanation: '"A fim de..." e "para que..." introduzem a finalidade — o objetivo ou propósito da ação proposta.'
      },
    ]
  },

  nota1000: {
    title: 'Redação Nota 1000',
    desc: 'Uma redação nota 1000 no ENEM exige: domínio pleno da norma culta (C1), repertório sociocultural pertinente e produtivo (C2), argumentação sólida e organizada (C3), coesão exemplar com conectivos variados (C4) e proposta de intervenção completa, detalhada e viável (C5). A análise de redações nota mil é fundamental para compreender os critérios.',
    video: 'Redação Nota 1000 — Análise e Estratégias ENEM',
    playlistUrl: 'https://www.youtube.com/watch?v=NYwITitdk0A&list=PLlb9l2qepYgIE5qkgXoyUuHWQVBA9boyk&index=8', // ← substitua pela URL da playlist
    questions: [
      {
        q: 'O que diferencia uma redação nota 1000 das demais?',
        opts: ['Apenas a ausência de erros gramaticais', 'Domínio pleno de todas as 5 competências de forma integrada', 'Uma proposta de intervenção longa', 'O uso de palavras difíceis'],
        correct: 1,
        explanation: 'A nota 1000 resulta do equilíbrio e excelência em todas as 5 competências, de forma integrada e articulada.'
      },
      {
        q: 'Um repertório "produtivo" em uma redação nota 1000 é aquele que:',
        opts: ['Cita muitos autores', 'Está diretamente articulado ao argumento e à tese', 'É longo e detalhado', 'Usa termos filosóficos'],
        correct: 1,
        explanation: 'A produtividade está na pertinência e na forma como o repertório sustenta a argumentação, não na quantidade.'
      },
      {
        q: 'Redações nota 1000 geralmente apresentam introduções que:',
        opts: ['Começam com "Desde os primórdios da humanidade"', 'Contextualizam o tema com repertório e apresentam tese clara', 'Repetem a frase da proposta', 'Fazem perguntas sem resposta'],
        correct: 1,
        explanation: 'Introduções de redações excelentes contextualizam o tema de forma original e apresentam a tese com clareza.'
      },
      {
        q: 'A Competência 4 em nível 5 (máximo) exige:',
        opts: ['Uso de apenas um tipo de conectivo', 'Uso diversificado e correto de mecanismos coesivos', 'Apenas pontuação correta', 'Repetição proposital de palavras'],
        correct: 1,
        explanation: 'O nível máximo da C4 exige variedade e uso preciso de conectivos, pronomes, elipses e outros recursos coesivos.'
      },
      {
        q: 'Por que é importante analisar redações nota 1000 do ENEM?',
        opts: ['Para copiá-las', 'Para compreender na prática os critérios de excelência avaliados', 'Porque são obrigatórias de estudar', 'Para identificar erros gramaticais'],
        correct: 1,
        explanation: 'Analisar redações excelentes ajuda a internalizar os padrões de qualidade esperados, servindo como modelo concreto.'
      },
    ]
  }

};
