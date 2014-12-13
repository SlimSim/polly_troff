Polymer("select-button", {
  ready: function(){
    this.selected = this.selected || false;
  },
  selectedChanged: function(){
    if(this.selected){
      this.shadowRoot.getElementById('butt').raised = true;
      this.shadowRoot.getElementById('butt').classList.add("selected");
    } else {
      this.shadowRoot.getElementById('butt').raised = false;
      this.shadowRoot.getElementById('butt').classList.remove("selected");
    }
  }
});


