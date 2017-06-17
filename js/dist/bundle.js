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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processSelectedFiles = processSelectedFiles;

var _ajax = __webpack_require__(2);

var getFileData = function getFileData(file) {

  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      resolve({ file: file, e: e, reader: reader });
    };
  });
};

//RENDER IMAGE AND POST CALL TO API
function processSelectedFiles(files) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      getFileData(file).then(function (_ref) {
        var file = _ref.file,
            e = _ref.e,
            reader = _ref.reader;
        var target = e.target;

        var div = document.createElement('div');
        var container = document.querySelector('.js-container');

        div.innerHTML = '<img class = "thumb" alt="' + file.name + '" src="' + target.result + '">\n\n    ';
        container.appendChild(div).addEventListener('click', function (e) {
          console.log(e);
        });
        console.log(div.querySelector('img').getAttribute('src'));
        (0, _ajax.POST)('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBHE9OOovbPznCiU_W3pFlsW4OjfNTmKmE', {
          requests: [{
            image: {
              content: div.querySelector('img').getAttribute('src').split('data:image/jpeg;base64,').pop()
            },
            features: [{
              type: "TEXT_DETECTION"
            }]
          }]
        }).then(function (data) {
          console.log(data.responses, "RESPONSE");
        });
      });
    } //END FOR OF LOOP
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
} //END processSelectedFiles()

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var updateProgress = function updateProgress(e) {
    if (e.lengthComputable) {
        var percentLoaded = Math.round(e.loaded / e.total * 100);
        // Increase the progress bar length.
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
};

//DRAG AND DROP
var dropzone = document.querySelector('#dropzone');
dropzone.addEventListener("dragover", function (e) {
    e.preventDefault();
}, false);

dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    var dataTransfer = e.dataTransfer;
    var files = dataTransfer.files;

    (0, _app.processSelectedFiles)(files);
}, false
//END DRAG AND DROP

//CHOOSE FILE
);document.querySelector('#fileupload').addEventListener('change', function (e) {
    var target = e.target;

    console.log(e);
    var files = target.files;

    (0, _app.processSelectedFiles)(files);
} //END CHOOSE FILE

// document.querySelector('.thumb').addEventListener('click',(e) => {
//   console.log(e);
// })
);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POST = exports.POST = function POST(url, data) {
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

/***/ })
/******/ ]);