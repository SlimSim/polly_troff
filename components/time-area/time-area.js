Polymer("time-area", {
  maxTime: 42,
  currentTime: 0,
  dispMaxTime: "42",
  dispCurrentTime: "0:00",
  ready: function(){

  },
  maxTimeChanged: function(){
    this.dispMaxTime = this.timeToDisp(this.maxTime);
  },
  currentTimeChanged: function(){
    this.dispCurrentTime = this.timeToDisp(this.currentTime);
  },
  recall: function(){
  },
  timeToDisp: function(seconds){
    if(this.maxTime >= 3600){
      var min = Math.floor(seconds / 60 ) % 60;
      var sec = Math.floor(seconds % 60);
      var hour = Math.floor(seconds / (60 * 60));
      if(sec < 10) sec = "0" + sec;
      if(min < 10) min = "0" + min;
      var ret = "" + hour + ":" + min + ":" + sec;
      return ret;
    } else {
      var min = Math.floor(seconds / 60)
      var sec = Math.floor(seconds % 60);
      if(sec < 10) sec = "0" + sec;
      return min + ":" + sec
    }
  }

});

