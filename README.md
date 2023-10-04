# Node Streams Project

Este projeto é uma API desenvolvida em NodeJS utilizando o framework NestJS e TypeORM, que integra com o banco de dados PostgreSQL. Após rodar o projeto a documentação (Swagger) ficará disponível em localhost:3000/api.

## Endpoints Disponíveis

### GET /

- Descrição: Retorna uma mensagem "Hello World".
- Status: 200 OK.

### GET /produtos

- Descrição: Retorna uma lista de objetos do banco de dados.
- Parâmetros:
  - `row_count`: Quantidade de linhas a ser exibida (paginação).
  - `row_skip`: Quantidade de linhas a ser ignorada (paginação).
- Status: 200 OK ou 404 Not Found (caso não haja dados a serem exibidos).

### POST /produtos

- Descrição: Recebe um array de objetos e insere os dados no banco de dados.
- Requisitos:
  - Receberá acima de 100.000 linhas e inserirá no banco em chunks de 10.000. 
  - Validação dos campos antes da inserção no banco.
  - Em caso de erro de validação:
    - Não inserirá nenhum dado.
    - Informará ao usuário qual campo está errado e qual tipo de dado esperado.
- Status: 201 Created (em caso de inserção bem-sucedida) ou 400 Bad Request (em caso de erro de validação).

## Requisitos do Projeto

- Construção em NodeJS.
- Framework: NestJS.
- Banco de dados: PostgreSQL/MySQL/SQLite.
- Gerar logs contendo:
  - Data e hora de acionamento.
  - Quantidade de itens a serem inseridos (em rotas POST).
  - Solicitação do Usuário (em rotas GET).

## Desenvolvimento

### Desenvolvido com
- NodeJS
- NestJS
- TypeORM
- PostgreSQL
- Swagger

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[git](https://git-scm.com), [node.js](https://nodejs.org/en/) e [docker](https://www.docker.com/).
Você também vai precisar de um editor de código, recomendo o [VS Code](https://code.visualstudio.com/).

### Rodando o projeto:

```shell
# Clone este repositório (ou download )
$ git clone git@github.com:joao21dev/node-streams-project.git

# Acesse a pasta do projeto no terminal/cmd
$ cd node-streams-project

# Rode o banco de dados usando docker (porta 5432)
$ docker compose up

# Abrá uma nova janela do terminal no mesmo diretório e instale as dependências
$ npm install

# Inicie a api
$ npm run start:dev
```
