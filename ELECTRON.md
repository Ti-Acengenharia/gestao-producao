# Gestão de Obras - Aplicação Desktop (Electron)

## 📱 Sobre

Esta é a versão Desktop da aplicação Gestão de Obras, construída com Electron, React e Vite.

## 🚀 Instalação

Primeiro, instale as dependências necessárias:

```bash
npm install
```

## 🛠️ Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento:

```bash
npm run electron:dev
```

Este comando irá:
1. Iniciar o servidor Vite na porta 5173
2. Aguardar o servidor estar pronto
3. Iniciar o Electron em modo desenvolvimento
4. Iniciar automaticamente o servidor backend

## 📦 Build

### Build para Windows

```bash
npm run electron:build:win
```

### Build para macOS

```bash
npm run electron:build:mac
```

### Build para Linux

```bash
npm run electron:build:linux
```

### Build para todas as plataformas

```bash
npm run electron:build
```

Os arquivos de instalação serão gerados na pasta `release/`.

## 📁 Estrutura do Projeto

```
.
├── electron/           # Arquivos do Electron
│   ├── main.js        # Processo principal do Electron
│   └── preload.js     # Script de preload (segurança)
├── server/            # Backend Node.js/Express
├── src/               # Frontend React
├── dist/              # Build do frontend (gerado)
├── release/           # Instaladores gerados (gerado)
└── build/             # Ícones da aplicação
```

## 🎨 Ícones

Para personalizar os ícones da aplicação, adicione os seguintes arquivos na pasta `build/`:

- **Windows**: `icon.ico` (256x256 ou maior)
- **macOS**: `icon.icns` (512x512 ou maior)
- **Linux**: `icon.png` (512x512 ou maior)

## 🔧 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia apenas o servidor Vite |
| `npm run electron` | Inicia apenas o Electron |
| `npm run electron:dev` | Desenvolvimento completo (Vite + Electron) |
| `npm run build` | Build do frontend |
| `npm run electron:build` | Build completo da aplicação Desktop |
| `npm run server` | Inicia apenas o servidor backend |

## 📝 Notas Importantes

1. **Backend Integrado**: O servidor backend é iniciado automaticamente pelo Electron
2. **Porta**: O backend roda na porta 3000 e o Vite (dev) na porta 5173
3. **Segurança**: Context isolation está ativado por padrão
4. **DevTools**: Abre automaticamente em modo desenvolvimento

## 🐛 Solução de Problemas

### Erro ao instalar dependências no Windows

Se você encontrar erro de política de execução do PowerShell, execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ou use o CMD ao invés do PowerShell:

```cmd
npm install
```

### Porta já em uso

Se a porta 5173 ou 3000 já estiver em uso, altere-as em:
- Frontend: `vite.config.js`
- Backend: `server/server.js`

### Aplicação não abre

Verifique se todas as dependências foram instaladas:

```bash
npm install
```

## 📄 Licença

ISC
