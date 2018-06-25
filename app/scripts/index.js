
const {ipcRenderer} = require('electron')
const {Log} = require('./js/logger');
const {Job} = require('./scripts/job');
const { Connector } = require('./scripts/connector');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  Log.d("test", arg) // prints "pong"
  sendNotification();
})

ipcRenderer.on('task', (event, arg) => {
  Log.d("test", arg) // prints "pong"
  sendNotification();
})

var connector = new Connector("task");

window.onload = function() {
  Log.d("tag", "render onload");
  connector.setReceiver(new Job(60));
};

function sendNotification() {
  let myNotification = new Notification('Title', {
    body: 'First notification'
  })
}

function getCorrectTime(value) {
  if (value < 10) {
    return '0' + value;
  }
  return value;
}

function start(event) {
  Log.d("test", "start works");
  connector.sendToMain("start");
}

function pause(event) {
    connector.sendToMain("pause");
}

function stop(event) {
    connector.sendToMain("stop");
}
