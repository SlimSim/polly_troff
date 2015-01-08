Polymer("marker-list", {
  value: 0,
  max: 42,
  stopTime: 42,
  startTime: 0,
  markerStartTime: 0,
  markerStopTime: 0,
  startBefore: 0,
  stopAfter: 0,
  ready: function(){
    this.addEventListener('markerDetached', this.markerDetached);
    this.addEventListener('markerAttached', this.markerAttached);
    this.addEventListener('markerEdited', this.markerEdited);

    this.addEventListener('setStart', this.setStart);
    this.addEventListener('setStop', this.setStop);

    var that = this;
    window.addEventListener('resize', function(){
      that.recalculateDistanse();
      that.setAppropriateActivePlayRegion();
    });


  console.log("marker-list ready -> this:")
  console.log(this);


/* The Add Marker - dialoug */
//    var thisMarkerList = this;
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
//    this.markerStartTime = 0;
//    this.markerStopTime = 42;
    this.clearMarkers();

  },
  setSongMetadata: function(media){
    this.max = media.duration;

    this.recallMarkers();

//    this.markerStopTime = media.duration;
//    this.stopTime = this.value = ???
// this.startTime = ???


    that = this;
    media.addEventListener('timeupdate', function(){
      if(media.currentTime >= that.stopTime ){
          that.fire("atEndOfLoop")
      }
      that.value = media.currentTime;
    });
  },
  recallMarkers: function(){
    if(!gCurrentSongPath)
      return;
    var that = this;
    var key1 = gCurrentSongPath +'markerStartTime';
    chrome.storage.local.get(key1, function(res1){
      var markerStartTime = res1[key1];
      var key2 = gCurrentSongPath +'markerStopTime';
      chrome.storage.local.get(key2, function(res2){
        var markerStopTime = res2[key2];
        var key = gCurrentSongPath +'markers';
        chrome.storage.local.get(key, function(res){
          if(!res[key] || JSON.parse(res[key]).length <= 0){
            // generate the first two markers.
            that.newMarkerName = "Start";
            that.newMarkerInfo = "This is a automaticaly generated marker "+
                                 "to indicate the start of the song";
            that.newMarkerTime = 0;
            var startMarker = that.addMarkerOK();
            startMarker.setStart();
            that.markerStartTimeChanged();

            that.newMarkerName = "End";
            that.newMarkerInfo = "This is a automaticaly generated marker "+
                                 "to indicate the end of the song";
            that.newMarkerTime = that.max;
            var stopMarker = that.addMarkerOK();
            stopMarker.setStop();
            that.markerStopTimeChanged();
            return;
          }
          // add the saved markers:
          var markers = JSON.parse(res[key]);
          console.log("markerStopTime = " + markerStopTime)
          for(var i=0; i<markers.length; i++){
            var marker = markers[i];
            var newMarker = document.createElement('song-marker');
            newMarker.name = marker.name;
            newMarker.info = marker.info;
            newMarker.time = marker.time;
            that.appendChild(newMarker);
            //select the start and stop markers.
            if(Math.abs(marker.time - markerStartTime) < 0.01 )
              newMarker.start = true;
            console.log("marker.time = " + marker.time)
            if(Math.abs(marker.time - markerStopTime) < 0.01)
              newMarker.stop = true;

          }
          that.markerStartTime = markerStartTime;
          that.markerStopTime = markerStopTime;
        });
      });

    })
  },
  addMarkerDialoge: function(){
    console.log("addMArkerDialoge ->")

    this.newMarkerTime = this.value;
//    this.shadowRoot.querySelector("#newMarkerTime").value = this.value;
    this.$.addMarkerDialog.toggle();
//ed = this.shadowRoot.querySelector('paper-dialog');


//        console.log(this)
//    console.log(this.shadowRoot.querySelector('#newMarkerName') );
/*
    console.log(this.shadowRoot.querySelector('#newMarkerName') );
    console.log("$:")
    console.log(this.shadowRoot.querySelector('#newMarkerName').$ );
    console.log(this.shadowRoot.querySelector('#newMarkerName').$.input );
//NF    console.log(this.shadowRoot.querySelector('#newMarkerName').$.querySelector('input') );
//    console.log(this.shadowRoot.querySelector('#newMarkerName').$.shadowRoot );
    console.log("shadowRoot:")
    console.log(this.shadowRoot.querySelector('#newMarkerName').shadowRoot );
//U    console.log(this.shadowRoot.querySelector('#newMarkerName').shadowRoot.input );
    console.log(this.shadowRoot.querySelector('#newMarkerName').shadowRoot.querySelector('input') );
//U    console.log(this.shadowRoot.querySelector('#newMarkerName').shadowRoot.$ );

this.shadowRoot.querySelector('#newMarkerName').shadowRoot.querySelector('input').select() ;
    var elem1 = this.shadowRoot.querySelector('#newMarkerName');
    var elem2 = this.shadowRoot.querySelector('#newMarkerName').shadowRoot.querySelector('input')

    elem1.focus.bind(elem1)();
    elem2.focus.bind(elem2)();
*/
//    .input.focus();
    //.select(); //focus
    //this.shadowRoot.querySelector('#newMarkerName').focus();


    console.log("addMarkerDialoge <-")

  },
  addMarkerOK: function(){
  console.log("AMOK");

    var newMarker = document.createElement('song-marker');
    newMarker.name = this.newMarkerName;
    newMarker.info = this.newMarkerInfo;
    newMarker.time = this.newMarkerTime;

    console.log("newMarker:")
    console.log(newMarker)

    var markers = this.querySelectorAll('song-marker'); //JSON.parse(res[key]);

    var inserted = false;
    for(var i=0; i<markers.length; i++){
      console.log(markers[i].time)
      if(newMarker.time < markers[i].time){
        this.insertBefore(newMarker, markers[i]);
        inserted = true;
        break;
      }
    }
    if(!inserted)
      this.appendChild(newMarker);





    console.log("addMarkerOK <-");
    return newMarker;
  },
  saveAllMarkers: function(){
    console.log("saveAllMarkers ->")
    markers = this.querySelectorAll('song-marker');
    var key = gCurrentSongPath +'markers';

console.log("saving markers to storage, get ->");

    var reducedMarkers = []

    for(var i=0; i<markers.length; i++){
      var o = {};
      o.name = markers[i].name;
      o.info = markers[i].info;
      o.time = markers[i].time;
      reducedMarkers.push(o)
    }
    console.log(reducedMarkers)

    var obj = {};
    obj[key] = JSON.stringify(reducedMarkers);
    chrome.storage.local.set(obj);

  },
  addMarkerCancel: function(){
    console.log("addMarkerCancel ->")
  },
  clearMarkers: function(){
    while(this.childNodes[0])
      this.removeChild(this.childNodes[0]);
  },
  recalcDistanse: function(){
    // används denna ??? SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE SITE
  },
  markerAttached: function(fireObject){
    this.recalculateDistanse();
    this.saveAllMarkers();
  },
  markerDetached: function(fireObject){
    // checking if start or stop marker is removed
    if(fireObject.detail.currentMarker.start)
      this.selectFirstMarkerAsStart();
    if(fireObject.detail.currentMarker.stop){
      this.selectLastMarkerAsStop();
    }
    fireObject.detail.currentMarker.remove()
    this.recalculateDistanse();
    this.saveAllMarkers()
  },
  markerEdited: function(fireObject){
    console.log("markerEdited -> this:")
    console.log(this);
    if(fireObject.detail.currentMarker.time > this.max)
      fireObject.detail.currentMarker.time = this.max;
    if(fireObject.detail.currentMarker.time < 0)
      fireObject.detail.currentMarker.time = 0;

    this.saveAllMarkers();
    this.recalculateDistanse();



    if(fireObject.detail.currentMarker.start){
      this.markerStartTime = fireObject.detail.currentMarker.time;
    }
    if(fireObject.detail.currentMarker.stop){
      this.markerStopTime = fireObject.detail.currentMarker.time;
    }
  },
  maxChanged: function(){
    document.querySelector('#timeArea').maxTime = this.max;
  },
  valueChanged: function(){
    document.querySelector('audio, video').currentTime = this.value;
    document.querySelector('#timeArea').currentTime = this.value;
  },
  setStart: function(fireObject){
    console.log("setStart -> ")
    var aMarker = this.querySelectorAll('song-marker');
    for(i=0; i<aMarker.length; i++){
      if(aMarker[i]==fireObject.detail.currentMarker){
        aMarker[i].start = true;
      } else {
        aMarker[i].start = false;
      }
    }
    this.markerStartTime = fireObject.detail.currentMarker.time;
  },
  setStop: function(fireObject){
    console.log("setStop ->")
    var aMarker = this.querySelectorAll('song-marker');
    for(i=0; i<aMarker.length; i++){
      if(aMarker[i]==fireObject.detail.currentMarker){
        aMarker[i].stop = true;
      } else {
        aMarker[i].stop = false;
      }
    }
    this.markerStopTime = fireObject.detail.currentMarker.time;

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
    var totalDistanceTop = 10;


    var barMarginTop = parseInt(getComputedStyle(this.shadowRoot.querySelector('#timeBar')).marginTop);

    for (var i=0; i<aMarker.length; i++){

            var maxSongTime = this.max; //$(FS.currentPlayer)[0].duration;
            var markerTime = aMarker[i].time; //child.childNodes[2].timeValue;
            var myRowHeight = aMarker[i].clientHeight;


            var freeDistanceToTop = timeBarHeight * markerTime / maxSongTime;

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
//    this.setAppropriateActivePlayRegion();
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
  setAppropriateActivePlayRegion: function(){
/*
        var timeBarHeight = $('#timeBar').height() - 12;
        var barMarginTop = parseInt($('#timeBar').css('margin-top')) + 6;

        var startTime = Troff.getStartTime();
        var stopTime = Troff.getStopTime();
        var songTime = $(FS.currentPlayer )[0].duration;

        var height = (stopTime - startTime) * timeBarHeight / songTime;
        var top = startTime * timeBarHeight / songTime + barMarginTop;

        $('#activePlayRegion').height(height);
        $('#activePlayRegion').css("margin-top", top + "px");

        if( $('.currentMarker').length == 0 ){
            $('#markerList li:first input:nth-child(3)')
                .addClass('currentMarker')
        }
        if( $('.currentStopMarker').length == 0 )
            $('#markerList li:last input:nth-child(4)') // nr 4 is stopmarker
                .addClass('currentStopMarker');
*/
    var timeBarHeight = this.$.timeBar.clientHeight - 12; // or offsetHeight
    var style = window.getComputedStyle(this.$.timeBar);
    var barMarginTop = parseInt(style.marginTop) + 6;

    var startTime = this.startTime;
    var stopTime = this.stopTime;
    var songTime = this.max; //$(FS.currentPlayer )[0].duration;

    var height = (stopTime - startTime) * timeBarHeight / songTime;
    var top = startTime * timeBarHeight / songTime + barMarginTop;

    this.$.activePlayRegion.style.height = height;
    this.$.activePlayRegion.style.marginTop = top + "px";

  },
  selectFirstMarkerAsStart: function(){
    this.querySelector('song-marker').setStart();
  },
  selectLastMarkerAsStop: function(){
    var aSongMarker = this.querySelectorAll('song-marker');
    aSongMarker[aSongMarker.length-1].setStop();
  },
  startBeforeChanged: function(){
    this.startTime = Math.max(this.markerStartTime - this.startBefore, 0);
  },
  stopAfterChanged: function(){
    this.stopTime = Math.min(this.markerStopTime + this.stopAfter, this.max);
  },
  markerStartTimeChanged: function(){
    this.startBeforeChanged();
    var key = gCurrentSongPath + 'markerStartTime';

    var obj = {};
    obj[key] = this.markerStartTime;
    chrome.storage.local.set(obj);
    console.log("markerStopTime = " + this.markerStartTime)
  },
  markerStopTimeChanged: function(){
    this.stopAfterChanged();


    var key = gCurrentSongPath + 'markerStopTime';
    var obj = {};
    obj[key] = this.markerStopTime;
    console.log("markerStopTime = " + this.markerStopTime)
    chrome.storage.local.set(obj);
  },
  startTimeChanged: function(){
    this.setAppropriateActivePlayRegion();
  },
  stopTimeChanged: function(){
    this.setAppropriateActivePlayRegion();
  }
});