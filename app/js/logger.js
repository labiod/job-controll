const {ipcRenderer} = require('electron')

function Log() {
}

Log.d = function(tag, message) {
    ipcRenderer.send('log-d', tag + ":" + message)
}

Log.i = function(tag, message) {
    ipcRenderer.send('log-i', tag + ":" + message)
}

Log.e = function(tag, message) {
    ipcRenderer.send('log-e', tag + ":" + message)
}

exports.Log = Log;