Polymer("num-pad", {
  ready: function(){
    this.special = typeof this.special != 'undefined'? this.special: "0";
    this.value = typeof this.value != 'undefined'? parseInt(this.value): 1;
  },
  select: function(a, b, c){
    this.value = c.getAttribute('value');
  },
  valueChanged: function(){
    var aPaperButtons = this.shadowRoot.querySelectorAll('select-button')
    for (var i=0; i<aPaperButtons.length; i++){
      aPaperButtons[i].removeAttribute('selected');
      if(parseInt(aPaperButtons[i].getAttribute('value') ) == this.value){
        aPaperButtons[i].setAttribute('selected', true);
      }
    }

    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'numpad';
    var obj = {};
    obj[key] = this.value;
    chrome.storage.local.set(obj);
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'numpad';
    var numpad = this;
    chrome.storage.local.get(key, function(res){
      numpad.value = res[key] || 1;
    });
  }
});


