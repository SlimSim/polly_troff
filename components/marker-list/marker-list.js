Polymer("marker-list", {
  value: 0,
  max: 42,
  stopTime: 42,
  startTime: 0,
  ready: function(){
    this.addEventListener('markerDetached', this.markerDetached);
    this.addEventListener('markerAttached', this.markerAttached);

    this.addEventListener('setStart', this.setStart);
    this.addEventListener('setStop', this.setStop);






/* The Add Marker - dialoug */
    var thisMarkerList = this;
    var pbok = this.shadowRoot.querySelectorAll('.closeOnPress');
    for(var i=0; i<pbok.length; i++){
      pbok[i].addEventListener('click',function(){


        this.parentNode.parentNode.toggle();

/*
        var markerTerty = document.createElement('song-marker');
        markerTerty.name = "terty";
        markerTerty.time = 30;
        markerTerty.textContent = "super";
        var markerAT = document.createElement('song-marker');
        markerAT.name = "AT fyra"
        markerAT.time = 84
*/

//        shadowRoot.querySelector('#addMarkerDialog').;
      })
    }


  },
  recall: function(){
    this.value = 0;
    this.max = 42;
    this.stopTime = 42;
    this.startTime = 0;
  },
  setSongMetadata: function(media){
    this.max = media.duration;
//    this.stopTime = this.value = ???
// this.startTime = ???


    thisMarkerList = this;
    media.addEventListener('timeupdate', function(){
      if(media.currentTime >= thisMarkerList.stopTime ){
          // Troff.atEndOfLoop();
      }
      thisMarkerList.value = media.currentTime;
    });
  },
  addMark: function(){
    var ed = this.shadowRoot.querySelector('#addMarkerDialog');
    ed.toggle();
  },
  editOK: function(){

  },
  recalcDistanse: function(){
    // används denna ??? SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE
  },
  markerDetached: function(fireObject){
    fireObject.detail.currentMarker.remove()
    this.recalculateDistanse();
  },
  maxChanged: function(){
    document.querySelector('#timeArea').maxTime = this.max;
  },
  valueChanged: function(){
    document.querySelector('audio, video').currentTime = this.value;
    document.querySelector('#timeArea').currentTime = this.value;
  },
  markerAttached: function(fireObject){
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
    var aMarker = this.querySelectorAll('song-marker');







//        var timeBarHeight = $('#timeBar').height() - 10;
//        var totalDistanceTop = 4;
/*
        var barMarginTop = parseInt($('#timeBar').css('margin-top'));
        while(child){
            var songTime = $(FS.currentPlayer)[0].duration;
            var markerTime = child.childNodes[2].timeValue;
            var myRowHeight = child.clientHeight;

            var freeDistanceToTop = timeBarHeight * markerTime / songTime;

            var marginTop = freeDistanceToTop - totalDistanceTop + barMarginTop;
            totalDistanceTop = freeDistanceToTop + myRowHeight + barMarginTop;

            child.setAttribute("style", "margin-top: "+ marginTop +"px;", true);
            child = child.nextSibling;
        }
        Troff.settAppropriateActivePlayRegion();
*/





    var timeBarHeight = this.shadowRoot.querySelector('#timeBar').clientHeight - 10;
    var totalDistanceTop = 4;


    var barMarginTop = parseInt(getComputedStyle(this.shadowRoot.querySelector('#timeBar')).marginTop);

    for (var i=0; i<aMarker.length; i++){

            var songTime = 200;//$(FS.currentPlayer)[0].duration;
            var markerTime = aMarker[i].time; //child.childNodes[2].timeValue;
            var myRowHeight = aMarker[i].clientHeight;


            var freeDistanceToTop = timeBarHeight * markerTime / songTime;

            var marginTop = freeDistanceToTop - totalDistanceTop + barMarginTop;
            totalDistanceTop = freeDistanceToTop + myRowHeight + barMarginTop;


            aMarker[i].mTop = marginTop;//            child.setAttribute("style", "margin-top: "+ marginTop +"px;", true);
//            child = child.nextSibling;


/*
      var cH = aMarker[i].clientHeight;
      aMarker[i].mTop = aMarker[i].time;

      var mTop = aMarker[i].mTop;
      var time = aMarker[i].time;
      console.log("clientHeight = " + cH + ", mTop = " + mTop + ", time = " + time);
*/
    }
  },
  recalculateDistanseGam: function(input){ /// gam  - avnänds denna ??? SITE SITE SITE SITE SITE SITE SITE SITE SITE
    console.log('recalculateDistanseGam ->');



    var totalDistanceTop = 0;

    var barMarginTop = 0;

    if(this.querySelectorAll)
      var aMarker = this.querySelectorAll('song-marker');
    else{

    }

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

//      aMarker[i].mTop = aMarker[i].time - sumTime;
//      sumTime = aMarker[i].time
    }


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

  }
});