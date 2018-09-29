import Metronome from './metronome';
import * as SceneUtil from './createScene';
import SoundUtil from './soundUtil';

let context;
let audioBufferSourceNode;

window.addEventListener('load', init, false);
function init() {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
  const soundFactory = new SoundUtil(context);
  soundFactory.generateDrums();
  soundFactory.generateChord(2);
  soundFactory.generateMono(1);

  soundFactory.keyDownEventListener();

  SceneUtil.createScenes();

  let playButton = document.getElementById('play');
  let metButton = document.getElementById('metronome');
  let recordButton = document.getElementById('record');
  let clearButton = document.getElementById('clear');
  let tempoField = document.getElementById('tempo');
  let chordNodeList = document.getElementsByClassName('chord');
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
      metronome = new Metronome(soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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
      metronome = new Metronome(soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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
      metronome = new Metronome(soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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

  Array.from(chordNodeList).forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      soundFactory.generateChord(idx)
    })
  })

}
