import * as playUtil from './playUtil';
import * as recordingUtil from './recordingUtil';

class Metronome {
  constructor(sounds, context, tempo, keyCodes) {
    this.sounds = sounds;
    this.context = context;
    this.tempo = tempo;
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePlayWithMetronome = this.handlePlayWithMetronome.bind(this);
    this.schedule = this.schedule.bind(this);
    this.keyHitEventListener = this.keyHitEventListener.bind(this);
    this.stop = this.stop.bind(this);
    this.button = document.getElementById('metronome')
    this.noteTime = 0.0;
    this.startTime = 0.0
    this.beat = 0;
    this.timeoutId = 0;
    this.keyCodes = keyCodes;
  }

  stop() {
    clearTimeout(this.timeoutId);
    // playUtil.unHighlightLastBeat(this.beat);
    // console.log(this.beat);
  }

  playClick(time) {
    const source = this.context.createBufferSource();
    source.buffer = this.sounds[72];
    source.connect(this.context.destination);
    source.start(time);
  }

  playSound(time) {
    let soundList = playUtil.getSoundIdx(this.beat);
    if (soundList.length === 0) {
      return;
    }
    soundList.forEach((keyIdx) => {
      let soundIdx = this.keyCodes[keyIdx];
      let source = this.context.createBufferSource();
      source.buffer = this.sounds[soundIdx];
      source.connect(this.context.destination);
      source.start(time);
    });
  }

  handlePlay() {
    this.beat = 0;
    this.noteTime = 0.0
    this.startTime = this.context.currentTime + .005;
    this.schedule('play');
  }

  handlePlayWithMetronome() {
    this.beat = 0;
    this.noteTime = 0.0
    this.startTime = this.context.currentTime + .005;
    this.schedule('metronome');
  }

  handleRecord() {
    this.beat = 0;
    this.noteTime = 0.0
    this.startTime = this.context.currentTime + .005;
    this.schedule('playWithMetronome');
  }


  schedule(arg) {
    let currentTime = this.context.currentTime;
    currentTime -= this.startTime;
    while (this.noteTime < currentTime + .05) {
      let contextPlayTime = this.noteTime + this.startTime;
      playUtil.hightlightBeat(this.beat);
      playUtil.unHighlightBeat(this.beat);
      switch (arg) {
        case 'metronome':
          this.playClick(contextPlayTime);
          break;
        case 'play':
          this.playSound(contextPlayTime);
          break;
        case 'playWithMetronome':
          this.playClick(contextPlayTime);
          break;
      }
      this.advanceNote();
    }

    this.timeoutId = setTimeout(this.schedule.bind(this, arg), 0);
  }

  advanceNote() {
    let secsPerBeat = 60.0/this.tempo;
    this.noteTime += .25 * secsPerBeat;

    this.beat === 31 ? this.beat = 0: this.beat += 1;
  }

  tempoEventListener() {
    const upTempo = document.getElementById("up-tempo");
    const downTempo = document.getElementById("down-tempo");
    upTempo.addEventListener('click', (e) => {
      this.tempo += 10;
    });
    downTempo.addEventListener('click', (e) => {
      this.tempo -= 10;
    });
  }

  keyHitEventListener() {
    window.addEventListener('keydown', (e) => {
      let code = e.keyCode;
      let id = recordingUtil.matchKeyStrokeToDivId(code, this.keyCodes, this.beat);
      console.log(id)
      const selectedDiv = document.getElementById(id);
      selectedDiv.classList.add('selected');
    });
  }

}

export default Metronome
