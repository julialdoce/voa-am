// js/modules/simulado.js
// Simulado cronometrado por etapa e vestibular

// ─── SIMULADO CRONOMETRADO ───
let cronometroInterval = null;
let cronometroSegundos = 0;

const etapasSIS = {
  dia1: { label:'Dia 1 — Linguagens + Humanas', materias:['Português','Inglês','Espanhol','Literatura','História','Geografia'], minutos: 180 },
  dia2: { label:'Dia 2 — Exatas + Redação', materias:['Matemática','Física','Química','Biologia','Redação'], minutos: 180 },
};
const etadasPSC = {
  tudo: { label:'Prova Única — Todas as matérias', materias:[], minutos: 120 },
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

