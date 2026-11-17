// js/modules/nav.js
// Navegação entre telas, renderPerfil, toggleTheme e inicialização

// ─── NAVIGATION ───
const SLOT_MAP = {
  home:              'slot-page-home',
  materia:           'slot-page-materia',
  praticar:          'slot-page-praticar',
  redacao:           'slot-page-redacao',
  perfil:            'slot-page-perfil',
  'banco-de-provas': 'slot-page-banco-de-provas',
  programacao:       'slot-page-programacao',
};

function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + screen)?.classList.add('active');
  document.getElementById('nav-' + screen)?.classList.add('active');
  // Esconde todos os slots de página e mostra apenas o ativo (grid desktop)
  const activeSlotId = SLOT_MAP[screen] || null;
  Object.entries(SLOT_MAP).forEach(([name, slotId]) => {
    const slot = document.getElementById(slotId);
    if (slot) slot.style.display = (slotId === activeSlotId) ? 'block' : 'none';
  });
  if (screen === 'home' && typeof renderDashboard === 'function') renderDashboard();
  if (screen === 'materia')       renderTopics();
  if (screen === 'programacao' && typeof progRender === 'function') progRender();
  if (screen === 'perfil')        renderPerfil();
  if (screen === 'praticar')      pratAba('sim');
  if (screen === 'redacao')       redAba('temas');
  if (screen === 'banco-de-provas') { if (typeof initBancoProvas === 'function') initBancoProvas(); }
}

// ─── MODAL SIMULADO (compatibilidade) ───
// já redefinido acima no bloco PRATICAR — ABAS

// ─── PERFIL ───
function renderPerfil() {
  if (!perfil) return;
  const primeiro = (perfil.nome || 'Estudante').split(' ')[0];
  const put = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
  put('perfil-nome', perfil.nome || 'Estudante');
  put('perfil-email', perfil.email || 'E-mail não informado');
  put('perfil-email-detalhe', perfil.email || '—');
  put('perfil-avatar', (perfil.nome || 'A').trim().charAt(0).toUpperCase());
  const serieLabel = ['','1ª série do Ensino Médio','2ª série do Ensino Médio','3ª série do Ensino Médio','Ensino Médio completo'];
  put('perfil-serie-tag', serieLabel[perfil.serie] || 'Série não definida');
  put('perfil-vest-tag', (perfil.vests || []).join(' · ') || 'Vestibular não definido');
  put('perfil-xp', Number(state.xp || 0).toLocaleString('pt-BR'));
  put('perfil-acertos', state.quizDone > 0 ? Math.round((state.quizCorrect/state.quizDone)*100)+'%' : '—');
  put('perfil-streak', (state.streak || 0) + ' dias');
  const rankNome=document.getElementById('rank-nome'); if(rankNome) rankNome.textContent=primeiro;
  const rankXp=document.getElementById('rank-xp'); if(rankXp) rankXp.textContent=(state.xp||0)+' XP';
  const difEl=document.getElementById('perfil-dificuldades');
  if(difEl){
    const temas=Object.entries(typeof temasFragos!=='undefined'?temasFragos:{}).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
    difEl.innerHTML=temas.length?temas.map(([mat,n])=>'<div class="profile-account-row"><span>'+mat+'</span><strong>'+n+' erro'+(n>1?'s':'')+'</strong></div>').join(''):'Ainda não há erros registrados. Continue praticando para acompanhar seus pontos de atenção.';
  }
}
function perfilAbrirEdicao(){
  if(!perfil)return;
  const panel=document.getElementById('perfil-edit-panel'); if(!panel)return;
  document.getElementById('perfil-edit-nome').value=perfil.nome||'';
  document.getElementById('perfil-edit-email').value=perfil.email||'';
  document.getElementById('perfil-edit-serie').value=String(perfil.serie||3);
  document.getElementById('perfil-edit-dific').value=perfil.dific||'ambos';
  document.querySelectorAll('input[name="perfil-vest"]').forEach(el=>el.checked=(perfil.vests||[]).includes(el.value));
  document.getElementById('perfil-edit-error').textContent='';
  panel.hidden=false; panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function perfilFecharEdicao(){const p=document.getElementById('perfil-edit-panel');if(p)p.hidden=true;}
function perfilSalvarEdicao(event){
  event.preventDefault();
  const nome=document.getElementById('perfil-edit-nome').value.trim();
  const email=document.getElementById('perfil-edit-email').value.trim().toLowerCase();
  const serie=Number(document.getElementById('perfil-edit-serie').value);
  const dific=document.getElementById('perfil-edit-dific').value;
  const vests=Array.from(document.querySelectorAll('input[name="perfil-vest"]:checked')).map(el=>el.value);
  const error=document.getElementById('perfil-edit-error');
  if(!nome||!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)||!serie){error.textContent='Confira o nome, o e-mail e a escolaridade.';return;}
  if(!vests.length){error.textContent='Selecione ao menos um vestibular.';return;}
  const oldEmail=(perfil.email||'').toLowerCase();
  const contas=JSON.parse(localStorage.getItem('voaam_contas')||'[]');
  const conflict=contas.find(c=>c.email.toLowerCase()===email&&c.email.toLowerCase()!==oldEmail);
  if(conflict){error.textContent='Esse e-mail já está vinculado a outra conta neste dispositivo.';return;}
  const updated={...perfil,nome,email,serie,vests,dific};
  const index=contas.findIndex(c=>c.email.toLowerCase()===oldEmail);
  if(index>=0){contas[index].email=email;contas[index].perfil=updated;localStorage.setItem('voaam_contas',JSON.stringify(contas));}
  else {error.textContent='Não foi possível localizar o cadastro salvo neste navegador. Faça login novamente para sincronizar seus dados.';return;}
  perfil=updated;
  localStorage.setItem('voaam_perfil',JSON.stringify(perfil));
  state.currentSerie=serie<=3?serie:3;
  if(typeof aplicarPerfil==='function')aplicarPerfil();
  renderPerfil(); perfilFecharEdicao();
}
// authLogout() definido em auth.js

// ─── THEME TOGGLE ───
function toggleTheme() {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('voaam_theme', next);
  const control = document.getElementById('theme-toggle');
  if (control) {
    control.setAttribute('aria-pressed', String(next === 'dark'));
    control.setAttribute('aria-label', next === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro');
    control.title = next === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
  }
}
(function() {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('voaam_theme') || 'dark');
})();

// ─── INIT ───
const _xpEl = document.getElementById('xp-count');
if (_xpEl) _xpEl.textContent = state.xp;
if (perfil) {
  aplicarPerfil();
}
renderTopics();


