import * as playUtil from './playUtil';
import * as recordingUtil from './recordingUtil';

class Metronome {
  constructor(drumKitArray, chordArray, monoArray, context, tempo, drumKeyCodes, chordKeyCodes, monoKeyCodes) {
    this.sounds = {drums: drumKitArray, chords: chordArray, mono: monoArray}
    this.context = context;
    this.tempo = tempo;
    this.handlePlay = this.handlePlay.bind(this);
    this.schedule = this.schedule.bind(this);
    this.keyHitEventListener = this.keyHitEventListener.bind(this);
    this.stop = this.stop.bind(this);
    this.button = document.getElementById('metronome')
    this.noteTime = 0.0;
    this.startTime = 0.0
    this.beat = 0;
    this.timeoutId = 0;
    this.keyCodes = {drums: drumKeyCodes, chords: chordKeyCodes, mono: monoKeyCodes};
    this.recording = false;
    this.metronomePlaying = false;
    this.playing = false;
  }

  stop() {
    clearTimeout(this.timeoutId);
    this.recording = false;
    playUtil.clearScene();
  }

  playClick(time) {
    if (this.beat % 16 === 0) {
      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[72];
      source.connect(this.context.destination);
      source.start(time);
    } else if (this.beat % 4 === 0) {

      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[72];

      const gainNode = this.context.createGain()
      gainNode.gain.value = 0.75
      gainNode.connect(this.context.destination)
      source.connect(gainNode)

      source.start(time);
    }
  }

  playSound(time) {
    let soundList = playUtil.getSoundIdx(this.beat);
    if (soundList.length === 0) {
      return;
    }
    soundList.forEach((keyIdx) => {
      if (keyIdx < 12) {
        let soundIdx = this.keyCodes.drums[keyIdx];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.drums[soundIdx];
        source.connect(this.context.destination);
        source.start(time);
      } else if (keyIdx > 11 && keyIdx < 24) {
        console.log(this.keyCodes.chords);
        let soundIdx = this.keyCodes.chords[keyIdx-12];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.chords[soundIdx];
        source.playbackRate.value = playUtil.pitchTransform(keyIdx-12);
        source.connect(this.context.destination);
        source.start(time);
      } else if (keyIdx > 23 && keyIdx < 36) {
        console.log(this.keyCodes.chords);
        let soundIdx = this.keyCodes.mono[keyIdx-24];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.mono[soundIdx];
        source.playbackRate.value = playUtil.pitchTransform(keyIdx-24);
        source.connect(this.context.destination);
        source.start(time);
      }
    });
  }

  handlePlay() {
    this.beat = 0;
    this.noteTime = 0.0
    this.startTime = this.context.currentTime + .005;
    this.schedule();
  }

  schedule() {
    let currentTime = this.context.currentTime;
    currentTime -= this.startTime;
    while (this.noteTime < currentTime + .05) {
      let contextPlayTime = this.noteTime + this.startTime;
      playUtil.hightlightBeat(this.beat);
      playUtil.unHighlightBeat(this.beat);
      this.playSound(contextPlayTime);
          if (this.metronomePlaying) {
            this.playClick(contextPlayTime);
          }
      this.advanceNote();
    }

    this.timeoutId = setTimeout(this.schedule, 0);
  }

  advanceNote() {
    let secsPerBeat = 60.0/this.tempo;
    this.noteTime += .125 * secsPerBeat;

    this.beat === 31 ? this.beat = 0: this.beat += 1;
  }

  tempoEventListener() {
    let tempoField = document.getElementById('tempo');

    tempoField.addEventListener('change', (e) => {
      this.tempo = e.target.value;
    })
  }

  keyHitEventListener() {
    window.addEventListener('keydown', (e) => {
      if (this.recording === false){
        return;
      }
      console.log(this.keyCodes.drums);
      let code = e.keyCode;
      let id = recordingUtil.matchKeyStrokeToDivId(code, this.keyCodes, this.beat);
      console.log(id)
      const selectedDiv = document.getElementById(id);
      selectedDiv.classList.add('selected');
    });
  }

}

export default Metronome
