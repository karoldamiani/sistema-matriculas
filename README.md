# Sistema de Matrículas

Front-end de um sistema de atendimento e matrículas universitárias.
Desafio da Atividade Acadêmica de desenvolvimento front-end.

## Funcionalidades
**Instituição**
- Cadastrar turma (disciplina, professor, dia e turno, vagas)
- Listar e excluir turmas
- Controle de alocação: um professor não pode ter duas turmas no mesmo horário

**Aluno**
- Visualizar turmas ofertadas
- Matricular-se (com controle de vagas e conflito de horário)
- Ver e cancelar suas matrículas

## Tecnologias
React 17 (via CDN), JSX/Babel, Bootstrap 5, json-server, Fetch API (async/await), Context API, Error Boundary.

## Como executar
1. Instale o [Node.js](https://nodejs.org).
2. Na pasta do projeto: `npm install`
3. Inicie a API: `npm run api` (porta 3001)
4. Abra o `index.html` com a extensão Live Server do VS Code (ou `npx serve`).

## Horários
O código do horário tem 2 dígitos: dia (2 = segunda ... 7 = sábado) + turno (1 = manhã, 2 = tarde, 3 = noite). Ex.: `21` = segunda de manhã.
