const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { machineIdSync } = require('node-machine-id');
const jwt = require('jsonwebtoken');
const { fork } = require('child_process');

// A highly secret key used to sign and verify licenses.
// In a real production app, this should be obfuscated or fetched from a secure server.
const LICENSE_SECRET = 'AuditJusticeSecret2026!@#';
const LICENSE_FILE_PATH = path.join(app.getPath('userData'), 'license.json');

let mainWindow;
let nextServerProcess;
let isDev = !app.isPackaged;

// Fetch Hardware ID
const hwid = machineIdSync(true);

function createLicenseWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'license', 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: "Aktivasi Audit Justice",
    autoHideMenuBar: true,
    resizable: false,
  });

  mainWindow.loadFile(path.join(__dirname, 'license', 'index.html'));
}

function startNextJsServer() {
  return new Promise((resolve) => {
    // Fork the server.js file
    nextServerProcess = fork(path.join(__dirname, 'server.js'), [], {
      env: {
        ...process.env,
        NODE_ENV: isDev ? 'development' : 'production',
        PORT: 3000
      }
    });

    nextServerProcess.on('message', (msg) => {
      if (msg === 'server-ready') {
        resolve();
      }
    });
  });
}

async function createMainWindow() {
  // Wait for Next.js to be ready
  await startNextJsServer();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: "Audit Justice - AI Assistant",
    autoHideMenuBar: true,
  });

  // Wait a little extra to ensure Next is fully responsive
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 1000);
}

function checkLicense() {
  // If we are in dev mode, maybe bypass license for easier development
  // but let's enforce it here to test it.
  
  if (!fs.existsSync(LICENSE_FILE_PATH)) {
    return false;
  }

  try {
    const rawData = fs.readFileSync(LICENSE_FILE_PATH, 'utf-8');
    const { key } = JSON.parse(rawData);

    // Verify JWT
    const decoded = jwt.verify(key, LICENSE_SECRET);
    
    // Check if HWID matches
    if (decoded.hwid === hwid) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

app.whenReady().then(() => {
  // Handle IPC calls from license window
  ipcMain.handle('get-hwid', () => hwid);
  
  ipcMain.handle('verify-license', (event, key) => {
    try {
      const decoded = jwt.verify(key, LICENSE_SECRET);
      if (decoded.hwid === hwid) {
        // Save valid key
        fs.writeFileSync(LICENSE_FILE_PATH, JSON.stringify({ key }));
        // Close license window and start main app
        mainWindow.close();
        createMainWindow();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  });

  if (checkLicense()) {
    createMainWindow();
  } else {
    createLicenseWindow();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (checkLicense()) createMainWindow();
      else createLicenseWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  // Kill next server if running
  if (nextServerProcess) {
    nextServerProcess.kill();
  }
});
