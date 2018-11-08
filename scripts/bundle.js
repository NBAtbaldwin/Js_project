/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/createPads.js":
/*!*******************************!*\
  !*** ./scripts/createPads.js ***!
  \*******************************/
/*! exports provided: createPads */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPads", function() { return createPads; });
const createPads = () => {
  const master = document.getElementById("pads-master");
  for (let i = 0; i < 3; i++) {
    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'pad-row');
    rowDiv.setAttribute('id', `pad-row-${i}`);
    master.appendChild(rowDiv);
    for (let j = 0; j < 12; j++) {
      let colDiv = document.createElement('div');
      colDiv.setAttribute('data-key', `${keyCodes[i][j]}`);
      colDiv.setAttribute('id', `pad-col-${i}-${j}`);
      colDiv.setAttribute('class', `pad`);
      colDiv.innerHTML = `${keyNames[i][j]}`
      rowDiv.appendChild(colDiv);
    }
  }
}

const keyNames = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter']
];

const keyCodes = [
  ['49', '50', '51', '52', '53', '54', '55', '56', '57', '48', '189', '187'],
  ['81', '87', '69', '82', '84', '89', '85', '73', '79', '80', '219', '22'],
  ['65', '83', '68', '70', '71', '72', '74', '75', '76', '186', '222', '13']
];


/***/ }),

/***/ "./scripts/createScene.js":
/*!********************************!*\
  !*** ./scripts/createScene.js ***!
  \********************************/
/*! exports provided: createScenes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createScenes", function() { return createScenes; });
const createScenes = () => {
  const master = document.getElementById("sequence-master");

  [0, 1, 2].forEach((num) => {
    const subMaster = document.createElement("div");
    subMaster.setAttribute("id", `sequencer-${num}`)
    master.appendChild(subMaster);
    createScene(subMaster, num)

  });

}

const createScene = (subMaster, num) => {
  for (let i = 0; i < 32; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", `row-${i}`);

    if (i % 4 === 0) {
      rowDiv.classList.add('quarter');
    }

    subMaster.appendChild(rowDiv);
    for (let j = 11; j >= 0; j--) {
      let colDiv = document.createElement("div");
      colDiv.setAttribute("id", `row-${i}-col-${j+(num*12)}`);
      // colDiv.setAttribute("class", `sequencer-${num}`)
      rowDiv.appendChild(colDiv);

      // click div to create note
      colDiv.addEventListener('click', () => {
        Array.from(colDiv.classList).join('').includes("selected") ? colDiv.classList.remove("selected") : colDiv.classList.add("selected")
      })

      // drag mousedown over div to create note
      colDiv.addEventListener('mouseover', (e) => {
        if(e.buttons == 1 || e.buttons == 3) {
          Array.from(colDiv.classList).join('').includes("selected") ? colDiv.classList.remove("selected") : colDiv.classList.add("selected")
        }
      })

    }
  }
}


/***/ }),

/***/ "./scripts/demo.js":
/*!*************************!*\
  !*** ./scripts/demo.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const littleDitty = ["row-0-col-7", "row-0-col-2", "row-0-col-1", "row-1-col-7", "row-2-col-7", "row-3-col-7", "row-4-col-7", "row-4-col-4", "row-5-col-7", "row-6-col-7", "row-6-col-2", "row-7-col-7", "row-8-col-8", "row-8-col-7", "row-9-col-7", "row-10-col-7", "row-10-col-2", "row-10-col-1", "row-11-col-7", "row-12-col-7", "row-12-col-4", "row-13-col-7", "row-13-col-2", "row-14-col-7", "row-15-col-7", "row-16-col-7", "row-16-col-2", "row-16-col-0", "row-17-col-7", "row-18-col-7", "row-19-col-7", "row-20-col-7", "row-20-col-4", "row-21-col-7", "row-22-col-7", "row-22-col-2", "row-22-col-0", "row-23-col-8", "row-23-col-7", "row-24-col-7", "row-25-col-7", "row-26-col-7", "row-26-col-2", "row-27-col-7", "row-28-col-7", "row-28-col-4", "row-29-col-7", "row-29-col-4", "row-30-col-7", "row-30-col-2", "row-31-col-7", "row-0-col-12", "row-6-col-15", "row-16-col-14", "row-22-col-17", "row-0-col-24", "row-2-col-26", "row-4-col-27", "row-6-col-29", "row-7-col-31", "row-8-col-34", "row-10-col-31", "row-11-col-32", "row-12-col-29", "row-13-col-31", "row-14-col-27"];

const runDemo = (metronome, context) => {
  littleDitty.forEach( id => {
    let div = document.getElementById(id);
    div.classList.add('selected');
  });
  document.getElementById('chord-0').classList.add('selected');
  document.getElementById('mono-0').classList.add('selected');
  document.getElementById('tempo').value = "47";
  document.getElementById('tempo-slide').value = "47";
  metronome.tempo = 47;
  metronome.tempoEventListener();
  metronome.handlePlay();
  metronome.playing = true;
  document.getElementById('play').classList.add('selected')

}

/* harmony default export */ __webpack_exports__["default"] = (runDemo);


/***/ }),

/***/ "./scripts/entry.js":
/*!**************************!*\
  !*** ./scripts/entry.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metronome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metronome */ "./scripts/metronome.js");
/* harmony import */ var _createScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createScene */ "./scripts/createScene.js");
/* harmony import */ var _soundUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./soundUtil */ "./scripts/soundUtil.js");
/* harmony import */ var _playUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playUtil */ "./scripts/playUtil.js");
/* harmony import */ var _createPads__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPads */ "./scripts/createPads.js");
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demo */ "./scripts/demo.js");
/* harmony import */ var _randomizer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./randomizer */ "./scripts/randomizer.js");
/* harmony import */ var _tutorial__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tutorial */ "./scripts/tutorial.js");










let context;
let audioBufferSourceNode;
const keySet = new Set([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187]);

window.addEventListener('load', init, false);
function init() {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
  const soundFactory = new _soundUtil__WEBPACK_IMPORTED_MODULE_2__["default"](context);
  soundFactory.generateDrums();
  soundFactory.generateChord(2);
  soundFactory.generateMono(1);

  soundFactory.keyDownEventListener();

  _createScene__WEBPACK_IMPORTED_MODULE_1__["createScenes"]();
  _createPads__WEBPACK_IMPORTED_MODULE_4__["createPads"]();
  const tutorial = new _tutorial__WEBPACK_IMPORTED_MODULE_7__["default"]();
  tutorial.initialize();

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
  const helpButton = document.getElementById('help');

  helpButton.addEventListener('click', () => {
    tutorial.initialize();
  })

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
      metronome = new _metronome__WEBPACK_IMPORTED_MODULE_0__["default"](soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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
      metronome = new _metronome__WEBPACK_IMPORTED_MODULE_0__["default"](soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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
      metronome = new _metronome__WEBPACK_IMPORTED_MODULE_0__["default"](soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
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
      _playUtil__WEBPACK_IMPORTED_MODULE_3__["clearScene"](idx);
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
  //   metronome = new Metronome(soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
  //   soundFactory.generateChord(0);
  //   soundFactory.generateMono(0);
  //   RunDemo(metronome, context);
  // })

  document.getElementById('demo').addEventListener('click', () => {
    if (metronome) {
      metronome.stop();
      metronome = null;
    }
    metButton.classList.remove('selected');
    playButton.classList.remove('selected');
    recordButton.classList.remove('selected');
    _playUtil__WEBPACK_IMPORTED_MODULE_3__["clearAllScenes"]('selected');
    metronome = new _metronome__WEBPACK_IMPORTED_MODULE_0__["default"](soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
    // soundFactory.generateChord(0);
    // soundFactory.generateMono(0);
    let randomizer = new _randomizer__WEBPACK_IMPORTED_MODULE_6__["default"](metronome, soundFactory, context);
    randomizer.initializeBeat();
  })

}


/***/ }),

/***/ "./scripts/metronome.js":
/*!******************************!*\
  !*** ./scripts/metronome.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playUtil */ "./scripts/playUtil.js");
/* harmony import */ var _recordingUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recordingUtil */ "./scripts/recordingUtil.js");



class Metronome {
  constructor(drumKitArray, chordArray, monoArray, context, tempo, drumKeyCodes, chordKeyCodes, monoKeyCodes) {
    this.sounds = {drums: drumKitArray, chords: chordArray, mono: monoArray}
    this.validKeySet = new Set([65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187]);
    this.context = context;
    this.tempo = tempo;
    this.handlePlay = this.handlePlay.bind(this);
    this.planNotes = this.planNotes.bind(this);
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
    _playUtil__WEBPACK_IMPORTED_MODULE_0__["clearAllScenes"]('on-beat');
  }

  playClick(time) {
    if (this.beat % 16 === 0) {
      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[222];
      source.playbackRate.value = 1.2;
      source.connect(this.context.destination);
      source.start(time);
    } else if (this.beat % 4 === 0) {

      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[222];

      const gainNode = this.context.createGain()
      gainNode.gain.value = 0.7;
      gainNode.connect(this.context.destination)
      source.connect(gainNode)

      source.start(time);
    }
  }

  playSound(time) {
    let soundList = _playUtil__WEBPACK_IMPORTED_MODULE_0__["getSoundIdx"](this.beat);
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
        let soundIdx = this.keyCodes.chords[keyIdx-12];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.chords[soundIdx];
        source.playbackRate.value = _playUtil__WEBPACK_IMPORTED_MODULE_0__["pitchTransform"](keyIdx-12);
        source.connect(this.context.destination);
        source.start(time);
      } else if (keyIdx > 23 && keyIdx < 36) {
        let soundIdx = this.keyCodes.mono[keyIdx-24];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.mono[soundIdx];
        source.playbackRate.value = _playUtil__WEBPACK_IMPORTED_MODULE_0__["pitchTransform"](keyIdx-24);
        const gainNode = this.context.createGain()
        gainNode.gain.value = 0.6;
        gainNode.connect(this.context.destination)
        source.connect(gainNode)
        source.start(time);
      }
    });
  }

  handlePlay() {
    this.beat = 0;
    this.noteTime = 0.0
    this.startTime = this.context.currentTime + .005;
    this.planNotes();
  }

  planNotes() {
    let currentTime = this.context.currentTime;
    currentTime -= this.startTime;
    while (this.noteTime < currentTime + .05) {
      let contextPlayTime = this.noteTime + this.startTime;
      _playUtil__WEBPACK_IMPORTED_MODULE_0__["highlightBeat"](this.beat);
      _playUtil__WEBPACK_IMPORTED_MODULE_0__["unHighlightBeat"](this.beat);
      this.playSound(contextPlayTime);
      if (this.metronomePlaying) {
        this.playClick(contextPlayTime);
        this.animateMetronomeButton();
      }
      this.getNextNoteTime();
    }

    this.timeoutId = setTimeout(this.planNotes, 0);
  }

  getNextNoteTime() {
    let secsPerBeat = 60.0/this.tempo;
    this.noteTime += .125 * secsPerBeat;

    this.beat === 31 ? this.beat = 0: this.beat += 1;
  }

  tempoEventListener() {
    let tempoSlide = document.getElementById('tempo-slide');

    tempoSlide.addEventListener('change', (e) => {
      this.tempo = e.target.value;
    })
  }

  keyHitEventListener() {
    window.addEventListener('keydown', (e) => {
      if (this.recording === false){
        return;
      }
      if (this.validKeySet.has(e.keyCode)) {
        let code = e.keyCode;
        let id = _recordingUtil__WEBPACK_IMPORTED_MODULE_1__["matchKeyStrokeToDivId"](code, this.keyCodes, this.beat);
        const selectedDiv = document.getElementById(id);
        selectedDiv.classList.add('selected');
      }
    });
  }

  animateMetronomeButton() {
    if (!Array.from(this.button.classList).join('').includes("selected")) {
      return;
    }
    if (this.beat % 16 === 0) {
      this.button.childNodes[1].classList.remove("far");
      this.button.childNodes[1].classList.add("fas");
      this.button.childNodes[3].classList.remove("fas");
      this.button.childNodes[3].classList.add("far");
    } else if (this.beat % 8 === 0) {
      this.button.childNodes[1].classList.remove("fas");
      this.button.childNodes[1].classList.add("far");
      this.button.childNodes[3].classList.remove("far");
      this.button.childNodes[3].classList.add("fas");
    }

  }

}

/* harmony default export */ __webpack_exports__["default"] = (Metronome);

// does this work?


/***/ }),

/***/ "./scripts/playUtil.js":
/*!*****************************!*\
  !*** ./scripts/playUtil.js ***!
  \*****************************/
/*! exports provided: getSoundIdx, highlightBeat, unHighlightBeat, clearAllScenes, clearScene, pitchTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSoundIdx", function() { return getSoundIdx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightBeat", function() { return highlightBeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unHighlightBeat", function() { return unHighlightBeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearAllScenes", function() { return clearAllScenes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearScene", function() { return clearScene; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pitchTransform", function() { return pitchTransform; });
const getSoundIdx = (beat) => {
  const drumSoundIdxList = []
  let rows = document.getElementsByClassName(`row-${beat}`);
  rows = Array.from(rows);
  rows.forEach((row, idx1) => {
    let colArr = Array.from(row.childNodes).reverse();
    colArr.forEach((node, idx2) => {
      if (Array.from(node.classList).join('').includes("selected")) {
        drumSoundIdxList.push(idx2 + idx1*12);
      }
    })
  });
  return drumSoundIdxList;
}

const highlightBeat = (beat) => {
  let rows = document.getElementsByClassName(`row-${beat}`);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      node.classList.add('on-beat');
    })
  });
}

const unHighlightBeat = (beat) => {
  let beatAlias;
  beat === 0 ? beatAlias = 32 : beatAlias = beat;
  let rows = document.getElementsByClassName(`row-${beatAlias - 1}`);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      node.classList.remove('on-beat');
    })
  });
}

const clearAllScenes = (className) => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  sequences = Array.from(sequences);
  sequences.forEach((sequence) => {
    let rows = sequence.childNodes;
    rows = Array.from(rows);
    rows.forEach((row, idx) => {
      let colArr = Array.from(row.childNodes);
      colArr.forEach((node, idx) => {
        node.classList.remove(className);
      })
    });
  });
}

const clearScene = (index) => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  let sequence = Array.from(sequences)[index+1];
  let rows = sequence.childNodes;
  console.log(rows);
  rows = Array.from(rows);
  rows.forEach((row, idx) => {
    let colArr = Array.from(row.childNodes);
    colArr.forEach((node, idx) => {
      node.classList.remove('selected');
    })
  });
}

const pitchTransform = (keyIdx) => {
  return Math.pow(10, ((keyIdx*100)*(Math.log10(2)/1200)))
}


/***/ }),

/***/ "./scripts/randomizer.js":
/*!*******************************!*\
  !*** ./scripts/randomizer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



/* harmony default export */ __webpack_exports__["default"] = (Randomizer);


/***/ }),

/***/ "./scripts/recordingUtil.js":
/*!**********************************!*\
  !*** ./scripts/recordingUtil.js ***!
  \**********************************/
/*! exports provided: matchKeyStrokeToDivId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchKeyStrokeToDivId", function() { return matchKeyStrokeToDivId; });
const matchKeyStrokeToDivId = (keyCode, keyCodeObj, beat) => {
  let row = beat;
  row === 0 ? row = 31 : row = row - 1;

  let col;
  if (keyCodeObj.drums.includes(keyCode)) {
    col = keyCodeObj.drums.indexOf(keyCode)
  } else if (keyCodeObj.chords.includes(keyCode)) {
    col = keyCodeObj.chords.indexOf(keyCode) + 12
  } else if (keyCodeObj.mono.includes(keyCode)) {
    col = keyCodeObj.mono.indexOf(keyCode) + 24
  }

  return `row-${row}-col-${col}`;
}


/***/ }),

/***/ "./scripts/soundUtil.js":
/*!******************************!*\
  !*** ./scripts/soundUtil.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class SoundUtil {

  constructor(context) {
    this.context = context;
    this.drumKitSoundNames = [ '808bass2', '808high', 'Kick', 'snare', 'shortSnare', 'clap', 'strongClap', 'hiHat', 'shortRide', 'crash', 'click', 'gucciYeah', ];
    this.chordSoundNames = [ 'cloudPad', 'blubberPad', 'emeraldHazePad', 'infinityPad', 'synthPluck' ];
    this.monoSoundNames = [ 'analogLead', 'currentsLead', 'screamLead']
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
      fetch('https://raw.githubusercontent.com/NBAtbaldwin/tinyDAW/master/assets/drum_kit/' + soundName + '.wav')
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
      fetch(`https://raw.githubusercontent.com/NBAtbaldwin/tinyDAW/master/assets/drum_kit/${this.chordSoundNames[idx]}.wav`)
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
      fetch(`https://raw.githubusercontent.com/NBAtbaldwin/tinyDAW/master/assets/drum_kit/${this.monoSoundNames[idx]}.wav`)
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
        // return (1 + ((idx/12)*.5))*2;
        return Math.pow(10, ((idx*100)*(Math.log10(2)/1200)))
      case "mono":
        idx = this.monoKeyCodes.indexOf(code);
        return Math.pow(10, ((idx*100)*(Math.log10(2)/1200)))
        // return idx;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SoundUtil);


/***/ }),

/***/ "./scripts/tutorial.js":
/*!*****************************!*\
  !*** ./scripts/tutorial.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Tutorial {
  constructor() {

  }

  initialize() {
    this.dir1Listeners();
    const modal = document.getElementsByClassName("modal")[0];
    modal.classList.remove("hidden");
    const directions1 = document.getElementById("directions-1");
    directions1.classList.remove("hidden");
    this.dir2Listeners();
    this.dir3Listeners();
  }

  dir1Listeners() {
    document.getElementById("exit-1").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-1").classList.add("hidden");
    });
    document.getElementById("next-1").addEventListener('click', () => {
      document.getElementById("directions-1").classList.add("hidden");      document.getElementById("directions-2").classList.remove("hidden");
    });
  }

  dir2Listeners() {
    document.getElementById("exit-2").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-2").classList.add("hidden");
    });
    document.getElementById("next-2").addEventListener('click', () => {
      document.getElementById("directions-2").classList.add("hidden");      document.getElementById("directions-3").classList.remove("hidden");
    });
    document.getElementById("back-2").addEventListener('click', () => {
      document.getElementById("directions-2").classList.add("hidden");      document.getElementById("directions-1").classList.remove("hidden");
    });
  }

  dir3Listeners() {
    document.getElementById("exit-3").addEventListener('click', () => {
      document.getElementsByClassName("modal")[0].classList.add("hidden");
      document.getElementById("directions-3").classList.add("hidden");
    });

    document.getElementById("back-3").addEventListener('click', () => {
      document.getElementById("directions-3").classList.add("hidden");      document.getElementById("directions-2").classList.remove("hidden");
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Tutorial);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map