# Projeto de API em Node.js com Express, JWT e PostgreSQL

Este projeto é uma API construída em Node.js usando Express, JWT para autenticação e PostgreSQL para armazenamento de dados.

## Funcionalidades

- Registro de usuário
- Autenticação de usuário
- Logout de usuário
- Atualização de dados do usuário
- CRUD de clientes no CRM (filtrado por usuário)
- Rotas protegidas por autenticação

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM para PostgreSQL)
- JWT (JSON Web Tokens)
- Bcrypt (para hash de senhas)
- Dotenv (para gerenciar variáveis de ambiente)

## Estrutura do Projeto

project-root
│
├── controllers
│ ├── userController.js
│ └── crmController.js
│
├── middleware
│ └── authMiddleware.js
│
├── models
│ ├── User.js
│ └── Crm.js
│
├── routes
│ └── userRoutes.js
│
├── .env
├── server.js
└── package.json
