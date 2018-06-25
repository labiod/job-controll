const {app, BrowserWindow, Notification, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const { Task } = require('./scripts/task');

let win
let jobTask

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format( {
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  jobTask = new Task({
    onStart: function() {
      win.webContents.send("task", "onStart");
    },
    onStop: function() {
      win.webContents.send("task", "onStop");
    },
    onTick: function() {
      win.webContents.send("task", "onTick");
    },
    onPause: function() {
      win.webContents.send("task", "onPause");
    },
    onResume: function() {
      win.webContents.send("task", "onResume");
    },
  }, 1000);
}

app.on('ready', createWindow)

app.on('window-all-close', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', arg)
})  

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('log-d', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('log-i', (event, arg) => {
  console.info(arg)  // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('log-e', (event, arg) => {
  console.error(arg)  // prints "ping"
  event.returnValue = 'pong'
})

ipcMain.on('task', (event, arg) => {
  console.error(arg)  // prints "ping"
  event.returnValue = 'pong'
  if(jobTask[arg] != "undefined") {
    jobTask[arg]();
  }
})
