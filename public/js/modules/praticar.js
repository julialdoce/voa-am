// js/modules/praticar.js
// Abas de praticar: simulados e exercícios (fluxo assunto→nível→questões)

// ─── PRATICAR — ABAS ───
let pratAbaAtual = 'sim';
let simVestAtual = 'ENEM';
let exVestAtual = 'ENEM';
let simModoAtual = null; // 'simples' or 'completo'

// Config dos vestibulares: questões e tempo completos
const simConfig = {
  ENEM:  { label:'ENEM',         emoji:'🌿', qs:45, horas:5, cor:'rgba(34,197,94,0.12)',  corBorda:'rgba(34,197,94,0.3)',  corNum:'#22c55e' },
  MACRO: { label:'MACRO',        emoji:'🔥', qs:20, horas:4, cor:'rgba(239,68,68,0.12)',  corBorda:'rgba(239,68,68,0.3)',  corNum:'var(--red)' },
  PSC1:  { label:'PSC 1ª Etapa', emoji:'🎓', qs:10, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  PSC2:  { label:'PSC 2ª Etapa', emoji:'🎓', qs:12, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  PSC3:  { label:'PSC 3ª Etapa', emoji:'🎓', qs:15, horas:2, cor:'rgba(59,130,246,0.12)', corBorda:'rgba(59,130,246,0.3)', corNum:'var(--accent2)' },
  SIS1:  { label:'SIS 1ª Etapa', emoji:'⭐', qs:10, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
  SIS2:  { label:'SIS 2ª Etapa', emoji:'⭐', qs:12, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
  SIS3:  { label:'SIS 3ª Etapa', emoji:'⭐', qs:15, horas:2, cor:'rgba(245,158,11,0.12)', corBorda:'rgba(245,158,11,0.3)', corNum:'var(--amber)' },
};

function simModoAba(modo) {
  simModoAtual = modo;
  const btnSimples  = document.getElementById('simtab-simples');
  const btnCompleto = document.getElementById('simtab-completo');
  if (btnSimples && btnCompleto) {
    const isSimples = modo === 'simples';
    btnSimples.style.borderColor  = isSimples ? 'var(--border-accent)' : 'var(--border)';
    btnSimples.style.background   = isSimples ? 'rgba(59,130,246,0.12)' : 'var(--surface)';
    btnSimples.style.color        = isSimples ? 'var(--accent2)' : 'var(--text2)';
    btnCompleto.style.borderColor = !isSimples ? 'rgba(244,168,51,0.5)' : 'var(--border)';
    btnCompleto.style.background  = !isSimples ? 'rgba(244,168,51,0.1)' : 'var(--surface)';
    btnCompleto.style.color       = !isSimples ? 'var(--gold)' : 'var(--text2)';
  }

  const picker       = document.getElementById('sim-vest-picker');
  const label        = document.getElementById('sim-vest-picker-label');
  const grid         = document.getElementById('sim-vest-picker-grid');
  const cardsContainer = document.getElementById('sim-cards-container');
  if (!picker || !grid) return;
  picker.style.display = 'block';
  if (cardsContainer) cardsContainer.innerHTML = '';

  // ── MODO COMPLETO: mostra provas oficiais disponíveis ──────
  if (modo === 'completo') {
    if (label) label.textContent = '🏆 Escolha a prova oficial';

    // Catálogo de provas — adicione novas provas aqui
    const provasOficiais = [
      {
        key:      'ENEM2025_MAT',
        emoji:    '🇧🇷',
        label:    'ENEM 2025',
        sub:      'Matemática e suas Tecnologias',
        qs:       45,
        horas:    '5h',
        cor:      'rgba(34,197,94,0.08)',
        corBorda: 'rgba(34,197,94,0.25)',
        corNum:   '#22c55e',
        temas:    ['Álgebra','Geometria','Estatística','Probabilidade','Funções','Trigonometria','Combinatória'],
        getData:  () => typeof ENEM2025_MAT !== 'undefined' ? ENEM2025_MAT : null,
      },
    ];

    grid.innerHTML = provasOficiais.map(p => `
      <button onclick="simSelecionarProvaOficial('${p.key}')" style="
        padding:14px 12px;border-radius:14px;border:1px solid ${p.corBorda};
        background:${p.cor};color:var(--text);font-family:var(--font);
        cursor:pointer;text-align:left;transition:all 0.15s;
        display:flex;flex-direction:column;gap:4px">
        <div style="font-size:20px">${p.emoji}</div>
        <div style="font-size:13px;font-weight:700;color:${p.corNum}">${p.label}</div>
        <div style="font-size:10px;color:var(--text2)">${p.sub}</div>
        <div style="font-size:10px;color:var(--text2);margin-top:2px">${p.qs} questões · ${p.horas}</div>
      </button>
    `).join('');

    return; // não executa o fluxo do simples abaixo
  }

  // ── MODO SIMPLES: picker de vestibular original ────────────
  if (label) label.textContent = '⚡ Escolha o vestibular — Modo Simples';
  const ordemVest = ['PSC1','SIS1','PSC2','SIS2','PSC3','SIS3','ENEM','MACRO'];
  grid.innerHTML = ordemVest.map(key => {
    const cfg  = simConfig[key];
    if (!cfg) return '';
    const qs      = Math.ceil(cfg.qs / 2);
    const mins    = Math.ceil(cfg.horas * 60 / 2);
    const horasStr = mins >= 60 ? (mins/60).toFixed(1).replace('.0','')+'h' : mins+'min';
    return `<button onclick="simSelecionarVestibular('${key}')" style="
      padding:14px 12px;border-radius:14px;border:1px solid ${cfg.corBorda};
      background:${cfg.cor};color:var(--text);font-family:var(--font);
      cursor:pointer;text-align:left;transition:all 0.15s;display:flex;flex-direction:column;gap:4px">
      <div style="font-size:20px">${cfg.emoji}</div>
      <div style="font-size:13px;font-weight:700;color:${cfg.corNum}">${cfg.label}</div>
      <div style="font-size:10px;color:var(--text2)">${qs} questões • ${horasStr}</div>
    </button>`;
  }).join('');
}

function simSelecionarVestibular(vestKey) {
  simVestAtual = vestKey;
  const picker = document.getElementById('sim-vest-picker');
  if (picker) picker.style.display = 'none';
  renderSimCardsNovo(vestKey, simModoAtual);
}

// ─── MODO COMPLETO: seleciona prova oficial e renderiza card ──
function simSelecionarProvaOficial(provaKey) {
  const picker = document.getElementById('sim-vest-picker');
  if (picker) picker.style.display = 'none';

  const provasOficiais = {
    'ENEM2025_MAT': {
      emoji: '🇧🇷', label: 'ENEM 2025',
      sub: 'Matemática e suas Tecnologias',
      qs: 45, horas: '5h',
      cor: 'rgba(34,197,94,0.08)',
      corBorda: 'rgba(34,197,94,0.25)',
      corNum: '#22c55e',
      temas: ['Álgebra','Funções','Geometria Plana','Geometria Espacial','Estatística','Probabilidade','Trigonometria','Combinatória','Logaritmos','Análise Dimensional'],
    },
  };

  const p = provasOficiais[provaKey];
  if (!p) return;
  const container = document.getElementById('sim-cards-container');
  if (!container) return;

  container.innerHTML = `
    <div style="background:${p.cor};border:1px solid ${p.corBorda};border-radius:16px;padding:18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:32px">${p.emoji}</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:${p.corNum}">${p.label}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${p.sub}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${p.corNum}">${p.qs}</div>
          <div style="font-size:10px;color:var(--text2)">Questões</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${p.corNum}">${p.horas}</div>
          <div style="font-size:10px;color:var(--text2)">Tempo</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${p.corNum}">Alto</div>
          <div style="font-size:10px;color:var(--text2)">Nível</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text2);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Conteúdos abordados</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px">
        ${p.temas.map(t => `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--text2);font-weight:600">${t}</span>`).join('')}
      </div>
      <button onclick="scIniciarDireto('${provaKey}')" style="
        width:100%;padding:15px;border-radius:12px;border:none;
        background:${p.corNum};color:#fff;font-family:var(--font);font-size:15px;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px">
        🏆 Iniciar Simulado Completo
      </button>
      <button onclick="voltarParaModos()" style="
        width:100%;padding:11px;margin-top:8px;border-radius:12px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:13px;cursor:pointer">
        ← Trocar prova
      </button>
    </div>`;
}

function renderSimCardsNovo(vestKey, modo) {
  const container = document.getElementById('sim-cards-container');
  if (!container) return;
  const cfg = simConfig[vestKey];
  if (!cfg) return;
  const qs   = modo === 'simples' ? Math.ceil(cfg.qs / 2) : cfg.qs;
  const mins = modo === 'simples' ? Math.ceil(cfg.horas * 60 / 2) : cfg.horas * 60;
  const horasStr = mins >= 60 ? (mins/60).toFixed(1).replace('.0','')+'h' : mins+'min';
  const modoLabel = modo === 'simples' ? 'Simples' : 'Completo';
  const modeIcon  = modo === 'simples' ? '⚡' : '🏆';

  const temasMap = {
    ENEM:  ['Álgebra & Funções','Geometria','Estatística','Probabilidade','Trigonometria','Mat. Financeira','Combinatória'],
    MACRO: ['Logaritmos & Exp.','Geometria Espacial','Probabilidade','Álgebra Avançada','Combinatória'],
    PSC1:  ['Conjuntos','Função Afim','Função Quadrática','Geometria Plana','PA e PG'],
    PSC2:  ['Trigonometria','Geometria Espacial','Matrizes','Sistemas Lineares','Combinatória'],
    PSC3:  ['Logaritmos','Probabilidade','Geo. Analítica','Números Complexos','Cônicas'],
    SIS1:  ['Funções','Equações','Geometria Plana','Progressões','Trigonometria'],
    SIS2:  ['Matrizes','Probabilidade','Geo. Espacial','Trigonometria Avançada','Logaritmos'],
    SIS3:  ['Combinatória','Estatística','Geo. Analítica','Mat. Financeira','Funções Avançadas'],
  };
  const temas = temasMap[vestKey] || [];
  const temasSel = modo === 'simples' ? temas.slice(0, Math.ceil(temas.length / 2)) : temas;

  // Resolve cor do botão principal
  const btnBg = cfg.corNum === 'var(--accent2)' ? 'var(--accent)'
    : cfg.corNum === '#22c55e' ? '#22c55e'
    : cfg.corNum === 'var(--amber)' ? 'var(--amber)'
    : cfg.corNum === 'var(--gold)'  ? 'var(--gold)'
    : 'var(--red)';

  container.innerHTML = `
    <div style="background:${cfg.cor};border:1px solid ${cfg.corBorda};border-radius:16px;padding:18px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:32px">${cfg.emoji}</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:${cfg.corNum}">${cfg.label}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">${modeIcon} Modo ${modoLabel} • ${qs} questões • ${horasStr}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${qs}</div>
          <div style="font-size:10px;color:var(--text2)">Questões</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${horasStr}</div>
          <div style="font-size:10px;color:var(--text2)">Tempo</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:10px;text-align:center">
          <div style="font-size:18px;font-weight:800;color:${cfg.corNum}">${modo === 'simples' ? 'Médio' : 'Alto'}</div>
          <div style="font-size:10px;color:var(--text2)">Nível</div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--text2);font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">Conteúdos abordados</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px">
        ${temasSel.map(t => `<span style="font-size:10px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--text2);font-weight:600">${t}</span>`).join('')}
      </div>
      <button onclick="iniciarSimuladoNovo('${vestKey}','${modo}')" style="
        width:100%;padding:15px;border-radius:12px;border:none;
        background:${btnBg};color:#fff;font-family:var(--font);font-size:15px;font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px">
        ${modeIcon} Iniciar Simulado ${modoLabel}
      </button>
      <button onclick="voltarParaModos()" style="
        width:100%;padding:11px;margin-top:8px;border-radius:12px;border:1px solid var(--border);
        background:transparent;color:var(--text2);font-family:var(--font);font-size:13px;cursor:pointer">
        ← Trocar vestibular
      </button>
    </div>`;
}

function voltarParaModos() {
  const container = document.getElementById('sim-cards-container');
  if (container) container.innerHTML = '';
  const picker = document.getElementById('sim-vest-picker');
  if (picker && simModoAtual) picker.style.display = 'block';
}

function iniciarSimuladoNovo(vestKey, modo) {
  const cfg = simConfig[vestKey];
  if (!cfg) return;
  const qs   = modo === 'simples' ? Math.ceil(cfg.qs / 2) : cfg.qs;
  const mins = modo === 'simples' ? Math.ceil(cfg.horas * 60 / 2) : cfg.horas * 60;

  const vestMap  = { ENEM:'ENEM', MACRO:'MACRO', PSC1:'PSC', PSC2:'PSC', PSC3:'PSC', SIS1:'SIS', SIS2:'SIS', SIS3:'SIS' };
  const etapaMap = { PSC1:1, PSC2:2, PSC3:3, SIS1:1, SIS2:2, SIS3:3 };
  const vestNome = vestMap[vestKey];
  const etapa    = etapaMap[vestKey];

  let pool = bancoDB.filter(q => q.vest === vestNome && q.opcoes && q.opcoes.length > 0);
  if (etapa) pool = pool.filter(q => !q.etapa || q.etapa === etapa);
  const embaralhadas = pool.sort(() => Math.random() - 0.5).slice(0, qs);
  if (!embaralhadas.length) { showXPToast('⚠️ Banco de questões insuficiente'); return; }

  const questoes = embaralhadas.map(q => ({
    q: q.enunciado, opts: q.opcoes, correct: q.correta,
    explanation: q.contexto || `Gabarito: ${q.gabarito}`, materia: q.materia, id: q.id
  }));
  const modoLabel = modo === 'simples' ? 'Simples' : 'Completo';
  currentQuiz = {
    title: `${cfg.label} — Simulado ${modoLabel}`,
    desc: `${modo === 'simples' ? '⚡' : '🏆'} Simulado ${modoLabel} • ${qs} questões • ${mins >= 60 ? (mins/60).toFixed(1).replace('.0','')+'h' : mins+'min'} cronometrado`,
    video: null, questions: questoes
  };
  currentQuizIdx = 0; quizCorrect = 0; isSimulado = true;
  document.getElementById('aula-title').textContent = currentQuiz.title;
  document.getElementById('aula-content').innerHTML = `
    <div class="topic-desc">${currentQuiz.desc}</div>
    <div class="quiz-title-bar">
      <span class="quiz-badge" style="background:${cfg.cor};color:${cfg.corNum}">${cfg.emoji} ${cfg.label}</span>
      <span class="quiz-progress-text">0 / ${questoes.length} questões</span>
    </div>
    <div id="quiz-area"></div>`;
  document.getElementById('aula-view').classList.add('open');
  iniciarCronometro(mins * 60);
  renderQuestion();
}

function pratAba(aba) {
  pratAbaAtual = aba;
  const btnSim = document.getElementById('pratab-sim');
  const btnEx = document.getElementById('pratab-ex');
  const panelSim = document.getElementById('prat-sim-panel');
  const panelEx = document.getElementById('prat-ex-panel');
  if (!btnSim) return;

  const isSim = aba === 'sim';
  btnSim.style.borderColor = isSim ? 'var(--border-accent)' : 'var(--border)';
  btnSim.style.background  = isSim ? 'rgba(59,130,246,0.1)' : 'var(--surface)';
  btnSim.style.color        = isSim ? 'var(--accent2)'       : 'var(--text2)';
  btnEx.style.borderColor  = !isSim ? 'rgba(245,158,11,0.4)' : 'var(--border)';
  btnEx.style.background   = !isSim ? 'rgba(245,158,11,0.08)' : 'var(--surface)';
  btnEx.style.color         = !isSim ? 'var(--gold)'          : 'var(--text2)';
  if (panelSim) panelSim.style.display = isSim ? 'block' : 'none';
  if (panelEx)  panelEx.style.display  = !isSim ? 'block' : 'none';

  if (isSim) {
    // Reset sim state: hide vest picker and cards, go back to mode selection
    const picker = document.getElementById('sim-vest-picker');
    const cards  = document.getElementById('sim-cards-container');
    if (picker) picker.style.display = 'none';
    if (cards)  cards.innerHTML = '';
    simModoAtual = null;
    const btnSimples  = document.getElementById('simtab-simples');
    const btnCompleto = document.getElementById('simtab-completo');
    if (btnSimples) {
      btnSimples.style.borderColor = 'var(--border-accent)';
      btnSimples.style.background  = 'rgba(59,130,246,0.12)';
      btnSimples.style.color       = 'var(--accent2)';
    }
    if (btnCompleto) {
      btnCompleto.style.borderColor = 'var(--border)';
      btnCompleto.style.background  = 'var(--surface)';
      btnCompleto.style.color       = 'var(--text2)';
    }
  } else {
    // Reset exercise sub-panels — always show Assuntos first
    exAssuntoAtual = null;
    exNivelAtual   = null;
    const assPanel   = document.getElementById('ex-assuntos-panel');
    const nivelPanel = document.getElementById('ex-nivel-panel');
    const questPanel = document.getElementById('ex-questoes-panel');
    if (assPanel)   assPanel.style.display   = 'block';
    if (nivelPanel) nivelPanel.style.display  = 'none';
    if (questPanel) questPanel.style.display  = 'none';
    renderListaEx();
  }
}

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

