class SoundUtil {

  constructor(context) {
    this.context = context;
    this.drumKitSoundNames = [ '808bass2', 'Kick', 'snare', 'clap', 'hat', 'click' ];
    this.chordSoundNames = [ 'morphPadGSharpMi', 'EPianoCMa', 'pianoChordE', 'cosmicPadFMi', 'keyboard' ];
    this.drumKitBuffers = {};
    this.chordBuffers = {};
    this.generateChord = this.generateChord.bind(this);
    this.generateDrums = this.generateDrums.bind(this);
    this.keyDownEventListener = this.keyDownEventListener.bind(this);
    this.drumKeyCodes = [65, 83, 68, 70, 71, 72, 74, 75];
    this.chordKeyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221];
  }

  generateDrums() {
    this.drumKitSoundNames.forEach((soundName, idx) => {
      fetch('https://raw.githubusercontent.com/NBAtbaldwin/Js_project/master/assets/drum_kit/' + soundName + '.wav')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.context.decodeAudioData(buffer, decoded => {
          this.drumKitBuffers[this.drumKeyCodes[idx]] = decoded;
        });
      })
    });
  }

  generateChord(idx) {
    this.chordKeyCodes.forEach((code) => {
      fetch(`https://raw.githubusercontent.com/NBAtbaldwin/Js_project/master/assets/drum_kit/${this.chordSoundNames[idx]}.wav`)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.context.decodeAudioData(buffer, decoded => {
          this.chordBuffers[code] = decoded;
        });
      })
    });
  }

  keyDownEventListener() {
    const that = this;
    window.addEventListener('keydown', function(e) {
      let source = that.context.createBufferSource();
      let code = e.keyCode;
      if (Object.keys(that.drumKitBuffers).includes(code.toString())) {
        source.buffer = that.drumKitBuffers[code];
        source.connect(that.context.destination);
        source.start();
      } else if (Object.keys(that.chordBuffers).includes(code.toString())) {
        source.buffer = that.chordBuffers[code];
        source.playbackRate.value = that.pitchFromIndex(code);
        source.connect(that.context.destination);
        source.start();
        // window.addEventListener('keyup', (e) => {
        //   if (e.keyCode === code) {
        //     source.stop()
        //   }
        // })
      }
    });
  }

  pitchFromIndex(code) {
    const idx = this.chordKeyCodes.indexOf(code);
    return (1 - 0.0625*(idx))*2;
  }

}

export default SoundUtil;
