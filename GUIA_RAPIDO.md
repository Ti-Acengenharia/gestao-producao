# Guia Rápido - Gestão de Obras

## 🚀 Início Rápido

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Navegando na Aplicação

### 1️⃣ Seleção de Obra e Mês
No topo da página, você pode:
- **Selecionar a obra** atual (Santa Lúcia Park, Grand View, Pérolas do Mar)
- **Escolher o mês** de referência para visualização
- Ver o **total do mês** em tempo real

### 2️⃣ Abas Principais

#### 📊 **Produção**
- Lançar nova produção diária
- Selecionar colaborador e serviço
- Informar quantidade realizada
- Visualizar histórico filtrado por obra/mês
- Gerar relatório em PDF

#### 👷 **Equipa**
- Cadastrar novos colaboradores
- Informar dados bancários (para pagamento)
- Visualizar equipe cadastrada
- Excluir colaboradores

#### ⚙️ **Acordos**
- Cadastrar novos serviços/acordos
- Definir preço e unidade de medida
- Visualizar acordos cadastrados
- Excluir acordos

## 💾 Persistência de Dados

Os dados são salvos automaticamente no **localStorage** do navegador:
- ✅ Não precisa de servidor
- ✅ Dados persistem mesmo fechando o navegador
- ⚠️ Dados ficam no navegador local (não sincronizam entre dispositivos)
- ⚠️ Limpar dados do navegador apaga tudo

### Backup Manual

Para fazer backup dos dados:
1. Abra o Console do navegador (F12)
2. Execute:
```javascript
// Exportar dados
const backup = {
  agreements: localStorage.getItem('agreements'),
  employees: localStorage.getItem('employees'),
  production: localStorage.getItem('production'),
};
console.log(JSON.stringify(backup));
// Copie e salve o resultado
```

Para restaurar:
```javascript
// Cole o objeto backup aqui
const backup = { ... };
localStorage.setItem('agreements', backup.agreements);
localStorage.setItem('employees', backup.employees);
localStorage.setItem('production', backup.production);
location.reload();
```

## 📄 Gerando Relatórios

1. Acesse a aba **Produção**
2. Selecione a **obra** e o **mês** desejados
3. Clique em **"Gerar Relatório / PDF"**
4. Na tela de relatório:
   - Clique em **"Imprimir / Salvar PDF"**
   - Escolha a impressora ou "Salvar como PDF"
   - Confirme

### Conteúdo do Relatório
- 📋 Detalhamento dos serviços (data, colaborador, serviço, quantidade, total)
- 💰 Resumo para pagamento (colaborador, CPF, dados bancários, valor a receber)
- ✍️ Espaços para assinaturas

## 🎨 Personalização

### Adicionar Nova Obra

Edite `src/constants/projects.js`:
```javascript
export const PROJECTS = [
  "Santa Lúcia Park",
  "Grand View",
  "Pérolas do Mar",
  "Sua Nova Obra", // Adicione aqui
];
```

### Modificar Cores do Tema

Edite `src/styles/theme.js`:
```javascript
export const theme = {
  colors: {
    primary: '#2563eb', // Azul - mude para sua cor
    success: '#10b981', // Verde
    // ...
  },
};
```

### Adicionar Novo Serviço Padrão

Edite `src/constants/defaultServices.js`:
```javascript
export const DEFAULT_SERVICES = [
  // ...serviços existentes
  { 
    name: "Novo Serviço", 
    unit: "m²", 
    price: 50.0 
  },
];
```

⚠️ **Nota**: Dados padrão só são carregados na primeira vez. Para recarregar, limpe o localStorage.

## 🔧 Desenvolvimento

### Estrutura de Arquivos

```
src/
├── components/      # Componentes reutilizáveis
├── pages/          # Páginas da aplicação
├── constants/      # Dados e configurações
├── hooks/          # Custom React hooks
├── services/       # Lógica de persistência
├── styles/         # Temas e estilos globais
├── utils/          # Funções auxiliares
└── backend/        # Estrutura preparada para API
```

### Adicionar Novo Componente

```javascript
// 1. Criar pasta em src/components/MeuComponente/
// 2. Criar MeuComponente.jsx
import React from 'react';
import * as S from './MeuComponente.styles';

const MeuComponente = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default MeuComponente;

// 3. Criar MeuComponente.styles.js
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.white};
`;
```

### Criar Nova Página

Siga o mesmo padrão das páginas existentes em `src/pages/`.

## 🐛 Solução de Problemas

### "Página em branco"
- Verifique o Console (F12) para erros
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se todas as dependências foram instaladas

### "Dados não salvam"
- Verifique se o localStorage está habilitado
- Não use modo anônimo/privado
- Verifique espaço disponível

### "Relatório não gera"
- Use Chrome/Edge para melhor compatibilidade
- Desabilite bloqueadores de pop-up
- Tente "Imprimir" ao invés de "Salvar PDF"

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `REFATORACAO.md`
2. Consulte o README principal
3. Verifique os comentários no código

## 🎯 Próximos Passos

Após familiarizar-se com a aplicação:
1. Configure o backend (veja `src/backend/README.md`)
2. Implemente autenticação
3. Migre localStorage para API REST
4. Adicione novas funcionalidades

---

**Boa produtividade! 🚀**
