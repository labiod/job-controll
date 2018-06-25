const {ipcMain} = require('electron')

class Connector {

    constructor(action) {
        this.renderContent = renderContent;
        var self = this; 
        ipcMain.on("action", (event, arg) => {
            if(self.receiver != "undefined" && self.receiver[arg] != "undefined") {
                self.receiver[arg]();
            }
        })
    }

    setReceiver(receiver) {
        this.receiver = receiver;
    }

    sendToMain(param) {
        ipcMain.send(this.action, param);
    }
}

exports.Connector = Connector;