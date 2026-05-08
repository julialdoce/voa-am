// =============================================================
// js/modules/state.js
// Estado global, perfil do aluno e sistema de corações
// VoaAM · Vestibulares do Amazonas
// =============================================================

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
function ganharCoracao() {
  const c = getCoracoes();
  if (c.qtd < MAX_CORACOES) { setCoracoes(c.qtd + 1); renderCoracoes(); }
}
function renderCoracoes() {
  const c = getCoracoes();
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('c'+i);
    if (el) el.classList.toggle('vazio', i > c.qtd);
  }
  const banner  = document.getElementById('bloqueado-banner');
  const filtros = document.getElementById('ex-filtros');
  const lista   = document.getElementById('ex-lista');
  const reforco = document.getElementById('reforco-banner');
  if (c.qtd <= 0) {
    if (banner)  banner.style.display  = 'block';
    if (filtros) filtros.style.display = 'none';
    if (lista)   lista.innerHTML       = '';
    if (reforco) reforco.style.display = 'none';
    iniciarTimerRecarga(c.recargaTs);
  } else {
    if (banner)  banner.style.display  = 'none';
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

// ─── ONBOARDING (legado — mantido para compatibilidade) ───
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
  const ob = document.getElementById('onboarding');
  if (ob) ob.classList.add('hidden');
  aplicarPerfil();
}

// ─── APLICAR PERFIL ───
function aplicarPerfil() {
  if (!perfil) return;
  const primeiro = perfil.nome.split(' ')[0];
  const el = document.getElementById('home-greeting');
  if (el) el.textContent = `Olá, ${primeiro}! 👋`;
  const rankNome = document.getElementById('rank-nome');
  if (rankNome) rankNome.textContent = primeiro;

  verificarStreak();

  const vestInfo = {
    SIS:   { cls:'sis',   tag:'Seriado',     inst:'UEA',     date:'Jul–Jan' },
    PSC:   { cls:'psc',   tag:'Seriado',     inst:'UFAM',    date:'Nov–Jan' },
    MACRO: { cls:'macro', tag:'Tradicional', inst:'UEA',     date:'Jan–Fev' },
    ENEM:  { cls:'enem',  tag:'Nacional',    inst:'MEC/INEP',date:'Nov' },
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

  const simSub = document.getElementById('home-sim-sub');
  if (simSub && perfil.vests?.[0]) simSub.textContent = `Simulado ${perfil.vests[0]} cronometrado`;

  const matSub = document.getElementById('home-mat-sub');
  const serieLabel = ['','1ª Série','2ª Série','3ª Série','EM Completo'];
  if (matSub) matSub.textContent = `${serieLabel[perfil.serie]||''} — Continue de onde parou`;

  updateStats();
  renderCoracoes();
}
