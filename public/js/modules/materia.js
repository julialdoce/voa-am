// js/modules/materia.js
// Seleção de matéria, série e renderização de tópicos

// ─── NAVIGATION ───
function toggleVest(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}

// ─── MATÉRIA ───
function selectSubject(subj) {
  state.currentSubject = subj;
  document.getElementById('tab-mat').classList.toggle('active', subj === 'mat');
  document.getElementById('tab-red').classList.toggle('active', subj === 'red');
  document.getElementById('serie-selector-mat').style.display = subj === 'mat' ? 'flex' : 'none';
  document.getElementById('serie-selector-red').style.display = subj === 'red' ? 'flex' : 'none';
  renderTopics();
}

function selectSerie(n) {
  state.currentSerie = n;
  document.querySelectorAll('#serie-selector-mat .serie-btn').forEach((b,i) => {
    b.classList.toggle('active', i+1 === n);
  });
  renderTopics();
}

function selectSerieRed(n) {
  state.currentSerieRed = n;
  document.querySelectorAll('#serie-selector-red .serie-btn').forEach((b,i) => {
    b.classList.toggle('active', i+1 === n);
  });
  renderTopics();
}

function renderTopics() {
  const list = document.getElementById('topics-list');
  const topics = state.currentSubject === 'mat'
    ? mathTopics[state.currentSerie]
    : redTopics[state.currentSerieRed];

  list.innerHTML = topics.map(t => `
    <div class="topic-card" onclick="openAula('${t.quizId}')">
      <div class="topic-icon">${t.icon}</div>
      <div class="topic-info">
        <div class="topic-name">${t.name}</div>
        <div class="topic-meta">${t.sub}</div>
      </div>
      <div class="topic-status">
        <div class="topic-check ${t.status}">${t.emoji}</div>
      </div>
    </div>
  `).join('');
}

