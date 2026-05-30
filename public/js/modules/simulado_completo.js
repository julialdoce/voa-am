// =============================================================
// js/modules/simulado_completo.js — VoaAM
// =============================================================

const SC = {
  provaKey: null,
  questoes: [],
  atual: 0,
  respostas: {},
  tempoInicio: null,
  timer: null,
};

// ─── CATÁLOGO DE PROVAS ───────────────────────────────────────
const SC_PROVAS = {

  // ── ENEM ──────────────────────────────────────────────────
  'ENEM2025_MAT': {
    label: 'ENEM 2025 — Matemática', badge: 'ENEM 2025',
    cor: '#22c55e', corBg: 'rgba(34,197,94,0.08)', corBorda: 'rgba(34,197,94,0.25)', emoji: '🇧🇷',
    tipo: 'linear',
    get data() { return typeof ENEM2025_MAT !== 'undefined' ? ENEM2025_MAT : null; },
  },
  'ENEM2024_MAT': {
    label: 'ENEM 2024 — Matemática', badge: 'ENEM 2024',
    cor: '#3b82f6', corBg: 'rgba(59,130,246,0.08)', corBorda: 'rgba(59,130,246,0.25)', emoji: '📘',
    tipo: 'linear',
    get data() { return typeof ENEM2024_MAT !== 'undefined' ? ENEM2024_MAT : null; },
  },
  'ENEM2023_MAT': {
    label: 'ENEM 2023 — Matemática', badge: 'ENEM 2023',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)', corBorda: 'rgba(245,158,11,0.25)', emoji: '📙',
    tipo: 'linear',
    get data() { return typeof ENEM2023_MAT !== 'undefined' ? ENEM2023_MAT : null; },
  },

  // ── MACRO ─────────────────────────────────────────────────
  'MACRO2025_MAT': {
    label: 'MACRO 2025 — Conhecimentos Gerais e Conhecimentos Específicos', badge: 'MACRO 2025',
    cor: '#ef4444', corBg: 'rgba(239,68,68,0.08)', corBorda: 'rgba(239,68,68,0.25)', emoji: '🏛️',
    tipo: 'linear',
    get data() { return typeof MACRO2025_MAT !== 'undefined' ? MACRO2025_MAT : null; },
  },
  'MACRO2024_MAT': {
    label: 'MACRO 2024 — Conhecimentos Gerais e Conhecimentos Específicos', badge: 'MACRO 2024',
    cor: '#8b5cf6', corBg: 'rgba(139,92,246,0.08)', corBorda: 'rgba(139,92,246,0.25)', emoji: '🏛️',
    tipo: 'linear',
    get data() { return typeof MACRO2024_MAT !== 'undefined' ? MACRO2024_MAT : null; },
  },
  'MACRO2023_MAT': {
    label: 'MACRO 2023 — Conhecimentos Gerais e Conhecimentos Específicos', badge: 'MACRO 2023',
    cor: '#f97316', corBg: 'rgba(249,115,22,0.08)', corBorda: 'rgba(249,115,22,0.25)', emoji: '🏛️',
    tipo: 'linear',
    get data() { return typeof MACRO2023_MAT !== 'undefined' ? MACRO2023_MAT : null; },
  },

  // ── PSC 1ª Etapa ──────────────────────────────────────────
  'PSC1_2025': {
    label: 'PSC 1ª Etapa — 2025', badge: 'PSC 1 · 2025',
    cor: '#06b6d4', corBg: 'rgba(6,182,212,0.08)', corBorda: 'rgba(6,182,212,0.25)', emoji: '📗',
    tipo: 'anual', arquivo: 'PSC1_MAT', ano: 2025,
    get data() { return typeof PSC1_MAT !== 'undefined' ? PSC1_MAT : null; },
  },
  'PSC1_2024': {
    label: 'PSC 1ª Etapa — 2024', badge: 'PSC 1 · 2024',
    cor: '#06b6d4', corBg: 'rgba(6,182,212,0.08)', corBorda: 'rgba(6,182,212,0.2)', emoji: '📗',
    tipo: 'anual', arquivo: 'PSC1_MAT', ano: 2024,
    get data() { return typeof PSC1_MAT !== 'undefined' ? PSC1_MAT : null; },
  },
  'PSC1_2023': {
    label: 'PSC 1ª Etapa — 2023', badge: 'PSC 1 · 2023',
    cor: '#06b6d4', corBg: 'rgba(6,182,212,0.06)', corBorda: 'rgba(6,182,212,0.15)', emoji: '📗',
    tipo: 'anual', arquivo: 'PSC1_MAT', ano: 2023,
    get data() { return typeof PSC1_MAT !== 'undefined' ? PSC1_MAT : null; },
  },

  // ── PSC 2ª Etapa ──────────────────────────────────────────
  'PSC2_2025': {
    label: 'PSC 2ª Etapa — 2025', badge: 'PSC 2 · 2025',
    cor: '#10b981', corBg: 'rgba(16,185,129,0.08)', corBorda: 'rgba(16,185,129,0.25)', emoji: '📘',
    tipo: 'anual', arquivo: 'PSC2_MAT', ano: 2025,
    get data() { return typeof PSC2_MAT !== 'undefined' ? PSC2_MAT : null; },
  },
  'PSC2_2024': {
    label: 'PSC 2ª Etapa — 2024', badge: 'PSC 2 · 2024',
    cor: '#10b981', corBg: 'rgba(16,185,129,0.08)', corBorda: 'rgba(16,185,129,0.2)', emoji: '📘',
    tipo: 'anual', arquivo: 'PSC2_MAT', ano: 2024,
    get data() { return typeof PSC2_MAT !== 'undefined' ? PSC2_MAT : null; },
  },
  'PSC2_2023': {
    label: 'PSC 2ª Etapa — 2023', badge: 'PSC 2 · 2023',
    cor: '#10b981', corBg: 'rgba(16,185,129,0.06)', corBorda: 'rgba(16,185,129,0.15)', emoji: '📘',
    tipo: 'anual', arquivo: 'PSC2_MAT', ano: 2023,
    get data() { return typeof PSC2_MAT !== 'undefined' ? PSC2_MAT : null; },
  },

  // ── PSC 3ª Etapa ──────────────────────────────────────────
  'PSC3_2025': {
    label: 'PSC 3ª Etapa — 2025', badge: 'PSC 3 · 2025',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)', corBorda: 'rgba(245,158,11,0.25)', emoji: '📙',
    tipo: 'anual', arquivo: 'PSC3_MAT', ano: 2025,
    get data() { return typeof PSC3_MAT !== 'undefined' ? PSC3_MAT : null; },
  },
  'PSC3_2024': {
    label: 'PSC 3ª Etapa — 2024', badge: 'PSC 3 · 2024',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)', corBorda: 'rgba(245,158,11,0.2)', emoji: '📙',
    tipo: 'anual', arquivo: 'PSC3_MAT', ano: 2024,
    get data() { return typeof PSC3_MAT !== 'undefined' ? PSC3_MAT : null; },
  },
  'PSC3_2023': {
    label: 'PSC 3ª Etapa — 2023', badge: 'PSC 3 · 2023',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.06)', corBorda: 'rgba(245,158,11,0.15)', emoji: '📙',
    tipo: 'anual', arquivo: 'PSC3_MAT', ano: 2023,
    get data() { return typeof PSC3_MAT !== 'undefined' ? PSC3_MAT : null; },
  },

  // ── SIS 1ª Etapa ──────────────────────────────────────────
  'SIS1_2025': {
    label: 'SIS 1ª Etapa — 2025', badge: 'SIS 1 · 2025',
    cor: '#a855f7', corBg: 'rgba(168,85,247,0.08)', corBorda: 'rgba(168,85,247,0.25)', emoji: '📒',
    tipo: 'anual', arquivo: 'SIS1_MAT', ano: 2025,
    get data() { return typeof SIS1_MAT !== 'undefined' ? SIS1_MAT : null; },
  },
  'SIS1_2024': {
    label: 'SIS 1ª Etapa — 2024', badge: 'SIS 1 · 2024',
    cor: '#a855f7', corBg: 'rgba(168,85,247,0.08)', corBorda: 'rgba(168,85,247,0.2)', emoji: '📒',
    tipo: 'anual', arquivo: 'SIS1_MAT', ano: 2024,
    get data() { return typeof SIS1_MAT !== 'undefined' ? SIS1_MAT : null; },
  },
  'SIS1_2023': {
    label: 'SIS 1ª Etapa — 2023', badge: 'SIS 1 · 2023',
    cor: '#a855f7', corBg: 'rgba(168,85,247,0.06)', corBorda: 'rgba(168,85,247,0.15)', emoji: '📒',
    tipo: 'anual', arquivo: 'SIS1_MAT', ano: 2023,
    get data() { return typeof SIS1_MAT !== 'undefined' ? SIS1_MAT : null; },
  },

  // ── SIS 2ª Etapa ──────────────────────────────────────────
  'SIS2_2025': {
    label: 'SIS 2ª Etapa — 2025', badge: 'SIS 2 · 2025',
    cor: '#ec4899', corBg: 'rgba(236,72,153,0.08)', corBorda: 'rgba(236,72,153,0.25)', emoji: '📓',
    tipo: 'anual', arquivo: 'SIS2_MAT', ano: 2025,
    get data() { return typeof SIS2_MAT !== 'undefined' ? SIS2_MAT : null; },
  },
  'SIS2_2024': {
    label: 'SIS 2ª Etapa — 2024', badge: 'SIS 2 · 2024',
    cor: '#ec4899', corBg: 'rgba(236,72,153,0.08)', corBorda: 'rgba(236,72,153,0.2)', emoji: '📓',
    tipo: 'anual', arquivo: 'SIS2_MAT', ano: 2024,
    get data() { return typeof SIS2_MAT !== 'undefined' ? SIS2_MAT : null; },
  },
  'SIS2_2023': {
    label: 'SIS 2ª Etapa — 2023', badge: 'SIS 2 · 2023',
    cor: '#ec4899', corBg: 'rgba(236,72,153,0.06)', corBorda: 'rgba(236,72,153,0.15)', emoji: '📓',
    tipo: 'anual', arquivo: 'SIS2_MAT', ano: 2023,
    get data() { return typeof SIS2_MAT !== 'undefined' ? SIS2_MAT : null; },
  },

  // ── SIS 3ª Etapa ──────────────────────────────────────────
  'SIS3_2025': {
    label: 'SIS 3ª Etapa — 2025', badge: 'SIS 3 · 2025',
    cor: '#64748b', corBg: 'rgba(100,116,139,0.08)', corBorda: 'rgba(100,116,139,0.25)', emoji: '📔',
    tipo: 'anual', arquivo: 'SIS3_MAT', ano: 2025,
    get data() { return typeof SIS3_MAT !== 'undefined' ? SIS3_MAT : null; },
  },
  'SIS3_2024': {
    label: 'SIS 3ª Etapa — 2024', badge: 'SIS 3 · 2024',
    cor: '#64748b', corBg: 'rgba(100,116,139,0.08)', corBorda: 'rgba(100,116,139,0.2)', emoji: '📔',
    tipo: 'anual', arquivo: 'SIS3_MAT', ano: 2024,
    get data() { return typeof SIS3_MAT !== 'undefined' ? SIS3_MAT : null; },
  },
  'SIS3_2023': {
    label: 'SIS 3ª Etapa — 2023', badge: 'SIS 3 · 2023',
    cor: '#64748b', corBg: 'rgba(100,116,139,0.06)', corBorda: 'rgba(100,116,139,0.15)', emoji: '📔',
    tipo: 'anual', arquivo: 'SIS3_MAT', ano: 2023,
    get data() { return typeof SIS3_MAT !== 'undefined' ? SIS3_MAT : null; },
  },
};

// ─── GRUPOS para o seletor (abas) ─────────────────────────────
const SC_GRUPOS = [
  {
    id: 'ENEM', label: 'ENEM', emoji: '🇧🇷',
    provas: ['ENEM2025_MAT', 'ENEM2024_MAT', 'ENEM2023_MAT'],
  },
  {
    id: 'MACRO', label: 'MACRO', emoji: '🏛️',
    provas: ['MACRO2025_MAT', 'MACRO2024_MAT', 'MACRO2023_MAT'],
  },
  {
    id: 'PSC1', label: 'PSC 1ª Etapa', emoji: '📗',
    provas: ['PSC1_2025', 'PSC1_2024', 'PSC1_2023'],
  },
  {
    id: 'PSC2', label: 'PSC 2ª Etapa', emoji: '📘',
    provas: ['PSC2_2025', 'PSC2_2024', 'PSC2_2023'],
  },
  {
    id: 'PSC3', label: 'PSC 3ª Etapa', emoji: '📙',
    provas: ['PSC3_2025', 'PSC3_2024', 'PSC3_2023'],
  },
  {
    id: 'SIS1', label: 'SIS 1ª Etapa', emoji: '📒',
    provas: ['SIS1_2025', 'SIS1_2024', 'SIS1_2023'],
  },
  {
    id: 'SIS2', label: 'SIS 2ª Etapa', emoji: '📓',
    provas: ['SIS2_2025', 'SIS2_2024', 'SIS2_2023'],
  },
  {
    id: 'SIS3', label: 'SIS 3ª Etapa', emoji: '📔',
    provas: ['SIS3_2025', 'SIS3_2024', 'SIS3_2023'],
  },
];

let SC_GRUPO_ATIVO = 'ENEM';

// ─── NAVEGAÇÃO ENTRE TELAS INTERNAS ──────────────────────────
function scTela(nome) {
  document.querySelectorAll('.sc-tela').forEach(t => t.classList.remove('ativa'));
  const alvo = document.getElementById('sc-tela-' + nome);
  if (alvo) alvo.classList.add('ativa');
  const eSelecao = (nome === 'seletor' || nome === 'confirmar');
  _el('sc-header-prova').style.display = eSelecao ? 'none' : 'flex';
  _el('sc-body').style.display         = eSelecao ? 'none' : 'flex';
  _el('sc-resultado').style.display    = 'none';
}

// ─── ABRIR SELETOR ────────────────────────────────────────────
function scAbrirSeletor() {
  const overlay = _el('sc-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  scPopularSeletor();
  scTela('seletor');
}

// ─── POPULAR SELETOR COM ABAS ─────────────────────────────────
function scPopularSeletor() {
  const container = _el('sc-seletor-grid');
  if (!container) return;

  // Abas de grupos
  const tabsHtml = SC_GRUPOS.map(g => `
    <button onclick="scMudarGrupo('${g.id}')" id="sc-tab-${g.id}"
      class="sc-grupo-tab${g.id === SC_GRUPO_ATIVO ? ' active' : ''}"
      style="padding:8px 14px;border-radius:20px;border:1px solid var(--border);
        background:${g.id === SC_GRUPO_ATIVO ? 'var(--accent)' : 'transparent'};
        color:${g.id === SC_GRUPO_ATIVO ? '#fff' : 'var(--text2)'};
        font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.15s">
      ${g.emoji} ${g.label}
    </button>`).join('');

  container.innerHTML = `
    <div id="sc-grupo-tabs" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border)">
      ${tabsHtml}
    </div>
    <div id="sc-provas-lista"></div>`;

  scRenderProvasList();
}

function scMudarGrupo(id) {
  SC_GRUPO_ATIVO = id;
  // Atualiza estilo das abas
  SC_GRUPOS.forEach(g => {
    const btn = _el(`sc-tab-${g.id}`);
    if (!btn) return;
    btn.style.background = g.id === id ? 'var(--accent)' : 'transparent';
    btn.style.color      = g.id === id ? '#fff' : 'var(--text2)';
    const isActive = g.id === id;
    btn.className = 'sc-grupo-tab' + (isActive ? ' active' : '');
  });
  scRenderProvasList();
}

function scRenderProvasList() {
  const lista = _el('sc-provas-lista');
  if (!lista) return;
  const grupo = SC_GRUPOS.find(g => g.id === SC_GRUPO_ATIVO);
  if (!grupo) return;

  lista.innerHTML = grupo.provas.map(key => {
    const p = SC_PROVAS[key];
    const d = p.data;
    const questoes = scGetQuestoes(p, d);
    const totalQ   = questoes.length;
    const temDados = totalQ > 0;
    return `
    <div onclick="${temDados ? `scSelecionarProva('${key}')` : ''}"
      style="padding:16px;border-radius:14px;cursor:${temDados ? 'pointer' : 'default'};
        transition:all 0.15s;border:1px solid ${p.corBorda};background:${p.corBg};
        margin-bottom:10px;opacity:${temDados ? '1' : '0.45'}"
      onmouseover="this.style.transform='${temDados ? 'translateY(-1px)' : ''}'"
      onmouseout="this.style.transform=''">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:26px">${p.emoji}</span>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:800;color:${p.cor}">${p.label}</div>
          <div style="font-size:11px;color:var(--text2);margin-top:3px">
            ${temDados ? `${totalQ} questões · ${d?.tempoMinutos || 0} min · Gabarito oficial` : 'Sem questões cadastradas'}
          </div>
        </div>
        ${temDados ? `<span style="color:var(--text2);font-size:18px">›</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

// ─── SELECIONAR PROVA ─────────────────────────────────────────
function scSelecionarProva(key) {
  SC.provaKey = key;
  const p = SC_PROVAS[key];
  const d = p.data;
  if (!d) { alert('Dados da prova não carregados. Recarregue a página.'); return; }
  const questoes = scGetQuestoes(p, d);
  _el('sc-conf-titulo').textContent = p.label;
  _el('sc-conf-info').textContent   = `${questoes.length} questões · ${d.tempoMinutos} minutos · ${d.caderno || d.prova}`;
  scTela('confirmar');
}

// ─── RESOLVER QUESTÕES (linear ou por ano) ────────────────────
function scGetQuestoes(p, d) {
  if (!d) return [];
  if (p.tipo === 'anual') {
    // PSC / SIS: questoes é objeto { 2023: [...], 2024: [...], 2025: [...] }
    const lista = (d.questoes && d.questoes[p.ano]) || [];
    return lista.filter(q => q.enunciado && q.enunciado.trim() !== '');
  }
  // ENEM / MACRO: questoes é array linear
  return (d.questoes || []).filter(q => q.enunciado && q.enunciado.trim() !== '');
}

function scGetAssunto(p, d, num) {
  if (!d) return '';
  if (p.tipo === 'anual') {
    return (d.assuntos?.[p.ano]?.[num]) || '';
  }
  return (d.assuntos?.[num]) || '';
}

function scGetGabarito(p, d, num) {
  if (!d) return null;
  if (p.tipo === 'anual') {
    return (d.gabarito?.[p.ano]?.[num]) || null;
  }
  return (d.gabarito?.[num]) || null;
}

// ─── INICIAR ──────────────────────────────────────────────────
function scIniciar() { scIniciarDireto(SC.provaKey); }

function scIniciarDireto(key) {
  SC.provaKey    = key;
  const p        = SC_PROVAS[key];
  const d        = p?.data;
  if (!d) { alert('Dados da prova não carregados.'); return; }

  SC.questoes    = scGetQuestoes(p, d);
  SC.atual       = 0;
  SC.respostas   = {};
  SC.tempoInicio = Date.now();

  _el('sc-overlay').style.display = 'flex';
  document.querySelectorAll('.sc-tela').forEach(t => t.classList.remove('ativa'));
  _el('sc-header-prova').style.display = 'flex';
  _el('sc-body').style.display         = 'flex';
  _el('sc-resultado').style.display    = 'none';

  scRenderQ();
  scRenderLog();
  scIniciarTimer(d.tempoMinutos * 60);
}

// ─── CRONÔMETRO ───────────────────────────────────────────────
function scIniciarTimer(seg) {
  clearInterval(SC.timer);
  let rest = seg;
  const el = _el('sc-timer');
  const tick = () => {
    const h = String(Math.floor(rest / 3600)).padStart(2, '0');
    const m = String(Math.floor((rest % 3600) / 60)).padStart(2, '0');
    const s = String(rest % 60).padStart(2, '0');
    if (el) { el.textContent = `${h}:${m}:${s}`; el.classList.toggle('urgente', rest <= 300); }
    if (rest <= 0) { clearInterval(SC.timer); scEncerrar(); }
    rest--;
  };
  tick();
  SC.timer = setInterval(tick, 1000);
}

// ─── RENDER QUESTÃO ──────────────────────────────────────────
function scRenderQ() {
  const q     = SC.questoes[SC.atual];
  const p     = SC_PROVAS[SC.provaKey];
  const d     = p.data;
  const total = SC.questoes.length;
  const n     = SC.atual + 1;

  _txt('sc-prog-txt', `Questão ${n} de ${total}`);
  _el('sc-prog-fill').style.width = ((n / total) * 100) + '%';

  const badge = _el('sc-badge');
  if (badge) { badge.textContent = `${p.badge} · Q${q.num}`; badge.style.color = p.cor; badge.style.background = p.corBg; }
  _txt('sc-assunto', scGetAssunto(p, d, q.num));

  _el('sc-enunciado').innerHTML = q.enunciado.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

  const imgBlock = _el('sc-img-block');
  if (q.img) {
    imgBlock.innerHTML = `
      <figure class="sc-img-box" style="margin:12px 0">
        <img src="${q.img}" alt="Figura Q${q.num}" loading="lazy"
          onclick="scZoomAbrir('${q.img}')"
          onerror="this.closest('figure').style.display='none'">
        <figcaption>
          <span>📊 Material de apoio — Q${q.num} · ${p.badge}</span>
          <span class="sc-img-zoom-hint" onclick="scZoomAbrir('${q.img}')" style="cursor:pointer">
            🔍 Ampliar
          </span>
        </figcaption>
      </figure>`;
  } else {
    imgBlock.innerHTML = '';
  }

  const resp = SC.respostas[q.num];
  _el('sc-opts').innerHTML = Object.entries(q.alt).map(([letra, txt]) => `
    <button onclick="scSelectAlt('${letra}')"
      class="option-btn${resp === letra ? ' sc-sel' : ''}">
      <span class="option-letter">${letra}</span>
      <span>${txt}</span>
    </button>`).join('');

  _txt('sc-btn-pular', resp === 'pulada' ? '↩ Desfazer pulo' : '⏭ Pular');
  _txt('sc-btn-prox',  n < total ? 'Próxima →' : '✅ Encerrar');

  const sc = _el('sc-scroll'); if (sc) sc.scrollTop = 0;
}
function scSelectAlt(letra) {
  SC.respostas[SC.questoes[SC.atual].num] = letra;
  scRenderQ(); scRenderLog();
}

// ─── PULAR ────────────────────────────────────────────────────
function scPular() {
  const num = SC.questoes[SC.atual].num;
  if (SC.respostas[num] === 'pulada') {
    delete SC.respostas[num];
    scRenderQ(); scRenderLog();
  } else {
    SC.respostas[num] = 'pulada';
    scRenderLog();
    if (SC.atual < SC.questoes.length - 1) { SC.atual++; scRenderQ(); }
    else scRenderQ();
  }
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────
function scProximo() {
  if (SC.atual < SC.questoes.length - 1) { SC.atual++; scRenderQ(); scRenderLog(); }
  else scEncerrar();
}
function scAnterior() {
  if (SC.atual > 0) { SC.atual--; scRenderQ(); scRenderLog(); }
}
function scIrPara(idx) {
  SC.atual = idx; scRenderQ();
  // Fecha log no mobile
  if (window.innerWidth < 768) _el('sc-log').classList.remove('aberto');
}

// ─── LOG ─────────────────────────────────────────────────────
function scRenderLog() {
  const grid = _el('sc-log-grid');
  if (!grid) return;
  grid.innerHTML = SC.questoes.map((q, i) => {
    const r = SC.respostas[q.num];
    const cls = i === SC.atual ? 'atual' : r === 'pulada' ? 'pulada' : r ? 'resp' : '';
    return `<button class="sc-log-q ${cls}" onclick="scIrPara(${i})" title="Q${q.num}">${q.num}</button>`;
  }).join('');

  const resp = Object.values(SC.respostas).filter(r => r !== 'pulada').length;
  const pul  = Object.values(SC.respostas).filter(r => r === 'pulada').length;
  _txt('sc-log-r', resp);
  _txt('sc-log-p', pul);
  _txt('sc-log-v', SC.questoes.length - resp - pul);
}

function scToggleLog() {
  if (window.innerWidth >= 768) return;
  _el('sc-log').classList.toggle('aberto');
}

// ─── CONFIRMAR SAÍDA ─────────────────────────────────────────
function scConfirmarSaida() {
  const resp = Object.values(SC.respostas).filter(r => r !== 'pulada').length;
  const total = SC.questoes.length;
  const msg = resp < total
    ? `Você respondeu ${resp} de ${total} questões.\nDeseja encerrar mesmo assim?`
    : 'Deseja encerrar a prova?';
  if (confirm(msg)) scEncerrar();
}

// ─── ENCERRAR ─────────────────────────────────────────────────
function scEncerrar() {
  clearInterval(SC.timer);
  _el('sc-header-prova').style.display = 'none';
  _el('sc-body').style.display         = 'none';
  _el('sc-resultado').style.display    = 'block';
  scMostrarResultado();
}

// ─── RESULTADO ────────────────────────────────────────────────
function scMostrarResultado() {
  const d     = SC_PROVAS[SC.provaKey].data;
  const total = SC.questoes.length;
  let ac = 0, er = 0, pu = 0, vz = 0;
  const assA = {}, assE = {};

  SC.questoes.forEach(q => {
    const r   = SC.respostas[q.num];
    const g   = scGetGabarito(p, d, q.num);
    const ass = scGetAssunto(p, d, q.num) || 'Outros';
    if (!assA[ass]) { assA[ass] = 0; assE[ass] = 0; }
    if (!r)            { vz++; assE[ass]++; }
    else if (r==='pulada') { pu++; assE[ass]++; }
    else if (r===g)    { ac++; assA[ass]++; }
    else               { er++; assE[ass]++; }
  });

  const pct    = Math.round((ac / total) * 100);
  const corPct = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  const emoji  = pct >= 70 ? '🎉' : pct >= 50 ? '📈' : '💪';

  // Tempo
  const dec = Math.floor((Date.now() - SC.tempoInicio) / 1000);
  const tempo = `${String(Math.floor(dec/3600)).padStart(2,'0')}:${String(Math.floor((dec%3600)/60)).padStart(2,'0')}:${String(dec%60).padStart(2,'0')}`;

  // Assuntos ordenados por mais erros
  const assuntos = Object.keys(assA)
    .map(ass => ({ ass, a: assA[ass], e: assE[ass] }))
    .sort((x, y) => y.e - x.e);

  // Top 5 para melhorar
  const melhorar = assuntos.filter(x => x.e > 0).slice(0, 5);

  // Gabarito
  const gabHtml = SC.questoes.map(q => {
    const r = SC.respostas[q.num];
    const g = scGetGabarito(p, d, q.num);
    const [ico, cor] = !r || r==='pulada' ? ['—','#f59e0b'] : r===g ? ['✓','#10b981'] : ['✗','#ef4444'];
    return `
      <div class="sc-gab-row">
        <span style="font-weight:800;color:var(--text2);width:34px;flex-shrink:0">Q${q.num}</span>
        <span style="flex:1;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${scGetAssunto(p, d, q.num)}</span>
        <span style="font-weight:700;color:var(--text);width:16px;text-align:center">${r&&r!=='pulada'?r:'–'}</span>
        <span style="color:var(--border)">→</span>
        <span style="font-weight:800;color:var(--text);width:16px;text-align:center">${g}</span>
        <span style="font-weight:900;color:${cor};width:16px;text-align:center">${ico}</span>
      </div>`;
  }).join('');

  _el('sc-resultado').innerHTML = `
    <div class="sc-res-wrap">

      <div style="text-align:center;padding:20px 0 16px">
        <div style="font-size:48px;margin-bottom:8px">${emoji}</div>
        <div class="result-title">Resultado Final</div>
        <div style="font-size:13px;color:var(--text2);margin-top:4px">${SC_PROVAS[SC.provaKey].label}</div>
      </div>

      <div class="result-card" style="margin-bottom:16px">
        <div style="display:flex;justify-content:center;margin-bottom:16px">
          <div style="width:110px;height:110px;border-radius:50%;
            border:6px solid ${corPct};
            display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div style="font-size:26px;font-weight:900;color:${corPct}">${pct}%</div>
            <div style="font-size:11px;color:var(--text2)">${ac}/${total} acertos</div>
          </div>
        </div>
        <div class="result-stats-row">
          <div class="rstat"><div class="rstat-val" style="color:#10b981">${ac}</div><div class="rstat-lbl">Acertos</div></div>
          <div class="rstat"><div class="rstat-val" style="color:#ef4444">${er}</div><div class="rstat-lbl">Erros</div></div>
          <div class="rstat"><div class="rstat-val" style="color:#f59e0b">${pu+vz}</div><div class="rstat-lbl">Puladas</div></div>
        </div>
        <div style="text-align:center;font-size:12px;color:var(--text2);margin-top:8px">
          Tempo total: <strong style="color:var(--text)">${tempo}</strong>
        </div>
      </div>

      <div class="question-card" style="margin-bottom:16px">
        <div style="font-size:11px;font-weight:700;color:var(--text2);
          text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px">
          📊 Desempenho por assunto
        </div>
        ${assuntos.map(({ass,a,e}) => {
          const t = a+e; const pA = Math.round((a/t)*100);
          const c = pA>=70?'#10b981':pA>=50?'#f59e0b':'#ef4444';
          return `
          <div class="sc-ass-item">
            <div class="sc-ass-row">
              <span style="font-size:11px;color:var(--text)">${ass}</span>
              <span style="font-size:11px;font-weight:700;color:${c}">${a}/${t}</span>
            </div>
            <div class="sc-ass-bg">
              <div class="sc-ass-fill" style="width:${pA}%;background:${c}"></div>
            </div>
          </div>`;
        }).join('')}
      </div>

      ${melhorar.length ? `
      <div class="result-insight" style="margin-bottom:16px">
        <strong>🎯 O que estudar para melhorar:</strong>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
          ${melhorar.map((x,i) => `
            <div style="display:flex;align-items:center;gap:8px">
              <span style="width:18px;height:18px;border-radius:50%;background:var(--accent);
                color:#fff;font-size:9px;font-weight:800;flex-shrink:0;
                display:flex;align-items:center;justify-content:center">${i+1}</span>
              <span style="font-size:13px;color:var(--text)">${x.ass}</span>
              <span style="font-size:11px;color:var(--text2);margin-left:auto">${x.e} erro${x.e>1?'s':''}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <div class="question-card" style="margin-bottom:16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:var(--text2);
            text-transform:uppercase;letter-spacing:0.06em">📋 Gabarito completo</div>
          <div style="font-size:10px;color:var(--text2)">Sua resp. → Gabarito</div>
        </div>
        ${gabHtml}
      </div>

      <div class="result-btns" style="padding-bottom:24px">
        <button onclick="scFechar()" class="btn-primary" style="padding:14px">
          ← Voltar para Praticar
        </button>
        <button onclick="scRecomear()" style="
          padding:12px;border-radius:10px;border:1px solid var(--border);
          background:var(--surface2);color:var(--text);
          font-family:var(--font);font-size:14px;font-weight:700;cursor:pointer">
          🔄 Refazer esta prova
        </button>
      </div>

    </div>
  `;
}

// ─── FECHAR → VOLTA PARA PRATICAR ────────────────────────────
function scFechar() {
  clearInterval(SC.timer);
  _el('sc-overlay').style.display = 'none';

  // Reseta DOM para próxima abertura
  _el('sc-header-prova').style.display = 'none';
  _el('sc-body').style.display         = 'none';
  _el('sc-resultado').style.display    = 'none';
  _el('sc-resultado').innerHTML        = '';
  _el('sc-log').classList.remove('aberto');

  goTo('praticar');
  // Volta para a aba completo
  const cards  = document.getElementById('sim-cards-container');
  const picker = document.getElementById('sim-vest-picker');
  if (cards)  cards.innerHTML      = '';
  if (picker) picker.style.display = 'none';
  if (typeof simModoAba === 'function') simModoAba('completo');
}

function scRecomear() {
  _el('sc-resultado').style.display = 'none';
  _el('sc-resultado').innerHTML     = '';
  scIniciarDireto(SC.provaKey);
}

// ─── Utilitários ─────────────────────────────────────────────
function _el(id) { return document.getElementById(id); }
function _txt(id, t) { const e = _el(id); if (e) e.textContent = t; }

// ─── Zoom de imagem ──────────────────────────────────────────
function scZoomAbrir(src) {
  const overlay = document.getElementById('sc-zoom-overlay');
  const img     = document.getElementById('sc-zoom-img');
  if (!overlay || !img) return;
  img.src = src;
  overlay.classList.add('aberto');
  document.addEventListener('keydown', scZoomEsc);
}
function scZoomFechar() {
  const overlay = document.getElementById('sc-zoom-overlay');
  if (overlay) overlay.classList.remove('aberto');
  document.removeEventListener('keydown', scZoomEsc);
}
function scZoomEsc(e) { if (e.key === 'Escape') scZoomFechar(); }
