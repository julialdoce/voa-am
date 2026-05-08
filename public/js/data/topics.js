// js/data/topics.js — Tópicos de Matemática e Redação por série
// Para adicionar tópicos: insira objetos nos arrays abaixo.
// quizId deve corresponder a uma chave em js/data/quizzes.js

const mathTopics = {
  1: [
    { icon:'📊', name:'Conjuntos e Números Reais', sub:'6 questões', status:'done', emoji:'✓', quizId:'conjuntos' },
    { icon:'📈', name:'Função Afim (1º grau)', sub:'8 questões', status:'done', emoji:'✓', quizId:'funcao_afim' },
    { icon:'📉', name:'Função Quadrática (2º grau)', sub:'8 questões', status:'partial', emoji:'½', quizId:'funcao_quad' },
    { icon:'🔢', name:'Progressão Aritmética (PA)', sub:'6 questões', status:'', emoji:'', quizId:'pa' },
    { icon:'⚡', name:'Progressão Geométrica (PG)', sub:'6 questões', status:'', emoji:'', quizId:'pg' },
    { icon:'📐', name:'Trigonometria Básica', sub:'8 questões', status:'', emoji:'', quizId:'trig' },
    { icon:'🔷', name:'Geometria Plana', sub:'6 questões', status:'', emoji:'', quizId:'geo_plana' },
  ],
  2: [
    { icon:'📊', name:'Trigonometria Completa', sub:'8 questões', status:'', emoji:'', quizId:'trig2' },
    { icon:'🔲', name:'Matrizes e Determinantes', sub:'6 questões', status:'', emoji:'', quizId:'matrizes' },
    { icon:'🔗', name:'Sistemas Lineares', sub:'6 questões', status:'', emoji:'', quizId:'sistemas' },
    { icon:'🔺', name:'Geometria Espacial', sub:'8 questões', status:'', emoji:'', quizId:'geo_esp' },
    { icon:'📐', name:'Geometria Analítica', sub:'8 questões', status:'', emoji:'', quizId:'geo_anal' },
  ],
  3: [
    { icon:'📊', name:'Logaritmos e Exponenciais', sub:'8 questões', status:'', emoji:'', quizId:'log' },
    { icon:'🎲', name:'Análise Combinatória', sub:'6 questões', status:'', emoji:'', quizId:'comb' },
    { icon:'🎯', name:'Probabilidade', sub:'6 questões', status:'', emoji:'', quizId:'prob' },
    { icon:'📈', name:'Estatística', sub:'6 questões', status:'', emoji:'', quizId:'estat' },
    { icon:'💰', name:'Matemática Financeira', sub:'6 questões', status:'', emoji:'', quizId:'fin' },
  ]
};

const redTopics = {
  1: [
    { icon:'📖', name:'Tipos Textuais', sub:'4 questões', status:'done', emoji:'✓', quizId:'tipos' },
    { icon:'🔗', name:'Coerência e Coesão', sub:'6 questões', status:'', emoji:'', quizId:'coerencia' },
    { icon:'🔡', name:'Elementos da Narrativa', sub:'4 questões', status:'', emoji:'', quizId:'narr' },
  ],
  2: [
    { icon:'✍️', name:'Artigo de Opinião', sub:'6 questões', status:'', emoji:'', quizId:'artigo' },
    { icon:'💬', name:'Argumentação', sub:'6 questões', status:'', emoji:'', quizId:'arg' },
    { icon:'🧩', name:'Contra-argumento', sub:'4 questões', status:'', emoji:'', quizId:'contra' },
    { icon:'🎨', name:'Repertório Sociocultural', sub:'6 questões', status:'', emoji:'', quizId:'rep' },
  ],
  3: [
    { icon:'📝', name:'Dissertação Argumentativa', sub:'8 questões', status:'', emoji:'', quizId:'diss' },
    { icon:'🌟', name:'5 Competências ENEM', sub:'10 questões', status:'', emoji:'', quizId:'comp' },
    { icon:'🔧', name:'Proposta de Intervenção', sub:'6 questões', status:'', emoji:'', quizId:'interv' },
    { icon:'🏆', name:'Redação Nota 1000', sub:'Análise', status:'', emoji:'', quizId:'nota1000' },
  ]
};

