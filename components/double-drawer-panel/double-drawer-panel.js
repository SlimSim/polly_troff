    Polymer("double-drawer-panel", {
      ready: function(){
        console.log("Whats up?")
        console.log(document.querySelector(".leftMenueToggle"));


        var thisDoubleDrawer = this;
        document.querySelector(".leftMenueToggle").addEventListener('click', function(){
          thisDoubleDrawer.shadowRoot.querySelector("#left").togglePanel();
        })
        document.querySelector(".rightMenueToggle").addEventListener('click', function(){
          thisDoubleDrawer.shadowRoot.querySelector("#right").togglePanel();

        })
      }
    });
