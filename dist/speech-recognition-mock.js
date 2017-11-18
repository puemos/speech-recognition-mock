(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SpeechRecognitionMock", [], factory);
	else if(typeof exports === 'object')
		exports["SpeechRecognitionMock"] = factory();
	else
		root["SpeechRecognitionMock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/utils.ts
function speechRecognitionResultFn(index) {
    return {
        isFinal: false,
        length: 0,
        item: speechRecognitionAlternativeFn
    };
}
function speechRecognitionAlternativeFn(index) {
    return {
        confidence: 1,
        transcript: ''
    };
}
var oneSentence = function (sentence, isFinal) {
    if (isFinal === void 0) { isFinal = false; }
    return ({
        length: 1,
        item: speechRecognitionResultFn,
        0: {
            item: speechRecognitionAlternativeFn,
            length: 1,
            isFinal: isFinal,
            0: {
                confidence: 0.9,
                transcript: sentence
            }
        }
    });
};

// CONCATENATED MODULE: ./src/speech-recognition-mock.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechRecognitionMock", function() { return speech_recognition_mock_SpeechRecognitionMock; });

var speech_recognition_mock_SpeechRecognitionMock = /** @class */ (function () {
    function SpeechRecognitionMock() {
        this.listeners = {};
        this.addEventListener('audiostart', this.onaudiostart);
        this.addEventListener('soundstart', this.onsoundstart);
        this.addEventListener('speechstart', this.onspeechstart);
        this.addEventListener('speechend', this.onspeechend);
        this.addEventListener('soundend', this.onsoundend);
        this.addEventListener('result', this.onresult);
        this.addEventListener('nomatch', this.onnomatch);
        this.addEventListener('error', this.onerror);
        this.addEventListener('start', this.onstart);
        this.addEventListener('end', this.onend);
    }
    SpeechRecognitionMock.prototype.addEventListener = function (type, listener, options) {
        this.listeners[type] = this.listeners[type] || [];
        this.listeners[type].push(listener);
    };
    SpeechRecognitionMock.prototype.dispatchEvent = function (ev) {
        var _this = this;
        if (!(ev.type in this.listeners)) {
            return true;
        }
        this.listeners[ev.type]
            .filter(function (callback) { return typeof callback === 'function'; })
            .forEach(function (callback) {
            callback.call(_this, ev);
        });
        return true;
    };
    SpeechRecognitionMock.prototype.removeEventListener = function (type, listener, options) {
        if (!(type in this.listeners)) {
            return;
        }
        this.listeners[type] = this.listeners[type].filter(function (callback) { return callback !== listener; });
    };
    SpeechRecognitionMock.prototype.start = function () {
        if (this.started) {
            throw new DOMException("Failed to execute 'start' on 'SpeechRecognition': recognition has already started.");
        }
        this.started = true;
        // Create and dispatch an event
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('start', false, false, null);
        this.dispatchEvent(event);
    };
    SpeechRecognitionMock.prototype.stop = function () {
        this.abort();
    };
    SpeechRecognitionMock.prototype.abort = function () {
        if (!this.started) {
            return;
        }
        this.started = false;
        // Create and dispatch an event
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('end', false, false, null);
        this.dispatchEvent(event);
    };
    SpeechRecognitionMock.prototype.say = function (sentence, isFinal, resultIndex) {
        if (resultIndex === void 0) { resultIndex = 0; }
        var results = oneSentence(sentence, isFinal);
        // Create the event
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('result', false, false, {});
        event.resultIndex = resultIndex;
        event.results = results;
        event.interpretation = null;
        delete event.emma;
        this.dispatchEvent(event);
    };
    return SpeechRecognitionMock;
}());



/***/ })
/******/ ]);
});
//# sourceMappingURL=speech-recognition-mock.js.map