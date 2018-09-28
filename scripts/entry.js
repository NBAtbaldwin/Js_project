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
  let metButton = document.getElementById('metronome');
  let recordButton = document.getElementById('record');

  let metronome = null;

  metButton.addEventListener('click', (e) => {
    if ( metronome === null || metronome === 'undefined' || metronome.playing === false) {
      return;
    } else if(metronome.metronomePlaying === true) {
      metronome.metronomePlaying = false;
      return;
    }
    metronome.metronomePlaying = true;
  });

  playButton.addEventListener('click', (e) => {
    if (metronome === null) {
      metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
      metronome.tempoEventListener();
      metronome.handlePlay();
      metronome.playing = true;
    } else if(metronome.playing === true) {
      metronome.metronomePlaying = false;
      metronome.stop();
      metronome = null;
      return;
    }
  });

  recordButton.addEventListener('click', (e) => {
    if (metronome === null) {
      metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
      metronome.tempoEventListener();
      metronome.keyHitEventListener();
      metronome.handlePlay();
      metronome.playing = true;
      metronome.recording = true;
    } else if (metronome.recording === true) {
      metronome.recording = false;
    } else if (metronome.playing === true) {
      metronome.recording = true;
      metronome.keyHitEventListener();
    }

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
