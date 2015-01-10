Polymer("troff-dialogs", {
  ready: function(){

  },
  openHelp: function(){
    this.$.helpDialog.toggle();
  },
  openKeyboardShortcuts: function(){
    this.$.keyboardShortcuts.toggle();
  },
  openShareApp: function(){
    this.$.shareApp.toggle();
  },
  openShareMarkers: function(){
    this.$.shareMarkers.toggle();
  }
});
