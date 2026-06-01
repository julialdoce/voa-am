// =============================================================
// js/modules/banco-provas.js
// Banco de Provas — accordion de anos + links de PDF por vestibular
// Todas as funções são globais para funcionar com onclick no HTML
// =============================================================

// ─── ACCORDION DOS CARDS PRINCIPAIS (vest-full-card) ─────────
function toggleVest(id) {
  document.getElementById(id)?.classList.toggle('open');
}

// ─── ACCORDION DOS ANOS ──────────────────────────────────────
function bpAno(id) {
  document.getElementById(id)?.classList.toggle('open');
}

// ─── ABRIR PDF (verifica existência antes) ───────────────────
async function bpVerificar(event, href) {
  event.preventDefault();
  try {
    const res = await fetch(href, { method: 'HEAD' });
    if (res.ok) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      showXPToast('📭 Arquivo não disponível ainda');
    }
  } catch {
    // Falha de rede ou CORS — tenta abrir mesmo assim
    window.open(href, '_blank', 'noopener,noreferrer');
  }
  return false;
}

// ─── HELPERS DE RENDERIZAÇÃO ─────────────────────────────────
function _bpAnos() {
  const r = [];
  for (let y = new Date().getFullYear(); y >= 2016; y--) r.push(y);
  return r;
}

function _bpBtnProva(href) {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer"
    class="bp-dl-btn bp-dl-btn-prova"
    onclick="return bpVerificar(event,'${href}')">📄 Prova</a>`;
}

function _bpBtnGab(href) {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer"
    class="bp-dl-btn bp-dl-btn-gab"
    onclick="return bpVerificar(event,'${href}')">✅ Gabarito</a>`;
}

function _bpRow(nome, prova, gab) {
  return `<div class="bp-dl-row">
    <span class="bp-dl-nome">${nome}</span>
    <div class="bp-dl-btns">${_bpBtnProva(prova)}${_bpBtnGab(gab)}</div>
  </div>`;
}

function _bpEtiqueta(txt) {
  return `<div class="bp-etapa-titulo">${txt}</div>`;
}

function _bpBlocoAno(id, ano, conteudo) {
  return `<div class="bp-ano" id="${id}">
    <div class="bp-ano-header" onclick="bpAno('${id}')">
      <span class="bp-ano-titulo">${ano}</span>
      <span class="bp-ano-chevron">▾</span>
    </div>
    <div class="bp-ano-corpo">${conteudo}</div>
  </div>`;
}

// ─── RENDER PRINCIPAL ─────────────────────────────────────────
function initBancoProvas() {
  const anos = _bpAnos();

  // ── ENEM ──────────────────────────────────────────────────
  const elEnem = document.getElementById('bp-enem-anos');
  if (elEnem && !elEnem.dataset.rendered) {
    elEnem.innerHTML = anos.map(y =>
      _bpBlocoAno(`bpa-enem-${y}`, y,
        _bpRow('ENEM — Matemática e Ciências da Natureza',
          `assets/documents/ENEM/${y}/PROVA-ENEM-${y}.pdf`,
          `assets/documents/ENEM/${y}/GABARITO-ENEM-${y}.pdf`)
      )
    ).join('');
    elEnem.dataset.rendered = '1';
  }

  // ── PSC ──────────────────────────────────────────────────
  const elPsc = document.getElementById('bp-psc-anos');
  if (elPsc && !elPsc.dataset.rendered) {
    elPsc.innerHTML = anos.map(y =>
      _bpBlocoAno(`bpa-psc-${y}`, y,
        [1, 2, 3].map(e =>
          _bpEtiqueta(`${e}ª Etapa`) +
          _bpRow(`PSC ${e}ª Etapa ${y}`,
            `assets/documents/PSC/${y}/${e}-ETAPA/PROVA-PSC-${e}-ETAPA-${y}.pdf`,
            `assets/documents/PSC/${y}/${e}-ETAPA/GABARITO-PSC-${e}-ETAPA-${y}.pdf`)
        ).join('')
      )
    ).join('');
    elPsc.dataset.rendered = '1';
  }

  // ── MACRO ────────────────────────────────────────────────
  const elMacro = document.getElementById('bp-macro-anos');
  if (elMacro && !elMacro.dataset.rendered) {
    elMacro.innerHTML = anos.map(y =>
      _bpBlocoAno(`bpa-macro-${y}`, y,
        _bpEtiqueta('Conhecimentos Gerais') +
        _bpRow(`MACRO ${y} — Conhecimentos Gerais`,
          `assets/documents/MACRO/${y}/CONHECIMENTOS-GERAIS/PROVACG-MACRO-${y}.pdf`,
          `assets/documents/MACRO/${y}/CONHECIMENTOS-GERAIS/GABARITOCG-MACRO-${y}.pdf`) +
        _bpEtiqueta('Conhecimentos Específicos') +
        _bpRow(`MACRO ${y} — Conhecimentos Específicos`,
          `assets/documents/MACRO/${y}/CONHECIMENTOS-ESPECIFICOS/PROVACE-MACRO-${y}.pdf`,
          `assets/documents/MACRO/${y}/CONHECIMENTOS-ESPECIFICOS/GABARITOCE-MACRO-${y}.pdf`)
      )
    ).join('');
    elMacro.dataset.rendered = '1';
  }

  // ── SIS ──────────────────────────────────────────────────
  const elSis = document.getElementById('bp-sis-anos');
  if (elSis && !elSis.dataset.rendered) {
    elSis.innerHTML = anos.map(y =>
      _bpBlocoAno(`bpa-sis-${y}`, y,
        [1, 2, 3].map(e =>
          _bpEtiqueta(`${e}ª Etapa`) +
          _bpRow(`SIS ${e}ª Etapa ${y}`,
            `assets/documents/SIS/${y}/${e}-ETAPA/PROVA-SIS-${e}-ETAPA-${y}.pdf`,
            `assets/documents/SIS/${y}/${e}-ETAPA/GABARITO-SIS-${e}-ETAPA-${y}.pdf`)
        ).join('')
      )
    ).join('');
    elSis.dataset.rendered = '1';
  }
}
