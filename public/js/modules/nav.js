// js/modules/nav.js
// Navegação entre telas, renderPerfil, toggleTheme e inicialização

// ─── NAVIGATION ───
const SLOT_MAP = {
  home:         'slot-page-home',
  vestibulares: 'slot-page-vestibulares',
  materia:      'slot-page-materia',
  praticar:     'slot-page-praticar',
  redacao:      'slot-page-redacao',
  perfil:       'slot-page-perfil',
};

function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + screen)?.classList.add('active');
  document.getElementById('nav-' + screen)?.classList.add('active');
  // Esconde todos os slots de página e mostra apenas o ativo (grid desktop)
  Object.entries(SLOT_MAP).forEach(([name, slotId]) => {
    const slot = document.getElementById(slotId);
    if (slot) slot.style.display = (name === screen) ? 'block' : 'none';
  });
  if (screen === 'materia')  renderTopics();
  if (screen === 'perfil')   renderPerfil();
  if (screen === 'praticar') pratAba('sim');
  if (screen === 'redacao')  redAba('temas');
}

// ─── MODAL SIMULADO (compatibilidade) ───
// já redefinido acima no bloco PRATICAR — ABAS

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
function authLogout() {
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
if (perfil) {
  aplicarPerfil();
}
renderTopics();


