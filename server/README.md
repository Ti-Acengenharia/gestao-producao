# Backend com SQLite - Gestão de Obras

Backend completo com Express.js e SQLite para o sistema de gestão de obras.

## 📁 Estrutura

```
server/
├── data/                    # Banco de dados SQLite
│   └── gestao-obras.db     # Arquivo do banco (criado automaticamente)
├── models/                  # Modelos de dados
│   ├── Agreement.js
│   ├── Employee.js
│   └── Production.js
├── controllers/             # Controladores (lógica de negócio)
│   ├── agreementsController.js
│   ├── employeesController.js
│   └── productionController.js
├── routes/                  # Rotas da API
│   ├── agreements.js
│   ├── employees.js
│   └── production.js
├── database.js             # Configuração do banco
├── server.js               # Servidor principal
└── .env                    # Variáveis de ambiente
```

## 🚀 Como Executar

### Iniciar o servidor

```bash
# Desenvolvimento
node server/server.js

# Ou adicionar script no package.json:
npm run server
```

### Testar a API

```bash
# Health check
curl http://localhost:3000/api/health

# Listar acordos
curl http://localhost:3000/api/agreements

# Listar colaboradores
curl http://localhost:3000/api/employees

# Listar produção
curl http://localhost:3000/api/production
```

## 📡 Endpoints da API

### Acordos/Serviços

- `GET    /api/agreements`      - Listar todos
- `GET    /api/agreements/:id`  - Buscar por ID
- `POST   /api/agreements`      - Criar novo
- `PUT    /api/agreements/:id`  - Atualizar
- `DELETE /api/agreements/:id`  - Deletar

### Colaboradores

- `GET    /api/employees`       - Listar todos
- `GET    /api/employees/:id`   - Buscar por ID
- `POST   /api/employees`       - Criar novo
- `PUT    /api/employees/:id`   - Atualizar
- `DELETE /api/employees/:id`   - Deletar

### Produção

- `GET    /api/production`              - Listar (com filtros ?month=2024-02&project=Santa)
- `GET    /api/production/summary`      - Resumo por colaborador
- `GET    /api/production/total`        - Total do período
- `GET    /api/production/:id`          - Buscar por ID
- `POST   /api/production`              - Criar novo lançamento
- `DELETE /api/production/:id`          - Deletar

## 📊 Schema do Banco de Dados

### Tabela: agreements
- id (TEXT, PK)
- name (TEXT)
- unit (TEXT)
- price (REAL)
- createdAt (INTEGER)

### Tabela: employees
- id (TEXT, PK)
- name (TEXT)
- role (TEXT)
- cpf (TEXT, nullable)
- agency (TEXT, nullable)
- operation (TEXT, nullable)
- account (TEXT, nullable)
- createdAt (INTEGER)

### Tabela: production
- id (TEXT, PK)
- serviceName (TEXT)
- unit (TEXT)
- unitPrice (REAL)
- employeeName (TEXT)
- employeeRole (TEXT)
- employeeId (TEXT, FK → employees)
- projectName (TEXT)
- quantity (REAL)
- total (REAL)
- date (TEXT)
- createdAt (INTEGER)

## 🔧 Tecnologias

- **Express.js** - Framework web
- **better-sqlite3** - SQLite nativo (rápido e síncrono)
- **CORS** - Permitir requisições do frontend
- **dotenv** - Variáveis de ambiente

## 🔐 Segurança

⚠️ **Para produção, adicionar:**
- Autenticação JWT
- Validação de dados (Joi/Yup)
- Rate limiting
- Helmet.js para headers de segurança
- Sanitização de inputs
- HTTPS

## 📝 Próximos Passos

1. **Migrar dados do localStorage:**
   - Importar dados existentes para o banco
   - Atualizar frontend para usar API ao invés de localStorage

2. **Adicionar autenticação:**
   - Sistema de login
   - JWT tokens
   - Controle de permissões

3. **Melhorias:**
   - Paginação nas listagens
   - Busca e filtros avançados
   - Backup automático do banco
   - Logs estruturados
   - Testes automatizados

## 🐛 Debug

```bash
# Ver logs do SQLite
# O database.js tem verbose: console.log ativado

# Acessar banco diretamente
sqlite3 server/data/gestao-obras.db

# Queries úteis:
.tables                          # Listar tabelas
.schema agreements               # Ver schema de uma tabela
SELECT * FROM production LIMIT 5;  # Ver dados
```

## 📦 Deploy

Para deploy em produção:

1. Build do frontend: `npm run build`
2. O servidor serve automaticamente os arquivos do `dist/`
3. Configurar variáveis de ambiente no servidor
4. Usar PM2 ou similar para manter servidor rodando

```bash
# Com PM2
pm2 start server/server.js --name gestao-obras
pm2 logs gestao-obras
pm2 restart gestao-obras
```
