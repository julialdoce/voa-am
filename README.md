# voa-am — Documentação da Arquitetura

Plataforma de estudos para os vestibulares do Amazonas (PSC, SIS, MACRO, ENEM).

---

## 📁 Estrutura do Projeto

```
voa-am/
├── README.md                          ← Documentação do projeto
│
└── public/                            ← Tudo que o servidor entrega ao browser
    ├── index.html                     ← Ponto de entrada único (Router)
    │
    ├── css/
    │   ├── style.css                  ← Tokens de design, reset, layout mobile
    │   ├── components.css             ← sim-card, ex-lista, badges reutilizáveis
    │   ├── auth.css                   ← Login e Cadastro
    │   └── responsive.css             ← Desktop (≥768px) e tablet
    │
    ├── pages/                         ← 1 tela = 1 arquivo HTML
    │   ├── auth.html                  ← Login + Cadastro (overlay)
    │   ├── home.html                  ← Início: progresso, vestibulares, streak
    │   ├── vestibulares.html          ← PSC, SIS, MACRO, ENEM (conteúdo + datas)
    │   ├── materia.html               ← Estudar: matéria, série e tópicos
    │   ├── praticar.html              ← Simulados + Exercícios (abas)
    │   └── perfil.html                ← Stats, ranking e configurações
    │
    ├── components/                    ← Partes reutilizadas em todas as telas
    │   ├── header.html                ← Logo, XP, botão de tema
    │   ├── navbar.html                ← Nav mobile / sidebar desktop
    │   ├── toasts.html                ← XP toast + popup de conquista
    │   ├── aula-view.html             ← Overlay: quiz + videoaula + cronômetro
    │   ├── exercicios-view.html       ← Overlay: exercícios estilo Duolingo
    │   └── bloqueado-view.html        ← Overlay: sem corações
    │
    └── js/
        ├── app.js                     ← Init final (executado por último)
        │
        ├── modules/                   ← Lógica por domínio/feature
        │   ├── state.js               ← Estado global, perfil, corações, timer
        │   ├── auth.js                ← Login, cadastro, sessão
        │   ├── materia.js             ← Tela Estudar
        │   ├── aula.js                ← Aula + quiz + resultado
        │   ├── simulado.js            ← Simulado cronometrado
        │   ├── praticar.js            ← Aba Praticar (simulados + exercícios lista)
        │   ├── exercicios.js          ← Exercícios estilo Duolingo
        │   ├── gamification.js        ← XP, streak, conquistas, updateStats
        │   ├── nav.js                 ← goTo(), renderPerfil(), toggleTheme()
        │   └── utils.js               ← getDificuldade, pós-processamento banco
        │
        └── data/                      ← Dados estáticos (conteúdo editorial)
            ├── topics.js              ← mathTopics, redTopics (por série)
            ├── quizzes.js             ← Aulas e quizzes por tópico
            ├── simulados.js           ← Catálogo de simulados por vestibular
            └── banco.js               ← Banco de questões reais (ENEM/PSC/SIS/MACRO)
```

---

## 🗺️ Páginas e Rotas

| Página           | Arquivo                        | Rota JS              |
|------------------|--------------------------------|----------------------|
| Início           | `public/pages/home.html`       | `goTo('home')`       |
| Vestibulares     | `public/pages/vestibulares.html` | `goTo('vestibulares')` |
| Estudar          | `public/pages/materia.html`    | `goTo('materia')`    |
| Praticar         | `public/pages/praticar.html`   | `goTo('praticar')`   |
| Perfil           | `public/pages/perfil.html`     | `goTo('perfil')`     |
| Login/Cadastro   | `public/pages/auth.html`       | automático (sem sessão) |

---

## ✏️ Guia de Edição Rápida

| Quero mudar…              | Arquivo                              |
|---------------------------|--------------------------------------|
| Visual de uma tela        | `public/pages/<tela>.html`           |
| Cores e fontes base       | `public/css/style.css`               |
| Layout desktop / sidebar  | `public/css/responsive.css`          |
| Tela de login/cadastro    | `public/pages/auth.html` + `public/css/auth.css` |
| Cards de simulado/badges  | `public/css/components.css`          |
| Tópicos de matemática     | `public/js/data/topics.js`           |
| Questões de quiz          | `public/js/data/quizzes.js`          |
| Catálogo de simulados     | `public/js/data/simulados.js`        |
| Banco de questões         | `public/js/data/banco.js`            |
| XP e conquistas           | `public/js/modules/gamification.js`  |
| Lógica de login           | `public/js/modules/auth.js`          |
| Navegação entre telas     | `public/js/modules/nav.js`           |

---

## ➕ Adicionar Nova Página

1. Crie `public/pages/nova.html` com:
   ```html
   <div class="screen" id="screen-nova">
     <!-- conteúdo da tela -->
   </div>
   ```

2. Adicione o slot no `public/index.html`:
   ```html
   <div id="slot-page-nova"></div>
   ```

3. Registre no `Router.fragments` dentro do `<script>` do `index.html`:
   ```js
   'slot-page-nova': 'pages/nova.html',
   ```

4. Adicione botão na navbar (`public/components/navbar.html`):
   ```html
   <button class="nav-btn" id="nav-nova" onclick="goTo('nova')">
     <div class="nav-icon">🆕</div>
     Nova
   </button>
   ```

---

## ⚠️ Para Rodar Localmente

O `index.html` usa `fetch()` para carregar fragmentos — precisa de um servidor HTTP.

```bash
# Python (sem instalar nada)
cd voa-am/public
python3 -m http.server 3000
# Acesse: http://localhost:3000

# Node.js
npx serve public/

# VSCode
# Instale "Live Server" → botão direito em public/index.html → Open with Live Server
```

---

## 💡 Sugestões de Melhoria Futura

| Prioridade | Melhoria |
|------------|----------|
| 🔴 Alta    | **ES Modules** — converter para `import/export` e `<script type="module">`, eliminando variáveis globais |
| 🔴 Alta    | **API REST** — mover `banco.js` (5.7k linhas) para Supabase/Firebase |
| 🟡 Média   | **Bundler (Vite)** — consolidar 15 scripts em um único bundle minificado para produção |
| 🟡 Média   | **PWA / Service Worker** — cache offline para estudantes com internet limitada |
| 🟢 Baixa   | **Testes (Vitest)** — cobrir `gamification.js` e `exercicios.js` com testes unitários |
