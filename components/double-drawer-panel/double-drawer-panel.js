    Polymer("double-drawer-panel", {
      ready: function(){
        var thisDoubleDrawer = this;
        document.querySelector(".leftMenueToggle").addEventListener('click', function(){
          thisDoubleDrawer.shadowRoot.querySelector("#left").togglePanel();
        })
        document.querySelector(".rightMenueToggle").addEventListener('click', function(){
          thisDoubleDrawer.shadowRoot.querySelector("#right").togglePanel();

        })
      }
    });
