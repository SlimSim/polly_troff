Polymer("v-slider-value", {
  value: 0,
  startValue: 0,
  amount: 5,
  updateQuery: "null",
  min: 0,
  max: 100,
  name: "slider",
  ready: function(){
    this.startValue = this.value;
    if(this.min > this.max) this.min = this.max-10;
  },
  recall: function(){
    if(!gCurrentSongPath)
      return;
    var key = gCurrentSongPath + 'sliderValue' + this.updateQuery;
    var thisVerticalSliderValue = this;
    chrome.storage.local.get(key, function(res){
      thisVerticalSliderValue.value = res[key] || thisVerticalSliderValue.startValue;
    });
  },
  valueChanged: function(){


    if(parseInt(this.value) > this.max) this.value = this.max;
    if(parseInt(this.value) < this.min) this.value = this.min;


    if(!gCurrentSongPath) return;
    if(!document.querySelector('audio, video')) return;
    document.querySelector('audio, video')[this.updateQuery] = this.value / 100;

    var key = gCurrentSongPath + 'sliderValue' + this.updateQuery;
    var obj = {};
    obj[key] = this.value;
    chrome.storage.local.set(obj);
  },
  setOrgValue: function(){
    this.value = this.startValue;
  },
  supValue: function(){
    this.value = parseInt(this.value) - this.amount;
  },
  addValue: function(){
    this.value = parseInt(this.value) + this.amount;
  }
});

