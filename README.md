<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description


# Api Clients

Api Clients é um projeto simples de cadastro de clientes com o objetivo de aprender e explorar o uso do NestJS. Para gerenciar o banco de dados, utilizei o Prisma como ORM, facilitando o acesso e manipulação dos dados de forma eficiente, e escolhi o PostgreSQL como banco de dados devido à sua robustez e confiabilidade. O NestJS foi a escolha como framework por sua estrutura modular e organizada, além de seu suporte ao TypeScript, o que contribui para um desenvolvimento mais seguro e escalável.

Este projeto foi criado para substituir um backend antigo que não estava atendendo às minhas necessidades e expectativas. Busquei melhorar a estrutura e a eficiência utilizando o NestJS como base do desenvolvimento, uma vez que ele oferece uma arquitetura organizada e escalável, ideal para criar APIs robustas. A motivação principal foi aprimorar o backend de forma mais moderna e eficaz, explorando a modularidade do NestJS e a segurança proporcionada pelo TypeScript. Assim, o projeto também me permitiu aprofundar o conhecimento dessas tecnologias e melhorar o desempenho da aplicação.


## Tecnologias

  - Node.js
  - TypeScript
  - Nest
  - Prisma
  - Postgres
## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:JhonatasAnicezio/api_clients.git
```

Entre no diretório do projeto

```bash
  cd api_clients
```

Instale as dependências

```bash
  npm install
```

Realize a construção do projeto

```bash
  npm run build
```

Inicie o servidor

```bash
  npm run start
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET`

Lembrando que você precisa de um banco Postgress para rodar a api

`DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"`

Substitua os placeholders escritos em letras maiúsculas pelas credenciais do seu banco de dados. Observe que, se você não tiver certeza do que fornecer para o SCHEMAplaceholder, é mais provável que seja o valor padrão public:


## Documentação da API

#### Retorna os dados do usuário de acordo com o token

```bash
  GET /clients/me

  header: {
    "authorization": "token",
  }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `authorization`      | `string` | **Obrigatório**. O token gerado pelo login ou register |

#### Retorna um token referente ao usuário do login

```bash
  POST /authentication

  body: {
    "email": "user@user.com",
    "password": "secret_user"
  }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  `email`      | `string` | **Obrigatório**. O email do seu usuário |
|  `password`      | `string` | **Obrigatório**. A senha do seu usuário |

#### Realiza o cadastro de um novo usuário e em seguida retorna um token refente ao usuário do login

```bash
  POST /clients

  body: {
    "email": "venenozo@gmail.com",
    "password": "mod100%feliz",
    "name": "Kageyama Mob",
    "role": "user"
  }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  `email`      | `string` | **Obrigatório**. O email do seu usuário |
|  `password`      | `string` | **Obrigatório**. A senha do seu usuário |
|  `name`      | `string` | **Obrigatório**. O nome do seu usuário |
|  `role`      | `string` | **Obrigatório**. A role do seu usuário |



## Rotas restritas a usuarios que sejam admin

Nessas rotas é obrigatrio a realização do login por parte de um administrador


#### Retorna todos os usuarios

```bash
  GET /clients
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |


#### Remove o um usuário de acordo com o seu id

```bash
  DELETE /clients/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  `id`      | `string` | **Obrigatório**. ID do usuário que deseja apagar |

#### Atualiza a role de um usuário de acordo com seu id

```bash
  PUT /clients/${id}

  body: {
    "role": "admin"
  }
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  `id`      | `string` | **Obrigatório**. ID do usuário que deseja atualizar |
|  `body`      | `string` | **Obrigatório**. A nova role do usuário |





## Autor

- Portifolio - [jhonatas-anicezio](https://jhonatas-anicezio.vercel.app/)
- GitHub - [github/JhonatasAnicezio](https://github.com/JhonatasAnicezio)
- Linkedin - [@jhonatasanicezio](https://www.linkedin.com/in/jhonatas-anicezio/)

## License

Api Client is [MIT licensed](LICENSE).
