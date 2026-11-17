// =============================================================
// js/modules/auth.js
// Login, Cadastro e sessão (localStorage)
// VoaAM · Vestibulares do Amazonas
// =============================================================

var authVestsSelecionados = [];

function authMostrarTela(tela) {
  document.querySelectorAll('.auth-screen').forEach(function(s) {
    s.classList.remove('auth-active');
  });
  document.getElementById('auth-' + tela).classList.add('auth-active');
  document.getElementById('auth-wrapper').scrollTop = 0;
}

function authTogglePwd(id, btn) {
  var inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

function authToggleVest(el, vest) {
  el.classList.toggle('vest-selected');
  var idx = authVestsSelecionados.indexOf(vest);
  if (idx > -1) authVestsSelecionados.splice(idx, 1);
  else authVestsSelecionados.push(vest);
}

function authEntrar() {
  var email = document.getElementById('login-email').value.trim().toLowerCase();
  var senha = document.getElementById('login-senha').value;
  var err   = document.getElementById('auth-login-error');
  if (!email || !senha) { err.style.display = 'block'; return; }
  var contas = JSON.parse(localStorage.getItem('voaam_contas') || '[]');
  var conta  = contas.find(function(c) { return String(c.email || '').toLowerCase() === email && c.senha === senha; });
  if (!conta) { err.style.display = 'block'; return; }
  err.style.display = 'none';
  authEntrarComPerfil(Object.assign({}, conta.perfil, { email: conta.email }));
}

function authCadastrar() {
  var nome  = document.getElementById('cad-nome').value.trim();
  var email = document.getElementById('cad-email').value.trim().toLowerCase();
  var senha = document.getElementById('cad-senha').value;
  var serie = parseInt(document.getElementById('cad-serie').value) || 0;
  var err   = document.getElementById('auth-cad-error');
  var emailValido = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!nome || !email || !emailValido || senha.length < 6 || !serie) {
    err.textContent   = !emailValido && email ? 'E-mail inválido.' : 'Preencha todos os campos. Senha mínima de 6 caracteres.';
    err.style.display = 'block';
    return;
  }
  var contas     = JSON.parse(localStorage.getItem('voaam_contas') || '[]');
  if (contas.find(function(c) { return String(c.email || '').toLowerCase() === email; })) {
    err.textContent   = 'Este e-mail já está cadastrado.';
    err.style.display = 'block';
    return;
  }
  err.style.display = 'none';
  var vests      = authVestsSelecionados.length ? authVestsSelecionados : ['SIS'];
  var novoPerfil = { nome: nome, email: email, serie: serie, vests: vests, dific: 'ambos' };
  // AVISO DE SEGURANÇA: senhas armazenadas em texto puro no localStorage.
  // Em produção, use autenticação via backend com hashing (bcrypt) e JWT.
  contas.push({ email: email, senha: senha, perfil: novoPerfil });
  localStorage.setItem('voaam_contas', JSON.stringify(contas));
  authEntrarComPerfil(novoPerfil);
}

function authGoogle() {
  // Não simula uma autenticação Google: OAuth ainda precisa ser configurado no backend.
  var err = document.getElementById('auth-login-error');
  if (err) { err.textContent = 'O acesso com Google ainda não está configurado. Entre com seu e-mail e senha.'; err.style.display = 'block'; }
}

function authEntrarComPerfil(p) {
  localStorage.setItem('voaam_perfil', JSON.stringify(p));
  document.getElementById('auth-wrapper').style.display = 'none';
  location.reload();
}

function authLogout() {
  // Encerra somente a sessão atual. A conta e o progresso permanecem neste dispositivo.
  localStorage.removeItem('voaam_perfil');
  location.reload();
}

// ─── Inicialização: exibe auth se não logado ───
(function authInit() {
  var p = localStorage.getItem('voaam_perfil');
  if (!p) {
    var aw = document.getElementById('auth-wrapper');
    if (aw) aw.style.display = window.innerWidth >= 768 ? 'flex' : 'block';
  }
})();
