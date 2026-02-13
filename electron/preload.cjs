const { contextBridge } = require('electron');

// Expõe APIs seguras para o renderer process
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  isElectron: true,
});

// Log para confirmar que o preload foi carregado
console.log('Preload script carregado com sucesso');
