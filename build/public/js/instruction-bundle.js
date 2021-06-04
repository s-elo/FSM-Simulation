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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/otherPreset/index.js":
/*!****************************************!*\
  !*** ./public/js/otherPreset/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $imgs = $(\"img\");\r\n$.each($imgs, function (index, value) {\r\n  //console.log($(this).attr('src'));\r\n  var arr = $(this).attr(\"src\").split(\"\\\\\");\r\n  //console.log(arr);\r\n  var imgName = arr[arr.length - 1];\r\n  //console.log(imgName)\r\n  var imgPath = \"../public/img/\" + imgName;\r\n  console.log(imgPath);\r\n  $(this).attr(\"src\", imgPath);\r\n});\r\n\r\n// color\r\nlet storage = window.localStorage;\r\nlet currentcolor = \"#e6e6e6\";\r\n\r\nif (storage.getItem(\"curColor\")) {\r\n  currentcolor = storage.getItem(\"curColor\");\r\n}\r\n$(\"body\").css(\"background-color\", currentcolor);\r\n\r\n$(\"nav ul\").css(\"background-color\", \"black\");\r\n\r\n/** handle the nav collapse and open*/\r\n// collapse or open the nav\r\n$(\".navbar-header button\").click(() => {\r\n  console.log(\"click\", $(\".navbar-header button\"));\r\n\r\n  let $btn = $(\".navbar-header button\");\r\n  let $navbar = $(\"#navbar\");\r\n\r\n  // before click it is collapsed\r\n  if ($btn.hasClass(\"collapsed\")) {\r\n    $btn.attr(\"aria-expanded\", \"true\");\r\n    $navbar.attr(\"aria-expanded\", \"true\");\r\n  }\r\n  // before click it is exspended\r\n  else {\r\n    $btn.attr(\"aria-expanded\", \"false\");\r\n    $navbar.attr(\"aria-expanded\", \"false\");\r\n  }\r\n\r\n  $navbar.toggleClass(\"in\");\r\n  $btn.toggleClass(\"collapsed\");\r\n});\r\n\n\n//# sourceURL=webpack:///./public/js/otherPreset/index.js?");

/***/ }),

/***/ 1:
/*!**********************************************!*\
  !*** multi ./public/js/otherPreset/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./public/js/otherPreset/index.js */\"./public/js/otherPreset/index.js\");\n\n\n//# sourceURL=webpack:///multi_./public/js/otherPreset/index.js?");

/***/ })

/******/ });