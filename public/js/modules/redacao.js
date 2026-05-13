// =============================================================
// js/modules/redacao.js
// Redação: abas, filtros, editor, contadores, rascunhos e histórico
// VoaAM · Vestibulares do Amazonas
// =============================================================

// ─── CHAVE DO localStorage ───────────────────────────────────
const RED_HISTORICO_KEY = 'voaam_red_historico'; // array de redações concluídas
const RED_RASCUNHO_KEY  = 'voaam_red_rascunho_';  // prefixo + tema-id

// ID da redação aberta no modal (para excluir/retomar)
let redModalId = null;

// ─── HELPERS localStorage ────────────────────────────────────
function redGetHistorico() {
  try { return JSON.parse(localStorage.getItem(RED_HISTORICO_KEY) || '[]'); }
  catch { return []; }
}
function redSaveHistorico(lista) {
  localStorage.setItem(RED_HISTORICO_KEY, JSON.stringify(lista));
}

// ─── ABAS ────────────────────────────────────────────────────
function redAba(aba) {
  const paineis = {
    temas:     document.getElementById('red-temas-panel'),
    editor:    document.getElementById('red-editor-panel'),
    historico: document.getElementById('red-historico-panel'),
  };
  const btns = {
    temas:     document.getElementById('redtab-temas'),
    editor:    document.getElementById('redtab-editor'),
    historico: document.getElementById('redtab-historico'),
  };

  if (!paineis.temas) return;

  const estiloAtivo   = 'border:1.5px solid var(--border-accent);background:rgba(59,130,246,0.1);color:var(--accent2);font-weight:700';
  const estiloInativo = 'border:1px solid var(--border);background:var(--surface);color:var(--text2);font-weight:600';

  Object.entries(paineis).forEach(([nome, el]) => {
    if (!el) return;
    el.style.display = nome === aba ? 'block' : 'none';
  });
  Object.entries(btns).forEach(([nome, el]) => {
    if (!el) return;
    // Preserva os estilos base e sobrescreve apenas os de estado
    const base = el.getAttribute('style')
      .replace(/border:[^;]+;/g, '')
      .replace(/background:[^;]+;/g, '')
      .replace(/color:[^;]+;/g, '')
      .replace(/font-weight:[^;]+;/g, '');
    el.setAttribute('style', base + ';' + (nome === aba ? estiloAtivo : estiloInativo));
  });

  if (aba === 'historico') redRenderHistorico();
}

// ─── FILTROS POR VESTIBULAR ──────────────────────────────────
function redFiltrar(vest, btn) {
  document.querySelectorAll('.red-filtro-btn').forEach(b => b.classList.remove('red-filtro-active'));
  if (btn) btn.classList.add('red-filtro-active');

  document.querySelectorAll('.red-tema-card:not(.red-tema-locked)').forEach(card => {
    const cardVest = card.getAttribute('data-vest') || '';
    card.style.display = (vest === 'todos' || cardVest === vest) ? 'block' : 'none';
  });
}

// ─── EXPANDIR / COLAPSAR MOTIVADORES ─────────────────────────
function redExpandirTema(event, btn) {
  event.stopPropagation();
  const card        = btn.closest('.red-tema-card');
  const motivadores = card.querySelector('.red-motivadores');
  const icon        = btn.querySelector('.red-expand-icon');
  const label       = btn.querySelector('span:first-child');
  const aberto      = motivadores.style.display !== 'none';

  motivadores.style.display = aberto ? 'none' : 'block';
  icon.textContent           = aberto ? '▾' : '▴';
  label.textContent          = aberto ? 'Ver textos motivadores' : 'Ocultar motivadores';
}

// ─── CLIQUE NO CARD (abre motivadores) ───────────────────────
function redSelecionarTema(card) {
  const motivadores = card.querySelector('.red-motivadores');
  const btn         = card.querySelector('.red-expand-btn');
  if (motivadores && motivadores.style.display === 'none') {
    motivadores.style.display = 'block';
    if (btn) {
      btn.querySelector('.red-expand-icon').textContent = '▴';
      btn.querySelector('span:first-child').textContent = 'Ocultar motivadores';
    }
  }
}

// ─── IR PARA O EDITOR COM O TEMA ─────────────────────────────
function redEscreverTema(event, btn) {
  event.stopPropagation();
  const card    = btn.closest('.red-tema-card');
  const temaId  = card.getAttribute('data-tema-id') || 'sem_tema';
  const titulo  = card.querySelector('.red-motivadores')
    ? card.querySelectorAll('[style*="font-weight:700"]')[0]?.textContent?.trim() || ''
    : '';
  const badge   = card.querySelector('.red-vest-badge')?.textContent?.trim() || '';

  // Preenche header do editor
  const badgeEl  = document.getElementById('red-editor-vest-badge');
  const tituloEl = document.getElementById('red-editor-tema-titulo');
  if (badgeEl)  badgeEl.textContent  = '✍️ ' + badge;
  if (tituloEl) tituloEl.textContent = titulo;

  // Guarda meta no textarea para uso posterior
  const textarea = document.getElementById('red-editor-textarea');
  if (textarea) {
    textarea.setAttribute('data-tema-id',  temaId);
    textarea.setAttribute('data-badge',    badge);
    textarea.setAttribute('data-titulo',   titulo);

    // Restaura rascunho (se houver)
    const rascunho = localStorage.getItem(RED_RASCUNHO_KEY + temaId) || '';
    textarea.value = rascunho;
    redAtualizarContadores(textarea);
  }

  redAba('editor');
}

// ─── CONTADORES ──────────────────────────────────────────────
function redAtualizarContadores(textarea) {
  const texto   = textarea.value;
  const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
  const linhas   = texto === '' ? 0 : texto.split('\n').reduce((acc, l) => {
    return acc + Math.max(1, Math.ceil((l.length || 1) / 68));
  }, 0);

  const elPal = document.getElementById('red-contador-palavras');
  const elLin = document.getElementById('red-contador-linhas');
  if (elPal) elPal.textContent = palavras;
  if (elLin) elLin.textContent = linhas;

  const progress = Math.min(100, (linhas / 30) * 100);
  const bar      = document.getElementById('red-progress-bar');
  if (bar) {
    bar.style.width      = progress + '%';
    bar.style.background = linhas < 7 ? '#ef4444' : linhas < 25 ? '#f59e0b' : '#10b981';
  }
}

// ─── SALVAR RASCUNHO ─────────────────────────────────────────
function redSalvarRascunho() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea || !textarea.value.trim()) return;

  const temaId = textarea.getAttribute('data-tema-id') || 'sem_tema';
  localStorage.setItem(RED_RASCUNHO_KEY + temaId, textarea.value);

  redMostrarFeedback('red-save-feedback');
}

// ─── CONCLUIR → ENVIA AO HISTÓRICO ───────────────────────────
function redEnviarHistorico() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea || !textarea.value.trim()) {
    redMostrarFeedbackErro('Escreva sua redação antes de concluir.');
    return;
  }

  const texto   = textarea.value;
  const temaId  = textarea.getAttribute('data-tema-id')  || 'sem_tema';
  const badge   = textarea.getAttribute('data-badge')    || '';
  const titulo  = textarea.getAttribute('data-titulo')   || '';
  const palavras = texto.trim().split(/\s+/).length;
  const linhas   = texto.split('\n').reduce((acc, l) => acc + Math.max(1, Math.ceil((l.length || 1) / 68)), 0);

  const entrada = {
    id:        Date.now(),
    temaId,
    badge,
    titulo,
    texto,
    palavras,
    linhas,
    status:    'concluida',
    data:      new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' }),
    hora:      new Date().toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' }),
  };

  const lista = redGetHistorico();
  // Substitui se já existe uma entrada com mesmo temaId
  const idx = lista.findIndex(r => r.temaId === temaId && r.status === 'concluida');
  if (idx > -1) lista[idx] = entrada;
  else lista.unshift(entrada);
  redSaveHistorico(lista);

  // Remove rascunho após concluir
  localStorage.removeItem(RED_RASCUNHO_KEY + temaId);

  redAtualizarBadge();
  redMostrarFeedback('red-concluir-feedback');
}

// ─── LIMPAR EDITOR ───────────────────────────────────────────
function redLimpar() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea) return;
  if (textarea.value.trim() && !confirm('Deseja apagar o texto atual?')) return;
  textarea.value = '';
  redAtualizarContadores(textarea);
}

// ─── CORRIGIR COM IA (placeholder) ───────────────────────────
function redCorrigir() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea || !textarea.value.trim()) {
    alert('Escreva sua redação antes de solicitar a correção.');
    return;
  }
  alert('🤖 A correção por IA estará disponível em breve!\n\nPor enquanto, salve seu rascunho e revise usando a estrutura sugerida.');
}

// ─── RENDERIZAR HISTÓRICO ────────────────────────────────────
function redRenderHistorico() {
  const lista     = redGetHistorico();
  const container = document.getElementById('red-hist-lista');
  const vazio     = document.getElementById('red-hist-vazio');
  const contador  = document.getElementById('red-hist-contador');

  if (!container) return;

  const n = lista.length;
  if (contador) contador.textContent = n === 0 ? 'Nenhuma redação salva ainda'
    : n === 1 ? '1 redação no histórico' : `${n} redações no histórico`;

  if (n === 0) {
    if (vazio)     vazio.style.display     = 'block';
    container.innerHTML = '';
    return;
  }

  if (vazio) vazio.style.display = 'none';

  container.innerHTML = lista.map(r => {
    // Cor do badge por vestibular
    const cor = r.badge.includes('ENEM')  ? { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.25)',  text:'#4ade80' }
              : r.badge.includes('PSC')   ? { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.25)', text:'#60a5fa' }
              : r.badge.includes('SIS')   ? { bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.25)', text:'#c084fc' }
              : r.badge.includes('MACRO') ? { bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.25)', text:'#fbbf24' }
              :                             { bg:'var(--surface2)',        border:'var(--border)',          text:'var(--text2)' };

    // Trecho de prévia (primeiras 120 chars)
    const previa = r.texto.replace(/\n/g, ' ').trim().slice(0, 120) + (r.texto.length > 120 ? '…' : '');

    // Cor da barra de linhas
    const barCor  = r.linhas < 7 ? '#ef4444' : r.linhas < 25 ? '#f59e0b' : '#10b981';
    const barPct  = Math.min(100, (r.linhas / 30) * 100);

    return `
    <div class="red-hist-card" onclick="redAbrirModal(${r.id})">
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px">
        <div style="flex-shrink:0;width:38px;height:38px;border-radius:11px;background:${cor.bg};border:1px solid ${cor.border};display:flex;align-items:center;justify-content:center;font-size:17px">✍️</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px">
            <span style="font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;background:${cor.bg};border:1px solid ${cor.border};color:${cor.text}">${r.badge}</span>
            <span style="font-size:10px;color:var(--text2);white-space:nowrap">${r.data} · ${r.hora}</span>
          </div>
          <div style="font-size:13px;font-weight:700;color:var(--text);line-height:1.35;margin-bottom:4px">${r.titulo}</div>
          <div style="font-size:11px;color:var(--text2);line-height:1.5">${previa}</div>
        </div>
      </div>

      <!-- Stats compactos -->
      <div style="display:flex;gap:10px;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text2)">
          📝 <span style="font-weight:700;color:var(--text)">${r.palavras}</span> palavras
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--text2)">
          ≡ <span style="font-weight:700;color:var(--text)">${r.linhas}</span>/30 linhas
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:11px">
          <span style="width:6px;height:6px;border-radius:50%;background:${r.status === 'concluida' ? '#10b981' : '#f59e0b'};display:inline-block"></span>
          <span style="color:var(--text2)">${r.status === 'concluida' ? 'Concluída' : 'Rascunho'}</span>
        </div>
      </div>

      <!-- Barra de progresso mini -->
      <div style="height:3px;border-radius:2px;background:var(--surface2);overflow:hidden">
        <div style="height:100%;width:${barPct}%;background:${barCor};border-radius:2px;transition:width 0.3s"></div>
      </div>

      <div style="margin-top:8px;font-size:11px;color:var(--accent2);font-weight:600">Ver redação completa →</div>
    </div>`;
  }).join('');
}

// ─── ABRIR MODAL ─────────────────────────────────────────────
function redAbrirModal(id) {
  const lista = redGetHistorico();
  const r     = lista.find(x => x.id === id);
  if (!r) return;

  redModalId = id;

  const cor = r.badge.includes('ENEM')  ? '#4ade80'
            : r.badge.includes('PSC')   ? '#60a5fa'
            : r.badge.includes('SIS')   ? '#c084fc'
            : r.badge.includes('MACRO') ? '#fbbf24' : 'var(--text2)';

  const barCor = r.linhas < 7 ? '#ef4444' : r.linhas < 25 ? '#f59e0b' : '#10b981';
  const barPct = Math.min(100, (r.linhas / 30) * 100);

  document.getElementById('modal-vest-badge').textContent  = '✍️ ' + r.badge;
  document.getElementById('modal-vest-badge').style.color  = cor;
  document.getElementById('modal-tema-titulo').textContent = r.titulo;
  document.getElementById('modal-meta').textContent        = `Salva em ${r.data} às ${r.hora}`;
  document.getElementById('modal-texto').textContent       = r.texto;

  document.getElementById('modal-stats').innerHTML = `
    <div style="flex:1;padding:12px 16px;border-right:1px solid var(--border);text-align:center">
      <div style="font-size:18px;font-weight:900;color:var(--text)">${r.palavras}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:2px">Palavras</div>
    </div>
    <div style="flex:1;padding:12px 16px;border-right:1px solid var(--border);text-align:center">
      <div style="font-size:18px;font-weight:900;color:var(--text)">${r.linhas}<span style="font-size:11px;color:var(--text2)">/30</span></div>
      <div style="font-size:10px;color:var(--text2);margin-top:2px">Linhas</div>
    </div>
    <div style="flex:1;padding:12px 16px;text-align:center">
      <div style="height:8px;border-radius:4px;background:var(--surface2);margin-bottom:6px;overflow:hidden">
        <div style="height:100%;width:${barPct}%;background:${barCor};border-radius:4px"></div>
      </div>
      <div style="font-size:10px;color:var(--text2)">${r.linhas < 7 ? 'Abaixo do mínimo' : r.linhas < 25 ? 'Em andamento' : 'Extensão ideal ✅'}</div>
    </div>
  `;

  const modal = document.getElementById('red-modal');
  if (modal) modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ─── FECHAR MODAL ────────────────────────────────────────────
function redFecharModal() {
  const modal = document.getElementById('red-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  redModalId = null;
}

// ─── RETOMAR DO MODAL ─────────────────────────────────────────
function redRetomarDoModal() {
  const lista = redGetHistorico();
  const r     = lista.find(x => x.id === redModalId);
  if (!r) return;

  redFecharModal();

  // Preenche o editor com os dados da redação
  const badgeEl  = document.getElementById('red-editor-vest-badge');
  const tituloEl = document.getElementById('red-editor-tema-titulo');
  const textarea = document.getElementById('red-editor-textarea');

  if (badgeEl)  badgeEl.textContent  = '✍️ ' + r.badge;
  if (tituloEl) tituloEl.textContent = r.titulo;
  if (textarea) {
    textarea.value = r.texto;
    textarea.setAttribute('data-tema-id', r.temaId);
    textarea.setAttribute('data-badge',   r.badge);
    textarea.setAttribute('data-titulo',  r.titulo);
    redAtualizarContadores(textarea);
  }

  redAba('editor');
}

// ─── EXCLUIR DO MODAL ────────────────────────────────────────
function redExcluirDoModal() {
  if (!confirm('Excluir esta redação do histórico?')) return;
  const lista  = redGetHistorico().filter(r => r.id !== redModalId);
  redSaveHistorico(lista);
  redAtualizarBadge();
  redFecharModal();
  redRenderHistorico();
}

// ─── LIMPAR TODO O HISTÓRICO ──────────────────────────────────
function redLimparHistorico() {
  if (!confirm('Excluir todas as redações do histórico? Esta ação não pode ser desfeita.')) return;
  redSaveHistorico([]);
  redAtualizarBadge();
  redRenderHistorico();
}

// ─── BADGE DE CONTADOR NA ABA ────────────────────────────────
function redAtualizarBadge() {
  const n     = redGetHistorico().length;
  const badge = document.getElementById('red-hist-badge');
  if (!badge) return;
  if (n > 0) {
    badge.textContent   = n;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// ─── FEEDBACKS ───────────────────────────────────────────────
function redMostrarFeedback(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.display = 'none'; }, 3000);
}
function redMostrarFeedbackErro(msg) {
  alert(msg);
}

// ─── FECHAR MODAL AO CLICAR NO FUNDO ─────────────────────────
document.addEventListener('click', function(e) {
  const modal = document.getElementById('red-modal');
  if (modal && e.target === modal) redFecharModal();
});

// ─── INIT ────────────────────────────────────────────────────
// Atualiza o badge sempre que a página carrega
(function redInit() {
  // Aguarda o DOM dos fragmentos estar pronto
  const check = setInterval(() => {
    if (document.getElementById('red-hist-badge')) {
      redAtualizarBadge();
      clearInterval(check);
    }
  }, 200);
})();
