// =============================================================
// js/modules/redacao.js
// Lógica da página de Redação: abas, filtros, editor, contadores
// VoaAM · Vestibulares do Amazonas
// =============================================================

// ─── ABAS ───────────────────────────────────────────────────
function redAba(aba) {
  // Painéis
  const temasPanel  = document.getElementById('red-temas-panel');
  const editorPanel = document.getElementById('red-editor-panel');
  // Botões
  const btnTemas  = document.getElementById('redtab-temas');
  const btnEditor = document.getElementById('redtab-editor');

  if (!temasPanel || !editorPanel) return;

  const ativo   = 'border:1.5px solid var(--border-accent);background:rgba(59,130,246,0.1);color:var(--accent2);font-weight:700';
  const inativo = 'border:1px solid var(--border);background:var(--surface);color:var(--text2);font-weight:600';

  if (aba === 'temas') {
    temasPanel.style.display  = 'block';
    editorPanel.style.display = 'none';
    btnTemas.style.cssText  += ';' + ativo;
    btnEditor.style.cssText += ';' + inativo;
  } else {
    temasPanel.style.display  = 'none';
    editorPanel.style.display = 'block';
    btnTemas.style.cssText  += ';' + inativo;
    btnEditor.style.cssText += ';' + ativo;
  }
}

// ─── FILTROS POR VESTIBULAR ──────────────────────────────────
function redFiltrar(vest, btn) {
  // Atualiza botões
  document.querySelectorAll('.red-filtro-btn').forEach(b => b.classList.remove('red-filtro-active'));
  if (btn) btn.classList.add('red-filtro-active');

  // Filtra cards
  document.querySelectorAll('.red-tema-card:not(.red-tema-locked)').forEach(card => {
    const cardVest = card.getAttribute('data-vest') || '';
    card.style.display = (vest === 'todos' || cardVest === vest) ? 'block' : 'none';
  });
}

// ─── EXPANDIR / COLAPSAR MOTIVADORES ─────────────────────────
function redExpandirTema(event, btn) {
  event.stopPropagation();
  const card       = btn.closest('.red-tema-card');
  const motivadores = card.querySelector('.red-motivadores');
  const icon       = btn.querySelector('.red-expand-icon');
  const label      = btn.querySelector('span:first-child');

  const aberto = motivadores.style.display !== 'none';
  motivadores.style.display = aberto ? 'none' : 'block';
  icon.textContent          = aberto ? '▾' : '▴';
  label.textContent         = aberto ? 'Ver textos motivadores' : 'Ocultar motivadores';
}

// ─── SELECIONAR TEMA (abre motivadores automaticamente) ──────
function redSelecionarTema(card) {
  const motivadores = card.querySelector('.red-motivadores');
  const btn         = card.querySelector('.red-expand-btn');
  if (motivadores && motivadores.style.display === 'none') {
    motivadores.style.display = 'block';
    if (btn) {
      btn.querySelector('.red-expand-icon').textContent    = '▴';
      btn.querySelector('span:first-child').textContent    = 'Ocultar motivadores';
    }
  }
}

// ─── IR PARA O EDITOR COM O TEMA SELECIONADO ────────────────
function redEscreverTema(event, btn) {
  event.stopPropagation();
  const card   = btn.closest('.red-tema-card');
  const titulo = card.querySelector('[style*="font-weight:700;color:var(--text)"]')?.textContent?.trim() || '';
  const badge  = card.querySelector('[style*="font-size:10px;font-weight:800"]')?.textContent?.trim() || '';

  // Preenche o header do editor
  const badgeEl  = document.getElementById('red-editor-vest-badge');
  const tituloEl = document.getElementById('red-editor-tema-titulo');
  if (badgeEl)  badgeEl.textContent  = '✍️ ' + badge;
  if (tituloEl) tituloEl.textContent = titulo;

  // Restaura rascunho salvo para esse tema (se houver)
  const chave     = 'voaam_red_' + badge.replace(/\s+/g, '_');
  const rascunho  = localStorage.getItem(chave) || '';
  const textarea  = document.getElementById('red-editor-textarea');
  if (textarea) {
    textarea.value = rascunho;
    textarea.setAttribute('data-chave', chave);
    redAtualizarContadores(textarea);
  }

  // Vai para a aba editor
  redAba('editor');
}

// ─── CONTADORES DE PALAVRAS E LINHAS ────────────────────────
function redAtualizarContadores(textarea) {
  const texto  = textarea.value;
  const chars  = textarea.scrollHeight;

  // Palavras
  const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\s+/).length;
  const elPal    = document.getElementById('red-contador-palavras');
  if (elPal) elPal.textContent = palavras;

  // Linhas estimadas (aprox. 70 chars por linha)
  const linhas    = texto === '' ? 0 : texto.split('\n').reduce((acc, linha) => {
    return acc + Math.max(1, Math.ceil((linha.length || 1) / 68));
  }, 0);
  const elLin     = document.getElementById('red-contador-linhas');
  if (elLin) elLin.textContent = linhas;

  // Barra de progresso (max 30 linhas)
  const progress  = Math.min(100, (linhas / 30) * 100);
  const bar       = document.getElementById('red-progress-bar');
  if (bar) {
    bar.style.width = progress + '%';
    // Cor: vermelho < 7 linhas, amarelo 7–24, verde 25+
    if (linhas < 7)       bar.style.background = 'var(--red,#ef4444)';
    else if (linhas < 25) bar.style.background = 'var(--amber,#f59e0b)';
    else                  bar.style.background = 'var(--emerald,#10b981)';
  }
}

// ─── SALVAR RASCUNHO ─────────────────────────────────────────
function redSalvarRascunho() {
  const textarea = document.getElementById('red-editor-textarea');
  if (!textarea || !textarea.value.trim()) return;

  const chave = textarea.getAttribute('data-chave') || 'voaam_red_rascunho';
  localStorage.setItem(chave, textarea.value);

  // Feedback visual
  const fb = document.getElementById('red-save-feedback');
  if (fb) {
    fb.style.display = 'block';
    clearTimeout(fb._timer);
    fb._timer = setTimeout(() => { fb.style.display = 'none'; }, 3000);
  }
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
  // Placeholder — será implementado com IA futuramente
  alert('🤖 A correção por IA estará disponível em breve!\n\nPor enquanto, salve seu rascunho e revise usando a estrutura sugerida.');
}
