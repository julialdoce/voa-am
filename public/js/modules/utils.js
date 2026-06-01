// js/modules/utils.js
// Utilitários: getDificuldade e post-processamento do banco

// ─── BANCO: POST-PROCESSAMENTO ─────────────────────────────
// Adiciona campos 'materia' e 'serie' a cada questão do banco
bancoDB.forEach(q => {
  if (!q.materia) q.materia = 'Matemática'; // todo o banco atual é matemática
  if (!q.serie) {
    if (q.etapa === 1) q.serie = 1;
    else if (q.etapa === 2) q.serie = 2;
    else if (q.etapa === 3) q.serie = 3;
    else q.serie = 3; // ENEM/MACRO cobrem todo EM, tratamos como 3ª série
  }
});

// ─── DIFICULDADE DAS QUESTÕES ─────────────────────────────
function getDificuldade(q) {
  const ctx = (q.contexto || '').toLowerCase();
  // Nível 4 — avançado (SIS 3, conteúdo universitário)
  if (ctx.includes('transformada') || ctx.includes('integral') || ctx.includes('autovalor') ||
      ctx.includes('edo') || ctx.includes('laplace') || ctx.includes('série de taylor') ||
      (q.vest === 'SIS' && q.etapa >= 3)) return 4;
  // Nível 3 — difícil
  if (ctx.includes('cônica') || ctx.includes('combinação') || ctx.includes('permutação') ||
      ctx.includes('determinante') || ctx.includes('logarit') || ctx.includes('trigonometr') ||
      (q.vest === 'SIS' && q.etapa === 2) || (q.vest === 'PSC' && q.etapa === 3)) return 3;
  // Nível 2 — médio
  if (ctx.includes('probabilidade') || ctx.includes('exponencial') ||
      ctx.includes('geometr') || ctx.includes('matr') ||
      ctx.includes('quadrática') || ctx.includes('progressão') ||
      ctx.includes('estatística')) return 2;
  // Nível 1 — fácil
  return 1;
}


// ─── SANITIZAÇÃO XSS ──────────────────────────────────────────
// Escapa conteúdo HTML antes de injetar via innerHTML.
// Usar em contextos onde o conteúdo não é HTML intencional.
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
