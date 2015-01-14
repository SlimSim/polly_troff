var gGalleryIndex = 0;     // gallery currently being iterated
var gGalleryReader = null; // the filesytem reader for the current gallery
var gDirectories = [];     // used to process subdirectories
var gGalleryArray = [];    // holds information about all top-level Galleries found - list of DomFileSystem
var gGalleryData = [];     // hold computed information about each Gallery
var gCurOptGrp = null;
var imgFormats = ['png', 'bmp', 'jpeg', 'jpg', 'gif', 'png', 'svg', 'xbm', 'webp'];
var audFormats = ['wav', 'mp3'];
var vidFormats = ['3gp', '3gpp', 'avi', 'flv', 'mov', 'mpeg', 'mpeg4', 'mp4', 'ogg', 'webm', 'wmv'];


var gCurrentSongPath = "";

function recallAllPolymers(){
  document.getElementById('markerList').recall();
  document.querySelector('num-pad').recall();
  document.getElementById('taptempo').recall();
  document.getElementById('speedVal').recall();
  document.getElementById('volumeVal').recall();
  document.querySelector('#pauseBefStart').recall();
  document.querySelector('#startBefore').recall();
  document.querySelector('#stopAfter').recall();
  document.querySelector('#pauseBetweenLoops').recall();

  document.querySelector('#playButton').icon = "av:play-arrow";
}
function setSongMetadata(media){
  document.getElementById('markerList').setSongMetadata(media);
  var speed = document.querySelector('#speedVal').value;
  var volume = document.querySelector('#volumeVal').value;
  var mediaPlayer = document.querySelector('audio, video');
  mediaPlayer.playbackRate = speed/100;
  mediaPlayer.volume = volume/100;
}

function errorPrintFactory(custom) {
   return function(e) {
      var msg = '';

      switch (e.code) {
         case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
         case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
         case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
         case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
         case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
         default:
            msg = 'Unknown Error';
            break;
      };

      console.error(custom + ': ' + msg);
   };
}

function GalleryData(id) {
   this._id = id;
   this.path = "";
   this.sizeBytes = 0;
   this.numFiles = 0;
   this.numDirs = 0;
}

function addImageToContentDiv() {
   var content_div = document.getElementById('content');
   var image = document.createElement('img');
   image.style["max-width"] = "100%";
   image.style["max-height"] = "200px";

   content_div.appendChild(image);
   return image;
}

function addAudioToContentDiv() {
   var content_div = document.getElementById('content');
   var audio = document.createElement('audio');

   audio.addEventListener('loadedmetadata', function(e){
     setSongMetadata(audio);
   })
   content_div.appendChild(audio);
   return audio;
}

function addVideoToContentDiv() {
   var content_div = document.getElementById('content');
   var videoBox = document.createElement('div');
   var video = document.createElement('video');
   var fsButton = document.createElement('toggle-button');

   fsButton.addEventListener('click', Troff.playInFullscreenChanged);

   fsButton.appendChild(document.createTextNode('Play in Fullscreen') );
   fsButton.setAttribute('id', "playInFullscreenButt")
   videoBox.setAttribute('id', "videoBox");

   video.addEventListener('loadedmetadata', function(e){
     setSongMetadata(video);
    Troff.playInFullscreenRecall();
   })

   content_div.appendChild(fsButton);
  videoBox.appendChild(video);
   content_div.appendChild(videoBox);
   return video;
}

function getFileType(filename) {
   var ext = filename.substr(filename.lastIndexOf('.') + 1).toLowerCase();
   if (imgFormats.indexOf(ext) >= 0)
      return "image";
   else if (audFormats.indexOf(ext) >= 0)
      return "audio";
   else if (vidFormats.indexOf(ext) >= 0)
      return "video";
   else return null;
}

function clearContentDiv() {
   var content_div = document.getElementById('content');
   while (content_div.childNodes.length >= 1) {
      content_div.removeChild(content_div.firstChild);
   }
}

function clearList() {
   document.getElementById("gallery2").innerHTML = "";
}

function setSong(fullPath, galleryId){
  Troff.pauseSong();

  var fsId = galleryId;
  var fs = null;

  // get the filesystem that the selected file belongs to
  for (var i=0; i < gGalleryArray.length; i++) {
    var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(gGalleryArray[i]);
    if (mData.galleryId == fsId) {
      fs = gGalleryArray[i];
      break;
    }
  }
  if (fs) {
      var path = fullPath;

      gCurrentSongPath = path;
      recallAllPolymers();

      var key = "gCurrentSongPath";
      var obj = {};
      obj[key] = gCurrentSongPath;
      chrome.storage.local.set(obj);

      fs.root.getFile(path, {create: false}, function(fileEntry) {
         var newElem = null;
         // show the file data
         clearContentDiv();
         var type = getFileType(path);
         if (type == "image")
            newElem = addImageToContentDiv();
         else if (type == "audio")
            newElem = addAudioToContentDiv();
         else if (type == "video")
            newElem = addVideoToContentDiv();

         if (newElem) {
            // Supported in Chrome M37 and later.
            if (!chrome.mediaGalleries.getMetadata) {
              console.info("I'm in the if, so no metadata...")
              newElem.setAttribute('src', fileEntry.toURL());
            } else {
              console.info("I'm in the else, which means the song-metadata is avaleble, I think???")
              fileEntry.file(function(file) {
                chrome.mediaGalleries.getMetadata(file, {}, function(metadata) {
                  if (metadata.attachedImages.length) {
                    var blob = metadata.attachedImages[0];
                    var posterBlobURL = URL.createObjectURL(blob);
                    newElem.setAttribute('poster', posterBlobURL);
                  } //end if
                  newElem.setAttribute('src', fileEntry.toURL());
                }); // end chrome.mediaGalleries.getMetadata-function
              });//end fileEntry.file-function
            }
         }//end if(newElem)
      });
   }


}
/*
function updateSelection(e) { // site Gammal
console.log("updateSelection -> is this used??? why the comment above...")
   var selList = document.getElementById("GalleryList");
   var indx = selList.selectedIndex;
   var fsId = selList.options[indx].getAttribute("data-fsid");
   var fs = null;

   // get the filesystem that the selected file belongs to
   for (var i=0; i < gGalleryArray.length; i++) {
      var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(gGalleryArray[i]);
      if (mData.galleryId == fsId) {
         fs = gGalleryArray[i];
         break;
      }
   }
   if (fs) {
      var path = selList.options[indx].getAttribute("data-fullpath");
      gCurrentSongPath = path;
      fs.root.getFile(path, {create: false}, function(fileEntry) {
         var newElem = null;
         // show the file data
         clearContentDiv();
         var type = getFileType(path);
         if (type == "image")
            newElem = addImageToContentDiv();
         else if (type == "audio")
            newElem = addAudioToContentDiv();
         else if (type == "video")
            newElem = addVideoToContentDiv();

         if (newElem) {
            // Supported in Chrome M37 and later.
            if (!chrome.mediaGalleries.getMetadata) {
              newElem.setAttribute('src', fileEntry.toURL());
            } else {
              fileEntry.file(function(file) {
                 chrome.mediaGalleries.getMetadata(file, {}, function(metadata) {
                    if (metadata.attachedImages.length) {
                       var blob = metadata.attachedImages[0];
                       var posterBlobURL = URL.createObjectURL(blob);
                       newElem.setAttribute('poster', posterBlobURL);
                    }
                    newElem.setAttribute('src', fileEntry.toURL());
                 });
              });
            }
         }
      });
   }
}
*/
function addGallery(name, id) {
   var optGrp = document.createElement("h3");
   optGrp.appendChild(document.createTextNode(name))
   optGrp.setAttribute("id", id);
   document.getElementById("gallery2").appendChild(optGrp);
   return optGrp;
}

function addItem(itemEntry) {

  if (itemEntry.isFile) {
    itemEntry.getMetadata(function(metadata){
      if(metadata.title || metadata.titel || metadata.artist){
        console.info("Haleluja! The metadata is accessable from here!!!!")
        console.info('artist = ' + metadata.artist);
        console.info('title = ' + metadata.title);
      }
    })
    var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(itemEntry.filesystem);

    var pap = document.createElement("select-button");
    pap.setAttribute("class", "mediaButton");
    pap.appendChild(document.createTextNode(itemEntry.name))
    pap.setAttribute("data-fullpath", itemEntry.fullPath );
    pap.setAttribute("data-fsid", mData.galleryId );
    pap.addEventListener('click', function(a, b, c){
      var songs = document.querySelectorAll('select-button')
      for(var i=0; i<songs.length; i++){
        songs[i].selected = false;
      }
      this.selected = true;
      setSong(itemEntry.fullPath, mData.galleryId)
    });
    if(itemEntry.fullPath == gCurrentSongPath)
      pap.click();

    document.getElementById("gallery2").appendChild(pap);

//      opt.setAttribute("data-fsid", mData.galleryId);
   } else {


    var group = document.createElement("h3");
    gruop.appendChild(document.createTextNode(itemEntry.name))

    document.getElementById("gallery2").appendChild(group);
   }
}

function scanGallery(entries) {
   // when the size of the entries array is 0, we've processed all the directory contents
   if (entries.length == 0) {
      if (gDirectories.length > 0) {
         var dir_entry = gDirectories.shift();
         gGalleryReader = dir_entry.createReader();
         gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries'));
      }
      else {
         gGalleryIndex++;
         if (gGalleryIndex < gGalleryArray.length) {
            scanGalleries(gGalleryArray[gGalleryIndex]);
         }
      }
      return;
   }
   for (var i = 0; i < entries.length; i++) {
      if (entries[i].isFile) {
         addItem(entries[i]);
         gGalleryData[gGalleryIndex].numFiles++;
         (function(galData) {
            entries[i].getMetadata(function(metadata){
               galData.sizeBytes += metadata.size;
            });
         }(gGalleryData[gGalleryIndex]));
      }
      else if (entries[i].isDirectory) {
         gDirectories.push(entries[i]);
      }
      else {
         console.info("Got something other than a file or directory.");
      }
   }
   // readEntries has to be called until it returns an empty array. According to the spec,
   // the function might not return all of the directory's contents during a given call.
   gGalleryReader.readEntries(scanGallery, errorPrintFactory('readMoreEntries'));
}

function scanGalleries(fs) {
   var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(fs);

   gCurOptGrp = addGallery(mData.name, mData.galleryId);
   gGalleryData[gGalleryIndex] = new GalleryData(mData.galleryId);
   gGalleryReader = fs.root.createReader();
   gGalleryReader.readEntries(scanGallery, errorPrintFactory('readEntries'));
}

function getGalleriesInfo(results) {
  clearContentDiv();
  clearList();
  if (results.length) {
    var str = 'Gallery count: ' + results.length + ' ( ';
    results.forEach(function(item, indx, arr) {
       var mData = chrome.mediaGalleries.getMediaFileSystemMetadata(item);

       if (mData) {
          str += mData.name;
          if (indx < arr.length-1)
             str += ",";
          str += " ";
       }
    });
    str += ')';
  //      document.getElementById("status").innerText = str;
    gGalleryArray = results; // store the list of gallery directories
    gGalleryIndex = 0;

  //      document.getElementById("read-button").disabled = "";
  }
  else {
  //      document.getElementById("status").innerText = 'No galleries found';
  //      document.getElementById("read-button").disabled = "disabled";
  }
  if (gGalleryArray.length > 0) {
    scanGalleries(gGalleryArray[0]);
  }

}

window.addEventListener("load", function() {
  chrome.mediaGalleries.getMediaFileSystems({
     interactive : 'if_needed'
  }, getGalleriesInfo);

  document.getElementById('configure-button').addEventListener("click", function() {
    chrome.mediaGalleries.getMediaFileSystems({
      interactive : 'yes'
    }, getGalleriesInfo);
  });
  var key = "gCurrentSongPath";
  chrome.storage.local.get(key, function(res){
    gCurrentSongPath = res[key] || "";
  });

}); // end window load
