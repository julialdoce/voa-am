// js/data/quizzes.js — Aulas e quizzes por tópico
// Para adicionar: crie uma nova chave com { title, desc, video, questions[] }

const quizzes = {
  funcao_afim: {
    title: 'Função Afim',
    desc: 'A função afim (ou função do 1º grau) tem a forma f(x) = ax + b, onde a ≠ 0. O coeficiente "a" determina o crescimento e "b" é o ponto onde o gráfico corta o eixo y.',
    video: 'Função Afim — PSC/ENEM',
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
    ]
  },
  funcao_quad: {
    title: 'Função Quadrática',
    desc: 'A função quadrática tem a forma f(x) = ax² + bx + c, com a ≠ 0. Seu gráfico é uma parábola. O vértice representa o ponto de máximo (a < 0) ou mínimo (a > 0).',
    video: 'Função Quadrática — PSC/ENEM',
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
        explanation: 'O vértice da parábola: x_v = −b/2a = −4/(2·(−1)) = 2. f(2) = −4 + 8 = 4'
      },
    ]
  },
  conjuntos: {
    title: 'Conjuntos e Números',
    desc: 'Os conjuntos numéricos são: Naturais (ℕ), Inteiros (ℤ), Racionais (ℚ), Irracionais (𝕀) e Reais (ℝ). Todo número racional pode ser escrito como fração p/q.',
    video: 'Conjuntos Numéricos — Fundamentos',
    questions: [
      {
        q: 'O número √2 pertence a qual conjunto numérico?',
        opts: ['Racionais (ℚ)', 'Inteiros (ℤ)', 'Irracionais (𝕀)', 'Naturais (ℕ)'],
        correct: 2,
        explanation: '√2 ≈ 1,41421... é um número não periódico e não pode ser escrito como fração. Logo, é irracional.'
      },
    ]
  }
};

