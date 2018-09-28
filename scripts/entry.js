import Metronome from './metronome';
import * as SceneUtil from './createScene';

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

  SceneUtil.createScenes();

  let playButton = document.getElementById('play');
  let metButton = document.getElementById('metronome');
  let recordButton = document.getElementById('record');
  let clearButton = document.getElementById('clear');
  let tempoField = document.getElementById('tempo');
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
      metronome = new Metronome(drumKitBuffers, context, parseInt(document.getElementById('tempo').value), keyCodes);
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

  window.addEventListener('keydown', (e) => {
    if (e.keyCode !== 32) {
      return;
    }
    if (metronome === null) {
      metronome = new Metronome(drumKitBuffers, context, parseInt(document.getElementById('tempo').value), keyCodes);
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
      metronome = new Metronome(drumKitBuffers, context, parseInt(document.getElementById('tempo').value), keyCodes);
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

  clearButton.addEventListener('click', (e) => {
    const master = document.getElementById("sequence-master");
    const rows = master.childNodes;
    rows.forEach((row, rowIdx) => {
      row.childNodes.forEach((col, colIdx) => {
        col.classList.remove('selected');
      })
    })
  });

  tempoField.addEventListener('change', (e) => {
    console.log(e.target.value);
  })

}

window.addEventListener('keydown', function(e) {
  audioBufferSourceNode = context.createBufferSource();
  let code = e.keyCode;
  audioBufferSourceNode.buffer = drumKitBuffers[code];
  audioBufferSourceNode.connect(context.destination);
  audioBufferSourceNode.start();
});

// const getTempo = () => {
//   const input = document.getElementById("tempo");
//   console.log(input.value);
// }
