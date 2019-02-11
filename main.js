module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("shallowequal");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(2);

// EXTERNAL MODULE: external "shallowequal"
var external_shallowequal_ = __webpack_require__(3);
var external_shallowequal_default = /*#__PURE__*/__webpack_require__.n(external_shallowequal_);

// CONCATENATED MODULE: ./src/connectOwnProps.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var pickOwnProps = function pickOwnProps(propNames, ownProps) {
  return typeof propNames === 'function' ? propNames(ownProps) : (Array.isArray(propNames) ? propNames : [propNames]).reduce(function (acc, propName) {
    return _objectSpread({}, acc, _defineProperty({}, propName, ownProps[propName]));
  }, {});
};

var makeMakeMapFunction = function makeMakeMapFunction(propNames, makeOrMapFunction) {
  if (typeof makeOrMapFunction !== 'function') return makeOrMapFunction;

  var makeMapFunction = function makeMapFunction(_state, ownProps) {
    var pickedOwnProps = pickOwnProps(propNames, ownProps);
    var mapFunction = makeOrMapFunction;
    return function (state) {
      var result = mapFunction(state, pickedOwnProps); // Handle factory functions.

      if (typeof result === 'function') {
        mapFunction = result;
        result = mapFunction(state, pickOwnProps);
      }

      return result;
    };
  };

  return makeMapFunction;
};

var connectOwnProps_makeKeyedOwnProps = function makeKeyedOwnProps(propNames, ConnectedComp) {
  var key = 0;
  var lastPropsKey;
  var lastPickedOwnProps;

  var ConnectOwnProps = function ConnectOwnProps(props) {
    var pickedOwnProps = pickOwnProps(propNames, props);

    if (props.key !== lastPropsKey || !external_shallowequal_default()(pickedOwnProps, lastPickedOwnProps)) {
      key++;
      lastPropsKey = props.key;
      lastPickedOwnProps = pickedOwnProps;
    }

    return external_react_default.a.createElement(ConnectedComp, _extends({
      key: key
    }, props), props.children);
  };

  ConnectOwnProps.displayName = "ConnectOwnProps(".concat(ConnectedComp.displayName, ")");
  ConnectOwnProps.propTypes = {
    children: external_prop_types_default.a.node,
    key: external_prop_types_default.a.any
  };
  return ConnectOwnProps;
};

var connectOwnProps_makeConnectOwnProps = function makeConnectOwnProps(propNames, makeMapStateToProps, makeMapDispatchToProps, mergeProps, options) {
  return function (Comp) {
    var ConnectedComp = Object(external_react_redux_["connect"])(makeMapStateToProps, makeMapDispatchToProps, mergeProps, options)(Comp);
    var ConnectOwnProps = connectOwnProps_makeKeyedOwnProps(propNames, ConnectedComp);
    return ConnectOwnProps;
  };
};

var connectOwnProps = function connectOwnProps(propNames, mapStateToProps, mapDispatchToProps, mergeProps, options) {
  var makeMapStateToProps = makeMakeMapFunction(propNames, mapStateToProps);
  var makeMapDispatchToProps = makeMakeMapFunction(propNames, mapDispatchToProps);
  var madeConnectOwnProps = connectOwnProps_makeConnectOwnProps(propNames, makeMapStateToProps, makeMapDispatchToProps, mergeProps, options);
  return madeConnectOwnProps;
};


/* harmony default export */ var src_connectOwnProps = (connectOwnProps);
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return src_connectOwnProps; });


/***/ })
/******/ ]);
