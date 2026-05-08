// js/modules/exercicios-assuntos.js
// ─── EXERCÍCIOS — FLUXO POR ASSUNTO → NÍVEL → QUESTÕES ───

// Catálogo de assuntos para exercícios
// Dificuldade dos assuntos: 1=Fácil(verde), 2=Médio(amarelo), 3=Difícil(vermelho)
// Definidas por nível de abstração e exigência nos vestibulares do AM
const EX_DIF_COR     = ['','rgba(34,197,94,0.13)','rgba(245,158,11,0.13)','rgba(239,68,68,0.12)'];
const EX_DIF_BORDA   = ['','rgba(34,197,94,0.35)','rgba(245,158,11,0.4)','rgba(239,68,68,0.35)'];
const EX_DIF_NUM     = ['','#22c55e','var(--amber)','var(--red)'];
const EX_DIF_LABEL   = ['','Fácil','Médio','Difícil'];
const EX_DIF_ICON    = ['','🟢','🟡','🔴'];

const exAssuntos = [
  // ── FÁCIL ──────────────────────────────────────────────────────────────────
  { id:'financ',    emoji:'💰', titulo:'Mat. Financeira',    sub:'Juros simples, compostos, porcentagem',
    dif:1,
    keywords:['juro','financ','porcentagem','desconto','prestação','montante','taxa'] },
  { id:'estat',     emoji:'📊', titulo:'Estatística',        sub:'Média, moda, mediana, desvio, gráficos',
    dif:1,
    keywords:['estatística','média','moda','mediana','desvio','variância','gráfico','frequência'] },
  { id:'funcoes',   emoji:'📈', titulo:'Funções',            sub:'Afim, quadrática, exponencial, logarítmica',
    dif:1,
    keywords:['função','afim','quadrática','exponencial','logarit','inversa','composta'] },
  // ── MÉDIO ──────────────────────────────────────────────────────────────────
  { id:'algebra',   emoji:'🔡', titulo:'Álgebra',            sub:'Equações, sistemas, matrizes, PA e PG',
    dif:2,
    keywords:['equação','sistema','matrize','determinante','pa','pg','progressão','produto notável','polinôm'] },
  { id:'geometria', emoji:'📐', titulo:'Geometria',          sub:'Plana, espacial e analítica',
    dif:2,
    keywords:['geometr','área','volume','perímetro','pitágoras','triângl','polígon','cilindro','cone','esfera','pirâmide'] },
  { id:'log',       emoji:'🔢', titulo:'Logaritmos & Exp.',  sub:'Propriedades, equações logarítmicas',
    dif:2,
    keywords:['logarit','exponencial','potência','base natural'] },
  // ── DIFÍCIL ────────────────────────────────────────────────────────────────
  { id:'trigon',    emoji:'📏', titulo:'Trigonometria',      sub:'Seno, cosseno, tangente, identidades',
    dif:3,
    keywords:['trigonometr','seno','cosseno','tangente','radianos','identidade trigon'] },
  { id:'prob',      emoji:'🎲', titulo:'Probabilidade',      sub:'Eventos, combinatória, análise combinatória',
    dif:3,
    keywords:['probabilidade','combinação','permutação','arranjo','fatorial','evento'] },
  { id:'comb',      emoji:'🧩', titulo:'Combinatória',       sub:'Princípio multiplicativo, combinações',
    dif:3,
    keywords:['combinatória','princípio multiplicativo','binômio de newton','combinação','arranjo','permutação'] },
  { id:'geoAnal',   emoji:'🔷', titulo:'Geo. Analítica',     sub:'Pontos, retas, cônicas, circunferências',
    dif:3,
    keywords:['analítica','ponto médio','distância','reta','cônica','parábola','elipse','hipérbole','circunferência'] },
];
// Garante ordem crescente de dificuldade (já definida acima, mas sort para segurança)
exAssuntos.sort((a,b) => a.dif - b.dif);

// Níveis: 1=Fácil, 2=Médio, 3=Difícil
// A dificuldade é mapeada de _dif (1-4) para o nível escolhido:
//   Fácil  → _dif 1
//   Médio  → _dif 2-3
//   Difícil → _dif 4 (ou 3-4 se houver poucas)

let exAssuntoAtual = null;
let exNivelAtual   = null;

function exMostrarAssuntos() {
  const grid = document.getElementById('ex-assuntos-grid');
  if (!grid) return;

  // Agrupa por dificuldade para inserir cabeçalhos de seção
  let html = '';
  let difAtual = 0;

  exAssuntos.forEach(a => {
    const n = bancoDB.filter(q => q.opcoes && q.opcoes.length > 0 &&
      a.keywords.some(k => (q.contexto||'').toLowerCase().includes(k) || (q.enunciado||'').toLowerCase().includes(k))
    ).length;

    const cor     = EX_DIF_COR[a.dif];
    const borda   = EX_DIF_BORDA[a.dif];
    const num     = EX_DIF_NUM[a.dif];
    const icon    = EX_DIF_ICON[a.dif];
    const label   = EX_DIF_LABEL[a.dif];

    // Cabeçalho de seção ao mudar de nível
    if (a.dif !== difAtual) {
      difAtual = a.dif;
      // Fechar grid anterior se não for o primeiro
      if (difAtual > 1) html += '</div>';
      html += `
        <div style="grid-column:1/-1;display:flex;align-items:center;gap:8px;margin-top:${difAtual>1?'10px':'0'};margin-bottom:4px">
          <span style="font-size:14px">${icon}</span>
          <span style="font-size:11px;font-weight:800;color:${num};text-transform:uppercase;letter-spacing:0.08em">${label}</span>
          <div style="flex:1;height:1px;background:${borda}"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;grid-column:1/-1">`;
    }

    html += `<button onclick="exSelecionarAssunto('${a.id}')" style="
      padding:14px 12px;border-radius:14px;border:1.5px solid ${borda};
      background:${cor};color:var(--text);font-family:var(--font);
      cursor:pointer;text-align:left;display:flex;flex-direction:column;gap:5px;transition:all 0.15s;
      position:relative;overflow:hidden">
      <div style="position:absolute;top:8px;right:8px;font-size:10px;font-weight:700;color:${num};
        background:rgba(0,0,0,0.18);padding:2px 6px;border-radius:5px">${icon} ${label}</div>
      <div style="font-size:22px">${a.emoji}</div>
      <div style="font-size:12px;font-weight:700;color:${num};line-height:1.2">${a.titulo}</div>
      <div style="font-size:10px;color:var(--text2);line-height:1.3">${a.sub}</div>
      <div style="font-size:10px;color:${num};margin-top:2px;font-weight:600">${n} questões</div>
    </button>`;
  });

  // Fechar último grupo
  if (difAtual > 0) html += '</div>';

  // O grid pai não precisa mais de grid-template-columns pois cada grupo tem o seu
  grid.style.display = 'block';
  grid.innerHTML = html;
}

function exSelecionarAssunto(id) {
  exAssuntoAtual = exAssuntos.find(a => a.id === id);
  if (!exAssuntoAtual) return;
  // Mostra painel de nível
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  const nivelPanel = document.getElementById('ex-nivel-panel');
  nivelPanel.style.display = 'block';
  // Header do assunto selecionado
  const header = document.getElementById('ex-nivel-header');
  if (header) header.innerHTML = `
    <div style="font-size:28px">${exAssuntoAtual.emoji}</div>
    <div>
      <div style="font-size:14px;font-weight:800;color:${exAssuntoAtual.corNum}">${exAssuntoAtual.titulo}</div>
      <div style="font-size:11px;color:var(--text2);margin-top:2px">${exAssuntoAtual.sub}</div>
    </div>`;
}

function exVoltarAssuntos() {
  exAssuntoAtual = null;
  exNivelAtual   = null;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-questoes-panel').style.display = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'block';
}

function exSelecionarNivel(nivel) {
  exNivelAtual = nivel;
  document.getElementById('ex-nivel-panel').style.display   = 'none';
  document.getElementById('ex-assuntos-panel').style.display = 'none';
  const questPanel = document.getElementById('ex-questoes-panel');
  questPanel.style.display = 'block';
  exRenderQuestoesFiltradas();
}

function exVoltarNivel() {
  exNivelAtual = null;
  document.getElementById('ex-questoes-panel').style.display  = 'none';
  document.getElementById('ex-assuntos-panel').style.display  = 'none';
  document.getElementById('ex-nivel-panel').style.display     = 'block';
}

function exAtualizarQuestoes() {
  exRenderQuestoesFiltradas();
  showXPToast('🔄 Lista atualizada!');
}

function exRenderQuestoesFiltradas() {
  const container = document.getElementById('ex-lista-10');
  const info      = document.getElementById('ex-lista-info');
  if (!container || !exAssuntoAtual) return;

  const a = exAssuntoAtual;
  // Filtra banco por keywords do assunto
  let pool = bancoDB.filter(q =>
    q.opcoes && q.opcoes.length > 0 &&
    a.keywords.some(k => (q.contexto||'').toLowerCase().includes(k) || (q.enunciado||'').toLowerCase().includes(k))
  );

  // Aplica função de dificuldade
  pool = pool.map(q => ({ ...q, _dif: getDificuldade(q) }));

  // Mapeia nível escolhido → faixas de _dif (1=fácil, 2=médio, 3=difícil, 4=avançado)
  let difMin, difMax;
  if (exNivelAtual === 1)      { difMin = 1; difMax = 1; }  // Fácil
  else if (exNivelAtual === 2) { difMin = 2; difMax = 2; }  // Médio
  else                          { difMin = 3; difMax = 4; }  // Difícil/Avançado

  let filtrado = pool.filter(q => q._dif >= difMin && q._dif <= difMax);
  // Fallback: se pouco, expande faixa
  if (filtrado.length < 3) filtrado = pool;

  filtrado = filtrado.sort(() => Math.random() - 0.5).slice(0, 10);
  filtrado.sort((a, b) => a._dif - b._dif);

  const nivelLabels = ['','Fácil','Médio','Difícil'];
  const nivelIcons  = ['','🟢','🟡','🔴'];
  if (info) info.textContent = `${filtrado.length} questões • ${a.titulo} • ${nivelIcons[exNivelAtual]} ${nivelLabels[exNivelAtual]}`;

  const difIcons     = ['','🟢','🟡','🟠','🔴'];
  const difLabels    = ['','Fácil','Médio','Difícil','Avançado'];
  const difColors    = ['','rgba(34,197,94,0.15)','rgba(245,158,11,0.15)','rgba(239,68,68,0.1)','rgba(139,92,246,0.15)'];
  const difTxtColors = ['','#22c55e','var(--amber)','var(--red)','var(--violet)'];

  if (!filtrado.length) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text2);font-size:14px">
      <div style="font-size:40px;margin-bottom:12px">🔍</div>
      <div>Nenhuma questão encontrada para este assunto e nível.<br>Tente outro nível ou assunto!</div>
    </div>`;
    return;
  }

  container.innerHTML = filtrado.map((q, i) => {
    const dif  = q._dif || 1;
    const tema = q.contexto ? q.contexto.split('—')[0].replace('Tema:','').trim() : a.titulo;
    return `<div class="ex-lista-item" onclick="abrirExercicio('${q.id}')">
      <div class="ex-dif-badge" style="background:${difColors[dif]};color:${difTxtColors[dif]}">${difIcons[dif]}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">
          <span style="font-size:10px;font-weight:700;color:${difTxtColors[dif]}">${difLabels[dif]}</span>
          <span style="font-size:10px;color:var(--text2);background:var(--surface2);padding:2px 6px;border-radius:4px">${q.vest}${q.etapa?' E'+q.etapa:''} ${q.ano||''}</span>
          <span style="font-size:10px;color:var(--text2)">${tema.slice(0,28)}</span>
        </div>
        <div style="font-size:13px;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${q.enunciado}</div>
      </div>
      <div style="color:var(--text2);font-size:18px;flex-shrink:0">›</div>
    </div>`;
  }).join('');
}

// Mantém compat com chamada antiga (pratAba chama renderListaEx)
function renderListaEx() { exMostrarAssuntos(); }
function atualizarListaEx() { exMostrarAssuntos(); }
function exVestFiltro() {} // stub para não quebrar

// ─── EXERCÍCIOS ESTILO DUOLINGO (mantido para o botão Exercícios do nav) ───
// (declarado em exercicios.js)
// (declarado em exercicios.js)
