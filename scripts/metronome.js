import * as playUtil from './playUtil';
import * as recordingUtil from './recordingUtil';

const metronome = ({drumKitArray, chordArray, monoArray, context, tempo, drumKeyCodes, chordKeyCodes, monoKeyCodes}) => {
  let state = {
    sounds: {drums: drumKitArray, chords: chordArray, mono: monoArray},
    validKeySet: new Set([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187]),
    context: context,
    tempo: tempo,
    button: document.getElementById('metronome'),
    noteTime: 0.0,
    startTime: 0.0,
    beat: 0,
    timeoutId: 0,
    keyCodes: {drums: drumKeyCodes, chords: chordKeyCodes, mono: monoKeyCodes},
    recording: false,
    metronomePlaying: document.getElementById('metronome').classList.contains('selected'),
    playing: false,
  }

  return Object.assign({
    stop: () => {
      clearTimeout(state.timeoutId);
      state.recording = false;
      playUtil.clearAllScenes('on-beat');
      playUtil.clearAllScenes('on-beat-record');
    },
  
    playClick: (time) => {
      if (state.beat % 16 === 0) {
        const source = state.context.createBufferSource();
        source.buffer = state.sounds.drums[189];
        source.playbackRate.value = 1.2;
        source.connect(state.context.destination);
        source.start(time);
      } else if (state.beat % 4 === 0) {
  
        const source = state.context.createBufferSource();
        source.buffer = state.sounds.drums[189];
  
        const gainNode = state.context.createGain()
        gainNode.gain.value = 0.7;
        gainNode.connect(state.context.destination)
        source.connect(gainNode)
  
        source.start(time);
      }
    },
  
    playSound: (time) => {
      let soundList = playUtil.getSoundIdx(state.beat);
      if (soundList.length === 0) {
        return;
      }
      soundList.forEach((keyIdx) => {
        if (keyIdx < 12) {
          let soundIdx = state.keyCodes.drums[keyIdx];
          let source = state.context.createBufferSource();
          source.buffer = state.sounds.drums[soundIdx];
          source.connect(state.context.destination);
          source.start(time);
        } else if (keyIdx > 11 && keyIdx < 24) {
          let soundIdx = state.keyCodes.chords[keyIdx-12];
          let source = state.context.createBufferSource();
          source.buffer = state.sounds.chords[soundIdx];
          source.playbackRate.value = playUtil.pitchTransform(keyIdx-12);
          source.connect(state.context.destination);
          source.start(time);
        } else if (keyIdx > 23 && keyIdx < 36) {
          let soundIdx = state.keyCodes.mono[keyIdx-24];
          let source = state.context.createBufferSource();
          source.buffer = state.sounds.mono[soundIdx];
          source.playbackRate.value = playUtil.pitchTransform(keyIdx-24);
          const gainNode = state.context.createGain()
          gainNode.gain.value = 0.6;
          gainNode.connect(state.context.destination)
          source.connect(gainNode)
          source.start(time);
        }
      });
    },
  
    handlePlay: (self) => {
      state.beat = 0;
      state.noteTime = 0.0
      state.startTime = state.context.currentTime + .005;
      self.planNotes(self);
    },
  
    planNotes: (self) => {
      let currentTime = state.context.currentTime;
      currentTime -= state.startTime;
      while (state.noteTime < currentTime + .05) {
        let contextPlayTime = state.noteTime + state.startTime;
        playUtil.highlightBeat(state.beat, state.recording);
        playUtil.unHighlightBeat(state.beat, state.recording);
        self.playSound(contextPlayTime);
        if (state.statePlaying) {
          self.playClick(contextPlayTime);
          self.animatestateButton();
        }
        self.getNextNoteTime();
      }
  
      state.timeoutId = setTimeout(() => self.planNotes(self), 0);
    },
  
    getNextNoteTime: () => {
      let secsPerBeat = 60.0/state.tempo;
      state.noteTime += .125 * secsPerBeat;
  
      state.beat === 31 ? state.beat = 0: state.beat += 1;
    },
  
    tempoEventListener: () => {
      let tempoSlide = document.getElementById('tempo-slide');
  
      tempoSlide.addEventListener('change', (e) => {
        state.tempo = e.target.value;
      })
    },
  
    keyHitEventListener: () => {
      window.addEventListener('keydown', (e) => {
        if (state.recording === false){
          return;
        }
        if (state.validKeySet.has(e.keyCode)) {
          let code = e.keyCode;
          let id = recordingUtil.matchKeyStrokeToDivId(code, state.keyCodes, state.beat);
          const selectedDiv = document.getElementById(id);
          selectedDiv.classList.add('selected');
        }
      });
    },
  
    animateMetronomeButton: () => {
      if (!Array.from(state.button.classList).join('').includes("selected")) {
        return;
      }
      if (state.beat % 16 === 0) {
        state.button.childNodes[1].classList.remove("far");
        state.button.childNodes[1].classList.add("fas");
        state.button.childNodes[3].classList.remove("fas");
        state.button.childNodes[3].classList.add("far");
      } else if (state.beat % 8 === 0) {
        state.button.childNodes[1].classList.remove("fas");
        state.button.childNodes[1].classList.add("far");
        state.button.childNodes[3].classList.remove("far");
        state.button.childNodes[3].classList.add("fas");
      }
  
    },
  })
  

}

export default metronome

// does this work?
