/**
 * @param {int} baseTime 
 * @param {Connector} connector 
 */
var Job = function(baseTime) {
    var mBaseTime = baseTime;
    var currentMinute = mBaseTime;
    var currentSecond = 0;
    this.onStop = function() {
      document.getElementById("notify_button").click();
      ipcRenderer.send('asynchronous-message', 'works-over')
    }
    this.onStart = function() {
      currentMinute = mBaseTime;
      currentSecond = 0;
      document.getElementById('minute_block').innerHTML = getCorrectTime(currentMinute);
      document.getElementById('second_block').innerHTML = getCorrectTime(currentSecond);
    };
    this.onTick = function() {
      if (!paused) {
          currentSecond--;
          if (currentSecond < 0 && currentMinute > 0) {
            currentMinute--;
            currentSecond = 59;
          }
          document.getElementById('minute_block').innerHTML = getCorrectTime(currentMinute);
          document.getElementById('second_block').innerHTML = getCorrectTime(currentSecond);
          if (currentMinute == 0 && currentSecond == 0) {
            connector.sendAction("stop");
          }
      }
    }
    this.onPause = function() {
      Log.d("test", "paused");
    }
    this.onResume = function() {
      
    }
  };

exports.Job = Job;