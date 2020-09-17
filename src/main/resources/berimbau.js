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

var gain;


var chiAudioElement;
var dinAudioElement;
var donAudioElement;
var chiTrack;
var dinTrack;
var donTrack;

function playChi() {
    audioCtx.resume();
    chiAudioElement.play();
}
function playDin() {
    audioCtx.resume();
    dinAudioElement.play();
}
function playDon() {
    audioCtx.resume();
    donAudioElement.play();
}

function initAudio() {
        gain = audioCtx.createGain();
        //set a very low gain value to  make it as quiet as possible
        gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gain.connect(audioCtx.destination);

        chiAudioElement = document.getElementById('chiAudio');
        chiTrack = audioCtx.createMediaElementSource(chiAudioElement);
        chiTrack.connect(gain);
        dinAudioElement = document.getElementById('dinAudio');
        dinTrack = audioCtx.createMediaElementSource(dinAudioElement);
        dinTrack.connect(gain);
        donAudioElement = document.getElementById('donAudio');
        donTrack = audioCtx.createMediaElementSource(donAudioElement);
        donTrack.connect(gain);

}





