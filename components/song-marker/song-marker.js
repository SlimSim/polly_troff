Polymer("song-marker", {
  ready: function(){

    this.value = typeof this.value != 'undefined'? parseInt(this.value): 1;
    this.startValue = this.value;
    this.mTop = this.mTop || 0;

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
    console.log("marker detached from marker -> this:")
    console.log(this)
    this.fire("markerDetached", {currentMarker: this});
  },
  attached: function(){
    console.log("marker attached from marker -> this:");
    console.log(this)
    this.fire("markerAttached", {currentMarker: this});
    this.visualTime = this.secToDisp(this.time);
  },
  removeMe: function(){

//    this.remove();
console.log("markerDetached from marker ->")

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
    console.log("editOK ->")
  },
  setStart: function(a, b, c){
    this.fire('setStart', {currentMarker: this});
  },
  setStop: function(){
    console.log("setStop ->")
    this.fire('setStop', {currentMarker: this});
  },
  startChanged: function(){
    console.log("start changed")
    this.shadowRoot.querySelector('#startButt').selected = this.start;
  },
  stopChanged: function(){
    console.log("stopChanged")
    this.shadowRoot.querySelector('#stopButt').selected = this.stop;
  }
});

