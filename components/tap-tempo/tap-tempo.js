Polymer("tap-tempo", {
  nrTapps: 0,
  previousTime: 0,
  time: 0,
  startTime: 0,
  ready: function(){
    console.log("tapp-tempo - ready");
    var taptempo = this;
  },
  tempoTapped: function(){
    console.log("tempo tapped")


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

/*
    if(Troff.tempoTimeout) clearInterval(Troff.tempoTimeout);

    Troff.tempoTimeout = setTimeout(Troff.saveTempo, 3000);
*/
  },
  tempoChanged: function(){


    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'taptempo';
    var obj = {};
    obj[key] = this.tempo;
    chrome.storage.local.set(obj);

    console.log("tempoChanged -> saving " + this.tempo + " to " + key);
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'taptempo';
    var taptempo = this;
    chrome.storage.local.get(key, function(res){
      taptempo.tempo = res[key] || "?";
    });
  }

});

