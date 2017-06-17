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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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

"use strict";


(function () {

  var POST = function POST(url, data) {
    return new Promise(function (resolve, reject) {
      var http = new XMLHttpRequest();
      http.open('POST', url);
      http.setRequestHeader('Content-Type', 'application/json');
      http.onload = function () {
        try {
          var jsonData = JSON.parse(http.responseText);
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      }; // onload

      http.send(JSON.stringify(data));
    });
  }; //POST


  //DRAG AND DROP
  var dropzone = document.querySelector('#dropzone');

  dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
  }, false);

  // const handleFileSelect = () => {
  dropzone.addEventListener("drop", function (e) {

    var container = document.querySelector('.js-container'

    // cancel default actions
    );e.preventDefault();
    console.log(e, "E");

    var dataTransfer = e.dataTransfer;
    var files = dataTransfer.files,
        length = dataTransfer.length,
        timestamp = dataTransfer.timestamp;

    console.log(dataTransfer, "DESTRUCTURING");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var file = _step.value;

        console.log(files, 'SINGLE FILE HERE IN FOR LOOP');
        console.log("Filename: " + file.name);
        console.log("Type: " + file.type);
        console.log("Size: " + file.size + " bytes");
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (file) {
          console.log(file, "FILE IN RENDER");
          console.log(e, "e IN THUMBNAIL");
          return function (e) {
            console.log(reader, "READER");
            var form = document.createElement('form');

            form.innerHTML = '<img class = "thumb" alt="' + file.name + '" src="' + e.target.result + '">\n                ';
            container.appendChild(form);
          };
          // Render thumbnail.
        }(file);
      };

      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  //  }//END DRAG AND DROP


  );var updateProgress = function updateProgress(e) {
    if (e.lengthComputable) {
      var percentLoaded = Math.round(e.loaded / e.total * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  };

  // function processSelectedFiles(e) {
  //   const files = e.target.files;
  //   const reader = new FileReader();
  //
  //   for (let i = 0; i < files.length; i++) {
  //     console.log("Filename " + files[i].name,files[i]);
  //     reader.readAsDataURL(files[i])
  //     reader.addEventListener("load", function() {
  //       // console.log(reader.result)
  //       // call ajax here
  //       POST('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
  //         requests: [{
  //           image: {
  //             content: reader.result.split('data:image/jpeg;base64,').pop()
  //           },
  //           features: [{
  //             type: "TEXT_DETECTION",
  //           }]
  //         }]
  //       }).then((data) => {
  //         console.log(data.responses)
  //       })
  //     }, false);
  //
  //   }
  // }
  //
  // const dropzone = document.querySelector('#dropzone')
  //
  // dropzone.ondrop = (e) => {
  //   e.preventDefault()
  //   this.className = 'js-dropzone';
  //   processSelectedFiles()
  // };
  //
  // dropzone.ondragover = () => {
  //   this.className = 'js-dropzone js-dragover';
  //   return false;
  // };
  //
  // dropzone.ondragleave = () => {
  //   this.className = 'js-dropzone';
  //   return false;
  // }

  // document.querySelector('.js-dropzone').addEventListener('change', processSelectedFiles)
  // document.querySelector('#dropzone').addEventListener('change', handleFileSelect, false);
})();

/***/ })
/******/ ]);