Polymer("time-nr-info", {
  time: 4,
  loopTimesLeft: 1,
  mode: 'pause',
  stopInterval: null,
  ready: function(){
    console.log("this.mode = " + this.mode)
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
/*
    var key = gCurrentSongPath + 'numpad';
    var numpad = this;
    chrome.storage.local.get(key, function(res){
      numpad.value = res[key] || 1;
    });
*/
  },
  countDown: function(time){
    if(time) this.time = time;
    if(this.stopInterval) clearInterval(this.stopInterval);
    var thisInfo = this;
    this.stopInterval = setInterval(function() {
      console.log("stopInterval time = " + thisInfo.time)
      console.log("mode = " + thisInfo.mode)
      if(thisInfo.mode == 'wait' ){ //audio.isPaused) {

        thisInfo.time -= 1;
        if(thisInfo.time <= 0 ){
          thisInfo.time = 0;
          clearInterval(thisInfo.stopInterval);
        }
      } else {
        clearInterval(thisInfo.stopInterval);
        thisInfo.time = 0;
      }
    }, 1000);



  }
});


