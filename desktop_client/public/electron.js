// ./public/electron.js
const path = require("path");

const { app, BrowserWindow, Notification } = require("electron");
const isDev = require("electron-is-dev");

const Pushy = require("pushy-electron");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.removeMenu();

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

function pushySetup(){ 
  Pushy.listen();
  Pushy.register({ appId: "62d750445f4e0b0e138a50ee" })
    .then((deviceToken) => {
      console.log(deviceToken)
    })
    .catch((err) => {
      console.log(error)
    });
  Pushy.setNotificationListener((data) => {
    new Notification({title: data.message, body:'Nueva alarmaaaaaaaaa'}).show();
  });
  if (Pushy.isRegistered()) {
    Pushy.subscribe("news")
      .then(() => {
        console.log("subscrito")
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow).then(pushySetup);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
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
