var Job = function(baseTime) {
    var started = false;
    var paused = false;
    var timer = null;
    var mBaseTime = baseTime;
    var currentMinute = mBaseTime;
    var currentSecond = 0;
    var stopWork = function() {
      clearInterval(timer);
      document.getElementById("notify_button").click();
      started = false;
      ipcRenderer.send('asynchronous-message', 'works-over')
    }
    this.startWork = function() {
      currentMinute = mBaseTime;
      currentSecond = 0;
      document.getElementById('minute_block').innerHTML = getCorrectTime(currentMinute);
      document.getElementById('second_block').innerHTML = getCorrectTime(currentSecond);
      timer = setInterval(function() {
        if (!paused) {
          currentSecond--;
          if (currentSecond < 0 && currentMinute > 0) {
            currentMinute--;
            currentSecond = 59;
          }
          document.getElementById('minute_block').innerHTML = getCorrectTime(currentMinute);
          document.getElementById('second_block').innerHTML = getCorrectTime(currentSecond);
          if (currentMinute == 0 && currentSecond == 0) {
            stopWork();
          }
        }
      }, 1000);
      started = true;
    };
    this.pause = function() {
      Log.d("test", "paused");
        paused = !paused;
    }
    this.isStarted = function() {
      return started;
    };
    this.reset = function() {
      clearInterval(timer);
      startWork();
    }
  };

exports.Job = Job;