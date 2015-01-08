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

Troff.pauseSong = function(){
  var media = document.querySelector('audio, video');
  if(!media) return;

  media.pause();
//  if($('#buttPlayInFullscreen').hasClass('active')){
//      Troff.exitFullscreen();
//  }

    Troff.setMode('pause');
//    Troff.updateLoopTimes();

    if(Troff.stopTimeout)  clearInterval(Troff.stopTimeout);
    if(Troff.stopInterval) clearInterval(Troff.stopInterval);



}

Troff.spacePlay = function(){
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
  document.querySelector('#startBefore').addEventListener('valueChanged',function(fireInfo){
    document.querySelector('marker-list').startBefore = fireInfo.detail;
    console.log("value changed of start before to " + fireInfo.detail);
  });
  document.querySelector('#stopAfter').addEventListener('valueChanged',function(fireInfo){
    document.querySelector('marker-list').stopAfter = fireInfo.detail;
  });
  document.querySelector('marker-list').addEventListener('atEndOfLoop', function(){
/*
        Troff.goToStartMarker();
    var audio = $(FS.currentPlayer)[0];
    var dTime = audio.currentTime;
    audio.pause ();
    if($('#buttPlayInFullscreen').hasClass('active'))
        Troff.exitFullscreen();

/ *    if( Troff.isLoopInfinite() ) {
        Troff.playSong( $('#waitBetweenLoops').val()*1000 );
    } else if ( Troff.isLoopOn() ) {
        if ( IO.loopTimesLeft()>1 ){
        IO.loopTimesLeft( -1 );
        Troff.playSong( $('#waitBetweenLoops').val()*1000 );
        } else {
        IO.loopTimesLeft( $('#loopTimes').val() );
        Troff.pauseSong();
        }
    } // end if/else
* /

// gamla versionen:
    if( Troff.isLoopOn() ){
        if(Troff.isLoopInfinite() ) {
        Troff.playSong( $('#waitBetweenLoops').val()*1000 );
        } else {
        if ( IO.loopTimesLeft()>1 ){
            IO.loopTimesLeft( -1 );
            Troff.playSong( $('#waitBetweenLoops').val()*1000 );
        } else {
            IO.loopTimesLeft( $('#loopTimes').val() );
            Troff.pauseSong();
        }
        } // end else
    } else {
        Troff.pauseSong(); //This is needed because it setts the mood to 'pause'
    }
*/
    console.log("atEndOfLoop ->")
  var markerList = document.querySelector('marker-list');
  var timeNrInfo = document.querySelector('time-nr-info');
  var media = document.querySelector('audio, video');
  var numPad = document.querySelector('num-pad');
  var pauseBetweenLoops = document.querySelector('#pauseBetweenLoops')

    console.log(markerList)
    console.log(timeNrInfo)
    console.log(media)
    console.log(numPad)

  media.currentTime = markerList.startTime;
  media.pause();

  if ( timeNrInfo.loopTimesLeft > 1 ){
      timeNrInfo.loopTimesLeft -= 1;
      Troff.playSong( pauseBetweenLoops.value * 1000 );
  } else {
      timeNrInfo.loopTimesLeft = numpad.value;
      Troff.pauseSong();
  }




  });

/*
  document.getElementById('mButton').addEventListener('click', function(){

    var ml = document.getElementById('markerList');

    var mTime = document.querySelector('#mTime').value;
    var name = document.querySelector('#mName').value;

    var marker = document.createElement('song-marker');
    marker.name = name;
    marker.time = mTime;

    console.log(marker)

    ml.appendChild(marker);

  })
*/
  document.querySelector('#addMarkerButt').addEventListener('click', function(){
    var ml = document.getElementById('markerList');
    ml.addMarkerDialoge();
  })
  document.querySelector('#playButton').addEventListener('click', Troff.spacePlay)
/*  document.querySelector('#speedVal').addEventListener('valueChanged', function(){
    var media = document.querySelector('audio, video');
    if(!media) return;

//    console.log("this:")
//    console.log(this)

//    media.playbackRate =
  })
*/


  setTimeout(function(){
    var ml = document.getElementById('markerList');

/*
    var markerTerty = document.createElement('song-marker');
    markerTerty.name = "terty";
    markerTerty.time = 30;
    markerTerty.textContent = "super";
    var markerAT = document.createElement('song-marker');
    markerAT.name = "AT fyra"
    markerAT.time = 84



    //console.clear();

    ml.appendChild(markerTerty);
    ml.appendChild(markerAT);
*/
  }, 1000);




}