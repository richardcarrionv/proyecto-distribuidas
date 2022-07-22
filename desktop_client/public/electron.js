const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const { setupPushy } = require("./pushy");
const { autoUpdater } = require("electron-updater");

let window;

//Object.defineProperty(app, "isPackaged", {
  //get() {
    //return true;
  //},
//});

//autoUpdater.setFeedURL({ 
  //owner: "noesrichard", 
  //repo: "proyecto-distribuidas",
  //provider: "github",
  //updaterCacheDirName: "onealarm-updater"
//})

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  window.removeMenu();

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  window.loadURL(url);

  window.webContents.openDevTools({ mode: "detach" });

  setupPushy(window);

  window.once("ready-to-show", () => {
    console.log("Buscando auctua");
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.on("update-available", () => {
  window.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  window.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  console.log("reiniciar")
  autoUpdater.quitAndInstall();
});
