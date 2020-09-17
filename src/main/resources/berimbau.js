////////////////////////MODEL //////////////////////////////////////



////////DOM CACHING//////////////////
var typeSelect;

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");
	initAudio();

    chiInput = document.getElementById('chiInput');
	if (window.innerWidth < window.innerHeight) {
        chiInput.width  = chiInput.innerWidth;
    } else {
        chiInput.width  = window.innerHeight;
    }

    typeSelect = document.getElementById('typeSelect');


    //register key handlers
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);


  }

})(window, document, undefined);



///////////////INPUT HANDLING/////////////////////////////////////////

function keyDownHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
    if (event.keyCode >= 48 && event.keyCode <= 57) {

	}
}

function keyUpHandler(event) {
}



//////////////////////////// CONFIGURATION ////////////////////////////

////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const chiURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/chi.mp3";
const dinURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/din.mp3";
const donURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/don.mp3";
const mimeCodec = 'audio/mpeg';
var gain;
var synthDelay;

var chiAudioElement;
var dinAudioElement;
var donAudioElement;
var chiTrack;
var dinTrack;
var donTrack;

function playChi() {
    audioCtx.resume();
    chiAudioElement.pause();
    chiAudioElement.currentTime = 0;
    chiAudioElement.play();
}
function playDin() {
    audioCtx.resume();
    dinAudioElement.pause();
    dinAudioElement.currentTime = 0;
    dinAudioElement.play();
}
function playDon() {
    audioCtx.resume();
    donAudioElement.pause();
    donAudioElement.currentTime = 0;
    donAudioElement.play();
}

function initAudio() {
        gain = audioCtx.createGain();
        //set a very low gain value to  make it as quiet as possible
        gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gain.connect(audioCtx.destination);

        chiAudioElement = document.getElementById('chiAudio');
        var chiSource = new MediaSource();
        chiAudioElement.src = URL.createObjectURL(chiSource);
        chiSource.addEventListener('sourceopen', (evt) => sourceOpen(chiSource,chiURL));
        chiTrack = audioCtx.createMediaElementSource(chiAudioElement);
        chiTrack.connect(gain);

        dinAudioElement = document.getElementById('dinAudio');
        var dinSource = new MediaSource();
        dinAudioElement.src = URL.createObjectURL(dinSource);
        dinSource.addEventListener('sourceopen', (evt) => sourceOpen(dinSource,dinURL));
        dinTrack = audioCtx.createMediaElementSource(dinAudioElement);
        dinTrack.connect(gain);

        donAudioElement = document.getElementById('donAudio');
        var donSource = new MediaSource();
        donAudioElement.src = URL.createObjectURL(donSource);
        donSource.addEventListener('sourceopen', (evt) => sourceOpen(donSource,donURL));
        donTrack = audioCtx.createMediaElementSource(donAudioElement);
        donTrack.connect(gain);

}

function sourceOpen (mediaSource,url) {
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(url, function (buf) {
    sourceBuffer.addEventListener('updateend', function (_) {
      mediaSource.endOfStream();
    });
    sourceBuffer.appendBuffer(buf);
  });
};

function fetchAB (url, cb) {
  console.log(url);
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
};





