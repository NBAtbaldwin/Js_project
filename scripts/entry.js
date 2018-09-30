import Metronome from './metronome';
import * as SceneUtil from './createScene';
import SoundUtil from './soundUtil';
import * as PlayUtil from './playUtil';
import * as PadsUtil from './createPads';


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
  PadsUtil.createPads();

  const playButton = document.getElementById('play');
  const metButton = document.getElementById('metronome');
  const recordButton = document.getElementById('record');
  const clearNodeList = document.getElementsByClassName('clear');
  const tempoField = document.getElementById('tempo');
  const chordNodeList = document.getElementsByClassName('chord');
  const monoNodeList = document.getElementsByClassName('mono');
  const tempoSlide = document.getElementById('tempo-slide');
  const pads = document.querySelectorAll('.pad');
  let metronome = null;

  metButton.addEventListener('click', (e) => {
    if ( metronome === null || metronome === 'undefined' || metronome.playing === false) {
      return;
    } else if(metronome.metronomePlaying === true) {
      metronome.metronomePlaying = false;
      metButton.classList.remove('selected');
      return;
    }
    metronome.metronomePlaying = true;
    metButton.classList.add('selected');
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
      metButton.classList.remove('selected');
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
      playButton.classList.add('selected');
    } else if(metronome.playing === true) {
      metronome.metronomePlaying = false;
      metronome.stop();
      playButton.classList.remove('selected');
      metButton.classList.remove('selected');
      recordButton.classList.remove('selected');
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
      soundFactory.generateChord(idx);
      node.classList.add('selected');
      Array.from(chordNodeList).forEach((node2, idx2) => {
        if (idx !== idx2) {
          node2.classList.remove('selected');
        }
      });
    });
  });

  Array.from(monoNodeList).forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      soundFactory.generateMono(idx);
      node.classList.add('selected');
      Array.from(monoNodeList).forEach((node2, idx2) => {
        if (idx !== idx2) {
          node2.classList.remove('selected');
        }
      });
    });
  });

  Array.from(clearNodeList).forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      PlayUtil.clearScene(idx);
    });
  })

  window.addEventListener('keydown', (e) => {
    let targetKey = document.querySelector(`div[data-key="${e.keyCode}"]`);
    targetKey.classList.add('play');
  });

  pads.forEach((pad) => {
    pad.addEventListener('transitionend', () => {
      pad.classList.remove('play')
    })
  })

}
