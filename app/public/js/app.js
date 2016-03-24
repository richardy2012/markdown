webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {'use strict';

	__webpack_require__(3);

	var _markdown = __webpack_require__(4);

	var _markdown2 = _interopRequireDefault(_markdown);

	var _my = __webpack_require__(5);

	var _my2 = _interopRequireDefault(_my);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Vue.component('markdown', _markdown2.default);
	Vue.component('my', _my2.default);

	new Vue({
		el: '#app'
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var markdown = Vue.extend({
		template: '<div>markdown</div>'
	});

	exports.default = markdown;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _my = __webpack_require__(6);

	var _my2 = _interopRequireDefault(_my);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var my = Vue.extend({
		template: _my2.default
	});
	exports.default = my;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div>my</div>";

/***/ }
]);