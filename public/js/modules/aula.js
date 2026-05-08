// js/modules/aula.js
// Abertura de aula, renderização de quiz e resultado

// ─── AULA / QUIZ ───
let currentQuiz = null;
let currentQuizIdx = 0;
let quizCorrect = 0;
let answered = false;
let isSimulado = false;

function openAula(quizId) {
  const quiz = quizzes[quizId];
  if(!quiz) {
    // Generic placeholder for topics without quiz data
    openGenericAula(quizId);
    return;
  }
  currentQuiz = quiz;
  currentQuizIdx = 0;
  quizCorrect = 0;
  isSimulado = false;
  document.getElementById('aula-title').textContent = quiz.title;
  renderAulaContent();
  document.getElementById('aula-view').classList.add('open');
  addXP(10);
  state.aulas++;
  updateStats();
}

function openGenericAula(id) {
  document.getElementById('aula-title').textContent = 'Aula — Em breve';
  document.getElementById('aula-content').innerHTML = `
    <div class="video-area">
      <div class="video-thumb-bg">
        <div class="play-btn">▶</div>
        <div class="video-label">Videoaula disponível em breve</div>
      </div>
    </div>
    <div class="topic-desc">
      Este conteúdo está sendo produzido. Em breve você terá acesso à videoaula e questões de treino!
    </div>
    <button class="btn-secondary" onclick="closeAula()" style="margin-top:8px">← Voltar</button>
  `;
  document.getElementById('aula-view').classList.add('open');
}

function renderAulaContent() {
  const quiz = currentQuiz;
  if(currentQuizIdx === 0) {
    // Show lesson intro first
    document.getElementById('aula-content').innerHTML = `
      <div class="video-area" onclick="showVideoMsg()">
        <div class="video-thumb-bg">
          <div class="play-btn">▶</div>
          <div class="video-label">${quiz.video}</div>
        </div>
      </div>
      <div class="topic-desc">${quiz.desc}</div>
      <div class="quiz-title-bar">
        <span class="quiz-badge">⚡ Quiz</span>
        <span class="quiz-progress-text">0 / ${quiz.questions.length} questões</span>
      </div>
      <div id="quiz-area"></div>
    `;
    renderQuestion();
  } else {
    renderQuestion();
  }
}

function renderQuestion() {
  const quiz = currentQuiz;
  if(currentQuizIdx >= quiz.questions.length) {
    showQuizResult();
    return;
  }
  answered = false;
  const q = quiz.questions[currentQuizIdx];
  const letters = ['A','B','C','D','E'];
  const quizArea = document.getElementById('quiz-area') || document.getElementById('aula-content');

  // Update progress text
  const pt = document.querySelector('.quiz-progress-text');
  if(pt) pt.textContent = `${currentQuizIdx} / ${quiz.questions.length} questões`;

  quizArea.innerHTML = `
    <div class="question-card">
      <div class="question-text">${q.q}</div>
      <div class="options-list" id="options-list">
        ${q.opts.map((opt, i) => `
          <button class="option-btn" onclick="selectOption(${i})" id="opt-${i}">
            <span class="option-letter">${letters[i]}</span>${opt}
          </button>
        `).join('')}
      </div>
      <div class="feedback-box" id="feedback-box"></div>
      <button class="next-q-btn" id="next-btn" onclick="nextQuestion()">
        ${currentQuizIdx + 1 < quiz.questions.length ? 'Próxima questão →' : 'Ver resultado 🎯'}
      </button>
    </div>
  `;
}

function selectOption(idx) {
  if(answered) return;
  answered = true;
  const q = currentQuiz.questions[currentQuizIdx];
  const correct = q.correct;
  const feedback = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');
  const opts = document.querySelectorAll('.option-btn');

  opts[correct].classList.add('correct');
  opts.forEach(b => b.disabled = true);

  if(idx === correct) {
    quizCorrect++;
    state.quizCorrect++;
    feedback.className = 'feedback-box correct show';
    feedback.innerHTML = '✅ Correto! ' + q.explanation;
    addXP(20);
    spawnStars();
  } else {
    opts[idx].classList.add('wrong');
    feedback.className = 'feedback-box wrong show';
    feedback.innerHTML = `❌ Ops! A resposta certa era a opção ${['A','B','C','D'][correct]}. ${q.explanation}`;
    addXP(5);
  }

  state.quizDone++;
  nextBtn.classList.add('show');
  updateStats();
}

function nextQuestion() {
  currentQuizIdx++;
  renderQuestion();
}

function showQuizResult() {
  const quiz = currentQuiz;
  const total = quiz.questions.length;
  const pct = Math.round((quizCorrect/total)*100);
  let emoji, title, insight;

  if(pct >= 80) {
    emoji = '🏆'; title = 'Mandou muito bem!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Excelente domínio do conteúdo! Avance para o próximo tópico.`;
  } else if(pct >= 50) {
    emoji = '💪'; title = 'Quase lá!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Revise os conceitos das questões que errou e tente novamente.`;
  } else {
    emoji = '📖'; title = 'Continue estudando!';
    insight = `Você acertou <strong>${quizCorrect} de ${total}</strong>. Assista à videoaula novamente antes de tentar o quiz. Você consegue!`;
  }

  document.getElementById('aula-content').innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${emoji}</div>
      <div class="result-title">${title}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-sub">${quizCorrect} de ${total} acertos</div>
      <div class="result-stats-row">
        <div class="rstat">
          <div class="rstat-val" style="color:var(--green)">${quizCorrect}</div>
          <div class="rstat-lbl">Acertos</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--red)">${total-quizCorrect}</div>
          <div class="rstat-lbl">Erros</div>
        </div>
        <div class="rstat">
          <div class="rstat-val" style="color:var(--gold)">${quizCorrect*20+5*(total-quizCorrect)}</div>
          <div class="rstat-lbl">XP ganho</div>
        </div>
      </div>
      <div class="result-insight">💡 <strong>Insight:</strong> ${insight}</div>
      <div class="result-btns">
        <button class="btn-primary" onclick="retryQuiz()">🔄 Tentar novamente</button>
        <button class="btn-secondary" onclick="closeAula()">← Voltar à lista</button>
      </div>
    </div>
  `;
  if(pct >= 80) {
    setTimeout(() => showAchievement('🎓', 'Quiz Concluído!'), 500);
  }
}

function retryQuiz() {
  currentQuizIdx = 0;
  quizCorrect = 0;
  renderAulaContent();
}

function closeAula() {
  document.getElementById('aula-view').classList.remove('open');
  pararCronometro();
}

