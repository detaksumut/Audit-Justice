const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getHwid: () => ipcRenderer.invoke('get-hwid'),
  verifyLicense: (key) => ipcRenderer.invoke('verify-license', key)
});
