# Integração do pacote original voaAM-main (Juliano)

## Objetivo
Preservar a aplicação atual (HTML/CSS/JS + backend Node/Express) e incorporar o conteúdo e as funcionalidades úteis do pacote original sem substituir a arquitetura de forma abrupta, sem perder os módulos já adicionados ao VOA AM e sem quebrar o deploy atual.

## Inventário confirmado no ZIP
- 345 entradas no arquivo compactado.
- 1.257 questões em `database/questoes_treino.json`, distribuídas entre SIS (372), PSC (366), ENEM (282), MACRO (225) e GERAL (12). O acervo inclui Matemática (1.248 questões), Biologia (3), História (3) e Português (3); 145 questões referenciam imagens.
- 900 entradas em `database/gabaritos_banco.json` e 187 em `database/gabaritos_legados.json`.
- 7 temas de redação em `database/temas_redacao.json`.
- 10 referências de provas oficiais em `database/provas_oficiais.json`.
- Catálogo de tópicos em `database/topicos_catalogo.json`.
- Esquema SQLite em `database/schema.sql`.
- Recursos adicionais de frontend: ranking, treino personalizado, conta, diálogos, nível, iluminação e ícones.
- Recursos de backend: autenticação e sessão, perfil, progresso, ranking, nível, treino/avaliação, redações persistentes, integração Google e fila de correção.
- 8 arquivos de testes automatizados no pacote.

## O que já existe na aplicação atual
A branch atual tem navegação e páginas próprias para dashboard, estudar, programação, praticar, redação, perfil e banco de provas. Já possui módulos de simulados, questões, quizzes, gamificação, redação e provas. O módulo de Programação foi adicionado nesta branch.

## Plano de adaptação

### A. Conteúdo estático — prioridade alta
1. Integrar as 1.257 questões sem duplicar questões já existentes.
2. Preservar gabaritos e explicações originais, validando o índice da alternativa correta.
3. Integrar as imagens referenciadas pelas questões e verificar cada caminho.
4. Incorporar os temas de redação e referências oficiais de provas no catálogo atual.
5. Integrar o catálogo de tópicos sem marcar conteúdo como concluído automaticamente.

### B. Funcionalidades de estudo — prioridade alta
1. Adaptar treino personalizado para a navegação e os componentes atuais.
2. Integrar ranking, nível e estatísticas sem inventar dados históricos.
3. Preservar progresso local existente e planejar migração de dados com identificadores compatíveis.
4. Aproveitar os diálogos e ícones acessíveis do pacote original, harmonizando com a identidade visual atual.

### C. Conta e serviços — etapa separada
O ZIP usa Flask + SQLite e sessões de servidor; o projeto atual usa Node/Express e deploy Vercel. Os endpoints Python não podem ser copiados diretamente para o backend atual. Cada fluxo precisa ser portado e testado no backend existente, incluindo autenticação segura, autorização, persistência, proteção de sessão, limites de upload e integração Google. Não armazenar senhas em texto puro nem criar endpoints que confiem no resultado enviado pelo navegador.

### D. Validação
- Conferir totais e IDs do banco antes/depois da integração.
- Testar questões com e sem imagem, gabaritos e explicações.
- Testar filtros por vestibular, ano, etapa, disciplina e assunto.
- Testar login, sessão, perfil, progresso, redação e ranking em ambiente de preview.
- Não mesclar a branch sem validação e aprovação explícita.

## Regra de preservação
Os arquivos e conteúdos do pacote original devem ser tratados como fonte. Ajustes de formato para compatibilidade são permitidos, mas enunciados, alternativas, gabaritos, explicações, temas e referências não devem ser reescritos ou substituídos silenciosamente. Duplicatas devem ser identificadas por ID e conteúdo antes de qualquer descarte.
