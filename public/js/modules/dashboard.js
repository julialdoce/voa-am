// Dashboard Voa AM: indicadores calculados apenas com dados reais já salvos.
function renderDashboard(){
  const put=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
  if(typeof state==='undefined')return;
  const done=Number(state.quizDone)||0, correct=Number(state.quizCorrect)||0;
  const pct=done?Math.round(correct/done*100):0;
  put('dash-xp',(Number(state.xp)||0).toLocaleString('pt-BR'));
  put('dash-questions',done.toLocaleString('pt-BR'));
  put('dash-accuracy',done?pct+'%':'—');
  put('dash-streak',Number(state.streak)||0);
  put('dash-accuracy-label',done?pct+'% de acerto':'Sem respostas registradas');
  const bar=document.getElementById('dash-accuracy-bar');if(bar)bar.style.width=pct+'%';
  const hello=document.getElementById('home-greeting');
  if(hello&&typeof perfil!=='undefined'&&perfil?.nome)hello.textContent='Olá, '+perfil.nome.trim().split(/\s+/)[0]+'!';
  const vest=document.getElementById('home-vest-cards');
  if(vest){
    const selected=typeof perfil!=='undefined'?(perfil?.vests||[]):[];
    const info={SIS:'UEA · Sistema de Ingresso Seriado',PSC:'UFAM · Processo Seletivo Contínuo',MACRO:'UEA · Vestibular tradicional',ENEM:'Exame Nacional do Ensino Médio'};
    vest.innerHTML=selected.length?selected.map(v=>'<article class="dash-vest-card"><b>'+v+'</b><span>'+(info[v]||'Vestibular selecionado')+'</span></article>').join(''):'<p class="dash-muted">Selecione seus vestibulares no perfil para personalizar seu painel.</p>';
  }
}
