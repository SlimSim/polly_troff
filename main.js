/*var toastGroupTemplate = document.querySelector('#toastGroup');
toastGroupTemplate.showToast = function() {
  document.querySelector('#toast').show();
}
*/

var Troff = {};

Troff.playSong = function(wait){
  console.log("playSong wiat = " + wait)
  wait = wait || 0;
  var media = document.querySelector('audio, video');
  if (!media) return;



  if(Troff.stopTimeout) clearInterval(Troff.stopTimeout);
  Troff.setMode('wait');


  Troff.stopTimeout = setTimeout(function(){
    console.log("timeOut function...");
    if(document.querySelector('time-nr-info').mode == 'pause' ) return;
//    if($('#buttPlayInFullscreen').hasClass('active')){
//      Troff.goFullscreen();
//    }
    media.play();
    Troff.setMode('play');
  }, wait);

  document.querySelector('time-nr-info').countDown( wait/1000 );

}

Troff.openHelp = function(){
  console.log("open Help ->")
  document.querySelector('troff-dialogs').openHelp();
}

Troff.openKeyboardShortcuts = function(){
  document.querySelector('troff-dialogs').openKeyboardShortcuts()
}
Troff.openShareApp = function(){
  document.querySelector('troff-dialogs').openShareApp();
}
Troff.openShareMarkers = function(){
  document.querySelector('troff-dialogs').openShareMarkers();
}

Troff.pauseSong = function(){
  Troff.setMode('pause');
//    Troff.updateLoopTimes();

  if(Troff.stopTimeout)  clearInterval(Troff.stopTimeout);
  if(Troff.stopInterval) clearInterval(Troff.stopInterval);


  var media = document.querySelector('audio, video');
  if(!media) return;

  media.pause();
//  if($('#buttPlayInFullscreen').hasClass('active')){
//      Troff.exitFullscreen();
//  }

}

Troff.spacePlay = function(){
  console.log(6)

  console.log("spacePlay ->")
  var media = document.querySelector('audio, video');
  if(!media) return;

  media.currentTime = document.querySelector('marker-list').startTime;

  var timeToStart = document.querySelector('#pauseBefStart').value;



  if( document.querySelector('time-nr-info').mode == 'pause'){
    console.log("mode is pause, start to play song soon!")
    Troff.playSong( timeToStart*1000 );
  } else {
    console.log("mode is not pause!")
    Troff.pauseSong();
  }

//  document.getElementById('blur-hack').focus();


/*
  if(media.paused){
    media.play();
    this.icon = "av:pause";
  } else {
    media.pause();
    this.icon = "av:play-arrow";
  }
  */
}

Troff.playFullSong = function(){
  var ml = document.getElementById('markerList');
  ml.selectFirstMarkerAsStart();
  ml.selectLastMarkerAsStop();

}



Troff.addMarker = function(){
  var ml = document.getElementById('markerList');
  ml.addMarkerDialoge();
}

Troff.setLoopTimes = function(){
  console.log(document.querySelector('num-pad').value);
  console.log(document.querySelector('time-nr-info').nr)
  document.querySelector('time-nr-info').loopTimesLeft = document.querySelector('num-pad').value

}

Troff.setMode = function(mode){
  if(mode == 'pause'){
    document.querySelector('time-nr-info').mode = 'pause';
    document.querySelector('time-nr-info').zValue = 0;
/*
    $('#infoSection').removeClass('play');
    $('#infoSection').removeClass('wait');
    $('#infoSection').addClass('pause');
    Troff.updateSecondsLeft();
*/

    var secondsLeft = document.querySelector('#pauseBefStart').value;
    document.querySelector('time-nr-info').time = secondsLeft;

    document.querySelector('#playButton').icon = "av:play-arrow";
// "av:play-arrow / av:pause";

  }
  if(mode == 'wait'){
    document.querySelector('time-nr-info').mode = 'wait'
    document.querySelector('time-nr-info').zValue = 3;
    document.querySelector('#playButton').icon = "av:pause";

/*    $('#infoSection').removeClass('play')
    $('#infoSection').removeClass('pause')
    $('#infoSection').addClass('wait')

    $('#buttSpacePlay').css('display', 'none');
    $('#buttSpacePause').css('display', 'block');
  */
  }
  if(mode == 'play'){
    document.querySelector('time-nr-info').mode = 'play';
    document.querySelector('time-nr-info').zValue = 3;
    document.querySelector('#playButton').icon = "av:pause";
//    $('#infoSection').removeClass('wait')
//    $('#infoSection').removeClass('pause')
//    $('#infoSection').addClass('play')

  }

}



window.onload = function(){
  function addEventListenerTo(query, listenFor, funk){
    document.querySelector(query).addEventListener(listenFor, funk);
  }

  addEventListenerTo('#addMarkerButt', 'click', Troff.addMarker)
  addEventListenerTo('#playButton', 'click', Troff.spacePlay)
  addEventListenerTo('#playFullSong', 'click', Troff.playFullSong)
  addEventListenerTo('#infoButton', 'click', Troff.openHelp)
  addEventListenerTo('num-pad', 'valueChanged', Troff.setLoopTimes)
  addEventListenerTo('#keyboardShortcutButton', 'click', Troff.openKeyboardShortcuts)
  addEventListenerTo('#shareAppButton', 'click', Troff.openShareApp)
  addEventListenerTo('#shareMarkersButton', 'click', Troff.openShareMarkers)

  addEventListenerTo('#pauseBefStart', 'valueChanged', function(fireInfo){
    document.querySelector('time-nr-info').time = fireInfo.detail;
  });
  addEventListenerTo('#startBefore', 'valueChanged', function(fireInfo){
    document.querySelector('marker-list').startBefore = fireInfo.detail;
  });
  addEventListenerTo('#stopAfter', 'valueChanged', function(fireInfo){
    document.querySelector('marker-list').stopAfter = fireInfo.detail;
  });

  addEventListenerTo('marker-list', 'atEndOfLoop', function(){
    var markerList = document.querySelector('marker-list');
    var timeNrInfo = document.querySelector('time-nr-info');
    var media = document.querySelector('audio, video');
    var numPad = document.querySelector('num-pad');
    var pauseBetweenLoops = document.querySelector('#pauseBetweenLoops')

    media.currentTime = markerList.startTime;
    media.pause();

    //loopTimesLeft == 0 indicates infinet loop is on
    if( timeNrInfo.loopTimesLeft == 0 ){
        Troff.playSong( pauseBetweenLoops.value * 1000 );
    } else if( timeNrInfo.loopTimesLeft > 1 ){
        timeNrInfo.loopTimesLeft -= 1;
        Troff.playSong( pauseBetweenLoops.value * 1000 );
    } else {
        timeNrInfo.loopTimesLeft = numPad.value;
        Troff.pauseSong();
    }
  }); // atEndOfLoop End



} // window.onload end