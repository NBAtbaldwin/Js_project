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








let context;
let audioBufferSourceNode;

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
    let targetKey = document.querySelector(`div[data-key="${e.keyCode}"]`);
    targetKey.classList.add('play');
  });

  pads.forEach((pad) => {
    pad.addEventListener('transitionend', () => {
      pad.classList.remove('play')
    })
  });

  document.getElementById('demo').addEventListener('click', () => {
    _playUtil__WEBPACK_IMPORTED_MODULE_3__["clearAllScenes"]();
    metronome = new _metronome__WEBPACK_IMPORTED_MODULE_0__["default"](soundFactory.drumKitBuffers, soundFactory.chordBuffers, soundFactory.monoBuffers, context, parseInt(document.getElementById('tempo').value), soundFactory.drumKeyCodes, soundFactory.chordKeyCodes, soundFactory.monoKeyCodes);
    soundFactory.generateChord(0);
    soundFactory.generateMono(0);
    Object(_demo__WEBPACK_IMPORTED_MODULE_5__["default"])(metronome, context);
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
    _playUtil__WEBPACK_IMPORTED_MODULE_0__["clearAllScenes"]();
  }

  playClick(time) {
    if (this.beat % 16 === 0) {
      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[222];
      source.connect(this.context.destination);
      source.start(time);
    } else if (this.beat % 4 === 0) {

      const source = this.context.createBufferSource();
      source.buffer = this.sounds.drums[222];

      const gainNode = this.context.createGain()
      gainNode.gain.value = 0.6
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
        console.log(this.keyCodes.chords);
        let soundIdx = this.keyCodes.chords[keyIdx-12];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.chords[soundIdx];
        source.playbackRate.value = _playUtil__WEBPACK_IMPORTED_MODULE_0__["pitchTransform"](keyIdx-12);
        source.connect(this.context.destination);
        source.start(time);
      } else if (keyIdx > 23 && keyIdx < 36) {
        console.log(this.keyCodes.chords);
        let soundIdx = this.keyCodes.mono[keyIdx-24];
        let source = this.context.createBufferSource();
        source.buffer = this.sounds.mono[soundIdx];
        source.playbackRate.value = _playUtil__WEBPACK_IMPORTED_MODULE_0__["pitchTransform"](keyIdx-24);
        source.connect(this.context.destination);
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
      let code = e.keyCode;
      let id = _recordingUtil__WEBPACK_IMPORTED_MODULE_1__["matchKeyStrokeToDivId"](code, this.keyCodes, this.beat);
      const selectedDiv = document.getElementById(id);
      selectedDiv.classList.add('selected');
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
  // console.log(drumSoundIdxList);
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

const clearAllScenes = () => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  sequences = Array.from(sequences);
  sequences.forEach((sequence) => {
    let rows = sequence.childNodes;
    rows = Array.from(rows);
    rows.forEach((row, idx) => {
      let colArr = Array.from(row.childNodes);
      colArr.forEach((node, idx) => {
        node.classList.remove('on-beat');
      })
    });
  });
}

const clearScene = (index) => {
  const master = document.getElementById("sequence-master");
  let sequences = master.childNodes;
  let sequence = Array.from(sequences)[index+1];
  let rows = sequence.childNodes;
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
  // console.log(keyCodeArray);
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map