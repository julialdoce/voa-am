// js/data/simulados.js — Questões e catálogo de simulados por vestibular

const simuladoQuestions = {
  psc: [
    {
      q: '(PSC 2023) Uma torneira enche um tanque em 3 horas. Outra enche o mesmo tanque em 6 horas. Trabalhando juntas, em quanto tempo encherão o tanque?',
      opts: ['1 hora', '2 horas', '4 horas', '9 horas'],
      correct: 1,
      explanation: 'Taxa combinada = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 tanque/hora. Tempo = 1/(1/2) = 2 horas.'
    },
    {
      q: '(PSC 2022) Se f(x) = 2x² − 3x + 1, então f(2) é igual a:',
      opts: ['3', '2', '1', '4'],
      correct: 0,
      explanation: 'f(2) = 2·(4) − 3·(2) + 1 = 8 − 6 + 1 = 3'
    },
    {
      q: '(PSC 2024) Um produto custava R$80,00. Depois de dois aumentos consecutivos de 10%, o novo preço é:',
      opts: ['R$ 96,00', 'R$ 96,80', 'R$ 88,00', 'R$ 97,00'],
      correct: 1,
      explanation: '80 × 1,10 × 1,10 = 80 × 1,21 = R$ 96,80'
    },
  ],
  enem: [
    {
      q: '(ENEM 2023) Um corredor completa uma maratona de 42 km em 3h30min. Qual é a velocidade média em km/h?',
      opts: ['12 km/h', '13 km/h', '14 km/h', '15 km/h'],
      correct: 0,
      explanation: '3h30min = 3,5h. v = d/t = 42/3,5 = 12 km/h'
    },
    {
      q: '(ENEM 2022) Em uma urna com 4 bolas vermelhas e 6 azuis, qual a probabilidade de sortear uma bola vermelha?',
      opts: ['0,3', '0,4', '0,6', '0,5'],
      correct: 1,
      explanation: 'P = 4/10 = 0,4 = 40%'
    },
  ],
  red: [
    {
      q: 'Na redação do ENEM, a proposta de intervenção deve conter obrigatoriamente:',
      opts: [
        'Apenas a ação e o agente responsável',
        'Ação, agente, modo/meio, finalidade e detalhamento',
        'Introdução, desenvolvimento e conclusão',
        'Citação de autor e dados estatísticos'
      ],
      correct: 1,
      explanation: 'A banca espera os 5 elementos: agente, ação, modo/meio, finalidade e detalhamento.'
    },
  ]
};


// ─── SIMULADOS POR VESTIBULAR ───
const catalogoSimulados = {
  ENEM: [
    { id:'enem-s1', num:1, emoji:'🧮', titulo:'Álgebra & Funções', sub:'Funções, equações, PA/PG', temas:['Funções','Equações','PA/PG','Matrizes'], tempo:45, qs:10,
      cor:'rgba(34,197,94,0.12)', corBorda:'rgba(34,197,94,0.3)', corNum:'#22c55e',
      tags:[{txt:'Funções',c:'rgba(34,197,94,0.15)',tc:'#22c55e'},{txt:'Álgebra',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='ENEM' && ['Função afim','Função quadrática','PA','PG','Matrizes','Sistemas lineares','Funções'].some(t => q.contexto&&q.contexto.includes(t)) },
    { id:'enem-s2', num:2, emoji:'📐', titulo:'Geometria Completa', sub:'Plana, espacial e analítica', temas:['Geometria'], tempo:45, qs:10,
      cor:'rgba(59,130,246,0.1)', corBorda:'rgba(59,130,246,0.25)', corNum:'var(--accent2)',
      tags:[{txt:'Geometria',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'},{txt:'Espacial',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='ENEM' && q.contexto && q.contexto.toLowerCase().includes('geometr') },
    { id:'enem-s3', num:3, emoji:'🎲', titulo:'Estatística & Prob.', sub:'Probabilidade, combinatória, média', temas:['Prob','Estat','Combinatória'], tempo:40, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Probabilidade',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Estatística',c:'rgba(239,68,68,0.1)',tc:'var(--red)'}],
      filtro: q => q.vest==='ENEM' && q.contexto && (q.contexto.includes('Probabilidade')||q.contexto.includes('Estatística')||q.contexto.includes('Combinação')||q.contexto.includes('mbinação')) },
    { id:'enem-s4', num:4, emoji:'🔥', titulo:'Simulado Completo', sub:'Todos os temas — nível avançado', temas:['Todos'], tempo:90, qs:15,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'Completo',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Avançado',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='ENEM' },
  ],
  MACRO: [
    { id:'macro-s1', num:1, emoji:'🔢', titulo:'Álgebra Avançada', sub:'Log, exp, polinômios, sistemas', tempo:45, qs:10,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'Logaritmos',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Exponenciais',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'}],
      filtro: q => q.vest==='MACRO' && q.contexto && (q.contexto.includes('Logarit')||q.contexto.includes('exponencial')||q.contexto.includes('Polinôm')) },
    { id:'macro-s2', num:2, emoji:'📊', titulo:'Geometria & Trigon.', sub:'Geometria espacial, trigonometria', tempo:45, qs:10,
      cor:'rgba(59,130,246,0.1)', corBorda:'rgba(59,130,246,0.25)', corNum:'var(--accent2)',
      tags:[{txt:'Geometria',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'},{txt:'Trigonometria',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='MACRO' && q.contexto && (q.contexto.toLowerCase().includes('geometr')||q.contexto.includes('rigonometr')) },
    { id:'macro-s3', num:3, emoji:'🧩', titulo:'Matrizes & Combinat.', sub:'Matrizes, determinantes, combinatória', tempo:40, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Matrizes',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Combinatória',c:'rgba(34,197,94,0.1)',tc:'#22c55e'}],
      filtro: q => q.vest==='MACRO' && q.contexto && (q.contexto.includes('Matr')||q.contexto.includes('eterminant')||q.contexto.includes('ombinação')||q.contexto.includes('Probabilidade')) },
    { id:'macro-s4', num:4, emoji:'🏆', titulo:'Simulado Gabarito', sub:'Todos os anos — alta dificuldade', tempo:90, qs:15,
      cor:'rgba(244,168,51,0.12)', corBorda:'rgba(244,168,51,0.3)', corNum:'var(--gold)',
      tags:[{txt:'Completo',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Difícil',c:'rgba(239,68,68,0.1)',tc:'var(--red)'}],
      filtro: q => q.vest==='MACRO' },
  ],
  PSC1: [
    { id:'psc1-s1', num:1, emoji:'🔢', titulo:'Operações & Frações', sub:'Cálculo básico, porcentagem, razão', tempo:30, qs:10,
      cor:'rgba(59,130,246,0.1)', corBorda:'rgba(59,130,246,0.25)', corNum:'var(--accent2)',
      tags:[{txt:'Aritmética',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'},{txt:'Porcentagem',c:'rgba(34,197,94,0.1)',tc:'#22c55e'}],
      filtro: q => q.vest==='PSC' && q.etapa===1 && q.contexto && (q.contexto.includes('Porcentagem')||q.contexto.includes('Fração')||q.contexto.includes('Divisão')||q.contexto.includes('Regra de três')) },
    { id:'psc1-s2', num:2, emoji:'📐', titulo:'Geometria Plana', sub:'Áreas, perímetros, Pitágoras', tempo:30, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Geometria',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Pitágoras',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===1 && q.contexto && (q.contexto.toLowerCase().includes('geometr')||q.contexto.includes('itágoras')||q.contexto.includes('ângulo')) },
    { id:'psc1-s3', num:3, emoji:'🔡', titulo:'Equações & Álgebra', sub:'1º e 2º grau, produtos notáveis', tempo:30, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Equações',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Álgebra',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===1 && q.contexto && (q.contexto.includes('quação')||q.contexto.includes('Função')||q.contexto.includes('produto')) },
    { id:'psc1-s4', num:4, emoji:'🎯', titulo:'Simulado PSC 1 Completo', sub:'Todos os temas do 1º ano', tempo:60, qs:10,
      cor:'rgba(34,197,94,0.1)', corBorda:'rgba(34,197,94,0.25)', corNum:'#22c55e',
      tags:[{txt:'PSC 1ª Etapa',c:'rgba(34,197,94,0.1)',tc:'#22c55e'},{txt:'Completo',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===1 },
  ],
  PSC2: [
    { id:'psc2-s1', num:1, emoji:'📊', titulo:'Trig. & Funções', sub:'Trigonometria, funções exponenciais', tempo:35, qs:10,
      cor:'rgba(59,130,246,0.1)', corBorda:'rgba(59,130,246,0.25)', corNum:'var(--accent2)',
      tags:[{txt:'Trigonometria',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'},{txt:'Funções',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='PSC' && q.etapa===2 && q.contexto && (q.contexto.includes('rigonometr')||q.contexto.includes('Função')||q.contexto.includes('xponencial')) },
    { id:'psc2-s2', num:2, emoji:'🔷', titulo:'Geometria Espacial', sub:'Volumes, áreas de sólidos', tempo:35, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Espacial',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Volumes',c:'rgba(34,197,94,0.1)',tc:'#22c55e'}],
      filtro: q => q.vest==='PSC' && q.etapa===2 && q.contexto && (q.contexto.includes('spacial')||q.contexto.includes('Volume')||q.contexto.includes('pirâmide')||q.contexto.includes('ilindro')) },
    { id:'psc2-s3', num:3, emoji:'🧮', titulo:'Matrizes & Sistemas', sub:'Matrizes, determinantes, sistemas', tempo:35, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Matrizes',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Sistemas',c:'rgba(239,68,68,0.1)',tc:'var(--red)'}],
      filtro: q => q.vest==='PSC' && q.etapa===2 && q.contexto && (q.contexto.includes('Matr')||q.contexto.includes('eterminant')||q.contexto.includes('istemas')) },
    { id:'psc2-s4', num:4, emoji:'🎯', titulo:'Simulado PSC 2 Completo', sub:'Todos os temas do 2º ano', tempo:60, qs:10,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'PSC 2ª Etapa',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Completo',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===2 },
  ],
  PSC3: [
    { id:'psc3-s1', num:1, emoji:'📈', titulo:'Log., Exp. & Cônicas', sub:'Logaritmos, cônicas, números complexos', tempo:45, qs:10,
      cor:'rgba(34,197,94,0.1)', corBorda:'rgba(34,197,94,0.25)', corNum:'#22c55e',
      tags:[{txt:'Logaritmos',c:'rgba(34,197,94,0.1)',tc:'#22c55e'},{txt:'Cônicas',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===3 && q.contexto && (q.contexto.includes('Logarit')||q.contexto.includes('ônica')||q.contexto.includes('complexo')) },
    { id:'psc3-s2', num:2, emoji:'🎲', titulo:'Combinatória & Prob.', sub:'Combinações, arranjos, probabilidade', tempo:40, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Combinatória',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Probabilidade',c:'rgba(239,68,68,0.1)',tc:'var(--red)'}],
      filtro: q => q.vest==='PSC' && q.etapa===3 && q.contexto && (q.contexto.includes('Combinação')||q.contexto.includes('Arranjo')||q.contexto.includes('Probabilidade')||q.contexto.includes('Permutação')) },
    { id:'psc3-s3', num:3, emoji:'📊', titulo:'Geometria Analítica', sub:'Pontos, retas, circunferências', tempo:45, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Geo. Analítica',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Circunferências',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='PSC' && q.etapa===3 && q.contexto && q.contexto.includes('analítica') },
    { id:'psc3-s4', num:4, emoji:'🏆', titulo:'Simulado PSC 3 Completo', sub:'Alta dificuldade — todos os temas', tempo:60, qs:10,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'PSC 3ª Etapa',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Avançado',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='PSC' && q.etapa===3 },
  ],
  SIS1: [
    { id:'sis1-s1', num:1, emoji:'🔢', titulo:'Álgebra & Funções', sub:'Funções, equações, sequências', tempo:40, qs:10,
      cor:'rgba(245,158,11,0.1)', corBorda:'rgba(245,158,11,0.25)', corNum:'var(--amber)',
      tags:[{txt:'Funções',c:'rgba(245,158,11,0.1)',tc:'var(--amber)'},{txt:'Álgebra',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===1 && q.contexto && (q.contexto.includes('Função')||q.contexto.includes('quação')||q.contexto.includes('Polinôm')) },
    { id:'sis1-s2', num:2, emoji:'📐', titulo:'Geometria & Trigon.', sub:'Plana, espacial, trigonometria', tempo:40, qs:10,
      cor:'rgba(59,130,246,0.1)', corBorda:'rgba(59,130,246,0.25)', corNum:'var(--accent2)',
      tags:[{txt:'Geometria',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'},{txt:'Trigonometria',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='SIS' && q.etapa===1 && q.contexto && (q.contexto.toLowerCase().includes('geometr')||q.contexto.includes('rigonometr')) },
    { id:'sis1-s3', num:3, emoji:'🧮', titulo:'Matrizes & Log.', sub:'Matrizes, determinantes, logaritmos', tempo:40, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Matrizes',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Logaritmos',c:'rgba(34,197,94,0.1)',tc:'#22c55e'}],
      filtro: q => q.vest==='SIS' && q.etapa===1 && q.contexto && (q.contexto.includes('Matr')||q.contexto.includes('eterminant')||q.contexto.includes('Logarit')) },
    { id:'sis1-s4', num:4, emoji:'🏆', titulo:'Simulado SIS 1 Completo', sub:'Todos os temas — nível universitário', tempo:90, qs:15,
      cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)',
      tags:[{txt:'SIS 1ª Etapa',c:'rgba(245,158,11,0.1)',tc:'var(--amber)'},{txt:'Completo',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===1 },
  ],
  SIS2: [
    { id:'sis2-s1', num:1, emoji:'📈', titulo:'Cálculo & Análise', sub:'Limites, derivadas, integrais', tempo:45, qs:10,
      cor:'rgba(34,197,94,0.1)', corBorda:'rgba(34,197,94,0.25)', corNum:'#22c55e',
      tags:[{txt:'Cálculo',c:'rgba(34,197,94,0.1)',tc:'#22c55e'},{txt:'Limites',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===2 && q.contexto && (q.contexto.includes('Integral')||q.contexto.includes('Limite')||q.contexto.includes('erivada')) },
    { id:'sis2-s2', num:2, emoji:'🎲', titulo:'Probabilidade & Estat.', sub:'Distribuições, estatística', tempo:40, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Probabilidade',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Estatística',c:'rgba(239,68,68,0.1)',tc:'var(--red)'}],
      filtro: q => q.vest==='SIS' && q.etapa===2 && q.contexto && (q.contexto.includes('Probabilidade')||q.contexto.includes('Estatística')||q.contexto.includes('Poisson')||q.contexto.includes('Normal')) },
    { id:'sis2-s3', num:3, emoji:'🔷', titulo:'Geo. Analítica Avançada', sub:'Cônicas, vetores, coordenadas', tempo:45, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Cônicas',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Vetores',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===2 && q.contexto && (q.contexto.includes('ônica')||q.contexto.includes('Vetor')||q.contexto.includes('analítica')) },
    { id:'sis2-s4', num:4, emoji:'🏆', titulo:'Simulado SIS 2 Completo', sub:'Alta complexidade — todos os temas', tempo:90, qs:15,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'SIS 2ª Etapa',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Avançado',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='SIS' && q.etapa===2 },
  ],
  SIS3: [
    { id:'sis3-s1', num:1, emoji:'∫', titulo:'Cálculo Integral', sub:'Integrais definidas e indefinidas', tempo:45, qs:10,
      cor:'rgba(34,197,94,0.1)', corBorda:'rgba(34,197,94,0.25)', corNum:'#22c55e',
      tags:[{txt:'Integral',c:'rgba(34,197,94,0.1)',tc:'#22c55e'},{txt:'Cálculo',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===3 && q.contexto && q.contexto.includes('Integral') },
    { id:'sis3-s2', num:2, emoji:'📊', titulo:'Estatística Avançada', sub:'Distribuições de probabilidade', tempo:40, qs:10,
      cor:'rgba(244,168,51,0.1)', corBorda:'rgba(244,168,51,0.25)', corNum:'var(--gold)',
      tags:[{txt:'Distribuições',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'},{txt:'Inferência',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'}],
      filtro: q => q.vest==='SIS' && q.etapa===3 && q.contexto && (q.contexto.includes('Estatística')||q.contexto.includes('Probabilidade')||q.contexto.includes('Poisson')) },
    { id:'sis3-s3', num:3, emoji:'🔢', titulo:'Álgebra Superior', sub:'Álgebra linear, transformações', tempo:45, qs:10,
      cor:'rgba(139,92,246,0.1)', corBorda:'rgba(139,92,246,0.25)', corNum:'var(--violet)',
      tags:[{txt:'Álgebra Linear',c:'rgba(139,92,246,0.1)',tc:'var(--violet)'},{txt:'Matrizes',c:'rgba(59,130,246,0.1)',tc:'var(--accent2)'}],
      filtro: q => q.vest==='SIS' && q.etapa===3 && q.contexto && (q.contexto.includes('Matr')||q.contexto.includes('Sistema')||q.contexto.includes('Polinôm')) },
    { id:'sis3-s4', num:4, emoji:'🏆', titulo:'Simulado SIS 3 Completo', sub:'Nível máximo — todas as áreas', tempo:90, qs:15,
      cor:'rgba(239,68,68,0.1)', corBorda:'rgba(239,68,68,0.25)', corNum:'var(--red)',
      tags:[{txt:'SIS 3ª Etapa',c:'rgba(239,68,68,0.1)',tc:'var(--red)'},{txt:'Máximo',c:'rgba(244,168,51,0.1)',tc:'var(--gold)'}],
      filtro: q => q.vest==='SIS' && q.etapa===3 },
  ],
};

function simVestAba(vest, el) {
  simVestAtual = vest;
  document.querySelectorAll('#sim-vest-tabs .sim-vest-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  renderSimCards();
}

function renderSimCards() {
  const container = document.getElementById('sim-cards-container');
  if (!container) return;
  const lista = catalogoSimulados[simVestAtual] || [];
  container.innerHTML = lista.map((s, idx) => {
    const pool = bancoDB.filter(s.filtro);
    const n = pool.length;
    const disponivel = n >= s.qs;
    const dificLabel = idx === 0 ? '🟢 Fácil' : idx === 1 ? '🟡 Médio' : idx === 2 ? '🟠 Difícil' : '🔴 Completo';
    return `<div class="sim-card" onclick="${disponivel ? `iniciarSimuladoCatalogo('${s.id}')` : "showXPToast('⚠️ Poucas questões para este simulado')"}"
      style="border-color:${s.corBorda};${!disponivel?'opacity:0.6':''}">
      <div class="sim-card-header">
        <div class="sim-card-num" style="background:${s.cor};color:${s.corNum}">${s.emoji}</div>
        <div>
          <div class="sim-card-title">${s.titulo}</div>
          <div class="sim-card-sub">${s.sub}</div>
        </div>
        <div style="margin-left:auto;color:var(--text2);font-size:20px">›</div>
      </div>
      <div class="sim-card-tags">
        ${s.tags.map(t=>`<span class="sim-tag" style="background:${t.c};color:${t.tc}">${t.txt}</span>`).join('')}
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">⏱️ ${s.tempo}min</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">${s.qs} questões</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">${dificLabel}</span>
        <span class="sim-tag" style="background:rgba(255,255,255,0.05);color:var(--text2)">📚 ${n} no banco</span>
      </div>
    </div>`;
  }).join('');
}

function iniciarSimuladoCatalogo(id) {
  const vest = simVestAtual;
  const sim = (catalogoSimulados[vest]||[]).find(s => s.id === id);
  if (!sim) return;
  let pool = bancoDB.filter(sim.filtro);
  if (pool.length < 1) { showXPToast('⚠️ Sem questões disponíveis'); return; }
  // Embaralha e pega até sim.qs
  pool = pool.sort(() => Math.random()-0.5).slice(0, sim.qs);
  const qs = pool.map(q => ({
    q: q.enunciado, opts: q.opcoes, correct: q.correta,
    explanation: q.contexto || `Gabarito: ${q.gabarito}`, materia: q.materia, id: q.id
  }));
  currentQuiz = { title: `${vest} — ${sim.titulo}`, desc: `Simulado cronometrado. ${sim.tempo} minutos. ${sim.sub}.`, video: null, questions: qs };
  currentQuizIdx = 0; quizCorrect = 0; isSimulado = true;
  document.getElementById('aula-title').textContent = currentQuiz.title;
  document.getElementById('aula-content').innerHTML = `
    <div class="topic-desc">${currentQuiz.desc}</div>
    <div class="quiz-title-bar">
      <span class="quiz-badge" style="background:${sim.cor};color:${sim.corNum}">🎯 Simulado</span>
      <span class="quiz-progress-text">0 / ${qs.length} questões</span>
    </div>
    <div id="quiz-area"></div>`;
  document.getElementById('aula-view').classList.add('open');
  iniciarCronometro(sim.tempo * 60);
  renderQuestion();
}

// Manter compatibilidade com chamadas antigas
function abrirModalSimulado() { goTo('praticar'); pratAba('sim'); }
function fecharModalSimulado() {}
