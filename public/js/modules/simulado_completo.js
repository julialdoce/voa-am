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

const SC_PROVAS = {
  'ENEM2025_MAT': {
    label:    'ENEM 2025 — Matemática',
    badge:    'ENEM 2025',
    cor:      '#22c55e',
    corBg:    'rgba(34,197,94,0.08)',
    corBorda: 'rgba(34,197,94,0.25)',
    emoji:    '🇧🇷',
    get data() { return typeof ENEM2025_MAT !== 'undefined' ? ENEM2025_MAT : null; },
  },
};

// ─── NAVEGAÇÃO ENTRE TELAS INTERNAS ──────────────────────────
function scTela(nome) {
  // Esconde todas as telas
  document.querySelectorAll('.sc-tela').forEach(t => t.classList.remove('ativa'));
  const alvo = document.getElementById('sc-tela-' + nome);
  if (alvo) alvo.classList.add('ativa');

  // Garante que body/header/resultado ficam ocultos quando nas telas de seleção
  const eSelecao = (nome === 'seletor' || nome === 'confirmar');
  _el('sc-header-prova').style.display = eSelecao ? 'none' : 'flex';
  _el('sc-body').style.display         = eSelecao ? 'none' : 'flex';
  _el('sc-resultado').style.display    = 'none';
}

// ─── ABRIR (chamado pelo botão na tela de Praticar) ──────────
function scAbrirSeletor() {
  const overlay = _el('sc-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  scPopularSeletor();
  scTela('seletor');
}

function scPopularSeletor() {
  const grid = _el('sc-seletor-grid');
  if (!grid) return;
  grid.innerHTML = Object.entries(SC_PROVAS).map(([key, p]) => {
    const d = p.data;
    return `
    <div onclick="scSelecionarProva('${key}')" style="
      padding:16px;border-radius:14px;cursor:pointer;transition:all 0.15s;
      border:1px solid ${p.corBorda};background:${p.corBg}"
      onmouseover="this.style.transform='translateY(-1px)'"
      onmouseout="this.style.transform=''">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <span style="font-size:28px">${p.emoji}</span>
        <div>
          <div style="font-size:15px;font-weight:800;color:${p.cor}">${p.label}</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px">
            ${d?.totalQuestoes || 0} questões · ${d?.tempoMinutos || 0} min · Gabarito oficial
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text2)">${d?.caderno || ''}</div>
    </div>`;
  }).join('');
}

function scSelecionarProva(key) {
  SC.provaKey = key;
  const p = SC_PROVAS[key];
  const d = p.data;
  if (!d) { alert('Dados da prova não carregados. Recarregue a página.'); return; }
  _el('sc-conf-titulo').textContent = p.label;
  _el('sc-conf-info').textContent   = `${d.totalQuestoes} questões · ${d.tempoMinutos} minutos · ${d.caderno}`;
  scTela('confirmar');
}

// Chamado pelo botão "Iniciar" na tela de confirmação
function scIniciar() { scIniciarDireto(SC.provaKey); }

// ─── INICIAR DIRETO (chamado pelo card em praticar.js) ────────
function scIniciarDireto(key) {
  SC.provaKey    = key;
  const d        = SC_PROVAS[key]?.data;
  if (!d) { alert('Dados da prova não carregados.'); return; }

  SC.questoes    = d.questoes;
  SC.atual       = 0;
  SC.respostas   = {};
  SC.tempoInicio = Date.now();

  // Garante que o overlay esteja aberto
  _el('sc-overlay').style.display = 'flex';

  // Esconde telas de seleção, mostra prova
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

  // Progresso
  _txt('sc-prog-txt', `Questão ${n} de ${total}`);
  _el('sc-prog-fill').style.width = ((n / total) * 100) + '%';

  // Badge
  const badge = _el('sc-badge');
  if (badge) { badge.textContent = `${p.badge} · Q${q.num}`; badge.style.color = p.cor; badge.style.background = p.corBg; }
  _txt('sc-assunto', d.assuntos[q.num] || '');

  // Enunciado
  _el('sc-enunciado').innerHTML = q.enunciado.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

  // Imagem
  const imgBlock = _el('sc-img-block');
  if (q.img) {
    imgBlock.innerHTML = `
      <figure class="sc-img-box" style="margin:12px 0">
        <img src="${q.img}" alt="Figura Q${q.num}" loading="lazy"
          onerror="this.closest('figure').style.display='none'">
        <figcaption>📊 Material de apoio — Q${q.num} · ENEM 2025</figcaption>
      </figure>`;
  } else {
    imgBlock.innerHTML = '';
  }

  // Alternativas
  const resp = SC.respostas[q.num];
  _el('sc-opts').innerHTML = Object.entries(q.alt).map(([letra, txt]) => `
    <button onclick="scSelectAlt('${letra}')"
      class="option-btn${resp === letra ? ' sc-sel' : ''}">
      <span class="option-letter">${letra}</span>
      <span>${txt}</span>
    </button>`).join('');

  // Botões de nav
  _txt('sc-btn-pular', resp === 'pulada' ? '↩ Desfazer pulo' : '⏭ Pular');
  _txt('sc-btn-prox',  n < total ? 'Próxima →' : '✅ Encerrar');

  // Scroll topo
  const sc = _el('sc-scroll'); if (sc) sc.scrollTop = 0;
}

// ─── SELECIONAR ALTERNATIVA ───────────────────────────────────
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
    const g   = d.gabarito[q.num];
    const ass = d.assuntos[q.num] || 'Outros';
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
    const g = d.gabarito[q.num];
    const [ico, cor] = !r || r==='pulada' ? ['—','#f59e0b'] : r===g ? ['✓','#10b981'] : ['✗','#ef4444'];
    return `
      <div class="sc-gab-row">
        <span style="font-weight:800;color:var(--text2);width:34px;flex-shrink:0">Q${q.num}</span>
        <span style="flex:1;color:var(--text2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.assuntos[q.num]}</span>
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
