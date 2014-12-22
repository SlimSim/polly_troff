Polymer("marker-list", {
  value: 0,
  max: 42,
  stopTime: 42,
  startTime: 0,
  ready: function(){
    this.addEventListener('markerDetached', this.markerDetached);
    this.addEventListener('markerAttached', this.markerAttached);
    console.log("Height client = " + this.clientHeight );
    console.log("Height inner  = " + this.innerHeight  );
    console.log("Height offset = " + this.offsetHeight );

    this.addEventListener('setStart', this.setStart);
    this.addEventListener('setStop', this.setStop);






/* The Add Marker - dialoug */
    var thisMarkerList = this;
    var pbok = this.shadowRoot.querySelectorAll('.closeOnPress');
    for(var i=0; i<pbok.length; i++){
      pbok[i].addEventListener('click',function(){
        console.log(thisMarkerList.shadowRoot.querySelector('#newMarkerName'))

        this.parentNode.parentNode.toggle();
        console.log(this.parentNode.parentNode)
        console.log(thisMarkerList);

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

  },
  setSongMetadata: function(media){
    console.log("markerlist, setSongMetadata ->")
    this.max = media.duration;

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
    console.log("ed:");
    console.log(ed)
    ed.toggle();
  },
  recalcDistanse: function(){
    console.log("recalcDistanse ->");
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




    console.log("this:")
    console.log(this)
    console.log("this.shadowRoot:")
    console.log(this.shadowRoot)
    console.log("this.shadowRoot.querySelector('#timeBar'):")
    console.log(this.shadowRoot.querySelector('#timeBar'))

    var timeBarHeight = this.shadowRoot.querySelector('#timeBar').clientHeight - 10;
    var totalDistanceTop = 4;
    console.log("timeBarHeight = " + timeBarHeight);


    var barMarginTop = parseInt(getComputedStyle(this.shadowRoot.querySelector('#timeBar')).marginTop);
    console.log("barMarginTop = " + barMarginTop);





    for (var i=0; i<aMarker.length; i++){

            var songTime = 200;//$(FS.currentPlayer)[0].duration;
            var markerTime = aMarker[i].time; //child.childNodes[2].timeValue;
            var myRowHeight = aMarker[i].clientHeight;
      console.log("markerTime = " + markerTime);
      console.log("aMarker[i].clientHeight = " + aMarker[i].clientHeight)
      console.log("myRowHeight = " + myRowHeight);


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