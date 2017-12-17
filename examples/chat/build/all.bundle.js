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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/src/audiocontext.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return audioContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createGainNode; });
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = window.audioContext || new AudioContext();

var createGainNode = function createGainNode(audioCtx) {
  if (audioCtx.createGain && audioCtx.createGain()) {
    return audioCtx.createGain();
  }

  if (audioCtx.createGainNode && audioCtx.createGainNode()) {
    return audioCtx.createGainNode();
  }

  return null;
};

/* harmony default export */ __webpack_exports__["c"] = (audioContext);



/***/ }),

/***/ "../lib/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sonic_socket__ = __webpack_require__("../lib/src/sonic-socket.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sonic_server__ = __webpack_require__("../lib/src/sonic-server.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sonic_coder__ = __webpack_require__("../lib/src/sonic-coder.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__sonic_socket__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__sonic_server__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__sonic_coder__["a"]; });




var sonicnet = {
  SonicSocket: __WEBPACK_IMPORTED_MODULE_0__sonic_socket__["a" /* default */],
  SonicServer: __WEBPACK_IMPORTED_MODULE_1__sonic_server__["a" /* default */],
  SonicCoder: __WEBPACK_IMPORTED_MODULE_2__sonic_coder__["a" /* default */]
};

/* unused harmony default export */ var _unused_webpack_default_export = (sonicnet);



/***/ }),

/***/ "../lib/src/ring-buffer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RingBuffer = function () {
  function RingBuffer(maxLength) {
    _classCallCheck(this, RingBuffer);

    this.array = [];
    this.maxLength = maxLength;
  }

  RingBuffer.prototype.get = function get(index) {
    if (index >= this.array.length) {
      return null;
    }
    return this.array[index];
  };

  RingBuffer.prototype.last = function last() {
    if (this.array.length === 0) {
      return null;
    }
    return this.array[this.array.length - 1];
  };

  RingBuffer.prototype.add = function add(value) {
    // Append to the end, remove from the front.
    this.array.push(value);
    if (this.array.length >= this.maxLength) {
      this.array.splice(0, 1);
    }
  };

  RingBuffer.prototype.length = function length() {
    // Return the actual size of the array.
    return this.array.length;
  };

  RingBuffer.prototype.clear = function clear() {
    this.array = [];
  };

  RingBuffer.prototype.copy = function copy() {
    // Returns a copy of the ring buffer.
    var out = new RingBuffer(this.maxLength);
    out.array = this.array.slice(0);
    return out;
  };

  RingBuffer.prototype.remove = function remove(index, length) {
    //console.log('Removing', index, 'through', index+length);
    this.array.splice(index, length);
  };

  return RingBuffer;
}();

/* harmony default export */ __webpack_exports__["a"] = (RingBuffer);

/***/ }),

/***/ "../lib/src/sonic-coder.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A simple sonic encoder/decoder for [a-z0-9] => frequency (and back).
 * A way of representing characters with frequency.
 */
var ALPHABET = '\n abcdefghijklmnopqrstuvwxyz0123456789,.!?@*';

var SonicCoder = function () {
  function SonicCoder() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SonicCoder);

    this.freqMin = params.freqMin || 18500;
    this.freqMax = params.freqMax || 19500;
    this.freqError = params.freqError || 50;
    this.alphabetString = params.alphabet || ALPHABET;
    this.startChar = params.startChar || '^';
    this.endChar = params.endChar || '$';
    // Make sure that the alphabet has the start and end chars.
    this.alphabet = this.startChar + this.alphabetString + this.endChar;
  }

  /**
   * Given a character, convert to the corresponding frequency.
   */


  SonicCoder.prototype.charToFreq = function charToFreq(char) {
    // Get the index of the character.
    var index = this.alphabet.indexOf(char);
    if (index === -1) {
      // If this character isn't in the alphabet, error out.
      console.error(char, 'is an invalid character.');
      index = this.alphabet.length - 1;
    }
    // Convert from index to frequency.
    var freqRange = this.freqMax - this.freqMin;
    var percent = index / this.alphabet.length;
    var freqOffset = Math.round(freqRange * percent);

    return this.freqMin + freqOffset;
  };

  /**
   * Given a frequency, convert to the corresponding character.
   */


  SonicCoder.prototype.freqToChar = function freqToChar(freq) {
    // If the frequency is out of the range.
    if (!(this.freqMin < freq && freq < this.freqMax)) {
      // If it's close enough to the min, clamp it (and same for max).
      if (this.freqMin - freq < this.freqError) {
        freq = this.freqMin;
      } else if (freq - this.freqMax < this.freqError) {
        freq = this.freqMax;
      } else {
        // Otherwise, report error.
        console.error(freq, 'is out of range.');
        return null;
      }
    }
    // Convert frequency to index to char.
    var freqRange = this.freqMax - this.freqMin;
    var percent = (freq - this.freqMin) / freqRange;
    var index = Math.round(this.alphabet.length * percent);

    return this.alphabet[index];
  };

  return SonicCoder;
}();

/* harmony default export */ __webpack_exports__["a"] = (SonicCoder);

/***/ }),

/***/ "../lib/src/sonic-server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ring_buffer_js__ = __webpack_require__("../lib/src/ring-buffer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sonic_coder_js__ = __webpack_require__("../lib/src/sonic-coder.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audiocontext__ = __webpack_require__("../lib/src/audiocontext.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var State = {
  IDLE: 1,
  RECV: 2
};

/**
 * Extracts meaning from audio streams.
 *
 * (assumes audioContext is an AudioContext global variable.)
 *
 * 1. Listen to the microphone.
 * 2. Do an FFT on the input.
 * 3. Extract frequency peaks in the ultrasonic range.
 * 4. Keep track of frequency peak history in a ring buffer.
 * 5. Call back when a peak comes up often enough.
 */

var SonicServer = function () {
  function SonicServer() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SonicServer);

    this.peakThreshold = params.peakThreshold || -65;
    this.minRunLength = params.minRunLength || 2;
    this.coder = params.coder || new __WEBPACK_IMPORTED_MODULE_1__sonic_coder_js__["a" /* default */](params);
    // How long (in ms) to wait for the next character.
    this.timeout = params.timeout || 300;
    this.debug = !!params.debug;

    this.peakHistory = new __WEBPACK_IMPORTED_MODULE_0__ring_buffer_js__["a" /* default */](16);
    this.peakTimes = new __WEBPACK_IMPORTED_MODULE_0__ring_buffer_js__["a" /* default */](16);

    this.callbacks = {};

    this.buffer = '';
    this.state = State.IDLE;
    this.isRunning = false;
    this.iteration = 0;
  }
  /**
   * Start processing the audio stream.
   */


  SonicServer.prototype.start = function start() {
    // Start listening for microphone. Continue init in onStream.
    var constraints = {
      audio: { optional: [{ echoCancellation: false }] }
    };
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getMedia({ audio: true }, this.onStream_.bind(this), this.onStreamError_.bind(this));
  };
  /**
   * Stop processing the audio stream.
   */


  SonicServer.prototype.stop = function stop() {
    this.isRunning = false;
    this.track.stop();
  };

  SonicServer.prototype.on = function on(event, callback) {
    if (event === 'message') {
      this.callbacks.message = callback;
    }
    if (event === 'character') {
      this.callbacks.character = callback;
    }
  };

  SonicServer.prototype.setDebug = function setDebug(value) {
    this.debug = value;

    var canvas = document.querySelector('canvas');
    if (canvas) {
      // Remove it.
      canvas.parentElement.removeChild(canvas);
    }
  };

  SonicServer.prototype.fire_ = function fire_(callback, arg) {
    if (typeof callback === 'function') {
      callback(arg);
    }
  };

  SonicServer.prototype.onStream_ = function onStream_(stream) {
    // Store MediaStreamTrack for stopping later. MediaStream.stop() is deprecated
    // See https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en
    this.track = stream.getTracks()[0];

    // Setup audio graph.
    var input = __WEBPACK_IMPORTED_MODULE_2__audiocontext__["c" /* default */].createMediaStreamSource(stream);
    var analyser = __WEBPACK_IMPORTED_MODULE_2__audiocontext__["c" /* default */].createAnalyser();
    input.connect(analyser);
    // Create the frequency array.
    this.freqs = new Float32Array(analyser.frequencyBinCount);
    // Save the analyser for later.
    this.analyser = analyser;
    this.isRunning = true;
    // Do an FFT and check for inaudible peaks.
    this.raf_(this.loop.bind(this));
  };

  SonicServer.prototype.onStreamError_ = function onStreamError_(e) {
    console.error('Audio input error:', e);
  };

  /**
   * Given an FFT frequency analysis, return the peak frequency in a frequency
   * range.
   */


  SonicServer.prototype.getPeakFrequency = function getPeakFrequency() {
    // Find where to start.
    var start = this.freqToIndex(this.coder.freqMin);
    // TODO: use first derivative to find the peaks, and then find the largest peak.
    // Just do a max over the set.
    var max = -Infinity;
    var index = -1;
    for (var i = start; i < this.freqs.length; i++) {
      if (this.freqs[i] > max) {
        max = this.freqs[i];
        index = i;
      }
    }
    // Only care about sufficiently tall peaks.
    if (max > this.peakThreshold) {
      return this.indexToFreq(index);
    }
    return null;
  };

  SonicServer.prototype.loop = function loop() {
    this.analyser.getFloatFrequencyData(this.freqs);
    // Sanity check the peaks every 5 seconds.
    if ((this.iteration + 1) % (60 * 5) == 0) {
      this.restartServerIfSanityCheckFails();
    }
    // Calculate peaks, and add them to history.
    var freq = this.getPeakFrequency();
    if (freq) {
      var char = this.coder.freqToChar(freq);
      // DEBUG ONLY: Output the transcribed char.
      if (this.debug) {
        console.log('Transcribed char: ' + char);
      }
      this.peakHistory.add(char);
      this.peakTimes.add(new Date());
    } else {
      // If no character was detected, see if we've timed out.
      var lastPeakTime = this.peakTimes.last();
      if (lastPeakTime && new Date() - lastPeakTime > this.timeout) {
        // Last detection was over 300ms ago.
        this.state = State.IDLE;
        if (this.debug) {
          console.log('Token', this.buffer, 'timed out');
        }
        this.peakTimes.clear();
      }
    }
    // Analyse the peak history.
    this.analysePeaks();
    // DEBUG ONLY: Draw the frequency response graph.
    if (this.debug) {
      this.debugDraw_();
    }
    if (this.isRunning) {
      this.raf_(this.loop.bind(this));
    }
    this.iteration += 1;
  };

  SonicServer.prototype.indexToFreq = function indexToFreq(index) {
    var nyquist = __WEBPACK_IMPORTED_MODULE_2__audiocontext__["c" /* default */].sampleRate / 2;
    return nyquist / this.freqs.length * index;
  };

  SonicServer.prototype.freqToIndex = function freqToIndex(frequency) {
    var nyquist = __WEBPACK_IMPORTED_MODULE_2__audiocontext__["c" /* default */].sampleRate / 2;
    return Math.round(frequency / nyquist * this.freqs.length);
  };

  /**
   * Analyses the peak history to find true peaks (repeated over several frames).
   */


  SonicServer.prototype.analysePeaks = function analysePeaks() {
    // Look for runs of repeated characters.
    var char = this.getLastRun();
    if (!char) {
      return;
    }
    if (this.state === State.IDLE) {
      // If idle, look for start character to go into recv mode.
      if (char === this.coder.startChar) {
        this.buffer = '';
        this.state = State.RECV;
      }
    } else if (this.state === State.RECV) {
      // If receiving, look for character changes.
      if (char !== this.lastChar && char !== this.coder.startChar && char !== this.coder.endChar) {
        this.buffer += char;
        this.lastChar = char;
        this.fire_(this.callbacks.character, char);
      }
      // Also look for the end character to go into idle mode.
      if (char === this.coder.endChar) {
        this.state = State.IDLE;
        this.fire_(this.callbacks.message, this.buffer);
        this.buffer = '';
      }
    }
  };

  SonicServer.prototype.getLastRun = function getLastRun() {
    var lastChar = this.peakHistory.last();
    var runLength = 0;
    var i = this.peakHistory.length() - 2;
    // Look at the peakHistory array for patterns like ajdlfhlkjxxxxxx$.
    for (i; i >= 0; i--) {
      var char = this.peakHistory.get(i);
      if (char === lastChar) {
        runLength += 1;
      } else {
        break;
      }
    }
    if (runLength > this.minRunLength) {
      // Remove it from the buffer.
      this.peakHistory.remove(i + 1, runLength + 1);
      return lastChar;
    }
    return null;
  };

  /**
   * DEBUG ONLY.
   */


  SonicServer.prototype.debugDraw_ = function debugDraw_() {
    var canvas = document.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    }
    canvas.width = document.body.offsetWidth;
    canvas.height = 480;
    var drawContext = canvas.getContext('2d');
    // Plot the frequency data.
    for (var i = 0; i < this.freqs.length; i++) {
      var value = this.freqs[i];
      // Transform this value (in db?) into something that can be plotted.
      var height = value + 400;
      var offset = canvas.height - height - 1;
      var barWidth = canvas.width / this.freqs.length;
      drawContext.fillStyle = 'black';
      drawContext.fillRect(i * barWidth, offset, 1, 1);
    }
  };

  /**
   * A request animation frame shortcut. This one is intended to work even in
   * background pages of an extension.
   */


  SonicServer.prototype.raf_ = function raf_(callback) {
    var isCrx = !!(window.chrome && chrome.extension);
    if (isCrx) {
      setTimeout(callback, 1000 / 60);
    } else {
      requestAnimationFrame(callback);
    }
  };

  SonicServer.prototype.restartServerIfSanityCheckFails = function restartServerIfSanityCheckFails() {
    // Strange state 1: peaks gradually get quieter and quieter until they
    // stabilize around -800.
    if (this.freqs[0] < -300) {
      console.error('freqs[0] < -300. Restarting.');
      this.restart();
      return;
    }
    // Strange state 2: all of the peaks are -100. Check just the first few.
    var isValid = true;
    for (var i = 0; i < 10; i++) {
      if (this.freqs[i] === -100) {
        isValid = false;
      }
    }
    if (!isValid) {
      console.error('freqs[0:10] == -100. Restarting.');
      this.restart();
    }
  };

  SonicServer.prototype.restart = function restart() {
    //this.stop();
    //this.start();
    window.location.reload();
  };

  return SonicServer;
}();

/* harmony default export */ __webpack_exports__["a"] = (SonicServer);

/***/ }),

/***/ "../lib/src/sonic-socket.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sonic_coder_js__ = __webpack_require__("../lib/src/sonic-coder.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audiocontext__ = __webpack_require__("../lib/src/audiocontext.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




/**
 * Encodes text as audio streams.
 *
 * 1. Receives a string of text.
 * 2. Creates an oscillator.
 * 3. Converts characters into frequencies.
 * 4. Transmits frequencies, waiting in between appropriately.
 */

var SonicSocket = function () {
  function SonicSocket() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SonicSocket);

    this.charDuration = params.charDuration || 0.2;
    this.coder = params.coder || new __WEBPACK_IMPORTED_MODULE_0__sonic_coder_js__["a" /* default */](params);
    this.rampDuration = params.rampDuration || 0.001;
  }

  SonicSocket.prototype.send = function send(input, opt_callback) {
    // Surround the word with start and end characters.
    input = this.coder.startChar + input + this.coder.endChar;
    // Use WAAPI to schedule the frequencies.
    for (var i = 0; i < input.length; i++) {
      var char = input[i];
      var freq = this.coder.charToFreq(char);
      var time = __WEBPACK_IMPORTED_MODULE_1__audiocontext__["a" /* audioContext */].currentTime + this.charDuration * i;
      this.scheduleToneAt(freq, time, this.charDuration);
    }

    // If specified, callback after roughly the amount of time it would have
    // taken to transmit the token.
    if (opt_callback) {
      var totalTime = this.charDuration * input.length;
      setTimeout(opt_callback, totalTime * 1000);
    }
  };

  SonicSocket.prototype.scheduleToneAt = function scheduleToneAt(freq, startTime, duration) {
    // Gain => Merger
    var gainNode = Object(__WEBPACK_IMPORTED_MODULE_1__audiocontext__["b" /* createGainNode */])(__WEBPACK_IMPORTED_MODULE_1__audiocontext__["a" /* audioContext */]);
    gainNode.gain.value = 0;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + this.rampDuration);
    gainNode.gain.setValueAtTime(1, startTime + duration - this.rampDuration);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    gainNode.connect(__WEBPACK_IMPORTED_MODULE_1__audiocontext__["a" /* audioContext */].destination);

    var osc = __WEBPACK_IMPORTED_MODULE_1__audiocontext__["a" /* audioContext */].createOscillator();
    osc.frequency.value = freq;
    osc.connect(gainNode);

    osc.start(startTime);
  };

  return SonicSocket;
}();

/* harmony default export */ __webpack_exports__["a"] = (SonicSocket);

/***/ }),

/***/ "./chat/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_src_index__ = __webpack_require__("../lib/src/index.js");


var ALPHABET = ' abcdefghijklmnopqrstuvwxyz';
// Create an ultranet server.
var sonicServer = new __WEBPACK_IMPORTED_MODULE_0__lib_src_index__["b" /* SonicServer */]({ alphabet: ALPHABET, debug: true });
// Create an ultranet socket.
var sonicSocket = new __WEBPACK_IMPORTED_MODULE_0__lib_src_index__["c" /* SonicSocket */]({ alphabet: ALPHABET });

var history = document.querySelector('#history');
var wrap = document.querySelector('#history-wrap');
var form = document.querySelector('form');
var input = document.querySelector('input');

function init() {
  sonicServer.start();
  sonicServer.on('message', onIncomingChat);
  form.addEventListener('submit', onSubmitForm);
}

function onSubmitForm(e) {
  // Get contents of input element.
  var message = input.value;
  // Send via oscillator.
  sonicSocket.send(message);
  // Clear the input element.
  input.value = '';
  // Don't actually submit the form.
  e.preventDefault();
}

function onIncomingChat(message) {
  console.log('chat inbound.', message);
  history.innerHTML += time() + ': ' + message + '<br/>';
  // Scroll history to the bottom.
  wrap.scrollTop = history.scrollHeight;
}

function time() {
  var now = new Date();
  var hours = now.getHours();
  hours = hours > 9 ? hours : ' ' + hours;
  var mins = now.getMinutes();
  mins = mins > 9 ? mins : '0' + mins;
  var secs = now.getSeconds();
  secs = secs > 9 ? secs : '0' + secs;
  return '[' + hours + ':' + mins + ':' + secs + ']';
}

window.addEventListener('load', init);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./chat/index.js");


/***/ })

/******/ });
//# sourceMappingURL=all.bundle.js.map