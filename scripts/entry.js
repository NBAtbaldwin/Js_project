import Metronome from './metronome';
import createScene from './createScene';

let drumKitBuffers;
let context;
let audioBufferSourceNode;

const keyCodes = [65, 83, 68, 70, 71, 72, 74, 75];

window.addEventListener('load', init, false);
function init() {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();

  const drumKitSoundNames = [
          '808bass2',
          'Kick',
          'snare',
          'clap',
          'hat',
          'click',
          'keyboard',
          'pianoChordE',
      ];
  drumKitBuffers = {};
  drumKitSoundNames.forEach((soundName, idx) => {
    fetch('https://raw.githubusercontent.com/NBAtbaldwin/Js_project/master/assets/drum_kit/' + soundName + '.wav')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        context.decodeAudioData(buffer, decoded => {
          drumKitBuffers[keyCodes[idx]] = decoded;
        });
      })
  });

  createScene();

  let playButton = document.getElementById('play');
  let stopButton = document.getElementById('stop');
  let metButton = document.getElementById('metronome');
  let recordButton = document.getElementById('record');

  let metronome;

  metButton.addEventListener('click', (e) => {
    if (!Array.from(playButton.classList).join('').includes("playing")) {
      return;
    }
    
    // metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
    // metronome.tempoEventListener();
    // metronome.handlePlayWithMetronome();

  });

  playButton.addEventListener('click', (e) => {
    if (Array.from(playButton.classList).join('').includes("playing")) {
      return;
    }
    metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
    metronome.tempoEventListener();
    metronome.handlePlay();
    playButton.classList.add("playing")
  });

  stopButton.addEventListener('click', (e) => {
    if (!Array.from(playButton.classList).join('').includes("playing")) {
      return;
    }
    metronome.stop();
    metronome = null;
    playButton.classList.remove("playing");
    recordButton.classList.remove("recording");

  });

  recordButton.addEventListener('click', (e) => {
    if (Array.from(playButton.classList).join('').includes("playing")) {
      return;
    }
    if (Array.from(recordButton.classList).join('').includes("recording")) {
      return;
    }
    metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
    metronome.tempoEventListener();
    // metronome.keyHitEventListener();
    metronome.handleRecord();
    playButton.classList.add("playing");
    recordButton.classList.add("recording");
  });

}

// function playSound(buffer, time) {
//   var source = context.createBufferSource();
//   source.buffer = buffer;
//   source.connect(context.destination);
//   source.start(time);
// }

window.addEventListener('keydown', function(e) {
  audioBufferSourceNode = context.createBufferSource();
  let code = e.keyCode;
  audioBufferSourceNode.buffer = drumKitBuffers[code];
  audioBufferSourceNode.connect(context.destination);
  audioBufferSourceNode.start();
});
