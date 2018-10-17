class Randomizer {

  constructor(metronome, soundFactory, context) {
    this.metronome = metronome;
    this.soundFactory = soundFactory;
    this.context = context
    this.sub = null;
    this.ride = null;
    this.snare = null;
    this.root = null;
    this.selectedChords = [];
    this.chordLocations = {};
    this.monoLocations = {};
  }

  initializeBeat() {
    this.resetSounds();
    this.makeGlobalSettings();
    this.makeDrums();
    this.makeChords();
    this.makeMonos();
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.remove("hidden");
    const h1 = document.getElementById("randomizer-wait");
    h1.classList.remove("hidden");
    setTimeout(this.playBeat.bind(this), 2000)
  }

  playBeat() {
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.add("hidden");
    const h1 = document.getElementById("randomizer-wait");
    h1.classList.add("hidden");
    this.metronome.tempoEventListener();
    this.metronome.handlePlay();
    this.metronome.playing = true;
    document.getElementById('play').classList.add('selected')
  }


  resetSounds() {
    const chordNodeList = document.getElementsByClassName('chord');
    const monoNodeList = document.getElementsByClassName('mono');
    Array.from(monoNodeList).forEach((node) => {
      node.classList.remove("selected")
    });
    Array.from(chordNodeList).forEach((node) => {
      node.classList.remove("selected")
    });
  }

  makeGlobalSettings() {
    const chords = ['chord-0', 'chord-1', 'chord-3', 'chord-4'];
    const chord = chords[Math.floor(Math.random()*chords.length)];
    document.getElementById(`${chord}`).classList.add('selected');
    this.soundFactory.generateChord(parseInt(chord[chord.length-1]));

    const monos = ['mono-0', 'mono-1', 'mono-2'];
    const mono = monos[Math.floor(Math.random()*monos.length)];
    document.getElementById(`${mono}`).classList.add('selected');
    this.soundFactory.generateMono(parseInt(mono[mono.length-1]));

    const tempoArr = Array.from(Array(91).keys()).splice(40);
    this.metronome.tempo = tempoArr[Math.floor(Math.random()*tempoArr.length)];
    document.getElementById('tempo').value = this.metronome.tempo;
    document.getElementById('tempo-slide').value = this.metronome.tempo;
  }

  makeDrums() {
    for (let idxR = 0; idxR < 32; idxR++) {
      for (let idxC = 0; idxC < 12; idxC++) {
        this.kicks(idxC, idxR);
        this.snares(idxC, idxR);
        this.hat(idxC, idxR);
        this.rides(idxC, idxR);
        this.clicker(idxC, idxR);
        this.yeah(idxC, idxR);
      }
    }
  }

  makeChords() {
    this.root = this.getRoot();
    const intervals = [];
    [-10, -7, -5, -2, 0, 2, 5, 7, 10].forEach(interval => {
      if (this.root + interval > 0 && this.root + interval < 12) intervals.push(this.root + interval);
    })
    for (let idxR = 0; idxR < 32; idxR++) {
      for (let idxC = 0; idxC < 12; idxC++) {
        this.chordChancePicker(idxC, idxR, intervals);
      }
    }
  }

  makeMonos() {
    for (let idxR = 0; idxR < 32; idxR++) {
      for (let idxC = 24; idxC < 36; idxC++) {
        this.monoChancePicker(idxC, idxR);
      }
    }
  }
  getRoot() {
    let rootArr = Array.from(Array(12).keys());
    let root = rootArr[Math.floor(Math.random()*rootArr.length)]
    return root;
  }

  chordBeatPicker(beat, note) {
    let window;
    this.metronome.tempo < 70 ? window = 6 : this.metronome.tempo < 80 ? window = 8 : window = 12;
    if (!this.selectedChords.includes(beat)) {
      this.drumsChancePicker([note+12], beat, 2, 9, 9, 9, 8.5, 7);
      if (document.getElementById(`row-${beat}-col-${note+12}`).classList.contains("selected")) {
        let windowArr = Array.from(Array(window+1).keys());
        windowArr.forEach(num => {
          this.selectedChords.push(beat + num);
          this.chordLocations[beat + num] = note + 12;
          if (beat - num <= 0) {
            this.selectedChords.push(31 - num);
          }
        });
      }
    }
  }

  chordChancePicker(note, beat, intervals) {
    if (note == this.root) {
      this.chordBeatPicker(beat, note);
    } else if (note == this.root + 7 || note == this.root - 7) {
      this.chordBeatPicker(beat, note);
    } else if (note == this.root + 5 || note == this.root - 5) {
      this.chordBeatPicker(beat, note);
    } else if (intervals.includes(note)) {
      this.chordBeatPicker(beat, note);
    }
  }

  drumsChancePicker(soundArr, beat, c0, cOther, c2, c4, c8, c16) {
    if(beat === 0) {
      if (Math.random()*10 > c0) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    } else if(beat % 16 === 0) {
      if (Math.random()*10 > c16) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    } else if(beat % 8 === 0) {
      if (Math.random()*10 > c8) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    } else if(beat % 4 === 0) {
      if (Math.random()*10 > c4) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    } else if(beat % 2 === 0) {
      if (Math.random()*10 > c2) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    } else {
      if (Math.random()*10 > cOther) {
        soundArr.forEach( sound => {
          this.selectDiv(beat, sound);
          if (sound > 23) {
            this.monoLocations[beat] = sound;
          }
        });
      }
    }
  }

  monoChancePicker(note, beat) {
    let intervals = [];
    let currentRoot = this.chordLocations[beat];
    let i = 1;
    while(!currentRoot) {
      currentRoot = this.chordLocations[beat-i];
      i++;
    }
    [-10, -9, -5, -2, 0, 2, 3, 7, 10].forEach(interval => {
      if (currentRoot + interval > 11 && currentRoot + interval < 24) intervals.push(currentRoot + interval);
    });
    let pitch = intervals[Math.floor(Math.random()*intervals.length)] + 12;
    if (!this.monoLocations[beat]) {
      this.drumsChancePicker([pitch], beat, 2, 9, 8.5, 8, 7, 7);
    }
  }

  selectDiv(beat, sound) {
    let div = document.getElementById(`row-${beat}-col-${sound}`);
    div.classList.add('selected');
  }

  kicks(sound, beat) {
    if (sound !== 2) return null;
    this.sub != null ? this.sub : Math.random()*10 > 4 ? this.sub = 0 : this.sub = 1;
    Math.random()*10 > 6 ? this.drumsChancePicker([sound, this.sub], beat, 0.0, 7, 4, 3, 2, 1) : this.drumsChancePicker([sound], beat, 0, 7, 4, 3, 2, 1);
  }

  snares(sound, beat) {
    if (sound !== 3 && sound !== 4) return null;
    this.snare ? this.snare : Math.random()*10 > 3 ? this.snare = 6 : this.snare = 5;
    beat % 8 === 0 ? this.drumsChancePicker([sound, this.snare], beat, 10, 10, 2, 1, 1) : this.drumsChancePicker([sound], beat, 9.8, 9, 8, 5, 0, 9.7);
  }

  hat(sound, beat) {
    if (sound !== 7) return null;
    this.drumsChancePicker([sound], beat, 0, 7, 2, 0, 2, 1)
  }

  rides(sound, beat) {
    if (sound !== 8) return null;
    this.ride ? this.ride : Math.random()*10 > 3 ? this.ride = 8 : this.ride = 9;
    this.drumsChancePicker([this.ride], beat, 9, 9.5, 9, 9, 9, 9)
  }

  clicker(sound, beat) {
    if (sound !== 10) return null;
    this.drumsChancePicker([sound], beat, 9, 9.7, 8, 9, 9.4, 9)
  }

  yeah(sound, beat) {
    if (sound < 11) return null;
    this.drumsChancePicker([sound], beat, 9.8, 9.9, 9.8, 9.8, 9.8, 9.8)
  }


}



export default Randomizer;
