/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//s.lietou-static.com/dev/core/pc/v3/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	(function (window, document, undefined) {
	  var url = void 0,
	      cookie = void 0,
	      FeLoader = void 0,
	      __CDN_FETCH_ERROR__ = null;
	  url = '//s.lietou-static.com/';
	  cookie = {
	    name: '_fecdn_',
	    get: function get(name) {
	      var nameEQ = name + '=';
	      var ca = document.cookie.split(';');
	      for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === ' ') {
	          c = c.substring(1, c.length);
	        }if (c.indexOf(nameEQ) === 0) {
	          return decodeURIComponent(c.substring(nameEQ.length, c.length));
	        }
	      }
	      return null;
	    },
	    set: function set(name, value, days) {
	      var expires, date;
	      var domain = document.domain.split('.').reverse().slice(0, 2).reverse().join('.');
	      date = new Date();
	      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	      expires = date.toGMTString();
	      document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires + ';path=/;domain=' + domain;
	    },
	    mark: function mark(value) {
	      this.set(this.name, value, 1);
	      if (value === '0') {
	        if (window.navigator.userAgent.indexOf('Baiduspider') === -1) {
	          new Image().src = '//cat-app.liepin.cn/broker-service/api/single?v=1&ts=' + new Date().valueOf() + '&tu=' + encodeURIComponent('//lietou-static.com/cdn-error') + '&d=9999&hs=-903&ec=&' + Math.random();
	        }
	        __CDN_FETCH_ERROR__ = true;
	      } else if (value === '1') {
	        __CDN_FETCH_ERROR__ = false;
	      }
	    }
	  };
	  switch (cookie.get(cookie.name)) {
	    case '0':
	      __CDN_FETCH_ERROR__ = true;
	      break;
	    case '1':
	      __CDN_FETCH_ERROR__ = false;
	      break;
	    default:
	      (function () {
	        var img = new Image();
	        img.src = url + 'fe-mobile-h5/v5/cdntest.png';
	        if (img.complete) {
	          cookie.mark('1');
	        } else {
	          img.onload = function () {
	            cookie.mark('1');
	          };
	          img.onerror = function (err) {
	            cookie.mark('0');
	          };
	        }
	      })();
	      setTimeout(function () {
	        __CDN_FETCH_ERROR__ === null && cookie.mark('0');
	      }, 8000);
	  }
	  window.__CDN_FETCH_ERROR__ = __CDN_FETCH_ERROR__;
	  FeLoader = {
	    get: function get() {
	      for (var i = 0; i < arguments.length; i++) {
	        var _url = arguments[i];
	        var extention = (_url.match(/\.([^.]+)$/) || [0, ''])[1];
	        if (window.__CDN_FETCH_ERROR__) {
	          _url = _url.replace('s.', 'iconcat.');
	        }
	        switch (extention) {
	          case 'js':
							document.write(decodeURI('%3Cscript crossorigin="anonymous" src="' + _url + '"%3E%3C/script%3E')); // jshint ignore:line
	            break;
	          case 'css':
	            document.write(decodeURI('%3Clink rel="stylesheet" href="' + _url + '""%3E')); // jshint ignore:line
	            break;
	        }
	      }
	    }
	  };
	  window.FeLoader = FeLoader;
	})(window, document);

/***/ }
/******/ ]);
