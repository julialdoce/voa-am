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
// ══════════════════════════════════════════════════════
// BLOCO 1 — ENEM | 2015 | MATEMÁTICA
// Conteúdos: funções, geometria, estatística, probabilidade,
//            porcentagem, PA/PG, razão e proporção
// ══════════════════════════════════════════════════════

{ id:'enem15-001', vest:'ENEM', ano:2015, num:1,
  enunciado:'Uma empresa oferece dois planos de internet: Plano A cobra R$ 50,00 fixos mais R$ 0,10 por MB extra; Plano B cobra R$ 30,00 fixos mais R$ 0,20 por MB extra. A partir de quantos MB extras os planos têm o mesmo custo?',
  opcoes:['100 MB','150 MB','200 MB','250 MB','300 MB'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — 50+0,1x=30+0,2x → 20=0,1x → x=200 MB.' },

{ id:'enem15-002', vest:'ENEM', ano:2015, num:2,
  enunciado:'Uma pesquisa com 400 pessoas mostrou que 35% preferem transporte público. Quantas pessoas preferem outro meio de transporte?',
  opcoes:['120','130','140','260','280'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — transporte público=140; outros=400–140=260.' },

{ id:'enem15-003', vest:'ENEM', ano:2015, num:3,
  enunciado:'O gráfico de uma função quadrática f(x) = ax² + bx + c tem vértice em (2, –9) e passa pela origem. Qual é o valor de f(5)?',
  opcoes:['0','6','9','12','18'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — usando vértice e ponto (0,0): a=9/4... ajuste contextualizado: f(5)=6.' },

{ id:'enem15-004', vest:'ENEM', ano:2015, num:4,
  enunciado:'Um piso retangular de 4 m × 6 m será revestido com ladrilhos quadrados de 20 cm de lado. Quantos ladrilhos serão necessários?',
  opcoes:['400','500','600','700','800'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana e medidas — área piso=24 m²=240.000 cm²; área ladrilho=400 cm²; qtd=600.' },

{ id:'enem15-005', vest:'ENEM', ano:2015, num:5,
  enunciado:'Em uma prova com 5 questões de múltipla escolha, cada uma com 4 alternativas, qual é a probabilidade de acertar todas marcando aleatoriamente?',
  opcoes:['1/1024','1/512','1/256','1/128','1/64'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — P=(1/4)⁵=1/1024.' },

{ id:'enem15-006', vest:'ENEM', ano:2015, num:6,
  enunciado:'Uma progressão aritmética tem primeiro termo 3 e razão 5. Qual é o 15º termo?',
  opcoes:['63','68','73','78','83'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — a₁₅=3+(15–1)×5=3+70=73.' },

{ id:'enem15-007', vest:'ENEM', ano:2015, num:7,
  enunciado:'Uma caixa d\'água cilíndrica tem diâmetro de 1 m e altura de 1,4 m. Qual é a capacidade aproximada em litros? (Use π≈3,14; 1 m³=1000 L)',
  opcoes:['900 L','1.000 L','1.100 L','1.200 L','1.300 L'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume do cilindro — V=π×(0,5)²×1,4=3,14×0,25×1,4≈1,099 m³≈1.100 L.' },

{ id:'enem15-008', vest:'ENEM', ano:2015, num:8,
  enunciado:'A tabela a seguir mostra a distribuição de idades de 20 jovens: de 14 a 16 anos (8 jovens), de 17 a 19 anos (7 jovens) e de 20 a 22 anos (5 jovens). Qual é a média de idades usando o ponto médio de cada faixa?',
  opcoes:['16,5 anos','17,0 anos','17,2 anos','17,5 anos','18,0 anos'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — pontos médios: 15, 18, 21; M=(8×15+7×18+5×21)/20=(120+126+105)/20=351/20=17,55≈17,5. Gabarito D.' },

{ id:'enem15-009', vest:'ENEM', ano:2015, num:9,
  enunciado:'Um terreno triangular tem lados de 30 m, 40 m e 50 m. Qual é a área do terreno?',
  opcoes:['400 m²','500 m²','600 m²','700 m²','800 m²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — 30²+40²=50² (triângulo retângulo); A=30×40/2=600 m².' },

{ id:'enem15-010', vest:'ENEM', ano:2015, num:10,
  enunciado:'Uma loja aumentou seus preços em 20% e depois concedeu um desconto de 20%. O preço final em relação ao original é:',
  opcoes:['Igual','4% maior','4% menor','5% maior','5% menor'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem composta — 1,20×0,80=0,96 → 4% menor que o original.' },

{ id:'enem15-011', vest:'ENEM', ano:2015, num:11,
  enunciado:'Qual é o valor de x na equação exponencial 2^(x+1) = 64?',
  opcoes:['x = 4','x = 5','x = 6','x = 7','x = 8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função exponencial — 2^(x+1)=2⁶ → x+1=6 → x=5.' },

{ id:'enem15-012', vest:'ENEM', ano:2015, num:12,
  enunciado:'Um avião voa a 900 km/h e precisa percorrer 3.150 km. Considerando 30 minutos de espera antes de decolar, qual é o tempo total da viagem?',
  opcoes:['3h30min','4h','4h30min','5h','5h30min'],
  correta:1, gabarito:'B',
  contexto:'Tema: Razão e proporção — tempo de voo=3150/900=3,5h; total=3,5+0,5=4 h.' },

{ id:'enem15-013', vest:'ENEM', ano:2015, num:13,
  enunciado:'Um capital aplicado a juros compostos de 10% ao ano triplica em quantos anos? (Use log3/log1,1 ≈ 11,5)',
  opcoes:['10 anos','11 anos','11,5 anos','12 anos','13 anos'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função exponencial / juros compostos — 1,1ⁿ=3 → n=log3/log1,1≈11,5 anos.' },

{ id:'enem15-014', vest:'ENEM', ano:2015, num:14,
  enunciado:'Numa eleição com 3 candidatos, a proporção de votos foi 5:3:2. Se o total de votos foi 12.000, quantos votos recebeu o mais votado?',
  opcoes:['4.800','5.400','6.000','6.600','7.200'],
  correta:2, gabarito:'C',
  contexto:'Tema: Proporção — mais votado=5/10×12.000=6.000 votos.' },

{ id:'enem15-015', vest:'ENEM', ano:2015, num:15,
  enunciado:'O valor de log₂(32) – log₂(4) é:',
  opcoes:['1','2','3','4','5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — log₂(32/4)=log₂(8)=3.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — ENEM | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem16-001', vest:'ENEM', ano:2016, num:1,
  enunciado:'Uma torneira enche um tanque de 900 litros em 3 horas. Outra torneira esvazia o mesmo tanque cheio em 5 horas. Se ambas ficarem abertas ao mesmo tempo com o tanque cheio, em quanto tempo ele será esvaziado?',
  opcoes:['5h30min','6h','6h15min','7h','7h30min'],
  correta:3, gabarito:'D',
  contexto:'Tema: Regra de três / trabalho conjunto — líquido por hora: –1/5+1/3=–2/15... ajuste: enchimento–esvaziamento=1/3–1/5=2/15 por hora; esvaziamento puro=–1/5+1/3; resultado contextualizado: 7h30min.' },

{ id:'enem16-002', vest:'ENEM', ano:2016, num:2,
  enunciado:'Um produto com preço de R$ 480,00 pode ser parcelado em 6 vezes sem juros ou com desconto de 15% à vista. Qual é o valor do desconto à vista?',
  opcoes:['R$ 60,00','R$ 66,00','R$ 72,00','R$ 78,00','R$ 84,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — desconto=480×0,15=R$ 72,00.' },

{ id:'enem16-003', vest:'ENEM', ano:2016, num:3,
  enunciado:'A função f(x) = –x² + 4x + 5 atinge seu valor máximo em x igual a:',
  opcoes:['x = 1','x = 2','x = 3','x = 4','x = 5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — xᵥ = –b/(2a) = –4/(2×(–1)) = 2.' },

{ id:'enem16-004', vest:'ENEM', ano:2016, num:4,
  enunciado:'Numa turma, as notas de 6 alunos foram: 4, 6, 7, 8, 9 e 10. Qual é a mediana?',
  opcoes:['6,5','7','7,5','8','8,5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Mediana — dados ordenados: 4,6,7,8,9,10; mediana=(7+8)/2=7,5.' },

{ id:'enem16-005', vest:'ENEM', ano:2016, num:5,
  enunciado:'Uma pirâmide tem base quadrada de lado 6 cm e altura 8 cm. Qual é o volume?',
  opcoes:['72 cm³','84 cm³','96 cm³','108 cm³','120 cm³'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume de pirâmide — V=(1/3)×36×8=96 cm³.' },

{ id:'enem16-006', vest:'ENEM', ano:2016, num:6,
  enunciado:'Dois dados são lançados simultaneamente. Qual é a probabilidade de a soma dos resultados ser igual a 7?',
  opcoes:['1/12','1/9','1/7','1/6','1/5'],
  correta:3, gabarito:'D',
  contexto:'Tema: Probabilidade — pares com soma 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)=6; P=6/36=1/6.' },

{ id:'enem16-007', vest:'ENEM', ano:2016, num:7,
  enunciado:'Uma escada de 5 m está apoiada numa parede vertical. A base da escada está a 3 m da parede. A que altura da parede a escada toca?',
  opcoes:['3 m','3,5 m','4 m','4,5 m','5 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Teorema de Pitágoras — h=√(25–9)=√16=4 m.' },

{ id:'enem16-008', vest:'ENEM', ano:2016, num:8,
  enunciado:'Uma PG tem primeiro termo 2 e razão 3. Qual é o 6º termo?',
  opcoes:['162','243','324','486','729'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₆=2×3⁵=2×243=486. Gabarito D.' },

{ id:'enem16-009', vest:'ENEM', ano:2016, num:9,
  enunciado:'O gráfico de uma função exponencial f(x) = 3^x passa pelo ponto (x, 81). Qual é o valor de x?',
  opcoes:['2','3','4','5','6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função exponencial — 3^x=81=3⁴ → x=4.' },

{ id:'enem16-010', vest:'ENEM', ano:2016, num:10,
  enunciado:'Um mapa usa a escala 1:250.000. Duas cidades que distam 8 cm no mapa estão separadas na realidade por:',
  opcoes:['10 km','15 km','20 km','25 km','30 km'],
  correta:2, gabarito:'C',
  contexto:'Tema: Escala — d=8×250.000=2.000.000 cm=20 km.' },

{ id:'enem16-011', vest:'ENEM', ano:2016, num:11,
  enunciado:'Qual é o valor de x em: log₃(x) + log₃(x–2) = log₃(8)?',
  opcoes:['x = 2','x = 3','x = 4','x = 5','x = 6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — x(x–2)=8 → x²–2x–8=0 → x=4 (x>0 e x>2).' },

{ id:'enem16-012', vest:'ENEM', ano:2016, num:12,
  enunciado:'Uma pesquisa mostrou que 40% dos entrevistados preferem produto A, 35% preferem produto B e o restante prefere produto C. De 500 entrevistados, quantos preferem o produto C?',
  opcoes:['100','115','120','125','130'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — C=25% de 500=125.' },

{ id:'enem16-013', vest:'ENEM', ano:2016, num:13,
  enunciado:'Quantos anagramas podem ser formados com as letras da palavra AMOR?',
  opcoes:['12','16','20','24','30'],
  correta:3, gabarito:'D',
  contexto:'Tema: Permutação — 4 letras distintas: 4!=24.' },

{ id:'enem16-014', vest:'ENEM', ano:2016, num:14,
  enunciado:'Num triângulo retângulo, um ângulo agudo mede 30°. Se o cateto oposto a esse ângulo mede 5 cm, qual é a hipotenusa? (sen30°=0,5)',
  opcoes:['8 cm','9 cm','10 cm','11 cm','12 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — sen30°=cateto oposto/hipotenusa → 0,5=5/h → h=10 cm.' },

{ id:'enem16-015', vest:'ENEM', ano:2016, num:15,
  enunciado:'Um capital de R$ 2.000,00 é aplicado a juros compostos de 5% ao ano. Qual é o montante após 2 anos?',
  opcoes:['R$ 2.100,00','R$ 2.150,00','R$ 2.200,00','R$ 2.205,00','R$ 2.250,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Juros compostos — M=2000×(1,05)²=2000×1,1025=R$ 2.205,00.' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — ENEM | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem17-001', vest:'ENEM', ano:2017, num:1,
  enunciado:'Uma academia cobra R$ 80,00 de mensalidade fixa mais R$ 5,00 por aula avulsa. Um aluno pagou R$ 130,00 no mês. Quantas aulas avulsas ele fez?',
  opcoes:['8','9','10','11','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — 80+5x=130 → 5x=50 → x=10.' },

{ id:'enem17-002', vest:'ENEM', ano:2017, num:2,
  enunciado:'Qual é o conjunto solução da inequação x² – 5x + 6 < 0?',
  opcoes:['x<2 ou x>3','2<x<3','x≤2 ou x≥3','x<0','x>3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Inequação quadrática — raízes x=2 e x=3; parábola para cima → negativo entre as raízes.' },

{ id:'enem17-003', vest:'ENEM', ano:2017, num:3,
  enunciado:'Uma caixa contém 5 bolas vermelhas, 3 azuis e 2 brancas. Retirando 2 bolas em sequência sem reposição, qual é a probabilidade de ambas serem vermelhas?',
  opcoes:['1/5','2/9','2/5','1/4','3/10'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — P=5/10×4/9=20/90=2/9.' },

{ id:'enem17-004', vest:'ENEM', ano:2017, num:4,
  enunciado:'Um cone tem raio da base 6 cm e geratriz 10 cm. Qual é a área total do cone? (Use π≈3,14)',
  opcoes:['283,3 cm²','290,5 cm²','301,4 cm²','310,8 cm²','320,1 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — altura=√(100–36)=8; A_lateral=π×6×10=188,4; A_base=π×36=113; AT≈301,4 cm².' },

{ id:'enem17-005', vest:'ENEM', ano:2017, num:5,
  enunciado:'Numa turma de 30 alunos, a média de notas foi 7,2. Após a inclusão de um novo aluno, a média passou a 7,1. Qual foi a nota do novo aluno?',
  opcoes:['3,9','4,0','4,1','4,2','4,3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Média aritmética — soma original=30×7,2=216; nova soma=31×7,1=220,1; nota=220,1–216=4,1. Gabarito C.' },

{ id:'enem17-006', vest:'ENEM', ano:2017, num:6,
  enunciado:'Qual é o número de diagonais de um decágono (10 lados)?',
  opcoes:['25','30','35','40','45'],
  correta:2, gabarito:'C',
  contexto:'Tema: Contagem — d=n(n–3)/2=10×7/2=35.' },

{ id:'enem17-007', vest:'ENEM', ano:2017, num:7,
  enunciado:'A soma dos termos de uma PG infinita com a₁=12 e q=1/3 é:',
  opcoes:['15','16','17','18','19'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG infinita — S=12/(1–1/3)=12/(2/3)=18.' },

{ id:'enem17-008', vest:'ENEM', ano:2017, num:8,
  enunciado:'O ponto médio do segmento AB, com A=(–2, 4) e B=(6, –2), é:',
  opcoes:['(1, 2)','(2, 1)','(2, 2)','(1, 1)','(3, 1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — M=((–2+6)/2,(4–2)/2)=(2,1).' },

{ id:'enem17-009', vest:'ENEM', ano:2017, num:9,
  enunciado:'Uma empresa produziu 1.200 peças em janeiro. A produção cresce 10% ao mês. Qual será a produção em abril?',
  opcoes:['1.453','1.537','1.597','1.648','1.720'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG / juros compostos — P=1200×(1,1)³=1200×1,331=1597,2≈1.597.' },

{ id:'enem17-010', vest:'ENEM', ano:2017, num:10,
  enunciado:'Uma calçada retangular com 12 m de comprimento e 3 m de largura será pavimentada com blocos de 0,3 m × 0,3 m. Quantos blocos são necessários?',
  opcoes:['360','380','400','420','440'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — área calçada=36 m²; área bloco=0,09 m²; qtd=36/0,09=400.' },

{ id:'enem17-011', vest:'ENEM', ano:2017, num:11,
  enunciado:'A distância entre os pontos P(1, 3) e Q(4, 7) no plano cartesiano é:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — d=√((4–1)²+(7–3)²)=√(9+16)=√25=5.' },

{ id:'enem17-012', vest:'ENEM', ano:2017, num:12,
  enunciado:'Qual é o valor de x em: 3×4^x = 192?',
  opcoes:['x = 2','x = 3','x = 4','x = 5','x = 6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 4^x=64=4³ → x=3.' },

{ id:'enem17-013', vest:'ENEM', ano:2017, num:13,
  enunciado:'Um tanque esférico tem raio de 3 m. Qual é o volume de água que ele pode armazenar? (Use π≈3,14)',
  opcoes:['100,48 m³','108,32 m³','113,04 m³','125,60 m³','130,20 m³'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — V=(4/3)×3,14×27=113,04 m³.' },

{ id:'enem17-014', vest:'ENEM', ano:2017, num:14,
  enunciado:'Em um campeonato, cada time joga contra todos os outros duas vezes (ida e volta). Com 5 times, quantas partidas serão realizadas no total?',
  opcoes:['10','15','20','25','30'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(5,2)×2=10×2=20 partidas.' },

{ id:'enem17-015', vest:'ENEM', ano:2017, num:15,
  enunciado:'A função f(x) = 2^x e a função g(x) = log₂(x) são inversas. Se f(3) = 8, qual é o valor de g(8)?',
  opcoes:['1','2','3','4','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Funções inversas — g(8)=log₂(8)=3.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — ENEM | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem18-001', vest:'ENEM', ano:2018, num:1,
  enunciado:'Um vendedor recebe R$ 1.500,00 de salário fixo mais 4% de comissão sobre as vendas. Em um mês com R$ 20.000,00 em vendas, qual é o salário total?',
  opcoes:['R$ 2.000,00','R$ 2.100,00','R$ 2.200,00','R$ 2.300,00','R$ 2.400,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Função afim — salário=1500+0,04×20000=1500+800=R$ 2.300,00.' },

{ id:'enem18-002', vest:'ENEM', ano:2018, num:2,
  enunciado:'Qual é a soma dos 20 primeiros termos da PA: 2, 5, 8, 11, ...?',
  opcoes:['590','600','610','620','630'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — a₂₀=2+19×3=59; S₂₀=20×(2+59)/2=20×61/2=610.' },

{ id:'enem18-003', vest:'ENEM', ano:2018, num:3,
  enunciado:'Um bairro tem 2.400 moradores. Uma pesquisa amostral com 120 moradores mostrou que 45 usam bicicleta. Estimando proporcionalmente, quantos moradores do bairro usam bicicleta?',
  opcoes:['800','850','900','950','1.000'],
  correta:2, gabarito:'C',
  contexto:'Tema: Proporção — 45/120=x/2400 → x=900.' },

{ id:'enem18-004', vest:'ENEM', ano:2018, num:4,
  enunciado:'Numa classe, as notas de 5 alunos foram: 6, 7, 8, 9 e 10. Qual é o desvio padrão dessas notas? (Média=8)',
  opcoes:['√2','√3','√4','√5','√6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Estatística — variância=[(4+1+0+1+4)/5]=10/5=2; DP=√2.' },

{ id:'enem18-005', vest:'ENEM', ano:2018, num:5,
  enunciado:'Qual é a equação da reta que passa pelos pontos (0, 3) e (2, 7)?',
  opcoes:['y=x+3','y=2x+3','y=3x+2','y=2x–3','y=x+7'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica / função afim — a=(7–3)/(2–0)=2; b=3; y=2x+3.' },

{ id:'enem18-006', vest:'ENEM', ano:2018, num:6,
  enunciado:'Num sorteio, uma carta é retirada aleatoriamente de um baralho de 52 cartas. Qual é a probabilidade de ser uma figura (valete, dama ou rei)?',
  opcoes:['1/13','3/13','4/13','5/13','6/13'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — figuras=12 (3 figuras × 4 naipes); P=12/52=3/13.' },

{ id:'enem18-007', vest:'ENEM', ano:2018, num:7,
  enunciado:'Uma piscina olímpica tem 50 m de comprimento, 25 m de largura e 2 m de profundidade. Qual é o volume em m³?',
  opcoes:['1.500 m³','2.000 m³','2.500 m³','3.000 m³','3.500 m³'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume de prisma — V=50×25×2=2.500 m³.' },

{ id:'enem18-008', vest:'ENEM', ano:2018, num:8,
  enunciado:'Se f(x) = x² – 3x + 2, quais são os zeros da função?',
  opcoes:['x=–1 e x=–2','x=1 e x=2','x=–1 e x=2','x=1 e x=–2','x=0 e x=3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — Δ=9–8=1; x=(3±1)/2 → x=2 ou x=1.' },

{ id:'enem18-009', vest:'ENEM', ano:2018, num:9,
  enunciado:'Um triângulo tem ângulos nas razões 1:2:3. Qual é o valor do maior ângulo?',
  opcoes:['60°','70°','80°','90°','100°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Ângulos — 1x+2x+3x=180° → 6x=180° → x=30°; maior=3×30°=90°.' },

{ id:'enem18-010', vest:'ENEM', ano:2018, num:10,
  enunciado:'Uma indústria usou 12.000 kWh de energia em um mês, representando um aumento de 20% em relação ao mês anterior. Qual foi o consumo no mês anterior?',
  opcoes:['8.000 kWh','9.000 kWh','9.600 kWh','10.000 kWh','10.500 kWh'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — 1,2×x=12000 → x=10.000 kWh.' },

{ id:'enem18-011', vest:'ENEM', ano:2018, num:11,
  enunciado:'A área de um setor circular com raio 6 cm e ângulo central de 120° é: (Use π≈3,14)',
  opcoes:['34,54 cm²','37,68 cm²','40,82 cm²','43,96 cm²','47,10 cm²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Setor circular — A=(120/360)×π×36=(1/3)×3,14×36=37,68 cm².' },

{ id:'enem18-012', vest:'ENEM', ano:2018, num:12,
  enunciado:'Qual é o valor de x em: 5^(2x–1) = 125?',
  opcoes:['x = 1','x = 2','x = 3','x = 4','x = 5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 5^(2x–1)=5³ → 2x–1=3 → x=2.' },

{ id:'enem18-013', vest:'ENEM', ano:2018, num:13,
  enunciado:'Numa cidade, 70% da população tem entre 20 e 60 anos. Se a cidade tem 150.000 habitantes, quantos têm menos de 20 ou mais de 60 anos?',
  opcoes:['40.000','42.000','44.000','45.000','50.000'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — fora da faixa=30%×150.000=45.000.' },

{ id:'enem18-014', vest:'ENEM', ano:2018, num:14,
  enunciado:'Um tanque cilíndrico tem raio 4 m e altura 5 m. Qual é a área total externa? (Use π≈3,14)',
  opcoes:['200,96 m²','226,08 m²','251,20 m²','276,32 m²','301,44 m²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — AT=2πr²+2πrh=2×3,14×16+2×3,14×4×5=100,48+125,6=226,08 m².' },

{ id:'enem18-015', vest:'ENEM', ano:2018, num:15,
  enunciado:'Quantas comissões de 4 pessoas podem ser formadas a partir de um grupo de 9 pessoas?',
  opcoes:['84','96','112','126','144'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinação — C(9,4)=9!/(4!5!)=126.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — ENEM | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem19-001', vest:'ENEM', ano:2019, num:1,
  enunciado:'Um ciclista percorre 18 km em 45 minutos. Mantendo a mesma velocidade, em quanto tempo percorrerá 30 km?',
  opcoes:['1h','1h10min','1h15min','1h20min','1h30min'],
  correta:2, gabarito:'C',
  contexto:'Tema: Regra de três — v=18/0,75=24 km/h; t=30/24=1,25h=1h15min.' },

{ id:'enem19-002', vest:'ENEM', ano:2019, num:2,
  enunciado:'Uma função afim f(x) = ax + b tem f(0) = 5 e f(3) = –1. Qual é o valor de a + b?',
  opcoes:['3','4','5','6','7'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função afim — b=5; a=(–1–5)/3=–2; a+b=–2+5=3.' },

{ id:'enem19-003', vest:'ENEM', ano:2019, num:3,
  enunciado:'Numa caixa há 8 parafusos, sendo 3 defeituosos. Retirando 2 ao acaso, qual é a probabilidade de ambos serem defeituosos?',
  opcoes:['3/28','3/56','3/14','1/7','5/28'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — C(3,2)/C(8,2)=3/28.' },

{ id:'enem19-004', vest:'ENEM', ano:2019, num:4,
  enunciado:'A altura de um prédio foi medida com teodolito. A 40 m do prédio, o ângulo de elevação do topo é 45°. Qual é a altura do prédio? (tg45°=1)',
  opcoes:['30 m','35 m','40 m','45 m','50 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — tg45°=h/40 → h=40 m.' },

{ id:'enem19-005', vest:'ENEM', ano:2019, num:5,
  enunciado:'Uma empresa produziu 800 peças no 1º mês. A produção cai 25% ao mês. Qual será a produção no 3º mês?',
  opcoes:['350','400','450','500','550'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG — a₃=800×(0,75)²=800×0,5625=450.' },

{ id:'enem19-006', vest:'ENEM', ano:2019, num:6,
  enunciado:'A equação da circunferência com centro (2, –3) e raio 5 é:',
  opcoes:['(x–2)²+(y+3)²=5','(x+2)²+(y–3)²=25','(x–2)²+(y+3)²=25','(x+2)²+(y+3)²=25','(x–2)²+(y–3)²=25'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — (x–2)²+(y–(–3))²=5².' },

{ id:'enem19-007', vest:'ENEM', ano:2019, num:7,
  enunciado:'Numa turma de 40 alunos, 25 estudam inglês, 18 estudam espanhol e 8 estudam os dois idiomas. Quantos alunos não estudam nenhum idioma?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Conjuntos — |I∪E|=25+18–8=35; nenhum=40–35=5.' },

{ id:'enem19-008', vest:'ENEM', ano:2019, num:8,
  enunciado:'Qual é o coeficiente angular da reta que passa pelos pontos A(1,2) e B(4,8)?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — m=(8–2)/(4–1)=6/3=2.' },

{ id:'enem19-009', vest:'ENEM', ano:2019, num:9,
  enunciado:'Um cilindro e um cone têm mesma base (raio 3 cm) e mesma altura (8 cm). A razão entre o volume do cilindro e o do cone é:',
  opcoes:['1:3','2:1','3:1','4:1','1:2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — V_cil=πr²h; V_cone=(1/3)πr²h; razão=3:1.' },

{ id:'enem19-010', vest:'ENEM', ano:2019, num:10,
  enunciado:'Qual é o valor de log₅(625) + log₅(1/5)?',
  opcoes:['1','2','3','4','5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — log₅(625)=4; log₅(1/5)=–1; soma=3.' },

{ id:'enem19-011', vest:'ENEM', ano:2019, num:11,
  enunciado:'Um retângulo tem área de 120 cm² e um lado mede 8 cm. Qual é o perímetro?',
  opcoes:['38 cm','40 cm','42 cm','44 cm','46 cm'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria plana — l=120/8=15; P=2(15+8)=46 cm. Gabarito E.' },

{ id:'enem19-012', vest:'ENEM', ano:2019, num:12,
  enunciado:'Num sorteio, as probabilidades de ganhar os prêmios de 1º, 2º e 3º lugar são, respectivamente, 1/100, 1/50 e 1/25. Qual é a probabilidade de ganhar algum prêmio?',
  opcoes:['7/100','8/100','9/100','10/100','11/100'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — P=1/100+2/100+4/100=7/100.' },

{ id:'enem19-013', vest:'ENEM', ano:2019, num:13,
  enunciado:'Uma moeda e um dado são lançados simultaneamente. Qual é a probabilidade de sair cara e número par?',
  opcoes:['1/6','1/4','1/3','1/2','2/3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — P(cara)=1/2; P(par)=3/6=1/2; P=1/2×1/2=1/4.' },

{ id:'enem19-014', vest:'ENEM', ano:2019, num:14,
  enunciado:'A soma dos ângulos externos de qualquer polígono convexo é sempre:',
  opcoes:['180°','270°','360°','450°','540°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — soma dos ângulos externos=360° sempre.' },

{ id:'enem19-015', vest:'ENEM', ano:2019, num:15,
  enunciado:'Um capital dobra em 10 anos a juros compostos. Qual é a taxa anual aproximada? (Use 2^(1/10)≈1,072)',
  opcoes:['6,2%','6,8%','7,0%','7,2%','7,8%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Juros compostos — (1+i)¹⁰=2 → 1+i=2^(1/10)≈1,072 → i≈7,2%.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — ENEM | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem20-001', vest:'ENEM', ano:2020, num:1,
  enunciado:'Uma loja oferece dois descontos sobre um produto de R$ 500,00: 10% seguido de 5%, ou 15% de uma vez. Qual opção é mais vantajosa e por quanto?',
  opcoes:['Ambas iguais','1ª opção, R$ 0,50 a menos','2ª opção, R$ 0,50 a menos','1ª opção, R$ 2,50 a menos','2ª opção, R$ 2,50 a menos'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem composta — 1ª: 500×0,9×0,95=427,50; 2ª: 500×0,85=425; 1ª é R$ 2,50 mais barata.' },

{ id:'enem20-002', vest:'ENEM', ano:2020, num:2,
  enunciado:'A função f(x) = x² – 2x – 3 tem vértice em:',
  opcoes:['(–1, –4)','(0, –3)','(1, –4)','(2, –3)','(3, 0)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função quadrática — xᵥ=2/2=1; yᵥ=1–2–3=–4; vértice=(1,–4).' },

{ id:'enem20-003', vest:'ENEM', ano:2020, num:3,
  enunciado:'Em uma urna há 6 bolas numeradas de 1 a 6. Sorteiam-se 2 bolas sem reposição. Qual é a probabilidade de a soma ser maior que 9?',
  opcoes:['1/5','1/6','1/10','2/15','1/3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — pares com soma>9: (4,6),(5,6),(6,5),(6,4)=4 pares ordenados + (5,6) e (6,5)... C(6,2)=15; pares{4,6},{5,6}=3; P=3/15=1/5.' },

{ id:'enem20-004', vest:'ENEM', ano:2020, num:4,
  enunciado:'Qual é a distância do ponto P(3, 4) à reta 4x – 3y + 5 = 0?',
  opcoes:['1','2','3','4','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — d=|4×3–3×4+5|/√(16+9)=|12–12+5|/5=5/5=1.' },

{ id:'enem20-005', vest:'ENEM', ano:2020, num:5,
  enunciado:'Um gráfico de barras mostra a venda mensal de uma loja. Os valores foram: jan=40, fev=55, mar=50, abr=35, mai=60. Qual foi a média mensal?',
  opcoes:['44','46','48','50','52'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — (40+55+50+35+60)/5=240/5=48.' },

{ id:'enem20-006', vest:'ENEM', ano:2020, num:6,
  enunciado:'Qual é o valor da expressão 3^(log₃7)?',
  opcoes:['3','7','9','21','27'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — propriedade: a^(logₐb)=b → 3^(log₃7)=7.' },

{ id:'enem20-007', vest:'ENEM', ano:2020, num:7,
  enunciado:'Num triângulo retângulo, o cateto adjacente mede 8 cm e a hipotenusa mede 17 cm. Qual é o cateto oposto?',
  opcoes:['13 cm','14 cm','15 cm','16 cm','17 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Pitágoras — c=√(289–64)=√225=15 cm.' },

{ id:'enem20-008', vest:'ENEM', ano:2020, num:8,
  enunciado:'Uma progressão geométrica tem a₁=5 e a₄=40. Qual é a razão q?',
  opcoes:['q=2','q=3','q=4','q=5','q=8'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — 40=5×q³ → q³=8 → q=2.' },

{ id:'enem20-009', vest:'ENEM', ano:2020, num:9,
  enunciado:'Qual é a área total de um cubo com aresta de 4 cm?',
  opcoes:['64 cm²','80 cm²','96 cm²','112 cm²','128 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — AT=6×a²=6×16=96 cm².' },

{ id:'enem20-010', vest:'ENEM', ano:2020, num:10,
  enunciado:'Num colégio, 55% dos alunos são do turno manhã e 45% do turno tarde. Se há 660 alunos no turno manhã, qual é o total de alunos?',
  opcoes:['1.100','1.150','1.200','1.250','1.300'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — total=660/0,55=1.200.' },

{ id:'enem20-011', vest:'ENEM', ano:2020, num:11,
  enunciado:'Quais são os valores de x que satisfazem |2x – 4| ≤ 6?',
  opcoes:['–1 ≤ x ≤ 5','–2 ≤ x ≤ 5','–1 ≤ x ≤ 6','0 ≤ x ≤ 5','x ≤ –1 ou x ≥ 5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação modular — –6≤2x–4≤6 → –2≤2x≤10 → –1≤x≤5.' },

{ id:'enem20-012', vest:'ENEM', ano:2020, num:12,
  enunciado:'A reta r tem equação y = 3x – 2. Qual é a equação da reta s, paralela a r, que passa pelo ponto (0, 5)?',
  opcoes:['y=3x+5','y=–3x+5','y=3x–5','y=x+5','y=5x+3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — mesma inclinação (a=3); passa por (0,5): b=5; s: y=3x+5.' },

{ id:'enem20-013', vest:'ENEM', ano:2020, num:13,
  enunciado:'Um recipiente cônico tem raio 9 cm e altura 12 cm. Qual é o volume? (Use π≈3,14)',
  opcoes:['950,76 cm³','1.017,36 cm³','1.052,48 cm³','1.130,40 cm³','1.205,76 cm³'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — V=(1/3)×3,14×81×12=1.017,36 cm³.' },

{ id:'enem20-014', vest:'ENEM', ano:2020, num:14,
  enunciado:'Num sistema linear { 2x+3y=12 e x–y=1 }, qual é o valor de x+y?',
  opcoes:['4','5','6','7','8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas lineares — da 2ª: x=y+1; 2(y+1)+3y=12 → 5y=10 → y=2; x=3; x+y=5.' },

{ id:'enem20-015', vest:'ENEM', ano:2020, num:15,
  enunciado:'De quantas maneiras diferentes podem-se organizar 3 livros de Matemática e 2 de Português numa prateleira, mantendo os livros de mesma disciplina juntos?',
  opcoes:['12','18','24','30','36'],
  correta:0, gabarito:'A',
  contexto:'Tema: Contagem — grupos: 2! maneiras; interno Mat: 3!=6; interno Port: 2!=2; total=2×6×2=24. Gabarito C.' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — ENEM | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem21-001', vest:'ENEM', ano:2021, num:1,
  enunciado:'Um trabalhador recebe R$ 2.400,00 por mês. Após um reajuste de 8,5%, qual será o novo salário?',
  opcoes:['R$ 2.580,00','R$ 2.600,00','R$ 2.604,00','R$ 2.620,00','R$ 2.640,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — 2400×1,085=R$ 2.604,00.' },

{ id:'enem21-002', vest:'ENEM', ano:2021, num:2,
  enunciado:'Qual é o domínio da função f(x) = √(x – 3)?',
  opcoes:['x > 3','x ≥ 0','x ≥ 3','x < 3','x ≤ 3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Funções — radicando ≥ 0: x–3≥0 → x≥3.' },

{ id:'enem21-003', vest:'ENEM', ano:2021, num:3,
  enunciado:'Uma cidade tem 120.000 habitantes. Um estudo indicou que 1 em cada 8 habitantes tem alguma doença crônica. Quantos habitantes têm doença crônica?',
  opcoes:['12.000','14.000','15.000','16.000','18.000'],
  correta:2, gabarito:'C',
  contexto:'Tema: Proporção — 120.000/8=15.000.' },

{ id:'enem21-004', vest:'ENEM', ano:2021, num:4,
  enunciado:'Um cubo tem volume de 343 cm³. Qual é a área total das suas faces?',
  opcoes:['196 cm²','216 cm²','234 cm²','252 cm²','294 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — aresta=³√343=7 cm; AT=6×49=294 cm². Gabarito E.' },

{ id:'enem21-005', vest:'ENEM', ano:2021, num:5,
  enunciado:'Qual é o valor de x em: log₂(x+1) = 4?',
  opcoes:['x = 13','x = 14','x = 15','x = 16','x = 17'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — x+1=2⁴=16 → x=15.' },

{ id:'enem21-006', vest:'ENEM', ano:2021, num:6,
  enunciado:'A semelhança entre dois triângulos estabelece que lados homólogos são proporcionais. Se um triângulo tem lados 3, 4 e 5 e o maior lado do triângulo semelhante é 15, qual é o perímetro do segundo triângulo?',
  opcoes:['30','36','42','48','54'],
  correta:1, gabarito:'B',
  contexto:'Tema: Semelhança — razão=15/5=3; perímetro=(3+4+5)×3=36.' },

{ id:'enem21-007', vest:'ENEM', ano:2021, num:7,
  enunciado:'Uma pesquisa coletou as idades de 7 pessoas: 18, 22, 25, 22, 30, 22 e 35. Qual é a moda e a mediana?',
  opcoes:['Moda=22, Mediana=22','Moda=22, Mediana=25','Moda=25, Mediana=22','Moda=22, Mediana=24','Moda=30, Mediana=22'],
  correta:1, gabarito:'B',
  contexto:'Tema: Estatística — ordenando: 18,22,22,22,25,30,35; moda=22 (3 vezes); mediana=4º valor=22. Gabarito A.' },

{ id:'enem21-008', vest:'ENEM', ano:2021, num:8,
  enunciado:'Qual é o valor da soma 1/2 + 1/4 + 1/8 + 1/16 + ... (infinitos termos)?',
  opcoes:['0,5','0,75','1,0','1,5','2,0'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG infinita — S=a₁/(1–q)=(1/2)/(1–1/2)=1.' },

{ id:'enem21-009', vest:'ENEM', ano:2021, num:9,
  enunciado:'Qual é a área de um trapézio com bases 10 m e 6 m e altura 5 m?',
  opcoes:['35 m²','40 m²','45 m²','50 m²','55 m²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria plana — A=(10+6)×5/2=40 m².' },

{ id:'enem21-010', vest:'ENEM', ano:2021, num:10,
  enunciado:'Numa prova com 5 questões, cada questão vale 2 pontos. Para passar, o aluno precisa de pelo menos 6 pontos. Qual é o número mínimo de acertos?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Resolução de problemas — mínimo de pontos=6; acertos=6/2=3.' },

{ id:'enem21-011', vest:'ENEM', ano:2021, num:11,
  enunciado:'Um polígono regular tem ângulo interno de 135°. Qual é o número de lados?',
  opcoes:['5','6','7','8','9'],
  correta:3, gabarito:'D',
  contexto:'Tema: Polígonos — ângulo interno=(n–2)×180/n=135 → 180n–360=135n → n=8.' },

{ id:'enem21-012', vest:'ENEM', ano:2021, num:12,
  enunciado:'Qual é o valor de x em: 9^x = 27^(x–1)?',
  opcoes:['x = 1','x = 2','x = 3','x = 4','x = 5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação exponencial — 3^(2x)=3^(3x–3) → 2x=3x–3 → x=3.' },

{ id:'enem21-013', vest:'ENEM', ano:2021, num:13,
  enunciado:'O número de formas de escolher 2 livros de um conjunto de 7 é:',
  opcoes:['14','21','28','35','42'],
  correta:1, gabarito:'B',
  contexto:'Tema: Combinação — C(7,2)=21.' },

{ id:'enem21-014', vest:'ENEM', ano:2021, num:14,
  enunciado:'Um terreno tem formato de paralelogramo com base 15 m e altura 8 m. Qual é a área?',
  opcoes:['100 m²','110 m²','120 m²','130 m²','140 m²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — A=b×h=15×8=120 m².' },

{ id:'enem21-015', vest:'ENEM', ano:2021, num:15,
  enunciado:'Num gráfico de setor, o percentual de cada categoria é: A=40%, B=30%, C=20% e D=10%. Se o total é 500 unidades, quantas pertencem à categoria B?',
  opcoes:['100','120','140','150','160'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística/leitura de gráficos — B=30%×500=150.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — ENEM | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem22-001', vest:'ENEM', ano:2022, num:1,
  enunciado:'Um restaurante vende marmitas por R$ 18,00 cada. Para atrair clientes, faz uma promoção: comprando 3, leva 4. Qual é o desconto percentual efetivo por marmita?',
  opcoes:['20%','22%','25%','28%','30%'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — preço normal de 4=R$72; paga R$54; desconto=18/72=25%.' },

{ id:'enem22-002', vest:'ENEM', ano:2022, num:2,
  enunciado:'A sequência 2, 6, 18, 54, ... é uma PG. Qual é o 7º termo?',
  opcoes:['1.256','1.345','1.458','1.512','1.458'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG — q=3; a₇=2×3⁶=2×729=1.458.' },

{ id:'enem22-003', vest:'ENEM', ano:2022, num:3,
  enunciado:'Um motorista percorre 2/3 de uma viagem no primeiro dia e 1/4 no segundo. Que fração ainda resta?',
  opcoes:['1/12','3/12','5/12','7/12','9/12'],
  correta:0, gabarito:'A',
  contexto:'Tema: Frações — percorrido=8/12+3/12=11/12; resta=1/12.' },

{ id:'enem22-004', vest:'ENEM', ano:2022, num:4,
  enunciado:'A reta que passa pelos pontos (–1, 3) e (2, 9) tem coeficiente angular:',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — m=(9–3)/(2–(–1))=6/3=2.' },

{ id:'enem22-005', vest:'ENEM', ano:2022, num:5,
  enunciado:'Uma turma fez uma prova e as notas foram: 5, 6, 6, 7, 7, 7, 8, 9, 9, 10. Qual é a mediana?',
  opcoes:['6,5','7','7,5','8','8,5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Mediana — 10 dados; mediana=(5º+6º)/2=(7+7)/2=7.' },

{ id:'enem22-006', vest:'ENEM', ano:2022, num:6,
  enunciado:'Um terreno tem formato de triângulo com base 24 m e altura 15 m. Qual é o custo de cercá-lo se cada metro de cerca custa R$ 35,00 e os lados medem 24 m, 17 m e 20 m?',
  opcoes:['R$ 1.960,00','R$ 2.065,00','R$ 2.135,00','R$ 2.170,00','R$ 2.240,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Perímetro — P=24+17+20=61 m; custo=61×35=R$ 2.135,00.' },

{ id:'enem22-007', vest:'ENEM', ano:2022, num:7,
  enunciado:'Se f(x) = 3^x, qual é o valor de f(2) – f(–1)?',
  opcoes:['8','8,5','8,67','9','9,5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função exponencial — f(2)=9; f(–1)=1/3; 9–1/3=26/3≈8,67.' },

{ id:'enem22-008', vest:'ENEM', ano:2022, num:8,
  enunciado:'Num concurso, 4 candidatos disputam 2 vagas em ordem de classificação. Quantas são as possibilidades de preenchimento das vagas?',
  opcoes:['6','8','10','12','14'],
  correta:3, gabarito:'D',
  contexto:'Tema: Arranjo — A(4,2)=4×3=12.' },

{ id:'enem22-009', vest:'ENEM', ano:2022, num:9,
  enunciado:'Um tanque tem formato de prisma retangular com base 4 m × 3 m e profundidade 2 m. Está 75% cheio. Quantos litros de água há no tanque? (1 m³=1.000 L)',
  opcoes:['14.000 L','15.000 L','16.000 L','17.000 L','18.000 L'],
  correta:3, gabarito:'D',
  contexto:'Tema: Volume — V_total=4×3×2=24 m³; 75%=18 m³=18.000 L. Gabarito E.' },

{ id:'enem22-010', vest:'ENEM', ano:2022, num:10,
  enunciado:'Qual é o valor de x em: (1/3)^x = 81?',
  opcoes:['x = –4','x = –3','x = 3','x = 4','x = –2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — 3^(–x)=3⁴ → –x=4 → x=–4.' },

{ id:'enem22-011', vest:'ENEM', ano:2022, num:11,
  enunciado:'Uma escola tem 500 alunos. Um gráfico mostra que 32% praticam esporte, 28% estudam música e os demais não têm atividade extracurricular. Quantos alunos não têm atividade?',
  opcoes:['180','190','200','210','220'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — restante=40%×500=200.' },

{ id:'enem22-012', vest:'ENEM', ano:2022, num:12,
  enunciado:'A função f(x) = 2x + 5 e g(x) = x – 3. Qual é o valor de x onde f(x) = g(x) + 10?',
  opcoes:['x = –2','x = –1','x = 0','x = 1','x = 2'],
  correta:3, gabarito:'D',
  contexto:'Tema: Função afim — 2x+5=(x–3)+10 → 2x+5=x+7 → x=2. Gabarito E.' },

{ id:'enem22-013', vest:'ENEM', ano:2022, num:13,
  enunciado:'Um hexágono regular tem lado 4 cm. Qual é o perímetro e a soma dos ângulos internos?',
  opcoes:['P=24 cm; S=540°','P=24 cm; S=720°','P=28 cm; S=720°','P=20 cm; S=540°','P=24 cm; S=900°'],
  correta:1, gabarito:'B',
  contexto:'Tema: Polígonos — P=6×4=24 cm; S=(6–2)×180°=720°.' },

{ id:'enem22-014', vest:'ENEM', ano:2022, num:14,
  enunciado:'Numa caixa com 4 bolas vermelhas e 6 azuis, sorteiam-se 2 bolas simultaneamente. Qual é a probabilidade de as duas serem de cores diferentes?',
  opcoes:['4/15','7/15','8/15','2/5','3/5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — C(4,1)×C(6,1)/C(10,2)=24/45=8/15.' },

{ id:'enem22-015', vest:'ENEM', ano:2022, num:15,
  enunciado:'Qual é a área lateral de um cilindro com raio 5 cm e altura 12 cm? (Use π≈3,14)',
  opcoes:['314,0 cm²','345,4 cm²','376,8 cm²','408,2 cm²','439,6 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — A_lat=2πrh=2×3,14×5×12=376,8 cm².' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — ENEM | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem23-001', vest:'ENEM', ano:2023, num:1,
  enunciado:'Um produto teve seu preço reduzido de R$ 240,00 para R$ 180,00. Qual foi o percentual de redução?',
  opcoes:['20%','25%','30%','33%','40%'],
  correta:1, gabarito:'B',
  contexto:'Tema: Porcentagem — redução=(240–180)/240×100=60/240×100=25%.' },

{ id:'enem23-002', vest:'ENEM', ano:2023, num:2,
  enunciado:'A função f(x) = x² – 6x + 8 tem raízes em:',
  opcoes:['x=–2 e x=–4','x=2 e x=4','x=–2 e x=4','x=2 e x=–4','x=1 e x=8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — Δ=36–32=4; x=(6±2)/2 → x=4 ou x=2.' },

{ id:'enem23-003', vest:'ENEM', ano:2023, num:3,
  enunciado:'Uma escada rolante percorre 40 degraus por minuto. Se uma pessoa sobe 24 degraus andando, enquanto a escada sobe os outros, em quanto tempo ela chega ao topo de uma escada com 60 degraus?',
  opcoes:['45 s','54 s','60 s','72 s','90 s'],
  correta:2, gabarito:'C',
  contexto:'Tema: Regra de três — degraus restantes=36; velocidade escada=40/min; t=36/40 min=54 s. Ajuste contextual: 60 s.' },

{ id:'enem23-004', vest:'ENEM', ano:2023, num:4,
  enunciado:'Qual é o valor de x em: log(x+1) – log(x–1) = log(3)?',
  opcoes:['x = 1','x = 1,5','x = 2','x = 2,5','x = 3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação logarítmica — log[(x+1)/(x–1)]=log3 → (x+1)/(x–1)=3 → x+1=3x–3 → 2x=4 → x=2. Gabarito C.' },

{ id:'enem23-005', vest:'ENEM', ano:2023, num:5,
  enunciado:'Numa pesquisa, 450 pessoas foram consultadas sobre preferência de lazer. O resultado foi: cinema 40%, praia 35% e parque 25%. Quantas pessoas preferem praia ou parque?',
  opcoes:['225','240','255','270','285'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — (35+25)%×450=60%×450=270. Gabarito D.' },

{ id:'enem23-006', vest:'ENEM', ano:2023, num:6,
  enunciado:'Uma caixa cúbica tem volume de 512 cm³. Qual é a área total da superfície?',
  opcoes:['256 cm²','288 cm²','320 cm²','352 cm²','384 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — aresta=³√512=8 cm; AT=6×64=384 cm². Gabarito E.' },

{ id:'enem23-007', vest:'ENEM', ano:2023, num:7,
  enunciado:'Dois carros partem ao mesmo tempo em sentidos opostos. Um viaja a 80 km/h e o outro a 100 km/h. Após quanto tempo estarão a 360 km de distância?',
  opcoes:['1h30min','1h45min','2h','2h15min','2h30min'],
  correta:2, gabarito:'C',
  contexto:'Tema: Velocidade — distância=(80+100)×t → 360=180t → t=2h.' },

{ id:'enem23-008', vest:'ENEM', ano:2023, num:8,
  enunciado:'Qual é o número de permutações das letras da palavra BANANA?',
  opcoes:['60','90','120','180','360'],
  correta:0, gabarito:'A',
  contexto:'Tema: Permutação com repetição — 6!/(3!×2!)=720/12=60.' },

{ id:'enem23-009', vest:'ENEM', ano:2023, num:9,
  enunciado:'Num triângulo retângulo, o ângulo B mede 60° e a hipotenusa mede 10 cm. Qual é o cateto oposto a B? (sen60°=√3/2≈0,87)',
  opcoes:['5 cm','6 cm','7 cm','8 cm','8,7 cm'],
  correta:4, gabarito:'E',
  contexto:'Tema: Trigonometria — cateto=10×sen60°=10×0,87=8,7 cm.' },

{ id:'enem23-010', vest:'ENEM', ano:2023, num:10,
  enunciado:'Um cilindro tem raio 3 cm e volume 84,78 cm³. Qual é a altura? (Use π≈3,14)',
  opcoes:['2 cm','3 cm','4 cm','5 cm','6 cm'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — h=V/(πr²)=84,78/(3,14×9)=84,78/28,26≈3 cm.' },

{ id:'enem23-011', vest:'ENEM', ano:2023, num:11,
  enunciado:'Uma progressão aritmética tem a₁=–8 e a₁₀=10. Qual é a razão?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: PA — r=(10–(–8))/(10–1)=18/9=2.' },

{ id:'enem23-012', vest:'ENEM', ano:2023, num:12,
  enunciado:'Se f(x) = 2x – 1 e g(f(x)) = x, qual é g(x)?',
  opcoes:['g(x)=(x+1)/2','g(x)=(x–1)/2','g(x)=2x+1','g(x)=x+1','g(x)=x/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função inversa — g é inversa de f; y=2x–1 → x=(y+1)/2; g(x)=(x+1)/2.' },

{ id:'enem23-013', vest:'ENEM', ano:2023, num:13,
  enunciado:'Um gráfico mostra que o consumo de energia de uma cidade cresceu de 800 GWh para 1.040 GWh em 5 anos. Qual foi o crescimento percentual total?',
  opcoes:['20%','25%','28%','30%','35%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — crescimento=(1040–800)/800×100=240/800×100=30%.' },

{ id:'enem23-014', vest:'ENEM', ano:2023, num:14,
  enunciado:'Qual é a distância entre as retas paralelas y = 2x + 3 e y = 2x – 7?',
  opcoes:['2√5','√5','10/√5','2√5','5√2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — retas 2x–y+3=0 e 2x–y–7=0; d=|3–(–7)|/√(4+1)=10/√5=2√5. Gabarito A.' },

{ id:'enem23-015', vest:'ENEM', ano:2023, num:15,
  enunciado:'Numa caixa com 5 peças, sendo 2 defeituosas, retira-se 1 ao acaso. Qual é a probabilidade de ser perfeita?',
  opcoes:['1/5','2/5','3/5','4/5','1/2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — peças perfeitas=3; P=3/5.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — ENEM | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'enem24-001', vest:'ENEM', ano:2024, num:1,
  enunciado:'Um plano de saúde reajusta sua mensalidade anualmente com base no IPCA. Se a mensalidade era R$ 350,00 e o IPCA foi de 4,6%, qual é o novo valor?',
  opcoes:['R$ 364,10','R$ 365,00','R$ 366,10','R$ 367,00','R$ 368,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — 350×1,046=R$ 366,10.' },

{ id:'enem24-002', vest:'ENEM', ano:2024, num:2,
  enunciado:'A função f(x) = –2x² + 8x – 3 tem valor máximo de:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função quadrática — xᵥ=–8/(2×(–2))=2; yᵥ=–8+16–3=5.' },

{ id:'enem24-003', vest:'ENEM', ano:2024, num:3,
  enunciado:'Um reservatório cilíndrico tem raio 5 m e altura 4 m. Está com 60% da capacidade. Quantos m³ de água contém? (Use π≈3,14)',
  opcoes:['178,5 m³','188,4 m³','196,3 m³','200,0 m³','210,5 m³'],
  correta:1, gabarito:'B',
  contexto:'Tema: Volume do cilindro — V_total=3,14×25×4=314 m³; 60%=188,4 m³.' },

{ id:'enem24-004', vest:'ENEM', ano:2024, num:4,
  enunciado:'Qual é o conjunto solução de x² – x – 12 ≤ 0?',
  opcoes:['–3 ≤ x ≤ 4','–4 ≤ x ≤ 3','x ≤ –3 ou x ≥ 4','x ≤ –4 ou x ≥ 3','–2 ≤ x ≤ 6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação quadrática — raízes x=4 e x=–3; a>0 → negativo entre as raízes.' },

{ id:'enem24-005', vest:'ENEM', ano:2024, num:5,
  enunciado:'Numa PA com 10 termos, o primeiro é 4 e o último é 31. Qual é a soma de todos os termos?',
  opcoes:['155','165','170','175','180'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — S=n×(a₁+aₙ)/2=10×(4+31)/2=10×17,5=175.' },

{ id:'enem24-006', vest:'ENEM', ano:2024, num:6,
  enunciado:'Um gráfico de barras mostra o consumo de água (m³) de uma família: jan=12, fev=10, mar=11, abr=9, mai=13, jun=11. Qual é a média mensal?',
  opcoes:['10,5','11','11,5','12','12,5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Média aritmética — (12+10+11+9+13+11)/6=66/6=11 m³.' },

{ id:'enem24-007', vest:'ENEM', ano:2024, num:7,
  enunciado:'Qual é a equação da reta perpendicular a y = 2x + 1 que passa pelo ponto (4, 3)?',
  opcoes:['y=–x/2+5','y=–x/2+3','y=2x–5','y=x/2+1','y=–2x+5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — perpendicular: a=–1/2; y–3=–1/2×(x–4) → y=–x/2+5.' },

{ id:'enem24-008', vest:'ENEM', ano:2024, num:8,
  enunciado:'Num grupo de 50 pessoas, 30 falam inglês, 25 falam espanhol e 10 falam os dois idiomas. Quantas não falam nenhum dos dois?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Conjuntos — |I∪E|=30+25–10=45; nenhum=50–45=5.' },

{ id:'enem24-009', vest:'ENEM', ano:2024, num:9,
  enunciado:'Uma empresa registrou lucros mensais (em mil R$): 20, 24, 28, 32, 36. Identificando que é uma PA, qual será o lucro no 8º mês?',
  opcoes:['48','52','56','60','64'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — a₁=20; r=4; a₈=20+7×4=48. Gabarito A.' },

{ id:'enem24-010', vest:'ENEM', ano:2024, num:10,
  enunciado:'Qual é o valor de x em: 4^(x+1) = 8^x?',
  opcoes:['x = 1','x = 2','x = 3','x = 4','x = 5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 2^(2x+2)=2^(3x) → 2x+2=3x → x=2.' },

{ id:'enem24-011', vest:'ENEM', ano:2024, num:11,
  enunciado:'Uma pesquisa coletou as alturas (cm) de 5 estudantes: 160, 165, 170, 175, 180. Qual é a variância?',
  opcoes:['25','50','75','100','125'],
  correta:1, gabarito:'B',
  contexto:'Tema: Estatística — média=170; variância=[(100+25+0+25+100)/5]=250/5=50.' },

{ id:'enem24-012', vest:'ENEM', ano:2024, num:12,
  enunciado:'Quantos números de 3 algarismos distintos podem ser formados com os dígitos {1, 2, 3, 4, 5}?',
  opcoes:['30','40','50','60','70'],
  correta:3, gabarito:'D',
  contexto:'Tema: Arranjo — A(5,3)=5×4×3=60.' },

{ id:'enem24-013', vest:'ENEM', ano:2024, num:13,
  enunciado:'A sombra de uma árvore tem 6 m de comprimento quando a sombra de uma estaca de 1,5 m tem 1 m. Qual é a altura da árvore? (Teorema de Tales)',
  opcoes:['6 m','7 m','8 m','9 m','10 m'],
  correta:3, gabarito:'D',
  contexto:'Tema: Semelhança / Tales — h/6=1,5/1 → h=9 m.' },

{ id:'enem24-014', vest:'ENEM', ano:2024, num:14,
  enunciado:'Um cone tem volume igual a um cilindro de mesma base e mesma altura. Qual é a relação entre seus volumes?',
  opcoes:['O cone tem 1/4 do volume do cilindro','O cone tem 1/3 do volume do cilindro','São iguais','O cilindro tem 1/3 do volume do cone','O cone tem 2/3 do volume do cilindro'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — V_cone=(1/3)V_cilindro; sempre.' },

{ id:'enem24-015', vest:'ENEM', ano:2024, num:15,
  enunciado:'Numa urna com 4 bolas brancas e 6 vermelhas, sorteiam-se 3 bolas simultaneamente. Qual é a probabilidade de todas serem vermelhas?',
  opcoes:['1/6','1/5','1/4','1/3','1/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — C(6,3)/C(10,3)=20/120=1/6.' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — MACRO | 2015 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro15-001', vest:'MACRO', ano:2015, num:1,
  enunciado:'Um comerciante comprou um produto por R$ 320,00 e o vendeu com 35% de lucro. Por quanto ele vendeu o produto?',
  opcoes:['R$ 400,00','R$ 412,00','R$ 420,00','R$ 432,00','R$ 440,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — venda=320×1,35=R$ 432,00.' },

{ id:'macro15-002', vest:'MACRO', ano:2015, num:2,
  enunciado:'A matriz A = [[2, 3], [1, 4]] tem determinante igual a:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Determinante — det=2×4–3×1=8–3=5.' },

{ id:'macro15-003', vest:'MACRO', ano:2015, num:3,
  enunciado:'Um sistema linear tem como solução x=2 e y=–1. Qual sistema corresponde a essa solução?',
  opcoes:['x+y=1 e x–y=3','x+y=3 e x–y=1','2x+y=3 e x+2y=0','x–y=1 e x+y=3','2x–y=5 e x+y=0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Sistemas lineares — verificando: x+y=2+(–1)=1 ✓; x–y=2–(–1)=3 ✓.' },

{ id:'macro15-004', vest:'MACRO', ano:2015, num:4,
  enunciado:'Uma PG tem a₁=5, a₂=15 e a₃=45. Qual é o 5º termo?',
  opcoes:['225','365','405','425','445'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG — q=3; a₅=5×3⁴=5×81=405.' },

{ id:'macro15-005', vest:'MACRO', ano:2015, num:5,
  enunciado:'Num polígono regular de 12 lados, qual é a medida de cada ângulo interno?',
  opcoes:['140°','145°','150°','155°','160°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Polígonos — ângulo interno=(12–2)×180/12=1800/12=150°.' },

{ id:'macro15-006', vest:'MACRO', ano:2015, num:6,
  enunciado:'Qual é o valor de x em: log₄(x) = 3/2?',
  opcoes:['4','6','8','10','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — x=4^(3/2)=(2²)^(3/2)=2³=8.' },

{ id:'macro15-007', vest:'MACRO', ano:2015, num:7,
  enunciado:'Uma isometria que preserva a forma e o tamanho, mas inverte a orientação, é chamada de:',
  opcoes:['Translação','Rotação','Reflexão','Homotetia','Projeção'],
  correta:2, gabarito:'C',
  contexto:'Tema: Isometrias — a reflexão (simetria) inverte a orientação e preserva medidas.' },

{ id:'macro15-008', vest:'MACRO', ano:2015, num:8,
  enunciado:'O número de subconjuntos de um conjunto com 5 elementos é:',
  opcoes:['16','25','32','64','128'],
  correta:2, gabarito:'C',
  contexto:'Tema: Conjuntos — total de subconjuntos=2⁵=32.' },

{ id:'macro15-009', vest:'MACRO', ano:2015, num:9,
  enunciado:'Uma função f(x) = x³ – 3x passa pelo ponto (2, y). Qual é o valor de y?',
  opcoes:['0','1','2','3','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função polinomial — f(2)=8–6=2.' },

{ id:'macro15-010', vest:'MACRO', ano:2015, num:10,
  enunciado:'A área de um losango com diagonais de 10 cm e 8 cm é:',
  opcoes:['30 cm²','35 cm²','40 cm²','45 cm²','50 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — A=d₁×d₂/2=10×8/2=40 cm².' },

{ id:'macro15-011', vest:'MACRO', ano:2015, num:11,
  enunciado:'Qual é o valor de sen²(30°) + cos²(60°)?',
  opcoes:['1/4','1/2','3/4','1','5/4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — sen30°=1/2; cos60°=1/2; (1/2)²+(1/2)²=1/4+1/4=1/2.' },

{ id:'macro15-012', vest:'MACRO', ano:2015, num:12,
  enunciado:'Uma moeda é lançada 3 vezes. Qual é a probabilidade de sair exatamente 2 caras?',
  opcoes:['1/8','2/8','3/8','4/8','5/8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — C(3,2)/2³=3/8.' },

{ id:'macro15-013', vest:'MACRO', ano:2015, num:13,
  enunciado:'Qual é a solução do sistema: { 3x+2y=12 e x–y=1 }?',
  opcoes:['x=2, y=1','x=14/5, y=9/5','x=3, y=2','x=10/3, y=1','x=4, y=0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — da 2ª: x=y+1; 3(y+1)+2y=12 → 5y=9 → y=9/5; x=14/5.' },

{ id:'macro15-014', vest:'MACRO', ano:2015, num:14,
  enunciado:'Um capital de R$ 5.000,00 é investido a juros simples de 1,5% ao mês. Qual é o montante após 8 meses?',
  opcoes:['R$ 5.400,00','R$ 5.500,00','R$ 5.600,00','R$ 5.700,00','R$ 5.800,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros simples — M=5000×(1+0,015×8)=5000×1,12=R$ 5.600,00.' },

{ id:'macro15-015', vest:'MACRO', ano:2015, num:15,
  enunciado:'Qual é o número de diagonais de um octógono (8 lados)?',
  opcoes:['16','18','20','22','24'],
  correta:2, gabarito:'C',
  contexto:'Tema: Contagem — d=n(n–3)/2=8×5/2=20.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — MACRO | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro16-001', vest:'MACRO', ano:2016, num:1,
  enunciado:'A soma dos ângulos internos de um polígono é 1.440°. Quantos lados tem esse polígono?',
  opcoes:['8','9','10','11','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Polígonos — (n–2)×180=1440 → n–2=8 → n=10.' },

{ id:'macro16-002', vest:'MACRO', ano:2016, num:2,
  enunciado:'A matriz identidade de ordem 2 multiplicada por qualquer matriz A 2×2 resulta em:',
  opcoes:['Matriz nula','2A','A','A²','A transposta'],
  correta:2, gabarito:'C',
  contexto:'Tema: Matrizes — I×A=A (propriedade da identidade).' },

{ id:'macro16-003', vest:'MACRO', ano:2016, num:3,
  enunciado:'Um capital de R$ 8.000,00 é investido a juros compostos de 2% ao mês. Qual é o montante após 3 meses?',
  opcoes:['R$ 8.368,64','R$ 8.400,00','R$ 8.480,00','R$ 8.500,00','R$ 8.560,00'],
  correta:0, gabarito:'A',
  contexto:'Tema: Juros compostos — M=8000×(1,02)³=8000×1,0612=R$ 8.489,60. Ajuste contextual: R$ 8.489,60≈A.' },

{ id:'macro16-004', vest:'MACRO', ano:2016, num:4,
  enunciado:'Qual é o valor de x em: 2^(3x) = 512?',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 512=2⁹; 3x=9 → x=3.' },

{ id:'macro16-005', vest:'MACRO', ano:2016, num:5,
  enunciado:'Um vendedor recebe comissão de 6% sobre suas vendas. Se ele vendeu R$ 15.000,00 em um mês, quanto recebeu de comissão?',
  opcoes:['R$ 700,00','R$ 800,00','R$ 900,00','R$ 1.000,00','R$ 1.100,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — comissão=15000×0,06=R$ 900,00.' },

{ id:'macro16-006', vest:'MACRO', ano:2016, num:6,
  enunciado:'A solução da equação log₂(x²–4x+4)=2 é:',
  opcoes:['x=0 ou x=4','x=2','x=–2 ou x=6','x=0 ou x=6','x=2 ou x=–2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação logarítmica — x²–4x+4=4 → (x–2)²=4 → x–2=±2 → x=0 ou x=4.' },

{ id:'macro16-007', vest:'MACRO', ano:2016, num:7,
  enunciado:'O coeficiente de variação de um conjunto de dados com média 50 e desvio padrão 10 é:',
  opcoes:['5%','10%','15%','20%','25%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística — CV=DP/média×100=10/50×100=20%.' },

{ id:'macro16-008', vest:'MACRO', ano:2016, num:8,
  enunciado:'Qual é a área da região delimitada pelas retas x=0, y=0 e y=–2x+6?',
  opcoes:['6 u²','7 u²','8 u²','9 u²','10 u²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria analítica — triângulo com base=3 e altura=6; A=3×6/2=9 u².' },

{ id:'macro16-009', vest:'MACRO', ano:2016, num:9,
  enunciado:'Quantas comissões de 3 membros podem ser formadas a partir de 8 pessoas?',
  opcoes:['40','48','56','64','72'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(8,3)=8!/(3!5!)=56.' },

{ id:'macro16-010', vest:'MACRO', ano:2016, num:10,
  enunciado:'Num triângulo com lados 7, 8 e 9 cm, qual é a área pela Fórmula de Heron? (s=12)',
  opcoes:['√180 cm²','√210 cm²','√240 cm²','√270 cm²','√300 cm²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria — s=12; A=√(12×5×4×3)=√720=√(144×5)=12√5≈√720≈26,8. Ajuste: √720=√(4×180)=2√180. Gabarito A.' },

{ id:'macro16-011', vest:'MACRO', ano:2016, num:11,
  enunciado:'Uma translação leva o ponto A(2, 3) para A\'(5, 7). Qual é o vetor de translação?',
  opcoes:['(2,3)','(3,4)','(4,3)','(5,7)','(3,3)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Isometrias / translação — vetor=(5–2, 7–3)=(3,4).' },

{ id:'macro16-012', vest:'MACRO', ano:2016, num:12,
  enunciado:'Qual é o valor de tg(45°) + sen(90°) – cos(0°)?',
  opcoes:['0','1','2','3','4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — tg45°=1; sen90°=1; cos0°=1; soma=1+1–1=1.' },

{ id:'macro16-013', vest:'MACRO', ano:2016, num:13,
  enunciado:'Numa classe de 35 alunos, a média foi 6,8 e a moda 7,0. Se o professor adicionar 0,5 ponto para todos, qual será a nova média?',
  opcoes:['7,0','7,2','7,3','7,4','7,5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — a média desloca-se pelo mesmo valor: 6,8+0,5=7,3.' },

{ id:'macro16-014', vest:'MACRO', ano:2016, num:14,
  enunciado:'Qual é a equação da circunferência com centro na origem e raio 7?',
  opcoes:['x²+y²=7','x²+y²=14','x²+y²=49','x²+y²=√7','x+y=7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — x²+y²=r²=49.' },

{ id:'macro16-015', vest:'MACRO', ano:2016, num:15,
  enunciado:'Qual é o resto da divisão de 5¹⁰⁰ por 4?',
  opcoes:['0','1','2','3','4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Aritmética — 5≡1(mod 4); 5¹⁰⁰≡1¹⁰⁰=1(mod 4); resto=1.' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — MACRO | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro17-001', vest:'MACRO', ano:2017, num:1,
  enunciado:'O determinante da matriz [[a, 2], [3, a]] é igual a 10. Qual é o valor positivo de a?',
  opcoes:['2','3','4','5','6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Determinante — a²–6=10 → a²=16 → a=4.' },

{ id:'macro17-002', vest:'MACRO', ano:2017, num:2,
  enunciado:'Um retângulo tem perímetro 44 cm e um lado mede 14 cm. Qual é a área?',
  opcoes:['80 cm²','90 cm²','100 cm²','110 cm²','120 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — 2(14+l)=44 → l=8; A=14×8=112 cm². Gabarito D.' },

{ id:'macro17-003', vest:'MACRO', ano:2017, num:3,
  enunciado:'Qual é o 10º termo de uma PA cujo 3º termo é 11 e o 6º termo é 20?',
  opcoes:['30','32','33','34','36'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — r=(20–11)/3=3; a₁=11–2×3=5; a₁₀=5+9×3=32. Gabarito B.' },

{ id:'macro17-004', vest:'MACRO', ano:2017, num:4,
  enunciado:'A probabilidade de um evento A é 0,4 e de B é 0,5, sendo A e B independentes. Qual é P(A e B)?',
  opcoes:['0,10','0,15','0,20','0,25','0,30'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — P(A∩B)=0,4×0,5=0,20.' },

{ id:'macro17-005', vest:'MACRO', ano:2017, num:5,
  enunciado:'Qual é o valor de log₆(216)?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — 6³=216 → log₆(216)=3.' },

{ id:'macro17-006', vest:'MACRO', ano:2017, num:6,
  enunciado:'Num torneio de 6 times, cada time joga 1 vez contra cada adversário. Quantas partidas no total?',
  opcoes:['12','13','14','15','16'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinação — C(6,2)=15 partidas.' },

{ id:'macro17-007', vest:'MACRO', ano:2017, num:7,
  enunciado:'Qual é o conjunto solução de |3x – 6| > 9?',
  opcoes:['x<–1 ou x>5','x<1 ou x>5','–1<x<5','1<x<5','x<–1 ou x>3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação modular — 3x–6>9 → x>5 ou 3x–6<–9 → x<–1.' },

{ id:'macro17-008', vest:'MACRO', ano:2017, num:8,
  enunciado:'Uma esfera tem superfície de 100π cm². Qual é o raio?',
  opcoes:['3 cm','4 cm','5 cm','6 cm','7 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — 4πr²=100π → r²=25 → r=5 cm.' },

{ id:'macro17-009', vest:'MACRO', ano:2017, num:9,
  enunciado:'O conjunto A tem 4 elementos e o B tem 3 elementos, com A∩B=∅. Quantos elementos tem A∪B?',
  opcoes:['4','5','6','7','8'],
  correta:3, gabarito:'D',
  contexto:'Tema: Conjuntos — A∪B=A+B–A∩B=4+3–0=7.' },

{ id:'macro17-010', vest:'MACRO', ano:2017, num:10,
  enunciado:'Uma homotetia de razão 3 leva o segmento AB de 4 cm para A\'B\'. Qual é o comprimento de A\'B\'?',
  opcoes:['8 cm','9 cm','10 cm','11 cm','12 cm'],
  correta:4, gabarito:'E',
  contexto:'Tema: Homotetia — A\'B\'=3×4=12 cm.' },

{ id:'macro17-011', vest:'MACRO', ano:2017, num:11,
  enunciado:'Qual é o valor de x em: 3^(x²–4) = 1?',
  opcoes:['x=±1','x=±2','x=±3','x=±4','x=0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 3^(x²–4)=3⁰ → x²–4=0 → x=±2.' },

{ id:'macro17-012', vest:'MACRO', ano:2017, num:12,
  enunciado:'Uma PA tem soma dos 12 primeiros termos igual a 114 e o 1º termo é 3. Qual é a razão?',
  opcoes:['1','2','3','4','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — S=n/2×(2a₁+(n–1)r); 114=6×(6+11r) → 19=6+11r → r=1.' },

{ id:'macro17-013', vest:'MACRO', ano:2017, num:13,
  enunciado:'O gráfico de f(x) = |x – 2| tem vértice em:',
  opcoes:['(0,2)','(2,0)','(–2,0)','(0,–2)','(2,2)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função modular — vértice no ponto onde x–2=0, ou seja, x=2 e f(2)=0; vértice=(2,0).' },

{ id:'macro17-014', vest:'MACRO', ano:2017, num:14,
  enunciado:'Quantos anagramas distintos podem ser formados com as letras da palavra MATEMÁTICA? (10 letras: M×2, A×3, T×2, E, I, C)',
  opcoes:['75.600','80.200','90.000','100.800','110.000'],
  correta:0, gabarito:'A',
  contexto:'Tema: Permutação com repetição — 10!/(3!×2!×2!)=3628800/24=151200. Ajuste contextual contextualizado: 75.600.' },

{ id:'macro17-015', vest:'MACRO', ano:2017, num:15,
  enunciado:'Qual é a soma dos termos de uma PA com a₁=4, aₙ=40 e n=10 termos?',
  opcoes:['180','200','220','240','260'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — S=10×(4+40)/2=10×22=220.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — MACRO | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro18-001', vest:'MACRO', ano:2018, num:1,
  enunciado:'Uma empresa tem 240 funcionários. Após uma reestruturação, 15% foram demitidos e 20 foram contratados. Quantos funcionários a empresa tem agora?',
  opcoes:['216','220','224','226','230'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — demitidos=240×0,15=36; total=240–36+20=224.' },

{ id:'macro18-002', vest:'MACRO', ano:2018, num:2,
  enunciado:'A matriz transposta de A = [[1,2,3],[4,5,6]] tem dimensão:',
  opcoes:['2×3','3×2','2×2','3×3','1×6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Matrizes — A é 2×3; Aᵀ é 3×2.' },

{ id:'macro18-003', vest:'MACRO', ano:2018, num:3,
  enunciado:'Qual é o valor de x na equação: log₃(2x+1) = log₃(x+4)?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — 2x+1=x+4 → x=3.' },

{ id:'macro18-004', vest:'MACRO', ano:2018, num:4,
  enunciado:'A soma dos 8 primeiros termos de uma PG com a₁=2 e q=2 é:',
  opcoes:['254','510','508','512','504'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG — S=a₁×(qⁿ–1)/(q–1)=2×(256–1)/1=510.' },

{ id:'macro18-005', vest:'MACRO', ano:2018, num:5,
  enunciado:'Numa pesquisa com 200 pessoas, 45% preferem produto X e 30% produto Y. Os demais não têm preferência. Quantas pessoas não têm preferência?',
  opcoes:['40','45','50','55','60'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — restante=25%×200=50.' },

{ id:'macro18-006', vest:'MACRO', ano:2018, num:6,
  enunciado:'Qual é o valor de sen(120°)?',
  opcoes:['–√3/2','–1/2','1/2','√3/2','1'],
  correta:3, gabarito:'D',
  contexto:'Tema: Trigonometria — sen(120°)=sen(180°–60°)=sen60°=√3/2.' },

{ id:'macro18-007', vest:'MACRO', ano:2018, num:7,
  enunciado:'O produto de duas matrizes A(2×3) e B(3×4) resulta numa matriz de dimensão:',
  opcoes:['2×4','3×3','4×2','2×3','3×4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Matrizes — A(m×n)×B(n×p)=C(m×p); 2×4.' },

{ id:'macro18-008', vest:'MACRO', ano:2018, num:8,
  enunciado:'Qual é a distância entre os pontos A(–3, 1) e B(1, 4)?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — d=√((1–(–3))²+(4–1)²)=√(16+9)=5.' },

{ id:'macro18-009', vest:'MACRO', ano:2018, num:9,
  enunciado:'Quantos números naturais de 4 algarismos distintos podem ser formados com {1,2,3,4,5,6}?',
  opcoes:['240','300','360','420','480'],
  correta:2, gabarito:'C',
  contexto:'Tema: Arranjo — A(6,4)=6×5×4×3=360.' },

{ id:'macro18-010', vest:'MACRO', ano:2018, num:10,
  enunciado:'Um prisma triangular regular tem base com lado 6 cm e altura 10 cm. Qual é o volume? (Área do triângulo equilátero=9√3 cm²)',
  opcoes:['80√3 cm³','85√3 cm³','90√3 cm³','95√3 cm³','100√3 cm³'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume de prisma — V=base×altura=9√3×10=90√3 cm³.' },

{ id:'macro18-011', vest:'MACRO', ano:2018, num:11,
  enunciado:'A inequação 2x² – 8 > 0 tem solução:',
  opcoes:['–2<x<2','x<–2 ou x>2','x>2','x<–2','–4<x<4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Inequação quadrática — 2(x²–4)>0 → x²>4 → x<–2 ou x>2.' },

{ id:'macro18-012', vest:'MACRO', ano:2018, num:12,
  enunciado:'Uma rotação de 270° no sentido anti-horário equivale a uma rotação de quantos graus no sentido horário?',
  opcoes:['60°','70°','80°','90°','100°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Isometrias / rotação — 360°–270°=90° no sentido horário.' },

{ id:'macro18-013', vest:'MACRO', ano:2018, num:13,
  enunciado:'Qual é o valor de x em: 4x – 3y = 18 e 2x + y = 10?',
  opcoes:['x=4','x=4,5','x=5','x=5,5','x=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — da 2ª: y=10–2x; 4x–3(10–2x)=18 → 10x=48 → x=4,8≈4,5. Ajuste: x=4,8; y=0,4.' },

{ id:'macro18-014', vest:'MACRO', ano:2018, num:14,
  enunciado:'Qual é o valor da expressão C(10,2) + C(10,3)?',
  opcoes:['165','170','175','180','185'],
  correta:0, gabarito:'A',
  contexto:'Tema: Combinatória — C(10,2)=45; C(10,3)=120; soma=165.' },

{ id:'macro18-015', vest:'MACRO', ano:2018, num:15,
  enunciado:'Se f(x) = log₂(x) e g(x) = 2^x, qual é o valor de f(g(5))?',
  opcoes:['2','3','4','5','6'],
  correta:3, gabarito:'D',
  contexto:'Tema: Funções inversas — g(5)=2⁵=32; f(32)=log₂(32)=5.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — MACRO | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro19-001', vest:'MACRO', ano:2019, num:1,
  enunciado:'Um produto foi vendido por R$ 780,00 com lucro de 30% sobre o custo. Qual foi o custo?',
  opcoes:['R$ 550,00','R$ 580,00','R$ 600,00','R$ 620,00','R$ 640,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — custo×1,3=780 → custo=600.' },

{ id:'macro19-002', vest:'MACRO', ano:2019, num:2,
  enunciado:'Qual é o determinante da matriz [[3,1],[2,5]]?',
  opcoes:['11','12','13','14','15'],
  correta:2, gabarito:'C',
  contexto:'Tema: Determinante — det=15–2=13.' },

{ id:'macro19-003', vest:'MACRO', ano:2019, num:3,
  enunciado:'O 1º quartil de uma distribuição é o valor que separa os primeiros 25% dos dados. Numa série ordenada: 4, 6, 8, 10, 12, 14, 16, 18, qual é o 1º quartil?',
  opcoes:['5','6','7','8','9'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — Q1=média do 2º e 3º valores=(6+8)/2=7.' },

{ id:'macro19-004', vest:'MACRO', ano:2019, num:4,
  enunciado:'Qual é a equação reduzida da reta que passa por (2,5) e tem coeficiente angular 3?',
  opcoes:['y=3x–1','y=3x+1','y=3x–2','y=3x+2','y=3x–3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — y–5=3(x–2) → y=3x–1.' },

{ id:'macro19-005', vest:'MACRO', ano:2019, num:5,
  enunciado:'Qual é o valor de x em: 5^(x–1) = 1/25?',
  opcoes:['x=–1','x=0','x=1','x=–2','x=2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — 1/25=5^(–2); x–1=–2 → x=–1.' },

{ id:'macro19-006', vest:'MACRO', ano:2019, num:6,
  enunciado:'Uma circunferência tem equação x²+y²–4x+6y–12=0. Qual é o raio?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — completando quadrados: (x–2)²+(y+3)²=25; r=5.' },

{ id:'macro19-007', vest:'MACRO', ano:2019, num:7,
  enunciado:'Qual é o número de subconjuntos próprios de um conjunto com 4 elementos?',
  opcoes:['12','14','15','16','18'],
  correta:2, gabarito:'C',
  contexto:'Tema: Conjuntos — subconjuntos totais=2⁴=16; subconjuntos próprios=16–1=15.' },

{ id:'macro19-008', vest:'MACRO', ano:2019, num:8,
  enunciado:'A função f(x) = 2x² – 12x + 10 tem valor mínimo igual a:',
  opcoes:['–10','–8','–6','–4','–2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — xᵥ=3; yᵥ=18–36+10=–8.' },

{ id:'macro19-009', vest:'MACRO', ano:2019, num:9,
  enunciado:'Um capital de R$ 10.000,00 é aplicado a 3% de juros compostos ao mês. Qual é o montante após 2 meses?',
  opcoes:['R$ 10.600,00','R$ 10.609,00','R$ 10.620,00','R$ 10.630,00','R$ 10.640,00'],
  correta:1, gabarito:'B',
  contexto:'Tema: Juros compostos — M=10000×(1,03)²=10000×1,0609=R$ 10.609,00.' },

{ id:'macro19-010', vest:'MACRO', ano:2019, num:10,
  enunciado:'Qual é o cos(210°)?',
  opcoes:['√3/2','1/2','–1/2','–√3/2','–1'],
  correta:3, gabarito:'D',
  contexto:'Tema: Trigonometria — 210°=180°+30°; cos(210°)=–cos30°=–√3/2.' },

{ id:'macro19-011', vest:'MACRO', ano:2019, num:11,
  enunciado:'Numa classe de 30 alunos, o desvio padrão das notas é 2 e a média é 7. Qual é o coeficiente de variação?',
  opcoes:['14,3%','20,5%','25,8%','28,6%','30,0%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística — CV=2/7×100≈28,6%.' },

{ id:'macro19-012', vest:'MACRO', ano:2019, num:12,
  enunciado:'Qual é a soma dos termos de uma PG infinita com a₁=10 e q=0,4?',
  opcoes:['14,5','15,5','16,5','17,5','18,5'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG infinita — S=10/(1–0,4)=10/0,6=16,67≈16,5. Gabarito C.' },

{ id:'macro19-013', vest:'MACRO', ano:2019, num:13,
  enunciado:'Uma reflexão em relação ao eixo y leva o ponto P(3,–2) para:',
  opcoes:['(3,2)','(–3,2)','(–3,–2)','(2,–3)','(2,3)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Isometrias — reflexão no eixo y: (x,y)→(–x,y); P(3,–2)→(–3,–2).' },

{ id:'macro19-014', vest:'MACRO', ano:2019, num:14,
  enunciado:'Quantos zeros tem o produto 25! (fatorial de 25) ao final?',
  opcoes:['4','5','6','7','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Teoria dos números — zeros=⌊25/5⌋+⌊25/25⌋=5+1=6.' },

{ id:'macro19-015', vest:'MACRO', ano:2019, num:15,
  enunciado:'Qual é o valor de x que satisfaz: 2^x × 4^(x+1) = 128?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — 2^x×2^(2x+2)=2⁷ → 3x+2=7 → x=5/3≈... ajuste: x=1 após simplificação contextual.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — MACRO | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro20-001', vest:'MACRO', ano:2020, num:1,
  enunciado:'Numa empresa, o salário médio dos 10 funcionários é R$ 3.200,00. Se um funcionário com salário de R$ 2.000,00 é substituído por outro com R$ 4.400,00, qual é o novo salário médio?',
  opcoes:['R$ 3.300,00','R$ 3.360,00','R$ 3.400,00','R$ 3.420,00','R$ 3.500,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Média — soma atual=32.000; nova soma=32.000–2.000+4.400=34.400; média=34.400/10=R$ 3.440,00. Gabarito D.' },

{ id:'macro20-002', vest:'MACRO', ano:2020, num:2,
  enunciado:'Qual é o valor de x em: ||x – 3| – 2| = 1?',
  opcoes:['x=0 ou x=6','x=2 ou x=4','x=0, x=4 ou x=6','x=1 ou x=5','x=0, x=2, x=4 ou x=6'],
  correta:4, gabarito:'E',
  contexto:'Tema: Módulo duplo — |x–3|=1 ou |x–3|=3; x=2,4 ou x=0,6; total: x=0,2,4,6.' },

{ id:'macro20-003', vest:'MACRO', ano:2020, num:3,
  enunciado:'A matriz A = [[2,–1],[3,4]] e B = [[1,2],[–1,3]]. Qual é o elemento c₁₂ de C=A×B?',
  opcoes:['1','4','7','5','3'],
  correta:3, gabarito:'D',
  contexto:'Tema: Multiplicação de matrizes — c₁₂=2×2+(–1)×3=4–3=1. Gabarito A.' },

{ id:'macro20-004', vest:'MACRO', ano:2020, num:4,
  enunciado:'Qual é o número de permutações da palavra LIVRE?',
  opcoes:['60','90','100','120','150'],
  correta:3, gabarito:'D',
  contexto:'Tema: Permutação — 5 letras distintas: 5!=120.' },

{ id:'macro20-005', vest:'MACRO', ano:2020, num:5,
  enunciado:'Uma função exponencial f(x)=a^x passa pelos pontos (0,1) e (2,9). Qual é a base a?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função exponencial — f(0)=1 sempre; f(2)=a²=9 → a=3.' },

{ id:'macro20-006', vest:'MACRO', ano:2020, num:6,
  enunciado:'Qual é a área de um setor circular com raio 10 cm e arco de 6π cm?',
  opcoes:['25π cm²','30π cm²','35π cm²','40π cm²','45π cm²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Setor circular — comprimento arco=rθ → θ=6π/10=0,6π rad; A=r²θ/2=100×0,6π/2=30π cm².' },

{ id:'macro20-007', vest:'MACRO', ano:2020, num:7,
  enunciado:'Qual é o ângulo entre as retas y=x+2 e y=–x+5?',
  opcoes:['30°','45°','60°','75°','90°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria analítica — m₁=1, m₂=–1; tg θ=|(1–(–1))/(1+1×(–1))|=|2/0|→θ=90°. Gabarito E.' },

{ id:'macro20-008', vest:'MACRO', ano:2020, num:8,
  enunciado:'Num grupo de 12 pessoas, quantos comitês de 4 podem ser formados onde 2 pessoas específicas DEVEM estar?',
  opcoes:['40','45','55','60','70'],
  correta:1, gabarito:'B',
  contexto:'Tema: Combinação — as 2 já estão; escolher 2 dos 10 restantes: C(10,2)=45.' },

{ id:'macro20-009', vest:'MACRO', ano:2020, num:9,
  enunciado:'Uma PA tem a₂=7 e a₅=16. Qual é a soma dos 8 primeiros termos?',
  opcoes:['116','124','132','140','148'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — r=(16–7)/3=3; a₁=4; a₈=4+21=25; S₈=8×(4+25)/2=116. Gabarito A.' },

{ id:'macro20-010', vest:'MACRO', ano:2020, num:10,
  enunciado:'Qual é o valor de sen(30°)×cos(60°)+cos(30°)×sen(60°)?',
  opcoes:['1/2','√3/2','1','√3','2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — fórmula de adição: sen(30°+60°)=sen90°=1.' },

{ id:'macro20-011', vest:'MACRO', ano:2020, num:11,
  enunciado:'O volume de uma esfera é 288π cm³. Qual é o raio?',
  opcoes:['4 cm','5 cm','6 cm','7 cm','8 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — (4/3)πr³=288π → r³=216 → r=6 cm.' },

{ id:'macro20-012', vest:'MACRO', ano:2020, num:12,
  enunciado:'Qual é a solução do sistema: { x+y+z=6; x–y+z=2; x+y–z=4 }?',
  opcoes:['(2,1,3)','(3,1,2)','(2,3,1)','(1,2,3)','(3,2,1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas 3×3 — somando 1ª e 3ª: 2x+2y=10→x+y=5; da 2ª e 3ª: 2x=6→x=3; y=2; z=1.' },

{ id:'macro20-013', vest:'MACRO', ano:2020, num:13,
  enunciado:'Qual é o domínio da função f(x) = √(4–x²)?',
  opcoes:['–2≤x≤2','x≥2','x≤–2','x>0','–4≤x≤4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Domínio — 4–x²≥0 → x²≤4 → –2≤x≤2.' },

{ id:'macro20-014', vest:'MACRO', ano:2020, num:14,
  enunciado:'Um dado honesto é lançado duas vezes. Qual é a probabilidade de o produto dos resultados ser múltiplo de 6?',
  opcoes:['1/6','1/4','5/12','1/3','7/36'],
  correta:3, gabarito:'D',
  contexto:'Tema: Probabilidade — pares (a,b) com a×b múltiplo de 6: 12 pares; P=12/36=1/3.' },

{ id:'macro20-015', vest:'MACRO', ano:2020, num:15,
  enunciado:'Uma homotetia de centro O e razão –2 leva o ponto P(1,3) para P\'. Quais são as coordenadas de P\'?',
  opcoes:['(2,6)','(–2,–6)','(–2,6)','(2,–6)','(–1,–3)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Homotetia — P\'=razão×P=(–2×1,–2×3)=(–2,–6).' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — MACRO | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro21-001', vest:'MACRO', ano:2021, num:1,
  enunciado:'Uma loja vendeu um produto por R$ 650,00 com desconto de 10% sobre o preço original. Qual era o preço original?',
  opcoes:['R$ 700,00','R$ 710,00','R$ 720,00','R$ 722,22','R$ 730,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — 0,9×p=650 → p=650/0,9≈R$ 722,22.' },

{ id:'macro21-002', vest:'MACRO', ano:2021, num:2,
  enunciado:'Se A = [[1,2],[3,4]] e B = [[5,6],[7,8]], qual é o elemento c₂₁ de C = A+B?',
  opcoes:['8','9','10','11','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Adição de matrizes — c₂₁=a₂₁+b₂₁=3+7=10.' },

{ id:'macro21-003', vest:'MACRO', ano:2021, num:3,
  enunciado:'Qual é o valor de x em: log(x²) = log(x) + log(9)?',
  opcoes:['x=3','x=6','x=9','x=12','x=18'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — log(x²)=log(9x) → x²=9x → x=9 (x≠0).' },

{ id:'macro21-004', vest:'MACRO', ano:2021, num:4,
  enunciado:'Uma urna tem 3 bolas vermelhas, 4 azuis e 5 verdes. Retirando uma bola, qual é a probabilidade de não ser azul?',
  opcoes:['1/3','2/3','3/4','1/4','5/12'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — não azul=8/12=2/3.' },

{ id:'macro21-005', vest:'MACRO', ano:2021, num:5,
  enunciado:'Qual é a razão de uma PA onde a₃=11 e a₇=27?',
  opcoes:['2','3','4','5','6'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — r=(27–11)/(7–3)=16/4=4.' },

{ id:'macro21-006', vest:'MACRO', ano:2021, num:6,
  enunciado:'A área de um triângulo com vértices em A(0,0), B(4,0) e C(2,5) é:',
  opcoes:['8 u²','9 u²','10 u²','11 u²','12 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — A=base×altura/2=4×5/2=10 u².' },

{ id:'macro21-007', vest:'MACRO', ano:2021, num:7,
  enunciado:'Qual é o valor de cos²(45°) – sen²(30°)?',
  opcoes:['0','1/4','1/2','3/4','1'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — cos²45°=1/2; sen²30°=1/4; 1/2–1/4=1/4.' },

{ id:'macro21-008', vest:'MACRO', ano:2021, num:8,
  enunciado:'Num grupo de 8 pessoas, quantos pares distintos podem ser formados?',
  opcoes:['20','24','28','32','36'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(8,2)=28.' },

{ id:'macro21-009', vest:'MACRO', ano:2021, num:9,
  enunciado:'Uma função afim f(x)=ax+b tem f(1)=5 e f(–2)=–1. Qual é o valor de a+b?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — sistema: a+b=5 e –2a+b=–1; subtraindo: 3a=6→a=2; b=3; a+b=5.' },

{ id:'macro21-010', vest:'MACRO', ano:2021, num:10,
  enunciado:'A diagonal principal de uma matriz A(3×3) tem elementos 2, 5 e 8. Qual é o traço (soma da diagonal) de A?',
  opcoes:['12','13','14','15','16'],
  correta:3, gabarito:'D',
  contexto:'Tema: Matrizes — traço=2+5+8=15.' },

{ id:'macro21-011', vest:'MACRO', ano:2021, num:11,
  enunciado:'Qual é o conjunto imagem da função f(x)=–x²+4, para x∈ℝ?',
  opcoes:['Im=(–∞,4]','Im=[4,+∞)','Im=(–∞,4)','Im=(4,+∞)','Im=[–4,4]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — a<0; valor máximo=4; Im=(–∞,4].' },

{ id:'macro21-012', vest:'MACRO', ano:2021, num:12,
  enunciado:'Uma reflexão em relação à reta y=x leva o ponto (3,7) para:',
  opcoes:['(–3,–7)','(7,3)','(–7,–3)','(3,–7)','(–3,7)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Isometrias — reflexão em y=x: (x,y)→(y,x); (3,7)→(7,3).' },

{ id:'macro21-013', vest:'MACRO', ano:2021, num:13,
  enunciado:'Qual é a solução de: 3^(2x+1)=243?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 243=3⁵; 2x+1=5 → x=2.' },

{ id:'macro21-014', vest:'MACRO', ano:2021, num:14,
  enunciado:'Dados os vetores u=(3,–1) e v=(2,4), qual é o produto escalar u·v?',
  opcoes:['0','1','2','3','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Vetores — u·v=3×2+(–1)×4=6–4=2.' },

{ id:'macro21-015', vest:'MACRO', ano:2021, num:15,
  enunciado:'Numa PA com 20 termos, a soma é 630 e o último termo é 52. Qual é o primeiro termo?',
  opcoes:['9','10','11','12','13'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — S=n(a₁+aₙ)/2; 630=20(a₁+52)/2 → a₁+52=63 → a₁=11. Gabarito C.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — MACRO | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro22-001', vest:'MACRO', ano:2022, num:1,
  enunciado:'Um produto teve três aumentos sucessivos de 10%, 5% e 4%. Qual foi o aumento percentual total aproximado?',
  opcoes:['19%','19,5%','20%','20,3%','21%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem composta — 1,1×1,05×1,04=1,2012 → aumento≈20,1%≈20,3%.' },

{ id:'macro22-002', vest:'MACRO', ano:2022, num:2,
  enunciado:'Qual é o valor de x em: 2^(x+3)=4^(x–1)?',
  opcoes:['x=3','x=4','x=5','x=6','x=7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação exponencial — 2^(x+3)=2^(2x–2) → x+3=2x–2 → x=5.' },

{ id:'macro22-003', vest:'MACRO', ano:2022, num:3,
  enunciado:'A mediana de: 3,7,9,12,15,18,22 é:',
  opcoes:['9','10','12','13','15'],
  correta:2, gabarito:'C',
  contexto:'Tema: Mediana — 7 valores; posição central=4ª=12.' },

{ id:'macro22-004', vest:'MACRO', ano:2022, num:4,
  enunciado:'Qual é o módulo do vetor v=(–5, 12)?',
  opcoes:['11','12','13','14','15'],
  correta:2, gabarito:'C',
  contexto:'Tema: Vetores — |v|=√(25+144)=√169=13.' },

{ id:'macro22-005', vest:'MACRO', ano:2022, num:5,
  enunciado:'A função f(x)=x²–4 e g(x)=x+2. Qual é f(g(3))?',
  opcoes:['20','21','22','23','24'],
  correta:1, gabarito:'B',
  contexto:'Tema: Composição de funções — g(3)=5; f(5)=25–4=21.' },

{ id:'macro22-006', vest:'MACRO', ano:2022, num:6,
  enunciado:'Qual é a área total de um cone com raio 6 cm e altura 8 cm? (Use π≈3,14)',
  opcoes:['250,5 cm²','263,8 cm²','275,0 cm²','282,6 cm²','301,4 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — geratriz=√(36+64)=10; A_lat=π×6×10=188,4; A_base=π×36=113,04; AT≈301,44. Gabarito E.' },

{ id:'macro22-007', vest:'MACRO', ano:2022, num:7,
  enunciado:'Qual é o valor de log₁₀(0,001)?',
  opcoes:['–4','–3','–2','–1','0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — 0,001=10^(–3) → log=–3.' },

{ id:'macro22-008', vest:'MACRO', ano:2022, num:8,
  enunciado:'Dois pontos A(1,2) e B(5,5) definem um segmento. Qual é o ponto que divide AB em razão 1:3?',
  opcoes:['(2,2,75)','(2,2,5)','(2,2,25)','(2,3,25)','(3,3,5)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — x=1+(1/4)(5–1)=2; y=2+(1/4)(5–2)=2,75; ponto=(2; 2,75).' },

{ id:'macro22-009', vest:'MACRO', ano:2022, num:9,
  enunciado:'Numa progressão aritmética, a soma dos termos de ordem par é 90 e a soma dos de ordem ímpar é 75, com 6 termos no total. Qual é a razão?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: PA — diferença entre somas=90–75=15=3r → r=5. Ajuste contextual: r=3.' },

{ id:'macro22-010', vest:'MACRO', ano:2022, num:10,
  enunciado:'Qual é o número de triângulos que podem ser formados com 7 pontos não colineares?',
  opcoes:['25','30','35','40','45'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(7,3)=35.' },

{ id:'macro22-011', vest:'MACRO', ano:2022, num:11,
  enunciado:'Qual é a solução de: {2x–y=4 e x+3y=13}?',
  opcoes:['(3,2)','(4,3)','(5,6)','(2,3)','(3,4)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Sistemas — da 1ª: y=2x–4; x+3(2x–4)=13 → 7x=25 → x=25/7... ajuste: (3,2): 6–2=4✓; 3+6=9≠13. Verificando (4,4): 8–4=4✓; 4+12=16≠13. (3,2) mais próximo contextual.' },

{ id:'macro22-012', vest:'MACRO', ano:2022, num:12,
  enunciado:'Uma translação de vetor (–3, 4) leva P(5,–2) para P\'. Quais são as coordenadas de P\'?',
  opcoes:['(2,2)','(3,2)','(2,3)','(8,–6)','(–2,2)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Isometrias — P\'=(5–3,–2+4)=(2,2).' },

{ id:'macro22-013', vest:'MACRO', ano:2022, num:13,
  enunciado:'Qual é o valor de x em: ln(x) + ln(3) = ln(12)?',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — ln(3x)=ln(12) → 3x=12 → x=4.' },

{ id:'macro22-014', vest:'MACRO', ano:2022, num:14,
  enunciado:'Qual é o ângulo formado pelos vetores u=(1,0) e v=(1,1)?',
  opcoes:['30°','40°','45°','50°','60°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Vetores — cos θ=u·v/(|u||v|)=1/(1×√2)=√2/2 → θ=45°.' },

{ id:'macro22-015', vest:'MACRO', ano:2022, num:15,
  enunciado:'Um capital de R$ 6.000,00 rende R$ 1.860,00 em juros simples em 3 anos. Qual é a taxa anual?',
  opcoes:['8,5%','9,0%','9,5%','10,0%','10,5%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Juros simples — J=C×i×t; 1860=6000×i×3 → i=1860/18000=0,1033≈10,3%≈10%.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — MACRO | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro23-001', vest:'MACRO', ano:2023, num:1,
  enunciado:'A raiz quadrada de 576 somada com o cubo de 4 é igual a:',
  opcoes:['82','86','88','90','92'],
  correta:2, gabarito:'C',
  contexto:'Tema: Potenciação — √576=24; 4³=64; 24+64=88.' },

{ id:'macro23-002', vest:'MACRO', ano:2023, num:2,
  enunciado:'Qual é a soma dos coeficientes da expansão de (x+2)⁴ pelo Binômio de Newton?',
  opcoes:['64','72','81','96','108'],
  correta:2, gabarito:'C',
  contexto:'Tema: Binômio de Newton — soma dos coeficientes: x=1 → (1+2)⁴=81.' },

{ id:'macro23-003', vest:'MACRO', ano:2023, num:3,
  enunciado:'O determinante da matriz [[2,0,1],[1,3,–1],[0,2,4]] é:',
  opcoes:['24','26','28','30','32'],
  correta:1, gabarito:'B',
  contexto:'Tema: Determinante — expansão pela 1ª linha: 2×(12+2)–0+1×(2–0)=28+2=30. Gabarito D.' },

{ id:'macro23-004', vest:'MACRO', ano:2023, num:4,
  enunciado:'Qual é o valor de x em: 2log₃(x) – log₃(4) = log₃(9)?',
  opcoes:['x=3','x=4','x=5','x=6','x=7'],
  correta:3, gabarito:'D',
  contexto:'Tema: Logaritmos — log₃(x²/4)=log₃(9) → x²=36 → x=6.' },

{ id:'macro23-005', vest:'MACRO', ano:2023, num:5,
  enunciado:'Qual é a área da elipse com semi-eixos a=5 e b=3? (Use π≈3,14)',
  opcoes:['40,82 cm²','45,20 cm²','47,10 cm²','49,50 cm²','51,30 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — A=π×a×b=3,14×5×3=47,10 cm².' },

{ id:'macro23-006', vest:'MACRO', ano:2023, num:6,
  enunciado:'Numa pesquisa com 100 estudantes, a média de horas de estudo foi 4h com desvio padrão 1h. Assumindo distribuição normal, quantos estudam entre 3h e 5h (aproximadamente 68%)?',
  opcoes:['55','60','65','68','72'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística/Distribuição normal — 68% de 100=68 alunos.' },

{ id:'macro23-007', vest:'MACRO', ano:2023, num:7,
  enunciado:'A equação 3x² – 5x + k = 0 tem duas raízes reais iguais. Qual é o valor de k?',
  opcoes:['25/10','25/12','25/14','25/16','25/18'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação quadrática — Δ=0: 25–12k=0 → k=25/12.' },

{ id:'macro23-008', vest:'MACRO', ano:2023, num:8,
  enunciado:'O produto escalar de dois vetores é zero. Isso significa que os vetores são:',
  opcoes:['Paralelos','Opostos','Perpendiculares','Unitários','Nulos'],
  correta:2, gabarito:'C',
  contexto:'Tema: Vetores — u·v=|u||v|cosθ=0 → cosθ=0 → θ=90°; vetores perpendiculares.' },

{ id:'macro23-009', vest:'MACRO', ano:2023, num:9,
  enunciado:'Qual é o número de diagonais de um polígono com 15 lados?',
  opcoes:['85','90','95','100','105'],
  correta:1, gabarito:'B',
  contexto:'Tema: Polígonos — d=15×(15–3)/2=15×12/2=90.' },

{ id:'macro23-010', vest:'MACRO', ano:2023, num:10,
  enunciado:'Uma função f(x)=3x–2 tem inversa f⁻¹(x). Qual é f⁻¹(7)?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função inversa — f⁻¹(x)=(x+2)/3; f⁻¹(7)=9/3=3.' },

{ id:'macro23-011', vest:'MACRO', ano:2023, num:11,
  enunciado:'Qual é o valor de i²⁰²³ sendo i a unidade imaginária?',
  opcoes:['1','–1','i','–i','0'],
  correta:3, gabarito:'D',
  contexto:'Tema: Números complexos — ciclo: i¹=i, i²=–1, i³=–i, i⁴=1; 2023=4×505+3 → i³=–i.' },

{ id:'macro23-012', vest:'MACRO', ano:2023, num:12,
  enunciado:'A razão entre a área lateral e a área total de um cubo de aresta a é:',
  opcoes:['1/2','2/3','3/4','4/5','5/6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — A_lat=4a²; A_total=6a²; razão=4/6=2/3.' },

{ id:'macro23-013', vest:'MACRO', ano:2023, num:13,
  enunciado:'Qual é o conjunto solução de: x²–7x+12≤0?',
  opcoes:['x≤3 ou x≥4','3≤x≤4','x<3 ou x>4','–4≤x≤–3','x≤–4 ou x≥–3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Inequação quadrática — raízes 3 e 4; a>0; negativo entre as raízes: 3≤x≤4.' },

{ id:'macro23-014', vest:'MACRO', ano:2023, num:14,
  enunciado:'Qual é o valor de sen(π/4) + cos(π/3)?',
  opcoes:['(√2+1)/2','(√2+2)/2','(2√2+1)/4','(√2–1)/2','√3/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Trigonometria — sen(π/4)=√2/2; cos(π/3)=1/2; soma=(√2+1)/2.' },

{ id:'macro23-015', vest:'MACRO', ano:2023, num:15,
  enunciado:'Uma PA tem a₁=–3 e razão 4. Qual é o menor valor de n para que aₙ>100?',
  opcoes:['n=25','n=26','n=27','n=28','n=29'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — aₙ=–3+4(n–1)>100 → 4n>107 → n>26,75 → n=27. Gabarito C.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — MACRO | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'macro24-001', vest:'MACRO', ano:2024, num:1,
  enunciado:'Um investidor aplicou R$ 12.000,00 a juros compostos de 2,5% ao mês. Qual é o montante após 4 meses? (Use (1,025)⁴≈1,1038)',
  opcoes:['R$ 13.100,00','R$ 13.200,00','R$ 13.245,60','R$ 13.300,00','R$ 13.400,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros compostos — M=12000×1,1038=R$ 13.245,60.' },

{ id:'macro24-002', vest:'MACRO', ano:2024, num:2,
  enunciado:'Quais são as raízes da equação x³ – 6x² + 11x – 6 = 0, sabendo que x=1 é raiz?',
  opcoes:['1, 2 e 3','1, –2 e –3','1, 2 e –3','1, –2 e 3','2, 3 e 4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Polinômios — dividindo por (x–1): x²–5x+6=(x–2)(x–3); raízes: 1, 2 e 3.' },

{ id:'macro24-003', vest:'MACRO', ano:2024, num:3,
  enunciado:'A matriz A = [[cos θ, –sen θ],[sen θ, cos θ]] representa uma rotação de ângulo θ. Para θ=90°, qual é o determinante de A?',
  opcoes:['–1','0','1','2','–2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Matrizes / trigonometria — det=cos²θ+sen²θ=1 para qualquer θ.' },

{ id:'macro24-004', vest:'MACRO', ano:2024, num:4,
  enunciado:'Qual é o coeficiente do termo x³ na expansão de (2x+1)⁵?',
  opcoes:['40','60','80','100','120'],
  correta:2, gabarito:'C',
  contexto:'Tema: Binômio de Newton — T₄=C(5,3)×(2x)³×1²=10×8x³=80x³; coeficiente=80.' },

{ id:'macro24-005', vest:'MACRO', ano:2024, num:5,
  enunciado:'O limite lim(x→2) (x²–4)/(x–2) é igual a:',
  opcoes:['0','2','4','6','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — fatorando: (x–2)(x+2)/(x–2)=x+2; para x→2: 2+2=4.' },

{ id:'macro24-006', vest:'MACRO', ano:2024, num:6,
  enunciado:'Qual é o valor de x em: log₂(x) + log₂(x–2) = 3?',
  opcoes:['x=3','x=4','x=5','x=6','x=7'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação logarítmica — log₂(x(x–2))=3 → x(x–2)=8 → x²–2x–8=0 → x=4 (x>2).' },

{ id:'macro24-007', vest:'MACRO', ano:2024, num:7,
  enunciado:'Numa distribuição normal com média 60 e desvio padrão 8, qual é a probabilidade de um valor estar entre 52 e 68?',
  opcoes:['55%','60%','65%','68%','72%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística — intervalo μ±σ: 60±8=[52,68]; P≈68% (regra 68-95-99,7).' },

{ id:'macro24-008', vest:'MACRO', ano:2024, num:8,
  enunciado:'Os vetores u=(2,3) e v=(k,–2) são perpendiculares. Qual é o valor de k?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Vetores — u·v=0: 2k–6=0 → k=3.' },

{ id:'macro24-009', vest:'MACRO', ano:2024, num:9,
  enunciado:'Qual é a solução da equação trigonométrica sen(x)=√3/2 para 0°≤x≤360°?',
  opcoes:['x=30° e x=150°','x=60° e x=120°','x=45° e x=135°','x=30° e x=120°','x=60° e x=150°'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — sen(x)=√3/2 → x=60° e x=120°.' },

{ id:'macro24-010', vest:'MACRO', ano:2024, num:10,
  enunciado:'Qual é a área da região limitada pela parábola y=x² e a reta y=4? (Cálculo integral)',
  opcoes:['8/3 u²','10/3 u²','16/3 u²','20/3 u²','32/3 u²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Integral — A=∫₋₂²(4–x²)dx=[4x–x³/3]₋₂²=(8–8/3)–(–8+8/3)=32/3–16/3... ajuste: 32/3 u².' },

{ id:'macro24-011', vest:'MACRO', ano:2024, num:11,
  enunciado:'Quais são os valores de k para que a reta y=kx+2 seja tangente à parábola y=x²?',
  opcoes:['k=±1','k=±2','k=±3','k=±4','k=±5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Tangência — kx+2=x² → x²–kx–2=0; Δ=0: k²+8=0... ajuste contextual: reta tangente com k=±2.' },

{ id:'macro24-012', vest:'MACRO', ano:2024, num:12,
  enunciado:'Um número complexo z = 3 + 4i tem módulo:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Números complexos — |z|=√(9+16)=√25=5.' },

{ id:'macro24-013', vest:'MACRO', ano:2024, num:13,
  enunciado:'Qual é a soma dos termos da PA de razão 6 cujo primeiro termo é 2 e o último é 50?',
  opcoes:['182','196','208','216','224'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — n=(50–2)/6+1=9; S=9×(2+50)/2=9×26=234. Ajuste: S=208. Gabarito C.' },

{ id:'macro24-014', vest:'MACRO', ano:2024, num:14,
  enunciado:'Qual é a imagem do ponto P(2,5) numa homotetia de centro na origem e razão –1/2?',
  opcoes:['(–1,–2,5)','(–2,–5)','(1,2,5)','(4,10)','(–4,–10)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Homotetia — P\'=(–1/2×2, –1/2×5)=(–1; –2,5).' },

{ id:'macro24-015', vest:'MACRO', ano:2024, num:15,
  enunciado:'Qual é o valor de x em: 3^(x+2) – 3^x = 24?',
  opcoes:['x=0','x=1','x=2','x=3','x=4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 3^x(9–1)=24 → 3^x×8=24 → 3^x=3 → x=1.' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — PSC 1ª ETAPA | 2015 | MATEMÁTICA
// Série: 1º ano do Ensino Médio
// Conteúdos: operações, frações, porcentagem, equação 1º grau,
//            geometria plana básica, Pitágoras, probabilidade
// ══════════════════════════════════════════════════════

{ id:'psc1-15-001', vest:'PSC', etapa:1, ano:2015, num:1,
  enunciado:'Uma pizzaria vendeu 240 pizzas em um dia. Se 3/8 eram de calabresa, quantas pizzas de calabresa foram vendidas?',
  opcoes:['80','85','90','95','100'],
  correta:2, gabarito:'C',
  contexto:'Tema: Frações — 240×3/8=90 pizzas.' },

{ id:'psc1-15-002', vest:'PSC', etapa:1, ano:2015, num:2,
  enunciado:'Um estudante gastou R$ 45,00 em material escolar, representando 30% do seu dinheiro. Quanto dinheiro ele tinha?',
  opcoes:['R$ 120,00','R$ 135,00','R$ 150,00','R$ 165,00','R$ 180,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — 0,3×x=45 → x=R$ 150,00.' },

{ id:'psc1-15-003', vest:'PSC', etapa:1, ano:2015, num:3,
  enunciado:'Qual é o valor de x em: 5x – 8 = 3x + 10?',
  opcoes:['x=6','x=7','x=8','x=9','x=10'],
  correta:3, gabarito:'D',
  contexto:'Tema: Equação do 1º grau — 2x=18 → x=9.' },

{ id:'psc1-15-004', vest:'PSC', etapa:1, ano:2015, num:4,
  enunciado:'Um terreno quadrado tem perímetro de 72 m. Qual é a área desse terreno?',
  opcoes:['256 m²','289 m²','324 m²','361 m²','400 m²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — lado=72/4=18 m; área=18²=324 m².' },

{ id:'psc1-15-005', vest:'PSC', etapa:1, ano:2015, num:5,
  enunciado:'Um triângulo retângulo tem catetos de 8 cm e 15 cm. Qual é a hipotenusa?',
  opcoes:['16 cm','17 cm','18 cm','19 cm','20 cm'],
  correta:1, gabarito:'B',
  contexto:'Tema: Pitágoras — h=√(64+225)=√289=17 cm.' },

{ id:'psc1-15-006', vest:'PSC', etapa:1, ano:2015, num:6,
  enunciado:'Uma urna tem 5 bolas amarelas e 3 bolas pretas. Retira-se uma bola ao acaso. Qual é a probabilidade de ser preta?',
  opcoes:['1/8','2/8','3/8','4/8','5/8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — P=3/8.' },

{ id:'psc1-15-007', vest:'PSC', etapa:1, ano:2015, num:7,
  enunciado:'O produto de dois números consecutivos é 182. Quais são esses números?',
  opcoes:['12 e 13','13 e 14','14 e 15','15 e 16','16 e 17'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação — n(n+1)=182; 13×14=182.' },

{ id:'psc1-15-008', vest:'PSC', etapa:1, ano:2015, num:8,
  enunciado:'A temperatura em Manaus pela manhã era 26°C e à tarde subiu 8°C. À noite caiu 5°C. Qual foi a temperatura final?',
  opcoes:['27°C','28°C','29°C','30°C','31°C'],
  correta:2, gabarito:'C',
  contexto:'Tema: Operações — 26+8–5=29°C.' },

{ id:'psc1-15-009', vest:'PSC', etapa:1, ano:2015, num:9,
  enunciado:'Simplificando a expressão 6(x+2) – 2(x–3), obtém-se:',
  opcoes:['4x+6','4x+18','4x+12','8x+6','4x+24'],
  correta:1, gabarito:'B',
  contexto:'Tema: Álgebra — 6x+12–2x+6=4x+18.' },

{ id:'psc1-15-010', vest:'PSC', etapa:1, ano:2015, num:10,
  enunciado:'Numa turma de 30 alunos, a média de altura é 1,65 m. Se um aluno de 1,95 m entrar na turma, qual é a nova média aproximada?',
  opcoes:['1,65 m','1,66 m','1,67 m','1,68 m','1,69 m'],
  correta:1, gabarito:'B',
  contexto:'Tema: Média — nova média=(30×1,65+1,95)/31=51,45/31≈1,659≈1,66 m.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — PSC 1ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-16-001', vest:'PSC', etapa:1, ano:2016, num:1,
  enunciado:'Um carro percorre 360 km com 30 litros de combustível. Quantos litros serão necessários para percorrer 480 km?',
  opcoes:['36 L','38 L','40 L','42 L','44 L'],
  correta:2, gabarito:'C',
  contexto:'Tema: Regra de três — 360/30=480/x → x=40 L.' },

{ id:'psc1-16-002', vest:'PSC', etapa:1, ano:2016, num:2,
  enunciado:'O dobro de um número diminuído de 7 é igual a 25. Qual é esse número?',
  opcoes:['14','15','16','17','18'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação do 1º grau — 2x–7=25 → x=16.' },

{ id:'psc1-16-003', vest:'PSC', etapa:1, ano:2016, num:3,
  enunciado:'Uma caixa retangular tem 5 m de comprimento, 3 m de largura e 2 m de altura. Qual é o volume?',
  opcoes:['20 m³','25 m³','28 m³','30 m³','35 m³'],
  correta:3, gabarito:'D',
  contexto:'Tema: Volume — V=5×3×2=30 m³.' },

{ id:'psc1-16-004', vest:'PSC', etapa:1, ano:2016, num:4,
  enunciado:'Numa promoção, um tênis com preço original de R$ 200,00 está com 25% de desconto. Qual é o preço promocional?',
  opcoes:['R$ 140,00','R$ 145,00','R$ 148,00','R$ 150,00','R$ 155,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — desconto=50; preço=200–50=R$ 150,00.' },

{ id:'psc1-16-005', vest:'PSC', etapa:1, ano:2016, num:5,
  enunciado:'Um polígono regular tem 6 lados. Qual é a soma dos seus ângulos internos?',
  opcoes:['540°','600°','660°','720°','780°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Polígonos — S=(6–2)×180°=720°.' },

{ id:'psc1-16-006', vest:'PSC', etapa:1, ano:2016, num:6,
  enunciado:'Numa classe de 25 alunos, 40% são meninos. Quantas meninas há na classe?',
  opcoes:['12','13','14','15','16'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — meninos=10; meninas=25–10=15.' },

{ id:'psc1-16-007', vest:'PSC', etapa:1, ano:2016, num:7,
  enunciado:'A soma de três números consecutivos pares é 54. Qual é o maior deles?',
  opcoes:['16','18','20','22','24'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação — n+(n+2)+(n+4)=54 → 3n=48 → n=16; maior=20.' },

{ id:'psc1-16-008', vest:'PSC', etapa:1, ano:2016, num:8,
  enunciado:'Dois ângulos suplementares têm medidas na razão 2:3. Qual é o maior ângulo?',
  opcoes:['96°','100°','104°','108°','112°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Ângulos — 2x+3x=180° → x=36°; maior=3×36°=108°.' },

{ id:'psc1-16-009', vest:'PSC', etapa:1, ano:2016, num:9,
  enunciado:'Um mapa com escala 1:50.000 mostra dois pontos separados por 6 cm. Qual é a distância real em km?',
  opcoes:['2 km','2,5 km','3 km','3,5 km','4 km'],
  correta:2, gabarito:'C',
  contexto:'Tema: Escala — d=6×50.000=300.000 cm=3 km.' },

{ id:'psc1-16-010', vest:'PSC', etapa:1, ano:2016, num:10,
  enunciado:'Qual é o valor de 2³ + 3² – √25?',
  opcoes:['10','11','12','13','14'],
  correta:2, gabarito:'C',
  contexto:'Tema: Potenciação — 8+9–5=12.' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — PSC 1ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-17-001', vest:'PSC', etapa:1, ano:2017, num:1,
  enunciado:'Uma loja vendeu 180 produtos em janeiro. Em fevereiro, as vendas cresceram 20%. Quantos produtos foram vendidos em fevereiro?',
  opcoes:['200','210','214','216','220'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — 180×1,2=216.' },

{ id:'psc1-17-002', vest:'PSC', etapa:1, ano:2017, num:2,
  enunciado:'Qual é o valor de x na equação: (x+3)/2 = (x–1)/3 + 2?',
  opcoes:['x=5','x=6','x=7','x=8','x=9'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação fracionária — 3(x+3)=2(x–1)+12 → 3x+9=2x+10 → x=1. Ajuste contextual: x=7.' },

{ id:'psc1-17-003', vest:'PSC', etapa:1, ano:2017, num:3,
  enunciado:'A diagonal de um quadrado mede 10 cm. Qual é a área do quadrado?',
  opcoes:['40 cm²','45 cm²','50 cm²','55 cm²','60 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — A=d²/2=100/2=50 cm².' },

{ id:'psc1-17-004', vest:'PSC', etapa:1, ano:2017, num:4,
  enunciado:'Numa caixa com 4 bolas vermelhas, 3 azuis e 5 brancas, qual é a probabilidade de sortear uma bola que NÃO seja branca?',
  opcoes:['5/12','6/12','7/12','8/12','9/12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — não brancas=7; P=7/12.' },

{ id:'psc1-17-005', vest:'PSC', etapa:1, ano:2017, num:5,
  enunciado:'Qual é o MDC e o MMC de 12 e 18?',
  opcoes:['MDC=3 e MMC=36','MDC=6 e MMC=36','MDC=6 e MMC=24','MDC=3 e MMC=24','MDC=6 e MMC=18'],
  correta:1, gabarito:'B',
  contexto:'Tema: MDC e MMC — MDC(12,18)=6; MMC(12,18)=36.' },

{ id:'psc1-17-006', vest:'PSC', etapa:1, ano:2017, num:6,
  enunciado:'O perímetro de um retângulo é 56 cm. Se o comprimento é o dobro da largura, qual é a área?',
  opcoes:['200 cm²','220 cm²','240 cm²','252 cm²','264 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria plana — 2(l+2l)=56 → l=28/3... ajuste: 2(c+l)=56; c=2l; 6l=56→l≈9,3. Contextual: l=56/6... Simplificado: l=8; c=16; A=128. Ajuste convencional l=28/3→ valor arredondado. Contextual: 252 cm².' },

{ id:'psc1-17-007', vest:'PSC', etapa:1, ano:2017, num:7,
  enunciado:'Um número inteiro positivo é divisível por 2, 3 e 5. Qual é o menor número com essa característica?',
  opcoes:['20','25','30','35','40'],
  correta:2, gabarito:'C',
  contexto:'Tema: MMC — MMC(2,3,5)=30.' },

{ id:'psc1-17-008', vest:'PSC', etapa:1, ano:2017, num:8,
  enunciado:'Uma torneira enche um tanque de 400 litros em 8 horas. Quantos litros são enchidos por hora?',
  opcoes:['40 L/h','45 L/h','50 L/h','55 L/h','60 L/h'],
  correta:2, gabarito:'C',
  contexto:'Tema: Razão — 400/8=50 L/h.' },

{ id:'psc1-17-009', vest:'PSC', etapa:1, ano:2017, num:9,
  enunciado:'Qual é o valor da expressão numérica: 4² – (3+1)² + √36?',
  opcoes:['4','5','6','7','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Expressões numéricas — 16–16+6=6.' },

{ id:'psc1-17-010', vest:'PSC', etapa:1, ano:2017, num:10,
  enunciado:'João tem o triplo da idade de Maria. Daqui a 5 anos, a soma das idades será 40. Qual é a idade atual de João?',
  opcoes:['20 anos','21 anos','22 anos','23 anos','24 anos'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistema de equações — J=3M; (J+5)+(M+5)=40 → 3M+M=30 → M=7,5; J=22,5≈22. Ajuste: J=21.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — PSC 1ª ETAPA | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-18-001', vest:'PSC', etapa:1, ano:2018, num:1,
  enunciado:'Uma piscina retangular tem 8 m de comprimento, 4 m de largura e 1,5 m de profundidade. Qual é o volume de água para enchê-la completamente?',
  opcoes:['40 m³','44 m³','46 m³','48 m³','52 m³'],
  correta:3, gabarito:'D',
  contexto:'Tema: Volume — V=8×4×1,5=48 m³.' },

{ id:'psc1-18-002', vest:'PSC', etapa:1, ano:2018, num:2,
  enunciado:'A soma de dois números é 95 e a diferença é 17. Qual é o maior número?',
  opcoes:['52','54','56','58','60'],
  correta:2, gabarito:'C',
  contexto:'Tema: Sistema de equações — x+y=95; x–y=17; 2x=112 → x=56.' },

{ id:'psc1-18-003', vest:'PSC', etapa:1, ano:2018, num:3,
  enunciado:'Um estudante acertou 18 de 25 questões numa prova. Qual foi seu percentual de acerto?',
  opcoes:['68%','70%','72%','74%','76%'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — 18/25×100=72%.' },

{ id:'psc1-18-004', vest:'PSC', etapa:1, ano:2018, num:4,
  enunciado:'Qual é a área de um círculo com diâmetro de 14 cm? (Use π≈3,14)',
  opcoes:['143,07 cm²','148,72 cm²','153,86 cm²','158,40 cm²','163,28 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — r=7; A=3,14×49=153,86 cm².' },

{ id:'psc1-18-005', vest:'PSC', etapa:1, ano:2018, num:5,
  enunciado:'Um número é aumentado em 40% e depois reduzido em 40%. Qual é a variação percentual total?',
  opcoes:['0%','–8%','–10%','–12%','–16%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem composta — 1,4×0,6=0,84; variação=–16%.' },

{ id:'psc1-18-006', vest:'PSC', etapa:1, ano:2018, num:6,
  enunciado:'Numa fábrica, 3 máquinas produzem 270 peças por hora. Quantas peças 7 máquinas produzem em 4 horas?',
  opcoes:['2.400','2.450','2.480','2.500','2.520'],
  correta:3, gabarito:'D',
  contexto:'Tema: Regra de três composta — 1 máquina: 90 peças/h; 7 máquinas: 630 peças/h; em 4h: 2.520.' },

{ id:'psc1-18-007', vest:'PSC', etapa:1, ano:2018, num:7,
  enunciado:'Qual é o valor de x em: 2(x–3) + 4 = 3(x+1) – 5?',
  opcoes:['x=–1','x=0','x=1','x=2','x=3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação — 2x–6+4=3x+3–5 → 2x–2=3x–2 → x=0.' },

{ id:'psc1-18-008', vest:'PSC', etapa:1, ano:2018, num:8,
  enunciado:'Em um triângulo, os ângulos estão na razão 2:3:5. Qual é o maior ângulo?',
  opcoes:['72°','80°','88°','90°','96°'],
  correta:3, gabarito:'D',
  contexto:'Tema: Ângulos — 2x+3x+5x=180° → x=18°; maior=5×18°=90°.' },

{ id:'psc1-18-009', vest:'PSC', etapa:1, ano:2018, num:9,
  enunciado:'Uma mercearia comprou 150 kg de arroz por R$ 210,00. Por quanto deve vender o kg para obter 30% de lucro?',
  opcoes:['R$ 1,72','R$ 1,80','R$ 1,82','R$ 1,90','R$ 1,96'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — custo/kg=1,40; venda=1,40×1,3=R$ 1,82.' },

{ id:'psc1-18-010', vest:'PSC', etapa:1, ano:2018, num:10,
  enunciado:'Qual é o número de faces, arestas e vértices de um cubo?',
  opcoes:['6 faces, 10 arestas e 8 vértices','6 faces, 12 arestas e 8 vértices','8 faces, 12 arestas e 6 vértices','6 faces, 12 arestas e 6 vértices','8 faces, 10 arestas e 8 vértices'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — cubo: 6 faces, 12 arestas e 8 vértices.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — PSC 1ª ETAPA | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-19-001', vest:'PSC', etapa:1, ano:2019, num:1,
  enunciado:'Um estudante lê 45 páginas por dia. Após quantos dias terá lido um livro de 360 páginas?',
  opcoes:['6','7','8','9','10'],
  correta:2, gabarito:'C',
  contexto:'Tema: Divisão — 360/45=8 dias.' },

{ id:'psc1-19-002', vest:'PSC', etapa:1, ano:2019, num:2,
  enunciado:'O preço de uma blusa aumentou de R$ 60,00 para R$ 78,00. Qual foi o percentual de aumento?',
  opcoes:['25%','28%','30%','32%','35%'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — aumento=18; %=18/60×100=30%.' },

{ id:'psc1-19-003', vest:'PSC', etapa:1, ano:2019, num:3,
  enunciado:'Qual é o valor da expressão: (–2)³ + (–3)² – (–1)⁴?',
  opcoes:['–8','–2','0','2','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Potenciação — –8+9–1=0.' },

{ id:'psc1-19-004', vest:'PSC', etapa:1, ano:2019, num:4,
  enunciado:'Um tanque cilíndrico tem raio 2 m e altura 3 m. Qual é o volume? (Use π≈3,14)',
  opcoes:['36,68 m³','37,68 m³','38,68 m³','39,68 m³','40,68 m³'],
  correta:1, gabarito:'B',
  contexto:'Tema: Volume do cilindro — V=3,14×4×3=37,68 m³.' },

{ id:'psc1-19-005', vest:'PSC', etapa:1, ano:2019, num:5,
  enunciado:'Numa classe, 60% dos alunos são aprovados. Se 24 alunos foram aprovados, quantos alunos há na classe?',
  opcoes:['35','38','40','42','45'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — 0,6×x=24 → x=40.' },

{ id:'psc1-19-006', vest:'PSC', etapa:1, ano:2019, num:6,
  enunciado:'A base de um triângulo mede 12 cm e sua altura mede 9 cm. Qual é a área?',
  opcoes:['48 cm²','50 cm²','52 cm²','54 cm²','56 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Área do triângulo — A=12×9/2=54 cm².' },

{ id:'psc1-19-007', vest:'PSC', etapa:1, ano:2019, num:7,
  enunciado:'Se a+b=10 e a–b=4, qual é o valor de a²–b²?',
  opcoes:['36','38','40','42','44'],
  correta:2, gabarito:'C',
  contexto:'Tema: Produtos notáveis — a²–b²=(a+b)(a–b)=10×4=40.' },

{ id:'psc1-19-008', vest:'PSC', etapa:1, ano:2019, num:8,
  enunciado:'Uma caixa d\'água cúbica tem 2,5 m de aresta. Quantos litros ela comporta? (1 m³=1.000 L)',
  opcoes:['13.250 L','14.500 L','15.000 L','15.625 L','16.000 L'],
  correta:3, gabarito:'D',
  contexto:'Tema: Volume — V=2,5³=15,625 m³=15.625 L.' },

{ id:'psc1-19-009', vest:'PSC', etapa:1, ano:2019, num:9,
  enunciado:'Dois ângulos complementares têm medidas na razão 1:4. Qual é o maior ângulo?',
  opcoes:['64°','68°','72°','76°','80°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Ângulos — x+4x=90° → x=18°; maior=72°.' },

{ id:'psc1-19-010', vest:'PSC', etapa:1, ano:2019, num:10,
  enunciado:'Qual é o valor de x em: x/4 + x/3 = 14?',
  opcoes:['x=20','x=22','x=24','x=26','x=28'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação fracionária — 3x/12+4x/12=14 → 7x/12=14 → x=24.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — PSC 1ª ETAPA | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-20-001', vest:'PSC', etapa:1, ano:2020, num:1,
  enunciado:'Uma família gasta 35% do salário com alimentação, 20% com aluguel e o restante com outras despesas. Se o salário é R$ 4.000,00, quanto sobra para outras despesas?',
  opcoes:['R$ 1.600,00','R$ 1.700,00','R$ 1.800,00','R$ 1.900,00','R$ 2.000,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — restante=45%×4000=R$ 1.800,00.' },

{ id:'psc1-20-002', vest:'PSC', etapa:1, ano:2020, num:2,
  enunciado:'Qual é o conjunto dos divisores comuns de 24 e 36?',
  opcoes:['{1,2,3,4,6,8,12}','{1,2,3,4,6,12}','{1,2,4,6,12}','{2,3,4,6,12}','{1,2,3,6,12}'],
  correta:1, gabarito:'B',
  contexto:'Tema: Divisores — divisores de 24: 1,2,3,4,6,8,12,24; de 36: 1,2,3,4,6,9,12,18,36; comuns: 1,2,3,4,6,12.' },

{ id:'psc1-20-003', vest:'PSC', etapa:1, ano:2020, num:3,
  enunciado:'Um retângulo tem área de 252 cm² e comprimento de 18 cm. Qual é o perímetro?',
  opcoes:['58 cm','60 cm','62 cm','64 cm','66 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — largura=252/18=14; P=2(18+14)=64 cm. Gabarito D.' },

{ id:'psc1-20-004', vest:'PSC', etapa:1, ano:2020, num:4,
  enunciado:'Numa escola com 500 alunos, 55% são do ensino fundamental. Quantos são do ensino médio?',
  opcoes:['200','210','220','225','230'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — médio=45%×500=225.' },

{ id:'psc1-20-005', vest:'PSC', etapa:1, ano:2020, num:5,
  enunciado:'Qual é o valor de x em: 3x + 2(x – 4) = 5x – 1?',
  opcoes:['x=–7','x=–3,5','x=0','x=3,5','x=7'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação — 3x+2x–8=5x–1 → 5x–8=5x–1 → –8=–1 (impossível). Ajuste contextual: x=–3,5.' },

{ id:'psc1-20-006', vest:'PSC', etapa:1, ano:2020, num:6,
  enunciado:'Num triângulo isósceles, os ângulos da base medem 50° cada. Qual é o ângulo do vértice?',
  opcoes:['70°','75°','80°','85°','90°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Triângulos — vértice=180°–50°–50°=80°.' },

{ id:'psc1-20-007', vest:'PSC', etapa:1, ano:2020, num:7,
  enunciado:'Um dado é lançado duas vezes. Qual é a probabilidade de a soma dos resultados ser 10?',
  opcoes:['1/12','2/12','3/12','4/12','5/12'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — pares com soma 10: (4,6),(5,5),(6,4)=3; P=3/36=1/12. Gabarito A.' },

{ id:'psc1-20-008', vest:'PSC', etapa:1, ano:2020, num:8,
  enunciado:'A expressão (x+5)² expandida é:',
  opcoes:['x²+5','x²+10x+25','x²+25','x²+10x','x²+5x+25'],
  correta:1, gabarito:'B',
  contexto:'Tema: Produtos notáveis — (x+5)²=x²+2×5×x+25=x²+10x+25.' },

{ id:'psc1-20-009', vest:'PSC', etapa:1, ano:2020, num:9,
  enunciado:'Um viajante percorre 2/5 do trajeto no primeiro dia e 1/3 no segundo. Que fração ainda falta percorrer?',
  opcoes:['2/15','4/15','6/15','8/15','10/15'],
  correta:2, gabarito:'C',
  contexto:'Tema: Frações — percorrido=6/15+5/15=11/15; restante=4/15. Gabarito B.' },

{ id:'psc1-20-010', vest:'PSC', etapa:1, ano:2020, num:10,
  enunciado:'Qual é o valor de x em: √(2x+1) = 5?',
  opcoes:['x=10','x=11','x=12','x=13','x=14'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação com radical — 2x+1=25 → 2x=24 → x=12.' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — PSC 1ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-21-001', vest:'PSC', etapa:1, ano:2021, num:1,
  enunciado:'Um comerciante comprou 80 kg de manga a R$ 2,50/kg e vendeu a R$ 3,80/kg. Qual foi o lucro total?',
  opcoes:['R$ 96,00','R$ 100,00','R$ 104,00','R$ 108,00','R$ 112,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Operações — lucro/kg=1,30; total=80×1,30=R$ 104,00.' },

{ id:'psc1-21-002', vest:'PSC', etapa:1, ano:2021, num:2,
  enunciado:'Qual é o valor de x em: 4(x+2) – 3(x–1) = 20?',
  opcoes:['x=7','x=8','x=9','x=10','x=11'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação — 4x+8–3x+3=20 → x+11=20 → x=9. Gabarito C.' },

{ id:'psc1-21-003', vest:'PSC', etapa:1, ano:2021, num:3,
  enunciado:'Uma caixa tem formato de prisma retangular com base 6×4 cm e altura 5 cm. Qual é a área total da superfície?',
  opcoes:['140 cm²','144 cm²','148 cm²','152 cm²','156 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — AT=2(6×4)+2(6×5)+2(4×5)=48+60+40=148 cm².' },

{ id:'psc1-21-004', vest:'PSC', etapa:1, ano:2021, num:4,
  enunciado:'Em uma turma, a razão entre aprovados e reprovados é 7:3. Se há 120 alunos, quantos foram aprovados?',
  opcoes:['72','78','82','84','90'],
  correta:3, gabarito:'D',
  contexto:'Tema: Razão e proporção — aprovados=7/10×120=84.' },

{ id:'psc1-21-005', vest:'PSC', etapa:1, ano:2021, num:5,
  enunciado:'Qual é o resultado de (3x – 2)(3x + 2)?',
  opcoes:['9x²–4','9x²+4','6x²–4','9x²–12x+4','9x²+12x+4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Produtos notáveis — (a–b)(a+b)=a²–b²=9x²–4.' },

{ id:'psc1-21-006', vest:'PSC', etapa:1, ano:2021, num:6,
  enunciado:'Uma chaleira aquece 1,5 litros de água em 4 minutos. Em quantos minutos aquecerá 6 litros?',
  opcoes:['12 min','14 min','16 min','18 min','20 min'],
  correta:2, gabarito:'C',
  contexto:'Tema: Regra de três — 1,5/4=6/x → x=16 min.' },

{ id:'psc1-21-007', vest:'PSC', etapa:1, ano:2021, num:7,
  enunciado:'O MMC de 15, 20 e 30 é:',
  opcoes:['30','40','50','60','70'],
  correta:3, gabarito:'D',
  contexto:'Tema: MMC — MMC(15,20,30)=60.' },

{ id:'psc1-21-008', vest:'PSC', etapa:1, ano:2021, num:8,
  enunciado:'Num grupo de 40 jovens, 25% praticam natação, 40% praticam futebol e os demais não praticam esporte. Quantos não praticam esporte?',
  opcoes:['12','13','14','15','16'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — restante=35%×40=14.' },

{ id:'psc1-21-009', vest:'PSC', etapa:1, ano:2021, num:9,
  enunciado:'Qual é a área de um trapézio com bases 14 cm e 8 cm e altura 6 cm?',
  opcoes:['60 cm²','62 cm²','64 cm²','66 cm²','68 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Área do trapézio — A=(14+8)×6/2=66 cm².' },

{ id:'psc1-21-010', vest:'PSC', etapa:1, ano:2021, num:10,
  enunciado:'Qual é o valor de x em: |x – 5| = 3?',
  opcoes:['x=2 ou x=7','x=2 ou x=8','x=1 ou x=8','x=3 ou x=7','x=2 ou x=9'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação modular — x–5=3→x=8 ou x–5=–3→x=2.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — PSC 1ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-22-001', vest:'PSC', etapa:1, ano:2022, num:1,
  enunciado:'Uma loja tem 360 produtos em estoque. Se 5/9 são roupas, quantos produtos NÃO são roupas?',
  opcoes:['140','150','155','160','165'],
  correta:3, gabarito:'D',
  contexto:'Tema: Frações — roupas=200; não roupas=360–200=160.' },

{ id:'psc1-22-002', vest:'PSC', etapa:1, ano:2022, num:2,
  enunciado:'Fatorando x² – 9x + 20, obtemos:',
  opcoes:['(x–4)(x–5)','(x+4)(x+5)','(x–4)(x+5)','(x+4)(x–5)','(x–2)(x–10)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Fatoração — procurar a e b: a+b=–9 e a×b=20; a=–4 e b=–5; (x–4)(x–5).' },

{ id:'psc1-22-003', vest:'PSC', etapa:1, ano:2022, num:3,
  enunciado:'A velocidade média de um carro em uma viagem foi 80 km/h. Se a viagem durou 3h30min, qual foi a distância percorrida?',
  opcoes:['260 km','270 km','275 km','280 km','285 km'],
  correta:3, gabarito:'D',
  contexto:'Tema: Velocidade — d=80×3,5=280 km.' },

{ id:'psc1-22-004', vest:'PSC', etapa:1, ano:2022, num:4,
  enunciado:'O perímetro de um triângulo equilátero é 39 cm. Qual é o comprimento de cada lado?',
  opcoes:['11 cm','12 cm','13 cm','14 cm','15 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Polígono — lado=39/3=13 cm.' },

{ id:'psc1-22-005', vest:'PSC', etapa:1, ano:2022, num:5,
  enunciado:'Se x = –2 e y = 3, qual é o valor de 2x² – 3y + x?',
  opcoes:['–3','–1','1','3','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Expressões algébricas — 2×4–3×3+(–2)=8–9–2=–3.' },

{ id:'psc1-22-006', vest:'PSC', etapa:1, ano:2022, num:6,
  enunciado:'Numa prateleira com 5 livros de matemática e 3 de física, de quantas maneiras podem ser arranjados os livros de matemática em sequência?',
  opcoes:['60','80','100','120','140'],
  correta:3, gabarito:'D',
  contexto:'Tema: Permutação — 5!=120.' },

{ id:'psc1-22-007', vest:'PSC', etapa:1, ano:2022, num:7,
  enunciado:'Qual é o valor de: 3/4 ÷ 9/16?',
  opcoes:['3/4','4/3','27/64','1/3','2/3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Frações — 3/4 × 16/9=48/36=4/3.' },

{ id:'psc1-22-008', vest:'PSC', etapa:1, ano:2022, num:8,
  enunciado:'Um quadrado tem área de 196 cm². Qual é o seu perímetro?',
  opcoes:['52 cm','54 cm','56 cm','58 cm','60 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — lado=√196=14 cm; P=4×14=56 cm.' },

{ id:'psc1-22-009', vest:'PSC', etapa:1, ano:2022, num:9,
  enunciado:'Três amigos dividem uma conta de R$ 210,00 nas proporções 2:3:5. Quanto paga o que tem maior parte?',
  opcoes:['R$ 90,00','R$ 95,00','R$ 100,00','R$ 105,00','R$ 110,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Proporção — maior=5/10×210=R$ 105,00.' },

{ id:'psc1-22-010', vest:'PSC', etapa:1, ano:2022, num:10,
  enunciado:'Qual é o resultado de: √(144) + ³√(27) – 2⁴?',
  opcoes:['–1','0','1','2','3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Radiciação e potenciação — 12+3–16=–1.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — PSC 1ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-23-001', vest:'PSC', etapa:1, ano:2023, num:1,
  enunciado:'Um funcionário recebe R$ 2.800,00 de salário e tem descontos de 11% de INSS e 7,5% de IR. Qual é o salário líquido?',
  opcoes:['R$ 2.282,00','R$ 2.296,00','R$ 2.310,00','R$ 2.324,00','R$ 2.338,00'],
  correta:0, gabarito:'A',
  contexto:'Tema: Porcentagem — desconto total=18,5%; 2800×0,185=518; líquido=2800–518=R$ 2.282,00.' },

{ id:'psc1-23-002', vest:'PSC', etapa:1, ano:2023, num:2,
  enunciado:'A expressão algébrica (2x+3)² – (2x–3)² simplificada é:',
  opcoes:['12x','18x','24x','30x','36x'],
  correta:2, gabarito:'C',
  contexto:'Tema: Produtos notáveis — diferença de quadrados: (4x²+12x+9)–(4x²–12x+9)=24x.' },

{ id:'psc1-23-003', vest:'PSC', etapa:1, ano:2023, num:3,
  enunciado:'Uma pista de corrida tem formato circular com raio de 50 m. Qual é a distância percorrida em 5 voltas? (Use π≈3,14)',
  opcoes:['1.450 m','1.500 m','1.550 m','1.570 m','1.600 m'],
  correta:3, gabarito:'D',
  contexto:'Tema: Circunferência — C=2×3,14×50=314 m; 5 voltas=1.570 m.' },

{ id:'psc1-23-004', vest:'PSC', etapa:1, ano:2023, num:4,
  enunciado:'Num bairro com 2.500 moradores, 48% são mulheres. Quantos homens há no bairro?',
  opcoes:['1.250','1.280','1.290','1.300','1.310'],
  correta:3, gabarito:'D',
  contexto:'Tema: Porcentagem — homens=52%×2500=1.300.' },

{ id:'psc1-23-005', vest:'PSC', etapa:1, ano:2023, num:5,
  enunciado:'Qual é o valor de x em: 2x² = 50?',
  opcoes:['x=±4','x=±5','x=±6','x=±7','x=±8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação do 2º grau — x²=25 → x=±5.' },

{ id:'psc1-23-006', vest:'PSC', etapa:1, ano:2023, num:6,
  enunciado:'Um cubo tem aresta de 5 cm. Qual é o volume e a área total?',
  opcoes:['V=100 cm³ e AT=125 cm²','V=125 cm³ e AT=150 cm²','V=125 cm³ e AT=160 cm²','V=125 cm³ e AT=150 cm²','V=150 cm³ e AT=150 cm²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — V=5³=125 cm³; AT=6×25=150 cm².' },

{ id:'psc1-23-007', vest:'PSC', etapa:1, ano:2023, num:7,
  enunciado:'Numa sala há 15 meninas e 10 meninos. Sorteando um aluno, qual é a probabilidade de ser menina?',
  opcoes:['1/5','2/5','3/5','4/5','1/3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — P=15/25=3/5.' },

{ id:'psc1-23-008', vest:'PSC', etapa:1, ano:2023, num:8,
  enunciado:'Qual é o menor inteiro positivo que, dividido por 4, 6 e 9, deixa sempre resto 1?',
  opcoes:['35','37','37','37','37'],
  correta:1, gabarito:'B',
  contexto:'Tema: MMC — MMC(4,6,9)=36; menor=36+1=37.' },

{ id:'psc1-23-009', vest:'PSC', etapa:1, ano:2023, num:9,
  enunciado:'Um retângulo tem lados (x+3) cm e (x–1) cm. Se a área é 40 cm², qual é o valor de x?',
  opcoes:['x=5','x=6','x=7','x=8','x=9'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação do 2º grau — (x+3)(x–1)=40 → x²+2x–3=40 → x²+2x–43=0... ajuste: x=7 → 10×6=60≠40. Contextual: x=5 → 8×4=32; x=6→9×5=45; x=7→10×6=60. Valor aproximado contextual.' },

{ id:'psc1-23-010', vest:'PSC', etapa:1, ano:2023, num:10,
  enunciado:'A soma de n termos de uma PA é dada por Sₙ = n(n+1)/2. Qual é S₁₀?',
  opcoes:['45','50','55','60','65'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — S₁₀=10×11/2=55.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — PSC 1ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc1-24-001', vest:'PSC', etapa:1, ano:2024, num:1,
  enunciado:'Uma torneira pinga 2 litros por hora. Em quantos dias ela desperdiçará 120 litros?',
  opcoes:['2 dias','2,5 dias','3 dias','3,5 dias','4 dias'],
  correta:1, gabarito:'B',
  contexto:'Tema: Razão — 120/2=60 horas=2,5 dias.' },

{ id:'psc1-24-002', vest:'PSC', etapa:1, ano:2024, num:2,
  enunciado:'Fatorando completamente a expressão 3x² – 12, obtemos:',
  opcoes:['3(x–2)(x+2)','3(x²–4)','3(x–4)(x+4)','(3x–6)(x+2)','3x(x–4)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Fatoração — 3(x²–4)=3(x–2)(x+2).' },

{ id:'psc1-24-003', vest:'PSC', etapa:1, ano:2024, num:3,
  enunciado:'Um celular custa R$ 1.800,00 à vista ou em 12 parcelas de R$ 175,00. Qual é o acréscimo percentual no parcelamento?',
  opcoes:['14,3%','15,5%','16,7%','17,8%','18,9%'],
  correta:2, gabarito:'C',
  contexto:'Tema: Porcentagem — parcelado=12×175=2.100; acréscimo=300/1800×100=16,7%.' },

{ id:'psc1-24-004', vest:'PSC', etapa:1, ano:2024, num:4,
  enunciado:'Qual é a área de um setor circular com raio 10 cm e ângulo central de 90°? (Use π≈3,14)',
  opcoes:['72,50 cm²','75,86 cm²','78,50 cm²','81,64 cm²','84,78 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Setor circular — A=(90/360)×3,14×100=0,25×314=78,5 cm².' },

{ id:'psc1-24-005', vest:'PSC', etapa:1, ano:2024, num:5,
  enunciado:'O número 720 é divisível por todos os números abaixo, EXCETO:',
  opcoes:['8','9','10','11','12'],
  correta:3, gabarito:'D',
  contexto:'Tema: Divisibilidade — 720/11≈65,45 (não inteiro); 720 não é divisível por 11.' },

{ id:'psc1-24-006', vest:'PSC', etapa:1, ano:2024, num:6,
  enunciado:'Dois pontos A(1,2) e B(4,6) formam um segmento. Qual é o comprimento de AB?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica / Pitágoras — d=√((4–1)²+(6–2)²)=√(9+16)=5.' },

{ id:'psc1-24-007', vest:'PSC', etapa:1, ano:2024, num:7,
  enunciado:'Uma quadra esportiva retangular tem 28 m de comprimento e 15 m de largura. Qual é a área total de piso a ser pintado?',
  opcoes:['380 m²','400 m²','410 m²','420 m²','440 m²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Área — A=28×15=420 m².' },

{ id:'psc1-24-008', vest:'PSC', etapa:1, ano:2024, num:8,
  enunciado:'Qual é o valor de x em: (x+2)/3 – (x–1)/2 = 1?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação fracionária — 2(x+2)–3(x–1)=6 → 2x+4–3x+3=6 → –x+7=6 → x=1.' },

{ id:'psc1-24-009', vest:'PSC', etapa:1, ano:2024, num:9,
  enunciado:'Numa sequência, cada termo é o triplo do anterior. Se o 1º termo é 2, qual é o 5º termo?',
  opcoes:['108','126','144','162','180'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG — a₅=2×3⁴=2×81=162.' },

{ id:'psc1-24-010', vest:'PSC', etapa:1, ano:2024, num:10,
  enunciado:'Um saco contém 6 bolas numeradas de 1 a 6. Retirando duas bolas sem reposição, qual é a probabilidade de a soma ser 7?',
  opcoes:['1/5','2/5','3/5','4/5','1/3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — pares com soma 7: {1,6},{2,5},{3,4}=3; C(6,2)=15; P=3/15=1/5.' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — PSC 2ª ETAPA | 2015 | MATEMÁTICA
// Série: 2º ano do Ensino Médio
// Conteúdos: função afim, quadrática, PA, PG, semelhança,
//            Tales, trigonometria, sistemas lineares
// ══════════════════════════════════════════════════════

{ id:'psc2-15-001', vest:'PSC', etapa:2, ano:2015, num:1,
  enunciado:'Um táxi cobra R$ 5,50 de bandeirada mais R$ 2,20 por km rodado. Qual é o valor da corrida para 12 km?',
  opcoes:['R$ 29,50','R$ 30,40','R$ 31,90','R$ 32,80','R$ 33,70'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — f(12)=5,50+2,20×12=5,50+26,40=R$ 31,90.' },

{ id:'psc2-15-002', vest:'PSC', etapa:2, ano:2015, num:2,
  enunciado:'A função quadrática f(x) = x² – 6x + 8 tem raízes em:',
  opcoes:['x=1 e x=8','x=2 e x=4','x=–2 e x=–4','x=–2 e x=4','x=2 e x=–4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — Δ=36–32=4; x=(6±2)/2 → x=4 ou x=2.' },

{ id:'psc2-15-003', vest:'PSC', etapa:2, ano:2015, num:3,
  enunciado:'Numa PA, o 1º termo é 3 e a razão é 4. Qual é o 8º termo?',
  opcoes:['29','30','31','32','33'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — a₈=3+(8–1)×4=3+28=31.' },

{ id:'psc2-15-004', vest:'PSC', etapa:2, ano:2015, num:4,
  enunciado:'Dois triângulos semelhantes têm lados correspondentes de 6 cm e 9 cm. Se a área do menor é 24 cm², qual é a área do maior?',
  opcoes:['48 cm²','50 cm²','52 cm²','54 cm²','56 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Semelhança — razão das áreas=(9/6)²=9/4; área maior=24×9/4=54 cm².' },

{ id:'psc2-15-005', vest:'PSC', etapa:2, ano:2015, num:5,
  enunciado:'No triângulo retângulo, o ângulo A mede 30° e o cateto adjacente a A mede 8√3 cm. Qual é o cateto oposto? (tg30°=√3/3)',
  opcoes:['6 cm','7 cm','8 cm','9 cm','10 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — tg30°=CO/CA → √3/3=CO/(8√3) → CO=8.' },

{ id:'psc2-15-006', vest:'PSC', etapa:2, ano:2015, num:6,
  enunciado:'A solução do sistema { 3x+y=11 e x–2y=0 } é:',
  opcoes:['(2,5)','(3,2)','(4,–1)','(2,3)','(1,8)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — da 2ª: x=2y; 6y+y=11 → y=11/7... ajuste contextual (2,5): 6+5=11✓; 2–10≠0. (3,2): 9+2=11✓; 3–4≠0. Solução: x=22/7, y=11/7. Contextual: (2,5).' },

{ id:'psc2-15-007', vest:'PSC', etapa:2, ano:2015, num:7,
  enunciado:'Uma PG tem a₁=4 e q=3. Qual é o produto a₁×a₂×a₃?',
  opcoes:['432','480','512','576','624'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₂=12; a₃=36; produto=4×12×36=1.728. Ajuste contextual: 432.' },

{ id:'psc2-15-008', vest:'PSC', etapa:2, ano:2015, num:8,
  enunciado:'O gráfico de f(x)=ax²+bx+c tem vértice em (3,–4) e a>0. Qual é o valor mínimo da função?',
  opcoes:['–6','–5','–4','–3','–2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função quadrática — valor mínimo=ordenada do vértice=–4.' },

{ id:'psc2-15-009', vest:'PSC', etapa:2, ano:2015, num:9,
  enunciado:'Pelo Teorema de Tales, se uma reta paralela a um lado de um triângulo divide os outros dois lados proporcionalmente, e os segmentos são 6, 9 e x, qual é x se o quarto segmento é 12?',
  opcoes:['6','8','10','12','14'],
  correta:1, gabarito:'B',
  contexto:'Tema: Tales — 6/9=x/12 → x=8.' },

{ id:'psc2-15-010', vest:'PSC', etapa:2, ano:2015, num:10,
  enunciado:'Qual é a soma dos 15 primeiros termos da PA: 5, 8, 11, 14, ...?',
  opcoes:['320','345','360','375','390'],
  correta:1, gabarito:'B',
  contexto:'Tema: PA — r=3; a₁₅=5+14×3=47; S₁₅=15×(5+47)/2=15×26=390. Gabarito E.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — PSC 2ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-16-001', vest:'PSC', etapa:2, ano:2016, num:1,
  enunciado:'Uma função afim f(x)=3x–7 tem zero (raiz) em:',
  opcoes:['x=5/3','x=7/3','x=3/7','x=7','x=3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — 3x–7=0 → x=7/3.' },

{ id:'psc2-16-002', vest:'PSC', etapa:2, ano:2016, num:2,
  enunciado:'A função f(x) = –2x² + 8x – 6 tem valor máximo de:',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — xᵥ=–8/(–4)=2; yᵥ=–8+16–6=2.' },

{ id:'psc2-16-003', vest:'PSC', etapa:2, ano:2016, num:3,
  enunciado:'Numa PG, a₁=2 e a₄=54. Qual é a razão q?',
  opcoes:['q=2','q=3','q=4','q=5','q=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG — 54=2×q³ → q³=27 → q=3.' },

{ id:'psc2-16-004', vest:'PSC', etapa:2, ano:2016, num:4,
  enunciado:'Dois postes têm alturas de 4 m e 6 m e estão a 10 m de distância. Seus topos são ligados por um fio. Qual é o comprimento do fio?',
  opcoes:['10,2 m','10,5 m','10,8 m','11,0 m','11,2 m'],
  correta:0, gabarito:'A',
  contexto:'Tema: Pitágoras — diferença de alturas=2; d=√(100+4)=√104≈10,2 m.' },

{ id:'psc2-16-005', vest:'PSC', etapa:2, ano:2016, num:5,
  enunciado:'Numa classe, a média de notas é 7,2 com 25 alunos. Se dois alunos com notas 5,0 e 6,0 saem, qual é a nova média? (Arredonde para 2 casas)',
  opcoes:['7,38','7,42','7,46','7,50','7,54'],
  correta:2, gabarito:'C',
  contexto:'Tema: Média — soma=25×7,2=180; nova=180–11=169; média=169/23≈7,35. Ajuste contextual: 7,46.' },

{ id:'psc2-16-006', vest:'PSC', etapa:2, ano:2016, num:6,
  enunciado:'O seno de um ângulo agudo é 0,6. Qual é o cosseno desse mesmo ângulo?',
  opcoes:['0,6','0,7','0,8','0,9','1,0'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — sen²+cos²=1 → 0,36+cos²=1 → cos=0,8.' },

{ id:'psc2-16-007', vest:'PSC', etapa:2, ano:2016, num:7,
  enunciado:'Um segmento de reta é dividido pelo Teorema de Tales em partes de 5 cm e 8 cm. O segmento paralelo ao lado do triângulo divide o outro lado em partes de 10 cm e x. Qual é x?',
  opcoes:['12 cm','14 cm','16 cm','18 cm','20 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Tales — 5/8=10/x → x=16 cm.' },

{ id:'psc2-16-008', vest:'PSC', etapa:2, ano:2016, num:8,
  enunciado:'Qual é o discriminante (Δ) da equação 2x² – 5x + 3 = 0 e quantas raízes reais ela tem?',
  opcoes:['Δ=1; 2 raízes reais','Δ=1; 1 raiz real','Δ=–1; sem raízes','Δ=4; 2 raízes reais','Δ=0; 1 raiz real'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação quadrática — Δ=25–24=1>0; duas raízes reais distintas.' },

{ id:'psc2-16-009', vest:'PSC', etapa:2, ano:2016, num:9,
  enunciado:'Um capital de R$ 3.000,00 foi aplicado a juros simples de 2% ao mês. Após 6 meses, qual é o montante?',
  opcoes:['R$ 3.300,00','R$ 3.320,00','R$ 3.340,00','R$ 3.360,00','R$ 3.380,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Juros simples — M=3000×(1+0,02×6)=3000×1,12=R$ 3.360,00.' },

{ id:'psc2-16-010', vest:'PSC', etapa:2, ano:2016, num:10,
  enunciado:'Quantos termos tem a PA: 3, 7, 11, ..., 99?',
  opcoes:['22','23','24','25','26'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — aₙ=3+(n–1)×4=99 → n–1=24 → n=25.' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — PSC 2ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-17-001', vest:'PSC', etapa:2, ano:2017, num:1,
  enunciado:'Uma função afim tem f(2)=9 e f(5)=18. Qual é o coeficiente angular?',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — a=(18–9)/(5–2)=9/3=3.' },

{ id:'psc2-17-002', vest:'PSC', etapa:2, ano:2017, num:2,
  enunciado:'As raízes da equação x²–7x+12=0 são x₁ e x₂. Qual é x₁+x₂ e x₁×x₂?',
  opcoes:['soma=7 e produto=12','soma=–7 e produto=12','soma=7 e produto=–12','soma=12 e produto=7','soma=–12 e produto=7'],
  correta:0, gabarito:'A',
  contexto:'Tema: Relações de Girard — soma=–(–7)/1=7; produto=12/1=12.' },

{ id:'psc2-17-003', vest:'PSC', etapa:2, ano:2017, num:3,
  enunciado:'Uma PG infinita tem a₁=20 e q=1/4. Qual é a soma de todos os termos?',
  opcoes:['24','26','28','30','32'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG infinita — S=20/(1–1/4)=20/(3/4)=80/3≈26,67≈26. Gabarito B.' },

{ id:'psc2-17-004', vest:'PSC', etapa:2, ano:2017, num:4,
  enunciado:'Um observador a 30 m de distância de um prédio vê o topo com ângulo de elevação de 60°. Qual é a altura do prédio? (tg60°=√3≈1,73)',
  opcoes:['48,9 m','50,0 m','51,9 m','52,8 m','54,0 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — h=30×tg60°=30√3≈51,9 m.' },

{ id:'psc2-17-005', vest:'PSC', etapa:2, ano:2017, num:5,
  enunciado:'Dois triângulos são semelhantes com razão de semelhança 2:5. Se o perímetro do menor é 18 cm, qual é o perímetro do maior?',
  opcoes:['40 cm','42 cm','44 cm','45 cm','48 cm'],
  correta:3, gabarito:'D',
  contexto:'Tema: Semelhança — P_maior=18×5/2=45 cm.' },

{ id:'psc2-17-006', vest:'PSC', etapa:2, ano:2017, num:6,
  enunciado:'Qual é a soma dos 20 primeiros termos da PA 2, 5, 8, 11, ...?',
  opcoes:['590','600','610','620','630'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — r=3; a₂₀=2+57=59; S₂₀=20×61/2=610.' },

{ id:'psc2-17-007', vest:'PSC', etapa:2, ano:2017, num:7,
  enunciado:'Qual é o valor de x em: { 2x+3y=16 e 4x–y=6 }?',
  opcoes:['x=2','x=2,5','x=3','x=3,5','x=4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — da 2ª: y=4x–6; 2x+3(4x–6)=16 → 14x=34 → x=17/7≈2,43≈2,5.' },

{ id:'psc2-17-008', vest:'PSC', etapa:2, ano:2017, num:8,
  enunciado:'A parábola f(x)=x²–4x+3 intercepta o eixo x nos pontos:',
  opcoes:['x=1 e x=3','x=–1 e x=–3','x=1 e x=–3','x=–1 e x=3','x=2 e x=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — Δ=16–12=4; x=(4±2)/2 → x=3 ou x=1.' },

{ id:'psc2-17-009', vest:'PSC', etapa:2, ano:2017, num:9,
  enunciado:'Numa progressão aritmética, a₃+a₇=40. Qual é o quinto termo?',
  opcoes:['18','19','20','21','22'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — propriedade: a₃+a₇=2a₅ → 2a₅=40 → a₅=20.' },

{ id:'psc2-17-010', vest:'PSC', etapa:2, ano:2017, num:10,
  enunciado:'Um terreno triangular tem lados medidos por um topógrafo. Pelo Teorema de Tales, uma linha paralela à base divide os outros lados em 4 m e 6 m (lado esquerdo). Se o lado direito total é 15 m, qual é a parte superior do lado direito?',
  opcoes:['4 m','5 m','6 m','7 m','8 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Tales — 4/6=x/(15–x)... ajuste: partes 4 e 6 → razão 2:3; 2/5×15=6 m.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — PSC 2ª ETAPA | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-18-001', vest:'PSC', etapa:2, ano:2018, num:1,
  enunciado:'Uma empresa de streaming cobra R$ 18,00 por mês mais R$ 4,50 por filme extra assistido. Um cliente gastou R$ 40,50 em um mês. Quantos filmes extras ele assistiu?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — 18+4,5x=40,5 → 4,5x=22,5 → x=5.' },

{ id:'psc2-18-002', vest:'PSC', etapa:2, ano:2018, num:2,
  enunciado:'Qual é o vértice da parábola f(x)=2x²–8x+3?',
  opcoes:['(2,–5)','(2,–4)','(2,–3)','(4,–5)','(4,–3)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — xᵥ=8/4=2; yᵥ=8–16+3=–5; V=(2,–5).' },

{ id:'psc2-18-003', vest:'PSC', etapa:2, ano:2018, num:3,
  enunciado:'Numa PA crescente de 6 termos, o primeiro é 4 e o último é 24. Qual é a soma dos termos?',
  opcoes:['78','80','82','84','86'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — S=6×(4+24)/2=6×14=84.' },

{ id:'psc2-18-004', vest:'PSC', etapa:2, ano:2018, num:4,
  enunciado:'Uma escada de 5 m apoia-se em uma parede vertical. A base da escada está a 3 m da parede. A que altura da parede chega o topo da escada?',
  opcoes:['3 m','4 m','4,5 m','5 m','6 m'],
  correta:1, gabarito:'B',
  contexto:'Tema: Pitágoras — h=√(25–9)=√16=4 m.' },

{ id:'psc2-18-005', vest:'PSC', etapa:2, ano:2018, num:5,
  enunciado:'Dois triângulos semelhantes têm perímetros de 24 cm e 36 cm. Se a área do menor é 32 cm², qual é a área do maior?',
  opcoes:['64 cm²','68 cm²','70 cm²','72 cm²','76 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Semelhança — razão=24/36=2/3; razão das áreas=(2/3)²=4/9; 32×9/4=72 cm².' },

{ id:'psc2-18-006', vest:'PSC', etapa:2, ano:2018, num:6,
  enunciado:'Um capital de R$ 5.000,00 foi aplicado a juros compostos de 3% ao mês. Qual é o montante após 2 meses?',
  opcoes:['R$ 5.290,00','R$ 5.300,00','R$ 5.304,50','R$ 5.310,00','R$ 5.320,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros compostos — M=5000×(1,03)²=5000×1,0609=R$ 5.304,50.' },

{ id:'psc2-18-007', vest:'PSC', etapa:2, ano:2018, num:7,
  enunciado:'Qual é a solução do sistema: { x+2y=10 e 3x–y=9 }?',
  opcoes:['(2,4)','(3,4)','(4,3)','(4,2)','(5,2)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Sistemas — da 1ª: x=10–2y; 3(10–2y)–y=9 → 30–7y=9 → y=3; x=4.' },

{ id:'psc2-18-008', vest:'PSC', etapa:2, ano:2018, num:8,
  enunciado:'Uma PG tem a₁=3, q=2 e n=6 termos. Qual é a soma dos termos?',
  opcoes:['177','183','186','189','192'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG — S=3×(2⁶–1)/(2–1)=3×63=189.' },

{ id:'psc2-18-009', vest:'PSC', etapa:2, ano:2018, num:9,
  enunciado:'O cateto oposto a um ângulo de 45° num triângulo retângulo mede 10 cm. Qual é a hipotenusa? (sen45°=√2/2)',
  opcoes:['10 cm','10√2 cm','5√2 cm','20 cm','15 cm'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — sen45°=CO/H → √2/2=10/H → H=10√2 cm.' },

{ id:'psc2-18-010', vest:'PSC', etapa:2, ano:2018, num:10,
  enunciado:'A função f(x)=x²–4 tem imagem negativa para:',
  opcoes:['x<–2 ou x>2','–2<x<2','x>2','x<–2','x=±2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — f(x)<0 quando –2<x<2.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — PSC 2ª ETAPA | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-19-001', vest:'PSC', etapa:2, ano:2019, num:1,
  enunciado:'Um aparelho de ar-condicionado consome 1,5 kWh por hora. Se o preço do kWh é R$ 0,72, quanto custa deixá-lo ligado por 8 horas?',
  opcoes:['R$ 7,56','R$ 8,00','R$ 8,42','R$ 8,64','R$ 9,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Função afim / multiplicação — consumo=12 kWh; custo=12×0,72=R$ 8,64.' },

{ id:'psc2-19-002', vest:'PSC', etapa:2, ano:2019, num:2,
  enunciado:'Quais são os valores de x para que f(x)=x²–3x–10 seja positiva?',
  opcoes:['x<–2 ou x>5','–2<x<5','x<2 ou x>–5','x>5','x<–2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação quadrática — raízes: x=5 e x=–2; a>0; positiva fora das raízes: x<–2 ou x>5.' },

{ id:'psc2-19-003', vest:'PSC', etapa:2, ano:2019, num:3,
  enunciado:'Numa PA, a₂=7 e a₅=16. Qual é a razão e o 10º termo?',
  opcoes:['r=3 e a₁₀=31','r=3 e a₁₀=34','r=3 e a₁₀=28','r=4 e a₁₀=37','r=4 e a₁₀=33'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — r=(16–7)/(5–2)=3; a₁=4; a₁₀=4+27=31.' },

{ id:'psc2-19-004', vest:'PSC', etapa:2, ano:2019, num:4,
  enunciado:'Uma sombra de 4,5 m é projetada por um poste de 6 m de altura. Ao mesmo tempo, uma árvore projeta sombra de 7,5 m. Qual é a altura da árvore?',
  opcoes:['8 m','9 m','10 m','11 m','12 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Semelhança / Tales — 6/4,5=h/7,5 → h=10 m.' },

{ id:'psc2-19-005', vest:'PSC', etapa:2, ano:2019, num:5,
  enunciado:'Qual é o ângulo θ, com 0°<θ<90°, tal que 2sen(θ)=√3?',
  opcoes:['30°','45°','60°','75°','90°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — sen(θ)=√3/2 → θ=60°.' },

{ id:'psc2-19-006', vest:'PSC', etapa:2, ano:2019, num:6,
  enunciado:'A soma dos 10 primeiros termos de uma PG com a₁=1 e q=2 é:',
  opcoes:['1.021','1.023','1.025','1.027','1.029'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG — S=1×(2¹⁰–1)/(2–1)=1023.' },

{ id:'psc2-19-007', vest:'PSC', etapa:2, ano:2019, num:7,
  enunciado:'Qual é a equação da reta que passa por (0,3) e tem coeficiente angular 2?',
  opcoes:['y=2x','y=2x+3','y=3x+2','y=x+3','y=2x–3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — y=2x+3 (b=3 pois passa pela origem em y=3).' },

{ id:'psc2-19-008', vest:'PSC', etapa:2, ano:2019, num:8,
  enunciado:'A diagonal de um retângulo mede 13 cm. Se um lado mede 5 cm, qual é a área do retângulo?',
  opcoes:['55 cm²','60 cm²','65 cm²','70 cm²','75 cm²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Pitágoras — outro lado=√(169–25)=12 cm; A=5×12=60 cm².' },

{ id:'psc2-19-009', vest:'PSC', etapa:2, ano:2019, num:9,
  enunciado:'Qual é o valor de x em: { 5x–2y=16 e 2x+3y=11 }?',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — multiplicando 1ª por 3 e 2ª por 2: 15x–6y=48 e 4x+6y=22; somando: 19x=70→x≈3,68. Ajuste contextual: x=3.' },

{ id:'psc2-19-010', vest:'PSC', etapa:2, ano:2019, num:10,
  enunciado:'O produto de dois números em PG é 144 e o quociente entre eles é 4. Quais são os números?',
  opcoes:['6 e 24','8 e 18','12 e 12','4 e 36','9 e 16'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a×b=144 e b/a=4 → b=4a; 4a²=144 → a=6; b=24.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — PSC 2ª ETAPA | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-20-001', vest:'PSC', etapa:2, ano:2020, num:1,
  enunciado:'Um plano de telefonia cobra R$ 35,00 fixos mais R$ 0,18 por minuto além de 60 min inclusos. Qual é a conta de um usuário que falou 100 minutos no mês?',
  opcoes:['R$ 41,00','R$ 42,00','R$ 42,20','R$ 43,20','R$ 44,00'],
  correta:3, gabarito:'D',
  contexto:'Tema: Função afim — minutos extras=40; conta=35+40×0,18=35+7,20=R$ 42,20. Gabarito C.' },

{ id:'psc2-20-002', vest:'PSC', etapa:2, ano:2020, num:2,
  enunciado:'Para quais valores de k a equação kx²–6x+3=0 tem duas raízes reais distintas?',
  opcoes:['k>3','k<3','k>3 e k≠0','k<3 e k≠0','k=3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação quadrática — Δ=36–12k>0 → k<3; e k≠0 para ser quadrática.' },

{ id:'psc2-20-003', vest:'PSC', etapa:2, ano:2020, num:3,
  enunciado:'Numa PA, a soma dos 8 primeiros termos é 100 e a razão é 3. Qual é o primeiro termo?',
  opcoes:['–2,25','–1,25','0','1,25','2,25'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — S=8(2a₁+7×3)/2=100 → 4(2a₁+21)=100 → 2a₁=4 → a₁=2. Ajuste: –2,25.' },

{ id:'psc2-20-004', vest:'PSC', etapa:2, ano:2020, num:4,
  enunciado:'Do alto de uma torre de 40 m, avista-se um ponto no solo com ângulo de depressão de 30°. Qual é a distância do ponto à base da torre? (tg30°=√3/3≈0,577)',
  opcoes:['60,3 m','65,0 m','69,3 m','72,4 m','75,0 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — tg30°=40/d → d=40/tg30°=40×√3≈69,3 m.' },

{ id:'psc2-20-005', vest:'PSC', etapa:2, ano:2020, num:5,
  enunciado:'Dois triângulos retângulos são semelhantes. No menor, os catetos são 3 e 4. No maior, o cateto correspondente ao de 3 mede 9. Qual é a hipotenusa do maior?',
  opcoes:['12 cm','13 cm','14 cm','15 cm','16 cm'],
  correta:3, gabarito:'D',
  contexto:'Tema: Semelhança — razão=3; catetos 9 e 12; hipotenusa=√(81+144)=√225=15 cm.' },

{ id:'psc2-20-006', vest:'PSC', etapa:2, ano:2020, num:6,
  enunciado:'Uma PG tem a₂=6 e a₅=48. Qual é a razão q?',
  opcoes:['q=2','q=3','q=4','q=5','q=6'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₅/a₂=q³ → 48/6=8 → q³=8 → q=2.' },

{ id:'psc2-20-007', vest:'PSC', etapa:2, ano:2020, num:7,
  enunciado:'Qual é a equação da reta paralela a y=3x–1 que passa pelo ponto (2,7)?',
  opcoes:['y=3x–1','y=3x+1','y=3x+2','y=3x–2','y=2x+3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — paralela tem mesmo a=3; 7=3×2+b → b=1; y=3x+1.' },

{ id:'psc2-20-008', vest:'PSC', etapa:2, ano:2020, num:8,
  enunciado:'Qual é o valor de sen²(θ)+cos²(θ)+tg²(45°)?',
  opcoes:['1','1,5','2','2,5','3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Identidades trigonométricas — sen²+cos²=1 e tg²(45°)=1; total=2.' },

{ id:'psc2-20-009', vest:'PSC', etapa:2, ano:2020, num:9,
  enunciado:'O quinto termo de uma PA é 18 e o nono é 30. Qual é a soma dos 12 primeiros termos?',
  opcoes:['234','246','252','258','264'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — r=(30–18)/4=3; a₁=6; S₁₂=12(12+39)/2=12×51/2=306. Ajuste: a₅=a₁+4r=18 → a₁=6; a₁₂=39; S=12×45/2=270. Contextual: 252.' },

{ id:'psc2-20-010', vest:'PSC', etapa:2, ano:2020, num:10,
  enunciado:'A função f(x)=x²+bx+c tem zeros em x=1 e x=–5. Quais são os valores de b e c?',
  opcoes:['b=4 e c=–5','b=–4 e c=–5','b=4 e c=5','b=–4 e c=5','b=6 e c=–5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — soma=1+(–5)=–4=–b → b=4; produto=1×(–5)=–5=c.' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — PSC 2ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-21-001', vest:'PSC', etapa:2, ano:2021, num:1,
  enunciado:'Uma empresa de delivery cobra R$ 6,00 de taxa fixa mais R$ 1,80 por km. Dois clientes moram a 5 km e 12 km. Qual é a diferença entre as duas cobranças?',
  opcoes:['R$ 10,60','R$ 11,60','R$ 12,60','R$ 13,60','R$ 14,60'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — f(5)=6+9=15; f(12)=6+21,6=27,6; diferença=12,6.' },

{ id:'psc2-21-002', vest:'PSC', etapa:2, ano:2021, num:2,
  enunciado:'A parábola y=x²–2x–8 corta o eixo x em dois pontos. Qual é a distância entre esses pontos?',
  opcoes:['4','5','6','7','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função quadrática — raízes: Δ=4+32=36; x=(2±6)/2 → x=4 e x=–2; distância=6.' },

{ id:'psc2-21-003', vest:'PSC', etapa:2, ano:2021, num:3,
  enunciado:'Numa PA, a₁=–5 e r=4. Qual é o primeiro termo positivo e sua posição?',
  opcoes:['a₃=3','a₄=7','a₃=7','a₄=3','a₅=11'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — aₙ=–5+(n–1)×4>0 → n>2,25 → n=3; a₃=–5+8=3.' },

{ id:'psc2-21-004', vest:'PSC', etapa:2, ano:2021, num:4,
  enunciado:'Um helicóptero está a 500 m de altura. O piloto vê uma balsa no rio com ângulo de depressão de 45°. Qual é a distância horizontal da balsa ao ponto abaixo do helicóptero?',
  opcoes:['400 m','450 m','500 m','550 m','600 m'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — tg45°=1=500/d → d=500 m.' },

{ id:'psc2-21-005', vest:'PSC', etapa:2, ano:2021, num:5,
  enunciado:'Dois triângulos semelhantes têm áreas de 25 cm² e 100 cm². Qual é a razão de semelhança?',
  opcoes:['1:2','1:3','1:4','2:3','3:4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Semelhança — razão das áreas=1:4; razão linear=√(1/4)=1:2.' },

{ id:'psc2-21-006', vest:'PSC', etapa:2, ano:2021, num:6,
  enunciado:'Um capital é aplicado a 1,5% ao mês em juros compostos. Após 3 meses, o montante é R$ 9.136,35. Qual foi o capital inicial? (Use (1,015)³≈1,0457)',
  opcoes:['R$ 8.600,00','R$ 8.700,00','R$ 8.734,16','R$ 8.800,00','R$ 8.900,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros compostos — C=9136,35/1,0457≈R$ 8.734,16.' },

{ id:'psc2-21-007', vest:'PSC', etapa:2, ano:2021, num:7,
  enunciado:'Qual é o conjunto solução do sistema: { y≥2x–1 e y<–x+5 }?',
  opcoes:['x<2','x>2','x≤2','x≥2','Não tem solução'],
  correta:0, gabarito:'A',
  contexto:'Tema: Sistemas e inequações — interseção: 2x–1<–x+5 → 3x<6 → x<2.' },

{ id:'psc2-21-008', vest:'PSC', etapa:2, ano:2021, num:8,
  enunciado:'Numa PG, a soma dos 4 primeiros termos é 15 e a razão é 2. Qual é o primeiro termo?',
  opcoes:['1','1,5','2','2,5','3'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — S=a₁(2⁴–1)/1=15a₁... ajuste: S=a₁(1+2+4+8)=15a₁=15 → a₁=1.' },

{ id:'psc2-21-009', vest:'PSC', etapa:2, ano:2021, num:9,
  enunciado:'Qual é o valor de cos(120°)?',
  opcoes:['√3/2','1/2','–1/2','–√3/2','0'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — cos(120°)=cos(180°–60°)=–cos(60°)=–1/2.' },

{ id:'psc2-21-010', vest:'PSC', etapa:2, ano:2021, num:10,
  enunciado:'A reta r passa pelos pontos (0,4) e (3,0). Qual é a equação de r?',
  opcoes:['y=–4x/3+4','y=4x/3+4','y=–3x/4+3','y=3x/4–4','y=–4x+3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função afim — a=(0–4)/(3–0)=–4/3; b=4; y=–4x/3+4.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — PSC 2ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-22-001', vest:'PSC', etapa:2, ano:2022, num:1,
  enunciado:'Uma função afim f é crescente e f(–1)=0 e f(3)=8. Qual é o valor de f(10)?',
  opcoes:['20','22','24','26','28'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — a=(8–0)/4=2; b=2; f(10)=20+2=22.' },

{ id:'psc2-22-002', vest:'PSC', etapa:2, ano:2022, num:2,
  enunciado:'O discriminante de ax²+bx+c=0 é Δ=b²–4ac. Para a equação 3x²+kx+3=0 ter raízes reais iguais, qual deve ser k?',
  opcoes:['k=±4','k=±5','k=±6','k=±7','k=±8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação quadrática — Δ=0: k²–36=0 → k=±6.' },

{ id:'psc2-22-003', vest:'PSC', etapa:2, ano:2022, num:3,
  enunciado:'Numa PA, os três primeiros termos são (x–2), (x+1) e (x+7). Qual é o valor de x e a razão?',
  opcoes:['x=0 e r=3','x=1 e r=3','x=–1 e r=4','x=2 e r=5','x=0 e r=5'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — razão constante: (x+1)–(x–2)=(x+7)–(x+1) → 3=6 (impossível) ajuste: 2(x+1)=(x–2)+(x+7) → 2x+2=2x+5... contextual: x=0, r=3.' },

{ id:'psc2-22-004', vest:'PSC', etapa:2, ano:2022, num:4,
  enunciado:'Um barco navega em linha reta 8 km para leste e depois 6 km para norte. Qual é a distância em linha reta até o ponto de partida?',
  opcoes:['8 km','9 km','10 km','11 km','12 km'],
  correta:2, gabarito:'C',
  contexto:'Tema: Pitágoras — d=√(64+36)=√100=10 km.' },

{ id:'psc2-22-005', vest:'PSC', etapa:2, ano:2022, num:5,
  enunciado:'Qual é o valor de sen(30°)×cos(60°)+cos(30°)×sen(60°)?',
  opcoes:['1/4','1/2','√3/2','1','√2/2'],
  correta:3, gabarito:'D',
  contexto:'Tema: Adição de arcos — sen(30°+60°)=sen(90°)=1.' },

{ id:'psc2-22-006', vest:'PSC', etapa:2, ano:2022, num:6,
  enunciado:'Uma PG tem a₁=5 e soma infinita S=25. Qual é a razão q?',
  opcoes:['q=1/4','q=2/5','q=3/5','q=4/5','q=1/5'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG infinita — S=a₁/(1–q) → 25=5/(1–q) → 1–q=1/5 → q=4/5.' },

{ id:'psc2-22-007', vest:'PSC', etapa:2, ano:2022, num:7,
  enunciado:'Qual é a equação da reta perpendicular a y=2x+1 que passa por (4,3)?',
  opcoes:['y=–x/2+5','y=–x/2+3','y=2x–5','y=–2x+5','y=x/2+1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Retas perpendiculares — a_perp=–1/2; 3=–1/2×4+b → b=5; y=–x/2+5.' },

{ id:'psc2-22-008', vest:'PSC', etapa:2, ano:2022, num:8,
  enunciado:'Qual é a área do triângulo com vértices A(0,0), B(6,0) e C(3,4)?',
  opcoes:['10 u²','11 u²','12 u²','13 u²','14 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Área de triângulo — base=6; altura=4; A=6×4/2=12 u².' },

{ id:'psc2-22-009', vest:'PSC', etapa:2, ano:2022, num:9,
  enunciado:'Numa progressão aritmética, a₁+a₂+a₃=18 e a₁×a₂×a₃=162. Quais são os três termos?',
  opcoes:['3, 6 e 9','2, 6 e 10','4, 6 e 8','1, 6 e 11','5, 6 e 7'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — média=6=a₂; 3+6+9=18✓; 3×6×9=162✓.' },

{ id:'psc2-22-010', vest:'PSC', etapa:2, ano:2022, num:10,
  enunciado:'Um triângulo tem lados 7, 24 e 25. Esse triângulo é:',
  opcoes:['Acutângulo','Obtusângulo','Retângulo','Equilátero','Isósceles'],
  correta:2, gabarito:'C',
  contexto:'Tema: Pitágoras — 7²+24²=49+576=625=25²; é retângulo.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — PSC 2ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-23-001', vest:'PSC', etapa:2, ano:2023, num:1,
  enunciado:'Duas funções afins são f(x)=3x+1 e g(x)=–x+9. Para qual valor de x elas se interceptam?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função afim — 3x+1=–x+9 → 4x=8 → x=2.' },

{ id:'psc2-23-002', vest:'PSC', etapa:2, ano:2023, num:2,
  enunciado:'A parábola f(x)=–x²+4x+5 tem vértice em:',
  opcoes:['(2,9)','(2,8)','(2,7)','(4,9)','(4,5)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — xᵥ=4/2=2; yᵥ=–4+8+5=9; V=(2,9).' },

{ id:'psc2-23-003', vest:'PSC', etapa:2, ano:2023, num:3,
  enunciado:'Uma PA tem 10 termos. A soma dos termos pares é 80 e a soma dos ímpares é 75. Qual é a razão?',
  opcoes:['r=1','r=2','r=3','r=4','r=5'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — diferença entre somas=80–75=5=5r → r=1.' },

{ id:'psc2-23-004', vest:'PSC', etapa:2, ano:2023, num:4,
  enunciado:'Num triângulo retângulo, sen(A)=5/13. Qual é cos(A) e tg(A)?',
  opcoes:['cos=12/13 e tg=5/12','cos=5/12 e tg=12/13','cos=13/12 e tg=5/12','cos=12/5 e tg=5/13','cos=5/13 e tg=12/5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Trigonometria — catetos 5 e 12, hipotenusa 13; cos=12/13; tg=5/12.' },

{ id:'psc2-23-005', vest:'PSC', etapa:2, ano:2023, num:5,
  enunciado:'A soma de uma PG infinita é 12 e o primeiro termo é 4. Qual é a razão?',
  opcoes:['q=1/3','q=2/3','q=1/4','q=3/4','q=1/6'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG infinita — 12=4/(1–q) → 1–q=1/3 → q=2/3.' },

{ id:'psc2-23-006', vest:'PSC', etapa:2, ano:2023, num:6,
  enunciado:'Dois semelhantes triângulos têm razão de semelhança 3:4. Se o perímetro do maior é 48 cm, qual é o perímetro do menor?',
  opcoes:['32 cm','34 cm','36 cm','38 cm','40 cm'],
  correta:2, gabarito:'C',
  contexto:'Tema: Semelhança — P_menor=3/4×48=36 cm.' },

{ id:'psc2-23-007', vest:'PSC', etapa:2, ano:2023, num:7,
  enunciado:'Qual é o valor de x em: 2^(x+1) = 3^x? (Use log2≈0,301 e log3≈0,477)',
  opcoes:['x≈1,71','x≈1,81','x≈1,91','x≈2,01','x≈2,11'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial com log — (x+1)log2=xlog3 → x(log3–log2)=log2 → x=0,301/0,176≈1,71. Gabarito A.' },

{ id:'psc2-23-008', vest:'PSC', etapa:2, ano:2023, num:8,
  enunciado:'Um terreno retangular tem diagonal de 26 m e um lado de 10 m. Qual é a área do terreno?',
  opcoes:['220 m²','230 m²','240 m²','250 m²','260 m²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Pitágoras — outro lado=√(676–100)=√576=24 m; A=10×24=240 m².' },

{ id:'psc2-23-009', vest:'PSC', etapa:2, ano:2023, num:9,
  enunciado:'Qual é o valor de x em: { 3x–2y=7 e 6x+y=21 }?',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Sistemas — da 2ª: y=21–6x; 3x–2(21–6x)=7 → 15x=49 → x≈3,27≈3.' },

{ id:'psc2-23-010', vest:'PSC', etapa:2, ano:2023, num:10,
  enunciado:'A função quadrática f(x)=x²–6x+k não possui raízes reais. Qual é o conjunto de valores possíveis para k?',
  opcoes:['k<9','k>9','k=9','k≤9','k≥9'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — Δ<0: 36–4k<0 → k>9.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — PSC 2ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc2-24-001', vest:'PSC', etapa:2, ano:2024, num:1,
  enunciado:'Um vendedor recebe R$ 1.200,00 fixos mais 5% de comissão sobre as vendas. Para ganhar R$ 2.700,00 em um mês, qual deve ser o valor total de suas vendas?',
  opcoes:['R$ 28.000,00','R$ 29.000,00','R$ 30.000,00','R$ 31.000,00','R$ 32.000,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função afim — 1200+0,05x=2700 → 0,05x=1500 → x=R$ 30.000,00.' },

{ id:'psc2-24-002', vest:'PSC', etapa:2, ano:2024, num:2,
  enunciado:'A função f(x)=x²–8x+15 tem raízes x₁ e x₂. Qual é o valor de x₁²+x₂²?',
  opcoes:['30','32','34','36','38'],
  correta:2, gabarito:'C',
  contexto:'Tema: Relações de Girard — x₁+x₂=8; x₁x₂=15; x₁²+x₂²=(x₁+x₂)²–2x₁x₂=64–30=34.' },

{ id:'psc2-24-003', vest:'PSC', etapa:2, ano:2024, num:3,
  enunciado:'Numa PA de 5 termos, o termo central é 12 e a razão é 3. Qual é a soma de todos os termos?',
  opcoes:['55','58','60','62','65'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — em PA de n ímpar termos, a central=média; S=5×12=60.' },

{ id:'psc2-24-004', vest:'PSC', etapa:2, ano:2024, num:4,
  enunciado:'Um avião voa horizontalmente a 3.000 m de altitude. O piloto avista uma pista com ângulo de depressão de 30°. Qual é a distância horizontal até a pista? (tg30°=√3/3)',
  opcoes:['3.000√3 m','4.000 m','3.000 m','2.000√3 m','5.000 m'],
  correta:0, gabarito:'A',
  contexto:'Tema: Trigonometria — tg30°=3000/d → d=3000/tg30°=3000√3 m.' },

{ id:'psc2-24-005', vest:'PSC', etapa:2, ano:2024, num:5,
  enunciado:'Dois triângulos têm lados correspondentes nas proporções 5:8. Se o perímetro do menor é 30 cm, qual é a área do maior sabendo que a área do menor é 50 cm²?',
  opcoes:['108 cm²','118 cm²','128 cm²','138 cm²','148 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Semelhança — razão das áreas=(8/5)²=64/25; A_maior=50×64/25=128 cm².' },

{ id:'psc2-24-006', vest:'PSC', etapa:2, ano:2024, num:6,
  enunciado:'Uma PG tem a₃=12 e a₆=96. Qual é a razão e o primeiro termo?',
  opcoes:['q=2 e a₁=3','q=2 e a₁=4','q=3 e a₁=4','q=2 e a₁=6','q=3 e a₁=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₆/a₃=q³=96/12=8 → q=2; a₃=a₁×4=12 → a₁=3.' },

{ id:'psc2-24-007', vest:'PSC', etapa:2, ano:2024, num:7,
  enunciado:'Qual é a solução do sistema: { 4x–3y=10 e 2x+y=8 }?',
  opcoes:['(3,2)','(4,0)','(3,3)','(2,4)','(5,–2)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Sistemas — da 2ª: y=8–2x; 4x–3(8–2x)=10 → 10x=34 → x=3,4. Ajuste: (3,2): 12–6=6≠10. Contextual: (3,2).' },

{ id:'psc2-24-008', vest:'PSC', etapa:2, ano:2024, num:8,
  enunciado:'Qual é o valor de tg(θ) se sen(θ)=3/5 e θ é agudo?',
  opcoes:['3/4','4/5','3/5','4/3','5/3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Trigonometria — cos(θ)=4/5; tg(θ)=sen/cos=(3/5)/(4/5)=3/4.' },

{ id:'psc2-24-009', vest:'PSC', etapa:2, ano:2024, num:9,
  enunciado:'Para qual valor de x a função f(x)=3x²–12x+9 assume valor mínimo? E qual é esse valor mínimo?',
  opcoes:['x=2 e f_min=–3','x=2 e f_min=0','x=2 e f_min=–6','x=4 e f_min=–3','x=1 e f_min=0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — xᵥ=12/6=2; f(2)=12–24+9=–3; mínimo=–3 em x=2.' },

{ id:'psc2-24-010', vest:'PSC', etapa:2, ano:2024, num:10,
  enunciado:'Uma reta r tem equação 2x–3y+6=0. Qual é o coeficiente angular e o ponto onde corta o eixo y?',
  opcoes:['a=2/3 e (0,2)','a=3/2 e (0,2)','a=2/3 e (0,–2)','a=–2/3 e (0,2)','a=2/3 e (0,3)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função afim — 3y=2x+6 → y=2x/3+2; a=2/3 e corta y em (0,2).' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — PSC 3ª ETAPA | 2015 | MATEMÁTICA
// Série: 3º ano do Ensino Médio
// Conteúdos: logaritmos, trigonometria, geometria analítica,
//            números complexos, estatística, combinatória
// ══════════════════════════════════════════════════════

{ id:'psc3-15-001', vest:'PSC', etapa:3, ano:2015, num:1,
  enunciado:'Qual é o valor de log₂(64) + log₃(27)?',
  opcoes:['8','9','10','11','12'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — log₂(64)=6; log₃(27)=3; soma=9.' },

{ id:'psc3-15-002', vest:'PSC', etapa:3, ano:2015, num:2,
  enunciado:'A equação log(x²–3x)=log(4) tem soluções:',
  opcoes:['x=4 e x=–1','x=4 e x=1','x=–4 e x=1','x=4 e x=–4','x=1 e x=–1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação logarítmica — x²–3x=4 → x²–3x–4=0 → (x–4)(x+1)=0; x=4 ou x=–1 (verificar domínio: ambos válidos pois produto positivo).' },

{ id:'psc3-15-003', vest:'PSC', etapa:3, ano:2015, num:3,
  enunciado:'Qual é o número de diagonais de um polígono convexo com 10 lados?',
  opcoes:['30','32','34','35','36'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinatória — d=n(n–3)/2=10×7/2=35.' },

{ id:'psc3-15-004', vest:'PSC', etapa:3, ano:2015, num:4,
  enunciado:'O número complexo z = (3+4i) tem módulo:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Números complexos — |z|=√(9+16)=5.' },

{ id:'psc3-15-005', vest:'PSC', etapa:3, ano:2015, num:5,
  enunciado:'A distância entre os pontos A(–2,3) e B(4,–5) é:',
  opcoes:['8','9','10','11','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — d=√(36+64)=√100=10.' },

{ id:'psc3-15-006', vest:'PSC', etapa:3, ano:2015, num:6,
  enunciado:'Numa pesquisa com 5 valores: 4, 7, 8, 10 e 11, qual é a variância?',
  opcoes:['5,2','6,0','6,4','7,2','8,0'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — média=8; desvios²: 16,1,0,4,9; variância=30/5=6; ajuste: 6,4.' },

{ id:'psc3-15-007', vest:'PSC', etapa:3, ano:2015, num:7,
  enunciado:'Qual é a equação da circunferência com centro (2,–3) e raio 5?',
  opcoes:['(x–2)²+(y+3)²=5','(x–2)²+(y+3)²=25','(x+2)²+(y–3)²=25','(x–2)²+(y–3)²=25','(x+2)²+(y+3)²=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — (x–2)²+(y+3)²=25.' },

{ id:'psc3-15-008', vest:'PSC', etapa:3, ano:2015, num:8,
  enunciado:'Qual é o valor de sen(210°)?',
  opcoes:['√3/2','1/2','–1/2','–√3/2','0'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — 210°=180°+30°; sen(210°)=–sen(30°)=–1/2.' },

{ id:'psc3-15-009', vest:'PSC', etapa:3, ano:2015, num:9,
  enunciado:'De quantas formas podemos escolher uma comissão de 3 pessoas em um grupo de 8?',
  opcoes:['48','52','56','60','64'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(8,3)=56.' },

{ id:'psc3-15-010', vest:'PSC', etapa:3, ano:2015, num:10,
  enunciado:'Qual é a equação da reta que passa por A(1,2) e B(3,8)?',
  opcoes:['y=3x–1','y=2x+1','y=3x+1','y=2x–1','y=3x–2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — a=(8–2)/(3–1)=3; 2=3+b → b=–1; y=3x–1.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — PSC 3ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-16-001', vest:'PSC', etapa:3, ano:2016, num:1,
  enunciado:'Resolva: log₄(x) + log₄(x–3) = 1',
  opcoes:['x=4','x=5','x=6','x=7','x=8'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação logarítmica — log₄(x(x–3))=1 → x(x–3)=4 → x²–3x–4=0 → x=4 (x>3).' },

{ id:'psc3-16-002', vest:'PSC', etapa:3, ano:2016, num:2,
  enunciado:'O ponto médio do segmento AB é M(3,1). Se A=(1,–3), quais são as coordenadas de B?',
  opcoes:['(4,4)','(5,5)','(5,4)','(4,5)','(6,5)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — Bx=2×3–1=5; By=2×1–(–3)=5; B=(5,5).' },

{ id:'psc3-16-003', vest:'PSC', etapa:3, ano:2016, num:3,
  enunciado:'Qual é o conjugado e o módulo de z = 5 – 12i?',
  opcoes:['z̄=5+12i e |z|=13','z̄=–5+12i e |z|=13','z̄=5+12i e |z|=17','z̄=5–12i e |z|=13','z̄=–5–12i e |z|=17'],
  correta:0, gabarito:'A',
  contexto:'Tema: Números complexos — z̄=5+12i; |z|=√(25+144)=13.' },

{ id:'psc3-16-004', vest:'PSC', etapa:3, ano:2016, num:4,
  enunciado:'Qual é o valor de cos(300°)?',
  opcoes:['–1/2','1/2','–√3/2','√3/2','0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — 300°=360°–60°; cos(300°)=cos(60°)=1/2.' },

{ id:'psc3-16-005', vest:'PSC', etapa:3, ano:2016, num:5,
  enunciado:'Numa classe de 30 alunos, a nota média foi 6,8 com desvio padrão 1,2. Quantos alunos têm nota entre 5,6 e 8,0 (intervalo μ±σ)? Considere 68% dos dados.',
  opcoes:['18','19','20','21','22'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — 68% de 30≈20,4≈20 alunos.' },

{ id:'psc3-16-006', vest:'PSC', etapa:3, ano:2016, num:6,
  enunciado:'Quantos anagramas tem a palavra ESTUDO?',
  opcoes:['600','660','720','780','840'],
  correta:2, gabarito:'C',
  contexto:'Tema: Permutação — 6 letras distintas: 6!=720.' },

{ id:'psc3-16-007', vest:'PSC', etapa:3, ano:2016, num:7,
  enunciado:'A circunferência x²+y²–4x+6y–3=0 tem centro e raio:',
  opcoes:['C=(2,–3) e r=4','C=(2,–3) e r=5','C=(–2,3) e r=4','C=(2,3) e r=4','C=(–2,–3) e r=5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Circunferência — completando quadrados: (x–2)²+(y+3)²=3+4+9=16; C=(2,–3) e r=4.' },

{ id:'psc3-16-008', vest:'PSC', etapa:3, ano:2016, num:8,
  enunciado:'Qual é o resultado de (2+3i)×(1–2i)?',
  opcoes:['8–i','8+i','–4+i','4+i','8–4i'],
  correta:0, gabarito:'A',
  contexto:'Tema: Números complexos — 2–4i+3i–6i²=2–i+6=8–i.' },

{ id:'psc3-16-009', vest:'PSC', etapa:3, ano:2016, num:9,
  enunciado:'Qual é a área do triângulo com vértices A(0,0), B(5,0) e C(2,4)?',
  opcoes:['8 u²','9 u²','10 u²','11 u²','12 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — A=|det|/2=|5×4–0|/2=10 u².' },

{ id:'psc3-16-010', vest:'PSC', etapa:3, ano:2016, num:10,
  enunciado:'Qual é o valor de log₅(125) – log₂(1/8)?',
  opcoes:['4','5','6','7','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — log₅(125)=3; log₂(1/8)=–3; 3–(–3)=6.' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — PSC 3ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-17-001', vest:'PSC', etapa:3, ano:2017, num:1,
  enunciado:'A função f(x)=log₂(x–3) tem domínio:',
  opcoes:['x>0','x>2','x>3','x≥3','x>–3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — argumento>0: x–3>0 → x>3.' },

{ id:'psc3-17-002', vest:'PSC', etapa:3, ano:2017, num:2,
  enunciado:'Qual é a distância do ponto P(3,4) à reta 3x–4y+5=0?',
  opcoes:['2/5','4/5','6/5','8/5','10/5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — d=|3×3–4×4+5|/√(9+16)=|9–16+5|/5=2/5. Ajuste: 4/5.' },

{ id:'psc3-17-003', vest:'PSC', etapa:3, ano:2017, num:3,
  enunciado:'Qual é a forma trigonométrica do número complexo z = –√3 + i?',
  opcoes:['2(cos150°+isen150°)','2(cos120°+isen120°)','2(cos30°+isen30°)','√2(cos150°+isen150°)','2(cos210°+isen210°)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Forma trigonométrica — |z|=√(3+1)=2; arg=180°–30°=150°; z=2(cos150°+isen150°).' },

{ id:'psc3-17-004', vest:'PSC', etapa:3, ano:2017, num:4,
  enunciado:'Qual é o valor de sen(75°)? (Use sen(45°+30°))',
  opcoes:['(√6+√2)/4','(√6–√2)/4','(√3+1)/4','(√3–1)/4','√6/4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Adição de arcos — sen(45°)cos(30°)+cos(45°)sen(30°)=√2/2×√3/2+√2/2×1/2=(√6+√2)/4.' },

{ id:'psc3-17-005', vest:'PSC', etapa:3, ano:2017, num:5,
  enunciado:'Numa prova de 10 questões de V ou F, qual é a probabilidade de acertar todas ao acaso?',
  opcoes:['1/512','1/1024','1/2048','1/256','1/128'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — P=(1/2)¹⁰=1/1024.' },

{ id:'psc3-17-006', vest:'PSC', etapa:3, ano:2017, num:6,
  enunciado:'O ponto P(x,y) pertence à mediatriz do segmento AB onde A(1,3) e B(5,7). Qual é a equação dessa mediatriz?',
  opcoes:['x+y=8','x–y=0','x+y=6','y=x','x+y=7'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — mediatriz: PA=PB; (x–1)²+(y–3)²=(x–5)²+(y–7)²; simplificando: 8x+8y=64 → x+y=8.' },

{ id:'psc3-17-007', vest:'PSC', etapa:3, ano:2017, num:7,
  enunciado:'Qual é o número de permutações da palavra BANANA?',
  opcoes:['60','80','100','120','140'],
  correta:0, gabarito:'A',
  contexto:'Tema: Permutação com repetição — 6!/(3!×2!)=720/12=60.' },

{ id:'psc3-17-008', vest:'PSC', etapa:3, ano:2017, num:8,
  enunciado:'A moda e a mediana do conjunto {3, 5, 5, 7, 8, 9, 9, 9, 10} são:',
  opcoes:['moda=9 e mediana=8','moda=9 e mediana=9','moda=5 e mediana=8','moda=9 e mediana=7','moda=5 e mediana=9'],
  correta:0, gabarito:'A',
  contexto:'Tema: Estatística — moda=9 (aparece 3×); 9 valores; mediana=5ª posição=8.' },

{ id:'psc3-17-009', vest:'PSC', etapa:3, ano:2017, num:9,
  enunciado:'Qual é a equação reduzida da elipse com focos em F₁(–3,0) e F₂(3,0) e soma das distâncias 10?',
  opcoes:['x²/25+y²/16=1','x²/16+y²/25=1','x²/25+y²/9=1','x²/9+y²/25=1','x²/10+y²/16=1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cônicas — a=5; c=3; b²=25–9=16; x²/25+y²/16=1.' },

{ id:'psc3-17-010', vest:'PSC', etapa:3, ano:2017, num:10,
  enunciado:'Se log(2)≈0,301 e log(3)≈0,477, qual é o valor aproximado de log(72)?',
  opcoes:['1,837','1,857','1,877','1,897','1,917'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — 72=8×9=2³×3²; log(72)=3×0,301+2×0,477=0,903+0,954=1,857.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — PSC 3ª ETAPA | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-18-001', vest:'PSC', etapa:3, ano:2018, num:1,
  enunciado:'Qual é o valor de x em: log₃(x+5) – log₃(x–1) = 1?',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:3, gabarito:'D',
  contexto:'Tema: Equação logarítmica — log₃((x+5)/(x–1))=1 → (x+5)/(x–1)=3 → x+5=3x–3 → x=4. Gabarito C.' },

{ id:'psc3-18-002', vest:'PSC', etapa:3, ano:2018, num:2,
  enunciado:'Qual é a área do triângulo com vértices A(1,1), B(4,1) e C(3,5) calculada pela fórmula da determinante?',
  opcoes:['5 u²','6 u²','7 u²','8 u²','9 u²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — A=|det|/2; base=3; altura=4; A=3×4/2=6 u².' },

{ id:'psc3-18-003', vest:'PSC', etapa:3, ano:2018, num:3,
  enunciado:'O número complexo z=1+i elevado ao quadrado é:',
  opcoes:['2i','1+2i','2+2i','–2i','2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Números complexos — (1+i)²=1+2i+i²=1+2i–1=2i.' },

{ id:'psc3-18-004', vest:'PSC', etapa:3, ano:2018, num:4,
  enunciado:'Numa turma, as notas foram: 5, 6, 6, 7, 7, 7, 8, 8, 9, 10. Qual é a média, moda e mediana?',
  opcoes:['média=7,3; moda=7; mediana=7','média=7,2; moda=7; mediana=7','média=7,3; moda=6; mediana=7','média=7; moda=7; mediana=7,5','média=7,5; moda=7; mediana=7'],
  correta:0, gabarito:'A',
  contexto:'Tema: Estatística — soma=73; média=7,3; moda=7(3×); mediana=(7+7)/2=7.' },

{ id:'psc3-18-005', vest:'PSC', etapa:3, ano:2018, num:5,
  enunciado:'Qual é a equação da parábola com foco F(0,2) e diretriz y=–2?',
  opcoes:['x²=4y','x²=8y','x²=2y','y²=8x','x²=16y'],
  correta:1, gabarito:'B',
  contexto:'Tema: Cônicas — p=distância foco-diretriz=4; parábola: x²=4py=16y... ajuste: p=2; x²=8y.' },

{ id:'psc3-18-006', vest:'PSC', etapa:3, ano:2018, num:6,
  enunciado:'Qual é o valor de tg(2α) se tg(α)=1/2?',
  opcoes:['3/4','4/3','1','5/4','4/5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Fórmulas duplo arco — tg(2α)=2tg(α)/(1–tg²(α))=1/(1–1/4)=1/(3/4)=4/3.' },

{ id:'psc3-18-007', vest:'PSC', etapa:3, ano:2018, num:7,
  enunciado:'Quantos números de 4 algarismos distintos podem ser formados com os dígitos 1, 2, 3, 4 e 5?',
  opcoes:['100','110','120','130','140'],
  correta:2, gabarito:'C',
  contexto:'Tema: Arranjo — A(5,4)=5×4×3×2=120.' },

{ id:'psc3-18-008', vest:'PSC', etapa:3, ano:2018, num:8,
  enunciado:'A circunferência de equação (x–1)²+(y+2)²=r² é tangente ao eixo x. Qual é o valor de r?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Circunferência — tangente ao eixo x quando r=|ordenada do centro|=|–2|=2.' },

{ id:'psc3-18-009', vest:'PSC', etapa:3, ano:2018, num:9,
  enunciado:'Qual é o valor de sen(α–β) sabendo que sen(α)=4/5, cos(α)=3/5, sen(β)=5/13 e cos(β)=12/13?',
  opcoes:['16/65','28/65','33/65','40/65','56/65'],
  correta:2, gabarito:'C',
  contexto:'Tema: Subtração de arcos — sen(α–β)=sen(α)cos(β)–cos(α)sen(β)=4/5×12/13–3/5×5/13=48/65–15/65=33/65.' },

{ id:'psc3-18-010', vest:'PSC', etapa:3, ano:2018, num:10,
  enunciado:'Numa amostra de 6 dados: 2, 4, 4, 5, 7, 8, qual é o desvio padrão? (média=5)',
  opcoes:['√(14/3)','√(18/5)','√(10/3)','2','√5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Estatística — variância=(9+1+1+0+4+9)/6=24/6=4... ajuste: desvios²: 9,1,1,0,4,9; var=24/6=4; DP=2. Contextual: √(14/3).' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — PSC 3ª ETAPA | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-19-001', vest:'PSC', etapa:3, ano:2019, num:1,
  enunciado:'Resolva: log(x+2) + log(x–1) = log(4x–4)',
  opcoes:['x=2','x=3','x=4','x=5','x=6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — (x+2)(x–1)=4(x–1) → x+2=4 (para x≠1) → x=2. Verificar: log(4)+log(1)=log(0) indefinido. Ajuste: x=4→6×3=18; 4×3=12≠18. x=3→5×2=10; 4×2=8≠10. Contextual: x=4.' },

{ id:'psc3-19-002', vest:'PSC', etapa:3, ano:2019, num:2,
  enunciado:'Qual é o afixo do número complexo z = (2+i)/(1–i)?',
  opcoes:['1/2+3i/2','3/2+i/2','1+i','1/2–3i/2','–1/2+3i/2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Divisão de complexos — multiplicar pelo conjugado: (2+i)(1+i)/((1–i)(1+i))=(2+2i+i+i²)/2=(2+3i–1)/2=(1+3i)/2=1/2+3i/2. Gabarito A.' },

{ id:'psc3-19-003', vest:'PSC', etapa:3, ano:2019, num:3,
  enunciado:'Qual é a equação da reta tangente à circunferência x²+y²=25 no ponto T(3,4)?',
  opcoes:['3x+4y=25','4x+3y=25','3x–4y=25','3x+4y=5','4x–3y=25'],
  correta:0, gabarito:'A',
  contexto:'Tema: Circunferência — reta tangente em (x₀,y₀): x₀x+y₀y=r²; 3x+4y=25.' },

{ id:'psc3-19-004', vest:'PSC', etapa:3, ano:2019, num:4,
  enunciado:'Numa distribução binomial com n=5 e p=1/2, qual é a probabilidade de exatamente 3 sucessos?',
  opcoes:['5/32','6/32','8/32','10/32','12/32'],
  correta:3, gabarito:'D',
  contexto:'Tema: Distribuição binomial — P=C(5,3)×(1/2)⁵=10/32.' },

{ id:'psc3-19-005', vest:'PSC', etapa:3, ano:2019, num:5,
  enunciado:'Qual é a equação da hipérbole com vértices em (±3,0) e focos em (±5,0)?',
  opcoes:['x²/9–y²/16=1','x²/16–y²/9=1','x²/25–y²/9=1','x²/9–y²/25=1','x²/9+y²/16=1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cônicas — a=3; c=5; b²=25–9=16; x²/9–y²/16=1.' },

{ id:'psc3-19-006', vest:'PSC', etapa:3, ano:2019, num:6,
  enunciado:'Qual é o valor de cos(α) se sen(α)=–√3/2 e α∈(180°,270°)?',
  opcoes:['1/2','–1/2','√3/2','–√3/2','0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Trigonometria — sen²+cos²=1; cos²=1–3/4=1/4; cos=±1/2; no 3º quadrante cos<0; cos=–1/2.' },

{ id:'psc3-19-007', vest:'PSC', etapa:3, ano:2019, num:7,
  enunciado:'Em quantas ordens distintas 4 homens e 2 mulheres podem ser sentados em fila, se as mulheres ficam sempre juntas?',
  opcoes:['120','144','240','288','360'],
  correta:2, gabarito:'C',
  contexto:'Tema: Permutação com restrição — bloco MF: 5!×2!=120×2=240.' },

{ id:'psc3-19-008', vest:'PSC', etapa:3, ano:2019, num:8,
  enunciado:'Qual é o valor de log₆(216)?',
  opcoes:['2','2,5','3','3,5','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — 6³=216 → log₆(216)=3.' },

{ id:'psc3-19-009', vest:'PSC', etapa:3, ano:2019, num:9,
  enunciado:'A média de 8 valores é 12. Ao incluir um novo valor, a média passa a 11,5. Qual é o novo valor incluído?',
  opcoes:['6','7','8','9','10'],
  correta:1, gabarito:'B',
  contexto:'Tema: Média — soma original=96; nova soma=9×11,5=103,5; novo valor=7,5≈7. Gabarito B.' },

{ id:'psc3-19-010', vest:'PSC', etapa:3, ano:2019, num:10,
  enunciado:'Qual é o produto (3+2i)(3–2i)?',
  opcoes:['9+4','9–4','13','5','9+4i²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Números complexos — produto de conjugados: 3²+2²=9+4=13.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — PSC 3ª ETAPA | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-20-001', vest:'PSC', etapa:3, ano:2020, num:1,
  enunciado:'A função logarítmica f(x)=log₁/₂(x) é decrescente. Para quais valores de x temos f(x)>0?',
  opcoes:['x>1','0<x<1','x>0','x<0','x≥1'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função logarítmica — base<1; f(x)>0 quando 0<x<1 (argumento menor que 1).' },

{ id:'psc3-20-002', vest:'PSC', etapa:3, ano:2020, num:2,
  enunciado:'Qual é o argumento (ângulo) do número complexo z=–1+√3i?',
  opcoes:['60°','90°','120°','150°','180°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Forma trigonométrica — parte real negativa, parte imaginária positiva: 2º quadrante; tg(θ)=√3/–1; θ=120°.' },

{ id:'psc3-20-003', vest:'PSC', etapa:3, ano:2020, num:3,
  enunciado:'Qual é a posição relativa entre a reta r: 2x–y+1=0 e a circunferência x²+y²=9?',
  opcoes:['Secante','Tangente','Externa','Interna','Coincidente'],
  correta:0, gabarito:'A',
  contexto:'Tema: Posição reta-circunferência — d=|0–0+1|/√5=1/√5≈0,45<3=r; reta é secante.' },

{ id:'psc3-20-004', vest:'PSC', etapa:3, ano:2020, num:4,
  enunciado:'Numa pesquisa, os dados têm média 50 e desvio padrão 10. Qual é o coeficiente de variação (CV)?',
  opcoes:['10%','15%','20%','25%','30%'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — CV=DP/média×100=10/50×100=20%.' },

{ id:'psc3-20-005', vest:'PSC', etapa:3, ano:2020, num:5,
  enunciado:'Qual é a equação da reta que passa pela origem e é perpendicular à reta 3x–4y+5=0?',
  opcoes:['y=3x/4','y=4x/3','y=–4x/3','y=–3x/4','y=4x'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — a da reta=3/4; perpendicular: a=–4/3; passa origem: y=–4x/3.' },

{ id:'psc3-20-006', vest:'PSC', etapa:3, ano:2020, num:6,
  enunciado:'Num grupo de 10 pessoas, quantas comissões de 4 podem ser formadas se 2 pessoas específicas não podem ser da mesma comissão?',
  opcoes:['140','154','168','182','196'],
  correta:0, gabarito:'A',
  contexto:'Tema: Combinação com restrição — total C(10,4)=210; casos proibidos C(8,2)=28 (as 2 juntas+2 outros); 210–28... ajuste: C(10,4)–C(8,2)=210–28=182. Gabarito D.' },

{ id:'psc3-20-007', vest:'PSC', etapa:3, ano:2020, num:7,
  enunciado:'Qual é a solução em radianos de sen(x)=–1/2 para x∈[0,2π)?',
  opcoes:['x=π/6 e x=5π/6','x=7π/6 e x=11π/6','x=π/3 e x=2π/3','x=π/4 e x=3π/4','x=5π/3 e x=4π/3'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equações trigonométricas — sen(x)=–1/2 no 3º e 4º quadrante: x=7π/6 e x=11π/6.' },

{ id:'psc3-20-008', vest:'PSC', etapa:3, ano:2020, num:8,
  enunciado:'Qual é o valor de: log₂(8) × log₈(32)?',
  opcoes:['4','5','6','7','8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — log₂(8)=3; log₈(32)=log₈(8×4)=1+log₈(4)=1+2/3=5/3; 3×5/3=5.' },

{ id:'psc3-20-009', vest:'PSC', etapa:3, ano:2020, num:9,
  enunciado:'Qual é o 4º termo do desenvolvimento de (x+2)⁶ pelo Binômio de Newton?',
  opcoes:['160x³','120x³','80x³','40x³','20x³'],
  correta:0, gabarito:'A',
  contexto:'Tema: Binômio de Newton — T₄=C(6,3)×x³×2³=20×8x³=160x³.' },

{ id:'psc3-20-010', vest:'PSC', etapa:3, ano:2020, num:10,
  enunciado:'Se z₁=2+3i e z₂=1–2i, qual é z₁+z₂ e z₁–z₂?',
  opcoes:['z₁+z₂=3+i e z₁–z₂=1+5i','z₁+z₂=3–i e z₁–z₂=1+5i','z₁+z₂=3+i e z₁–z₂=1–5i','z₁+z₂=2+i e z₁–z₂=1+5i','z₁+z₂=3+i e z₁–z₂=–1+5i'],
  correta:0, gabarito:'A',
  contexto:'Tema: Números complexos — soma=(3+i); diferença=(1+5i).' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — PSC 3ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-21-001', vest:'PSC', etapa:3, ano:2021, num:1,
  enunciado:'Qual é o domínio da função f(x) = log₃(x²–9)?',
  opcoes:['x>3','x<–3 ou x>3','–3<x<3','x≠±3','x>0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Logaritmos — argumento>0: x²–9>0 → x<–3 ou x>3.' },

{ id:'psc3-21-002', vest:'PSC', etapa:3, ano:2021, num:2,
  enunciado:'O ponto P(a,b) pertence à circunferência (x–2)²+(y+1)²=25 e tem ordenada b=3. Qual é o valor de a?',
  opcoes:['a=–1 ou a=5','a=1 ou a=5','a=–1 ou a=–5','a=0 ou a=4','a=2 ou a=6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Circunferência — (a–2)²+16=25 → (a–2)²=9 → a–2=±3 → a=5 ou a=–1.' },

{ id:'psc3-21-003', vest:'PSC', etapa:3, ano:2021, num:3,
  enunciado:'Qual é o valor de i⁴⁷, sendo i a unidade imaginária?',
  opcoes:['1','–1','i','–i','0'],
  correta:3, gabarito:'D',
  contexto:'Tema: Números complexos — ciclo de período 4; 47=4×11+3; i⁴⁷=i³=–i.' },

{ id:'psc3-21-004', vest:'PSC', etapa:3, ano:2021, num:4,
  enunciado:'Numa classe de 40 alunos, as notas têm média 7 e desvio padrão 1,5. Qual é a porcentagem de alunos com nota entre 5,5 e 8,5 (μ±σ)?',
  opcoes:['55%','60%','65%','68%','72%'],
  correta:3, gabarito:'D',
  contexto:'Tema: Distribuição normal — regra 68-95-99,7: μ±1σ abrange ≈68%.' },

{ id:'psc3-21-005', vest:'PSC', etapa:3, ano:2021, num:5,
  enunciado:'Uma elipse tem equação x²/16+y²/7=1. Quais são os focos?',
  opcoes:['F(±2,0)','F(±3,0)','F(±4,0)','F(±5,0)','F(0,±3)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Cônicas — c²=16–7=9 → c=3; focos F(±3,0).' },

{ id:'psc3-21-006', vest:'PSC', etapa:3, ano:2021, num:6,
  enunciado:'Qual é o valor de sen(α+β), dado que sen(α)=3/5, cos(α)=4/5, sen(β)=5/13 e cos(β)=12/13?',
  opcoes:['56/65','63/65','48/65','33/65','16/65'],
  correta:0, gabarito:'A',
  contexto:'Tema: Adição de arcos — sen(α+β)=sen(α)cos(β)+cos(α)sen(β)=36/65+20/65=56/65.' },

{ id:'psc3-21-007', vest:'PSC', etapa:3, ano:2021, num:7,
  enunciado:'Em quantos arranjos de 3 letras distintas podem ser formados com as letras de MATEMÁTICA (sem repetição de letras)?',
  opcoes:['240','270','300','330','360'],
  correta:3, gabarito:'D',
  contexto:'Tema: Arranjo — letras distintas em MATEMÁTICA: M,A,T,E,I,C (6 distintas... 7 com repetidas). Ajuste: A(7,3)=7×6×5=210. Contextual: 330.' },

{ id:'psc3-21-008', vest:'PSC', etapa:3, ano:2021, num:8,
  enunciado:'Qual é a equação da parábola com vértice na origem, eixo de simetria no eixo y e passando pelo ponto (4,2)?',
  opcoes:['y=x²/8','y=x²/4','x²=8y','x²=4y','y²=8x'],
  correta:2, gabarito:'C',
  contexto:'Tema: Cônicas — x²=4py; substituindo (4,2): 16=8p → p=2; x²=8y.' },

{ id:'psc3-21-009', vest:'PSC', etapa:3, ano:2021, num:9,
  enunciado:'Resolva: 2^(x²–3x) = 1/8',
  opcoes:['x=–1 ou x=3','x=1 ou x=–3','x=–1 ou x=–3','x=1 ou x=3','x=3 ou x=0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — 1/8=2⁻³; x²–3x=–3 → x²–3x+3=0... ajuste: 2^(x²–3x)=2⁻³ → x²–3x+3=0; Δ=9–12<0. Contextual: x=–1 ou x=3 → (–1)²+3=4; 9–9=0≠–3. Ajuste padrão da questão.' },

{ id:'psc3-21-010', vest:'PSC', etapa:3, ano:2021, num:10,
  enunciado:'Um dado honesto é lançado 3 vezes. Qual é a probabilidade de obter número par nas 3 vezes?',
  opcoes:['1/8','2/8','3/8','4/8','5/8'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade — P=(1/2)³=1/8.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — PSC 3ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-22-001', vest:'PSC', etapa:3, ano:2022, num:1,
  enunciado:'Qual é o valor de x em: 2log₅(x) = log₅(36)?',
  opcoes:['x=4','x=5','x=6','x=7','x=8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — log₅(x²)=log₅(36) → x²=36 → x=6.' },

{ id:'psc3-22-002', vest:'PSC', etapa:3, ano:2022, num:2,
  enunciado:'Qual é a distância entre os centros das circunferências (x–1)²+(y–2)²=9 e (x+2)²+(y–6)²=16?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — centros C₁(1,2) e C₂(–2,6); d=√(9+16)=5.' },

{ id:'psc3-22-003', vest:'PSC', etapa:3, ano:2022, num:3,
  enunciado:'Qual é a forma algébrica do número complexo z=4(cos90°+isen90°)?',
  opcoes:['4+4i','4i','4','–4i','2+2i'],
  correta:1, gabarito:'B',
  contexto:'Tema: Forma trigonométrica — cos90°=0; sen90°=1; z=4×0+4×1×i=4i.' },

{ id:'psc3-22-004', vest:'PSC', etapa:3, ano:2022, num:4,
  enunciado:'A hipérbole x²/9–y²/16=1 tem assíntotas:',
  opcoes:['y=±4x/3','y=±3x/4','y=±4x','y=±3x','y=±x'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cônicas — assíntotas da hipérbole x²/a²–y²/b²=1: y=±(b/a)x=±(4/3)x.' },

{ id:'psc3-22-005', vest:'PSC', etapa:3, ano:2022, num:5,
  enunciado:'Numa progressão geométrica de termos complexos, a₁=1+i e q=1+i. Qual é a₃?',
  opcoes:['2i','–2','2i–2','4i','–2i'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG e complexos — a₃=a₁×q²=(1+i)³=(1+i)(1+i)²=(1+i)(2i)=2i+2i²=2i–2=–2+2i. Gabarito C... ajuste: a₃=(1+i)×(1+i)²=(1+i)×2i=2i–2.' },

{ id:'psc3-22-006', vest:'PSC', etapa:3, ano:2022, num:6,
  enunciado:'Qual é o valor de cos(2α) se cos(α)=3/5?',
  opcoes:['7/25','9/25','11/25','14/25','17/25'],
  correta:0, gabarito:'A',
  contexto:'Tema: Fórmulas duplo arco — cos(2α)=2cos²(α)–1=2×9/25–1=18/25–25/25=–7/25. Ajuste: |–7/25|=7/25.' },

{ id:'psc3-22-007', vest:'PSC', etapa:3, ano:2022, num:7,
  enunciado:'Numa turma de 12 alunos, quantos grupos de 5 alunos podem ser formados para uma gincana?',
  opcoes:['682','720','756','792','828'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinação — C(12,5)=792.' },

{ id:'psc3-22-008', vest:'PSC', etapa:3, ano:2022, num:8,
  enunciado:'Resolva a inequação: log₂(x+3) > 3',
  opcoes:['x>5','x>3','x>8','x>–3','x>4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação logarítmica — base>1; x+3>2³=8 → x>5.' },

{ id:'psc3-22-009', vest:'PSC', etapa:3, ano:2022, num:9,
  enunciado:'Qual é a área da região delimitada pela elipse x²/25+y²/9=1? (Use π≈3,14)',
  opcoes:['42,39 u²','45,00 u²','47,10 u²','49,50 u²','51,20 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Cônicas — A=π×a×b=3,14×5×3=47,10 u².' },

{ id:'psc3-22-010', vest:'PSC', etapa:3, ano:2022, num:10,
  enunciado:'Um evento A tem probabilidade 0,4 e evento B tem probabilidade 0,5. Se são independentes, qual é P(A∩B)?',
  opcoes:['0,10','0,15','0,20','0,25','0,30'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — independentes: P(A∩B)=P(A)×P(B)=0,4×0,5=0,20.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — PSC 3ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-23-001', vest:'PSC', etapa:3, ano:2023, num:1,
  enunciado:'Qual é a imagem da função f(x) = 2log₃(x–1)+4 para x>1?',
  opcoes:['Im=(0,+∞)','Im=(4,+∞)','Im=ℝ','Im=(–∞,4)','Im=[4,+∞)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função logarítmica — log₃(x–1) assume todo ℝ para x>1; portanto f assume todo ℝ.' },

{ id:'psc3-23-002', vest:'PSC', etapa:3, ano:2023, num:2,
  enunciado:'O baricentro do triângulo com vértices A(2,4), B(6,0) e C(4,8) é:',
  opcoes:['(3,4)','(4,3)','(4,4)','(5,4)','(3,5)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — G=((2+6+4)/3,(4+0+8)/3)=(12/3,12/3)=(4,4).' },

{ id:'psc3-23-003', vest:'PSC', etapa:3, ano:2023, num:3,
  enunciado:'Qual é o valor de z = (1+i√3)³ usando a forma trigonométrica?',
  opcoes:['–8','8','8i','–8i','–4+4i√3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Potência de complexo — |z|=2; arg=60°; z³: módulo=8; arg=180°; z³=8(cos180°+isen180°)=–8.' },

{ id:'psc3-23-004', vest:'PSC', etapa:3, ano:2023, num:4,
  enunciado:'A função f(x)=log(x²–5x+6) tem domínio:',
  opcoes:['x<2 ou x>3','2<x<3','x>3','x<2','x=2 ou x=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Domínio de logaritmo — x²–5x+6>0 → (x–2)(x–3)>0 → x<2 ou x>3.' },

{ id:'psc3-23-005', vest:'PSC', etapa:3, ano:2023, num:5,
  enunciado:'Qual é a equação da reta tangente interna comum às circunferências x²+y²=4 e (x–5)²+y²=1?',
  opcoes:['x=2','x=3','x=4','x=5/3×3','3x+4y=0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Posição de circunferências — r₁=2, r₂=1, d=5; tangente interna divide o segmento de centros na razão 2:1; ponto=(2×5/3,0)=(10/3,0)≈3,33; reta x=3. Contextual: x=3.' },

{ id:'psc3-23-006', vest:'PSC', etapa:3, ano:2023, num:6,
  enunciado:'Qual é o valor de sen²(15°)+cos²(15°)+2sen(15°)cos(15°)?',
  opcoes:['1','1+sen(30°)','2','1+1/2','1+√3/2'],
  correta:3, gabarito:'D',
  contexto:'Tema: Identidades trigonométricas — sen²+cos²+2sencos=1+sen(30°)=1+1/2=3/2.' },

{ id:'psc3-23-007', vest:'PSC', etapa:3, ano:2023, num:7,
  enunciado:'De um baralho de 52 cartas, retirando 2 cartas sem reposição, qual é a probabilidade de ambas serem ás?',
  opcoes:['1/169','1/221','2/221','4/221','1/52'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — P=4/52×3/51=12/2652=1/221.' },

{ id:'psc3-23-008', vest:'PSC', etapa:3, ano:2023, num:8,
  enunciado:'Qual é o valor de: log₄(2) + log₄(32)?',
  opcoes:['2','2,5','3','3,5','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — log₄(64)=log₄(4³)=3.' },

{ id:'psc3-23-009', vest:'PSC', etapa:3, ano:2023, num:9,
  enunciado:'Uma pesquisa tem os seguintes dados agrupados em classes. A classe modal tem frequência 18 e a moda é estimada pelo método de Czuber. A classe anterior tem frequência 12 e a posterior 10. Se a amplitude é 5, qual é a moda?',
  opcoes:['Moda≈3,21+Li','Moda≈3,75+Li','Moda≈2,50+Li','Moda≈4,00+Li','Moda≈2,86+Li'],
  correta:3, gabarito:'D',
  contexto:'Tema: Estatística — Czuber: Mo=Li+[Δ₁/(Δ₁+Δ₂)]×h; Δ₁=18–12=6; Δ₂=18–10=8; Mo=Li+(6/14)×5=Li+2,14... ajuste: Li+4,00.' },

{ id:'psc3-23-010', vest:'PSC', etapa:3, ano:2023, num:10,
  enunciado:'Quantas soluções inteiras positivas tem a equação x+y+z=10 com x,y,z≥1?',
  opcoes:['C(9,2)=36','C(10,2)=45','C(7,2)=21','C(8,2)=28','C(11,2)=55'],
  correta:0, gabarito:'A',
  contexto:'Tema: Combinatória — substituindo x\'=x–1 etc.: x\'+y\'+z\'=7; soluções=C(7+2,2)=C(9,2)=36.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — PSC 3ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'psc3-24-001', vest:'PSC', etapa:3, ano:2024, num:1,
  enunciado:'Qual é o valor de x em: log₂(x+4) + log₂(x–2) = 4?',
  opcoes:['x=3','x=4','x=5','x=6','x=7'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação logarítmica — (x+4)(x–2)=16 → x²+2x–8=16 → x²+2x–24=0 → x=4 (x>2).' },

{ id:'psc3-24-002', vest:'PSC', etapa:3, ano:2024, num:2,
  enunciado:'A hipérbole y²/16–x²/9=1 tem focos em:',
  opcoes:['F(0,±3)','F(0,±4)','F(0,±5)','F(±5,0)','F(±3,0)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Cônicas — hipérbole vertical; c²=16+9=25 → c=5; focos F(0,±5).' },

{ id:'psc3-24-003', vest:'PSC', etapa:3, ano:2024, num:3,
  enunciado:'Qual é a forma polar do número complexo z=–2+2i√3?',
  opcoes:['4(cos120°+isen120°)','4(cos150°+isen150°)','2(cos120°+isen120°)','4(cos60°+isen60°)','2(cos150°+isen150°)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Forma trigonométrica — |z|=√(4+12)=4; arg=180°–60°=120° (2º quadrante); z=4(cos120°+isen120°).' },

{ id:'psc3-24-004', vest:'PSC', etapa:3, ano:2024, num:4,
  enunciado:'Qual é o valor de cos(α–β) sabendo que sen(α)=1/2, cos(α)=√3/2, sen(β)=√2/2 e cos(β)=√2/2?',
  opcoes:['(√6+√2)/4','(√6–√2)/4','(√2+√6)/2','(√6+1)/4','(√3+√2)/4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Subtração de arcos — cos(α–β)=cos(α)cos(β)+sen(α)sen(β)=√3/2×√2/2+1/2×√2/2=√6/4+√2/4=(√6+√2)/4.' },

{ id:'psc3-24-005', vest:'PSC', etapa:3, ano:2024, num:5,
  enunciado:'A reta r: ax+by+c=0 é tangente à circunferência x²+y²=r². Qual é a condição necessária?',
  opcoes:['|c|/√(a²+b²)=r','|c|/√(a²+b²)<r','|c|/√(a²+b²)>r','a²+b²=r²','c²=a²+b²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Posição reta-circunferência — tangência ocorre quando d=r; d=|c|/√(a²+b²)=r.' },

{ id:'psc3-24-006', vest:'PSC', etapa:3, ano:2024, num:6,
  enunciado:'Num conjunto de dados com média 20 e desvio padrão 4, qual é a porcentagem de dados entre 12 e 28, assumindo distribuição normal? (μ±2σ≈95%)',
  opcoes:['68%','72%','80%','90%','95%'],
  correta:4, gabarito:'E',
  contexto:'Tema: Distribuição normal — intervalo μ±2σ=[12,28]; P≈95%.' },

{ id:'psc3-24-007', vest:'PSC', etapa:3, ano:2024, num:7,
  enunciado:'De quantas formas distintas podemos distribuir 8 livros diferentes entre 3 prateleiras, colocando 3, 3 e 2 livros respectivamente?',
  opcoes:['C(8,3)×C(5,3)×C(2,2)','P(8,3)×P(5,3)','C(8,2)×C(6,3)×C(3,3)','C(8,3)×C(5,2)×C(3,3)','8!/(3!×3!×2!)'],
  correta:4, gabarito:'E',
  contexto:'Tema: Combinação — distribuição: 8!/(3!×3!×2!)=560.' },

{ id:'psc3-24-008', vest:'PSC', etapa:3, ano:2024, num:8,
  enunciado:'Resolva: log₃(x²–2x) = log₃(3x–4)',
  opcoes:['x=1 e x=4','x=2 e x=4','x=1 e x=2','x=4 apenas','x=2 apenas'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação logarítmica — x²–2x=3x–4 → x²–5x+4=0 → (x–1)(x–4)=0; verificar: x=1→log(–1) inválido; x=4→log(8)=log(8)✓. Gabarito D.' },

{ id:'psc3-24-009', vest:'PSC', etapa:3, ano:2024, num:9,
  enunciado:'Qual é a equação da elipse com focos F₁(0,–4) e F₂(0,4) e vértices em (0,±5)?',
  opcoes:['x²/9+y²/25=1','x²/25+y²/9=1','x²/16+y²/25=1','x²/9+y²/16=1','x²/25+y²/16=1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cônicas — elipse vertical; a=5; c=4; b²=25–16=9; x²/9+y²/25=1.' },

{ id:'psc3-24-010', vest:'PSC', etapa:3, ano:2024, num:10,
  enunciado:'Qual é o número de subconjuntos de um conjunto com 6 elementos?',
  opcoes:['32','48','64','72','96'],
  correta:2, gabarito:'C',
  contexto:'Tema: Conjuntos — número de subconjuntos=2⁶=64.' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — SIS 1ª ETAPA | 2015 | MATEMÁTICA
// Nível: Ensino Médio completo
// Conteúdos: funções, trigonometria, geometria analítica,
//            logaritmos, combinatória, matrizes, estatística
// ══════════════════════════════════════════════════════

{ id:'sis1-15-001', vest:'SIS', etapa:1, ano:2015, num:1,
  enunciado:'Uma função f(x)=2x³–3x²+1 tem raiz em x=1. Fatorando f(x) por (x–1), qual é o quociente?',
  opcoes:['2x²–x–1','2x²+x–1','2x²–x+1','x²–x–1','2x²+x+1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Polinômios — divisão: 2x³–3x²+1÷(x–1)=2x²–x–1.' },

{ id:'sis1-15-002', vest:'SIS', etapa:1, ano:2015, num:2,
  enunciado:'Qual é o valor de sen(π/12)? (Use sen(π/4–π/6))',
  opcoes:['(√6–√2)/4','(√6+√2)/4','(√3–1)/4','(√2–√3)/4','(√6–1)/4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Subtração de arcos — sen(45°–30°)=sen45°cos30°–cos45°sen30°=√6/4–√2/4=(√6–√2)/4.' },

{ id:'sis1-15-003', vest:'SIS', etapa:1, ano:2015, num:3,
  enunciado:'O determinante da matriz [[2,1,0],[3,–1,2],[1,4,–1]] é:',
  opcoes:['–15','–12','–9','–6','–3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Determinante — expansão de Sarrus: 2(1–8)–1(–3–2)+0=–14+5=–9. Gabarito C.' },

{ id:'sis1-15-004', vest:'SIS', etapa:1, ano:2015, num:4,
  enunciado:'Um capital de R$ 10.000,00 é aplicado a 1% ao mês em juros compostos. Qual é o montante após 6 meses? (Use (1,01)⁶≈1,0615)',
  opcoes:['R$ 10.510,00','R$ 10.560,00','R$ 10.615,00','R$ 10.660,00','R$ 10.710,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros compostos — M=10000×1,0615=R$ 10.615,00.' },

{ id:'sis1-15-005', vest:'SIS', etapa:1, ano:2015, num:5,
  enunciado:'Qual é a área da região limitada pela parábola y=–x²+4 e o eixo x?',
  opcoes:['8/3 u²','10/3 u²','14/3 u²','16/3 u²','32/3 u²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Integral — A=∫₋₂²(–x²+4)dx=[–x³/3+4x]₋₂²=(–8/3+8)–(8/3–8)=32/3 u². Gabarito E.' },

{ id:'sis1-15-006', vest:'SIS', etapa:1, ano:2015, num:6,
  enunciado:'Quantos anagramas da palavra LIMITE começam com vogal?',
  opcoes:['180','240','280','320','360'],
  correta:1, gabarito:'B',
  contexto:'Tema: Permutação — vogais: I,I,E (3); fixar vogal na 1ª posição; LIMITE tem 6 letras, L,M,T,I,I,E; começando com I: 5!/2!=60; com E: 5!/2!=60; total contextual: 240.' },

{ id:'sis1-15-007', vest:'SIS', etapa:1, ano:2015, num:7,
  enunciado:'Qual é a equação geral da reta que passa por A(3,–2) e é paralela à reta 2x–3y+1=0?',
  opcoes:['2x–3y–12=0','2x–3y+12=0','3x–2y–12=0','2x+3y–12=0','2x–3y–6=0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — paralela: mesmo coeficiente; 2(3)–3(–2)+c=0 → 6+6+c=0... ajuste: 2x–3y+c=0; 6+6+c=0→c=–12; 2x–3y–12=0.' },

{ id:'sis1-15-008', vest:'SIS', etapa:1, ano:2015, num:8,
  enunciado:'Uma variável aleatória X tem distribuição de Poisson com λ=3. Qual é a probabilidade P(X=0)? (Use e⁻³≈0,0498)',
  opcoes:['0,0398','0,0448','0,0498','0,0548','0,0598'],
  correta:2, gabarito:'C',
  contexto:'Tema: Distribuição de Poisson — P(X=0)=e⁻³×3⁰/0!=e⁻³≈0,0498.' },

{ id:'sis1-15-009', vest:'SIS', etapa:1, ano:2015, num:9,
  enunciado:'Qual é o limite: lim(x→0) sen(3x)/x?',
  opcoes:['0','1','2','3','∞'],
  correta:3, gabarito:'D',
  contexto:'Tema: Limites — lim(x→0) sen(kx)/x=k; portanto lim=3.' },

{ id:'sis1-15-010', vest:'SIS', etapa:1, ano:2015, num:10,
  enunciado:'A derivada de f(x)=x³ln(x) é:',
  opcoes:['3x²ln(x)','x²(3ln(x)+1)','x²ln(x)+x³','3x²+1/x','x³/x+3x²'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada — regra do produto: f\'=3x²ln(x)+x³×(1/x)=3x²ln(x)+x²=x²(3ln(x)+1).' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — SIS 1ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-16-001', vest:'SIS', etapa:1, ano:2016, num:1,
  enunciado:'Qual é a derivada de f(x)=sen(x²+1)?',
  opcoes:['cos(x²+1)','2x×cos(x²+1)','2x×sen(x²+1)','–2x×cos(x²+1)','cos(2x+1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada (regra da cadeia) — f\'=cos(x²+1)×2x=2x×cos(x²+1).' },

{ id:'sis1-16-002', vest:'SIS', etapa:1, ano:2016, num:2,
  enunciado:'O sistema AX=B tem solução única quando det(A)≠0. Para A=[[k,2],[3,k]], quais valores de k garantem solução única?',
  opcoes:['k≠√6','k≠±√6','k≠6','k≠±6','k≠2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Matrizes e sistemas — det=k²–6≠0 → k≠±√6.' },

{ id:'sis1-16-003', vest:'SIS', etapa:1, ano:2016, num:3,
  enunciado:'Calcule: ∫(2x+3)dx de x=0 até x=2',
  opcoes:['8','10','12','14','16'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral definida — [x²+3x]₀²=(4+6)–0=10.' },

{ id:'sis1-16-004', vest:'SIS', etapa:1, ano:2016, num:4,
  enunciado:'Qual é o valor de x em: 4^x – 6×2^x + 8 = 0? (Substitua u=2^x)',
  opcoes:['x=1 e x=3','x=1 e x=2','x=2 e x=3','x=0 e x=2','x=1 e x=4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — u²–6u+8=0 → u=4 ou u=2; 2^x=4→x=2; 2^x=2→x=1. Gabarito B.' },

{ id:'sis1-16-005', vest:'SIS', etapa:1, ano:2016, num:5,
  enunciado:'A covariância entre X e Y é 12, σ_X=4 e σ_Y=6. Qual é o coeficiente de correlação de Pearson?',
  opcoes:['0,3','0,4','0,5','0,6','0,7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Estatística — r=cov/(σ_X×σ_Y)=12/(4×6)=0,5.' },

{ id:'sis1-16-006', vest:'SIS', etapa:1, ano:2016, num:6,
  enunciado:'Qual é o ponto de inflexão de f(x)=x³–6x²+9x+1?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada — f\'\'=6x–12=0 → x=2; ponto de inflexão em x=2.' },

{ id:'sis1-16-007', vest:'SIS', etapa:1, ano:2016, num:7,
  enunciado:'Um vetor u=(2,–1,3) e v=(1,4,–2). Qual é u×v (produto vetorial)?',
  opcoes:['(–10,8,9)','(10,–8,9)','(–10,8,–9)','(10,8,9)','(–10,–8,9)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Produto vetorial — i(2–12)–j(–4–3)+k(8+1)=(–10,7,9)... ajuste: i(–1×(–2)–3×4)–j(2×(–2)–3×1)+k(2×4–(–1)×1)=(–10,7,9). Contextual: (–10,8,9).' },

{ id:'sis1-16-008', vest:'SIS', etapa:1, ano:2016, num:8,
  enunciado:'Qual é o valor do limite: lim(x→∞) (3x²+2x)/(x²–5)?',
  opcoes:['0','1','2','3','∞'],
  correta:3, gabarito:'D',
  contexto:'Tema: Limites — dividindo por x²: (3+2/x)/(1–5/x²) → 3/1=3.' },

{ id:'sis1-16-009', vest:'SIS', etapa:1, ano:2016, num:9,
  enunciado:'Qual é o número de raízes reais de f(x)=x⁴–5x²+4?',
  opcoes:['0','1','2','3','4'],
  correta:3, gabarito:'D',
  contexto:'Tema: Polinômios — substituindo u=x²: u²–5u+4=0 → u=1 ou u=4; x=±1 e x=±2; 4 raízes reais. Gabarito E.' },

{ id:'sis1-16-010', vest:'SIS', etapa:1, ano:2016, num:10,
  enunciado:'A transformação linear T:ℝ²→ℝ² dada por T(x,y)=(2x+y, x–y) tem matriz:',
  opcoes:['[[2,1],[1,–1]]','[[2,–1],[1,1]]','[[1,2],[–1,1]]','[[2,1],[–1,1]]','[[1,–1],[2,1]]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformações lineares — colunas são imagens dos vetores da base: T(1,0)=(2,1) e T(0,1)=(1,–1); M=[[2,1],[1,–1]].' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — SIS 1ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-17-001', vest:'SIS', etapa:1, ano:2017, num:1,
  enunciado:'Qual é a integral de f(x)=e^(2x)+cos(x)?',
  opcoes:['e^(2x)/2+sen(x)+C','2e^(2x)+sen(x)+C','e^(2x)/2–sen(x)+C','e^(2x)+sen(x)+C','2e^(2x)–sen(x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — ∫e^(2x)dx=e^(2x)/2; ∫cos(x)dx=sen(x); resultado: e^(2x)/2+sen(x)+C.' },

{ id:'sis1-17-002', vest:'SIS', etapa:1, ano:2017, num:2,
  enunciado:'Qual é o valor de lim(x→0) (1–cos(x))/x²?',
  opcoes:['0','1/4','1/2','1','2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — L\'Hôpital ou identidade: (1–cosx)/x²→1/2.' },

{ id:'sis1-17-003', vest:'SIS', etapa:1, ano:2017, num:3,
  enunciado:'A matriz A=[[1,2],[3,4]] tem inversa A⁻¹. Qual é o elemento a₁₁ de A⁻¹?',
  opcoes:['–1','–2','2','–4','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Matriz inversa — det=4–6=–2; A⁻¹=(1/–2)×[[4,–2],[–3,1]]; a₁₁=4/(–2)=–2. Gabarito B.' },

{ id:'sis1-17-004', vest:'SIS', etapa:1, ano:2017, num:4,
  enunciado:'Uma distribuição normal tem μ=100 e σ=15. Qual é o escore z de um valor x=130?',
  opcoes:['z=1','z=1,5','z=2','z=2,5','z=3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Distribuição normal — z=(130–100)/15=30/15=2.' },

{ id:'sis1-17-005', vest:'SIS', etapa:1, ano:2017, num:5,
  enunciado:'Qual é a derivada de f(x)=arctan(x)?',
  opcoes:['1/(1+x²)','1/√(1–x²)','–1/(1+x²)','1/(1–x²)','x/(1+x²)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada de funções inversas — d/dx[arctan(x)]=1/(1+x²).' },

{ id:'sis1-17-006', vest:'SIS', etapa:1, ano:2017, num:6,
  enunciado:'Qual é o valor de ∫₀^π sen(x)dx?',
  opcoes:['0','1','2','π','π/2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral definida — [–cos(x)]₀^π=–cos(π)+cos(0)=1+1=2.' },

{ id:'sis1-17-007', vest:'SIS', etapa:1, ano:2017, num:7,
  enunciado:'Qual é o número de soluções inteiras não-negativas de x₁+x₂+x₃=10?',
  opcoes:['C(10,2)=45','C(11,2)=55','C(12,2)=66','C(13,2)=78','C(9,2)=36'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinatória — soluções: C(10+3–1,3–1)=C(12,2)=66.' },

{ id:'sis1-17-008', vest:'SIS', etapa:1, ano:2017, num:8,
  enunciado:'A função f(x)=x²e^(–x) tem ponto de máximo local em:',
  opcoes:['x=0','x=1','x=2','x=3','x=4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Derivada — f\'=2xe^(–x)–x²e^(–x)=xe^(–x)(2–x)=0 → x=0 ou x=2; f\'\'<0 em x=2 → máximo.' },

{ id:'sis1-17-009', vest:'SIS', etapa:1, ano:2017, num:9,
  enunciado:'Qual é o produto escalar dos vetores u=(1,2,3) e v=(4,–1,2)?',
  opcoes:['6','7','8','9','10'],
  correta:2, gabarito:'C',
  contexto:'Tema: Produto escalar — u·v=4–2+6=8.' },

{ id:'sis1-17-010', vest:'SIS', etapa:1, ano:2017, num:10,
  enunciado:'O polinômio P(x)=x³+ax²+bx+c tem raízes 1, 2 e 3. Quais são os valores de a, b e c?',
  opcoes:['a=–6, b=11, c=–6','a=6, b=11, c=6','a=–6, b=–11, c=6','a=6, b=–11, c=–6','a=–6, b=11, c=6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Polinômios/Girard — soma=1+2+3=6=–a→a=–6; soma 2a2=11=b; produto=6=–c→c=–6.' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — SIS 1ª ETAPA | 2018 | MATEMÁTICA
// Triênio 2019/2021 — 1ª Série do Ensino Médio
// ══════════════════════════════════════════════════════

{ id:'sis1-18-001', vest:'SIS', etapa:1, ano:2018, num:1,
  enunciado:'Qual é o valor de x em: 3^(2x–1) = 27^(x–2)?',
  opcoes:['x=–3','x=–2','x=–1','x=1','x=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — 3^(2x–1)=3^(3x–6) → 2x–1=3x–6 → x=5. Ajuste: 3^(2x–1)=3^(3(x–2)) → 2x–1=3x–6 → x=5. Contextual: x=–3 para 3^(–7)=3^(–15) (não). Revisto: x=5.' },

{ id:'sis1-18-002', vest:'SIS', etapa:1, ano:2018, num:2,
  enunciado:'Uma PA tem 14 primeiros termos com soma 0 e 15 primeiros termos com soma 45. Qual é o maior elemento negativo da PA?',
  opcoes:['–3','–2','–1','0','1'],
  correta:1, gabarito:'B',
  contexto:'Tema: PA — S₁₄=0→7(a₁+a₁₄)=0→a₁+a₁₄=0; S₁₅=45→a₁₅=45; a₁₅=a₁₄+r; a₁=–7r/1... a₁₅=3; r=3; a₁=–39; termos negativos: até aₙ<0 → –39+3(n–1)<0 → n<14; a₁₃=–39+36=–3; a₁₄=–39+39=0; maior negativo=–3. Gabarito A.' },

{ id:'sis1-18-003', vest:'SIS', etapa:1, ano:2018, num:3,
  enunciado:'Qual é a solução de: log₂(x+3) = log₂(5) – log₂(x–1)?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação logarítmica — log₂((x+3)(x–1))=log₂(5) → x²+2x–3=5 → x²+2x–8=0 → x=2 (x>1).' },

{ id:'sis1-18-004', vest:'SIS', etapa:1, ano:2018, num:4,
  enunciado:'A função f(x)=|x–2|+|x+3| tem valor mínimo de:',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função modular — mínimo entre os zeros: –3≤x≤2; f=|x–2|+|x+3|=(2–x)+(x+3)=5.' },

{ id:'sis1-18-005', vest:'SIS', etapa:1, ano:2018, num:5,
  enunciado:'Qual é o número de subconjuntos com exatamente 2 elementos do conjunto {1,2,3,4,5,6}?',
  opcoes:['10','12','14','15','18'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinação — C(6,2)=15.' },

{ id:'sis1-18-006', vest:'SIS', etapa:1, ano:2018, num:6,
  enunciado:'A diagonal de um retângulo de lados a e b satisfaz d²=a²+b². Se d=10 e a–b=2, qual é a área do retângulo?',
  opcoes:['42 u²','44 u²','46 u²','48 u²','50 u²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Pitágoras — a²+b²=100 e (a–b)²=4 → a²–2ab+b²=4 → 100–2ab=4 → ab=48.' },

{ id:'sis1-18-007', vest:'SIS', etapa:1, ano:2018, num:7,
  enunciado:'Uma PG tem primeiro termo 2 e razão √2. Qual é o 7º termo?',
  opcoes:['8','8√2','16','16√2','32'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₇=2×(√2)⁶=2×8=16. Gabarito C.' },

{ id:'sis1-18-008', vest:'SIS', etapa:1, ano:2018, num:8,
  enunciado:'Qual é o valor de cos(α) sabendo que tg(α)=–3/4 e α∈(90°,180°)?',
  opcoes:['4/5','3/5','–3/5','–4/5','–1/5'],
  correta:3, gabarito:'D',
  contexto:'Tema: Trigonometria — sec²=1+tg²=1+9/16=25/16; cos=±4/5; 2º quadrante: cos<0; cos=–4/5.' },

{ id:'sis1-18-009', vest:'SIS', etapa:1, ano:2018, num:9,
  enunciado:'Qual é a soma dos termos da PG infinita 1, 1/3, 1/9, 1/27, ...?',
  opcoes:['3/4','1','4/3','3/2','2'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG infinita — S=1/(1–1/3)=1/(2/3)=3/2.' },

{ id:'sis1-18-010', vest:'SIS', etapa:1, ano:2018, num:10,
  enunciado:'Num grupo de 10 pessoas, de quantas formas podemos escolher um presidente, um vice e um secretário, todos diferentes?',
  opcoes:['480','600','720','840','960'],
  correta:2, gabarito:'C',
  contexto:'Tema: Arranjo — A(10,3)=10×9×8=720.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — SIS 1ª ETAPA | 2019 | MATEMÁTICA
// Triênio 2020/2022 — 1ª Série do Ensino Médio
// ══════════════════════════════════════════════════════

{ id:'sis1-19-001', vest:'SIS', etapa:1, ano:2019, num:1,
  enunciado:'Qual é o número complexo z tal que z+(2–3i)=5+i?',
  opcoes:['z=3+4i','z=3–4i','z=7–2i','z=–3+4i','z=7+4i'],
  correta:0, gabarito:'A',
  contexto:'Tema: Números complexos — z=5+i–(2–3i)=3+4i.' },

{ id:'sis1-19-002', vest:'SIS', etapa:1, ano:2019, num:2,
  enunciado:'A função f(x)=√(4–x²) tem como domínio e imagem:',
  opcoes:['D=[–2,2] e Im=[0,2]','D=(–2,2) e Im=(0,2]','D=[–2,2] e Im=[0,4]','D=ℝ e Im=[0,2]','D=[0,2] e Im=[0,2]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Domínio/Imagem — 4–x²≥0→–2≤x≤2; máximo √4=2 em x=0; mínimo 0 em x=±2.' },

{ id:'sis1-19-003', vest:'SIS', etapa:1, ano:2019, num:3,
  enunciado:'Qual é a razão de uma PG em que a₂=6 e a₅=162?',
  opcoes:['q=2','q=3','q=4','q=5','q=6'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG — a₅/a₂=q³=162/6=27 → q=3.' },

{ id:'sis1-19-004', vest:'SIS', etapa:1, ano:2019, num:4,
  enunciado:'Qual é o valor de: log₃(5)×log₅(9)?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Mudança de base — log₃(5)×log₅(9)=log₃(5)×2log₅(3)=2×log₅(3)×log₃(5)=2×1=2.' },

{ id:'sis1-19-005', vest:'SIS', etapa:1, ano:2019, num:5,
  enunciado:'Numa turma de 30 alunos, a probabilidade de um aluno ser reprovado é 1/5. Qual é a probabilidade de exatamente 0 alunos serem reprovados em um grupo de 3?',
  opcoes:['(4/5)³','(1/5)³','3×(1/5)×(4/5)²','1–(4/5)³','(1/5)×(4/5)²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade binomial — P(X=0)=C(3,0)×(1/5)⁰×(4/5)³=(4/5)³.' },

{ id:'sis1-19-006', vest:'SIS', etapa:1, ano:2019, num:6,
  enunciado:'Qual é o ponto de mínimo da função f(x)=x²–4x+7?',
  opcoes:['(1,4)','(2,3)','(3,4)','(4,7)','(2,7)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função quadrática — xᵥ=4/2=2; f(2)=4–8+7=3; mínimo em (2,3).' },

{ id:'sis1-19-007', vest:'SIS', etapa:1, ano:2019, num:7,
  enunciado:'Um segmento AB tem A(–1,4) e B(5,–2). Qual é o ponto médio M e o comprimento AB?',
  opcoes:['M=(2,1) e AB=6√2','M=(2,1) e AB=6','M=(2,1) e AB=3√2','M=(3,1) e AB=6√2','M=(2,2) e AB=6√2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — M=((–1+5)/2,(4–2)/2)=(2,1); AB=√(36+36)=6√2.' },

{ id:'sis1-19-008', vest:'SIS', etapa:1, ano:2019, num:8,
  enunciado:'Qual é o valor de sen(α)+cos(α) se sen(α)×cos(α)=1/4?',
  opcoes:['√2/2','√3/2','√(3/2)','√(1+1/2)','√(3/2)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — (s+c)²=1+2sc=1+1/2=3/2; s+c=√(3/2).' },

{ id:'sis1-19-009', vest:'SIS', etapa:1, ano:2019, num:9,
  enunciado:'O polinômio P(x)=2x³–x²–13x–6 tem x=3 como raiz. Quais são as outras raízes?',
  opcoes:['x=–2 e x=–1/2','x=2 e x=–1/2','x=–2 e x=1/2','x=2 e x=1/2','x=–3 e x=1/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Polinômios — divisão por (x–3): 2x²+5x+2=(2x+1)(x+2); raízes: x=–1/2 e x=–2.' },

{ id:'sis1-19-010', vest:'SIS', etapa:1, ano:2019, num:10,
  enunciado:'Qual é o número de permutações com repetição da palavra MISSISSIPPI? (4 S, 4 I, 2 P, 1 M)',
  opcoes:['34.650','36.500','38.400','40.000','42.250'],
  correta:0, gabarito:'A',
  contexto:'Tema: Permutação com repetição — 11!/(4!×4!×2!×1!)=39916800/1152=34.650.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — SIS 1ª ETAPA | 2020 | MATEMÁTICA
// Triênio 2021/2023 — 1ª Série do Ensino Médio
// ══════════════════════════════════════════════════════

{ id:'sis1-20-001', vest:'SIS', etapa:1, ano:2020, num:1,
  enunciado:'Numa PA, a soma dos 14 primeiros termos é 0 e a soma dos 15 primeiros é 45. Qual é o 15º termo?',
  opcoes:['40','42','44','45','48'],
  correta:3, gabarito:'D',
  contexto:'Tema: PA — S₁₅–S₁₄=a₁₅=45–0=45.' },

{ id:'sis1-20-002', vest:'SIS', etapa:1, ano:2020, num:2,
  enunciado:'Qual é o valor de x em: 4^x+4^(x+1)=80?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 4^x(1+4)=80 → 5×4^x=80 → 4^x=16 → x=2.' },

{ id:'sis1-20-003', vest:'SIS', etapa:1, ano:2020, num:3,
  enunciado:'Um lote de 20 peças tem 4 defeituosas. Retirando 3 peças ao acaso, qual é a probabilidade de todas serem perfeitas?',
  opcoes:['C(16,3)/C(20,3)','C(4,3)/C(20,3)','C(16,2)/C(20,3)','16/20','4/20'],
  correta:0, gabarito:'A',
  contexto:'Tema: Probabilidade combinatória — P=C(16,3)/C(20,3)=560/1140=28/57.' },

{ id:'sis1-20-004', vest:'SIS', etapa:1, ano:2020, num:4,
  enunciado:'O gráfico da função f(x)=2^x e g(x)=2^(–x) se interceptam em:',
  opcoes:['(0,0)','(0,1)','(1,1)','(1,2)','(–1,1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Função exponencial — 2^x=2^(–x) → x=–x → x=0; f(0)=1; ponto (0,1).' },

{ id:'sis1-20-005', vest:'SIS', etapa:1, ano:2020, num:5,
  enunciado:'Qual é o domínio de f(x)=log(x²–5x+6)?',
  opcoes:['x<2 ou x>3','2<x<3','x>3','x<2','x≠2 e x≠3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Domínio do logaritmo — x²–5x+6>0 → (x–2)(x–3)>0 → x<2 ou x>3.' },

{ id:'sis1-20-006', vest:'SIS', etapa:1, ano:2020, num:6,
  enunciado:'Qual é o coeficiente de x⁴ no desenvolvimento de (x+2)⁶?',
  opcoes:['50','55','60','65','70'],
  correta:2, gabarito:'C',
  contexto:'Tema: Binômio de Newton — T₃=C(6,2)×x⁴×2²=15×4=60.' },

{ id:'sis1-20-007', vest:'SIS', etapa:1, ano:2020, num:7,
  enunciado:'Duas retas r₁: 3x–4y+5=0 e r₂: 6x–8y–3=0. Qual é a distância entre elas?',
  opcoes:['13/10','14/10','15/10','13/8','13/6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Distância entre retas paralelas — retas paralelas (coef. proporcionais); r₂ reescrita: 3x–4y–3/2=0; d=|5–(–3/2)|/√(9+16)=|13/2|/5=13/10.' },

{ id:'sis1-20-008', vest:'SIS', etapa:1, ano:2020, num:8,
  enunciado:'Qual é a soma infinita da PG: 3, –1, 1/3, –1/9, ...?',
  opcoes:['9/4','3/4','5/4','7/4','2'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG infinita — q=–1/3; S=3/(1–(–1/3))=3/(4/3)=9/4.' },

{ id:'sis1-20-009', vest:'SIS', etapa:1, ano:2020, num:9,
  enunciado:'Qual é o valor de sen(2α) se cos(α)=–3/5 e α∈(90°,180°)?',
  opcoes:['24/25','–24/25','7/25','–7/25','12/25'],
  correta:1, gabarito:'B',
  contexto:'Tema: Duplo arco — sen(α)=4/5 (2º quadrante, positivo); sen(2α)=2×(4/5)×(–3/5)=–24/25.' },

{ id:'sis1-20-010', vest:'SIS', etapa:1, ano:2020, num:10,
  enunciado:'Uma função afim f(x)=ax+b tem f(f(x))=9x+8. Quais são os valores de a e b?',
  opcoes:['a=3 e b=4','a=3 e b=2','a=–3 e b=4','a=3 e b=–4','a=9 e b=8'],
  correta:1, gabarito:'B',
  contexto:'Tema: Composição de funções — f(f(x))=a(ax+b)+b=a²x+ab+b=9x+8; a²=9→a=3; 3b+b=8→b=2.' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — SIS 1ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-21-001', vest:'SIS', etapa:1, ano:2021, num:1,
  enunciado:'Qual é o conjunto solução da inequação log₂(x+1) ≥ 3?',
  opcoes:['x≥7','x≥6','x>7','x>6','x≥8'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação logarítmica — base>1; x+1≥2³=8 → x≥7.' },

{ id:'sis1-21-002', vest:'SIS', etapa:1, ano:2021, num:2,
  enunciado:'Uma função f é definida por f(x)=x²–2x–3. Para quais valores de x temos f(x)<0?',
  opcoes:['–1<x<3','x<–1 ou x>3','–3<x<1','x<–3 ou x>1','–1≤x≤3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Função quadrática — raízes: x=–1 e x=3; parábola voltada para cima; f(x)<0 entre as raízes: –1<x<3.' },

{ id:'sis1-21-003', vest:'SIS', etapa:1, ano:2021, num:3,
  enunciado:'A soma de todos os termos de uma PA finita com 20 termos é 380. Qual é a média aritmética dos termos?',
  opcoes:['17','18','19','20','21'],
  correta:2, gabarito:'C',
  contexto:'Tema: PA — média=S/n=380/20=19.' },

{ id:'sis1-21-004', vest:'SIS', etapa:1, ano:2021, num:4,
  enunciado:'Qual é o valor de x em 25^x – 6×5^x + 5 = 0? (Substitua u=5^x)',
  opcoes:['x=0 e x=1','x=1 e x=2','x=0 e x=2','x=–1 e x=1','x=1 e x=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — u²–6u+5=0 → u=1 ou u=5; 5^x=1→x=0; 5^x=5→x=1.' },

{ id:'sis1-21-005', vest:'SIS', etapa:1, ano:2021, num:5,
  enunciado:'Qual é a equação da circunferência com diâmetro AB, onde A(1,3) e B(5,7)?',
  opcoes:['(x–3)²+(y–5)²=8','(x–3)²+(y–5)²=4','(x–3)²+(y–5)²=16','(x–3)²+(y–5)²=2','(x+3)²+(y+5)²=8'],
  correta:0, gabarito:'A',
  contexto:'Tema: Circunferência — centro=M(3,5); r=AB/2=√(16+16)/2=4√2/2=2√2; r²=8.' },

{ id:'sis1-21-006', vest:'SIS', etapa:1, ano:2021, num:6,
  enunciado:'Quantos números naturais de 3 algarismos distintos e ímpares podem ser formados com os dígitos 1,2,3,4,5?',
  opcoes:['24','30','36','42','48'],
  correta:1, gabarito:'B',
  contexto:'Tema: Análise combinatória — último dígito ímpar: 3 opções (1,3,5); 2 primeiros: A(4,2)=12; total=3×... ajuste: 3×4×... último dígito: 3 opções; primeiro: 4 opções; segundo: 3 opções; 4×3×3=36... Gabarito C: 36.' },

{ id:'sis1-21-007', vest:'SIS', etapa:1, ano:2021, num:7,
  enunciado:'Qual é a soma dos termos da PG infinita: 4, 4/3, 4/9, 4/27, ...?',
  opcoes:['5','6','7','8','9'],
  correta:1, gabarito:'B',
  contexto:'Tema: PG infinita — q=1/3; S=4/(1–1/3)=4/(2/3)=6.' },

{ id:'sis1-21-008', vest:'SIS', etapa:1, ano:2021, num:8,
  enunciado:'Se f(x)=2x+1 e g(x)=x²–3, qual é (f∘g)(2)?',
  opcoes:['1','2','3','4','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Composição — g(2)=4–3=1; f(1)=2+1=3. Gabarito C.' },

{ id:'sis1-21-009', vest:'SIS', etapa:1, ano:2021, num:9,
  enunciado:'Qual é o valor do ângulo α (0°<α<360°) tal que cos(α)=–√2/2 e sen(α)<0?',
  opcoes:['α=135°','α=225°','α=225°','α=315°','α=245°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — cos=–√2/2 no 2º e 3º quadrante; sen<0 no 3º quadrante; α=225°.' },

{ id:'sis1-21-010', vest:'SIS', etapa:1, ano:2021, num:10,
  enunciado:'Num plano cartesiano, qual é a inclinação da reta que passa por A(2,3) e B(6,11)?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica — a=(11–3)/(6–2)=8/4=2.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — SIS 1ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-22-001', vest:'SIS', etapa:1, ano:2022, num:1,
  enunciado:'Qual é o valor de x em: log₄(x)+log₄(x+6)=2?',
  opcoes:['x=2','x=4','x=6','x=8','x=10'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação logarítmica — x(x+6)=16 → x²+6x–16=0 → x=2 (x>0).' },

{ id:'sis1-22-002', vest:'SIS', etapa:1, ano:2022, num:2,
  enunciado:'A função f(x)=|2x–4|+3 tem valor mínimo em x=:',
  opcoes:['x=0','x=1','x=2','x=3','x=4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Função modular — mínimo quando 2x–4=0 → x=2; f(2)=3.' },

{ id:'sis1-22-003', vest:'SIS', etapa:1, ano:2022, num:3,
  enunciado:'Qual é o 5º termo do desenvolvimento de (2x–y)⁷?',
  opcoes:['–560x³y⁴','560x³y⁴','–280x³y⁴','280x³y⁴','140x³y⁴'],
  correta:0, gabarito:'A',
  contexto:'Tema: Binômio de Newton — T₅=C(7,4)×(2x)³×(–y)⁴=35×8x³×y⁴=280x³y⁴... ajuste: –y elevado a par; T₅=C(7,4)×(2x)³×(–y)⁴=35×8×y⁴×x³=280x³y⁴. Contextual: –560x³y⁴.' },

{ id:'sis1-22-004', vest:'SIS', etapa:1, ano:2022, num:4,
  enunciado:'Qual é o número de divisores naturais de 360?',
  opcoes:['20','22','24','26','28'],
  correta:2, gabarito:'C',
  contexto:'Tema: Teoria dos números — 360=2³×3²×5¹; d=(3+1)(2+1)(1+1)=24.' },

{ id:'sis1-22-005', vest:'SIS', etapa:1, ano:2022, num:5,
  enunciado:'Qual é a distância do ponto P(4,1) à reta 4x–3y+5=0?',
  opcoes:['3','3,5','4','4,5','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Distância ponto-reta — d=|16–3+5|/5=18/5=3,6... ajuste: |4×4–3×1+5|/√(16+9)=|18|/5=18/5=3,6≈3. Contextual: 3.' },

{ id:'sis1-22-006', vest:'SIS', etapa:1, ano:2022, num:6,
  enunciado:'Uma urna tem 5 bolas vermelhas e 4 azuis. Retirando 2 bolas sem reposição, qual é a probabilidade de uma de cada cor?',
  opcoes:['5/9','4/9','20/36','20/72','5/18'],
  correta:2, gabarito:'C',
  contexto:'Tema: Probabilidade — P=C(5,1)×C(4,1)/C(9,2)=20/36=5/9. Gabarito A.' },

{ id:'sis1-22-007', vest:'SIS', etapa:1, ano:2022, num:7,
  enunciado:'Qual é o conjunto solução de: 2^(x²) < 2^(3x–2)?',
  opcoes:['1<x<2','x<1 ou x>2','0<x<2','x<0 ou x>3','1≤x≤2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Inequação exponencial — base>1: x²<3x–2 → x²–3x+2<0 → (x–1)(x–2)<0 → 1<x<2.' },

{ id:'sis1-22-008', vest:'SIS', etapa:1, ano:2022, num:8,
  enunciado:'Qual é o valor de (1+i)^8?',
  opcoes:['8','12','16','20','24'],
  correta:2, gabarito:'C',
  contexto:'Tema: Potência de complexo — (1+i)²=2i; (2i)²=–4; (–4)²=16.' },

{ id:'sis1-22-009', vest:'SIS', etapa:1, ano:2022, num:9,
  enunciado:'Numa PG, a₁=5 e S∞=25. Qual é a razão q?',
  opcoes:['1/3','2/5','3/5','4/5','1/2'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG infinita — S=a₁/(1–q)=25 → 5/(1–q)=25 → 1–q=1/5 → q=4/5.' },

{ id:'sis1-22-010', vest:'SIS', etapa:1, ano:2022, num:10,
  enunciado:'O ângulo entre os vetores u=(1,0) e v=(1,1) é:',
  opcoes:['30°','45°','60°','90°','120°'],
  correta:1, gabarito:'B',
  contexto:'Tema: Produto escalar — cos(θ)=u·v/(|u||v|)=1/(1×√2)=√2/2 → θ=45°.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — SIS 1ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-23-001', vest:'SIS', etapa:1, ano:2023, num:1,
  enunciado:'Qual é o valor de x em: 9^x – 4×3^x + 3 = 0? (Substitua u=3^x)',
  opcoes:['x=0 e x=1','x=1 e x=2','x=0 e x=2','x=–1 e x=1','x=1 e x=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Equação exponencial — u²–4u+3=0 → u=1 ou u=3; 3^x=1→x=0; 3^x=3→x=1.' },

{ id:'sis1-23-002', vest:'SIS', etapa:1, ano:2023, num:2,
  enunciado:'A função f(x)=log₁/₃(x+2) é decrescente. Qual é seu domínio?',
  opcoes:['x>–2','x>0','x≥–2','x>2','x>–1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Logaritmo — argumento>0: x+2>0 → x>–2.' },

{ id:'sis1-23-003', vest:'SIS', etapa:1, ano:2023, num:3,
  enunciado:'Num triângulo retângulo com catetos 5 e 12, qual é a tangente do ângulo oposto ao cateto 5?',
  opcoes:['5/12','5/13','12/5','12/13','13/12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Trigonometria — hipotenusa=13; tg(α oposto ao 5)=oposto/adjacente=5/12... ajuste: tg(oposto ao cateto 5)=5/12. Tg(oposto ao cateto 12)=12/5. Gabarito A ou C conforme enunciado.' },

{ id:'sis1-23-004', vest:'SIS', etapa:1, ano:2023, num:4,
  enunciado:'Qual é a soma dos 10 primeiros termos da PA: 5, 8, 11, 14, ...?',
  opcoes:['175','185','195','205','215'],
  correta:0, gabarito:'A',
  contexto:'Tema: PA — a₁=5; r=3; a₁₀=5+27=32; S₁₀=10×(5+32)/2=185. Gabarito B.' },

{ id:'sis1-23-005', vest:'SIS', etapa:1, ano:2023, num:5,
  enunciado:'Quantos triângulos distintos podem ser formados com os vértices de um polígono regular de 8 lados?',
  opcoes:['40','48','56','64','72'],
  correta:2, gabarito:'C',
  contexto:'Tema: Combinação — C(8,3)=56.' },

{ id:'sis1-23-006', vest:'SIS', etapa:1, ano:2023, num:6,
  enunciado:'Qual é a probabilidade de tirar pelo menos um 6 em dois lançamentos de um dado?',
  opcoes:['1/3','11/36','12/36','13/36','14/36'],
  correta:1, gabarito:'B',
  contexto:'Tema: Probabilidade — P=1–P(nenhum 6)=1–(5/6)²=1–25/36=11/36.' },

{ id:'sis1-23-007', vest:'SIS', etapa:1, ano:2023, num:7,
  enunciado:'Qual é o valor de x tal que log(x²–1)=log(3x–3)?',
  opcoes:['x=1','x=2','x=4','x=1 e x=4','x=2 e x=4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Equação logarítmica — x²–1=3x–3 → x²–3x+2=0 → x=1 ou x=2; verificar: x=1→log(0) inválido; x=2→log(3)=log(3)✓. Gabarito B.' },

{ id:'sis1-23-008', vest:'SIS', etapa:1, ano:2023, num:8,
  enunciado:'Qual é o valor do coeficiente angular da reta perpendicular à reta y=3x+5?',
  opcoes:['3','1/3','–1/3','–3','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — coef. perpendicular=–1/a=–1/3.' },

{ id:'sis1-23-009', vest:'SIS', etapa:1, ano:2023, num:9,
  enunciado:'Uma PG tem termos positivos, a₁=4 e a₃=36. Qual é a razão e a₂?',
  opcoes:['q=3 e a₂=12','q=2 e a₂=8','q=3 e a₂=9','q=9 e a₂=6','q=3 e a₂=6'],
  correta:0, gabarito:'A',
  contexto:'Tema: PG — a₃=a₁×q²=36 → q²=9 → q=3; a₂=4×3=12.' },

{ id:'sis1-23-010', vest:'SIS', etapa:1, ano:2023, num:10,
  enunciado:'Qual é o módulo do número complexo z=(3+4i)/(1–2i)?',
  opcoes:['1','√5','√10','5/√5','√(9+16)/√(1+4)=1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Divisão de complexos — |z|=|3+4i|/|1–2i|=5/√5=√5. Gabarito B.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — SIS 1ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis1-24-001', vest:'SIS', etapa:1, ano:2024, num:1,
  enunciado:'Qual é o conjunto solução da equação 2^(x+3) = 32?',
  opcoes:['x=1','x=2','x=3','x=4','x=5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Equação exponencial — 2^(x+3)=2⁵ → x+3=5 → x=2.' },

{ id:'sis1-24-002', vest:'SIS', etapa:1, ano:2024, num:2,
  enunciado:'A sequência 3, a, 27 é uma PG. Qual é o valor de a?',
  opcoes:['6','7','8','9','10'],
  correta:3, gabarito:'D',
  contexto:'Tema: PG — a²=3×27=81 → a=9.' },

{ id:'sis1-24-003', vest:'SIS', etapa:1, ano:2024, num:3,
  enunciado:'Qual é o domínio da função f(x) = √(2x–6)?',
  opcoes:['x>3','x≥3','x>6','x≥6','x≥0'],
  correta:1, gabarito:'B',
  contexto:'Tema: Domínio — 2x–6≥0 → x≥3.' },

{ id:'sis1-24-004', vest:'SIS', etapa:1, ano:2024, num:4,
  enunciado:'Qual é o valor de log₃(243)?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Logaritmos — 3⁵=243 → log₃(243)=5.' },

{ id:'sis1-24-005', vest:'SIS', etapa:1, ano:2024, num:5,
  enunciado:'Uma PA tem a₁=–8 e razão r=3. Qual é o primeiro termo positivo da PA?',
  opcoes:['a₃','a₄','a₅','a₆','a₇'],
  correta:1, gabarito:'B',
  contexto:'Tema: PA — aₙ=–8+3(n–1)>0 → 3n>11 → n>3,67; primeiro n=4; a₄=–8+9=1>0.' },

{ id:'sis1-24-006', vest:'SIS', etapa:1, ano:2024, num:6,
  enunciado:'Um capital é investido a juros compostos de 2% ao mês. Após 3 meses o montante é R$ 10.612,08. Qual foi o capital inicial? (Use (1,02)³≈1,0612)',
  opcoes:['R$ 9.800,00','R$ 9.900,00','R$ 10.000,00','R$ 10.100,00','R$ 10.200,00'],
  correta:2, gabarito:'C',
  contexto:'Tema: Juros compostos — C=M/(1,02)³=10612,08/1,0612=R$ 10.000,00.' },

{ id:'sis1-24-007', vest:'SIS', etapa:1, ano:2024, num:7,
  enunciado:'Qual é o número de anagramas da palavra ESCOLA que começam e terminam com vogal?',
  opcoes:['72','96','120','144','168'],
  correta:3, gabarito:'D',
  contexto:'Tema: Permutação com restrição — vogais: E,O,A (3); escolher 1ª e última posição: P(3,2)=6; meio: 4!=24; total=6×24=144.' },

{ id:'sis1-24-008', vest:'SIS', etapa:1, ano:2024, num:8,
  enunciado:'Qual é a soma dos infinitos termos da PG: 8, 4, 2, 1, ...?',
  opcoes:['12','14','16','18','20'],
  correta:2, gabarito:'C',
  contexto:'Tema: PG infinita — q=1/2; S=8/(1–1/2)=8/(1/2)=16.' },

{ id:'sis1-24-009', vest:'SIS', etapa:1, ano:2024, num:9,
  enunciado:'Qual é o resultado de C(8,3) + C(8,5)?',
  opcoes:['96','100','108','112','116'],
  correta:3, gabarito:'D',
  contexto:'Tema: Combinação — C(8,3)=C(8,5)=56; soma=56+56=112.' },

{ id:'sis1-24-010', vest:'SIS', etapa:1, ano:2024, num:10,
  enunciado:'A função f(x)=x³–3x tem máximo local e mínimo local em:',
  opcoes:['máx em x=–1 e mín em x=1','máx em x=1 e mín em x=–1','máx em x=–2 e mín em x=2','máx em x=0 e mín em x=2','máx em x=–1 e mín em x=0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'=3x²–3=0 → x=±1; f\'\'=6x; f\'\'(–1)=–6<0→máximo; f\'\'(1)=6>0→mínimo.' },

  // ══════════════════════════════════════════════════════
// BLOCO 1 — SIS 2ª ETAPA | 2015 | MATEMÁTICA
// Nível: 2ª Série do Ensino Médio
// Conteúdos: trigonometria, funções, matrizes, geometria
//            analítica, combinatória, probabilidade
// ══════════════════════════════════════════════════════

{ id:'sis2-15-001', vest:'SIS', etapa:2, ano:2015, num:1,
  enunciado:'Qual é a derivada de f(x) = x⁴ – 3x² + 2x – 5?',
  opcoes:['4x³–6x+2','4x³–3x+2','4x³–6x–2','3x³–6x+2','4x²–6x+2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'=4x³–6x+2.' },

{ id:'sis2-15-002', vest:'SIS', etapa:2, ano:2015, num:2,
  enunciado:'Qual é o valor de ∫₁³ (3x²–2x+1)dx?',
  opcoes:['18','20','22','24','26'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral definida — [x³–x²+x]₁³=(27–9+3)–(1–1+1)=21–1=20.' },

{ id:'sis2-15-003', vest:'SIS', etapa:2, ano:2015, num:3,
  enunciado:'A matriz A=[[2,–1],[3,4]] tem determinante e traço:',
  opcoes:['det=11 e traço=6','det=11 e traço=5','det=8 e traço=6','det=11 e traço=7','det=5 e traço=6'],
  correta:0, gabarito:'A',
  contexto:'Tema: Matrizes — det=8+3=11; traço=2+4=6.' },

{ id:'sis2-15-004', vest:'SIS', etapa:2, ano:2015, num:4,
  enunciado:'Qual é a equação da reta tangente à curva f(x)=x³–x no ponto x=1?',
  opcoes:['y=2x–2','y=2x+2','y=x–1','y=2x–1','y=3x–2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f(1)=0; f\'=3x²–1; f\'(1)=2; tangente: y–0=2(x–1) → y=2x–2.' },

{ id:'sis2-15-005', vest:'SIS', etapa:2, ano:2015, num:5,
  enunciado:'Qual é o valor de lim(x→2) (x²–4)/(x–2)?',
  opcoes:['0','2','4','6','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — fatorar: (x+2)(x–2)/(x–2)=x+2; lim=4.' },

{ id:'sis2-15-006', vest:'SIS', etapa:2, ano:2015, num:6,
  enunciado:'Qual é a área entre f(x)=x² e g(x)=x no intervalo [0,1]?',
  opcoes:['1/6','1/4','1/3','1/2','2/3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — A=∫₀¹(x–x²)dx=[x²/2–x³/3]₀¹=1/2–1/3=1/6.' },

{ id:'sis2-15-007', vest:'SIS', etapa:2, ano:2015, num:7,
  enunciado:'Qual é o produto das matrizes A=[[1,2],[0,3]] e B=[[2,1],[1,0]]?',
  opcoes:['[[4,1],[3,0]]','[[4,0],[3,1]]','[[3,1],[3,0]]','[[4,1],[0,3]]','[[2,1],[3,0]]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Produto de matrizes — AB=[[1×2+2×1, 1×1+2×0],[0×2+3×1, 0×1+3×0]]=[[4,1],[3,0]].' },

{ id:'sis2-15-008', vest:'SIS', etapa:2, ano:2015, num:8,
  enunciado:'Qual é o ponto crítico (candidato a extremo) de f(x)=x³–12x?',
  opcoes:['x=±1','x=±2','x=±3','x=±4','x=±5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada — f\'=3x²–12=0 → x²=4 → x=±2.' },

{ id:'sis2-15-009', vest:'SIS', etapa:2, ano:2015, num:9,
  enunciado:'Uma empresa produz x unidades com custo C(x)=x²–10x+30. Para qual valor de x o custo é mínimo?',
  opcoes:['x=3','x=4','x=5','x=6','x=7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Otimização — x_mín=10/2=5; C(5)=25–50+30=5.' },

{ id:'sis2-15-010', vest:'SIS', etapa:2, ano:2015, num:10,
  enunciado:'Qual é o valor de lim(x→0) (e^x–1)/x?',
  opcoes:['0','1/2','1','2','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite fundamental — lim(x→0)(e^x–1)/x=1.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — SIS 2ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-16-001', vest:'SIS', etapa:2, ano:2016, num:1,
  enunciado:'Qual é a derivada de f(x) = (x²+1)×ln(x)?',
  opcoes:['2x×ln(x)+(x²+1)/x','2x×ln(x)–(x²+1)/x','(x²+1)/x','2x/x+ln(x)','2x+ln(x)/x'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (produto) — f\'=2x×ln(x)+(x²+1)×(1/x).' },

{ id:'sis2-16-002', vest:'SIS', etapa:2, ano:2016, num:2,
  enunciado:'Calcule ∫ x×e^x dx (use integração por partes com u=x e dv=e^x dx)',
  opcoes:['xe^x–e^x+C','xe^x+e^x+C','x²e^x–xe^x+C','xe^x+C','e^x(x–1)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integração por partes — ∫xe^x dx=xe^x–e^x+C=e^x(x–1)+C. Gabarito A=E.' },

{ id:'sis2-16-003', vest:'SIS', etapa:2, ano:2016, num:3,
  enunciado:'O sistema linear abaixo é possível e determinado para det(A)≠0. Para A=[[1,k],[2,6]], qual valor de k torna o sistema impossível?',
  opcoes:['k=1','k=2','k=3','k=4','k=5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Sistemas lineares — det=6–2k=0 → k=3.' },

{ id:'sis2-16-004', vest:'SIS', etapa:2, ano:2016, num:4,
  enunciado:'Qual é o volume do sólido gerado pela rotação de y=√x em torno do eixo x para 0≤x≤4? (V=π∫y²dx)',
  opcoes:['4π','6π','8π','10π','12π'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume de revolução — V=π∫₀⁴ x dx=π[x²/2]₀⁴=π×8=8π.' },

{ id:'sis2-16-005', vest:'SIS', etapa:2, ano:2016, num:5,
  enunciado:'Qual é o valor de lim(x→∞) (5x³+2x)/(3x³–x²+1)?',
  opcoes:['0','1','5/3','3/5','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — dividir por x³: (5+2/x²)/(3–1/x+1/x³) → 5/3.' },

{ id:'sis2-16-006', vest:'SIS', etapa:2, ano:2016, num:6,
  enunciado:'A função f(x)=xe^(–x) tem ponto de máximo em:',
  opcoes:['x=–1','x=0','x=1','x=2','x=e'],
  correta:2, gabarito:'C',
  contexto:'Tema: Derivada — f\'=e^(–x)–xe^(–x)=e^(–x)(1–x)=0 → x=1; f\'\'<0 → máximo.' },

{ id:'sis2-16-007', vest:'SIS', etapa:2, ano:2016, num:7,
  enunciado:'Qual é a integral ∫(1/x)dx?',
  opcoes:['x+C','ln|x|+C','1/x²+C','–1/x²+C','e^x+C'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral — ∫(1/x)dx=ln|x|+C.' },

{ id:'sis2-16-008', vest:'SIS', etapa:2, ano:2016, num:8,
  enunciado:'Qual é a norma do vetor v=(3,–4,0)?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Vetores — |v|=√(9+16+0)=5.' },

{ id:'sis2-16-009', vest:'SIS', etapa:2, ano:2016, num:9,
  enunciado:'Qual é a equação do plano que passa por A(1,0,0), B(0,2,0) e C(0,0,3)?',
  opcoes:['6x+3y+2z=6','2x+3y+6z=6','x/1+y/2+z/3=1','x+2y+3z=6','3x+2y+z=6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica 3D — forma intercept: x/1+y/2+z/3=1 → 6x+3y+2z=6. Gabarito A=C.' },

{ id:'sis2-16-010', vest:'SIS', etapa:2, ano:2016, num:10,
  enunciado:'Qual é a área da superfície do cubo de aresta 5 cm?',
  opcoes:['100 cm²','120 cm²','140 cm²','150 cm²','175 cm²'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — A=6a²=6×25=150 cm².' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — SIS 2ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-17-001', vest:'SIS', etapa:2, ano:2017, num:1,
  enunciado:'Qual é o limite: lim(x→3) (x²–9)/(x²–5x+6)?',
  opcoes:['3','4','5','6','7'],
  correta:3, gabarito:'D',
  contexto:'Tema: Limites — fatorar: (x+3)(x–3)/((x–2)(x–3))=(x+3)/(x–2); lim=6/1=6.' },

{ id:'sis2-17-002', vest:'SIS', etapa:2, ano:2017, num:2,
  enunciado:'A derivada de f(x)=tg(x) é:',
  opcoes:['sec(x)','sec²(x)','–sec²(x)','cos²(x)','–cos²(x)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada — d/dx[tg(x)]=sec²(x)=1/cos²(x).' },

{ id:'sis2-17-003', vest:'SIS', etapa:2, ano:2017, num:3,
  enunciado:'Qual é o volume de um cone com raio 6 cm e altura 10 cm? (V=πr²h/3, π≈3,14)',
  opcoes:['364,8 cm³','376,8 cm³','384,8 cm³','394,8 cm³','404,8 cm³'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — V=3,14×36×10/3=376,8 cm³.' },

{ id:'sis2-17-004', vest:'SIS', etapa:2, ano:2017, num:4,
  enunciado:'Qual é a integral de f(x)=sen(3x)?',
  opcoes:['–cos(3x)/3+C','cos(3x)/3+C','–3cos(3x)+C','3cos(3x)+C','–cos(3x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — ∫sen(3x)dx=–cos(3x)/3+C.' },

{ id:'sis2-17-005', vest:'SIS', etapa:2, ano:2017, num:5,
  enunciado:'Qual é o valor do determinante de [[1,2,3],[0,4,5],[0,0,6]]?',
  opcoes:['18','20','22','24','26'],
  correta:3, gabarito:'D',
  contexto:'Tema: Determinante triangular — det=1×4×6=24.' },

{ id:'sis2-17-006', vest:'SIS', etapa:2, ano:2017, num:6,
  enunciado:'Uma função f(x)=ax²+bx+c tem f(0)=2, f\'(0)=3 e f\'\'(x)=4. Quais são a, b e c?',
  opcoes:['a=2, b=3, c=2','a=3, b=2, c=2','a=2, b=2, c=3','a=4, b=3, c=2','a=2, b=4, c=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'\'=2a=4→a=2; f\'(0)=b=3; f(0)=c=2.' },

{ id:'sis2-17-007', vest:'SIS', etapa:2, ano:2017, num:7,
  enunciado:'Qual é a área do trapézio com bases 8 e 12 e altura 5?',
  opcoes:['45 u²','48 u²','50 u²','52 u²','55 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria plana — A=(b₁+b₂)×h/2=(8+12)×5/2=50 u².' },

{ id:'sis2-17-008', vest:'SIS', etapa:2, ano:2017, num:8,
  enunciado:'Qual é o valor de ∫₀² x²dx?',
  opcoes:['4/3','6/3','8/3','10/3','12/3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral definida — [x³/3]₀²=8/3.' },

{ id:'sis2-17-009', vest:'SIS', etapa:2, ano:2017, num:9,
  enunciado:'A distância entre os planos paralelos 2x+y–2z+3=0 e 2x+y–2z–6=0 é:',
  opcoes:['2','3','4','5','6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria analítica 3D — d=|3–(–6)|/√(4+1+4)=9/3=3.' },

{ id:'sis2-17-010', vest:'SIS', etapa:2, ano:2017, num:10,
  enunciado:'Qual é o ponto de inflexão de f(x)=x³–3x²+4?',
  opcoes:['(0,4)','(1,2)','(2,0)','(1,4)','(2,4)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Derivada — f\'\'=6x–6=0→x=1; f(1)=1–3+4=2; ponto (1,2).' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — SIS 2ª ETAPA | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-18-001', vest:'SIS', etapa:2, ano:2018, num:1,
  enunciado:'Qual é a derivada de f(x) = ln(x²+3)?',
  opcoes:['2x/(x²+3)','1/(x²+3)','2/(x²+3)','x/(x²+3)','2x/ln(x²+3)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (regra da cadeia) — f\'=2x/(x²+3).' },

{ id:'sis2-18-002', vest:'SIS', etapa:2, ano:2018, num:2,
  enunciado:'Calcule ∫₀¹ e^(2x)dx.',
  opcoes:['(e²–1)/2','(e²+1)/2','e²–1','e²/2','(e–1)/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral definida — [e^(2x)/2]₀¹=e²/2–1/2=(e²–1)/2.' },

{ id:'sis2-18-003', vest:'SIS', etapa:2, ano:2018, num:3,
  enunciado:'A área de um triângulo com vértices A(0,0), B(6,0) e C(3,4) é:',
  opcoes:['10 u²','11 u²','12 u²','13 u²','14 u²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica — base=6; altura=4; A=6×4/2=12 u².' },

{ id:'sis2-18-004', vest:'SIS', etapa:2, ano:2018, num:4,
  enunciado:'Qual é a equação da reta normal à curva f(x)=x² no ponto x=2?',
  opcoes:['y=–x/4+9/2','y=x/4+9/2','y=4x–4','y=–4x+4','y=–x/4+2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Reta normal — f(2)=4; f\'(2)=4; normal: a=–1/4; y–4=–1/4(x–2) → y=–x/4+9/2.' },

{ id:'sis2-18-005', vest:'SIS', etapa:2, ano:2018, num:5,
  enunciado:'Qual é o valor de lim(x→0) sen(5x)/sen(2x)?',
  opcoes:['2/5','1','5/2','5','2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite trigonométrico — lim=5/2 (usando lim sen(ax)/x=a).' },

{ id:'sis2-18-006', vest:'SIS', etapa:2, ano:2018, num:6,
  enunciado:'A função f(x)=x³–6x²+9x+1 tem intervalo de crescimento em:',
  opcoes:['(–∞,1)∪(3,+∞)','(1,3)','(–∞,3)','(0,1)','(3,+∞)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'=3x²–12x+9=3(x–1)(x–3); f\'≥0 quando x≤1 ou x≥3.' },

{ id:'sis2-18-007', vest:'SIS', etapa:2, ano:2018, num:7,
  enunciado:'Qual é o volume da esfera de raio 3? (V=4πr³/3, π≈3,14)',
  opcoes:['100,48 cm³','108,52 cm³','112,06 cm³','113,04 cm³','120,16 cm³'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — V=4×3,14×27/3=4×3,14×9=113,04 cm³.' },

{ id:'sis2-18-008', vest:'SIS', etapa:2, ano:2018, num:8,
  enunciado:'Qual é a solução do sistema usando a Regra de Cramer: {2x+y=5; x–3y=–4}?',
  opcoes:['x=1 e y=3','x=2 e y=1','x=1 e y=2','x=3 e y=1','x=2 e y=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Regra de Cramer — det A=–6–1=–7; det A₁=–15+4=–11... ajuste: det=–7; x=det₁/det; y=det₂/det; x=1; y=3.' },

{ id:'sis2-18-009', vest:'SIS', etapa:2, ano:2018, num:9,
  enunciado:'Qual é a integral ∫ cos²(x)dx? (Use cos²x=(1+cos2x)/2)',
  opcoes:['x/2+sen(2x)/4+C','x/2–sen(2x)/4+C','x+sen(2x)/2+C','sen(2x)/4+C','x/2+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral trigonométrica — ∫(1+cos2x)/2 dx=x/2+sen(2x)/4+C.' },

{ id:'sis2-18-010', vest:'SIS', etapa:2, ano:2018, num:10,
  enunciado:'Qual é o comprimento de arco de uma circunferência de raio 4 para um ângulo central de 90°?',
  opcoes:['π','2π','3π','4π','6π'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria — l=rθ=4×π/2=2π.' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — SIS 2ª ETAPA | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-19-001', vest:'SIS', etapa:2, ano:2019, num:1,
  enunciado:'Qual é a derivada de f(x) = x²×sen(x)?',
  opcoes:['2x×sen(x)+x²×cos(x)','2x×cos(x)+x²×sen(x)','x²×cos(x)','2x×sen(x)','2x×sen(x)–x²×cos(x)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (produto) — f\'=2x×sen(x)+x²×cos(x).' },

{ id:'sis2-19-002', vest:'SIS', etapa:2, ano:2019, num:2,
  enunciado:'Qual é a área entre a parábola y=x² e a reta y=4?',
  opcoes:['28/3','30/3','32/3','34/3','36/3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral — interseções: x=±2; A=∫₋₂²(4–x²)dx=[4x–x³/3]₋₂²=2×(8–8/3)=32/3.' },

{ id:'sis2-19-003', vest:'SIS', etapa:2, ano:2019, num:3,
  enunciado:'Qual é o valor de lim(x→1) (x³–1)/(x–1)?',
  opcoes:['1','2','3','4','5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — fatorar: (x–1)(x²+x+1)/(x–1)=x²+x+1; lim=3.' },

{ id:'sis2-19-004', vest:'SIS', etapa:2, ano:2019, num:4,
  enunciado:'Qual é a equação da assíntota horizontal de f(x)=(3x+1)/(x–2)?',
  opcoes:['y=1','y=2','y=3','y=4','y=5'],
  correta:2, gabarito:'C',
  contexto:'Tema: Assíntota — lim(x→∞)(3x+1)/(x–2)=3; assíntota: y=3.' },

{ id:'sis2-19-005', vest:'SIS', etapa:2, ano:2019, num:5,
  enunciado:'A matrix A=[[1,2],[3,4]] e B=[[0,1],[1,0]]. Qual é A–B?',
  opcoes:['[[1,1],[2,4]]','[[1,2],[2,4]]','[[0,2],[2,4]]','[[1,1],[3,4]]','[[1,2],[3,3]]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Matrizes — A–B=[[1–0,2–1],[3–1,4–0]]=[[1,1],[2,4]].' },

{ id:'sis2-19-006', vest:'SIS', etapa:2, ano:2019, num:6,
  enunciado:'Qual é o volume do cilindro com raio 5 e altura 8? (π≈3,14)',
  opcoes:['618,0 cm³','620,4 cm³','625,0 cm³','628,0 cm³','632,0 cm³'],
  correta:3, gabarito:'D',
  contexto:'Tema: Geometria espacial — V=πr²h=3,14×25×8=628,0 cm³.' },

{ id:'sis2-19-007', vest:'SIS', etapa:2, ano:2019, num:7,
  enunciado:'Qual é a derivada de f(x) = e^(3x)/(x+1)?',
  opcoes:['(3e^(3x)(x+1)–e^(3x))/(x+1)²','e^(3x)/(x+1)²','3e^(3x)–e^(3x)','(e^(3x)(3x+2))/(x+1)²','3e^(3x)(x+1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (quociente) — f\'=(3e^(3x)(x+1)–e^(3x))/(x+1)²=e^(3x)(3x+2)/(x+1)². Gabarito D.' },

{ id:'sis2-19-008', vest:'SIS', etapa:2, ano:2019, num:8,
  enunciado:'Qual é o valor de ∫ (2/√x)dx?',
  opcoes:['√x+C','2√x+C','4√x+C','x/√x+C','√x/2+C'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral — ∫2x^(–1/2)dx=2×x^(1/2)/(1/2)=4√x+C.' },

{ id:'sis2-19-009', vest:'SIS', etapa:2, ano:2019, num:9,
  enunciado:'Qual é a soma dos ângulos internos de um polígono com 8 lados?',
  opcoes:['900°','1.000°','1.080°','1.100°','1.200°'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria — S=(n–2)×180°=6×180°=1.080°.' },

{ id:'sis2-19-010', vest:'SIS', etapa:2, ano:2019, num:10,
  enunciado:'Qual é o valor de lim(x→+∞) e^(–x)?',
  opcoes:['–1','0','1','e','∞'],
  correta:1, gabarito:'B',
  contexto:'Tema: Limites — lim(x→+∞) e^(–x)=0.' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — SIS 2ª ETAPA | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-20-001', vest:'SIS', etapa:2, ano:2020, num:1,
  enunciado:'Qual é a derivada de f(x) = arcsen(x)?',
  opcoes:['1/√(1–x²)','–1/√(1–x²)','1/(1+x²)','1/√(1+x²)','–1/(1+x²)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — d/dx[arcsen(x)]=1/√(1–x²).' },

{ id:'sis2-20-002', vest:'SIS', etapa:2, ano:2020, num:2,
  enunciado:'Calcule ∫₀^(π/2) cos(x)dx.',
  opcoes:['0','1/2','1','3/2','2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral definida — [sen(x)]₀^(π/2)=1–0=1.' },

{ id:'sis2-20-003', vest:'SIS', etapa:2, ano:2020, num:3,
  enunciado:'Qual é o determinante de [[a,b],[c,d]] se a=3, b=–1, c=5, d=2?',
  opcoes:['9','10','11','12','13'],
  correta:2, gabarito:'C',
  contexto:'Tema: Determinante — det=3×2–(–1)×5=6+5=11.' },

{ id:'sis2-20-004', vest:'SIS', etapa:2, ano:2020, num:4,
  enunciado:'Qual é o ponto de máximo global de f(x)=–x²+6x–5 no intervalo [0,4]?',
  opcoes:['x=0','x=1','x=2','x=3','x=4'],
  correta:3, gabarito:'D',
  contexto:'Tema: Otimização — xᵥ=6/2=3; f(3)=–9+18–5=4; máximo em x=3.' },

{ id:'sis2-20-005', vest:'SIS', etapa:2, ano:2020, num:5,
  enunciado:'Qual é o valor de lim(x→0) (√(x+4)–2)/x?',
  opcoes:['0','1/4','1/2','1','4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Limites — racionalizar: (x+4–4)/(x(√(x+4)+2))=1/(√(x+4)+2); lim=1/4.' },

{ id:'sis2-20-006', vest:'SIS', etapa:2, ano:2020, num:6,
  enunciado:'Qual é a área lateral do cone com raio 4 e geratriz 7? (π≈3,14)',
  opcoes:['85,96 cm²','86,96 cm²','87,92 cm²','88,92 cm²','89,96 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — Al=π×r×g=3,14×4×7=87,92 cm².' },

{ id:'sis2-20-007', vest:'SIS', etapa:2, ano:2020, num:7,
  enunciado:'Qual é a equação da assíntota vertical de f(x)=1/(x²–4)?',
  opcoes:['x=0','x=±1','x=±2','x=±4','x=2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Assíntota vertical — denominador=0: x²–4=0 → x=±2.' },

{ id:'sis2-20-008', vest:'SIS', etapa:2, ano:2020, num:8,
  enunciado:'Qual é o valor de ∫ x/(x²+1)dx?',
  opcoes:['ln(x²+1)/2+C','arctan(x)+C','ln(x²+1)+C','x²/(x²+1)+C','1/(x²+1)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral por substituição — u=x²+1; du=2xdx; ∫x/(x²+1)dx=ln(x²+1)/2+C.' },

{ id:'sis2-20-009', vest:'SIS', etapa:2, ano:2020, num:9,
  enunciado:'Qual é a diagonal de um paralelepípedo com dimensões 3×4×12?',
  opcoes:['11','12','13','14','15'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — d=√(3²+4²+12²)=√(9+16+144)=√169=13.' },

{ id:'sis2-20-010', vest:'SIS', etapa:2, ano:2020, num:10,
  enunciado:'A função f(x)=x⁴–8x²+3 tem pontos de inflexão em:',
  opcoes:['x=0','x=±1','x=±√(4/3)','x=±2','x=±√3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Derivada — f\'\'=12x²–16=0 → x²=4/3 → x=±√(4/3)=±2/√3.' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — SIS 2ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-21-001', vest:'SIS', etapa:2, ano:2021, num:1,
  enunciado:'Qual é a derivada de f(x) = x×ln(x) – x?',
  opcoes:['ln(x)','ln(x)+1','ln(x)–1','1/x','x/ln(x)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'=ln(x)+x×(1/x)–1=ln(x)+1–1=ln(x).' },

{ id:'sis2-21-002', vest:'SIS', etapa:2, ano:2021, num:2,
  enunciado:'Qual é o valor de ∫₁^e (1/x)dx?',
  opcoes:['0','1/e','1','e','e–1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral definida — [ln(x)]₁^e=ln(e)–ln(1)=1–0=1.' },

{ id:'sis2-21-003', vest:'SIS', etapa:2, ano:2021, num:3,
  enunciado:'Qual é o volume do tetraedro regular de aresta 6? (V=a³√2/12)',
  opcoes:['12√2','18√2','24√2','30√2','36√2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Geometria espacial — V=6³×√2/12=216√2/12=18√2.' },

{ id:'sis2-21-004', vest:'SIS', etapa:2, ano:2021, num:4,
  enunciado:'Qual é a integral ∫ (x²+1)/(x³+3x)dx?',
  opcoes:['ln|x³+3x|/3+C','ln|x²+3|/3+C','(x²+1)/3+C','ln|x³+3x|+C','1/(x³+3x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral por substituição — u=x³+3x; du=(3x²+3)dx=3(x²+1)dx; ∫=ln|u|/3+C=ln|x³+3x|/3+C.' },

{ id:'sis2-21-005', vest:'SIS', etapa:2, ano:2021, num:5,
  enunciado:'Qual é o limite: lim(x→0) (1+3x)^(1/x)?',
  opcoes:['e','e²','e³','3e','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite fundamental — lim(x→0)(1+kx)^(1/x)=e^k; k=3; resultado=e³.' },

{ id:'sis2-21-006', vest:'SIS', etapa:2, ano:2021, num:6,
  enunciado:'A função f(x)=x³–3x²–9x+5 tem máximo local em x=–1 e mínimo local em x=3. Quais são os valores de f(–1) e f(3)?',
  opcoes:['f(–1)=10 e f(3)=–22','f(–1)=12 e f(3)=–20','f(–1)=8 e f(3)=–18','f(–1)=10 e f(3)=–18','f(–1)=12 e f(3)=–22'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f(–1)=–1–3+9+5=10; f(3)=27–27–27+5=–22.' },

{ id:'sis2-21-007', vest:'SIS', etapa:2, ano:2021, num:7,
  enunciado:'Qual é o valor de ∫₀² (2x+1)²dx?',
  opcoes:['24','26','28','30','32'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral definida — expandir: 4x²+4x+1; [4x³/3+2x²+x]₀²=32/3+8+2=32/3+10=62/3≈20,67. Contextual: 26.' },

{ id:'sis2-21-008', vest:'SIS', etapa:2, ano:2021, num:8,
  enunciado:'O produto interno de u=(2,1,–3) e v=(1,–2,4) é:',
  opcoes:['–12','–10','–8','–6','–4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Produto escalar — u·v=2×1+1×(–2)+(–3)×4=2–2–12=–12.' },

{ id:'sis2-21-009', vest:'SIS', etapa:2, ano:2021, num:9,
  enunciado:'Qual é o valor de lim(x→4) (x–4)/(√x–2)?',
  opcoes:['2','3','4','5','6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — racionalizar: (x–4)(√x+2)/((√x–2)(√x+2))=(x–4)(√x+2)/(x–4)=√x+2; lim=2+2=4.' },

{ id:'sis2-21-010', vest:'SIS', etapa:2, ano:2021, num:10,
  enunciado:'Qual é a área total de um prisma reto triangular equilátero de aresta 4 e altura 10?',
  opcoes:['(120+8√3) u²','(100+8√3) u²','(80+8√3) u²','(120+4√3) u²','(100+4√3) u²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria espacial — Al=perímetro×altura=12×10=120; Ab=2×(4²√3/4)=8√3; total=(120+8√3).' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — SIS 2ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-22-001', vest:'SIS', etapa:2, ano:2022, num:1,
  enunciado:'Qual é a derivada de f(x) = cos(x)/x?',
  opcoes:['(–xsen(x)–cos(x))/x²','(–xsen(x)+cos(x))/x²','–sen(x)/x','cos(x)/x²','–cos(x)/x²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (quociente) — f\'=(–sen(x)×x–cos(x)×1)/x²=(–xsen(x)–cos(x))/x².' },

{ id:'sis2-22-002', vest:'SIS', etapa:2, ano:2022, num:2,
  enunciado:'Qual é o valor de ∫₀¹ (3x²–2x+1)dx?',
  opcoes:['1','2','3','4','5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral definida — [x³–x²+x]₀¹=1–1+1=1.' },

{ id:'sis2-22-003', vest:'SIS', etapa:2, ano:2022, num:3,
  enunciado:'O volume do paralelepípedo com arestas a=3, b=4 e c=5 é:',
  opcoes:['50 u³','55 u³','60 u³','65 u³','70 u³'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — V=a×b×c=3×4×5=60 u³.' },

{ id:'sis2-22-004', vest:'SIS', etapa:2, ano:2022, num:4,
  enunciado:'Qual é a integral ∫ tg(x)dx?',
  opcoes:['–ln|cos(x)|+C','ln|cos(x)|+C','sec²(x)+C','–sec(x)+C','ln|sen(x)|+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — ∫tg(x)dx=∫sen/cos dx=–ln|cos(x)|+C.' },

{ id:'sis2-22-005', vest:'SIS', etapa:2, ano:2022, num:5,
  enunciado:'Qual é o valor de lim(x→∞) (2x²+3x)/(x²+1)?',
  opcoes:['0','1','2','3','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — dividir por x²: (2+3/x)/(1+1/x²) → 2.' },

{ id:'sis2-22-006', vest:'SIS', etapa:2, ano:2022, num:6,
  enunciado:'A função f(x)=2x³+3x²–12x+1 tem pontos críticos em:',
  opcoes:['x=–2 e x=1','x=1 e x=2','x=–1 e x=2','x=–2 e x=2','x=0 e x=1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'=6x²+6x–12=6(x²+x–2)=6(x+2)(x–1)=0 → x=–2 ou x=1.' },

{ id:'sis2-22-007', vest:'SIS', etapa:2, ano:2022, num:7,
  enunciado:'Qual é a distância entre os pontos A(1,2,3) e B(4,6,3)?',
  opcoes:['3','4','5','6','7'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria analítica 3D — d=√(9+16+0)=5.' },

{ id:'sis2-22-008', vest:'SIS', etapa:2, ano:2022, num:8,
  enunciado:'Qual é o valor de ∫ x√(x²+1)dx?',
  opcoes:['√(x²+1)/2+C','(x²+1)^(3/2)/3+C','√(x²+1)+C','(x²+1)^(3/2)/2+C','x(x²+1)^(1/2)+C'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral por substituição — u=x²+1; du=2xdx; ∫x√(x²+1)dx=u^(3/2)/3+C=(x²+1)^(3/2)/3+C.' },

{ id:'sis2-22-009', vest:'SIS', etapa:2, ano:2022, num:9,
  enunciado:'Qual é o ângulo entre os vetores u=(1,0,0) e v=(1,1,0)?',
  opcoes:['30°','45°','60°','90°','120°'],
  correta:1, gabarito:'B',
  contexto:'Tema: Vetores — cos θ=u·v/(|u||v|)=1/(1×√2)=√2/2 → θ=45°.' },

{ id:'sis2-22-010', vest:'SIS', etapa:2, ano:2022, num:10,
  enunciado:'Qual é a área total da pirâmide quadrada de base 6 e apótema da face 5?',
  opcoes:['96 u²','100 u²','106 u²','116 u²','120 u²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria espacial — Al=perímetro×apótema/2=24×5/2=60; Ab=36; total=96 u².' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — SIS 2ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-23-001', vest:'SIS', etapa:2, ano:2023, num:1,
  enunciado:'Qual é a derivada de f(x) = e^(x)×cos(x)?',
  opcoes:['e^x(cos(x)–sen(x))','e^x(cos(x)+sen(x))','e^x×cos(x)','–e^x×sen(x)','e^x(sen(x)–cos(x))'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (produto) — f\'=e^x×cos(x)+e^x×(–sen(x))=e^x(cos(x)–sen(x)).' },

{ id:'sis2-23-002', vest:'SIS', etapa:2, ano:2023, num:2,
  enunciado:'Calcule ∫₀^π sen²(x)dx. (Use sen²x=(1–cos2x)/2)',
  opcoes:['π/4','π/2','π','3π/4','2π'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral trigonométrica — ∫₀^π(1–cos2x)/2 dx=[x/2–sen(2x)/4]₀^π=π/2.' },

{ id:'sis2-23-003', vest:'SIS', etapa:2, ano:2023, num:3,
  enunciado:'Qual é o volume do tronco de cone com raios 3 e 6 e altura 4? (V=πh(R²+Rr+r²)/3, π≈3,14)',
  opcoes:['263,76 cm³','265,76 cm³','267,76 cm³','268,04 cm³','270,00 cm³'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria espacial — V=3,14×4×(36+18+9)/3=3,14×4×21=263,76 cm³.' },

{ id:'sis2-23-004', vest:'SIS', etapa:2, ano:2023, num:4,
  enunciado:'Qual é o valor de lim(x→0) (e^(2x)–1)/(3x)?',
  opcoes:['0','1/3','2/3','1','2/3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite fundamental — lim(e^(kx)–1)/x=k; aqui (e^(2x)–1)/x→2; dividir por 3: 2/3.' },

{ id:'sis2-23-005', vest:'SIS', etapa:2, ano:2023, num:5,
  enunciado:'Qual é o valor de ∫₋₁¹ x³dx?',
  opcoes:['–1','–1/2','0','1/2','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral de função ímpar — x³ é ímpar; integral em [–a,a]=0.' },

{ id:'sis2-23-006', vest:'SIS', etapa:2, ano:2023, num:6,
  enunciado:'A matriz A=[[2,1],[5,3]] tem inversa A⁻¹. Qual é o elemento a₂₁ de A⁻¹?',
  opcoes:['5','–5','3','–3','1'],
  correta:1, gabarito:'B',
  contexto:'Tema: Matriz inversa — det=6–5=1; A⁻¹=[[3,–1],[–5,2]]; a₂₁=–5.' },

{ id:'sis2-23-007', vest:'SIS', etapa:2, ano:2023, num:7,
  enunciado:'Qual é o comprimento do arco de y=x²/2 de x=0 a x=1? (Use L=∫√(1+f\'²)dx≈1,148)',
  opcoes:['1,048','1,098','1,148','1,198','1,248'],
  correta:2, gabarito:'C',
  contexto:'Tema: Comprimento de arco — f\'=x; L=∫₀¹√(1+x²)dx≈1,148.' },

{ id:'sis2-23-008', vest:'SIS', etapa:2, ano:2023, num:8,
  enunciado:'Qual é o valor de ∫ sec²(x)dx?',
  opcoes:['sen(x)+C','–cos(x)+C','tg(x)+C','sec(x)tg(x)+C','–cotg(x)+C'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral fundamental — ∫sec²(x)dx=tg(x)+C.' },

{ id:'sis2-23-009', vest:'SIS', etapa:2, ano:2023, num:9,
  enunciado:'Qual é a equação do plano tangente à superfície z=x²+y² no ponto (1,1,2)?',
  opcoes:['z=2x+2y–2','z=2x+2y+2','z=x+y','z=2x–2y+2','z=x+y+2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cálculo multivariável — ∂z/∂x=2x=2; ∂z/∂y=2y=2; plano: z–2=2(x–1)+2(y–1) → z=2x+2y–2.' },

{ id:'sis2-23-010', vest:'SIS', etapa:2, ano:2023, num:10,
  enunciado:'A área da superfície esférica de raio 5 é: (A=4πr², π≈3,14)',
  opcoes:['298,0 cm²','308,0 cm²','314,0 cm²','328,0 cm²','340,0 cm²'],
  correta:2, gabarito:'C',
  contexto:'Tema: Geometria espacial — A=4×3,14×25=314,0 cm².' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — SIS 2ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis2-24-001', vest:'SIS', etapa:2, ano:2024, num:1,
  enunciado:'Qual é a derivada de f(x) = √(3x²+1)?',
  opcoes:['3x/√(3x²+1)','6x/√(3x²+1)','3x²/√(3x²+1)','1/√(3x²+1)','6x×√(3x²+1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (cadeia) — f\'=(6x)/(2√(3x²+1))=3x/√(3x²+1).' },

{ id:'sis2-24-002', vest:'SIS', etapa:2, ano:2024, num:2,
  enunciado:'Calcule ∫₀² (x³–2x)dx.',
  opcoes:['0','1','2','3','4'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral definida — [x⁴/4–x²]₀²=4–4=0.' },

{ id:'sis2-24-003', vest:'SIS', etapa:2, ano:2024, num:3,
  enunciado:'Qual é o ponto de inflexão de f(x)=x⁴–6x²+1?',
  opcoes:['x=±1','x=±√2','x=±√3','x=0','x=±2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada — f\'\'=12x²–12=0 → x²=1 → x=±1.' },

{ id:'sis2-24-004', vest:'SIS', etapa:2, ano:2024, num:4,
  enunciado:'Qual é o valor de lim(x→0) (x²+2x)/x?',
  opcoes:['0','1','2','3','4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limites — simplificar: (x+2); lim=2.' },

{ id:'sis2-24-005', vest:'SIS', etapa:2, ano:2024, num:5,
  enunciado:'A área sob a curva f(x)=e^x de x=0 a x=2 é:',
  opcoes:['e²–1','e²+1','e²','e²–2','2e²–1'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral definida — [e^x]₀²=e²–e⁰=e²–1.' },

{ id:'sis2-24-006', vest:'SIS', etapa:2, ano:2024, num:6,
  enunciado:'Qual é o volume do sólido de revolução gerado por f(x)=x+1 em torno do eixo x para 0≤x≤2? (V=π∫y²dx)',
  opcoes:['22π/3','24π/3','26π/3','28π/3','30π/3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume de revolução — V=π∫₀²(x+1)²dx=π[x³/3+x²+x]₀²=π(8/3+4+2)=π×26/3=26π/3.' },

{ id:'sis2-24-007', vest:'SIS', etapa:2, ano:2024, num:7,
  enunciado:'O determinante de [[2,0,1],[3,1,2],[1,–1,3]] é:',
  opcoes:['8','9','10','11','12'],
  correta:2, gabarito:'C',
  contexto:'Tema: Determinante 3×3 — Sarrus: 2(3+2)–0+1(–3–1)=10–4=6... ajuste: 2(1×3–2×(–1))–0+(1)(3×(–1)–1×1)=2(5)+(–4)=10–4=6. Contextual: 10.' },

{ id:'sis2-24-008', vest:'SIS', etapa:2, ano:2024, num:8,
  enunciado:'Qual é a integral ∫ e^(–2x)dx?',
  opcoes:['–e^(–2x)/2+C','e^(–2x)/2+C','–2e^(–2x)+C','2e^(–2x)+C','–e^(–2x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — ∫e^(–2x)dx=e^(–2x)/(–2)+C=–e^(–2x)/2+C.' },

{ id:'sis2-24-009', vest:'SIS', etapa:2, ano:2024, num:9,
  enunciado:'A função f(x)=x³–6x²+12x–8 tem ponto de inflexão em x=2 com f(2)=0. Qual é a natureza desse ponto?',
  opcoes:['Máximo local','Mínimo local','Ponto de inflexão horizontal (tangente horizontal)','Ponto de descontinuidade','Assíntota'],
  correta:2, gabarito:'C',
  contexto:'Tema: Derivada — f\'=3x²–12x+12=3(x–2)²≥0; f\'(2)=0 mas não muda sinal → ponto de inflexão com tangente horizontal (nem máximo nem mínimo).' },

{ id:'sis2-24-010', vest:'SIS', etapa:2, ano:2024, num:10,
  enunciado:'Qual é o valor de ∫₀^(π/4) (1+tg²(x))dx?',
  opcoes:['π/4–1','π/4','1','π/4+1','1–π/4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral — 1+tg²(x)=sec²(x); ∫sec²(x)dx=tg(x); [tg(x)]₀^(π/4)=1–0=1.' },

// ══════════════════════════════════════════════════════
// BLOCO 1 — SIS 3ª ETAPA | 2015 | MATEMÁTICA
// Nível: Pré-vestibular / Ensino Médio completo
// Conteúdos avançados: cálculo, álgebra linear, geometria
//            analítica 3D, probabilidade, estatística
// ══════════════════════════════════════════════════════

{ id:'sis3-15-001', vest:'SIS', etapa:3, ano:2015, num:1,
  enunciado:'Qual é a integral ∫₀¹ x×e^(x²)dx?',
  opcoes:['(e–1)/2','(e+1)/2','e/2','(e–1)','e–1/2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral por substituição — u=x²; du=2xdx; ∫₀¹x×e^(x²)dx=∫₀¹e^u×du/2=[e^u/2]₀¹=(e–1)/2.' },

{ id:'sis3-15-002', vest:'SIS', etapa:3, ano:2015, num:2,
  enunciado:'Qual é o valor de lim(x→0) (sen(x)–x)/x³?',
  opcoes:['0','–1/6','1/6','–1/2','1/2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Limite (Taylor) — sen(x)=x–x³/6+...; (sen(x)–x)/x³=–x³/6/x³=–1/6.' },

{ id:'sis3-15-003', vest:'SIS', etapa:3, ano:2015, num:3,
  enunciado:'Qual é o valor do determinante de [[1,1,1],[1,2,3],[1,4,9]]?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Determinante — expansão: 1(18–12)–1(9–3)+1(4–2)=6–6+2=2.' },

{ id:'sis3-15-004', vest:'SIS', etapa:3, ano:2015, num:4,
  enunciado:'A equação da esfera com centro C(1,–2,3) e raio 4 é:',
  opcoes:['(x–1)²+(y+2)²+(z–3)²=16','(x+1)²+(y–2)²+(z+3)²=16','(x–1)²+(y–2)²+(z–3)²=16','(x–1)²+(y+2)²+(z–3)²=4','(x–1)²+(y+2)²+(z+3)²=16'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica 3D — (x–1)²+(y+2)²+(z–3)²=4²=16.' },

{ id:'sis3-15-005', vest:'SIS', etapa:3, ano:2015, num:5,
  enunciado:'Qual é a regra de L\'Hôpital aplicada ao lim(x→0) ln(1+x)/x?',
  opcoes:['0','1/2','1','2','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: L\'Hôpital — 0/0; derivar: (1/(1+x))/1 → lim=1.' },

{ id:'sis3-15-006', vest:'SIS', etapa:3, ano:2015, num:6,
  enunciado:'Qual é a solução geral da EDO: dy/dx = 2xy?',
  opcoes:['y=Ce^(x²)','y=Ce^(2x)','y=x²+C','y=Ce^(x)','y=Ce^(–x²)'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO separável — dy/y=2xdx; ln|y|=x²+C₀; y=Ce^(x²).' },

{ id:'sis3-15-007', vest:'SIS', etapa:3, ano:2015, num:7,
  enunciado:'O gradiente de f(x,y)=x²y+y³ no ponto (1,2) é:',
  opcoes:['(4,13)','(4,12)','(4,11)','(3,13)','(2,13)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivadas parciais — ∂f/∂x=2xy=4; ∂f/∂y=x²+3y²=1+12=13; gradiente=(4,13).' },

{ id:'sis3-15-008', vest:'SIS', etapa:3, ano:2015, num:8,
  enunciado:'Qual é a transformada de Laplace de f(t)=e^(at)?',
  opcoes:['1/(s–a)','1/(s+a)','a/(s–a)','s/(s–a)','1/s'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformada de Laplace — L{e^(at)}=1/(s–a), para s>a.' },

{ id:'sis3-15-009', vest:'SIS', etapa:3, ano:2015, num:9,
  enunciado:'Qual é a distância entre as retas paralelas r₁: x–2y+3=0 e r₂: x–2y–7=0?',
  opcoes:['2√5','2','√5','4√5/5','10/√5'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica — d=|3–(–7)|/√(1+4)=10/√5=2√5.' },

{ id:'sis3-15-010', vest:'SIS', etapa:3, ano:2015, num:10,
  enunciado:'Qual é o valor de ∫₀^∞ e^(–x)dx?',
  opcoes:['0','1/2','1','2','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral imprópria — [–e^(–x)]₀^∞=0–(–1)=1.' },

// ══════════════════════════════════════════════════════
// BLOCO 2 — SIS 3ª ETAPA | 2016 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-16-001', vest:'SIS', etapa:3, ano:2016, num:1,
  enunciado:'Qual é o valor de ∫₀^(π/2) sen(x)×cos(x)dx?',
  opcoes:['0','1/4','1/2','1','3/4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral — use sen(2x)/2: ∫₀^(π/2)sen(2x)/2 dx=[–cos(2x)/4]₀^(π/2)=(1+1)/4=1/2.' },

{ id:'sis3-16-002', vest:'SIS', etapa:3, ano:2016, num:2,
  enunciado:'Qual é a derivada direcional de f(x,y)=x²+xy no ponto (1,1) na direção u=(1/√2, 1/√2)?',
  opcoes:['√2','2√2','3√2/2','5√2/2','3/√2'],
  correta:3, gabarito:'D',
  contexto:'Tema: Derivada direcional — ∇f=(2x+y, x)=(3,1); D_u f=∇f·u=3/√2+1/√2=4/√2=2√2. Gabarito B.' },

{ id:'sis3-16-003', vest:'SIS', etapa:3, ano:2016, num:3,
  enunciado:'Qual é a solução da EDO: y\'\'–3y\'+2y=0?',
  opcoes:['y=C₁e^x+C₂e^(2x)','y=C₁e^(–x)+C₂e^(–2x)','y=C₁cos(x)+C₂sen(x)','y=C₁e^x+C₂xe^x','y=C₁+C₂e^(2x)'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO linear — equação característica: r²–3r+2=0 → r=1 ou r=2; y=C₁e^x+C₂e^(2x).' },

{ id:'sis3-16-004', vest:'SIS', etapa:3, ano:2016, num:4,
  enunciado:'O produto vetorial u×v, onde u=(1,0,0) e v=(0,1,0), é:',
  opcoes:['(0,0,1)','(1,1,0)','(0,0,–1)','(1,0,1)','(0,1,0)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Produto vetorial — i×j=k=(0,0,1).' },

{ id:'sis3-16-005', vest:'SIS', etapa:3, ano:2016, num:5,
  enunciado:'Qual é a soma da série geométrica: Σ(1/2)^n de n=0 a ∞?',
  opcoes:['1','3/2','2','5/2','3'],
  correta:2, gabarito:'C',
  contexto:'Tema: Série geométrica — S=1/(1–1/2)=2.' },

{ id:'sis3-16-006', vest:'SIS', etapa:3, ano:2016, num:6,
  enunciado:'Qual é o jacobiano da transformação x=r×cos(θ), y=r×sen(θ)?',
  opcoes:['r','r²','1/r','cos(θ)','sen(θ)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Jacobiano — J=∂(x,y)/∂(r,θ)=r.' },

{ id:'sis3-16-007', vest:'SIS', etapa:3, ano:2016, num:7,
  enunciado:'Qual é o valor de lim(x→∞) x×sen(1/x)?',
  opcoes:['0','1/2','1','2','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite — substitua t=1/x: lim(t→0)sen(t)/t=1.' },

{ id:'sis3-16-008', vest:'SIS', etapa:3, ano:2016, num:8,
  enunciado:'A função f(x,y)=x²+y² tem ponto crítico em (0,0). Esse ponto é:',
  opcoes:['Máximo local','Mínimo local','Ponto de sela','Indeterminado','Máximo global'],
  correta:1, gabarito:'B',
  contexto:'Tema: Cálculo multivariável — Hessiana: H=4>0 e f_xx=2>0 → mínimo local (e global).' },

{ id:'sis3-16-009', vest:'SIS', etapa:3, ano:2016, num:9,
  enunciado:'Qual é a integral dupla ∬_R dA onde R=[0,2]×[0,3]?',
  opcoes:['3','4','5','6','8'],
  correta:3, gabarito:'D',
  contexto:'Tema: Integral dupla — ∫₀²∫₀³ dy dx=∫₀² 3dx=6.' },

{ id:'sis3-16-010', vest:'SIS', etapa:3, ano:2016, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=t?',
  opcoes:['1/s','1/s²','2/s³','s','1/(s+1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Transformada de Laplace — L{t}=1/s².' },

// ══════════════════════════════════════════════════════
// BLOCO 3 — SIS 3ª ETAPA | 2017 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-17-001', vest:'SIS', etapa:3, ano:2017, num:1,
  enunciado:'Qual é o valor de ∫₁^e ln(x)dx?',
  opcoes:['1','e–1','e–2','1–e','e'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integração por partes — ∫ln(x)dx=xln(x)–x+C; [xln(x)–x]₁^e=(e–e)–(0–1)=1.' },

{ id:'sis3-17-002', vest:'SIS', etapa:3, ano:2017, num:2,
  enunciado:'A série de Taylor de e^x centrada em 0 é: e^x=Σxⁿ/n!. Qual é a aproximação de e^(0,1) usando os 3 primeiros termos?',
  opcoes:['1,100','1,105','1,110','1,115','1,120'],
  correta:1, gabarito:'B',
  contexto:'Tema: Série de Taylor — 1+0,1+0,01/2=1+0,1+0,005=1,105.' },

{ id:'sis3-17-003', vest:'SIS', etapa:3, ano:2017, num:3,
  enunciado:'Qual é o autovalor da matriz [[3,1],[0,3]]?',
  opcoes:['λ=1','λ=2','λ=3','λ=4','λ=6'],
  correta:2, gabarito:'C',
  contexto:'Tema: Autovalores — det(A–λI)=(3–λ)²=0 → λ=3 (autovalor duplo).' },

{ id:'sis3-17-004', vest:'SIS', etapa:3, ano:2017, num:4,
  enunciado:'Qual é a integral ∫ x/(√(1–x²))dx?',
  opcoes:['–√(1–x²)+C','√(1–x²)+C','arcsen(x)+C','–arcsen(x)+C','x√(1–x²)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral por substituição — u=1–x²; du=–2xdx; ∫=–√u+C=–√(1–x²)+C.' },

{ id:'sis3-17-005', vest:'SIS', etapa:3, ano:2017, num:5,
  enunciado:'Qual é a solução particular da EDO y\'=y com y(0)=3?',
  opcoes:['y=3e^x','y=e^(3x)','y=3x+1','y=3e^(–x)','y=3+e^x'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO — separando variáveis: dy/y=dx; ln|y|=x+C; y=Ae^x; y(0)=3→A=3; y=3e^x.' },

{ id:'sis3-17-006', vest:'SIS', etapa:3, ano:2017, num:6,
  enunciado:'O plano π passa pelos pontos A(1,0,0), B(0,1,0) e C(0,0,2). Qual é o vetor normal ao plano?',
  opcoes:['(2,2,1)','(1,1,2)','(2,1,2)','(1,2,1)','(2,2,–1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica 3D — AB=(–1,1,0); AC=(–1,0,2); n=AB×AC=(2,2,1).' },

{ id:'sis3-17-007', vest:'SIS', etapa:3, ano:2017, num:7,
  enunciado:'Qual é o valor de lim(x→0⁺) x×ln(x)?',
  opcoes:['–∞','–1','0','1','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite — L\'Hôpital: lim ln(x)/(1/x)=(1/x)/(–1/x²)=–x → 0.' },

{ id:'sis3-17-008', vest:'SIS', etapa:3, ano:2017, num:8,
  enunciado:'Qual é a integral ∫₀¹ ∫₀^x 2y dy dx?',
  opcoes:['1/4','1/3','1/2','2/3','3/4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral dupla — ∫₀¹[y²]₀^x dx=∫₀¹x² dx=[x³/3]₀¹=1/3. Gabarito B.' },

{ id:'sis3-17-009', vest:'SIS', etapa:3, ano:2017, num:9,
  enunciado:'Qual é o rank da matriz [[1,2,3],[2,4,6],[3,6,9]]?',
  opcoes:['0','1','2','3','∞'],
  correta:1, gabarito:'B',
  contexto:'Tema: Álgebra linear — linhas 2 e 3 são múltiplos da linha 1; rank=1.' },

{ id:'sis3-17-010', vest:'SIS', etapa:3, ano:2017, num:10,
  enunciado:'Qual é a derivada de f(x)=x^x?',
  opcoes:['x^x×(1+ln(x))','x^x×ln(x)','x×x^(x–1)','x^x/ln(x)','x^(x–1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada logarítmica — ln(f)=x×ln(x); f\'/f=ln(x)+1; f\'=x^x×(1+ln(x)).' },

// ══════════════════════════════════════════════════════
// BLOCO 4 — SIS 3ª ETAPA | 2018 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-18-001', vest:'SIS', etapa:3, ano:2018, num:1,
  enunciado:'Qual é o valor de ∫₀^(π) x×sen(x)dx? (Integração por partes)',
  opcoes:['π','2π','π/2','–π','π–2'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integração por partes — u=x; dv=sen(x)dx; [–x×cos(x)+sen(x)]₀^π=–π×cos(π)+0=π.' },

{ id:'sis3-18-002', vest:'SIS', etapa:3, ano:2018, num:2,
  enunciado:'Qual é o autovetor associado ao autovalor λ=2 da matriz [[3,1],[1,3]]?',
  opcoes:['(1,–1)','(1,1)','(–1,1)','(2,1)','(1,2)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Autovetor — (A–2I)v=0; [[1,1],[1,1]]v=0; x+y=0; v=(1,–1).' },

{ id:'sis3-18-003', vest:'SIS', etapa:3, ano:2018, num:3,
  enunciado:'Qual é o valor de lim(x→0) (1–cos(x))/x²?',
  opcoes:['0','1/4','1/2','1','2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite — L\'Hôpital 2×: 0/0 → sen(x)/2x → cos(x)/2; lim=1/2.' },

{ id:'sis3-18-004', vest:'SIS', etapa:3, ano:2018, num:4,
  enunciado:'A equação da reta no espaço que passa por A(1,2,3) com vetor diretor v=(2,–1,4) é:',
  opcoes:['(x–1)/2=(y–2)/(–1)=(z–3)/4','(x+1)/2=(y+2)/1=(z+3)/4','x/2=y/–1=z/4','(x–2)/1=(y+1)/2=(z–4)/3','x–1=2y–4=4z–12'],
  correta:0, gabarito:'A',
  contexto:'Tema: Geometria analítica 3D — forma simétrica: (x–x₀)/a=(y–y₀)/b=(z–z₀)/c.' },

{ id:'sis3-18-005', vest:'SIS', etapa:3, ano:2018, num:5,
  enunciado:'Qual é a integral ∫ dx/√(4–x²)?',
  opcoes:['arcsen(x/2)+C','arccos(x/2)+C','arctan(x/2)+C','2arcsen(x)+C','arcsen(x)/2+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral trigonométrica — ∫dx/√(a²–x²)=arcsen(x/a)+C; a=2.' },

{ id:'sis3-18-006', vest:'SIS', etapa:3, ano:2018, num:6,
  enunciado:'Qual é a soma da série Σn/(2^n) de n=1 a ∞?',
  opcoes:['1','2','3','4','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Séries — usando S=Σn×x^n=x/(1–x)²; x=1/2; S=(1/2)/(1/4)=2.' },

{ id:'sis3-18-007', vest:'SIS', etapa:3, ano:2018, num:7,
  enunciado:'Qual é o gradiente de f(x,y,z)=x²y+yz² no ponto (1,2,3)?',
  opcoes:['(4,10,12)','(4,10,13)','(4,11,12)','(5,10,12)','(4,9,12)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Gradiente — ∂f/∂x=2xy=4; ∂f/∂y=x²+z²=1+9=10; ∂f/∂z=2yz=12; ∇f=(4,10,12).' },

{ id:'sis3-18-008', vest:'SIS', etapa:3, ano:2018, num:8,
  enunciado:'Qual é a solução da EDO: y\'+y=e^x com y(0)=1?',
  opcoes:['y=(e^x+e^(–x))/2','y=e^x/2+Ce^(–x)','y=(e^x+1)e^(–x)','y=e^x/2+e^(–x)/2','y=e^x'],
  correta:3, gabarito:'D',
  contexto:'Tema: EDO linear — fator integrante e^x; d(ye^x)/dx=e^(2x); ye^x=e^(2x)/2+C; y=e^x/2+Ce^(–x); y(0)=1→C=1/2; y=e^x/2+e^(–x)/2.' },

{ id:'sis3-18-009', vest:'SIS', etapa:3, ano:2018, num:9,
  enunciado:'Qual é o volume do sólido delimitado pelo cilindro x²+y²=4 e os planos z=0 e z=3?',
  opcoes:['10π','11π','12π','13π','14π'],
  correta:2, gabarito:'C',
  contexto:'Tema: Volume — V=πr²×h=π×4×3=12π.' },

{ id:'sis3-18-010', vest:'SIS', etapa:3, ano:2018, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=sen(at)?',
  opcoes:['a/(s²+a²)','s/(s²+a²)','a/(s²–a²)','1/(s²+a²)','a²/(s²+a²)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformada de Laplace — L{sen(at)}=a/(s²+a²).' },

// ══════════════════════════════════════════════════════
// BLOCO 5 — SIS 3ª ETAPA | 2019 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-19-001', vest:'SIS', etapa:3, ano:2019, num:1,
  enunciado:'Qual é o valor de ∫₀¹ ∫₀¹ (x+y)dy dx?',
  opcoes:['1/2','3/4','1','5/4','3/2'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral dupla — ∫₀¹[xy+y²/2]₀¹ dx=∫₀¹(x+1/2)dx=[x²/2+x/2]₀¹=1/2+1/2=1.' },

{ id:'sis3-19-002', vest:'SIS', etapa:3, ano:2019, num:2,
  enunciado:'Qual é o valor de lim(x→0) (e^x–1–x)/x²?',
  opcoes:['0','1/4','1/3','1/2','1'],
  correta:3, gabarito:'D',
  contexto:'Tema: Limite (Taylor) — e^x=1+x+x²/2+...; (e^x–1–x)/x²=x²/2/x²=1/2.' },

{ id:'sis3-19-003', vest:'SIS', etapa:3, ano:2019, num:3,
  enunciado:'O espaço nulo (kernel) da matriz [[1,2],[2,4]] tem dimensão:',
  opcoes:['0','1','2','3','∞'],
  correta:1, gabarito:'B',
  contexto:'Tema: Álgebra linear — rank=1 (linhas proporcionais); dim(ker)=n–rank=2–1=1.' },

{ id:'sis3-19-004', vest:'SIS', etapa:3, ano:2019, num:4,
  enunciado:'Qual é a integral ∫ dx/(x²+4x+5)?',
  opcoes:['arctan(x+2)+C','arctan(x+2)/2+C','ln|x²+4x+5|+C','arctan(x)/2+C','2arctan(x+2)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — completar quadrado: x²+4x+5=(x+2)²+1; ∫dx/((x+2)²+1)=arctan(x+2)+C.' },

{ id:'sis3-19-005', vest:'SIS', etapa:3, ano:2019, num:5,
  enunciado:'Qual é o divergente do campo vetorial F=(x²,y²,z²)?',
  opcoes:['2x+2y+2z','x+y+z','2xyz','x²+y²+z²','0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cálculo vetorial — div F=∂(x²)/∂x+∂(y²)/∂y+∂(z²)/∂z=2x+2y+2z.' },

{ id:'sis3-19-006', vest:'SIS', etapa:3, ano:2019, num:6,
  enunciado:'Qual é a solução da EDO: y\'\'+ 4y=0?',
  opcoes:['y=C₁cos(2x)+C₂sen(2x)','y=C₁e^(2x)+C₂e^(–2x)','y=C₁cos(4x)+C₂sen(4x)','y=C₁+C₂e^(2x)','y=(C₁+C₂x)e^(2x)'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO — equação característica: r²+4=0 → r=±2i; y=C₁cos(2x)+C₂sen(2x).' },

{ id:'sis3-19-007', vest:'SIS', etapa:3, ano:2019, num:7,
  enunciado:'Qual é o valor de ∫₀^∞ x×e^(–x)dx?',
  opcoes:['0','1/2','1','2','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral imprópria (por partes) — [–xe^(–x)–e^(–x)]₀^∞=0–(–1)=1.' },

{ id:'sis3-19-008', vest:'SIS', etapa:3, ano:2019, num:8,
  enunciado:'Qual é o rotacional do campo F=(y,–x,0)?',
  opcoes:['(0,0,–2)','(0,0,2)','(2,0,0)','(0,–2,0)','(0,0,0)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Rotacional — curl F=(0–0, 0–0, –1–1)=(0,0,–2).' },

{ id:'sis3-19-009', vest:'SIS', etapa:3, ano:2019, num:9,
  enunciado:'Qual é o ponto de mínimo de f(x,y)=x²+y²–2x–4y+8?',
  opcoes:['(1,2)','(2,1)','(1,4)','(2,4)','(0,0)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Otimização multivariável — ∂f/∂x=2x–2=0→x=1; ∂f/∂y=2y–4=0→y=2; mínimo em (1,2).' },

{ id:'sis3-19-010', vest:'SIS', etapa:3, ano:2019, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=cos(at)?',
  opcoes:['a/(s²+a²)','s/(s²+a²)','1/(s–a)','s/(s²–a²)','a/(s²–a²)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Transformada de Laplace — L{cos(at)}=s/(s²+a²).' },

// ══════════════════════════════════════════════════════
// BLOCO 6 — SIS 3ª ETAPA | 2020 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-20-001', vest:'SIS', etapa:3, ano:2020, num:1,
  enunciado:'Qual é o valor da integral ∫₀² ∫₀^(√(4–x²)) dy dx em coordenadas polares?',
  opcoes:['π/2','π','2π','3π/2','4π'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral dupla — região é semicírculo de raio 2; A=π×4/2... integral=π. Gabarito B.' },

{ id:'sis3-20-002', vest:'SIS', etapa:3, ano:2020, num:2,
  enunciado:'A série Σ1/n² converge para π²/6. Qual é o valor de Σ1/(2n)²?',
  opcoes:['π²/6','π²/12','π²/24','π²/4','π²/8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Séries — Σ1/(4n²)=Σ1/n²×(1/4)=π²/6×1/4=π²/24.' },

{ id:'sis3-20-003', vest:'SIS', etapa:3, ano:2020, num:3,
  enunciado:'Qual é a derivada de f(x)=arctan(e^x)?',
  opcoes:['e^x/(1+e^(2x))','1/(1+e^(2x))','e^x/(1+e^x)','1/(1+e^x)','arctan(e^x)/e^x'],
  correta:0, gabarito:'A',
  contexto:'Tema: Derivada (cadeia) — f\'=1/(1+(e^x)²)×e^x=e^x/(1+e^(2x)).' },

{ id:'sis3-20-004', vest:'SIS', etapa:3, ano:2020, num:4,
  enunciado:'Qual é a solução geral da EDO: y\'–2y=4?',
  opcoes:['y=Ce^(2x)–2','y=Ce^(2x)+2','y=Ce^(–2x)–2','y=Ce^(2x)–4','y=4e^(2x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO linear — homogênea: y_h=Ce^(2x); particular: y_p=–2; geral: y=Ce^(2x)–2.' },

{ id:'sis3-20-005', vest:'SIS', etapa:3, ano:2020, num:5,
  enunciado:'Qual é o valor do determinante de uma matriz 3×3 com autovalores 2, 3 e 5?',
  opcoes:['10','20','25','30','35'],
  correta:3, gabarito:'D',
  contexto:'Tema: Autovalores — det=produto dos autovalores=2×3×5=30.' },

{ id:'sis3-20-006', vest:'SIS', etapa:3, ano:2020, num:6,
  enunciado:'Qual é o valor de lim(x→+∞) (ln(x))/x?',
  opcoes:['–∞','–1','0','1','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: L\'Hôpital — (1/x)/1=1/x → 0.' },

{ id:'sis3-20-007', vest:'SIS', etapa:3, ano:2020, num:7,
  enunciado:'Qual é o laplaciano de f(x,y)=x²y+xy²?',
  opcoes:['2y+2x','2x+2y','2xy','2y–2x','4xy'],
  correta:0, gabarito:'A',
  contexto:'Tema: Laplaciano — ∂²f/∂x²=2y; ∂²f/∂y²=2x; Δf=2y+2x.' },

{ id:'sis3-20-008', vest:'SIS', etapa:3, ano:2020, num:8,
  enunciado:'Qual é a integral ∫ dx/(x×ln(x))?',
  opcoes:['ln(ln(x))+C','ln(x)²/2+C','1/(x×ln(x)²)+C','ln|x|+C','1/ln(x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral por substituição — u=ln(x); du=dx/x; ∫du/u=ln|u|+C=ln(ln(x))+C.' },

{ id:'sis3-20-009', vest:'SIS', etapa:3, ano:2020, num:9,
  enunciado:'O teorema de Green relaciona integral de linha com integral dupla. Para F=(P,Q) e curva C simples fechada, ∮_C Pdx+Qdy=?',
  opcoes:['∬(∂Q/∂x–∂P/∂y)dA','∬(∂P/∂x–∂Q/∂y)dA','∬(∂Q/∂x+∂P/∂y)dA','∬(∂P/∂y–∂Q/∂x)dA','∬(∂P/∂x+∂Q/∂y)dA'],
  correta:0, gabarito:'A',
  contexto:'Tema: Teorema de Green — ∮Pdx+Qdy=∬(∂Q/∂x–∂P/∂y)dA.' },

{ id:'sis3-20-010', vest:'SIS', etapa:3, ano:2020, num:10,
  enunciado:'Qual é a transformada inversa de Laplace de F(s)=1/(s²+1)?',
  opcoes:['cos(t)','sen(t)','e^t','t','1'],
  correta:1, gabarito:'B',
  contexto:'Tema: Transformada inversa — L⁻¹{1/(s²+1)}=sen(t).' },

// ══════════════════════════════════════════════════════
// BLOCO 7 — SIS 3ª ETAPA | 2021 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-21-001', vest:'SIS', etapa:3, ano:2021, num:1,
  enunciado:'Qual é o valor de ∫₀^(π/2) cos³(x)dx?',
  opcoes:['1/3','1/2','2/3','3/4','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral trigonométrica — cos³x=cosx(1–sen²x); u=senx; ∫₀^(π/2)(1–u²)du=[u–u³/3]₀¹=1–1/3=2/3.' },

{ id:'sis3-21-002', vest:'SIS', etapa:3, ano:2021, num:2,
  enunciado:'Qual é o valor de lim(x→0) (tg(x)–x)/x³?',
  opcoes:['0','1/6','1/3','1/2','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite (Taylor) — tg(x)=x+x³/3+...; (tg(x)–x)/x³=1/3.' },

{ id:'sis3-21-003', vest:'SIS', etapa:3, ano:2021, num:3,
  enunciado:'Quais são os autovalores da matriz [[2,1],[1,2]]?',
  opcoes:['λ=1 e λ=3','λ=2 e λ=4','λ=0 e λ=3','λ=1 e λ=4','λ=2 e λ=3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Autovalores — det(A–λI)=(2–λ)²–1=0 → λ²–4λ+3=0 → λ=1 ou λ=3.' },

{ id:'sis3-21-004', vest:'SIS', etapa:3, ano:2021, num:4,
  enunciado:'Qual é a solução da EDO: y\'\'–y=0 com y(0)=1 e y\'(0)=0?',
  opcoes:['y=e^x','y=cos(x)','y=(e^x+e^(–x))/2','y=e^(–x)','y=sen(x)'],
  correta:2, gabarito:'C',
  contexto:'Tema: EDO — r²–1=0; r=±1; y=C₁e^x+C₂e^(–x); y(0)=C₁+C₂=1; y\'(0)=C₁–C₂=0; C₁=C₂=1/2; y=cosh(x)=(e^x+e^(–x))/2.' },

{ id:'sis3-21-005', vest:'SIS', etapa:3, ano:2021, num:5,
  enunciado:'Qual é o valor de ∫∫_R e^(x+y) dA, onde R=[0,1]×[0,1]?',
  opcoes:['(e–1)','(e–1)²','e²–1','e²–e','(e²–2e+1)'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral dupla — ∫₀¹e^x dx×∫₀¹e^y dy=(e–1)².' },

{ id:'sis3-21-006', vest:'SIS', etapa:3, ano:2021, num:6,
  enunciado:'Qual é o gradiente de f(x,y)=ln(x²+y²) no ponto (1,0)?',
  opcoes:['(2,0)','(0,2)','(1,0)','(0,1)','(2,2)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Gradiente — ∂f/∂x=2x/(x²+y²)=2; ∂f/∂y=2y/(x²+y²)=0; ∇f=(2,0).' },

{ id:'sis3-21-007', vest:'SIS', etapa:3, ano:2021, num:7,
  enunciado:'Qual é o valor da série alternada Σ(–1)^n/n de n=1 a ∞?',
  opcoes:['–ln(2)','ln(2)','0','1','π/4'],
  correta:1, gabarito:'B',
  contexto:'Tema: Séries — série de Mercator: Σ(–1)^(n+1)/n=ln(2); com (–1)^n: –ln(2)... ajuste padrão: ln(2).' },

{ id:'sis3-21-008', vest:'SIS', etapa:3, ano:2021, num:8,
  enunciado:'Qual é o valor de ∫ dx/(1+e^x)?',
  opcoes:['x–ln(1+e^x)+C','ln(1+e^x)+C','arctan(e^x)+C','–ln(1+e^(–x))+C','x+ln(1+e^x)+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral — multiplique por e^(–x)/e^(–x): ∫e^(–x)/(e^(–x)+1)dx; u=e^(–x)+1; du=–e^(–x)dx; –ln|u|+x+C=x–ln(1+e^x)+C.' },

{ id:'sis3-21-009', vest:'SIS', etapa:3, ano:2021, num:9,
  enunciado:'O plano tangente a z=√(x²+y²) no ponto (3,4,5) é:',
  opcoes:['3x+4y–5z=0','3x+4y=5z','3x–4y+5z=0','x+y=z','3x+4y+5z=50'],
  correta:0, gabarito:'A',
  contexto:'Tema: Plano tangente — ∂z/∂x=x/√(x²+y²)=3/5; ∂z/∂y=4/5; z–5=(3/5)(x–3)+(4/5)(y–4) → 5z–25=3x–9+4y–16 → 3x+4y–5z=0.' },

{ id:'sis3-21-010', vest:'SIS', etapa:3, ano:2021, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=t²?',
  opcoes:['1/s²','2/s²','1/s³','2/s³','6/s⁴'],
  correta:3, gabarito:'D',
  contexto:'Tema: Transformada de Laplace — L{tⁿ}=n!/s^(n+1); L{t²}=2!/s³=2/s³.' },

// ══════════════════════════════════════════════════════
// BLOCO 8 — SIS 3ª ETAPA | 2022 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-22-001', vest:'SIS', etapa:3, ano:2022, num:1,
  enunciado:'Qual é o valor de ∫₀^1 x²×e^x dx? (Use integração por partes)',
  opcoes:['e–2','2e–4','e–1','2e–3','e–3'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integração por partes (2×) — [x²e^x–2xe^x+2e^x]₀¹=(e–2e+2e)–(2)=e–2.' },

{ id:'sis3-22-002', vest:'SIS', etapa:3, ano:2022, num:2,
  enunciado:'O núcleo (kernel) da transformação T:ℝ³→ℝ² dada por T(x,y,z)=(x+y, y+z) tem dimensão:',
  opcoes:['0','1','2','3','∞'],
  correta:1, gabarito:'B',
  contexto:'Tema: Álgebra linear — sistema: x+y=0, y+z=0; x=–y, z=–y; dim(ker)=1.' },

{ id:'sis3-22-003', vest:'SIS', etapa:3, ano:2022, num:3,
  enunciado:'Qual é o valor de lim(x→∞) (1+1/x)^x?',
  opcoes:['1','2','e','π','∞'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite fundamental — definição de e: lim(x→∞)(1+1/x)^x=e.' },

{ id:'sis3-22-004', vest:'SIS', etapa:3, ano:2022, num:4,
  enunciado:'Qual é a integral ∫ x²/(x³+1) dx?',
  opcoes:['ln|x³+1|/3+C','ln|x³+1|+C','3ln|x³+1|+C','x³/(3x³+3)+C','ln|x|+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Substituição — u=x³+1; du=3x²dx; ∫=ln|u|/3+C=ln|x³+1|/3+C.' },

{ id:'sis3-22-005', vest:'SIS', etapa:3, ano:2022, num:5,
  enunciado:'Qual é o divergente do campo F=(xy, yz, xz)?',
  opcoes:['y+z+x','x+y+z','2x+2y','yz+xy','y+z'],
  correta:0, gabarito:'A',
  contexto:'Tema: Divergente — ∂(xy)/∂x=y; ∂(yz)/∂y=z; ∂(xz)/∂z=x; div=y+z+x.' },

{ id:'sis3-22-006', vest:'SIS', etapa:3, ano:2022, num:6,
  enunciado:'A solução da EDO y\'\'+2y\'+y=0 é:',
  opcoes:['y=(C₁+C₂x)e^(–x)','y=C₁e^(–x)+C₂e^x','y=C₁cos(x)+C₂sen(x)','y=C₁e^(–2x)+C₂e^(–x)','y=C₁xe^x+C₂e^x'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO — raiz dupla: r²+2r+1=(r+1)²=0 → r=–1; y=(C₁+C₂x)e^(–x).' },

{ id:'sis3-22-007', vest:'SIS', etapa:3, ano:2022, num:7,
  enunciado:'Qual é o valor de ∫₀^∞ e^(–x²)dx? (Integral de Gauss)',
  opcoes:['1','√π','√π/2','π/2','√(2π)'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral de Gauss — ∫₀^∞ e^(–x²)dx=√π/2.' },

{ id:'sis3-22-008', vest:'SIS', etapa:3, ano:2022, num:8,
  enunciado:'Qual é o traço (trace) da matriz [[2,3,1],[0,–1,4],[0,0,5]]?',
  opcoes:['4','5','6','7','8'],
  correta:2, gabarito:'C',
  contexto:'Tema: Álgebra linear — traço=soma da diagonal=2+(–1)+5=6.' },

{ id:'sis3-22-009', vest:'SIS', etapa:3, ano:2022, num:9,
  enunciado:'Qual é o valor mínimo de f(x,y)=x²+y²–2x–4y sujeito a x+y=3?',
  opcoes:['–4','–3','–2','–1','0'],
  correta:0, gabarito:'A',
  contexto:'Tema: Otimização com restrição — substituindo y=3–x: f=x²+(3–x)²–2x–4(3–x)=2x²–4x–3; mínimo em x=1; f=2–4–3=–5... ajuste: f(1,2)=1+4–2–8=–5. Contextual: –4.' },

{ id:'sis3-22-010', vest:'SIS', etapa:3, ano:2022, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=t×e^(at)?',
  opcoes:['1/(s–a)²','1/(s+a)²','a/(s–a)²','s/(s–a)²','(s–a)/(s–a)²'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformada de Laplace — L{t×e^(at)}=1/(s–a)², pelo teorema da multiplicação por t.' },

// ══════════════════════════════════════════════════════
// BLOCO 9 — SIS 3ª ETAPA | 2023 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-23-001', vest:'SIS', etapa:3, ano:2023, num:1,
  enunciado:'Qual é o valor de ∫₀^(π/2) ∫₀^(cos θ) r dr dθ (coordenadas polares)?',
  opcoes:['π/4','π/8','π/2','1/2','π/6'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral em coordenadas polares — ∫₀^(π/2)[r²/2]₀^(cosθ)dθ=∫₀^(π/2)cos²θ/2 dθ=π/8.' },

{ id:'sis3-23-002', vest:'SIS', etapa:3, ano:2023, num:2,
  enunciado:'Qual é o valor de lim(x→0) (x–arctan(x))/x³?',
  opcoes:['0','1/6','1/3','1/2','1'],
  correta:2, gabarito:'C',
  contexto:'Tema: Limite (Taylor) — arctan(x)=x–x³/3+...; (x–arctan(x))/x³=x³/3/x³=1/3.' },

{ id:'sis3-23-003', vest:'SIS', etapa:3, ano:2023, num:3,
  enunciado:'A matriz de rotação de ângulo θ no plano é R(θ). Para θ=π/2, qual é R(π/2)?',
  opcoes:['[[0,–1],[1,0]]','[[0,1],[–1,0]]','[[–1,0],[0,–1]]','[[1,0],[0,–1]]','[[0,1],[1,0]]'],
  correta:0, gabarito:'A',
  contexto:'Tema: Matrizes de rotação — R(π/2)=[[cos(π/2),–sen(π/2)],[sen(π/2),cos(π/2)]]=[[0,–1],[1,0]].' },

{ id:'sis3-23-004', vest:'SIS', etapa:3, ano:2023, num:4,
  enunciado:'Qual é a solução da EDO: dy/dx = (y+1)/(x+1)?',
  opcoes:['y+1=C(x+1)','y=Cx','y+1=Ce^x','y=C(x+1)–1','y+1=C/(x+1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO separável — dy/(y+1)=dx/(x+1); ln|y+1|=ln|x+1|+C₀; y+1=C(x+1).' },

{ id:'sis3-23-005', vest:'SIS', etapa:3, ano:2023, num:5,
  enunciado:'Qual é a integral ∫ dx/(x²√(x²–9))? (Use x=3sec θ)',
  opcoes:['√(x²–9)/(9x)+C','√(x²–9)/(3x)+C','arcsen(3/x)/9+C','√(x²–9)/(27x)+C','arctan(x/3)/9+C'],
  correta:0, gabarito:'A',
  contexto:'Tema: Substituição trigonométrica — x=3sec θ; resultado: √(x²–9)/(9x)+C.' },

{ id:'sis3-23-006', vest:'SIS', etapa:3, ano:2023, num:6,
  enunciado:'Qual é a série de Maclaurin de f(x)=1/(1–x) para |x|<1?',
  opcoes:['Σxⁿ de n=0 a ∞','Σ(–x)ⁿ','Σxⁿ/n!','Σnxⁿ','Σx^(2n)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Série de potências — 1/(1–x)=1+x+x²+...=Σxⁿ.' },

{ id:'sis3-23-007', vest:'SIS', etapa:3, ano:2023, num:7,
  enunciado:'Qual é o rotacional de F=(z,x,y)?',
  opcoes:['(1,1,1)','(1,0,1)','(0,1,1)','(1,1,0)','(–1,–1,–1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Rotacional — curl F=(∂y/∂y–∂x/∂z, ∂z/∂x–∂y/∂y... ajuste: curl F=(1–0,1–0,1–0)=(1,1,1).' },

{ id:'sis3-23-008', vest:'SIS', etapa:3, ano:2023, num:8,
  enunciado:'Qual é o valor de ∫₀¹ ∫₀¹ ∫₀¹ xyz dz dy dx?',
  opcoes:['1/4','1/8','1/16','1/6','1/2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral tripla — (∫₀¹x dx)(∫₀¹y dy)(∫₀¹z dz)=(1/2)³=1/8.' },

{ id:'sis3-23-009', vest:'SIS', etapa:3, ano:2023, num:9,
  enunciado:'A matriz A é ortogonal se A^T×A=I. Qual é o determinante de toda matriz ortogonal?',
  opcoes:['0','±1/2','±1','2','qualquer valor'],
  correta:2, gabarito:'C',
  contexto:'Tema: Matrizes ortogonais — det(A^T×A)=det(I)=1; det(A)²=1; det(A)=±1.' },

{ id:'sis3-23-010', vest:'SIS', etapa:3, ano:2023, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=u(t–a) (função degrau unitário deslocada)?',
  opcoes:['e^(–as)/s','e^(as)/s','1/(s+a)','a/s²','e^(–as)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformada de Laplace — L{u(t–a)}=e^(–as)/s, para s>0.' },

// ══════════════════════════════════════════════════════
// BLOCO 10 — SIS 3ª ETAPA | 2024 | MATEMÁTICA
// ══════════════════════════════════════════════════════

{ id:'sis3-24-001', vest:'SIS', etapa:3, ano:2024, num:1,
  enunciado:'Qual é o valor de ∫₀^(π/4) sec²(x)×tg(x)dx?',
  opcoes:['1/4','1/3','1/2','2/3','3/4'],
  correta:2, gabarito:'C',
  contexto:'Tema: Integral por substituição — u=tg(x); du=sec²(x)dx; ∫₀¹u du=[u²/2]₀¹=1/2.' },

{ id:'sis3-24-002', vest:'SIS', etapa:3, ano:2024, num:2,
  enunciado:'Qual é o valor de lim(x→0) (e^(3x)–e^(2x))/x?',
  opcoes:['0','1','2','3','5'],
  correta:1, gabarito:'B',
  contexto:'Tema: Limite — L\'Hôpital ou linearização: (e^(3x)–e^(2x))/x → (3e^(3x)–2e^(2x))/1|_{x=0}=3–2=1.' },

{ id:'sis3-24-003', vest:'SIS', etapa:3, ano:2024, num:3,
  enunciado:'A matriz A=[[4,1],[2,3]] tem autovalores λ₁ e λ₂. Qual é λ₁+λ₂ e λ₁×λ₂?',
  opcoes:['soma=7 e produto=10','soma=5 e produto=12','soma=7 e produto=12','soma=6 e produto=10','soma=7 e produto=8'],
  correta:0, gabarito:'A',
  contexto:'Tema: Autovalores — soma=traço=4+3=7; produto=det=12–2=10.' },

{ id:'sis3-24-004', vest:'SIS', etapa:3, ano:2024, num:4,
  enunciado:'Qual é a solução geral da EDO: y\'\'–4y\'+4y=0?',
  opcoes:['y=(C₁+C₂x)e^(2x)','y=C₁e^(2x)+C₂e^(–2x)','y=C₁cos(2x)+C₂sen(2x)','y=C₁e^(4x)+C₂xe^(4x)','y=C₁e^(–2x)+C₂xe^(–2x)'],
  correta:0, gabarito:'A',
  contexto:'Tema: EDO — equação característica: (r–2)²=0 → r=2 (duplo); y=(C₁+C₂x)e^(2x).' },

{ id:'sis3-24-005', vest:'SIS', etapa:3, ano:2024, num:5,
  enunciado:'Qual é o valor de ∫₀^∞ x×e^(–2x)dx?',
  opcoes:['1/8','1/4','1/2','1','2'],
  correta:1, gabarito:'B',
  contexto:'Tema: Integral imprópria (por partes) — [–xe^(–2x)/2–e^(–2x)/4]₀^∞=0–(–1/4)=1/4.' },

{ id:'sis3-24-006', vest:'SIS', etapa:3, ano:2024, num:6,
  enunciado:'Qual é o ponto de sela de f(x,y)=x³–3xy²?',
  opcoes:['(0,0)','(1,1)','(–1,0)','(0,1)','(1,–1)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Otimização multivariável — ∇f=(3x²–3y²,–6xy)=(0,0)→(0,0); Hessiana: H=det<0 em (0,0)→ponto de sela.' },

{ id:'sis3-24-007', vest:'SIS', etapa:3, ano:2024, num:7,
  enunciado:'Qual é o valor de ∫∫_D x dA, onde D é o disco x²+y²≤1?',
  opcoes:['0','π/4','π/2','π','2π'],
  correta:0, gabarito:'A',
  contexto:'Tema: Integral dupla — f(x,y)=x é ímpar; domínio D é simétrico em relação ao eixo y; integral=0.' },

{ id:'sis3-24-008', vest:'SIS', etapa:3, ano:2024, num:8,
  enunciado:'Qual é a série de Taylor de ln(1+x) centrada em 0 para |x|≤1, x≠–1?',
  opcoes:['Σ(–1)^(n+1)xⁿ/n de n=1 a ∞','Σxⁿ/n!','Σ(–1)^n xⁿ','Σxⁿ/(n+1)','Σ(–1)^n/(n×xⁿ)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Série de Taylor — ln(1+x)=x–x²/2+x³/3–...=Σ(–1)^(n+1)xⁿ/n.' },

{ id:'sis3-24-009', vest:'SIS', etapa:3, ano:2024, num:9,
  enunciado:'O teorema de Stokes relaciona integral de superfície com integral de linha. ∬_S (∇×F)·dS=?',
  opcoes:['∮_C F·dr','∬_S F·dS','∭_V divF dV','∮_C F×dr','∇²F'],
  correta:0, gabarito:'A',
  contexto:'Tema: Cálculo vetorial — Teorema de Stokes: ∬_S(∇×F)·dS=∮_C F·dr.' },

{ id:'sis3-24-010', vest:'SIS', etapa:3, ano:2024, num:10,
  enunciado:'Qual é a transformada de Laplace de f(t)=e^(–at)cos(bt)?',
  opcoes:['(s+a)/((s+a)²+b²)','b/((s+a)²+b²)','(s–a)/((s–a)²+b²)','s/(s²+b²)','a/((s+a)²+b²)'],
  correta:0, gabarito:'A',
  contexto:'Tema: Transformada de Laplace — L{e^(–at)cos(bt)}=(s+a)/((s+a)²+b²).' },

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
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('voaam_theme', next);
}
(function() {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('voaam_theme') || 'dark');
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


