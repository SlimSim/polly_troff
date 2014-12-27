/*var toastGroupTemplate = document.querySelector('#toastGroup');
toastGroupTemplate.showToast = function() {
  document.querySelector('#toast').show();
}
*/

window.onload = function(){
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
    //console.log("Add Marker is clicked...")
    var ml = document.getElementById('markerList');
    ml.addMark();
  })
  document.querySelector('#playButton').addEventListener('click', function(){
    var media = document.querySelector('audio, video');
    if(!media) return;
    if(media.paused){
      media.play();
      this.icon = "av:pause";
    } else {
      media.pause();
      document.querySelector('#playButton').icon = "av:play-arrow";
    }
  })
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