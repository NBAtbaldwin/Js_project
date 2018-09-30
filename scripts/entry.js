import Metronome from './metronome';
import * as SceneUtil from './createScene';
import SoundUtil from './soundUtil';
import * as PlayUtil from './playUtil';

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
  let clearNodeList = document.getElementsByClassName('clear');
  let tempoField = document.getElementById('tempo');
  let chordNodeList = document.getElementsByClassName('chord');
  let tempoSlide = document.getElementById('tempo-slide');
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
      playButton.classList.add('selected')
    } else if(metronome.playing === true) {
      metronome.metronomePlaying = false;
      metronome.stop();
      metronome = null;
      playButton.classList.remove('selected');
      recordButton.classList.remove('selected');
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
      recordButton.classList.add('selected')
    } else if (metronome.recording === true) {
      metronome.recording = false;
      recordButton.classList.remove('selected')
    } else if (metronome.playing === true) {
      metronome.recording = true;
      recordButton.classList.add('selected')
      metronome.keyHitEventListener();
    }

  });

  tempoSlide.addEventListener('change', (e) => {
    tempoField.value = e.target.value;
  });

  Array.from(chordNodeList).forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      soundFactory.generateChord(idx)
    })
  });

  Array.from(clearNodeList).forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      PlayUtil.clearScene(idx);
    });
  })

}
