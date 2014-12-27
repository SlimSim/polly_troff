Polymer("toggle-button", {
  ready: function(){
    this.selected = this.selected==""?true:this.selected || false;
  },
  select: function(){
    if(this.selected){
      this.selected = false;
    } else {
      this.selected = true;
    }
  },
  selectedChanged: function(){
    if(this.selected){
      this.shadowRoot.getElementById('butt').raised = true;
      this.shadowRoot.getElementById('butt').classList.add("selectedToggleColor");
    } else {
      this.shadowRoot.getElementById('butt').raised = false;
      this.shadowRoot.getElementById('butt').classList.remove("selectedToggleColor");
    }
  }
});


