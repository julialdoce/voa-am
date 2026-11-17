# Módulo de Programação

Adicionado em branch separada para revisão antes de integrar à main.

- Duas trilhas: Lógica de Programação e Python.
- Onze módulos com objetivos implícitos no conteúdo, explicação, exemplo e duas questões cada.
- Correção imediata, feedback e XP por conclusão.
- Progresso salvo no navegador em localStorage, sem alterar o estado legado.

## Limitações
Esta primeira versão não executa código digitado pelo estudante e não sincroniza progresso entre dispositivos/contas. A execução de código exige serviço isolado no backend; não se deve executar código arbitrário diretamente no navegador ou servidor principal.

## Integração
A página é carregada pelo Router em public/index.html. A navegação inclui a nova tela. Arquivos de conteúdo, módulo e CSS ficam separados para facilitar evolução.