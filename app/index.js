const {ipcRenderer} = require('electron')
const {Log} = require('./js/logger');
const {Job} = require('./js/job');

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  Log.d("test", arg) // prints "pong"
  sendNotification();
})

var job = new Job(60);

function sendNotification() {
  tt.test();
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
  if (job.isStarted()) {
    job.reset()
  } else {
    job.startWork()
    job.started = true;
  }
}

function pause(event) {
  if (job.isStarted()) {
    job.pause();
  }
}

function stop(event) {
  if (job.isStarted()) {
    job.pause();
  }
}
