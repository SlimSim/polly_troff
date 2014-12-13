/**
 * Listens for the app launching then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    	{innerBounds: {width:900, height:600, minWidth:200, maxWidth: 1920, minHeight:200, maxHeight: 1080}, id:"MGExp"},
    	function(app_win) {
    		app_win.contentWindow.__MGA__bRestart = false;
    	}
    );
    console.log("app launched");
});



/* mediagallery original:
chrome.app.runtime.onLaunched.addListener(function(data) {
    chrome.app.window.create('page.html',
    	{innerBounds: {width:900, height:600, minWidth:900, maxWidth: 900, minHeight:600, maxHeight: 600}, id:"MGExp"},
    	function(app_win) {
    		app_win.contentWindow.__MGA__bRestart = false;
    	}
    );
    console.log("app launched");
});

chrome.app.runtime.onRestarted.addListener(function() {
    chrome.app.window.create('page.html',
    	{innerBounds: {width:900, height:600, minWidth:900, maxWidth: 900, minHeight:600, maxHeight: 600}, id:"MGExp"},
    	function(app_win) {
    		app_win.contentWindow.__MGA__bRestart = true;
    	}
    );
    console.log("app restarted");
});
*/