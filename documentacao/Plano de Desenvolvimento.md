# BIBLIOTECA IC - PLANO DE DESENVOLVIMENTO

## Sprint 1 (01/Fev - 14/Fev) - Início de Projeto
-  Confirmar os aplicativos, backend e frontend.
-  Desenvolvedor módulo de usuários
-  Desenvolver login, autenticação e autorização
-  Desenvolver lógica de admin
-  Desenvolver alteração de senha

## Sprint 2 (15/Fev - 28/Fev) Módulo de Livros
-  Desenvolver CRUD de livros, com nome do livro, autor(es), editora, ano e categorias.
-  Desenvolver busca de livros, com todos os parâmetros.
- Desenvolver lógica de categorias: Ao adicionar um livro, pode-se criar uma categoria ou selecionar existentes. 
- Criar lógica de código de livros, que deve ser único. 
- Marcar um livro como **exemplar único** então este livro não poderá ser emprestado.

## Sprint 3 (01/Mar - 14/Mar) Módulo de Empréstimo
- Criar relacionamento entre alunos e livros
- Desenvolver lógica de empréstimos: apenas adms podem criar um empréstimo para um aluno, limite de 3 livros por aluno.
- Desenvolver lógica de renovação, por parte do aluno
- Desenvolver lógica de devolução, por parte do adm.
## Sprint 4 (15/Mar - 28/Mar) Módulo de Atraso
- Desenvolver lógica/listagem de atrasos
- Desenvolver lógica/listagem de extraviação
- Desenvolver disparo de e-mails para: dia anterior à devolução/renovação, dia da devolução/renovação, (enviar estas seguintes pro DIACOM e pro aluno) 5 dias de atraso, 20 dias de atraso, 90 dias de atraso.
- A partir do 120° dia, marcar livro como extraviado.
- Caso o aluno esteja com um livro atrasado, não deixar pegar emprestado outro.
## Sprint 5 (29/Mar - 12/Abr) Ajustes e correções e deploy
- Decidir e desenvolver questões relativas aos emails de recuperação de senha.
- Correções de bugs
- Ajustes necessários
- Deploy
## Sprint 6 - (13/Abr - 20/Abr) Correções e problemas não vistos antes, caso haja alguma necessidade.
