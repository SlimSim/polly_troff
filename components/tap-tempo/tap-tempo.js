Polymer("tap-tempo", {
  nrTapps: 0,
  previousTime: 0,
  time: 0,
  startTime: 0,
  tempo: "?",
  ready: function(){
    var taptempo = this;
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'taptempo';
    var thisTaptempo = this;
    chrome.storage.local.get(key, function(res){
      thisTaptempo.tempo = res[key] || "?";
    });
  },
  tempoTapped: function(){
    this.previousTime = this.time;
    this.time = new Date().getTime() / 1000;

//  document.getElementById('blur-hack').focus();

    if(this.time - this.previousTime > 3){
        this.startTime = this.previousTime = this.time;
        this.nrTapps = 0;
    }
    else {
        this.nrTapps++;
    }
    var tappedTime = this.time - this.startTime;
    this.tempo  =  Math.round ( this.nrTapps * 60 / tappedTime ) ;
  },
  tempoChanged: function(){

    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'taptempo';
    var obj = {};
    obj[key] = this.tempo;
    chrome.storage.local.set(obj);
  }

});

