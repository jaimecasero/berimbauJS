////////////////////////MODEL //////////////////////////////////////
const angola = ['chi', 'chi', 'don', 'din'];
const saoBentoPeq = ['chi', 'chi', 'din', 'don'];
const saoBentoGrande = ['chi', 'chi', 'din', 'don', 'don'];
const benguela = ['chi', 'chi', 'don', 'din', 'din'];
const santaMaria = ['chi', 'chi', 'don', 'don', 'don', 'don', 'chi', 'chi', 'don', 'don', 'don', 'din', 'chi', 'chi','din', 'din','din', 'din','chi', 'chi', 'din', 'din','din', 'don'];
const cavalaria = ['don', 'chi', 'don', 'chi', 'don', 'chi', 'don', 'din', 'don', 'chi', 'don', 'don', 'don', 'don', 'don', 'don', 'don', 'din', 'don', 'chi'];
const amazonas = ['chi', 'chi', 'don', 'don','din','', 'chi', 'chi', 'don', 'chi','don','din', 'chi', 'chi', 'don', 'don','don','don','din', 'don', 'chi', 'don','don','din'];
const iuna = ['doinch', 'doinch', 'doinch', 'doinch', 'doinch', 'chi', 'don', 'doinch', 'doinch', '', 'don', 'don', 'don', 'don', 'don', 'doinch','doinch', 'chi', 'don', 'doinch', 'doinch'];
const toqueArray = [angola, saoBentoPeq, saoBentoGrande, benguela, santaMaria, cavalaria,amazonas,iuna];
const toqueBeatArray = [4,4,5,5,6,5,6,5];
const MAX_NOTE = 5;
////////DOM CACHING//////////////////
var typeSelect;
var beatSelect;
const inputElement=[];
var currentNote = 0;

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

    //cachec inputs and register touch
    for (var i = 0; i < 3; i++) {
        inputElement[i] = document.getElementById('input' + i);
    }
    //register multitouch listener
    inputElement[0].addEventListener('touchstart', function(event) {
          event.preventDefault();
          //resume audiocontext on canvas touch
          audioCtx.resume();
          play(0);
    }, false);
    //register multitouch listener
    inputElement[1].addEventListener('touchstart', function(event) {
          event.preventDefault();
          //resume audiocontext on canvas touch
          audioCtx.resume();
          play(1);
    }, false);
    //register multitouch listener
    inputElement[2].addEventListener('touchstart', function(event) {
          event.preventDefault();
          //resume audiocontext on canvas touch
          audioCtx.resume();
          play(2);
    }, false);



	initAudio();



    typeSelect = document.getElementById('typeSelect');
    beatSelect = document.getElementById('beatSelect');


    //register key handlers
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);

     changeBeat();
     changeType();

     console.log("initiated");
  }

})(window, document, undefined);



///////////////INPUT HANDLING/////////////////////////////////////////

function keyDownHandler(event) {
	var keyPressed = String.fromCharCode(event.keyCode);
    if (event.keyCode == 49) {
        play(0);
	}
    if (event.keyCode == 50) {
        play(1);
	}
    if (event.keyCode == 51) {
        play(2);
	}
}

function keyUpHandler(event) {
}



//////////////////////////// CONFIGURATION ////////////////////////////
function changeBeat() {
    currentNote = 0;
    clearAllNotes();
    var beatIndex = beatSelect.value;
    console.log("beat" + beatIndex);
    var j = 0;
    for (var i = 0; i < toqueArray[beatIndex].length; i++) {
        var remainder = i % toqueBeatArray[beatIndex];
        var row = Math.floor(i / toqueBeatArray[beatIndex]);
        var noteInput = document.getElementById("note" + row + remainder );
        noteInput.value = toqueArray[beatIndex][i];
    }
}

function clearAllNotes() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 6; j++) {
            var noteInput = document.getElementById("note" + i + j );
            noteInput.value = '';
            noteInput.style.backgroundColor = "white";
        }
    }

}

function changeType() {
    var typeValue = typeSelect.value;
    for (var i = 0; i < audioElement.length; i++) {
        audioElement[i].playbackRate=typeValue;
    }
}
////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const chiURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/chi.mp3";
const dinURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/din.mp3";
const donURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/don.mp3";
const doinchURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/doinch.mp3";
const caxixiURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/caxixi.mp3";
const reverbImpulseURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/factory.hall.wav";
const noteUrl = [chiURL, donURL, dinURL,doinchURL, caxixi];
const mimeCodec = 'audio/mpeg';
var gain;
var convolver;
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
    checkNoteMatch(noteNumber);
}

function checkNoteMatch(noteNumber) {
    var beatIndex = beatSelect.value;
    var remainder = currentNote % toqueBeatArray[beatIndex];
    var row = Math.floor(currentNote / toqueBeatArray[beatIndex]);
    var noteInput = document.getElementById("note" + row + remainder );
    var color = "green";
    if ((noteNumber == 0 && toqueArray[beatIndex][currentNote] == 'chi') ||
    (noteNumber == 1 && toqueArray[beatIndex][currentNote] == 'don') ||
    (noteNumber == 2 && toqueArray[beatIndex][currentNote] == 'din')) {
        color = "green";
        currentNote = currentNote + 1;

    } else {
        color = "red";
    }
    noteInput.style.backgroundColor = color;
    if (currentNote >= toqueArray[beatIndex].length) {
        currentNote = 0;
        changeBeat();
    }
}


function initAudio() {
    console.log("init audio");
    gain = audioCtx.createGain();
    //set a very low gain value to  make it as quiet as possible
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gain.connect(audioCtx.destination);
    convolver = audioCtx.createConvolver();
    convolver.connect(gain);
    loadImpulse(reverbImpulseURL);

    for (var i = 0; i < MAX_NOTE; i++) {

        audioElement[i] = document.getElementById('audio' + i);
        mediaSource[i] = new MediaSource();
        audioElement[i].src = URL.createObjectURL(mediaSource[i]);
    };
    mediaSource[0].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[0],noteUrl[0]));
    mediaSource[1].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[1],noteUrl[1]));
    mediaSource[2].addEventListener('sourceopen', (evt) => sourceOpen(mediaSource[2],noteUrl[2]));

    for (var i = 0; i < MAX_NOTE; i++) {
        track[i] = audioCtx.createMediaElementSource(audioElement[i]);
        track[i].connect(convolver);
    }

    console.log("audio started")
}

var loadImpulse = function ( url )
{
  var request = new XMLHttpRequest();
  request.open( "GET", url, true );
  request.responseType = "arraybuffer";
  request.onload = function ()
  {
    audioCtx.decodeAudioData( request.response, function ( buffer ) {
      convolver.buffer = buffer;
    }, function ( e ) { console.log( e ); } );
  };request.onerror = function ( e )
  {
    console.log( e );
  };
  request.send();
};

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





