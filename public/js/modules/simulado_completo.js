// =============================================================
// js/modules/simulado_completo.js — VoaAM
// =============================================================

const SC = {
  provaKey:    null,
  questoes:    [],
  atual:       0,
  respostas:   {},
  tempoInicio: null,
  timer:       null,
};

// ─── UTILITÁRIOS ─────────────────────────────────────────────
function _el(id)     { return document.getElementById(id); }
function _txt(id, t) { const e = _el(id); if (e) e.textContent = t; }

// ─── CATÁLOGO DE PROVAS ───────────────────────────────────────
// tipo 'linear'   → questoes é array direto  (ENEM, MACRO)
// tipo 'anual'    → questoes é objeto {ano:[...]}  (PSC, SIS)
// tipo 'multi'    → questoes = concat de vários anos (PSC/SIS etapa)
// tipo 'multifile'→ concat de vários arquivos lineares (MACRO CG+CE)

const SC_PROVAS = {

  // ── ENEM ─────────────────────────────────────────────────
  'ENEM2025': {
    label: 'ENEM 2025 — Matemática', badge: 'ENEM 2025',
    cor: '#22c55e', corBg: 'rgba(34,197,94,0.08)', corBorda: 'rgba(34,197,94,0.25)', emoji: '🌿',
    tipo: 'linear', tempoMinutos: 300,
    get data() { return typeof ENEM2025_MAT !== 'undefined' ? ENEM2025_MAT : null; },
  },
  'ENEM2024': {
    label: 'ENEM 2024 — Matemática', badge: 'ENEM 2024',
    cor: '#3b82f6', corBg: 'rgba(59,130,246,0.08)', corBorda: 'rgba(59,130,246,0.25)', emoji: '🌿',
    tipo: 'linear', tempoMinutos: 300,
    get data() { return typeof ENEM2024_MAT !== 'undefined' ? ENEM2024_MAT : null; },
  },
  'ENEM2023': {
    label: 'ENEM 2023 — Matemática', badge: 'ENEM 2023',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)', corBorda: 'rgba(245,158,11,0.25)', emoji: '🌿',
    tipo: 'linear', tempoMinutos: 300,
    get data() { return typeof ENEM2023_MAT !== 'undefined' ? ENEM2023_MAT : null; },
  },

  // ── MACRO ────────────────────────────────────────────────
  'MACRO2025': {
    label: 'MACRO 2025 — CG + CE', badge: 'MACRO 2025',
    cor: '#ef4444', corBg: 'rgba(239,68,68,0.08)', corBorda: 'rgba(239,68,68,0.25)', emoji: '🔥',
    tipo: 'linear', tempoMinutos: 180,
    get data() { return typeof MACRO2025_MAT !== 'undefined' ? MACRO2025_MAT : null; },
  },
  'MACRO2024': {
    label: 'MACRO 2024 — CG + CE', badge: 'MACRO 2024',
    cor: '#8b5cf6', corBg: 'rgba(139,92,246,0.08)', corBorda: 'rgba(139,92,246,0.25)', emoji: '🔥',
    tipo: 'linear', tempoMinutos: 180,
    get data() { return typeof MACRO2024_MAT !== 'undefined' ? MACRO2024_MAT : null; },
  },
  'MACRO2023': {
    label: 'MACRO 2023 — CG + CE', badge: 'MACRO 2023',
    cor: '#f97316', corBg: 'rgba(249,115,22,0.08)', corBorda: 'rgba(249,115,22,0.25)', emoji: '🔥',
    tipo: 'linear', tempoMinutos: 180,
    get data() { return typeof MACRO2023_MAT !== 'undefined' ? MACRO2023_MAT : null; },
  },

  // ── PSC — 1 prova por etapa (2023+2024+2025 concatenados) ─
  'PSC1': {
    label: 'PSC — 1ª Etapa (2023 · 2024 · 2025)', badge: 'PSC 1ª Etapa',
    cor: '#06b6d4', corBg: 'rgba(6,182,212,0.08)', corBorda: 'rgba(6,182,212,0.25)', emoji: '🎓',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof PSC1_MAT !== 'undefined' ? PSC1_MAT : null; },
    anos: [2023, 2024, 2025],
  },
  'PSC2': {
    label: 'PSC — 2ª Etapa (2023 · 2024 · 2025)', badge: 'PSC 2ª Etapa',
    cor: '#10b981', corBg: 'rgba(16,185,129,0.08)', corBorda: 'rgba(16,185,129,0.25)', emoji: '🎓',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof PSC2_MAT !== 'undefined' ? PSC2_MAT : null; },
    anos: [2023, 2024, 2025],
  },
  'PSC3': {
    label: 'PSC — 3ª Etapa (2023 · 2024 · 2025)', badge: 'PSC 3ª Etapa',
    cor: '#f59e0b', corBg: 'rgba(245,158,11,0.08)', corBorda: 'rgba(245,158,11,0.25)', emoji: '🎓',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof PSC3_MAT !== 'undefined' ? PSC3_MAT : null; },
    anos: [2023, 2024, 2025],
  },

  // ── SIS — 1 prova por etapa (2023+2024+2025 concatenados) ─
  'SIS1': {
    label: 'SIS — 1ª Etapa (2023 · 2024 · 2025)', badge: 'SIS 1ª Etapa',
    cor: '#a855f7', corBg: 'rgba(168,85,247,0.08)', corBorda: 'rgba(168,85,247,0.25)', emoji: '⭐',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof SIS1_MAT !== 'undefined' ? SIS1_MAT : null; },
    anos: [2023, 2024, 2025],
  },
  'SIS2': {
    label: 'SIS — 2ª Etapa (2023 · 2024 · 2025)', badge: 'SIS 2ª Etapa',
    cor: '#ec4899', corBg: 'rgba(236,72,153,0.08)', corBorda: 'rgba(236,72,153,0.25)', emoji: '⭐',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof SIS2_MAT !== 'undefined' ? SIS2_MAT : null; },
    anos: [2023, 2024, 2025],
  },
  'SIS3': {
    label: 'SIS — 3ª Etapa (2023 · 2024 · 2025)', badge: 'SIS 3ª Etapa',
    cor: '#64748b', corBg: 'rgba(100,116,139,0.08)', corBorda: 'rgba(100,116,139,0.25)', emoji: '⭐',
    tipo: 'multi', tempoMinutos: 180,
    get data() { return typeof SIS3_MAT !== 'undefined' ? SIS3_MAT : null; },
    anos: [2023, 2024, 2025],
  },
};

// ─── GRUPOS para o seletor de ano (ENEM e MACRO têm anos) ─────
const SC_GRUPOS = {
  ENEM:  ['ENEM2025',  'ENEM2024',  'ENEM2023'],
  MACRO: ['MACRO2025', 'MACRO2024', 'MACRO2023'],
  PSC1:  ['PSC1'],
  PSC2:  ['PSC2'],
  PSC3:  ['PSC3'],
  SIS1:  ['SIS1'],
  SIS2:  ['SIS2'],
  SIS3:  ['SIS3'],
};

// ─── RESOLVER QUESTÕES ────────────────────────────────────────
function scGetQuestoes(provaKey) {
  const p = SC_PROVAS[provaKey];
  if (!p) return [];
  const d = p.data;
  if (!d) return [];

  if (p.tipo === 'linear') {
    // ENEM / MACRO: questoes é array direto
    return (d.questoes || [])
      .filter(q => q.enunciado && q.enunciado.trim() !== '')
      .map(q => ({ ...q, _ano: null }));
  }

  if (p.tipo === 'multi') {
    // PSC / SIS: concatenar questões de 2023, 2024 e 2025
    // renumera para evitar colisão de num entre anos
    let result = [];
    let offset = 0;
    for (const ano of (p.anos || [])) {
      const lista = (d.questoes && d.questoes[ano]) || [];
      const filtrada = lista.filter(q => q.enunciado && q.enunciado.trim() !== '');
      filtrada.forEach(q => {
        result.push({
          ...q,
          _numOriginal: q.num,
          num: offset + q.num,   // num único para o simulado
          _ano: ano,
        });
      });
      if (filtrada.length > 0) offset += filtrada.length;
    }
    return result;
  }

  return [];
}

function scGetAssunto(provaKey, num, anoOriginal, numOriginal) {
  const p = SC_PROVAS[provaKey];
  if (!p) return '';
  const d = p.data;
  if (!d) return '';

  if (p.tipo === 'multi') {
    return (d.assuntos?.[anoOriginal]?.[numOriginal]) || '';
  }
  // linear (ENEM/MACRO)
  return (d.assuntos?.[num]) || '';
}

function scGetGabarito(provaKey, num, anoOriginal, numOriginal) {
  const p = SC_PROVAS[provaKey];
  if (!p) return null;
  const d = p.data;
  if (!d) return null;

  if (p.tipo === 'multi') {
    return (d.gabarito?.[anoOriginal]?.[numOriginal]) || null;
  }
  // linear (ENEM/MACRO)
  return (d.gabarito?.[num]) || null;
}

// ─── scMostrarAnos: chamado por praticar.js ao clicar no card ─
// grupoId = 'ENEM' | 'MACRO' | 'PSC1' | 'PSC2' | ... | 'SIS3'
function scMostrarAnos(grupoId) {
  const container = document.getElementById('sim-cards-container');
  const picker    = document.getElementById('sim-vest-picker');
  if (!container) return;
  if (picker) picker.style.display = 'none';

  const chaves = SC_GRUPOS[grupoId] || [];
  const temSelecao = chaves.length > 1; // ENEM e MACRO têm 3 anos; PSC/SIS têm 1

  if (!temSelecao) {
    // PSC/SIS: apenas 1 opção → mostra card de confirmação direto
    const key = chaves[0];
    scMostrarConfirmacao(key, grupoId);
    return;
  }

  // ENEM / MACRO: mostra lista de anos
  container.innerHTML = `
    <div style="margin-bottom:14px;display:flex;align-items:center;gap:8px">
      <button onclick="voltarParaModos()" style="
        padding:7px 12px;border-radius:8px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:12px;cursor:pointer">
        ← Voltar
      </button>
      <span style="font-size:13px;font-weight:700;color:var(--text)">
        ${SC_PROVAS[chaves[0]]?.emoji || ''} ${grupoId} — Escolha o ano
      </span>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${chaves.map(key => {
        const p = SC_PROVAS[key];
        const questoes = scGetQuestoes(key);
        const temDados = questoes.length > 0;
        return `
          <div onclick="${temDados ? `scMostrarConfirmacao('${key}','${grupoId}')` : ''}" style="
            padding:16px;border-radius:14px;cursor:${temDados ? 'pointer' : 'default'};
            border:1px solid ${temDados ? p.corBorda : 'var(--border)'};
            background:${temDados ? p.corBg : 'var(--surface)'};
            transition:all 0.15s;opacity:${temDados ? '1' : '0.45'};
            display:flex;align-items:center;justify-content:space-between">
            <div>
              <div style="font-size:15px;font-weight:800;color:${temDados ? p.cor : 'var(--text2)'}">
                ${p.label}
              </div>
              <div style="font-size:11px;color:var(--text2);margin-top:3px">
                ${temDados
                  ? `${questoes.length} questões · ${p.tempoMinutos} min · Gabarito oficial`
                  : 'Sem questões cadastradas'}
              </div>
            </div>
            <div style="font-size:20px;color:${temDados ? p.cor : 'var(--text2)'}">
              ${temDados ? '›' : '🔒'}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ─── Card de confirmação antes de iniciar ─────────────────────
function scMostrarConfirmacao(key, grupoId) {
  const container = document.getElementById('sim-cards-container');
  if (!container) return;
  const p       = SC_PROVAS[key];
  const questoes = scGetQuestoes(key);
  const temDados = questoes.length > 0;
  const temSelecao = (SC_GRUPOS[grupoId] || []).length > 1;

  const voltarOnClick = temSelecao
    ? `scMostrarAnos('${grupoId}')`
    : `voltarParaModos()`;

  const anoInfo = p.tipo === 'multi'
    ? `${p.anos?.join(' · ')} · ${questoes.length} questões`
    : `${questoes.length} questões`;

  container.innerHTML = `
    <div style="background:${p.corBg};border:1px solid ${p.corBorda};border-radius:16px;padding:18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:32px">${p.emoji}</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:${p.cor}">${p.label}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">Matemática e suas Tecnologias</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${p.cor}">${questoes.length}</div>
          <div style="font-size:10px;color:var(--text2)">Questões</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:15px;font-weight:800;color:${p.cor}">${Math.floor(p.tempoMinutos/60)}h${p.tempoMinutos%60?p.tempoMinutos%60+'min':''}</div>
          <div style="font-size:10px;color:var(--text2)">Tempo</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:15px;font-weight:800;color:${p.cor}">Oficial</div>
          <div style="font-size:10px;color:var(--text2)">Gabarito</div>
        </div>
      </div>
      ${temDados ? `
      <button onclick="scIniciarDireto('${key}')" style="
        width:100%;padding:15px;border-radius:12px;border:none;
        background:${p.cor};color:#fff;font-family:var(--font);
        font-size:15px;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px">
        🏆 Iniciar Simulado Completo
      </button>` : `
      <div style="text-align:center;color:var(--text2);font-size:13px;padding:12px">
        Sem questões cadastradas para esta prova
      </div>`}
      <button onclick="${voltarOnClick}" style="
        width:100%;padding:11px;margin-top:8px;border-radius:12px;
        border:1px solid var(--border);background:transparent;
        color:var(--text2);font-family:var(--font);font-size:13px;cursor:pointer">
        ← Voltar
      </button>
    </div>`;
}

// ─── INICIAR ─────────────────────────────────────────────────
function scIniciarDireto(key) {
  SC.provaKey    = key;
  const p        = SC_PROVAS[key];
  if (!p) return;
  const d        = p.data;
  if (!d) { alert('Dados da prova não carregados.'); return; }

  SC.questoes    = scGetQuestoes(key);
  if (SC.questoes.length === 0) { alert('Sem questões cadastradas para esta prova.'); return; }

  SC.atual       = 0;
  SC.respostas   = {};
  SC.tempoInicio = Date.now();

  const overlay = _el('sc-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';

  document.querySelectorAll('.sc-tela').forEach(t => t.classList.remove('ativa'));
  _el('sc-header-prova').style.display = 'flex';
  _el('sc-body').style.display         = 'flex';
  _el('sc-resultado').style.display    = 'none';

  scRenderQ();
  scRenderLog();
  scIniciarTimer(p.tempoMinutos * 60);
}

// ─── CRONÔMETRO ──────────────────────────────────────────────
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
  const total = SC.questoes.length;
  const n     = SC.atual + 1;

  _txt('sc-prog-txt', `Questão ${n} de ${total}`);
  _el('sc-prog-fill').style.width = ((n / total) * 100) + '%';

  // Badge: mostra o ano para questões multi (PSC/SIS)
  const badge = _el('sc-badge');
  if (badge) {
    const anoSufixo = q._ano ? ` · ${q._ano}` : '';
    badge.textContent = `${p.badge}${anoSufixo} · Q${q._numOriginal || q.num}`;
    badge.style.color      = p.cor;
    badge.style.background = p.corBg;
  }

  const assunto = scGetAssunto(SC.provaKey, q.num, q._ano, q._numOriginal);
  _txt('sc-assunto', assunto);

  _el('sc-enunciado').innerHTML = q.enunciado.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

  // Imagem
  const imgBlock = _el('sc-img-block');
  if (q.img) {
    imgBlock.innerHTML = `
      <figure class="sc-img-box" style="margin:12px 0">
        <img src="${q.img}" alt="Figura Q${q._numOriginal || q.num}" loading="lazy"
          onclick="scZoomAbrir('${q.img}')"
          onerror="this.closest('figure').style.display='none'"
          style="max-width:100%;border-radius:8px;cursor:zoom-in">
        <figcaption style="display:flex;align-items:center;justify-content:space-between;
          font-size:11px;color:var(--text2);margin-top:6px;padding:0 2px">
          <span>📊 Material de apoio — Q${q._numOriginal || q.num}${q._ano ? ' · ' + q._ano : ''} · ${p.badge}</span>
          <span onclick="scZoomAbrir('${q.img}')" style="cursor:pointer;color:${p.cor};font-weight:700">
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

// ─── PULAR ───────────────────────────────────────────────────
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

// ─── NAVEGAÇÃO ───────────────────────────────────────────────
function scProximo() {
  if (SC.atual < SC.questoes.length - 1) { SC.atual++; scRenderQ(); scRenderLog(); }
  else scEncerrar();
}
function scAnterior() {
  if (SC.atual > 0) { SC.atual--; scRenderQ(); scRenderLog(); }
}
function scIrPara(idx) {
  SC.atual = idx; scRenderQ();
  if (window.innerWidth < 768) _el('sc-log').classList.remove('aberto');
}

// ─── LOG ─────────────────────────────────────────────────────
function scRenderLog() {
  const grid = _el('sc-log-grid');
  if (!grid) return;
  grid.innerHTML = SC.questoes.map((q, i) => {
    const r   = SC.respostas[q.num];
    const cls = i === SC.atual ? 'atual' : r === 'pulada' ? 'pulada' : r ? 'resp' : '';
    return `<button class="sc-log-q ${cls}" onclick="scIrPara(${i})" title="Q${q._numOriginal || q.num}${q._ano ? ' ('+q._ano+')' : ''}">${q._numOriginal || q.num}</button>`;
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
  const resp  = Object.values(SC.respostas).filter(r => r !== 'pulada').length;
  const total = SC.questoes.length;
  const msg   = resp < total
    ? `Você respondeu ${resp} de ${total} questões.\nDeseja encerrar mesmo assim?`
    : 'Deseja encerrar a prova?';
  if (confirm(msg)) scEncerrar();
}

// ─── ENCERRAR ────────────────────────────────────────────────
function scEncerrar() {
  clearInterval(SC.timer);
  _el('sc-header-prova').style.display = 'none';
  _el('sc-body').style.display         = 'none';
  _el('sc-resultado').style.display    = 'block';
  scMostrarResultado();
}

// ─── RESULTADO ───────────────────────────────────────────────
function scMostrarResultado() {
  const p     = SC_PROVAS[SC.provaKey];   // ← bug corrigido: p estava ausente
  const total = SC.questoes.length;
  let ac = 0, er = 0, pu = 0, vz = 0;
  const assA = {}, assE = {};

  SC.questoes.forEach(q => {
    const r   = SC.respostas[q.num];
    const g   = scGetGabarito(SC.provaKey, q.num, q._ano, q._numOriginal);
    const ass = scGetAssunto(SC.provaKey, q.num, q._ano, q._numOriginal) || 'Outros';
    if (!assA[ass]) { assA[ass] = 0; assE[ass] = 0; }
    if (!r)               { vz++; assE[ass]++; }
    else if (r==='pulada') { pu++; assE[ass]++; }
    else if (r===g)        { ac++; assA[ass]++; }
    else                   { er++; assE[ass]++; }
  });

  const pct    = total > 0 ? Math.round((ac / total) * 100) : 0;
  const corPct = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444';
  const emoji  = pct >= 70 ? '🎉' : pct >= 50 ? '📈' : '💪';

  const dec   = Math.floor((Date.now() - SC.tempoInicio) / 1000);
  const tempo = `${String(Math.floor(dec/3600)).padStart(2,'0')}:${String(Math.floor((dec%3600)/60)).padStart(2,'0')}:${String(dec%60).padStart(2,'0')}`;

  const assuntos = Object.keys(assA)
    .map(ass => ({ ass, a: assA[ass], e: assE[ass] }))
    .sort((x, y) => y.e - x.e);

  const melhorar = assuntos.filter(x => x.e > 0).slice(0, 5);

  const gabHtml = SC.questoes.map(q => {
    const r = SC.respostas[q.num];
    const g = scGetGabarito(SC.provaKey, q.num, q._ano, q._numOriginal);
    const [ico, cor] = (!r || r==='pulada') ? ['—','#f59e0b'] : r===g ? ['✓','#10b981'] : ['✗','#ef4444'];
    const anoTag = q._ano ? `<span style="font-size:9px;color:var(--text2);margin-left:4px">(${q._ano})</span>` : '';
    return `
      <div class="sc-gab-row">
        <span style="font-weight:800;color:var(--text2);width:34px;flex-shrink:0">Q${q._numOriginal || q.num}</span>
        ${anoTag}
        <span style="flex:1;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${scGetAssunto(SC.provaKey, q.num, q._ano, q._numOriginal)}
        </span>
        <span style="font-weight:700;color:var(--text);width:16px;text-align:center">${r&&r!=='pulada'?r:'–'}</span>
        <span style="color:var(--border)">→</span>
        <span style="font-weight:800;color:var(--text);width:16px;text-align:center">${g || '?'}</span>
        <span style="font-weight:900;color:${cor};width:16px;text-align:center">${ico}</span>
      </div>`;
  }).join('');

  _el('sc-resultado').innerHTML = `
    <div class="sc-res-wrap">

      <div style="text-align:center;padding:20px 0 16px">
        <div style="font-size:48px;margin-bottom:8px">${emoji}</div>
        <div class="result-title">Resultado Final</div>
        <div style="font-size:13px;color:var(--text2);margin-top:4px">${p.label}</div>
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

// ─── FECHAR ─────────────────────────────────────────────────
function scFechar() {
  clearInterval(SC.timer);
  const overlay = _el('sc-overlay');
  if (overlay) overlay.style.display = 'none';

  _el('sc-header-prova').style.display = 'none';
  _el('sc-body').style.display         = 'none';
  _el('sc-resultado').style.display    = 'none';
  _el('sc-resultado').innerHTML        = '';
  const log = _el('sc-log');
  if (log) log.classList.remove('aberto');

  goTo('praticar');
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

// ─── Zoom de imagem ─────────────────────────────────────────
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
