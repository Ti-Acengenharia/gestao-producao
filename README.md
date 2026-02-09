# Gestão de Obras - Sistema de Controle de Produção

Sistema completo para gerenciamento de obras, controle de produção, colaboradores e geração de relatórios.

## 📋 Funcionalidades

- ✅ Gerenciamento de múltiplas obras
- ✅ Controle de acordos/serviços
- ✅ Gestão de colaboradores com dados bancários
- ✅ Lançamento de produção diária
- ✅ Relatórios mensais para fechamento
- ✅ Geração de PDF para impressão
- ✅ Filtros por obra e competência
- ✅ Persistência local de dados

## 🏗️ Estrutura do Projeto

```
src/
├── backend/              # Estrutura preparada para API futura
│   ├── api/             # Endpoints planejados
│   └── README.md        # Documentação do backend
├── components/          # Componentes reutilizáveis
│   ├── Button/         # Botão com variantes
│   ├── Card/           # Card container
│   ├── Form/           # Elementos de formulário
│   ├── Loader/         # Loading spinner
│   ├── Navbar/         # Barra de navegação
│   └── TabNavigation/  # Navegação por tabs
├── constants/           # Constantes da aplicação
│   ├── defaultEmployees.js
│   ├── defaultServices.js
│   └── projects.js
├── hooks/               # Custom hooks
│   └── useDataManagement.js
├── pages/               # Páginas da aplicação
│   ├── AgreementsPage/
│   ├── ProductionPage/
│   ├── ReportPage/
│   └── TeamPage/
├── services/            # Serviços (storage, API)
│   └── storageService.js
├── styles/              # Estilos globais e tema
│   ├── GlobalStyles.js
│   └── theme.js
├── utils/               # Funções utilitárias
│   ├── formatters.js
│   └── uid.js
├── App.jsx             # Componente principal
├── App.styles.js       # Estilos do App
└── main.jsx            # Entry point
```

## 🚀 Tecnologias

- **React** - Biblioteca UI
- **Styled Components** - Estilização CSS-in-JS
- **Lucide React** - Ícones
- **Vite** - Build tool e dev server
- **LocalStorage** - Persistência local (temporário)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🎨 Styled Components

O projeto utiliza **styled-components** para toda a estilização:

- ✅ CSS-in-JS com suporte a temas
- ✅ Isolamento de estilos por componente
- ✅ Props dinâmicas para variações
- ✅ Media queries responsivas
- ✅ Estilos globais centralizados

### Estrutura de Estilos

Cada componente/página possui seu arquivo `.styles.js`:
- `Component.jsx` - Lógica do componente
- `Component.styles.js` - Estilos styled-components

## 🎯 Próximos Passos

### Backend (Aplicação Monolítica)

A estrutura está preparada em `src/backend/` para implementar:

1. **Servidor Express/Node.js**
   - Rotas RESTful para CRUD
   - Autenticação JWT
   - Validação de dados

2. **Banco de Dados**
   - PostgreSQL ou MongoDB
   - Models/Schemas definidos
   - Migrations

3. **Integração Frontend ↔ Backend**
   - Substituir localStorage por API calls
   - Implementar error handling
   - Loading states

### Melhorias Planejadas

- [ ] Autenticação de usuários
- [ ] Multi-tenancy (múltiplas empresas)
- [ ] Dashboard com gráficos
- [ ] Exportação Excel
- [ ] Notificações
- [ ] Histórico de alterações
- [ ] Backup automático

## 📄 Licença

Projeto privado - Todos os direitos reservados

---

**Desenvolvido com ❤️ usando React + Styled Components**
