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
  removeMe: function(){ // används denna ??? SITE SITE SITE SITE SITE SITE SITE SITE SITE
    this.fire("markerDetached", {currentMarker: this});
  },
  secToDisp: function(sec){
    return sec;
  },
  edit: function(){
    var ed = this.shadowRoot.querySelector('#editDialog')
    ed.toggle();
  },
  editOK: function(){

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
  }
});

