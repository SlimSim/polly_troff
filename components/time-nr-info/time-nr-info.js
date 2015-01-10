Polymer("time-nr-info", {
  time: 4,
  loopTimesLeft: 1,
  mode: 'pause',
  stopInterval: null,
  countDown: function(time){
    if(time) this.time = time;
    if(this.stopInterval) clearInterval(this.stopInterval);
    var thisInfo = this;
    this.stopInterval = setInterval(function() {
      if(thisInfo.mode == 'wait' ){ //audio.isPaused) {

        thisInfo.time -= 1;
        if(thisInfo.time <= 0 ){
          thisInfo.time = 0;
          clearInterval(thisInfo.stopInterval);
        }
      } else {
        clearInterval(thisInfo.stopInterval);
      }
    }, 1000);
  },
  loopTimesLeftChanged: function(){
    if(this.loopTimesLeft == 0)
      this.visualLoopTimesLeft = "∞";
    else
      this.visualLoopTimesLeft = this.loopTimesLeft;
  }
});


