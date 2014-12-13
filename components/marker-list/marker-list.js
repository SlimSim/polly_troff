Polymer("marker-list", {

  recalcDistanse: function(){
    console.log("recalcDistanse ->");
  },
  ready: function(){
    this.addEventListener('markerDetached', this.markerDetached);
    this.addEventListener('markerAttached', this.markerAttached);
    console.log("Height client = " + this.clientHeight );
    console.log("Height inner  = " + this.innerHeight  );
    console.log("Height offset = " + this.offsetHeight );

    this.addEventListener('setStart', this.setStart);
    this.addEventListener('setStop', this.setStop);

  },
  markerDetached: function(fireObject){
    console.log("markerDetached from list -> fireObject:");
    console.log(fireObject.detail.currentMarker);
    fireObject.detail.currentMarker.remove()
    this.recalculateDistanse();
  },
  markerAttached: function(fireObject){
    console.log("markerAttached from list ->");
    console.log(fireObject.detail.currentMarker);
    this.recalculateDistanse();
  },
  setStart: function(fireObject){
    var aMarker = this.querySelectorAll('song-marker');
    for(i=0; i<aMarker.length; i++){
      if(aMarker[i]==fireObject.detail.currentMarker){
        aMarker[i].start = true;
      } else {
        aMarker[i].start = false;
      }
    }
  },
  setStop: function(fireObject){
    var aMarker = this.querySelectorAll('song-marker');
    for(i=0; i<aMarker.length; i++){
      if(aMarker[i]==fireObject.detail.currentMarker){
        aMarker[i].stop = true;
      } else {
        aMarker[i].stop = false;
      }
    }
  },
  recalculateDistanse: function(){
    console.log('\nrecalculateDistanse ->');
    var aMarker = this.querySelectorAll('song-marker');
    console.log("aMarker")
    console.log(aMarker);

    for (var i=0; i<aMarker.length; i++){
      var cH = aMarker[i].clientHeight; 
      var mTop = aMarker[i].mTop;
      var time = aMarker[i].time;
      console.log("clientHeight = " + cH + ", mTop = " + mTop + ", time = " + time);
    }
  },
  recalculateDistanseGam: function(input){
    console.log('recalculateDistanseGam ->');



    var totalDistanceTop = 0;

    var barMarginTop = 0;

    if(this.querySelectorAll)
      var aMarker = this.querySelectorAll('song-marker');
    else{
      console.log("this.querySelectorAll does not exist. this:")
      console.log(this)
    }
    console.log("aMarker")
    console.log(aMarker);

    var totalDistanceTop = 0;
    var barMarginTop = 0;
    var timeBarHeight = 300; //vertical distance of time bar
    for (var i=0; i<aMarker.length; i++){
      var songTime = 190; // total song time;


      var markerHeight = aMarker[i].clientHeight;
      var markerMargin = aMarker[i].mTop;
      var markerTime = aMarker[i].time;

      var freeDistanceToTop = timeBarHeight * markerTime / songTime

      var marginTop = freeDistanceToTop - totalDistanceTop + barMarginTop
      totalDistanceTop = freeDistanceToTop + markerHeight + barMarginTop;

      aMarker[i].mTop = marginTop;
      console.log( "markerHeight = " + markerHeight + ", markerTIme = " + markerTime);
//      aMarker[i].mTop = aMarker[i].time - sumTime;
//      sumTime = aMarker[i].time
    }
    console.log("\n")

/*
    while(child){
      var songTime = 190; // the length of the song
      var markerTime = child.time;


      var myRowHeight = child.clientHeight;

      var freeDistanceToTop = timeBarHeight * markerTime / songTime;

      var marginTop = freeDistanceToTop - totalDistanceTop + barMarginTop;
      totalDistanceTop = freeDistanceToTop + myRowHeight + barMarginTop;

      child.mTop =  marginTop;
      child = child.nextSibling;

    }

    var sumTime = 0;

    for (var i=0; i<aMarker.length; i++){
      aMarker[i].mTop = aMarker[i].time - sumTime;
      sumTime = aMarker[i].time
    }
*/
  },
  addMarker: function(name, time){
    console.log("addMarker -> name = " + name + ", time = " + time);

  },
  printHeight: function(){
    console.log("Height client = " + this.clientHeight );
    console.log("Height inner  = " + this.innerHeight  );
    console.log("Height offset = " + this.offsetHeight );
  }

});