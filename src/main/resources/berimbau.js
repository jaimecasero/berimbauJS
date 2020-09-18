////////////////////////MODEL //////////////////////////////////////
const angola = ['chi', 'chi', 'don', 'din'];
const saoBentoPeq = ['chi', 'chi', 'din', 'don'];
const saoBentoGrande = ['chi', 'chi', 'din', 'don', 'don'];
const benguela = ['chi', 'chi', 'don', 'din', 'din'];
const santaMaria = ['chi', 'chi', 'don', 'don', 'don', 'don', 'chi', 'chi', 'don', 'don', 'don', 'din', 'chi', 'chi','din', 'din','din', 'din','chi', 'chi', 'din', 'din','din', 'don'];
const cavalaria = ['don', 'chi', 'don', 'chi', 'don', 'chi', 'don', 'din', 'don', 'chi', 'don', 'don', 'don', 'don', 'don', 'don', 'don', 'din', 'don', 'chi'];
const amazonas = ['chi', 'chi', 'don', 'din'];
const iuna = ['chi', 'chi', 'don', 'din'];

////////DOM CACHING//////////////////
var typeSelect;
const inputElement=[];

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");


    for (var i = 0; i < 3; i++) {
        inputElement[i] = document.getElementById('input' + i);
        //register multitouch listener
        inputElement[i].addEventListener('touchstart', function(event) {
              event.preventDefault();
              //resume audiocontext on canvas touch
              audioCtx.resume();
              play(i);
        }, false);

    }

	initAudio();



    typeSelect = document.getElementById('typeSelect');


    //register key handlers
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);


  }

})(window, document, undefined);



///////////////INPUT HANDLING/////////////////////////////////////////

function keyDownHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
    if (event.keyCode == 49) {
        playChi();
	}
    if (event.keyCode == 50) {
        playDon();
	}
    if (event.keyCode == 51) {
        playDin();
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
const noteUrl = [chiURL, donURL, dinURL];
const mimeCodec = 'audio/mpeg';
var gain;
var synthDelay;

const audioElement = [];
const track = [];
const mediaSource = [];

function play(noteNumber) {
    console.log(noteNumber);
    audioCtx.resume();
    audioElement[noteNumber].pause();
    audioElement[noteNumber].currentTime = 0;
    audioElement[noteNumber].play();
}


function initAudio() {
        gain = audioCtx.createGain();
        //set a very low gain value to  make it as quiet as possible
        gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gain.connect(audioCtx.destination);

        for (var i = 0; i < 3; i++) {

            audioElement[i] = document.getElementById('audio' + i);
            mediaSource[i] = new MediaSource();
            audioElement[i].src = URL.createObjectURL(mediaSource[i]);
        };
        mediaSource[0].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[0],noteUrl[0]));
        mediaSource[1].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[1],noteUrl[1]));
        mediaSource[2].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[2],noteUrl[2]));

        for (var i = 0; i < 3; i++) {
            track[i] = audioCtx.createMediaElementSource(audioElement[i]);
            track[i].connect(gain);
        }


}

function sourceOpen (mediaSource,currentURL) {
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(currentURL, function (buf) {
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





