const Pushy = require("pushy-electron");
const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, Notification } = require("electron");
const isDev = require("electron-is-dev");

const setupPushy = (window) => {
  Pushy.listen();
  Pushy.register({ appId: "62d750445f4e0b0e138a50ee" });
  Pushy.setNotificationListener((data) => {
    console.log(data);
    var notification = Notification({
      title: "Nueva Alarma",
      body: "Se lanzo una nueva alarma en " + data.city,
    });
    notification.show();
    notification.on("click", (evn, arg) => {
      console.log(data);
      window.webContents.send("notification", data);
    });
  });
  if (Pushy.isRegistered()) {
    Pushy.subscribe("news");
  }
  window.webContents.openDevTools({ mode: "detach" });
};
module.exports = { setupPushy };
