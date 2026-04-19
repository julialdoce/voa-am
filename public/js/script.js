// ─── PERFIL DO ALUNO (localStorage) ───
let perfil = JSON.parse(localStorage.getItem('voaam_perfil') || 'null');

// ─── STATE ───
let state = {
  xp: parseInt(localStorage.getItem('xp') || '0'),
  streak: parseInt(localStorage.getItem('streak') || '0'),
  aulas: parseInt(localStorage.getItem('aulas') || '0'),
  quizDone: parseInt(localStorage.getItem('quizDone') || '0'),
  quizCorrect: parseInt(localStorage.getItem('quizCorrect') || '0'),
  currentSubject: 'mat',
  currentSerie: perfil ? (perfil.serie <= 3 ? perfil.serie : 3) : 1,
  currentSerieRed: 1,
};

function salvarState() {
  localStorage.setItem('xp', state.xp);
  localStorage.setItem('streak', state.streak);
  localStorage.setItem('aulas', state.aulas);
  localStorage.setItem('quizDone', state.quizDone);
  localStorage.setItem('quizCorrect', state.quizCorrect);
}

// ─── CORAÇÕES ───
const MAX_CORACOES = 3;
function getCoracoes() {
  const d = JSON.parse(localStorage.getItem('coracoes') || 'null');
  if (!d) return { qtd: MAX_CORACOES, recargaTs: null };
  // verifica se já passou 1 dia desde a recarga agendada
  if (d.recargaTs && Date.now() >= d.recargaTs) {
    const novo = { qtd: MAX_CORACOES, recargaTs: null };
    localStorage.setItem('coracoes', JSON.stringify(novo));
    return novo;
  }
  return d;
}
function setCoracoes(qtd) {
  const recargaTs = qtd <= 0 ? (Date.now() + 24*60*60*1000) : null;
  localStorage.setItem('coracoes', JSON.stringify({ qtd, recargaTs }));
}
function perderCoracao() {
  const c = getCoracoes();
  const novo = Math.max(0, c.qtd - 1);
  setCoracoes(novo);
  renderCoracoes();
  return novo;
}
function ganharCoracao() { // desbloqueio por conteúdo
  const c = getCoracoes();
  if (c.qtd < MAX_CORACOES) { setCoracoes(c.qtd + 1); renderCoracoes(); }
}
function renderCoracoes() {
  const c = getCoracoes();
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('c'+i);
    if (el) el.classList.toggle('vazio', i > c.qtd);
  }
  const banner = document.getElementById('bloqueado-banner');
  const filtros = document.getElementById('ex-filtros');
  const lista = document.getElementById('ex-lista');
  const reforco = document.getElementById('reforco-banner');
  if (c.qtd <= 0) {
    if (banner) banner.style.display = 'block';
    if (filtros) filtros.style.display = 'none';
    if (lista) lista.innerHTML = '';
    if (reforco) reforco.style.display = 'none';
    iniciarTimerRecarga(c.recargaTs);
  } else {
    if (banner) banner.style.display = 'none';
    if (filtros) filtros.style.display = 'block';
  }
  const info = document.getElementById('recarga-info');
  if (info && c.qtd > 0 && c.qtd < MAX_CORACOES) info.textContent = '(recarregam amanhã)';
  else if (info) info.textContent = '';
}
let timerRecargaInterval = null;
function iniciarTimerRecarga(ts) {
  if (!ts) return;
  clearInterval(timerRecargaInterval);
  timerRecargaInterval = setInterval(() => {
    const rest = ts - Date.now();
    if (rest <= 0) { clearInterval(timerRecargaInterval); renderCoracoes(); return; }
    const h = Math.floor(rest/3600000);
    const m = Math.floor((rest%3600000)/60000);
    const s = Math.floor((rest%60000)/1000);
    const el = document.getElementById('bloqueado-timer');
    if (el) el.textContent = `⏱️ ${h}h ${m}m ${s}s`;
  }, 1000);
}

// ─── ONBOARDING ───
let obSerie = null, obVests = [], obDific = null;

function obValidar(step) {
  const btn = document.getElementById('ob-btn-'+step);
  if (!btn) return;
  if (step === 0) btn.disabled = !document.getElementById('ob-nome').value.trim();
}
function obSelecionarSerie(n, el) {
  obSerie = n;
  document.querySelectorAll('#ob-step-1 .ob-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('ob-btn-1').disabled = false;
}
function obSelecionarVest(v, el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    obVests = obVests.filter(x => x !== v);
  } else {
    el.classList.add('selected');
    obVests.push(v);
  }
  document.getElementById('ob-btn-2').disabled = obVests.length === 0;
}
function obSelecionarDific(d, el) {
  obDific = d;
  document.querySelectorAll('#ob-step-3 .ob-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('ob-btn-3').disabled = false;
}
function obProximo(step) {
  document.querySelectorAll('.ob-step').forEach(s => s.classList.remove('active'));
  document.getElementById('ob-step-'+step).classList.add('active');
  for (let i = 0; i < 4; i++) {
    document.getElementById('dot-'+i)?.classList.toggle('active', i <= step);
  }
}
function obFinalizar() {
  const nome = document.getElementById('ob-nome').value.trim();
  perfil = { nome, serie: obSerie, vests: obVests, dific: obDific };
  localStorage.setItem('voaam_perfil', JSON.stringify(perfil));
  state.currentSerie = obSerie <= 3 ? obSerie : 3;
  document.getElementById('onboarding').classList.add('hidden');
  aplicarPerfil();
}
function aplicarPerfil() {
  if (!perfil) return;
  const primeiro = perfil.nome.split(' ')[0];
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = `Olá, ${primeiro}! 👋`;
  const rankNome = document.getElementById('rank-nome');
  if (rankNome) rankNome.textContent = primeiro;

  // Streak
  verificarStreak();

  // Cards do vestibular na home
  const vestInfo = {
    SIS: { cls:'sis', tag:'Seriado', inst:'UEA', date:'Jul–Jan' },
    PSC: { cls:'psc', tag:'Seriado', inst:'UFAM', date:'Nov–Jan' },
    MACRO: { cls:'macro', tag:'Tradicional', inst:'UEA', date:'Jan–Fev' },
    ENEM: { cls:'enem', tag:'Nacional', inst:'MEC/INEP', date:'Nov' },
  };
  const container = document.getElementById('home-vest-cards');
  if (container && perfil.vests) {
    container.innerHTML = perfil.vests.map(v => {
      const info = vestInfo[v] || {};
      return `<div class="vest-card ${info.cls||''}" onclick="goTo('vestibulares')">
        <div class="vest-tag">${info.tag||''}</div>
        <div class="vest-name">${v}</div>
        <div class="vest-inst">${info.inst||''}</div>
        <div class="vest-date">📅 ${info.date||''}</div>
      </div>`;
    }).join('');
  }

  // Sub do simulado na home
  const simSub = document.getElementById('home-sim-sub');
  if (simSub && perfil.vests && perfil.vests[0]) simSub.textContent = `Simulado ${perfil.vests[0]} cronometrado`;

  // Serie no sub da home
  const matSub = document.getElementById('home-mat-sub');
  const serieLabel = ['','1ª Série','2ª Série','3ª Série','EM Completo'];
  if (matSub) matSub.textContent = `${serieLabel[perfil.serie]||''} — Continue de onde parou`;

  updateStats();
  renderCoracoes();
}

// ─── DATA ───
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

// ─── NAVIGATION ───
function toggleVest(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}

// ─── MATÉRIA ───
function selectSubject(subj) {
  state.currentSubject = subj;
  document.getElementById('tab-mat').classList.toggle('active', subj === 'mat');
  document.getElementById('tab-red').classList.toggle('active', subj === 'red');
  document.getElementById('serie-selector-mat').style.display = subj === 'mat' ? 'flex' : 'none';
  document.getElementById('serie-selector-red').style.display = subj === 'red' ? 'flex' : 'none';
  renderTopics();
}

function selectSerie(n) {
  state.currentSerie = n;
  document.querySelectorAll('#serie-selector-mat .serie-btn').forEach((b,i) => {
    b.classList.toggle('active', i+1 === n);
  });
  renderTopics();
}

function selectSerieRed(n) {
  state.currentSerieRed = n;
  document.querySelectorAll('#serie-selector-red .serie-btn').forEach((b,i) => {
    b.classList.toggle('active', i+1 === n);
  });
  renderTopics();
}

function renderTopics() {
  const list = document.getElementById('topics-list');
  const topics = state.currentSubject === 'mat'
    ? mathTopics[state.currentSerie]
    : redTopics[state.currentSerieRed];

  list.innerHTML = topics.map(t => `
    <div class="topic-card" onclick="openAula('${t.quizId}')">
      <div class="topic-icon">${t.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${t.name}</div>
        <div class="topic-meta">${t.sub}</div>
      </div>
      <div class="topic-status">
        <div class="topic-check ${t.status}">${t.emoji}</div>
      </div>
    </div>
  `).join('');
}

// ─── AULA / QUIZ ───
let currentQuiz = null;
let currentQuizIdx = 0;
let quizCorrect = 0;
let answered = false;
let isSimulado = false;

function openAula(quizId) {
  const quiz = quizzes[quizId];
  if(!quiz) {
    // Generic placeholder for topics without quiz data
    openGenericAula(quizId);
    return;
  }
  currentQuiz = quiz;
  currentQuizIdx = 0;
  quizCorrect = 0;
  isSimulado = false;
  document.getElementById('aula-title').textContent = quiz.title;
  renderAulaContent();
  document.getElementById('aula-view').classList.add('open');
  addXP(10);
  state.aulas++;
  updateStats();
}

function openGenericAula(id) {
  document.getElementById('aula-title').textContent = 'Aula — Em breve';
  document.getElementById('aula-content').innerHTML = `
    <div class="video-area">
      <div class="video-thumb-bg">
        <div class="play-btn">▶</div>
        <div class="video-label">Videoaula disponível em breve</div>
      </div>
    </div>
    <div class="topic-desc">
      Este conteúdo está sendo produzido. Em breve você terá acesso à videoaula e questões de treino!
    </div>
    <button class="btn-secondary" onclick="closeAula()" style="margin-top:8px">← Voltar</button>
  `;
  document.getElementById('aula-view').classList.add('open');
}

function renderAulaContent() {
  const quiz = currentQuiz;
  if(currentQuizIdx === 0) {
    // Show lesson intro first
    document.getElementById('aula-content').innerHTML = `
      <div class="video-area" onclick="showVideoMsg()">
        <div class="video-thumb-bg">
          <div class="play-btn">▶</div>
          <div class="video-label">${quiz.video}</div>
        </div>
      </div>
      <div class="topic-desc">${quiz.desc}</div>
      <div class="quiz-title-bar">
        <span class="quiz-badge">⚡ Quiz</span>
        <span class="quiz-progress-text">0 / ${quiz.questions.length} questões</span>
      </div>
      <div id="quiz-area"></div>
    `;
    renderQuestion();
  } else {
    renderQuestion();
  }
}

function renderQuestion() {
  const quiz = currentQuiz;
  if(currentQuizIdx >= quiz.questions.length) {
    showQuizResult();
    return;
  }
  answered = false;
  const q = quiz.questions[currentQuizIdx];
  const letters = ['A','B','C','D'];
  const quizArea = document.getElementById('quiz-area') || document.getElementById('aula-content');

  // Update progress text
  const pt = document.querySelector('.quiz-progress-text');
  if(pt) pt.textContent = `${currentQuizIdx} / ${quiz.questions.length} questões`;

  quizArea.innerHTML = `
    <div class="question-card">
      <div class="question-text">${q.q}</div>
      <div class="options-list" id="options-list">
        ${q.opts.map((opt, i) => `
          <button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
            <span class="option-letter">${letters[i]}</span>${opt}
          </button>
        `).join('')}
      </div>
      <div class="feedback-box" id="feedback-box"></div>
      <button class="next-q-btn" id="next-btn" onclick="nextQuestion()">
        ${currentQuizIdx + 1 < quiz.questions.length ? 'Próxima questão →' : 'Ver resultado 🎯'}
      </button>
    </div>
  `;
}

function selectOption(idx) {
  if(answered) return;
  answered = true;
  const q = currentQuiz.questions[currentQuizIdx];
  const correct = q.correct;
  const feedback = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');
  const opts = document.querySelectorAll('.option-btn');

  opts[correct].classList.add('correct');
  opts.forEach(b => b.disabled = true);

  if(idx === correct) {
    quizCorrect++;
    state.quizCorrect++;
    feedback.className = 'feedback-box correct show';
    feedback.innerHTML = '✅ Correto! ' + q.explanation;
    addXP(20);
    spawnStars();
  } else {
    opts[idx].classList.add('wrong');
    feedback.className = 'feedback-box wrong show';
    feedback.innerHTML = `❌ Ops! A resposta certa era a opção ${['A','B','C','D'][correct]}. ${q.explanation}`;
    addXP(5);
  }

  state.quizDone++;
  nextBtn.classList.add('show');
  updateStats();
}

function nextQuestion() {
  currentQuizIdx++;
  renderQuestion();
}

function showQuizResult() {
  const quiz = currentQuiz;
  const total = quiz.questions.length;
  const pct = Math.round((quizCorrect/total)*100);
  let emoji, title, insight;

  if(pct >= 80) {
    emoji = '🏆'; title = 'Mandou muito bem!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Excelente domínio do conteúdo! Avance para o próximo tópico.`;
  } else if(pct >= 50) {
    emoji = '💪'; title = 'Quase lá!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Revise os conceitos das questões que errou e tente novamente.`;
  } else {
    emoji = '📖'; title = 'Continue estudando!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Assista à videoaula novamente antes de tentar o quiz. Você consegue!`;
  }

  document.getElementById('aula-content').innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${emoji}</div>
      <div class="result-title">${title}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-sub">${quizCorrect} de ${total} acertos</div>
      <div class="result-stats-row">
        <div class="rstat">
          <div class="rstat-val" style="color:var(--green)">${quizCorrect}</div>
          <div class="rstat-lbl">Acertos</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--red)">${total-quizCorrect}</div>
          <div class="rstat-lbl">Erros</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--gold)">${quizCorrect*20+5*(total-quizCorrect)}</div>
          <div class="rstat-lbl">XP ganho</div>
        </div>
      </div>
      <div class="result-insight">💡 <strong>Insight:</strong> ${insight}</div>
      <div class="result-btns">
        <button class="btn-primary" onclick="retryQuiz()">🔄 Tentar novamente</button>
        <button class="btn-secondary" onclick="closeAula()">← Voltar à lista</button>
      </div>
    </div>
  `;
  if(pct >= 80) {
    setTimeout(() => showAchievement('🎓', 'Quiz Concluído!'), 500);
  }
}

function retryQuiz() {
  currentQuizIdx = 0;
  quizCorrect = 0;
  renderAulaContent();
}

function closeAula() {
  document.getElementById('aula-view').classList.remove('open');
  pararCronometro();
}

// ─── SIMULADO CRONOMETRADO ───
let cronometroInterval = null;
let cronometroSegundos = 0;

const etapasSIS = {
  dia1: { label:'Dia 1 — Linguagens + Humanas', materias:['Português','Inglês','Espanhol','Literatura','História','Geografia'], minutos: 180 },
  dia2: { label:'Dia 2 — Exatas + Redação', materias:['Matemática','Física','Química','Biologia','Redação'], minutos: 180 },
};
const etadasPSC = {
  tudo: { label:'Prova Única — Todas as matérias', materias:[], minutos: 240 },
};

function escolherEtapaSimulado(vest) {
  const etapas = vest === 'SIS' ? etapasSIS : etadasPSC;
  document.getElementById('modal-etapa-title').textContent = `Simulado ${vest}`;
  document.getElementById('modal-etapa-sub').textContent = 'Escolha qual etapa da prova quer simular';
  const opts = document.getElementById('modal-etapa-opcoes');
  opts.innerHTML = Object.entries(etapas).map(([key, et]) => `
    <button onclick="startSimuladoComEtapa('${vest}','${key}');fecharModalEtapa()" style="
      padding:14px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.1);
      background:rgba(255,255,255,0.04);color:var(--text);font-family:var(--font);
      font-size:14px;font-weight:600;cursor:pointer;text-align:left;
      display:flex;align-items:center;justify-content:space-between;">
      <span>${et.label}</span>
      <span style="font-size:12px;color:var(--text2)">⏱️ ${et.minutos}min</span>
    </button>
  `).join('');
  const modal = document.getElementById('modal-etapa');
  modal.style.display = 'flex';
}
function fecharModalEtapa() {
  document.getElementById('modal-etapa').style.display = 'none';
}

function startSimuladoComEtapa(vest, etapaKey) {
  const etapas = vest === 'SIS' ? etapasSIS : etadasPSC;
  const etapa = etapas[etapaKey];
  let pool = bancoDB.filter(q => q.vest === vest && q.opcoes.length > 0);
  if (etapa.materias.length > 0) pool = pool.filter(q => etapa.materias.includes(q.materia));
  const embaralhadas = pool.sort(() => Math.random()-0.5).slice(0, 15);
  const qs = embaralhadas.map(q => ({
    q: q.enunciado, opts: q.opcoes, correct: q.correta,
    explanation: q.contexto || `Gabarito: ${q.gabarito}`, materia: q.materia, id: q.id
  }));
  if (!qs.length) { showXPToast('⚠️ Sem questões para essa etapa'); return; }
  currentQuiz = { title: `${vest} — ${etapa.label}`, desc: `Simulado cronometrado. ${etapa.minutos} minutos. Questões do banco oficial.`, video: null, questions: qs };
  currentQuizIdx = 0; quizCorrect = 0; isSimulado = true;
  document.getElementById('aula-title').textContent = currentQuiz.title;
  document.getElementById('aula-content').innerHTML = `
    <div class="topic-desc">${currentQuiz.desc}</div>
    <div class="quiz-title-bar">
      <span class="quiz-badge" style="background:rgba(0,180,216,0.15);color:var(--cyan)">🎯 Simulado</span>
      <span class="quiz-progress-text">0 / ${qs.length} questões</span>
    </div>
    <div id="quiz-area"></div>
  `;
  document.getElementById('aula-view').classList.add('open');
  iniciarCronometro(etapa.minutos * 60);
  renderQuestion();
}

function startSimulado(type) {
  // Simulado foco em matemática
  let pool = [];
  if (type === 'mat-sis') {
    pool = bancoDB.filter(q => q.materia === 'Matemática' && q.opcoes.length > 0);
  } else {
    pool = bancoDB.filter(q => q.vest === type.toUpperCase() && q.opcoes.length > 0);
  }
  const qs = pool.sort(()=>Math.random()-0.5).slice(0,10).map(q => ({
    q: q.enunciado, opts: q.opcoes, correct: q.correta,
    explanation: q.contexto || `Gabarito: ${q.gabarito}`, materia: q.materia, id: q.id
  }));
  if (!qs.length) { showXPToast('⚠️ Sem questões no banco ainda'); return; }
  const titulos = {'mat-sis':'Simulado Matemática SIS', psc:'Simulado PSC', sis:'Simulado SIS'};
  currentQuiz = { title: titulos[type]||'Simulado', desc:'Questões reais do banco. Cronometrado.', video:null, questions:qs };
  currentQuizIdx = 0; quizCorrect = 0; isSimulado = true;
  document.getElementById('aula-title').textContent = currentQuiz.title;
  document.getElementById('aula-content').innerHTML = `
    <div class="topic-desc">${currentQuiz.desc}</div>
    <div class="quiz-title-bar">
      <span class="quiz-badge" style="background:rgba(21,101,192,0.2);color:var(--cyan)">📐 Matemática</span>
      <span class="quiz-progress-text">0 / ${qs.length} questões</span>
    </div><div id="quiz-area"></div>`;
  document.getElementById('aula-view').classList.add('open');
  iniciarCronometro(30 * 60);
  renderQuestion();
}

function iniciarCronometro(segundos) {
  clearInterval(cronometroInterval);
  cronometroSegundos = segundos;
  const el = document.getElementById('cronometro');
  if (el) el.style.display = 'block';
  atualizarCronometro();
  cronometroInterval = setInterval(() => {
    cronometroSegundos--;
    atualizarCronometro();
    if (cronometroSegundos <= 0) {
      clearInterval(cronometroInterval);
      showXPToast('⏱️ Tempo esgotado!');
      showQuizResult();
    }
    // Últimos 5 min: ficar vermelho
    const cronEl = document.getElementById('cronometro');
    if (cronEl) cronEl.style.color = cronometroSegundos < 300 ? 'var(--red)' : 'var(--gold)';
  }, 1000);
}
function atualizarCronometro() {
  const h = Math.floor(cronometroSegundos/3600);
  const m = Math.floor((cronometroSegundos%3600)/60);
  const s = cronometroSegundos%60;
  const el = document.getElementById('cronometro');
  if (el) el.textContent = h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function pararCronometro() {
  clearInterval(cronometroInterval);
  const el = document.getElementById('cronometro');
  if (el) el.style.display = 'none';
}

// ─── EXERCÍCIOS ADAPTATIVOS COM CORAÇÕES ───
let temasFragos = JSON.parse(localStorage.getItem('temasFragos') || '{}');
let questoesUsadas = JSON.parse(localStorage.getItem('questoesUsadas') || '{}');
let exMateriaAtual = 'Matemática';

function salvarProgresso() {
  localStorage.setItem('temasFragos', JSON.stringify(temasFragos));
  localStorage.setItem('questoesUsadas', JSON.stringify(questoesUsadas));
}
function marcarTemaFraco(materia, id) {
  if (!temasFragos[materia]) temasFragos[materia] = 0;
  temasFragos[materia]++;
  if (!questoesUsadas[materia]) questoesUsadas[materia] = [];
  if (!questoesUsadas[materia].includes(id)) questoesUsadas[materia].push(id);
  salvarProgresso();
  atualizarBannerReforco();
}
function marcarTemaAcerto(materia, id) {
  if (!questoesUsadas[materia]) questoesUsadas[materia] = [];
  if (!questoesUsadas[materia].includes(id)) questoesUsadas[materia].push(id);
  if (temasFragos[materia] > 0) temasFragos[materia]--;
  if (temasFragos[materia] <= 0) delete temasFragos[materia];
  salvarProgresso();
  atualizarBannerReforco();
}
function atualizarBannerReforco() {
  const banner = document.getElementById('reforco-banner');
  const lista = document.getElementById('reforco-lista');
  if (!banner || !lista) return;
  const temas = Object.entries(temasFragos).filter(([,v]) => v > 0);
  if (!temas.length) { banner.style.display = 'none'; return; }
  banner.style.display = 'block';
  lista.innerHTML = temas.map(([mat, n]) => `• ${mat} <span style="color:var(--red);font-weight:700">(${n} erro${n>1?'s':''})</span>`).join('<br>');
}

function exFiltrar(mat, btn) {
  exMateriaAtual = mat;
  document.getElementById('exf-mat').style.borderColor = mat === 'Matemática' ? 'rgba(0,180,216,0.4)' : 'rgba(255,255,255,0.08)';
  document.getElementById('exf-mat').style.background = mat === 'Matemática' ? 'rgba(0,180,216,0.1)' : 'rgba(255,255,255,0.04)';
  document.getElementById('exf-mat').style.color = mat === 'Matemática' ? 'var(--cyan)' : 'var(--text2)';
  document.getElementById('exf-red').style.borderColor = mat === 'Redação' ? 'rgba(244,168,51,0.4)' : 'rgba(255,255,255,0.08)';
  document.getElementById('exf-red').style.background = mat === 'Redação' ? 'rgba(244,168,51,0.1)' : 'rgba(255,255,255,0.04)';
  document.getElementById('exf-red').style.color = mat === 'Redação' ? 'var(--gold)' : 'var(--text2)';
  renderExercicios();
}

function renderExercicios() {
  const c = getCoracoes();
  if (c.qtd <= 0) { renderCoracoes(); return; }

  // Pega vestibular do perfil
  const vestAlvo = perfil?.vests?.[0] || 'SIS';
  const serieAlvo = perfil?.serie <= 3 ? perfil.serie : null;

  let pool = bancoDB.filter(q =>
    q.opcoes.length > 0 &&
    q.materia === exMateriaAtual &&
    (q.vest === vestAlvo || !vestAlvo)
  );
  if (serieAlvo) pool = pool.filter(q => q.serie === serieAlvo);

  // Remove questões já usadas SE tiver outras disponíveis
  const usadas = questoesUsadas[exMateriaAtual] || [];
  const novas = pool.filter(q => !usadas.includes(q.id));
  const finalPool = novas.length >= 3 ? novas : pool; // se ficou pouco, reutiliza

  // Prioriza temas fracos
  finalPool.sort((a,b) => (temasFragos[b.materia]||0) - (temasFragos[a.materia]||0) || Math.random()-0.5);

  const total = finalPool.length;
  const count = document.getElementById('ex-count');
  if (count) count.textContent = `${total} questão${total!==1?'ões':''} disponíve${total!==1?'is':'l'} • ${vestAlvo} ${serieAlvo ? serieAlvo+'ª série' : ''}`;

  const lista = document.getElementById('ex-lista');
  if (!lista) return;

  if (!total) {
    lista.innerHTML = `<div style="text-align:center;color:var(--text2);padding:40px 0;font-size:14px">Nenhuma questão de ${exMateriaAtual} no banco ainda.<br><span style="font-size:12px">Em breve mais questões!</span></div>`;
    return;
  }

  const exibir = finalPool.slice(0, 12);
  lista.innerHTML = exibir.map(q => {
    const eFraco = (temasFragos[q.materia] || 0) > 0;
    return `
    <div onclick="abrirExercicio('${q.id}')" style="
      background:var(--card);border:1px solid ${eFraco?'rgba(255,82,82,0.3)':'rgba(255,255,255,0.06)'};
      border-radius:12px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:all 0.15s"
      onmousedown="this.style.transform='scale(0.98)'" onmouseup="this.style.transform='scale(1)'">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.07);color:var(--text2)">
          ${q.vest} ${q.ano} • ${q.serie}ª Série • Q${q.num}
        </span>
        ${eFraco ? '<span style="font-size:11px;color:var(--red);margin-left:auto">⚠️ Reforçar</span>' : ''}
      </div>
      <div style="font-size:14px;color:var(--text);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
        ${q.enunciado}
      </div>
    </div>`;
  }).join('');
}

function abrirExercicio(id) {
  const c = getCoracoes();
  if (c.qtd <= 0) { showXPToast('💔 Sem vidas!'); return; }
  const q = bancoDB.find(x => x.id === id);
  if (!q) return;
  const letras = ['A','B','C','D','E'];
  document.getElementById('aula-title').textContent = `${q.vest} ${q.ano} • ${q.serie}ª • Q${q.num}`;
  let html = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:12px;color:var(--text2)">📌 ${q.contexto||''}</div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">${q.materia}</div>
      <div style="font-size:15px;font-weight:500;line-height:1.6;color:var(--text)">${q.enunciado}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">`;
  q.opcoes.forEach((op, i) => {
    html += `<button onclick="responderExercicio('${q.id}',${i})" id="exopt-${q.id}-${i}" style="padding:12px 14px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:var(--text);font-family:var(--font);font-size:14px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:10px;transition:all 0.15s">
      <span style="width:24px;height:24px;border-radius:6px;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${letras[i]}</span>${op}</button>`;
  });
  html += `</div><div id="exfb-${q.id}"></div>
    <button onclick="closeAula()" style="margin-top:12px;padding:12px 20px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:var(--text);font-family:var(--font);font-size:14px;cursor:pointer;width:100%">← Voltar</button>`;
  document.getElementById('aula-content').innerHTML = html;
  document.getElementById('aula-view').classList.add('open');
  pararCronometro();
}

function responderExercicio(qId, idx) {
  const q = bancoDB.find(x => x.id === qId);
  if (!q) return;
  const letras = ['A','B','C','D','E'];
  document.querySelectorAll(`[id^="exopt-${qId}-"]`).forEach(b => { b.disabled=true; b.style.cursor='default'; });
  const corrBtn = document.getElementById(`exopt-${qId}-${q.correta}`);
  if (corrBtn) { corrBtn.style.borderColor='var(--green)'; corrBtn.style.background='rgba(45,201,138,0.1)'; }
  const fb = document.getElementById(`exfb-${qId}`);

  if (idx === q.correta) {
    if (fb) fb.innerHTML = `<div style="background:rgba(45,201,138,0.1);border:1px solid rgba(45,201,138,0.25);border-radius:10px;padding:12px;font-size:13px;color:var(--green);margin-bottom:10px">✅ Correto! Gabarito: <strong>${q.gabarito}</strong><br><span style="font-size:12px;color:var(--text2)">${q.contexto||''}</span></div>`;
    marcarTemaAcerto(q.materia, q.id);
    addXP(20); spawnStars();
  } else {
    const errBtn = document.getElementById(`exopt-${qId}-${idx}`);
    if (errBtn) { errBtn.style.borderColor='var(--red)'; errBtn.style.background='rgba(255,82,82,0.08)'; }
    const vidas = perderCoracao();
    if (fb) fb.innerHTML = `<div style="background:rgba(255,82,82,0.08);border:1px solid rgba(255,82,82,0.2);border-radius:10px;padding:12px;font-size:13px;color:#ff8a80;margin-bottom:10px">
      ❌ Incorreto. Resposta: <strong>${letras[q.correta]}</strong><br>
      <span style="color:var(--gold);font-size:12px">💡 Reforçar: <strong>${q.materia}</strong></span><br>
      <span style="font-size:12px;color:var(--text2)">Vidas restantes: ${'❤️'.repeat(vidas)}${'🖤'.repeat(3-vidas)}</span>
    </div>`;
    marcarTemaFraco(q.materia, q.id);
    addXP(5);
    if (vidas <= 0) {
      setTimeout(() => { closeAula(); showXPToast('💔 Sem vidas! Volte amanhã.'); }, 1500);
    }
  }
  state.quizDone++; if (idx === q.correta) state.quizCorrect++;
  salvarState(); updateStats();
}

// ─── STREAK ───
function verificarStreak() {
  const hoje = new Date().toDateString();
  const ultimoDia = localStorage.getItem('ultimoDia');
  const ontem = new Date(Date.now() - 86400000).toDateString();
  if (ultimoDia === hoje) return; // já contou hoje
  if (ultimoDia === ontem) { state.streak++; }
  else if (ultimoDia !== hoje) { state.streak = 1; }
  localStorage.setItem('ultimoDia', hoje);
  salvarState();
  const el = document.getElementById('streak-days');
  if (el) el.textContent = `${state.streak} dia${state.streak>1?'s':''} seguido${state.streak>1?'s':''}!`;
}

// ─── GAMIFICATION ───
function addXP(amount) {
  state.xp += amount;
  salvarState();
  document.getElementById('xp-count').textContent = state.xp;
  const rankXp = document.getElementById('rank-xp');
  if (rankXp) rankXp.textContent = state.xp + ' XP';
  showXPToast('+' + amount + ' XP');
}

function showXPToast(msg) {
  const t = document.getElementById('xp-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1500);
}

function spawnStars() {
  for(let i = 0; i < 3; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'float-star';
      star.textContent = ['⭐','🌟','✨'][Math.floor(Math.random()*3)];
      star.style.left = (30 + Math.random()*60) + 'vw';
      star.style.top = (40 + Math.random()*20) + 'vh';
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 900);
    }, i * 150);
  }
}

function showAchievement(icon, name) {
  const popup = document.getElementById('ach-popup');
  document.getElementById('ach-icon').textContent = icon;
  document.getElementById('ach-name').textContent = name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3000);
}

function showVideoMsg() {
  showXPToast('📺 Videoaula em breve!');
}

function updateStats() {
  document.getElementById('stat-aulas').textContent = state.aulas;
  document.getElementById('stat-quiz').textContent = state.quizDone;
  document.getElementById('stat-correct').textContent = state.quizCorrect;
  const pct = Math.min(100, Math.round((state.quizCorrect/Math.max(1,state.quizDone))*100));
  document.getElementById('home-pct').textContent = pct + '%';
  document.getElementById('home-bar').style.width = pct + '%';
}


// ─── BANCO DE QUESTÕES ───
const bancoDB = [
  // ══════════════════════════════════════════
  // SIS 2023 — 1ª SÉRIE
  // ══════════════════════════════════════════
  { id:'sis23-1-001', vest:'SIS', ano:2023, serie:1, num:1, materia:'Português',
    enunciado:'Com sua tira, o cartunista André Dahmer sugere que a confecção diária de tiras é uma atividade',
    opcoes:['árdua.','confusa.','tola.','artística.','infantil.'],
    correta:0, gabarito:'A',
    contexto:'Tira do cartunista André Dahmer (www.folha.uol.com.br, 15.07.2022).' },
  { id:'sis23-1-002', vest:'SIS', ano:2023, serie:1, num:2, materia:'Português',
    enunciado:'Na medida em que se debruça sobre o próprio processo de confecção de tiras, a tira de André Dahmer apresenta um caráter',
    opcoes:['social.','enigmático.','metalinguístico.','contraditório.','satírico.'],
    correta:2, gabarito:'C',
    contexto:'Tira do cartunista André Dahmer.' },
  { id:'sis23-1-003', vest:'SIS', ano:2023, serie:1, num:3, materia:'Português',
    enunciado:'Segundo Antônio Vieira, Jesus Cristo não prometeu logo a salvação a Zaqueu porque este',
    opcoes:['precisava antes se arrepender verdadeiramente dos roubos praticados.','era pobre e não teria como devolver o que havia roubado.','precisava antes devolver o que havia roubado.','era pobre e havia roubado por necessidade.','precisava antes admitir publicamente os roubos praticados.'],
    correta:2, gabarito:'C',
    contexto:'Trecho do "Sermão do bom ladrão", de Antônio Vieira (1655).' },
  { id:'sis23-1-004', vest:'SIS', ano:2023, serie:1, num:4, materia:'Português',
    enunciado:'De acordo com o sermão, Dimas não teria sido condenado',
    opcoes:['se tivesse praticado boas ações.','se fosse rico.','se tivesse devolvido os bens roubados.','se fosse pobre.','se tivesse se arrependido.'],
    correta:1, gabarito:'B',
    contexto:'Trecho do "Sermão do bom ladrão", de Antônio Vieira.' },
  { id:'sis23-1-005', vest:'SIS', ano:2023, serie:1, num:5, materia:'Português',
    enunciado:'Em "ainda que ele o não dissera, o estado de um e outro ladrão o declarava assaz", a locução sublinhada pode ser substituída, sem qualquer prejuízo para o sentido da frase, por:',
    opcoes:['caso.','porque.','como.','embora.','porém.'],
    correta:3, gabarito:'D',
    contexto:'Trecho do "Sermão do bom ladrão", de Antônio Vieira.' },
  { id:'sis23-1-006', vest:'SIS', ano:2023, serie:1, num:6, materia:'Português',
    enunciado:'Em "lhe dilatou a promessa", o termo sublinhado pode ser substituído, sem prejuízo para o sentido do texto, por:',
    opcoes:['negou.','cumpriu.','quebrou.','reforçou.','adiou.'],
    correta:4, gabarito:'E',
    contexto:'Trecho do "Sermão do bom ladrão", de Antônio Vieira.' },
  { id:'sis23-1-007', vest:'SIS', ano:2023, serie:1, num:7, materia:'Português',
    enunciado:'Por razões estilísticas, Antônio Vieira recorre a várias inversões. Em ordem direta, o trecho "a Dimas prometeu [...] o Senhor a salvação" assume a seguinte redação:',
    opcoes:['O Senhor a Dimas prometeu a salvação.','Prometeu o Senhor a Dimas a salvação.','A salvação prometeu a Dimas o Senhor.','Prometeu o Senhor a salvação a Dimas.','O Senhor prometeu a salvação a Dimas.'],
    correta:4, gabarito:'E',
    contexto:'Trecho do "Sermão do bom ladrão", de Antônio Vieira.' },
  { id:'sis23-1-008', vest:'SIS', ano:2023, serie:1, num:8, materia:'História',
    enunciado:'A temática explorada pela obra Vanitas (1625), do pintor holandês Pieter Claesz, remete ao ideário da estética',
    opcoes:['barroca, retratando elementos que aludem à efemeridade da vida.','árcade, retratando elementos que aludem à fruição da vida.','quinhentista, retratando elementos que aludem ao início da colonização brasileira.','árcade, retratando elementos que aludem ao tópico do "bucolismo".','barroca, retratando elementos que aludem ao tópico do "lugar aprazível".'],
    correta:0, gabarito:'A',
    contexto:'Obra Vanitas (1625), do pintor Pieter Claesz.' },
  { id:'sis23-1-009', vest:'SIS', ano:2023, serie:1, num:9, materia:'Inglês',
    enunciado:'The text about fake news is mainly about',
    opcoes:['the difference between fake news and facts.','how to deal with fake news on social media.','the best tips for avoiding faking news.','how people can identify fake news.','the consequences of fake news.'],
    correta:4, gabarito:'E',
    contexto:'Texto sobre fake news (https://libguides.uvic.ca, 26.05.2023).' },
  { id:'sis23-1-010', vest:'SIS', ano:2023, serie:1, num:10, materia:'Inglês',
    enunciado:'O trecho "You should learn to spot false information" corresponde, em português, a:',
    opcoes:['Você pode aprender a identificar notícias falsas.','Você precisou aprender a identificar notícias falsas.','Você conseguiu aprender a identificar notícias falsas.','Você deve aprender a identificar notícias falsas.','Você irá aprender a identificar notícias falsas.'],
    correta:3, gabarito:'D',
    contexto:'Texto sobre fake news.' },
  { id:'sis23-1-011', vest:'SIS', ano:2023, serie:1, num:11, materia:'Inglês',
    enunciado:'The expression "false, confusing, or dishonest information" (item 2) refers to',
    opcoes:['"credible news".', '"facts".', '"fake news".', '"trustworthy information sources".', '"quality information".'],
    correta:2, gabarito:'C',
    contexto:'Texto sobre fake news.' },
  { id:'sis23-1-012', vest:'SIS', ano:2023, serie:1, num:12, materia:'Inglês',
    enunciado:'De acordo com o contexto apresentado pela tirinha de Brian Crane, a fala "It\'s just like you" (2º quadrinho) expressa a ideia de',
    opcoes:['proporção.','comparação.','consequência.','condição.','finalidade.'],
    correta:1, gabarito:'B',
    contexto:'Tirinha de Brian Crane (www.gocomics.com).' },
  { id:'sis23-1-013', vest:'SIS', ano:2023, serie:1, num:13, materia:'História',
    enunciado:'O excerto sobre o conceito de Pré-História revela que ele foi concebido para',
    opcoes:['valorizar as habilidades humanas na Antiguidade.','reforçar a falta de desenvolvimento técnico no período.','fortalecer a suposta superioridade dos territórios industrializados.','relativizar a classificação entre as sociedades humanas.','problematizar as periodizações históricas tradicionais.'],
    correta:2, gabarito:'C',
    contexto:'Ana L. N. Oliveira et al. "O conceito de Pré-história nos livros didáticos de História no Brasil". PerCursos, 2020.' },
  { id:'sis23-1-014', vest:'SIS', ano:2023, serie:1, num:14, materia:'História',
    enunciado:'Na Grécia Antiga, as transformações proporcionadas pelo governo de Clístenes proporcionaram',
    opcoes:['a unificação grega em torno de uma identidade nacional.','a participação feminina nas decisões públicas em Atenas.','o fim da diversidade administrativa entre as pólis.','o enfraquecimento do poder político da aristocracia ateniense.','o estabelecimento de eleições representativas em Atenas.'],
    correta:3, gabarito:'D',
    contexto:'Texto sobre democracia grega e reformas de Clístenes.' },
  { id:'sis23-1-015', vest:'SIS', ano:2023, serie:1, num:15, materia:'História',
    enunciado:'A charge publicada durante a Era Vargas retrata o populismo, que pode ser definido',
    opcoes:['pela coexistência entre a aproximação e o controle dos trabalhadores.','pelas falsas promessas do presidente de criação da legislação trabalhista.','pela liberdade dada aos movimentos e associações trabalhistas.','pela defesa da soberania popular nas decisões de cunho político.','pela valorização da cultura como formadora de cidadãos críticos.'],
    correta:0, gabarito:'A',
    contexto:'Charge publicada durante a Era Vargas (1930-1945).' },
  { id:'sis23-1-016', vest:'SIS', ano:2023, serie:1, num:16, materia:'História',
    enunciado:'Uma das finalidades da OEA (Organização dos Estados Americanos) é',
    opcoes:['promover a luta contra o imperialismo estadunidense.','garantir o respeito à soberania política das nações americanas.','incentivar a desmilitarização dos países que compõem a organização.','negociar a dívida externa dos países-membros com o FMI.','interferir diretamente nas constituições nacionais dos países-membros.'],
    correta:1, gabarito:'B',
    contexto:'Notícia sobre acordo da OEA sobre Nicarágua (www.em.com.br, 23.06.2023).' },
  { id:'sis23-1-017', vest:'SIS', ano:2023, serie:1, num:17, materia:'História',
    enunciado:'O Programa Bolsa Família, desde a sua criação em 2003,',
    opcoes:['privilegiou princípios sociais no lugar dos econômicos.','foi dificultado pela defasagem do salário mínimo.','teve como base a transferência de renda para famílias carentes.','aprofundou as desigualdades sociais no país.','rompeu com as políticas de governos neoliberais.'],
    correta:2, gabarito:'C',
    contexto:'Texto sobre o Programa Bolsa Família (https://exame.com).' },
  { id:'sis23-1-018', vest:'SIS', ano:2023, serie:1, num:18, materia:'História',
    enunciado:'No contexto dos "zoológicos humanos" do século XIX, a pseudociência a que o excerto se refere é',
    opcoes:['Cientificismo.','Positivismo.','Física social.','Naturalismo.','Darwinismo social.'],
    correta:4, gabarito:'E',
    contexto:'Texto sobre "zoológicos humanos" na Europa (www.bbc.com, 26.10.2022).' },
  { id:'sis23-1-019', vest:'SIS', ano:2023, serie:1, num:19, materia:'História',
    enunciado:'Originalmente, os membros que formaram as comunidades quilombolas na Amazônia são',
    opcoes:['refugiados de fronteiras amazônicas.','bandeirantes a serviço da metrópole.','investidores do setor agropecuário.','escravizados fugidos e seus descendentes.','missionários responsáveis pela catequização dos indígenas.'],
    correta:3, gabarito:'D',
    contexto:'Texto sobre comunidades quilombolas na Amazônia (https://redda.com.br).' },
  { id:'sis23-1-020', vest:'SIS', ano:2023, serie:1, num:20, materia:'História',
    enunciado:'O episódio em que Jaqueline Silva e Sandra foram pedidas para subir ao pódio de biquíni nas Olimpíadas de 1996 suscita',
    opcoes:['o empoderamento feminino.','a objetificação do corpo feminino.','o grande prestígio dos esportes femininos.','a equidade entre os gêneros masculino e feminino.','a elevação da autoestima feminina.'],
    correta:1, gabarito:'B',
    contexto:'Texto sobre mulheres nas Olimpíadas (https://www.cnnbrasil.com.br, 07.04.2023).' },
  { id:'sis23-1-021', vest:'SIS', ano:2023, serie:1, num:21, materia:'Geografia',
    enunciado:'A projeção cartográfica representada (mapa-múndi) tem como característica',
    opcoes:['a fidelidade das formas e a distorção das áreas.','a fidelidade das áreas e a distorção das formas.','a distorção das formas, das áreas e dos ângulos.','a deformação das áreas próximas aos trópicos.','a conservação das áreas próximas aos polos.'],
    correta:0, gabarito:'A',
    contexto:'Projeção cartográfica (https://atlasescolar.ibge.gov.br).' },
  { id:'sis23-1-022', vest:'SIS', ano:2023, serie:1, num:22, materia:'Geografia',
    enunciado:'A análise da pirâmide etária da Amazônia Legal revela o predomínio da população',
    opcoes:['jovem, o que evidencia uma situação de elevado crescimento vegetativo.','jovem, o que evidencia uma situação de bônus demográfico.','jovem, o que contribui para uma razão de dependência maior.','idosa, o que evidencia uma situação de envelhecimento populacional.','idosa, o que contribui para uma razão de dependência menor.'],
    correta:1, gabarito:'B',
    contexto:'Pirâmide etária da Amazônia Legal (Daniel Santos et al. Fatos da Amazônia 2021).' },
  { id:'sis23-1-023', vest:'SIS', ano:2023, serie:1, num:23, materia:'Geografia',
    enunciado:'Do ponto de vista geográfico, a atividade musical do grupo Brô MC\'s (rap indígena) relaciona-se à',
    opcoes:['conservação da floresta amazônica, em oposição à expansão econômica capitalista.','ampliação das terras demarcadas como propriedade privada.','manutenção das condições de vida das comunidades indígenas.','defesa da cultura indígena pela arte, em ruptura com a invisibilidade imposta pela sociedade capitalista.','garantia aos indígenas do direito de manter seus costumes nas cidades.'],
    correta:3, gabarito:'D',
    contexto:'Textos sobre o grupo Brô MC\'s e o Rock in Rio 2022.' },
  { id:'sis23-1-024', vest:'SIS', ano:2023, serie:1, num:24, materia:'Geografia',
    enunciado:'A inserção da Coreia do Sul no cenário internacional nas décadas de 1960-1980 ocorreu devido à',
    opcoes:['formação de tecnopolos, com o controle de bens de consumo.','substituição de importação, com o fornecimento de gêneros agropecuários.','instalação de centros logísticos, com a isenção de impostos.','criação de áreas de livre comércio, com a disponibilidade de mão de obra barata.','difusão das exportações, com a instalação de empresas multinacionais.'],
    correta:4, gabarito:'E',
    contexto:'Texto sobre o desenvolvimento econômico da Coreia do Sul.' },
  { id:'sis23-1-025', vest:'SIS', ano:2023, serie:1, num:25, materia:'Geografia',
    enunciado:'O trecho do poema "Eu, etiqueta", de Carlos Drummond de Andrade, faz uma crítica à',
    opcoes:['padronização da sociedade, intensificada pelo processo de globalização.','valorização de costumes ocidentais, difundida pela internet no período da Guerra Fria.','disputa econômica entre as empresas mundiais, favorecida pelo capitalismo comercial.','divisão internacional do trabalho, marcada pelo estabelecimento da seguridade social.','dinâmica das redes imateriais e materiais, ampliada pelos acordos comerciais supranacionais.'],
    correta:0, gabarito:'A',
    contexto:'Trecho do poema "Eu, etiqueta", de Carlos Drummond de Andrade.' },
  { id:'sis23-1-026', vest:'SIS', ano:2023, serie:1, num:26, materia:'Geografia',
    enunciado:'De acordo com o excerto, a motivação do conflito entre israelenses e palestinos é',
    opcoes:['o princípio ideológico.','a rivalidade étnica.','a instabilidade política.','a disputa territorial.','a intolerância religiosa.'],
    correta:3, gabarito:'D',
    contexto:'Texto sobre o conflito israelense-palestino (https://agenciabrasil.ebc.com.br, 26.06.2023).' },
  { id:'sis23-1-027', vest:'SIS', ano:2023, serie:1, num:27, materia:'Geografia',
    enunciado:'O excerto sobre a área com incentivos fiscais na região Amazônica, instalada em 1967, faz menção',
    opcoes:['ao polo industrial de Belém.','à zona franca de Manaus.','ao complexo aeroespacial de Alcântara.','ao porto inovativo do Amazonas.','à área econômica exclusiva da Amazônia Oriental.'],
    correta:1, gabarito:'B',
    contexto:'Texto sobre zona franca (www.senado.leg.br).' },
  { id:'sis23-1-028', vest:'SIS', ano:2023, serie:1, num:28, materia:'Geografia',
    enunciado:'Uma justificativa para o aumento das solicitações de refúgio no Brasil nos períodos de 2016-2019 e 2021-2022 está relacionada à',
    opcoes:['facilidade da emissão de documentação de cidadania brasileira.','ausência de comportamentos de aversão a estrangeiros.','crescente restrição à entrada de refugiados na Europa e nos Estados Unidos.','riqueza cultural e a biodiversidade paisagística do país.','oportunidade de vagas de trabalho no setor tecnológico nacional.'],
    correta:2, gabarito:'C',
    contexto:'Gráfico de solicitantes de refúgio no Brasil 2011-2022.' },
  { id:'sis23-1-029', vest:'SIS', ano:2023, serie:1, num:29, materia:'Biologia',
    enunciado:'Todos os seres vivos com células possuem',
    opcoes:['DNA envolto por membrana nuclear e são capazes de se adaptar ao meio.','nutrição autotrófica e têm a capacidade de movimentação.','material genético e podem evoluir com o tempo.','citoplasma e realizam a reprodução assexuada.','lisossomos e têm mecanismos para manter a homeostase.'],
    correta:2, gabarito:'C',
    contexto:'Características gerais dos seres vivos.' },
  { id:'sis23-1-030', vest:'SIS', ano:2023, serie:1, num:30, materia:'Biologia',
    enunciado:'O glicocálice relaciona-se',
    opcoes:['à atividade da bomba de sódio e potássio.','ao reconhecimento célula a célula.','ao transporte de água por osmose.','à impermeabilidade da membrana plasmática.','ao funcionamento do citoesqueleto.'],
    correta:1, gabarito:'B',
    contexto:'Questão sobre glicocálice e função da membrana celular.' },
  { id:'sis23-1-031', vest:'SIS', ano:2023, serie:1, num:31, materia:'Biologia',
    enunciado:'Segundo Oparin e Haldane, a vida surgiu na Terra por',
    opcoes:['evolução química.','criação divina.','origem extraterrestre.','biogênese.','seleção natural.'],
    correta:0, gabarito:'A',
    contexto:'Propostas de Oparin e Haldane sobre a origem da vida (1920).' },
  { id:'sis23-1-032', vest:'SIS', ano:2023, serie:1, num:32, materia:'Biologia',
    enunciado:'De acordo com o conceito biológico de espécie, são considerados dois seres vivos da mesma espécie',
    opcoes:['o siri e o caranguejo-ermitão.','a ema e o avestruz.','a rã-touro e o sapo-cururu.','o golfinho e o boto-cor-de-rosa.','o labrador e o dálmata.'],
    correta:4, gabarito:'E',
    contexto:'Conceito biológico de espécie — grupos que geram descendência fértil.' },
  { id:'sis23-1-033', vest:'SIS', ano:2023, serie:1, num:33, materia:'Biologia',
    enunciado:'Uma característica marcante do bioma Amazônia é a presença de',
    opcoes:['vegetação com características xeromórficas.','solo seco e rico em alumínio.','árvores com caules tortuosos.','vegetação adaptada ao fogo.','vegetação densa e estratificada.'],
    correta:4, gabarito:'E',
    contexto:'Características do bioma Amazônia.' },
  { id:'sis23-1-034', vest:'SIS', ano:2023, serie:1, num:34, materia:'Biologia',
    enunciado:'Na figura sobre fotossíntese, as letras X, Y e Z representam, respectivamente, as substâncias',
    opcoes:['H₂O, O₂ e N₂','CO, H₂O e O₂','CO₂, O₂ e N₂','CO₂, O₂ e H₂O','H₂O, CO₂ e O₃'],
    correta:3, gabarito:'D',
    contexto:'Figura sobre fotossíntese (www.twinkl.com.br).' },
  { id:'sis23-1-035', vest:'SIS', ano:2023, serie:1, num:35, materia:'Biologia',
    enunciado:'A frase "Um dos sintomas do vício é a necessidade de a pessoa usar mais droga ao longo do tempo" é',
    opcoes:['verdadeira, porque o corpo desenvolve uma tolerância à droga.','verdadeira, porque o corpo necessita da droga para ter a abstinência.','falsa, porque o corpo consegue regular a eliminação da droga na urina.','falsa, porque o corpo fica cada vez mais imune aos efeitos da droga.','falsa, porque o corpo decompõe rapidamente a droga no fígado.'],
    correta:0, gabarito:'A',
    contexto:'Folheto de conscientização sobre dependência química.' },
  { id:'sis23-1-036', vest:'SIS', ano:2023, serie:1, num:36, materia:'Ciências',
    enunciado:'Para se realizar uma pesquisa científica é necessário seguir a sequência de etapas:',
    opcoes:['hipótese, observação, análise e deduções.','observação, experimentos controlados, hipótese e análise.','observação, hipótese, experimentos controlados e conclusão.','análise, deduções, conclusão e hipótese.','hipótese, conclusão, experimentos controlados e análise.'],
    correta:2, gabarito:'C',
    contexto:'Método científico e Galileu Galilei.' },
  { id:'sis23-1-037', vest:'SIS', ano:2023, serie:1, num:37, materia:'Matemática',
    enunciado:'Bianca ganhou 264 revistas em quadrinhos. A razão lidas/não lidas era 3/8. Na semana seguinte leu 27 a mais. A nova razão passou a ser',
    opcoes:['1/3','2/3','3/4','3/5','4/5'],
    correta:3, gabarito:'D',
    contexto:'Problema de razão e proporção com 264 revistas em quadrinhos.' },
  { id:'sis23-1-038', vest:'SIS', ano:2023, serie:1, num:38, materia:'Matemática',
    enunciado:'A nota final de João foi 7,6 (média de 5 atividades). Na última tirou 10. Nas 3 primeiras tirou notas iguais. Na 4ª tirou 2 a mais que na 2ª. A nota de João na primeira atividade foi',
    opcoes:['5,5.','6.','6,5.','7.','7,5.'],
    correta:2, gabarito:'C',
    contexto:'Problema de média aritmética com 5 atividades.' },
  { id:'sis23-1-039', vest:'SIS', ano:2023, serie:1, num:39, materia:'Matemática',
    enunciado:'A função f: ℝ → ℝ é polinomial do 1º grau com f(2) = 0 e f(-3) = 2. A lei de formação da função f é',
    opcoes:['f(x) = -2x/5 + 4/5','f(x) = -3x + 2','f(x) = -3x - 2','f(x) = -3x/5 + 2/5','f(x) = -3x/5 + 2'],
    correta:0, gabarito:'A',
    contexto:'Função polinomial do 1º grau com condições dadas.' },
  { id:'sis23-1-040', vest:'SIS', ano:2023, serie:1, num:40, materia:'Matemática',
    enunciado:'Um triângulo retângulo BCD com hipotenusa BD = 13 cm tem o lado BC compartilhado com o triângulo retângulo ABC (BC = 3 cm, AC = 4 cm). A área do triângulo BCD é',
    opcoes:['6 cm².','12 cm².','24 cm².','30 cm².','60 cm².'],
    correta:3, gabarito:'D',
    contexto:'Triângulo retângulo com hipotenusa 13 cm e base compartilhada.' },
  { id:'sis23-1-041', vest:'SIS', ano:2023, serie:1, num:41, materia:'Matemática',
    enunciado:'Um retângulo ABCD de área 40 cm² tem o lado CD em comum com o retângulo CFGD, que tem perímetro 16 cm. BC = 8 cm. A área do trapézio CFGE (onde E é o ponto médio de AD) é',
    opcoes:['20 cm².','25 cm².','30 cm².','35 cm².','40 cm².'],
    correta:1, gabarito:'B',
    contexto:'Problema de geometria com retângulos e trapézio.' },
  { id:'sis23-1-042', vest:'SIS', ano:2023, serie:1, num:42, materia:'Matemática',
    enunciado:'Um triângulo com um lado de medida ≈ 7,9 cm está inscrito em uma circunferência de raio 4 cm. Sabendo que sen β = 15/16, o perímetro do triângulo é, aproximadamente,',
    opcoes:['19 cm.','19,4 cm.','19,9 cm.','20,5 cm.','21 cm.'],
    correta:1, gabarito:'B',
    contexto:'Lei dos senos com triângulo inscrito em circunferência.' },
  { id:'sis23-1-043', vest:'SIS', ano:2023, serie:1, num:43, materia:'Matemática',
    enunciado:'Permutando os algarismos de 15792, obtemos 120 números. O total dessas permutações que são maiores que 30000 e menores que 70000 é',
    opcoes:['96.','60.','48.','30.','24.'],
    correta:4, gabarito:'E',
    contexto:'Análise combinatória — permutações do número 15792.' },
  { id:'sis23-1-044', vest:'SIS', ano:2023, serie:1, num:44, materia:'Matemática',
    enunciado:'Uma sorveteria tem 10 sabores e 4 acompanhamentos. Rogério escolhe 2 sabores (sem chocolate) e 2 acompanhamentos. O número de maneiras distintas é',
    opcoes:['72.','144.','216.','432.','864.'],
    correta:2, gabarito:'C',
    contexto:'Combinatória: escolha de sorvetes e acompanhamentos.' },
  { id:'sis23-1-045', vest:'SIS', ano:2023, serie:1, num:45, materia:'Física',
    enunciado:'Em uma viagem de 4 dias entre Manaus e São Gabriel da Cachoeira (864 km), a velocidade escalar média do barco é de',
    opcoes:['5 km/h.','7 km/h.','9 km/h.','12 km/h.','15 km/h.'],
    correta:2, gabarito:'C',
    contexto:'Cinemática: velocidade média entre Manaus e São Gabriel da Cachoeira.' },
  { id:'sis23-1-046', vest:'SIS', ano:2023, serie:1, num:46, materia:'Física',
    enunciado:'Uma criança desce um escorregador encerado de 2,45 m de altura (sem atrito, g = 10 m/s²). A velocidade de chegada ao chão foi de',
    opcoes:['3 m/s.','4 m/s.','5 m/s.','7 m/s.','9 m/s.'],
    correta:3, gabarito:'D',
    contexto:'Energia mecânica: escorregador sem atrito, queda de 2,45 m.' },
  { id:'sis23-1-047', vest:'SIS', ano:2023, serie:1, num:47, materia:'Física',
    enunciado:'A energia da água represada em uma hidrelétrica, antes de cair sobre as turbinas, encontra-se na forma de energia',
    opcoes:['potencial elétrica.','cinética de translação.','potencial elástica.','potencial gravitacional.','potencial química.'],
    correta:3, gabarito:'D',
    contexto:'Transformações de energia em usinas hidrelétricas.' },
  { id:'sis23-1-048', vest:'SIS', ano:2023, serie:1, num:48, materia:'Física',
    enunciado:'O satélite SGDC tem massa ≈ 6000 kg e força gravitacional ≈ 1200 N. A aceleração da gravidade em sua órbita vale, aproximadamente,',
    opcoes:['0,1 m/s².','0,2 m/s².','0,4 m/s².','1,2 m/s².','1,8 m/s².'],
    correta:1, gabarito:'B',
    contexto:'Satélite SGDC lançado em 2017 — gravidade na órbita.' },
  { id:'sis23-1-049', vest:'SIS', ano:2023, serie:1, num:49, materia:'Física',
    enunciado:'Ao duplicarmos a distância entre dois corpos, a força gravitacional entre eles se tornará menor',
    opcoes:['duas vezes.','quatro vezes.','oito vezes.','dezesseis vezes.','trinta e duas vezes.'],
    correta:1, gabarito:'B',
    contexto:'Lei da Gravitação Universal de Newton.' },
  { id:'sis23-1-050', vest:'SIS', ano:2023, serie:1, num:50, materia:'Física',
    enunciado:'Um exemplo de material classificado como bom condutor de calor é',
    opcoes:['a lã, utilizada na fabricação de roupas, cobertores e edredons.','a borracha, presente nos trajes de mergulhadores e surfistas.','a manta de fibra de vidro que preenche paredes de geladeiras.','o isopor, do qual são feitas caixas térmicas para alimentos.','o aço, empregado em chapas para preparação de hambúrgueres.'],
    correta:4, gabarito:'E',
    contexto:'Condutividade térmica de materiais.' },
  { id:'sis23-1-051', vest:'SIS', ano:2023, serie:1, num:51, materia:'Física',
    enunciado:'Um navio emite um bip de sonar e recebe o reflexo 0,4 s depois. A velocidade do som na água é 1450 m/s. A profundidade do fundo do oceano é',
    opcoes:['290 m.','340 m.','430 m.','580 m.','610 m.'],
    correta:0, gabarito:'A',
    contexto:'Sonar: propagação do som na água.' },
  { id:'sis23-1-052', vest:'SIS', ano:2023, serie:1, num:52, materia:'Física',
    enunciado:'Um computador de 300 W ficou ligado 30 dias ininterruptamente. A quantidade de energia utilizada, em kWh, foi de',
    opcoes:['162.','174.','188.','204.','216.'],
    correta:4, gabarito:'E',
    contexto:'Cálculo de consumo de energia elétrica em kWh.' },
  { id:'sis23-1-053', vest:'SIS', ano:2023, serie:1, num:53, materia:'Química',
    enunciado:'O metal pesado líquido em temperatura ambiente utilizado no garimpo para separar o ouro (formando amálgama) é',
    opcoes:['o mercúrio.','o sódio.','o ferro.','o alumínio.','a prata.'],
    correta:0, gabarito:'A',
    contexto:'Garimpo clandestino na Amazônia e uso de metal pesado.' },
  { id:'sis23-1-054', vest:'SIS', ano:2023, serie:1, num:54, materia:'Química',
    enunciado:'Para separar PEBD, PEAD, PET e PVC por densidade, as soluções 1, 2 e 3 devem ser, respectivamente,',
    opcoes:['álcool 45%, salmoura e água de torneira.','água de torneira, álcool 45% e salmoura.','álcool 45%, água de torneira e salmoura.','salmoura, água de torneira e álcool 45%.','salmoura, álcool 45% e água de torneira.'],
    correta:2, gabarito:'C',
    contexto:'Separação de plásticos por densidade em cooperativa de reciclagem.' },
  { id:'sis23-1-055', vest:'SIS', ano:2023, serie:1, num:55, materia:'Química',
    enunciado:'As espécies químicas I (Z=11, A=23, e⁻=10), II (Z=36, A=84, e⁻=36) e III (Z=16, A=32, e⁻=18) são, respectivamente,',
    opcoes:['ânion monovalente, átomo neutro e cátion bivalente.','ânion monovalente, átomo neutro e ânion bivalente.','átomo neutro, cátion monovalente e ânion bivalente.','cátion monovalente, átomo neutro e ânion bivalente.','cátion bivalente, átomo neutro e ânion monovalente.'],
    correta:3, gabarito:'D',
    contexto:'Tabela com número atômico, massa e número de elétrons.' },
  { id:'sis23-1-056', vest:'SIS', ano:2023, serie:1, num:56, materia:'Química',
    enunciado:'A ingestão de líquidos nas refeições causa ___ da velocidade das reações e a mastigação causa ___ porque a superfície de contato ___',
    opcoes:['aumento – aumento – diminui.','aumento – diminuição – aumenta.','diminuição – aumento – aumenta.','aumento – aumento – aumenta.','diminuição – diminuição – diminui.'],
    correta:2, gabarito:'C',
    contexto:'Questão sobre cinética química na digestão de alimentos.' },
  { id:'sis23-1-057', vest:'SIS', ano:2023, serie:1, num:57, materia:'Química',
    enunciado:'Os elementos químicos mais abundantes no Universo são',
    opcoes:['o hélio e o oxigênio.','o oxigênio e nitrogênio.','o hidrogênio e o oxigênio.','o nitrogênio e o hidrogênio.','o hidrogênio e o hélio.'],
    correta:4, gabarito:'E',
    contexto:'Abundância relativa dos elementos no Universo (www.astro.iag.usp.br).' },
  { id:'sis23-1-058', vest:'SIS', ano:2023, serie:1, num:58, materia:'Química',
    enunciado:'A diferença de temperaturas de ebulição entre éter dimetílico e etanol (mesma massa molar, 46 g/mol) deve-se à',
    opcoes:['diferença progressiva das massas das moléculas.','diferença de massa entre as moléculas.','diferença entre os tipos de interação intermolecular existente entre as moléculas.','diferença entre os tipos de interação intermolecular entre etanol e propan-1-ol.','diferença entre os tipos de interação intermolecular entre as três substâncias.'],
    correta:2, gabarito:'C',
    contexto:'Comparação de temperaturas de ebulição de substâncias orgânicas.' },
  { id:'sis23-1-059', vest:'SIS', ano:2023, serie:1, num:59, materia:'Química',
    enunciado:'Os valores de x e y na equação de obtenção da hidroxiapatita são, respectivamente,',
    opcoes:['2 e 3.','2 e 6.','3 e 2.','6 e 2.','6 e 3.'],
    correta:3, gabarito:'D',
    contexto:'Equação de obtenção da hidroxiapatita.' },
  { id:'sis23-1-060', vest:'SIS', ano:2023, serie:1, num:60, materia:'Química',
    enunciado:'Os metais que formam as bases (com 3 e 4 camadas eletrônicas) utilizadas na produção de sabão e a carga adquirida são, respectivamente,',
    opcoes:['Li, Na e +1','Mg, Ca e +2','Na, K e +1','K, Rb e +1','Ca, Sr e +2'],
    correta:2, gabarito:'C',
    contexto:'Produção de sabão com metais alcalinos.' },

  // ══════════════════════════════════════════
  // SIS 2023 — 2ª SÉRIE (seleção de questões)
  // ══════════════════════════════════════════
  { id:'sis23-2-001', vest:'SIS', ano:2023, serie:2, num:1, materia:'Português',
    enunciado:'Ao assinalar que "Plus ultra! era a sua divisa", o narrador caracteriza o médico Simão Bacamarte como alguém',
    opcoes:['insensível.','contraditório.','ingrato.','enigmático.','insaciável.'],
    correta:4, gabarito:'E',
    contexto:'"O alienista", de Machado de Assis.' },
  { id:'sis23-2-002', vest:'SIS', ano:2023, serie:2, num:2, materia:'Português',
    enunciado:'A voz do personagem mescla-se intimamente à voz do narrador, configurando o discurso indireto livre, no seguinte trecho de "O alienista":',
    opcoes:['"— Vejamos, pensava ele; vejamos se chego enfim à última verdade."','"— Mas deveras estariam eles doidos, e foram curados por mim?"','"Sim, dizia ele consigo, eu não posso ter a pretensão de haver-lhes incutido um sentimento novo."','"Mas tão depressa esta ideia lhe refrescara a alma, outra apareceu que neutralizou o primeiro efeito."','"A aflição do egrégio Simão Bacamarte é definida pelos cronistas itaguaienses como uma das mais medonhas tempestades morais."'],
    correta:3, gabarito:'D',
    contexto:'"O alienista", de Machado de Assis.' },
  { id:'sis23-2-003', vest:'SIS', ano:2023, serie:2, num:3, materia:'Português',
    enunciado:'O leitor é incluído na narrativa machadiana no seguinte trecho de "O alienista":',
    opcoes:['"Agora, se imaginais que o alienista ficou radiante ao ver sair o último hóspede da Casa Verde, mostrais com isso que ainda não conheceis o nosso homem."','"Não lhe bastava ter descoberto a teoria verdadeira da loucura."','"Dizia isto, passeando ao longo da vasta sala."','"Chegado a esta conclusão, o ilustre alienista teve duas sensações contrárias."','"Mas as tempestades só aterram os fracos; os fortes enrijam-se contra elas."'],
    correta:0, gabarito:'A',
    contexto:'"O alienista", de Machado de Assis.' },
  { id:'sis23-2-004', vest:'SIS', ano:2023, serie:2, num:4, materia:'Português',
    enunciado:'"O alienista" pode ser tomado como uma narrativa',
    opcoes:['histórica sobre as desventuras do império.','mística sobre a influência do sobrenatural.','satírica sobre os descaminhos da ciência.','política sobre as crendices do povo.','irônica sobre o movimento abolicionista.'],
    correta:2, gabarito:'C',
    contexto:'"O alienista", de Machado de Assis.' },
  { id:'sis23-2-008', vest:'SIS', ano:2023, serie:2, num:8, materia:'História',
    enunciado:'A pintura "O caminhante sobre o mar de névoa" (1818), de Caspar David Friedrich, é símbolo do movimento',
    opcoes:['romântico.','realista.','naturalista.','parnasiano.','pré-modernista.'],
    correta:0, gabarito:'A',
    contexto:'Caspar David Friedrich e o Romantismo do século XIX.' },
  { id:'sis23-2-009', vest:'SIS', ano:2023, serie:2, num:9, materia:'Inglês',
    enunciado:'The text about Paul McCartney and AI intends to',
    opcoes:['raise awareness about the risks of artificial intelligence.','show that artificial intelligence helped create a new Beatles song.','present a new Beatles song recorded by Drake and The Weeknd.','draw attention to the impact The Beatles had on society.','explain why Paul McCartney has collaborated with countless artists.'],
    correta:1, gabarito:'B',
    contexto:'Texto sobre Paul McCartney e inteligência artificial (www.cnbc.com, 14.06.2023).' },
  { id:'sis23-2-013', vest:'SIS', ano:2023, serie:2, num:13, materia:'História',
    enunciado:'As críticas de Martinho Lutero (1517) centralizam-se no fato de que a Igreja Católica',
    opcoes:['menosprezava a figura papal ao divulgar os princípios religiosos de forma heterogênea.','continuava com suas ideias inacessíveis ao pregar no idioma falado pelos devotos.','priorizava a frequência dos fiéis às missas em detrimento do pagamento do dízimo.','defendia a liberdade de interpretação do livro sagrado.','preocupava-se mais com o perdão dos pecados do que com os ensinamentos divinos.'],
    correta:4, gabarito:'E',
    contexto:'Declaração de Martinho Lutero em 1517 sobre as indulgências.' },
  { id:'sis23-2-015', vest:'SIS', ano:2023, serie:2, num:15, materia:'História',
    enunciado:'Com base no excerto sobre o Diretório dos Índios (1758-1798), a lei priorizava',
    opcoes:['a assimilação dos indígenas à sociedade colonial.','a demarcação de terras dos povos originários.','o relativismo cultural em território brasileiro.','a proteção dos costumes das populações nativas.','a equidade entre indígenas e negros escravizados.'],
    correta:0, gabarito:'A',
    contexto:'Texto sobre o Diretório dos Índios no Vale Amazônico.' },
  { id:'sis23-2-016', vest:'SIS', ano:2023, serie:2, num:16, materia:'História',
    enunciado:'Em relação à obrigatoriedade da vacinação na Revolta da Vacina (1904), a atitude do "povo" descrita nos versos revela',
    opcoes:['apoio à modernização urbana.','engajamento na campanha de saúde pública.','crítica ao arbítrio governamental.','censura à violência praticada nas escolas públicas.','cooperação com as brigadas sanitárias.'],
    correta:2, gabarito:'C',
    contexto:'Canção "Vacina obrigatória", Mario Pinheiro, contexto da Revolta da Vacina (1904).' },
  { id:'sis23-2-019', vest:'SIS', ano:2023, serie:2, num:19, materia:'História',
    enunciado:'Na teoria de Hannah Arendt, os regimes totalitários europeus de meados do século XX encontraram espaço para se desenvolverem, sobretudo,',
    opcoes:['pelo preparo militar dos líderes.','pelo crescimento das ideologias socialistas.','pela apatia política de parcela da população.','pela solidez das instituições democraticas.','pelo apoio maciço de entidades públicas e privadas.'],
    correta:2, gabarito:'C',
    contexto:'Hannah Arendt. Origens do totalitarismo, 1979.' },
  { id:'sis23-2-021', vest:'SIS', ano:2023, serie:2, num:21, materia:'Geografia',
    enunciado:'A política econômica protecionista é um entrave ao comércio mundial porque',
    opcoes:['estabelece uma unicidade do mercado internacional.','incentiva o crescimento econômico entre os países.','fortalece a redução de tarifas alfandegárias.','eleva a produção de commodities nos países emergentes.','promove a desigualdade de competição dos mercados.'],
    correta:4, gabarito:'E',
    contexto:'Declaração do ministro das Relações Exteriores do Brasil na OMC (https://comexdobrasil.com, 09.06.2023).' },
  { id:'sis23-2-029', vest:'SIS', ano:2023, serie:2, num:29, materia:'Biologia',
    enunciado:'Os aumentos de CO₂ e óxido nitroso na atmosfera originam-se, principalmente,',
    opcoes:['da ruptura das placas tectônicas.','dos raios ultravioletas que aquecem a superfície.','das atividades microbianas, sobretudo decomposição de seres marinhos.','das erupções vulcânicas recorrentes.','das ações antrópicas, sobretudo da queima de combustíveis fósseis.'],
    correta:4, gabarito:'E',
    contexto:'Gráficos de CO₂ e óxido nitroso nos últimos séculos (www.epa.gov).' },
  { id:'sis23-2-031', vest:'SIS', ano:2023, serie:2, num:31, materia:'Biologia',
    enunciado:'Comparando o material genético do Sars-CoV-2 com o das células humanas, o vírus se diferencia por apresentar',
    opcoes:['nucleotídeos com desoxirribose.','nucleotídeos com fosfatos.','base nitrogenada uracila.','base nitrogenada timina.','base nitrogenada guanina.'],
    correta:2, gabarito:'C',
    contexto:'Covid-19 causada pelo vírus Sars-CoV-2 — RNA de fita simples.' },
  { id:'sis23-2-033', vest:'SIS', ano:2023, serie:2, num:33, materia:'Biologia',
    enunciado:'A geração e condução do impulso nervoso nos neurônios dependem diretamente dos transportes dos íons',
    opcoes:['cálcio e potássio.','cálcio e iodo.','sódio e ferro.','sódio e potássio.','ferro e iodo.'],
    correta:3, gabarito:'D',
    contexto:'Sistema nervoso — impulso nervoso e transporte iônico.' },
  { id:'sis23-2-037', vest:'SIS', ano:2023, serie:2, num:37, materia:'Matemática',
    enunciado:'A função f(x) = log₄x satisfaz f(x) = 4. O valor de x é',
    opcoes:['16.','32.','64.','128.','256.'],
    correta:4, gabarito:'E',
    contexto:'Função logarítmica na base 4.' },
  { id:'sis23-2-039', vest:'SIS', ano:2023, serie:2, num:39, materia:'Matemática',
    enunciado:'Em uma PA com 30 termos, a soma dos 2 maiores é 139 e a razão é 3. A soma dos 2 menores termos é',
    opcoes:['-29.','-10.','0.','23.','49.'],
    correta:0, gabarito:'A',
    contexto:'Progressão Aritmética com 30 termos e razão 3.' },
  { id:'sis23-2-041', vest:'SIS', ano:2023, serie:2, num:41, materia:'Matemática',
    enunciado:'A distribuição de 80 alunos é: 25% com 15 anos, 30% com 16 anos, 45% com 17 anos. A média das idades é',
    opcoes:['15,5 anos.','15,8 anos.','16 anos.','16,2 anos.','16,5 anos.'],
    correta:3, gabarito:'D',
    contexto:'Gráfico de setores com distribuição de idades de 80 alunos.' },
  { id:'sis23-2-045', vest:'SIS', ano:2023, serie:2, num:45, materia:'Física',
    enunciado:'No termômetro antigo, 0°C equivale à marca de 1 cm e 100°C à marca de 9 cm. A marca de 5 cm corresponde a',
    opcoes:['40 ºC.','45 ºC.','50 ºC.','55 ºC.','60 ºC.'],
    correta:2, gabarito:'C',
    contexto:'Termômetro com escala em centímetros — conversão de unidades.' },
  { id:'sis23-2-049', vest:'SIS', ano:2023, serie:2, num:49, materia:'Física',
    enunciado:'A partícula que fissiona o átomo de urânio 235 (tornando-o instável e gerando outras três iguais) é o',
    opcoes:['elétron.','nêutron.','próton.','fóton.','pósitron.'],
    correta:1, gabarito:'B',
    contexto:'Fissão nuclear do urânio 235.' },
  { id:'sis23-2-052', vest:'SIS', ano:2023, serie:2, num:52, materia:'Física',
    enunciado:'A fonte de energia não renovável em uso na atualidade é a',
    opcoes:['eólica.','hídrica.','nuclear.','oceânica.','solar.'],
    correta:2, gabarito:'C',
    contexto:'Classificação de fontes de energia renováveis e não renováveis.' },
  { id:'sis23-2-055', vest:'SIS', ano:2023, serie:2, num:55, materia:'Química',
    enunciado:'A matéria-prima mais sustentável para a produção de etanol é',
    opcoes:['o milho.','a cana-de-açúcar.','a beterraba.','o sorgo sacarino.','a mandioca.'],
    correta:1, gabarito:'B',
    contexto:'Tabela de eficiência energética de matérias-primas para etanol.' },
  { id:'sis23-2-058', vest:'SIS', ano:2023, serie:2, num:58, materia:'Química',
    enunciado:'A combustão de 0,44 g de um hidrocarboneto (MM = 44 g/mol) elevou 100 g de água de 25°C a 75°C (c = 4,2 J/g·°C). A entalpia de combustão é',
    opcoes:['-21 kJ/mol.','-210 kJ/mol.','+210 kJ/mol.','-2100 kJ/mol.','+2100 kJ/mol.'],
    correta:3, gabarito:'D',
    contexto:'Calorimetria — entalpia de combustão de hidrocarboneto.' },

  // ══════════════════════════════════════════
  // SIS 2023 — 3ª SÉRIE (seleção de questões)
  // ══════════════════════════════════════════
  { id:'sis23-3-001', vest:'SIS', ano:2023, serie:3, num:1, materia:'Português',
    enunciado:'A voz do personagem mescla-se à voz do narrador (discurso indireto livre) em "Triste fim de Policarpo Quaresma" no seguinte trecho:',
    opcoes:['"Não recebia ninguém, vivia num isolamento monacal, embora fosse cortês com os vizinhos."','"Se não tinha amigos na redondeza, não tinha inimigos."','"Eram esses os seus hábitos; ultimamente, porém, mudara um pouco."','"Logo pela primeira vez o caso intrigou a vizinhança. Um violão em casa tão respeitável! Que seria?"','"E as cordas vibravam vagarosamente a nota ferida."'],
    correta:3, gabarito:'D',
    contexto:'Triste fim de Policarpo Quaresma, de Lima Barreto.' },
  { id:'sis23-3-002', vest:'SIS', ano:2023, serie:3, num:2, materia:'Português',
    enunciado:'No segundo parágrafo, a fala do doutor Segadas caracteriza o major Quaresma como',
    opcoes:['fingido.','tímido.','culto.','distraído.','confuso.'],
    correta:0, gabarito:'A',
    contexto:'Triste fim de Policarpo Quaresma — fala do doutor Segadas.' },
  { id:'sis23-3-003', vest:'SIS', ano:2023, serie:3, num:3, materia:'Português',
    enunciado:'Em "Não recebia ninguém, vivia num isolamento monacal, embora fosse cortês com os vizinhos", o trecho sublinhado expressa ideia de',
    opcoes:['consequência.','concessão.','causa.','condição.','comparação.'],
    correta:1, gabarito:'B',
    contexto:'Triste fim de Policarpo Quaresma — relações sintáticas.' },
  { id:'sis23-3-004', vest:'SIS', ano:2023, serie:3, num:4, materia:'Português',
    enunciado:'A principal característica do patriotismo de Policarpo Quaresma é construída no romance como algo',
    opcoes:['moderado, estratégico.','discreto, enigmático.','interesseiro, individualista.','mentiroso, simulado.','extremado, caricato.'],
    correta:4, gabarito:'E',
    contexto:'Triste fim de Policarpo Quaresma, de Lima Barreto.' },
  { id:'sis23-3-005', vest:'SIS', ano:2023, serie:3, num:5, materia:'Português',
    enunciado:'Na construção do poema "Canção do exílio", de Murilo Mendes, o recurso expressivo fundamental é a',
    opcoes:['intertextualidade.','redundância.','gradação.','personificação.','ambiguidade.'],
    correta:0, gabarito:'A',
    contexto:'"Canção do exílio", Murilo Mendes, 1930.' },
  { id:'sis23-3-006', vest:'SIS', ano:2023, serie:3, num:6, materia:'Português',
    enunciado:'Predomina no poema "Canção do exílio" de Murilo Mendes um tom',
    opcoes:['didático.','místico.','melancólico.','satírico.','ufanista.'],
    correta:3, gabarito:'D',
    contexto:'"Canção do exílio", Murilo Mendes, 1930.' },
  { id:'sis23-3-007', vest:'SIS', ano:2023, serie:3, num:7, materia:'Português',
    enunciado:'No poema de Murilo Mendes, o eu lírico',
    opcoes:['celebra efusivamente a identidade nacional.','exalta a fusão da cultura nacional com o elemento estrangeiro.','problematiza criticamente a identidade nacional.','defende energicamente o desprezo pelo elemento estrangeiro.','propõe a incorporação irrestrita do elemento estrangeiro.'],
    correta:2, gabarito:'C',
    contexto:'"Canção do exílio", Murilo Mendes, 1930.' },
  { id:'sis23-3-013', vest:'SIS', ano:2023, serie:3, num:13, materia:'História',
    enunciado:'O New Deal, estratégia de Franklin Roosevelt para reverter a Grande Depressão, foi pautado pela teoria econômica conhecida como',
    opcoes:['imperialismo.','privatismo.','keynesianismo.','mercantilismo.','neoliberalismo.'],
    correta:2, gabarito:'C',
    contexto:'New Deal dos anos 1930 e Quebra da Bolsa de Nova Iorque em 1929.' },
  { id:'sis23-3-014', vest:'SIS', ano:2023, serie:3, num:14, materia:'História',
    enunciado:'A arte futurista destacou-se por apresentar obras com a valorização',
    opcoes:['do inconsciente.','da crítica social.','das cores puras.','do conflito de sentimentos.','do dinamismo.'],
    correta:4, gabarito:'E',
    contexto:'"Cavaleiro vermelho", Carlo Carrà, 1913.' },
  { id:'sis23-3-015', vest:'SIS', ano:2023, serie:3, num:15, materia:'História',
    enunciado:'Em relação à Amazônia, o programa "Marcha para o Oeste" (1938) de Vargas objetivava',
    opcoes:['a integração econômica com a criação de núcleos de colonização.','o entreguismo com o aumento da presença de multinacionais.','a consolidação da identidade nacional com a democracia varguista.','a valorização do indígena com inspiração no exemplo estadunidense.','o incentivo às ferrovias com favorecimento do fluxo da produção regional.'],
    correta:0, gabarito:'A',
    contexto:'Programa "Marcha para o Oeste" de Getúlio Vargas (1938).' },
  { id:'sis23-3-016', vest:'SIS', ano:2023, serie:3, num:16, materia:'História',
    enunciado:'O cartaz que apresenta Mao Tsé-Tung como um sol retrata uma fase política chinesa conhecida como',
    opcoes:['Revolução Democrática.','Revolução Gloriosa.','Revolução Vermelha.','Revolução Cultural.','Revolução de Outubro.'],
    correta:3, gabarito:'D',
    contexto:'Propaganda do governo chinês de Mao Tsé-Tung (1949-1976).' },
  { id:'sis23-3-017', vest:'SIS', ano:2023, serie:3, num:17, materia:'História',
    enunciado:'Os textos sobre a condecoração de Che Guevara por Jânio Quadros (1961) demonstram que a política brasileira na década de 1960',
    opcoes:['preparava o cenário para ser conduzida à democracia pelos militares.','recebia influência das tensões da polarização mundial em vigor.','discutia questões sociais com apoio massivo do poder legislativo.','caminhava para um golpe de Estado inspirado no modelo soviético.','equilibrava divergências ideológicas com a diplomacia presidencial.'],
    correta:1, gabarito:'B',
    contexto:'Condecoração de Che Guevara por Jânio Quadros (19.08.1961).' },
  { id:'sis23-3-019', vest:'SIS', ano:2023, serie:3, num:19, materia:'Geografia',
    enunciado:'A notícia sobre trabalhadores de Karnataka (Índia) recebendo menos que o salário mínimo mostra que a produção no contexto da globalização',
    opcoes:['associa a demanda do mercado com a responsabilidade social.','elimina a possibilidade de práticas análogas à escravidão.','reforça características da Divisão Internacional do Trabalho.','facilita o acesso dos produtos às camadas sociais mais baixas.','segue as diretrizes da Organização Internacional do Trabalho.'],
    correta:2, gabarito:'C',
    contexto:'Notícia sobre trabalhadores em Karnataka, Índia (https://economia.ig.com.br, 03.01.2022).' },
  { id:'sis23-3-021', vest:'SIS', ano:2023, serie:3, num:21, materia:'Geografia',
    enunciado:'A mudança na estrutura da rede urbana da Amazônia brasileira (1970-2018) resulta',
    opcoes:['da instalação de infraestrutura e de projetos econômicos que permitiram um novo padrão de articulação.','de investimentos privados que introduziram novos núcleos com realocação da população.','do processo migratório incentivado pelo governo que favoreceu núcleos ribeirinhos.','da integração produtiva por hidrovias que consolidou a indústria ribeirinha.','da formação de centros de pesquisa que consolidou tecnopolos.'],
    correta:0, gabarito:'A',
    contexto:'Mapas da rede urbana na Amazônia (1970-1980 e 2007-2018).' },
  { id:'sis23-3-024', vest:'SIS', ano:2023, serie:3, num:24, materia:'Geografia',
    enunciado:'Além da mudança climática, um fator que intensifica as inundações nos estados do Norte (Acre, AM, PA, RO, TO) é',
    opcoes:['o intemperismo das rochas que intensifica o assoreamento.','o desgaste do solo que forma materiais impermeáveis.','a extração mineral que canaliza rios.','a expansão de hidrelétricas que instala reservatórios.','a ocupação nas margens dos rios que dificulta a drenagem.'],
    correta:4, gabarito:'E',
    contexto:'Fortes chuvas no Norte do Brasil em março de 2023 (www.nexojornal.com.br).' },
  { id:'sis23-3-027', vest:'SIS', ano:2023, serie:3, num:27, materia:'Geografia',
    enunciado:'A crise de 2008, marcada pela falência do banco Lehman Brothers, manifestou-se',
    opcoes:['no mercado de trabalho, com o processo de flexibilização.','nas trocas desiguais da divisão internacional do trabalho.','na esfera informacional, com a mercantilização da sociedade.','na esfera especulativa das bolsas de valores.','na esfera produtiva, com o excesso de produção.'],
    correta:3, gabarito:'D',
    contexto:'Crise econômica de 2008 e falência do Lehman Brothers (www.folha.uol.com.br, 15.03.2023).' },
  { id:'sis23-3-028', vest:'SIS', ano:2023, serie:3, num:28, materia:'Geografia',
    enunciado:'O acordo União Europeia-Mercosul tem como objetivo',
    opcoes:['tornar o Mercosul um mercado comum.','criar uma área de livre comércio entre a UE e o Mercosul.','estender o espaço Schengen para os países do Mercosul.','formar uma organização supranacional entre UE e Mercosul.','encerrar o embargo econômico da Venezuela.'],
    correta:1, gabarito:'B',
    contexto:'Acordo UE-Mercosul negociado por 20 anos (https://agenciabrasil.ebc.com.br, 04.07.2023).' },
  { id:'sis23-3-029', vest:'SIS', ano:2023, serie:3, num:29, materia:'Biologia',
    enunciado:'Considerando o excerto sobre o tratamento da cantora Madonna com antibióticos, ela teve uma infecção causada por um microrganismo',
    opcoes:['que possui forma de bacilo e apresenta lisossomos.','que possui vacúolo pulsátil e não possui centríolos.','acelular e que é um parasita intracelular obrigatório.','que tem parede celular e que não tem envoltório nuclear.','que tem mitocôndrias e que é aeróbio obrigatório.'],
    correta:3, gabarito:'D',
    contexto:'Infecção bacteriana — tratamento da cantora Madonna com antibióticos (2023).' },
  { id:'sis23-3-031', vest:'SIS', ano:2023, serie:3, num:31, materia:'Biologia',
    enunciado:'O animal mais simples na escala zoológica, com coanócitos que promovem circulação de água, pertence ao filo dos',
    opcoes:['equinodermos.','cnidários.','platelmintos.','artrópodes.','poríferos.'],
    correta:4, gabarito:'E',
    contexto:'Poríferos — animais mais simples, sem tecidos especializados.' },
  { id:'sis23-3-032', vest:'SIS', ano:2023, serie:3, num:32, materia:'Biologia',
    enunciado:'Para que a seleção natural ocorra, é importante que',
    opcoes:['as diferentes espécies cruzem entre si.','os organismos se reproduzam assexuadamente.','as características físicas sejam adquiridas.','o meio ambiente não sofra alterações.','os organismos apresentem variabilidade.'],
    correta:4, gabarito:'E',
    contexto:'Darwin e Wallace — teoria da seleção natural (1858).' },
  { id:'sis23-3-033', vest:'SIS', ano:2023, serie:3, num:33, materia:'Biologia',
    enunciado:'Duas características que favoreceram a endotermia das aves são',
    opcoes:['a presença de ossos pneumáticos e osso esterno em quilha.','a produção de suor e a formação de sacos aéreos.','a presença de glândula uropigiana e a presença de moela.','a pele coberta com penas e a circulação completa.','o movimento do diafragma e a viviparidade.'],
    correta:3, gabarito:'D',
    contexto:'Endotermia nas aves — características que favorecem o controle da temperatura.' },
  { id:'sis23-3-034', vest:'SIS', ano:2023, serie:3, num:34, materia:'Biologia',
    enunciado:'A relação entre carrapato e boi, entre boi e bactérias estomacais e entre os carrapatos são exemplos, respectivamente, de',
    opcoes:['amensalismo, inquilinismo e canibalismo.','parasitismo, protocooperação e competição interespecífica.','parasitismo, mutualismo e competição intraespecífica.','amensalismo, mutualismo e protocooperação.','predatismo, inquilinismo e protocooperação.'],
    correta:2, gabarito:'C',
    contexto:'Relações ecológicas no corpo do boi.' },
  { id:'sis23-3-037', vest:'SIS', ano:2023, serie:3, num:37, materia:'Matemática',
    enunciado:'Sejam A = (m, 4) e B = (6, n) pontos do plano. A reta r = AB tem equação 5x - 4y + 6 = 0. O valor de m + n é',
    opcoes:['1.','7.','10.','11.','15.'],
    correta:3, gabarito:'D',
    contexto:'Geometria analítica — pontos sobre uma reta.' },
  { id:'sis23-3-039', vest:'SIS', ano:2023, serie:3, num:39, materia:'Matemática',
    enunciado:'Dado o número complexo z = 3i e y = m + ni com yz = 6 + 15i, o valor de m + n é',
    opcoes:['3.','4.','5.','6.','7.'],
    correta:0, gabarito:'A',
    contexto:'Números complexos — multiplicação e identificação de partes.' },
  { id:'sis23-3-041', vest:'SIS', ano:2023, serie:3, num:41, materia:'Matemática',
    enunciado:'As raízes de p(x) = x² - x - 20 também são raízes de q(x) = x³ - 4x² - 17x + 60. A soma das duas maiores raízes de q(x) é',
    opcoes:['1.','8.','20.','25.','40.'],
    correta:1, gabarito:'B',
    contexto:'Polinômios — raízes compartilhadas e cálculo de soma.' },
  { id:'sis23-3-044', vest:'SIS', ano:2023, serie:3, num:44, materia:'Matemática',
    enunciado:'Uma prova com 10 testes foi aplicada para 301 alunos (mínimo 3 acertos, ninguém acertou exatamente 8). A mediana e a moda dos acertos foram, respectivamente,',
    opcoes:['4 e 9.','5 e 7.','6 e 7.','6,5 e 7.','7 e 6,5.'],
    correta:2, gabarito:'C',
    contexto:'Gráfico de barras com distribuição de acertos em prova.' },
  { id:'sis23-3-046', vest:'SIS', ano:2023, serie:3, num:46, materia:'Física',
    enunciado:'No modelo atômico de Rutherford-Bohr fica claro que',
    opcoes:['a estrutura do átomo é maciça.','o elétron em órbita irradia energia.','o centro do átomo não possui carga.','existe um núcleo atômico.','o nêutron atrai eletricamente os elétrons.'],
    correta:3, gabarito:'D',
    contexto:'Modelo atômico de Rutherford-Bohr.' },
  { id:'sis23-3-049', vest:'SIS', ano:2023, serie:3, num:49, materia:'Física',
    enunciado:'Um motor elétrico com rendimento de 80% e potência de 500 W desperdiça, em 20 s sob esforço máximo,',
    opcoes:['1000 J.','2000 J.','4000 J.','6000 J.','8000 J.'],
    correta:1, gabarito:'B',
    contexto:'Rendimento de motor elétrico — energia desperdiçada.' },
  { id:'sis23-3-053', vest:'SIS', ano:2023, serie:3, num:53, materia:'Química',
    enunciado:'O ibuprofeno tem a quantidade de átomos de carbono primários e terciários, respectivamente,',
    opcoes:['2 e 3.','2 e 4.','3 e 3.','4 e 3.','4 e 4.'],
    correta:3, gabarito:'E',
    contexto:'Estrutura molecular do ibuprofeno — classificação de carbonos.' },
  { id:'sis23-3-055', vest:'SIS', ano:2023, serie:3, num:55, materia:'Química',
    enunciado:'As hibridizações dos átomos de carbono 1, 2 e 3 do propeno (H₂C=CH-CH₃) são, respectivamente,',
    opcoes:['sp, sp e sp³.','sp, sp² e sp³.','sp², sp² e sp³.','sp², sp e sp³.','sp³, sp³ e sp².'],
    correta:2, gabarito:'C',
    contexto:'Hibridização dos carbonos no propeno.' },
  { id:'sis23-3-056', vest:'SIS', ano:2023, serie:3, num:56, materia:'Química',
    enunciado:'A combustão completa de 1 mol de um monoálcool secundário de cadeia ramificada produziu 5 mol de CO₂. O nome IUPAC desse álcool é',
    opcoes:['2-metilbutan-1-ol.','2-metilbutan-2-ol.','3-metilbutan-2-ol.','2-metilpentan-1-ol.','3-metilpentan-2-ol.'],
    correta:2, gabarito:'C',
    contexto:'Reação de combustão completa de monoálcool — nomenclatura IUPAC.' },
  { id:'sis23-3-059', vest:'SIS', ano:2023, serie:3, num:59, materia:'Química',
    enunciado:'As fibras que compõem o algodão e a seda são exemplos, respectivamente, de',
    opcoes:['carboidrato e lipídeo.','carboidrato e proteína.','lipídeo e proteína.','proteína e carboidrato.','proteína e lipídeo.'],
    correta:1, gabarito:'B',
    contexto:'Fibras têxteis: estrutura do algodão (celulose) e da seda (proteína).' },

  // Tema de redação SIS 2ª Série 2023
  { id:'sis23-2-red', vest:'SIS', ano:2023, serie:2, num:0, materia:'Redação',
    enunciado:'Tema da redação SIS 2023 — 2ª Série: Escreva um texto expositivo-argumentativo sobre "Zoológicos: preservação ou desrespeito aos animais?"',
    opcoes:[],
    correta:-1, gabarito:'Redação',
    contexto:'Textos de apoio: Armandinho (charge), Érica Terrón González (meusanimais.com.br), Patrícia Figueiredo (g1.globo.com), Bruno Lucca (folha.uol.com.br).' },

  // Tema de redação SIS 3ª Série 2023
  { id:'sis23-3-red', vest:'SIS', ano:2023, serie:3, num:0, materia:'Redação',
    enunciado:'Tema da redação SIS 2023 — 3ª Série: Escreva um texto dissertativo-argumentativo sobre "Racismo no futebol: é necessário punir também os clubes ou só os torcedores criminosos?"',
    opcoes:[],
    correta:-1, gabarito:'Redação',
    contexto:'Textos de apoio: Marília Marz (fotografia), Prof. Luiz Herculano (IFSC), Lincoln Chaves (agenciabrasil.ebc.com.br), Marcel Rizzo (uol.com.br).' },
];

// ─── NAVIGATION ───
function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + screen)?.classList.add('active');
  document.getElementById('nav-' + screen)?.classList.add('active');
  if (screen === 'materia') renderTopics();
  if (screen === 'perfil') renderPerfil();
}

// ─── MODAL SIMULADO ───
function abrirModalSimulado() {
  const m = document.getElementById('modal-simulado');
  m.style.display = 'flex';
}
function fecharModalSimulado() {
  document.getElementById('modal-simulado').style.display = 'none';
}
// Mantém compatibilidade com código antigo
function escolherEtapaSimulado(vest) { abrirModalSimulado(); }
function fecharModalEtapa() { fecharModalSimulado(); }

// ─── EXERCÍCIOS ESTILO DUOLINGO ───
let exTabAtual = 'Matemática';
let exQuestaoAtual = null;
let exRespondida = false;
let exTotal = 0;
let exFeitas = 0;

function abrirExercicios() {
  const c = getCoracoes();
  if (c.qtd <= 0) {
    // Mostra tela bloqueada
    document.getElementById('bloqueado-view').style.display = 'flex';
    iniciarTimerRecarga(c.recargaTs);
    return;
  }
  exTabAtual = 'Matemática';
  exFeitas = 0;
  document.getElementById('exercicios-view').classList.add('open');
  atualizarTabsEx();
  carregarProximaQuestao();
}

function fecharExercicios() {
  document.getElementById('exercicios-view').classList.remove('open');
}

function fecharBloqueado() {
  document.getElementById('bloqueado-view').style.display = 'none';
}

function exTrocarTab(mat) {
  exTabAtual = mat;
  exFeitas = 0;
  atualizarTabsEx();
  carregarProximaQuestao();
}

function atualizarTabsEx() {
  const isMat = exTabAtual === 'Matemática';
  const btnMat = document.getElementById('extab-mat');
  const btnRed = document.getElementById('extab-red');
  if (btnMat) {
    btnMat.style.borderColor = isMat ? 'rgba(0,180,216,0.4)' : 'rgba(255,255,255,0.08)';
    btnMat.style.background  = isMat ? 'rgba(0,180,216,0.1)'  : 'rgba(255,255,255,0.04)';
    btnMat.style.color        = isMat ? 'var(--cyan)'          : 'var(--text2)';
  }
  if (btnRed) {
    btnRed.style.borderColor = !isMat ? 'rgba(244,168,51,0.4)' : 'rgba(255,255,255,0.08)';
    btnRed.style.background  = !isMat ? 'rgba(244,168,51,0.1)' : 'rgba(255,255,255,0.04)';
    btnRed.style.color        = !isMat ? 'var(--gold)'          : 'var(--text2)';
  }
}

function carregarProximaQuestao() {
  exRespondida = false;
  const c = getCoracoes();
  renderCoraoesEx(c.qtd);

  const vestAlvo = perfil?.vests?.[0] || 'SIS';
  const serieAlvo = perfil?.serie <= 3 ? perfil.serie : null;
  const usadas = questoesUsadas[exTabAtual] || [];

  let pool = bancoDB.filter(q =>
    q.opcoes.length > 0 &&
    q.materia === exTabAtual &&
    (q.vest === vestAlvo)
  );
  if (serieAlvo) pool = pool.filter(q => q.serie === serieAlvo);

  // Prefere não usadas; se esgotou, reseta
  let novas = pool.filter(q => !usadas.includes(q.id));
  if (novas.length === 0) {
    questoesUsadas[exTabAtual] = [];
    salvarProgresso();
    novas = pool;
  }

  // Prioriza temas fracos
  novas.sort((a,b) => (temasFragos[b.materia]||0) - (temasFragos[a.materia]||0) || Math.random()-0.5);

  exTotal = pool.length;
  const bar = document.getElementById('ex-progress-bar');
  if (bar) bar.style.width = exTotal > 0 ? Math.min(100, (exFeitas/Math.min(exTotal,10))*100)+'%' : '0%';

  if (!novas.length) {
    document.getElementById('ex-questao-area').innerHTML = `
      <div style="text-align:center;padding:40px 0;color:var(--text2)">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <div style="font-size:18px;font-weight:700;color:var(--text)">Mandou bem!</div>
        <div style="font-size:14px;margin-top:8px">Sem mais questões de ${exTabAtual} por agora.<br>Tente a outra matéria ou volte amanhã!</div>
      </div>`;
    return;
  }

  exQuestaoAtual = novas[0];
  renderQuestaoEx(exQuestaoAtual);
}

function renderCoraoesEx(qtd) {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('ex-c'+i);
    if (el) el.style.opacity = i <= qtd ? '1' : '0.2';
  }
}

function renderQuestaoEx(q) {
  const letras = ['A','B','C','D','E'];
  const area = document.getElementById('ex-questao-area');
  if (!area) return;

  // Tag de reforço
  const eFraco = (temasFragos[q.materia]||0) > 0;

  area.innerHTML = `
    <div style="margin-bottom:6px;display:flex;align-items:center;gap:8px">
      <span style="font-size:11px;color:var(--text2);background:var(--surface2);padding:3px 8px;border-radius:6px">${q.vest} ${q.ano} • ${q.serie}ª Série</span>
      ${eFraco ? '<span style="font-size:11px;color:var(--red);font-weight:700">⚠️ Reforçando</span>' : ''}
    </div>
    <div style="font-size:11px;color:var(--text2);margin-bottom:16px;line-height:1.5">${q.contexto||''}</div>
    <div style="font-size:16px;font-weight:600;color:var(--text);line-height:1.6;margin-bottom:24px">${q.enunciado}</div>
    <div id="ex-opcoes" style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
      ${q.opcoes.map((op,i) => `
        <button onclick="responderEx(${i})" id="exo-${i}" style="
          padding:14px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,0.1);
          background:rgba(255,255,255,0.04);color:var(--text);font-family:var(--font);
          font-size:14px;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;
          transition:all 0.15s;width:100%">
          <span style="width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,0.07);
            display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;color:var(--text2)">${letras[i]}</span>
          <span>${op}</span>
        </button>`).join('')}
    </div>
    <div id="ex-feedback" style="margin-bottom:12px"></div>
    <button id="ex-proxima-btn" onclick="proximaQuestao()" style="display:none;width:100%;padding:15px;border-radius:12px;border:none;background:var(--accent);color:#fff;font-family:var(--font);font-size:15px;font-weight:700;cursor:pointer">
      Próxima questão →
    </button>`;
}

function responderEx(idx) {
  if (exRespondida) return;
  exRespondida = true;
  const q = exQuestaoAtual;
  const letras = ['A','B','C','D','E'];

  // Desabilita todos
  for (let i = 0; i < q.opcoes.length; i++) {
    const btn = document.getElementById('exo-'+i);
    if (btn) btn.disabled = true;
  }

  const corrBtn = document.getElementById('exo-'+q.correta);
  const fb = document.getElementById('ex-feedback');
  const proxBtn = document.getElementById('ex-proxima-btn');

  if (idx === q.correta) {
    if (corrBtn) { corrBtn.style.borderColor='var(--green)'; corrBtn.style.background='rgba(45,201,138,0.12)'; }
    if (fb) fb.innerHTML = `<div style="background:rgba(45,201,138,0.1);border:1px solid rgba(45,201,138,0.3);border-radius:12px;padding:14px;font-size:14px;color:var(--green);font-weight:600">✅ Correto! Gabarito: ${q.gabarito}</div>`;
    marcarTemaAcerto(q.materia, q.id);
    addXP(20); spawnStars();
    exFeitas++;
  } else {
    const errBtn = document.getElementById('exo-'+idx);
    if (errBtn) { errBtn.style.borderColor='var(--red)'; errBtn.style.background='rgba(255,82,82,0.08)'; }
    if (corrBtn) { corrBtn.style.borderColor='var(--green)'; corrBtn.style.background='rgba(45,201,138,0.1)'; }
    const vidas = perderCoracao();
    renderCoraoesEx(vidas);
    if (fb) fb.innerHTML = `<div style="background:rgba(255,82,82,0.08);border:1px solid rgba(255,82,82,0.25);border-radius:12px;padding:14px;font-size:14px;color:#ff8a80">
      ❌ Resposta: <strong style="color:var(--text)">${letras[q.correta]}</strong><br>
      <span style="font-size:12px;color:var(--gold)">💡 Reforçar: <strong>${q.materia}</strong></span>
    </div>`;
    marcarTemaFraco(q.materia, q.id);
    addXP(5);
    if (vidas <= 0) {
      setTimeout(() => {
        fecharExercicios();
        document.getElementById('bloqueado-view').style.display = 'flex';
        iniciarTimerRecarga(getCoracoes().recargaTs);
      }, 1800);
    }
  }

  state.quizDone++; if (idx === q.correta) state.quizCorrect++;
  salvarState(); updateStats();
  if (proxBtn) proxBtn.style.display = 'block';
}

function proximaQuestao() {
  carregarProximaQuestao();
}

// ─── PERFIL ───
function renderPerfil() {
  if (!perfil) return;
  const primeiro = perfil.nome.split(' ')[0];
  const el = document.getElementById('perfil-nome');
  if (el) el.textContent = perfil.nome;
  const info = document.getElementById('perfil-info');
  const serieLabel = ['','1ª Série','2ª Série','3ª Série','EM Completo'];
  if (info) info.textContent = `${serieLabel[perfil.serie]||''} • ${(perfil.vests||[]).join(' + ')}`;
  const xpEl = document.getElementById('perfil-xp');
  if (xpEl) xpEl.textContent = state.xp;
  const acEl = document.getElementById('perfil-acertos');
  if (acEl) acEl.textContent = state.quizDone > 0 ? Math.round((state.quizCorrect/state.quizDone)*100)+'%' : '—';
  const stEl = document.getElementById('perfil-streak');
  if (stEl) stEl.textContent = '🔥'+state.streak;
  const rankNome = document.getElementById('rank-nome');
  if (rankNome) rankNome.textContent = primeiro;
  const rankXp = document.getElementById('rank-xp');
  if (rankXp) rankXp.textContent = state.xp+' XP';

  // Dificuldades
  const difEl = document.getElementById('perfil-dificuldades');
  if (difEl) {
    const temas = Object.entries(temasFragos).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
    if (temas.length) {
      difEl.innerHTML = temas.map(([mat,n]) =>
        `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
          <span>• ${mat}</span>
          <span style="color:var(--red);font-weight:700">${n} erro${n>1?'s':''}</span>
        </div>`).join('');
    } else {
      difEl.innerHTML = '<span style="font-size:12px;color:var(--text2)">Nenhum erro registrado ainda. Continue praticando!</span>';
    }
  }
}

function editarPerfil() {
  localStorage.removeItem('voaam_perfil');
  location.reload();
}

// ─── THEME TOGGLE ───
// --- Lógica de Troca de Tema ---
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', next);
  localStorage.setItem('voaam_theme', next); // Nome da chave que você já usa
  updateToggleUI(next);
}

// Atualiza o visual do botão (ícone e posição)
function updateToggleUI(theme) {
  const circle = document.querySelector('.toggle-circle');
  if (circle) {
    circle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

// Inicialização (Executa ao carregar a página)
(function() {
  const saved = localStorage.getItem('voaam_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateToggleUI(saved);
})();

// ─── INIT ───
document.getElementById('xp-count').textContent = state.xp;
if (!perfil) {
  document.getElementById('onboarding').classList.remove('hidden');
} else {
  document.getElementById('onboarding').classList.add('hidden');
  aplicarPerfil();
}
renderTopics();

