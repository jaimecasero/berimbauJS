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
var caxixiSelect;
var inputSelect;
const inputElement=[];
var currentNote = 0;

(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

    //cachec inputs and register touch
    for (var i = 0; i < MAX_NOTE; i++) {
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
    inputElement[3].addEventListener('touchstart', function(event) {
          event.preventDefault();
          //resume audiocontext on canvas touch
          audioCtx.resume();
          play(3);
    }, false);
    inputElement[4].addEventListener('touchstart', function(event) {
          event.preventDefault();
          //resume audiocontext on canvas touch
          audioCtx.resume();
          play(4);
    }, false);



	initAudio();


    typeSelect = document.getElementById('typeSelect');
    beatSelect = document.getElementById('beatSelect');
    caxixiSelect = document.getElementById('caxixiSelect');
    inputSelect = document.getElementById('inputSelect');

    //register key handlers
	document.addEventListener("keydown",keyDownHandler, false);
	document.addEventListener("keyup",keyUpHandler, false);

     changeBeat();
     changeType();

     console.log("initiated");
  }

})(window, document, undefined);




///////////////INPUT HANDLING/////////////////////////////////////////

const ONE_ASCII = 49;
function keyDownHandler(event) {
	var remainderFrom1 = event.keyCode % ONE_ASCII;
	play(remainderFrom1);
}

function keyUpHandler(event) {
}

var lastXAccel = 0;
var beatPlayed = false;
var lastYQuaternation=0;

function changeInput() {
    if (inputSelect.value == 2) {
        let acl = new Accelerometer({frequency: 60});

        acl.addEventListener('reading', () => {
          document.getElementById('logInput').value = acl.x + "," + acl.y + "," + acl.z;
          if (acl.x < -5 && !beatPlayed) {
            //accel enough to play
            play(0);
            //prevent same movement to play more than once
            beatPlayed = true;
          }
          if (acl.x > -5 && beatPlayed) {
            //acceleration decreased, allow new beat
            beatPlayed = false;
          }
        });
        acl.addEventListener('error', error => {
          if (event.error.name == 'NotReadableError') {
            document.getElementById("logInput").value="Accel is not available.";
          }
        });

        acl.start();

        const options = { frequency: 60, referenceFrame: 'device' };
        const sensor = new AbsoluteOrientationSensor(options);

        sensor.addEventListener('reading', () => {
          // model is a Three.js object instantiated elsewhere.
          lastYQuaternation =sensor.quaternion.y;
        });
        sensor.addEventListener('error', error => {
          if (event.error.name == 'NotReadableError') {
            document.getElementById("logInput").value="Orientation is not available.";
          }
        });
        sensor.start();

    }

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
const noteUrl = [chiURL, donURL, dinURL,doinchURL, caxixiURL];
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
    if (caxixiSelect.value == 0) {
        audioElement[4].pause();
        audioElement[4].currentTime = 0;
        audioElement[4].play();

    }

}

function checkNoteMatch(noteNumber) {
    var beatIndex = beatSelect.value;
    var remainder = currentNote % toqueBeatArray[beatIndex];
    var row = Math.floor(currentNote / toqueBeatArray[beatIndex]);
    var noteInput = document.getElementById("note" + row + remainder );
    var color = "green";
    if ((noteNumber == 0 && toqueArray[beatIndex][currentNote] == 'chi') ||
    (noteNumber == 1 && toqueArray[beatIndex][currentNote] == 'don') ||
    (noteNumber == 2 && toqueArray[beatIndex][currentNote] == 'din') ||
    (noteNumber == 3 && toqueArray[beatIndex][currentNote] == 'doinch')) {
        color = "green";
        currentNote = currentNote + 1;

    } else {
        color = "red";
    }
    noteInput.style.backgroundColor = color;
    //skip next note if is silence/empty
    if (toqueArray[beatIndex][currentNote] == '') {
        currentNote = currentNote + 1;
    }
    if (currentNote >= toqueArray[beatIndex].length) {
        currentNote = 0;
        changeBeat();
    }
}


function initAudio() {
    console.log("init audio");
    gain = audioCtx.createGain();
    console.log("gain crated");

    //set a very low gain value to  make it as quiet as possible
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gain.connect(audioCtx.destination);
    convolver = audioCtx.createConvolver();
    convolver.connect(gain);
    console.log("convolver crated");

    loadImpulse(reverbImpulseURL);
    console.log("impulse loaded");

    for (var i = 0; i < MAX_NOTE; i++) {

        audioElement[i] = document.getElementById('audio' + i);
        console.log("audio element found");
    };


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