# Backend - Estrutura Futura

Esta pasta contém a estrutura preparada para o backend da aplicação monolítica.

## Estrutura Planejada

```
backend/
├── api/                      # Endpoints da API
│   ├── agreementsAPI.js     # CRUD de acordos/serviços
│   ├── employeesAPI.js      # CRUD de colaboradores
│   └── productionAPI.js     # CRUD de produção
├── controllers/             # Controladores (lógica de negócio)
├── models/                  # Modelos de dados
├── routes/                  # Definição de rotas
├── middleware/              # Middlewares (auth, validation, etc)
├── config/                  # Configurações da aplicação
└── server.js               # Servidor principal
```

## Tecnologias Sugeridas

- **Node.js + Express** - Framework backend
- **PostgreSQL ou MongoDB** - Banco de dados
- **Prisma ou Sequelize** - ORM
- **JWT** - Autenticação
- **Joi ou Yup** - Validação de dados

## Próximos Passos

1. Configurar servidor Express
2. Definir modelos de dados (schema do banco)
3. Implementar rotas e controladores
4. Adicionar autenticação e autorização
5. Integrar com o frontend (substituir localStorage por API calls)
6. Implementar testes unitários e de integração

## Migração do LocalStorage para API

Atualmente a aplicação usa `localStorage` para persistência. Quando o backend estiver pronto:

1. Substitua as importações de `storageService` por chamadas às APIs
2. Adicione tratamento de erros e loading states
3. Implemente refresh tokens e gerenciamento de sessão
4. Adicione validação server-side para todos os inputs
