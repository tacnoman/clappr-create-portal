var ClapprCreatePortal =
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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clappr = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClapprCreatePortal = function (_CorePlugin) {
  _inherits(ClapprCreatePortal, _CorePlugin);

  function ClapprCreatePortal(core) {
    _classCallCheck(this, ClapprCreatePortal);

    var _this = _possibleConstructorReturn(this, (ClapprCreatePortal.__proto__ || Object.getPrototypeOf(ClapprCreatePortal)).call(this, core));

    _this.nextPortalID = 0;
    _this.panels = ['lower', 'middle', 'upper'];
    _this.positions = ['left', 'center', 'right'];
    return _this;
  }

  _createClass(ClapprCreatePortal, [{
    key: 'cachePanels',
    value: function cachePanels() {
      var _this2 = this;

      this.panels.forEach(function (panel) {
        _this2.positions.forEach(function (position) {
          var element = _this2.mediaControl.$el.find('.media-control-panel__' + panel + ' .media-control-position__' + position);

          _this2.mediaControlBlock[panel + position] = element;
        });
      });
    }
  }, {
    key: 'getExternalInterface',
    value: function getExternalInterface() {
      return {
        addPortal: this.addPortal
      };
    }
  }, {
    key: 'getPortal',
    value: function getPortal(id) {
      var v = this.mediaControl.$el.find('#' + id);
      if (v.length > 0) {
        // TODO: return element if panel and position are different?
        return v[0];
      }
    }
  }, {
    key: 'isValidPosition',
    value: function isValidPosition() {
      if (this.positions.indexOf(position) === -1) {
        console.error('position should be one of these: ["left", "center", "right"]');
        return false;
      }

      if (this.panels.indexOf(panel) === -1) {
        console.error('panel should be one of these: ["lower", "middle", "upper"]');
        return false;
      }
    }
  }, {
    key: 'addPortal',
    value: function addPortal(position) {
      var panel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'middle';

      if (!this.isValidPosition()) return;

      var id = this.nextPortalID++;

      var portal = $('<div />', {
        id: id,
        'data-controls': '',
        css: { width: '100px', height: '100px', background: 'red' }
      });

      this.mediaControlBlock[panel + position].append(portal[0]);

      return { id: id, element: portal[0] };
    }
  }, {
    key: 'name',
    get: function get() {
      return 'clappr_create_portal';
    }
  }, {
    key: 'mediaControl',
    get: function get() {
      return this.core.getPlugin('globo_media_control');
    }
  }]);

  return ClapprCreatePortal;
}(_Clappr.CorePlugin);

exports.default = ClapprCreatePortal;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Clappr;

/***/ })
/******/ ]);