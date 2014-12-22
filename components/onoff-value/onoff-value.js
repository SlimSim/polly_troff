Polymer("onoff-value", {
  value: 1,
  ready: function(){
    console.log("onoff-value ready ->");
  },
  activeChanged: function(){
    console.log("activeChanged active = " + this.active)
    this.disabled = !this.active;
  },
  supValue: function(){
    this.value = parseInt(this.value) - 1;
  },
  addValue: function(){
    this.value = parseInt(this.value) + 1;
  }
});