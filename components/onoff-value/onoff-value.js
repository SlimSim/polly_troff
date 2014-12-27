Polymer("onoff-value", {
  value: 0,
  onValue: 2,
  offValue: 0,
  isOn: false,
  ready: function(){
    this.onValue = this.value;
    this.defaultOnValue = this.onValue;
    this.defaultIsOn = this.isOn;
    if(this.isOn){
      this.shadowRoot.querySelector('toggle-button').selected = true;
    } else {
      this.value = parseInt(this.offValue);
    }
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
    var thisOnOffValue = this;

    var key1 = gCurrentSongPath + 'onoffValue' + this.dbQuery + "onValue";
    chrome.storage.local.get(key1, function(res){
      var tmpOnValue;
      if(typeof res[key1] !== 'undefined')
        tmpOnValue = res[key1]
      else
        tmpOnValue = thisOnOffValue.defaultOnValue
      thisOnOffValue.onValue = tmpOnValue;
    });

    var key2 = gCurrentSongPath + 'onoffValue' + this.dbQuery + "isOn";
    chrome.storage.local.get(key2, function(res){
      var tmpIsOn;
      if(typeof res[key2] !== 'undefined')
        tmpIsOn = res[key2]
      else
        tmpIsOn = thisOnOffValue.defaultIsOn
      thisOnOffValue.isOn =  tmpIsOn;
    });

  },
  toggleOnOff: function(){
    this.isOn = !this.isOn;
  },
  supValue: function(){
    this.onValue = parseInt(this.onValue) - 1;
  },
  addValue: function(){
    this.onValue = parseInt(this.onValue) + 1;
  },
  onValueChanged: function(){
    if(this.isOn){
      this.value = parseInt(this.onValue);
    }

    if(!gCurrentSongPath)
      return;


    var key = gCurrentSongPath + 'onoffValue' + this.dbQuery + "onValue";
    var obj = {};
    obj[key] = this.onValue;
    chrome.storage.local.set(obj);

  },
  isOnChanged: function(){

    if(this.isOn){
      this.shadowRoot.querySelector('toggle-button').selected = true;
      this.value = parseInt(this.onValue);
    } else {
      this.shadowRoot.querySelector('toggle-button').selected = false;
      this.value = parseInt(this.offValue);
    }

    if(!gCurrentSongPath)
      return;

    var key = gCurrentSongPath + 'onoffValue' + this.dbQuery + "isOn";
    var obj = {};
    obj[key] = this.isOn;
    chrome.storage.local.set(obj);
  }
});