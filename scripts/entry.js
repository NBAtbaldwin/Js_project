import masterMetronome from './metronome';
import * as SceneUtil from './createScene';
import SoundUtil from './soundUtil';
import * as PlayUtil from './playUtil';
import * as PadsUtil from './createPads';
import RunDemo from './demo';
import Randomizer from './randomizer';
import Tutorial from './tutorial';


let audioBufferSourceNode;
const keySet = new Set([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187]);

window.addEventListener('load', init, false);
function init() {
  let initialState = {
    context: new AudioContext(),
    drumKitArray: null,
    chordArray: null,
    monoArray: null,
    tempo: 45,
    drumKeyCodes: null,
    chordKeyCodes: null,
    monoKeyCodes: null,
  };

  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  const soundFactory = new SoundUtil(initialState.context);
  soundFactory.generateDrums();
  soundFactory.generateChord(0);
  soundFactory.generateMono(0);

  initialState.drumKitArray = soundFactory.drumKitBuffers;
  initialState.chordArray = soundFactory.chordBuffers;
  initialState.monoArray = soundFactory.monoBuffers;
  initialState.drumKeyCodes = soundFactory.drumKeyCodes;
  initialState.chordKeyCodes = soundFactory.chordKeyCodes;
  initialState.monoKeyCodes = soundFactory.monoKeyCodes;

  soundFactory.keyDownEventListener();

  SceneUtil.createScenes();
  PadsUtil.createPads();
  const tutorial = new Tutorial();
  tutorial.initialize();

  const playButton = document.getElementById('play');
  const metButton = document.getElementById('metronome');
  const recordButton = document.getElementById('record');
  const clearNodeList = document.getElementsByClassName('clear');
  const tempoField = document.getElementById('tempo');
  const chordNodeList = document.getElementsByClassName('chord');
  const monoNodeList = document.getElementsByClassName('mono');
  const e = document.getElementById('tempo-slide');
  const pads = document.querySelectorAll('.pad');
  let metronome = null;
  const helpButton = document.getElementById('help');

  helpButton.addEventListener('click', () => {
    tutorial.initialize();
  })

  metButton.addEventListener('click', (e) => {
    if(metButton.classList.contains('selected')) {
      metButton.classList.remove('selected');
      metronome === null ? null : metronome.getState().playing ? metronome.setState({ metronomePlaying: false }) : null;
    } else {
      metButton.classList.add('selected');
      metronome === null ? null : metronome.getState().playing ? metronome.setState({ metronomePlaying: true }) : null;
    }
  });

  playButton.addEventListener('click', (e) => {
    if (metronome === null) {
      metronome = masterMetronome(initialState);
      metronome.tempoEventListener();
      metronome.handlePlay();
      playButton.classList.add('selected')
    } else if(metronome.getState().playing) {
      metronome.stop();
      metronome = null;
      metButton.classList.remove('selected');
      playButton.classList.remove('selected');
      recordButton.classList.remove('selected');
      recordButton.children[0].classList.add('far', 'fa-dot-circle');
      recordButton.children[0].classList.remove('fas', 'fa-stop');
      return;
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.keyCode !== 32) {
      return;
    }
    if (metronome === null) {
      metronome = masterMetronome(initialState);
      metronome.tempoEventListener();
      metronome.handlePlay();
      playButton.classList.add('selected')

    } else if (metronome.getState().playing) {
      metronome.stop();
      metronome = null;
      metButton.classList.remove('selected');
      playButton.classList.remove('selected');
      recordButton.classList.remove('selected');
      recordButton.children[0].classList.add('far', 'fa-dot-circle');
      recordButton.children[0].classList.remove('fas', 'fa-stop');
      return;
    }
  });

  recordButton.addEventListener('click', (e) => {
    if (metronome === null) {
      metronome = masterMetronome(initialState);
      metronome.tempoEventListener();
      metronome.keyHitEventListener();
      metronome.setState({ recording: true });
      metronome.handlePlay();
      recordButton.classList.add('selected');
      PlayUtil.clearAllScenes('on-beat');

      recordButton.children[0].classList.remove('far', 'fa-dot-circle');
      recordButton.children[0].classList.add('fas', 'fa-stop');

    } else if (metronome.getState().recording) {
      PlayUtil.clearAllScenes('on-beat-record');
      metronome.setState({ recording: false });
      recordButton.classList.remove('selected');
    
      recordButton.children[0].classList.add('far', 'fa-dot-circle');
      recordButton.children[0].classList.remove('fas', 'fa-stop');

    } else if (metronome.getState().playing) {
      PlayUtil.clearAllScenes('on-beat');
      metronome.setState({ recording: true });
      recordButton.classList.add('selected')
      metronome.keyHitEventListener();

      recordButton.children[0].classList.remove('far', 'fa-dot-circle');
      recordButton.children[0].classList.add('fas', 'fa-stop');
    }

  });

  e.addEventListener('change', (e) => {
    [tempoField.value, initialState.tempo] = [e.target.value, e.target.value];
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
    if (keySet.has(parseInt(e.keyCode))) {
      let targetKey = document.querySelector(`div[data-key="${e.keyCode}"]`);
      targetKey.classList.add('play');
    }
  });

  pads.forEach((pad) => {
    pad.addEventListener('transitionend', () => {
      pad.classList.remove('play')
    })
  });

  // document.getElementById('demo').addEventListener('click', () => {
  //   if (metronome) {
  //     metronome.stop();
  //     metronome = null;
  //   }
  //   metButton.classList.remove('selected');
  //   playButton.classList.remove('selected');
  //   recordButton.classList.remove('selected');
  //   PlayUtil.clearAllScenes('selected');
  //   metronome = new Metronome(soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, state.context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
  //   soundFactory.generateChord(0);
  //   soundFactory.generateMono(0);
  //   RunDemo(metronome, state.context);
  // })

  document.getElementById('demo').addEventListener('click', () => {
    if (metronome) {
      metronome.stop();
      metronome = null;
    }
    metButton.classList.remove('selected');
    playButton.classList.remove('selected');
    recordButton.classList.remove('selected');
    recordButton.children[0].classList.add('far', 'fa-dot-circle');
    recordButton.children[0].classList.remove('fas', 'fa-stop');
    PlayUtil.clearAllScenes('selected');
    metronome = masterMetronome(initialState);
    // soundFactory.generateChord(0);
    // soundFactory.generateMono(0);
    let randomizer = new Randomizer(metronome, soundFactory, initialState.context);
    randomizer.initializeBeat();
  })

}
