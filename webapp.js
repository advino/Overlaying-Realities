// Some code to check if the current device can access user media

function hasGetUserMedia() {
return !!(navigator.mediaDevices &&
navigator.mediaDevices.getUserMedia);
}

if(hasGetUserMedia()) {
console.log('good to go!');

} else {

  alert('getUserMedia aint available');
}


// DOM Elements

var fullScreen = document.getElementById('fullScreen');
var contain = document.getElementById('container');
var video = document.createElement('video');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');
var videoSelect = document.querySelector('select');
var videoContainer = document.createElement('div');

// Some code to cycle through available devices and add them to the select menu

function gotDevices(devices) {

  devices.forEach(function(devices){
    if(devices.kind == 'videoinput') {
      var option = document.createElement('option');
      option.value = devices.deviceId;
      option.id = devices.label;
      option.text = devices.label;
      videoSelect.appendChild(option);
    }
  })
}

// Enumerate the available cameras on the device

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(function(err) {
  console.log(err.name + ": " + err.message);
});

// Some code to source the video stream to the video element

function gotStream(stream) {
  window.stream = stream;
  video.srcObject = stream;
  return navigator.mediaDevices.enumerateDevices();
}

// Some code to launch the app and have the media stream access the selected source

function launchApp() {

  if(window.stream) {
    window.stream.getTracks().forEach(function(tracks){
      tracks.stop();
    });
  }

  var videoSource = videoSelect.value;

  var constraints = {
    audio: false,
    video: {
      deviceId: videoSource,
    }
  }

  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(function(error) {
        console.log('navigator.getUserMedia error: ', error);
  })
}

// Some code to make the app relaunch after changing the source.

videoSelect.addEventListener('change', function() {
    console.log('Launching App');
    launchApp();
});

// Some code to append the video to the main container and to make the element fullscreen

fullScreen.addEventListener('click', function() {
  videoContainer.appendChild(video);
  contain.insertBefore(videoContainer, fullScreen);
  videoContainer.webkitRequestFullScreen();

});
