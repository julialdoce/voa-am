// js/modules/gamification.js
// XP, streak, conquistas e atualização de estatísticas


// ─── STREAK ───
function verificarStreak() {
  const hoje = new Date().toDateString();
  const ultimoDia = localStorage.getItem('ultimoDia');
  const ontem = new Date(Date.now() - 86400000).toDateString();
  if (ultimoDia === hoje) return; // já contou hoje
  if (ultimoDia === ontem) { state.streak++; }
  else if (ultimoDia !== hoje) { state.streak = 1; }
  localStorage.setItem('ultimoDia', hoje);
  salvarState();
  const el = document.getElementById('streak-days');
  if (el) el.textContent = `${state.streak} dia${state.streak>1?'s':''} seguido${state.streak>1?'s':''}!`;
}

// ─── GAMIFICATION ───
function addXP(amount) {
  state.xp += amount;
  salvarState();
  document.getElementById('xp-count').textContent = state.xp;
  const rankXp = document.getElementById('rank-xp');
  if (rankXp) rankXp.textContent = state.xp + ' XP';
  showXPToast('+' + amount + ' XP');
}

function showXPToast(msg) {
  const t = document.getElementById('xp-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1500);
}

function spawnStars() {
  for(let i = 0; i < 3; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.className = 'float-star';
      star.textContent = ['⭐','🌟','✨'][Math.floor(Math.random()*3)];
      star.style.left = (30 + Math.random()*60) + 'vw';
      star.style.top = (40 + Math.random()*20) + 'vh';
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 900);
    }, i * 150);
  }
}

function showAchievement(icon, name) {
  const popup = document.getElementById('ach-popup');
  document.getElementById('ach-icon').textContent = icon;
  document.getElementById('ach-name').textContent = name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 3000);
}

function showVideoMsg() {
  showXPToast('📺 Videoaula em breve!');
}

function updateStats() {
  document.getElementById('stat-aulas').textContent = state.aulas;
  document.getElementById('stat-quiz').textContent = state.quizDone;
  document.getElementById('stat-correct').textContent = state.quizCorrect;
  const pct = Math.min(100, Math.round((state.quizCorrect/Math.max(1,state.quizDone))*100));
  document.getElementById('home-pct').textContent = pct + '%';
  document.getElementById('home-bar').style.width = pct + '%';
}


