////////////////////////MODEL //////////////////////////////////////
const angola = ['chi', 'chi', 'don', 'din'];
const angolaDelay = [250,400,600,1000];
const saoBentoPeq = ['chi', 'chi', 'din', 'don'];
const saoBentoPeqDelay = [250,400,500,1000];
const saoBentoGrande = ['chi', 'chi', 'din', 'don', 'don'];
const saoBentoGrandeDelay = [250,400,500,500,500];
const benguela = ['chi', 'chi', 'don', 'din', 'din'];
const benguelaDelay = [250,400,600,500,500];
const santaMaria = ['chi', 'chi', 'don', 'don', 'don', 'don', 'chi', 'chi', 'don', 'don', 'don', 'din', 'chi', 'chi','din', 'din','din', 'din','chi', 'chi', 'din', 'din','din', 'don'];
const santaMariaDelay = [400,300,600,300,300,400,400,300,600,300,300,400,400,300,600,300,300,400,400,300,600,300,300,400];
const cavalaria = ['don', 'chi', 'don', 'chi', 'don', 'chi', 'don', 'din', 'don', 'chi', 'don', 'don', 'don', 'don', 'don', 'don', 'don', 'din', 'don', 'chi'];
const cavalariaDelay = [250,400,500,500,500,250,400,500,500,500,250,400,500,500,500,250,400,500,500,500];
const amazonas = ['chi', 'chi', 'don', 'don','din','', 'chi', 'chi', 'don', 'chi','don','din', 'chi', 'chi', 'don', 'don','don','don','din', 'don', 'chi', 'don','don','din'];
const amazonasDelay = [250,600,500,500,500,500,250,600,600,400,400,400,250,400,400,400,400,400,400,400,600,400,400,900];
const iuna = ['doinch', 'doinch', 'doinch', 'doinch', 'doinch', 'chi', 'don', 'doinch', 'doinch', 'don', 'don', 'don', 'don', 'doinch', 'doinch','doinch', 'don', 'chi', 'don', 'doinch'];
const iunaDelay = [500,500,500,500,800,400,500,500,900,300,300,300,300,500,500,800,600,500,500,900];
const saoBentoGrandeReg = ['chi', 'chi', 'don', 'don', 'din'];
const saoBentoGrandeRegDelay = [250,400,500,500,500];
const saoBentoGrandeBimba = ['chi', 'chi', 'don', 'chi', 'din', 'chi', 'chi', 'don', 'don', 'din'];
const saoBentoGrandeBimbaDelay = [250,400,500,500,500,250,400,500,500,500];
const idalina = ['don', 'don', 'din', 'don', 'don', 'chi', 'din'];
const idalinaDelay = [400,400,700,400,600,300,600];

const toqueArray = [angola, saoBentoPeq, saoBentoGrande, benguela, santaMaria, cavalaria,amazonas,iuna, saoBentoGrandeReg, saoBentoGrandeBimba, idalina];
const toqueDelayArray = [angolaDelay, saoBentoPeqDelay, saoBentoGrandeDelay, benguelaDelay, santaMariaDelay, cavalariaDelay,amazonasDelay,iunaDelay, saoBentoGrandeRegDelay, saoBentoGrandeBimbaDelay, idalinaDelay];

const toqueBeatArray = [4,4,5,5,6,5,6,5,5,5,3];
const MAX_NOTE = 5;
////////DOM CACHING//////////////////
var typeSelect;
var beatSelect;
var caxixiSelect;
var inputSelect;
var logInput;
const inputElement=[];
var currentNote = 0;
(function(window, document, undefined){
window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	console.log("init");

	//Cache DOMs
    typeSelect = document.getElementById('typeSelect');
    beatSelect = document.getElementById('beatSelect');
    caxixiSelect = document.getElementById('caxixiSelect');
    inputSelect = document.getElementById('inputSelect');
    logInput = document.getElementById('logInput');


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
var accelerometer = null;
var gyroscope=null;
var orientationSensor = null;
var lightSensor = null;
function changeInput() {
    if (inputSelect.value == 2) {
        initSensors();
    }

}

const ACCEL_X_THRESHOLD=-20;
const ACCEL_Z_THRESHOLD=-10;
const ACCEL_CHI = -5;
const ACCEL_DON = -40;
const ACCEL_DIN = -20;
const ACCEL_FREQ = 60;
var lastAccelX = 0;
function initSensors() {


    accelerometer = new Accelerometer({frequency: ACCEL_FREQ});

    accelerometer.addEventListener('reading', () => {
      if (accelerometer.x > lastAccelX && lastAccelX < ACCEL_CHI )
      {
        logInput.value=accelerometer.x + "|" + lastAccelX
        if (lastAccelX < ACCEL_DON) {
            play(1);
        }else if(lastAccelX < ACCEL_DIN) {
            play(2);
        } else if (lastAccelX < ACCEL_CHI) {
            play(0)
        }
        lastAccelX = 0;
      } else {
        lastAccelX = accelerometer.x;
      }
      /*
      if (accelerometer.x < ACCEL_X_THRESHOLD && !beatPlayed) {
        logInput.value=accelerometer.x + "|" + accelerometer.y + "|" + accelerometer.z;
        //accel enough to play
        if (accelerometer.y < ACCEL_Z_THRESHOLD) {
           play(1);
        } else if (accelerometer.y > Math.abs(ACCEL_Z_THRESHOLD)) {
           play(2);
        } else {
           play(0);
        }
        //prevent same movement to play more than once
        beatPlayed = true;
      }
      if (accelerometer.x > ACCEL_X_THRESHOLD && beatPlayed) {
        //acceleration decreased, allow new beat
        beatPlayed = false;
      }*/
    });
    accelerometer.addEventListener('error', error => {
      if (event.error.name == 'NotReadableError') {
        document.getElementById("logInput").value="Accel is not available.";
      }
    });

    accelerometer.start();



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
    document.getElementById("source0").src = "https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/" + typeValue + "-chi.mp3";
    audioElement[0].load;
    document.getElementById("source1").src ="https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/" + typeValue + "-don.mp3";
    audioElement[1].load();
    document.getElementById("source2").src = "https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/" + typeValue + "-din.mp3";
    audioElement[2].load();
    console.log("audio src changed");
}
////////////////////// audio ctrl //////////////////////

// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext);
const reverbImpulseURL = "https://cors-anywhere.herokuapp.com/https://github.com/jaimecasero/berimbauJS/raw/master/src/main/resources/factory.hall.wav";
var gain;
var convolver;
var synthDelay;

const audioElement = [];

var playing = false;
function playToque() {
    playing = true;
    setTimeout(playNextNote, 0, 0);
}


function playNextNote(noteIndex) {
    var note = -1;
    if (toqueArray[beatSelect.value][noteIndex] == 'chi') {
        note = 0;
    } else if (toqueArray[beatSelect.value][noteIndex] == 'don') {
        note = 1;
    } else if (toqueArray[beatSelect.value][noteIndex] == 'din') {
        note = 2;
    } else if (toqueArray[beatSelect.value][noteIndex] == 'doinch') {
        note = 3;
    }
    if (note >= 0) {
        play(note);
    }
    if (playing) {
        var nextNote = noteIndex + 1;
        if (nextNote >= toqueArray[beatSelect.value].length) {
            nextNote = 0;
        }
        setTimeout(playNextNote, toqueDelayArray[beatSelect.value][noteIndex], nextNote);
    }
}
function stop() {
    playing = false;
}



function play(noteNumber) {
    console.log(noteNumber);
    audioCtx.resume();
    //interrupt all sounds, berimbau has a single string, only one sound
    for (var i = 0 ; i < noteNumber ; i++) {
        audioElement[noteNumber].pause();
    }
    audioElement[noteNumber].currentTime = 0;
    audioElement[noteNumber].play();
    checkNoteMatch(noteNumber);
    if (caxixiSelect.value == 0) {
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

    for (var i = 0; i < MAX_NOTE; i++) {

        audioElement[i] = document.getElementById('audio' + i);
        console.log("audio element found");
    };


    console.log("audio started")
}