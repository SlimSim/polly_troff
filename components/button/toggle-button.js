Polymer("toggle-button", {
  ready: function(){
    console.log("this.selected = "+ this.selected);
    this.selected = this.selected==""?true:this.selected || false;
    console.log("this.selected = "+ this.selected);
    this.select();
    this.select();
  },
  select: function(){
    if(this.selected){
      this.shadowRoot.getElementById('butt').raised = false;
      this.selected = false;
      this.shadowRoot.getElementById('butt').classList.remove("selectedToggleColor");
    } else {
      this.selected = true;
      this.shadowRoot.getElementById('butt').raised = true;
      this.shadowRoot.getElementById('butt').classList.add("selectedToggleColor");
    }
  }
});


