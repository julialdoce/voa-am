// js/modules/exercicios.js
// Exercícios estilo Duolingo: coração, progresso, questões por tab


// ─── EXERCÍCIOS ESTILO DUOLINGO (mantido para o botão Exercícios do nav) ───
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
  const elMat = document.getElementById('exf-mat');
  const elRed = document.getElementById('exf-red');
  if (elMat) {
    elMat.style.borderColor = mat === 'Matemática' ? 'rgba(0,180,216,0.4)' : 'rgba(255,255,255,0.08)';
    elMat.style.background  = mat === 'Matemática' ? 'rgba(0,180,216,0.1)' : 'rgba(255,255,255,0.04)';
    elMat.style.color       = mat === 'Matemática' ? 'var(--cyan)' : 'var(--text2)';
  }
  if (elRed) {
    elRed.style.borderColor = mat === 'Redação' ? 'rgba(244,168,51,0.4)' : 'rgba(255,255,255,0.08)';
    elRed.style.background  = mat === 'Redação' ? 'rgba(244,168,51,0.1)' : 'rgba(255,255,255,0.04)';
    elRed.style.color       = mat === 'Redação' ? 'var(--gold)' : 'var(--text2)';
  }
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
  // escapeHTML definido em utils.js
  let html = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:12px;color:var(--text2)">📌 ${escapeHTML(q.contexto||'')}  </div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:18px;margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">${escapeHTML(q.materia)}</div>
      <div style="font-size:15px;font-weight:500;line-height:1.6;color:var(--text)">${escapeHTML(q.enunciado)}</div>
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

