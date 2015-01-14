Polymer("troff-dialogs", {
  importedMarkers: "",
  ready: function(){

    /* Adding declarative close-functionality to buttons in dialougs: */
    var pbok = this.shadowRoot.querySelectorAll('.closeOnPress');
    for(var i=0; i<pbok.length; i++){
      /* The Add Marker - dialoug */
      pbok[i].addEventListener('click',function(){
        //this is an EXTREMLY ugly way to close the parend dialog!!!!
        this.parentNode.toggle();
      });
    }

  },
  openHelp: function(){
    this.$.helpDialog.toggle();
  },
  openKeyboardShortcuts: function(){
    this.$.keyboardShortcuts.toggle();
  },
  openShareApp: function(){
    this.$.shareApp.toggle();
    var that = this;
    setTimeout(function(){
      // must have a timeout here to be able to slect the url
      that.$.urlInput.select();
    }, 20);
  },
  openShareMarkers: function(){
    this.$.shareMarkers.toggle();
    this.markersToExport = document.querySelector('marker-list').toString();
  },
  importMarkers: function(){
    console.log("importMarkers");
    console.log(this.importedMarkers)
    var aMarkers = JSON.parse(this.importedMarkers);
    console.log(aMarkers);

//[{"name":"Simon","info":"this is a bla bla bla ","time":60},{"name":"jippie","info":"","time":140.75394},{"name":"End","info":"This is a automaticaly generated marker to indicate the end of the song","time":195}]
//[{"name":"Start","info":"This is a automaticaly generated marker to indicate the start of the song","time":0},{"name":"varum","info":"","time":80.75394},{"name":"End","info":"This is a automaticaly generated marker to indicate the end of the song","time":255},{"name":"Simon","info":"this is a bla bla bla ","time":60},{"name":"jippie","info":"","time":140.75394},{"name":"End","info":"This is a automaticaly generated marker to indicate the end of the song","time":195}]

//        for(var i=0; i<aMarkers; i++){
//          HÃ¤r borde jag kolla sÃ¥ att markÃ¶rsnamnen inte redan finns
//            Object.keys(aMarkers[i])[0] = jag kan inte sÃ¤tta key'n pÃ¥ detta sÃ¤tt...'
//            men det Ã¤r bra om jag gÃ¶r denna koll, eller ska den gÃ¶ras pÃ¥ annat stÃ¤lle?
//        }

    for(var i=0; i<aMarkers.length; i++){
      var newMarker = document.createElement('song-marker')
      newMarker.name = aMarkers[i].name;
      newMarker.info = aMarkers[i].info;
      newMarker.time = aMarkers[i].time;

      document.querySelector('marker-list').insertMarker(newMarker);
    }


  },
  exportMarkers: function(){
    console.log("exportMarkers ->")
    var sMarkers = document.querySelector('marker-list').toString();
    console.log(sMarkers)
  }
});
