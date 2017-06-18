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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.processSelectedFiles = processSelectedFiles;

var _ajax = __webpack_require__(1);

// import {mapper} from './apiMapper'

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
        var target = e.target,
            loaded = e.loaded;

        var container = document.querySelector('.js-container');
        var div = document.createElement('div');

        div.innerHTML = '<div id="progress" >' + loaded + '</div>\n      <img class="thumb" alt="' + file.name + '" src="' + target.result + '">\n      <div>' + file.name + '</div>\n    ';
        container.appendChild(div);
        console.log("HERE BEFORE DATA");
        ///zoom picture and draw one box over it
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
          var img = document.querySelector('img');
          img.addEventListener('click', function (e) {
            return overLay(e, img);
          });
          var responses = data.responses;

          var text = responses[0].textAnnotations;
          var ogDimensions = responses[0].fullTextAnnotation.pages[0];

          Object.keys(ogDimensions).map(function (val) {
            var dimensions = ogDimensions[val];
            console.log(dimensions, "!!!!!!!!!");
            console.log(typeof dimensions === 'undefined' ? 'undefined' : _typeof(dimensions));

            var _dimensions = _slicedToArray(dimensions, 2),
                height = _dimensions[0],
                width = _dimensions[1];

            console.log([height, width]);
          });
          console.log("WORD BY WORD:", text, "FULL TEXT:", ogDimensions);
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


var overLay = function overLay(e, img) {
  var target = e.target;
  var classList = target.classList;

  classList.remove('thumb');
  classList.add('thumb-zoom');
  var imageCont = document.querySelector('.js-image-container');
  imageCont.style.display = 'block';
  imageCont.appendChild(img);
};

/***/ }),
/* 1 */
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

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
  var files = target.files;

  (0, _app.processSelectedFiles)(files);
} //END CHOOSE FILE
);

/***/ })
/******/ ]);