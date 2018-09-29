class SoundUtil {

  constructor(context) {
    this.context = context;
    this.drumKitSoundNames = [ '808bass2', 'Kick', 'snare', 'clap', 'hat', 'click', 'monopoly', 'gucciYeah', 'damn' ];
    this.chordSoundNames = [ 'morphPadGSharpMi', 'EPianoCMa', 'pianoChordE', 'cosmicPadFMi', 'keyboard' ];
    this.monoSoundNames = [ 'msSeq', 'electroFlow', 'analogue']
    this.drumKitBuffers = {};
    this.chordBuffers = {};
    this.monoBuffers = {};
    this.generateChord = this.generateChord.bind(this);
    this.generateDrums = this.generateDrums.bind(this);
    this.generateMono = this.generateMono.bind(this);
    this.keyDownEventListener = this.keyDownEventListener.bind(this);
    this.drumKeyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13];
    this.chordKeyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221];
    this.monoKeyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187];
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

  generateMono(idx) {
    this.monoKeyCodes.forEach((code) => {
      fetch(`https://raw.githubusercontent.com/NBAtbaldwin/Js_project/master/assets/drum_kit/${this.monoSoundNames[idx]}.wav`)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        this.context.decodeAudioData(buffer, decoded => {
          this.monoBuffers[code] = decoded;
        });
      })
    })
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
        source.playbackRate.value = that.pitchFromIndex(code, 'chord');
        source.connect(that.context.destination);
        source.start();
        // window.addEventListener('keyup', (e) => {
        //   if (e.keyCode === code) {
        //     source.stop()
        //   }
        // })
      } else if (Object.keys(that.monoBuffers).includes(code.toString())) {
        source.buffer = that.monoBuffers[code];
        source.playbackRate.value = that.pitchFromIndex(code, 'mono');
        source.connect(that.context.destination);
        source.start();
      }
    });
  }

  pitchFromIndex(code, instrument) {
    let idx;
    switch (instrument) {
      case "chord":
        idx = this.chordKeyCodes.indexOf(code)
        return (1 - ((idx/12)*.5))*2;
      case "mono":
        idx = this.monoKeyCodes.indexOf(code);
        return (1 - ((idx/12)*.5))*2;
    }
  }

}

export default SoundUtil;
