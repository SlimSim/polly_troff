Polymer("keyboard-input-handler", {
  enterFunction: false,
  ready: function(){
    console.log("keyboard-input-handler -> ready");

    document.onkeydown = this.keydownFunction;
    /*
    function(e) {
      console.log("onkeydown " + e.keyCode);

      if(e.keyCode == 84) // T
        document.getElementById('taptempo').tempoTapped();
      if(48 <= e.keyCode && e.keyCode <= 57 ){
        var val = e.keyCode-48;
        document.querySelector('num-pad').setValue(val);
    }
  };
*/

  },
  keydownFunction: function(event){
    /*
     * the enterfunction is used to prevent key-events in dialogs.
     * it can also run itself when pressing enter.
     */
    if(this.enterFunction){
      if(event.keyCode == 13){
        this.enterFunction();
      }
      return;
    }

    if(event.keyCode == 229) // wierd thing but ok... // måste lära mig att skriva varför jag hade med det!!!!!
        return;

    //if 0 to 9 or bakspace in a input-field, return,
    //---- site add "or minus, delete, numpad mm"
/*    if($(':input[type="number"]' ).is(":focus") &&
        (event.keyCode>=48 && event.keyCode<=57 || event.keyCode==8 )){
        return;
    }
*/
//    document.getElementById('blur-hack').focus();

    // if pressing a number
    if(event.keyCode>=48 && event.keyCode<=57) {
        var number = event.keyCode - 48;
        document.querySelector('num-pad').setValue(number);
    }

    switch(event.keyCode){
    case 32: //space bar
      Troff.spacePlay();
      break;
    case 13: // return
      Troff.enterPlay();
      break;
    case 27: // esc
      Troff.pauseSong();
      break;
    case 112: // f1
      Troff.openHelp();
      break;
    case 40: // downArrow
    case 77: // M
      Troff.addMarker();
      break;
    case 84: // T
      document.querySelector('#taptempo').tempoTapped();
      break;
    case 70: // F
      document.querySelector('#playInFullscreenButt').select();
      break;
    case 80: // P
      if(event.shiftKey==1)
        document.querySelector('#pauseBefStart').addValue();
      else if(event.altKey==1)
        document.querySelector('#pauseBefStart').supValue();
      else
        document.querySelector('#pauseBefStart').toggleOnOff();
      break;
    case 66: // B
      if(event.shiftKey==1)
        document.querySelector('#startBefore').addValue();
      else if(event.altKey==1)
        document.querySelector('#startBefore').supValue();
      else
        document.querySelector('#startBefore').toggleOnOff();
      break;
    case 65: // A
      if(event.shiftKey==1)
        document.querySelector('#stopAfter').addValue();
      else if(event.altKey==1)
        document.querySelector('#stopAfter').supValue();
      else
        document.querySelector('#stopAfter').toggleOnOff();
      break;
    case 87: // W
      if(event.shiftKey==1)
        document.querySelector('#pauseBetweenLoops').addValue();
      else if(event.altKey==1)
        document.querySelector('#pauseBetweenLoops').supValue();
      else
        document.querySelector('#pauseBetweenLoops').toggleOnOff();
      break;
    case 83: // S
      if(event.shiftKey==1)
        document.querySelector('#speedVal').addValue();
      else if(event.altKey==1)
        document.querySelector('#speedVal').supValue();
      else
        document.querySelector('#speedVal').setOrgValue();
      break;
    case 86: // V
      if(event.shiftKey==1)
        document.querySelector('#volumeVal').addValue();
      else if(event.altKey==1)
        document.querySelector('#volumeVal').supValue();
      else
        document.querySelector('#volumeVal').setOrgValue();
      break;
    case 85: // U
      if(event.shiftKey==1)
        document.querySelector('marker-list').selectFirstMarkerAsStart();
      else if(event.altKey==1)
        document.querySelector('marker-list').selectLastMarkerAsStop();
      else
        Troff.playFullSong();
      break;
    default:
        //
        console.log("key " + event.keyCode);
        //nothing
    }// end switch

  }
});


