Polymer("song-marker", {
  value: 1,
  mTop: 0,
  ready: function(){

//    this.start = typeof this.start != 'undefined'? this.value: false;
//    this.stop  = typeof this.stop  != 'undefined'? this.value: false;


    var pbok = this.shadowRoot.querySelectorAll('.closeOnPress');
    for(var i=0; i<pbok.length; i++){
      pbok[i].addEventListener('click',function(){
        this.parentNode.parentNode.toggle();
      })
    }
  },
  detached: function(){
    this.fire("markerDetached", {currentMarker: this});
  },
  attached: function(){
    this.fire("markerAttached", {currentMarker: this});
    this.visualTime = this.secToDisp(this.time);
  },
  removeMeCheck: function(){
    this.$.removeMeCheckDialog.toggle();
  },
  removeMe: function(){ // används denna ??? SITE SITE SITE SITE SITE SITE SITE SITE SITE
    this.fire("markerDetached", {currentMarker: this});
  },
  secToDisp: function(seconds){
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
  },
  showInfo: function(){
    this.$.infoDialog.toggle();
  },
  edit: function(){
    this.$.editDialog.toggle();
  },
  editOK: function(){
    this.time = this.visualTimeToSec(this.visualTime);
    this.fire("markerEdited", {currentMarker: this});
  },
  editCancel: function(){

  },
  visualTimeToSec: function(visualTime){
    var aTime = visualTime.split(":");
    if(aTime.length == 2){
      return parseInt(aTime[0]) * 60 + parseInt(aTime[1]);
    } else if(aTime.length == 3){
      return parseInt(aTime[0])*3600 + parseInt(aTime[1])*60 + parseInt(aTime[2]);
    } else {
      return parseInt(aTime[0]);
    }
  },
  setStart: function(a, b, c){
    this.fire('setStart', {currentMarker: this});
  },
  setStop: function(){
    this.fire('setStop', {currentMarker: this});
  },
  startChanged: function(){
    this.shadowRoot.querySelector('#startButt').selected = this.start;
  },
  stopChanged: function(){
    this.shadowRoot.querySelector('#stopButt').selected = this.stop;
  },
  timeChanged: function(){
    this.visualTime = this.secToDisp(this.time);
  },
  getJSONstringify: function(){
    var object = {};
    object.name = this.name;
    object.info = this.info;
    object.time = this.time;
    return JSON.stringify(object);
  }
});

