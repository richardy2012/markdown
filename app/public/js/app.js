webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, VueRouter) {'use strict';

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	var _markdown = __webpack_require__(8);

	var _markdown2 = _interopRequireDefault(_markdown);

	var _my = __webpack_require__(12);

	var _my2 = _interopRequireDefault(_my);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	Vue.use(VueRouter);

	var router = new VueRouter();

	router.map({
		'/': {
			component: _my2.default
		},
		'/markdown': {
			component: _markdown2.default
		}
	});

	router.start(router, '#app');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue, Marked) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _markdown = __webpack_require__(9);

	var _markdown2 = _interopRequireDefault(_markdown);

	__webpack_require__(10);

	__webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var markdown = Vue.extend({
		template: _markdown2.default,
		data: function data() {
			return {
				ru: '这将是一个美好的开始'
			};
		},
		computed: {
			chu: function chu() {
				return Marked(this.ru);
			}
		},
		route: {
			data: function data(transition) {
				setTimeout(function () {
					transition.next();
				}, 1400);
			}
		}
	});

	exports.default = markdown;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<textarea class=\"markdown-ru\" v-model=\"ru\"></textarea>\n<div class=\"markdown-chu markdown-body\" v-html=\"chu\"></div>\n\n<div class=\"loading\" v-if=\"$loadingRouteData\">\n\t<div class=\"sk-cube-grid\">\n\t    <div class=\"sk-cube sk-cube1\"></div>\n\t    <div class=\"sk-cube sk-cube2\"></div>\n\t    <div class=\"sk-cube sk-cube3\"></div>\n\t    <div class=\"sk-cube sk-cube4\"></div>\n\t    <div class=\"sk-cube sk-cube5\"></div>\n\t    <div class=\"sk-cube sk-cube6\"></div>\n\t    <div class=\"sk-cube sk-cube7\"></div>\n\t    <div class=\"sk-cube sk-cube8\"></div>\n\t    <div class=\"sk-cube sk-cube9\"></div>\n\t</div>\n</div>";

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _my = __webpack_require__(13);

	var _my2 = _interopRequireDefault(_my);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var my = Vue.extend({
		template: _my2.default,
		route: {
			data: function data(transition) {
				setTimeout(function () {
					transition.next();
				}, 1400);
			}
		}
	});
	exports.default = my;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div>my</div>\n<div class=\"loading\" v-if=\"$loadingRouteData\">\n\t<div class=\"sk-cube-grid\">\n\t    <div class=\"sk-cube sk-cube1\"></div>\n\t    <div class=\"sk-cube sk-cube2\"></div>\n\t    <div class=\"sk-cube sk-cube3\"></div>\n\t    <div class=\"sk-cube sk-cube4\"></div>\n\t    <div class=\"sk-cube sk-cube5\"></div>\n\t    <div class=\"sk-cube sk-cube6\"></div>\n\t    <div class=\"sk-cube sk-cube7\"></div>\n\t    <div class=\"sk-cube sk-cube8\"></div>\n\t    <div class=\"sk-cube sk-cube9\"></div>\n\t</div>\n</div>";

/***/ }
]);