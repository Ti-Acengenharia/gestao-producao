const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

// Função para localizar o caminho do servidor (com suporte a dev e produção)
function resolveServerPath() {
  const fs = require('fs');

  if (app.isPackaged) {
    const possiblePaths = [
      path.join(process.resourcesPath, 'app.asar.unpacked', 'server', 'server.js'),
      path.join(process.resourcesPath, 'server', 'server.js'),
      path.join(__dirname, '..', 'server', 'server.js'),
    ];

    console.log('🔍 Procurando servidor em produção...');
    console.log('📁 __dirname:', __dirname);
    console.log('📁 process.resourcesPath:', process.resourcesPath);
    console.log('📁 app.getAppPath():', app.getAppPath());

    for (const testPath of possiblePaths) {
      console.log(`   Testando: ${testPath}`);
      if (fs.existsSync(testPath)) {
        console.log('   ✅ Encontrado!');
        return testPath;
      } else {
        console.log('   ❌ Não encontrado');
      }
    }

    return null;
  }

  // Desenvolvimento
  return path.join(__dirname, '..', 'server', 'server.js');
}

// Em produção, iniciar o servidor no MESMO processo do Electron (sem spawn)
function startServerInline() {
  const { dialog } = require('electron');

  const serverPath = resolveServerPath();

  if (!serverPath) {
    console.error('❌ Servidor não encontrado em nenhum dos caminhos!');
    dialog.showErrorBox(
      'Erro ao iniciar servidor',
      'Não foi possível encontrar o servidor backend. Por favor, reinstale a aplicação.'
    );
    return false;
  }

  console.log('🚀 Iniciando servidor backend inline...');
  console.log('📂 Caminho do servidor:', serverPath);
  console.log('📦 App empacotado:', app.isPackaged);

  try {
    // Configura env para o código do backend
    process.env.USER_DATA_PATH = app.getPath('userData');
    process.env.NODE_ENV = 'production';

    console.log('📁 USER_DATA_PATH:', process.env.USER_DATA_PATH);

    // "require" do servidor inicia o Express no mesmo processo
    require(serverPath);

    console.log('✅ Servidor backend iniciado no processo principal.');
    return true;
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor inline:', error);
    dialog.showErrorBox(
      'Erro no servidor',
      `Falha ao iniciar o servidor backend:\n${error.message}`
    );
    return false;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, '..', 'public', 'icon.png'),
    title: 'Gestão de Obras',
    backgroundColor: '#1a1a2e',
  });

  // Configura CSP mais permissivo para desenvolvimento
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:* ws://localhost:*"]
      }
    });
  });

  // Em desenvolvimento, carrega o servidor Vite
  // Em produção, carrega os arquivos buildados
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  // Log quando a página terminar de carregar
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('✅ Página carregada!');
  });
  
  // Log de erros da página
  mainWindow.webContents.on('crashed', () => {
    console.error('❌ Página crashou!');
  });
}

// Aguarda o Electron estar pronto
app.whenReady().then(() => {
  console.log('🎯 Electron pronto!');
  console.log('📦 App empacotado:', app.isPackaged);
  console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
  
  // Inicia o servidor backend apenas em produção (app empacotado)
  // Em desenvolvimento, o servidor é iniciado pelo npm run server
  if (app.isPackaged) {
    console.log('🏭 Modo PRODUÇÃO: Iniciando servidor backend...');
    const serverStarted = startServerInline();
    
    if (serverStarted !== false) {
      // Aguarda 5 segundos para o servidor iniciar
      console.log('⏳ Aguardando servidor iniciar (5 segundos)...');
      setTimeout(() => {
        console.log('🪟 Criando janela...');
        createWindow();
      }, 5000);
    } else {
      console.error('❌ Falha ao iniciar servidor! App não será carregado.');
    }
  } else {
    console.log('🔧 Modo DESENVOLVIMENTO: Servidor deve estar rodando externamente');
    console.log('💡 Use: npm run electron:dev');
    
    // Em desenvolvimento, aguarda menos tempo (servidor já deve estar rodando)
    setTimeout(() => {
      createWindow();
    }, 1000);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Encerra o servidor quando a aplicação fechar (apenas em produção)
app.on('before-quit', () => {
  // Em modo inline não há processo separado para encerrar
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
});
