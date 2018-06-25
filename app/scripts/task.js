const UNDEFINED = "undefined";

var Task = function(taskCallback, time) {
    var listener = taskCallback;
    this.time = time;
    let timer;
    let paused = false;
    let started = false;
    var callListener = function(methodName) {
        if (listener[methodName] != UNDEFINED) {
            listener[methodName]();
        }
    }

    
    this.start = function() {
        started = true;
        callListener("onStart");
        timer = setInterval(function() {
            if (!paused) {
              callListener("onTick");
            }
          }, time);
    }
    this.pause = function() {
        if (isStarted()) {
            paused = !paused;
            if (paused) {
                callListener("onPause");
            } else {
                callListener("onResume");
            }
        }
    }

    this.stop = function() {
        started = false;
        clearInterval(timer);
        callListener("onStop");
    }

    this.isStarted = function() {
        return started;
    };
}
exports.Task = Task;