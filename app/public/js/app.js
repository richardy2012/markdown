webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Vue) {'use strict';

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	__webpack_require__(4);

	__webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var indexfn = new _index2.default();

	indexfn.app();

	// Vue.use(require('vue-resource'));

	// var ref = new Wilddog("https://doubi.wilddogio.com/");

	console.log(sessionStorage.lastname);

	var content = new Vue({
		el: '#app',
		data: {
			message: '你好世界!',
			data: sessionStorage.lastname
		},
		methods: {
			copy: function copy() {
				sessionStorage.lastname = this.data;
			}
		}
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import '../css/index.css'

	var toString = function () {
		function toString() {
			_classCallCheck(this, toString);
		}

		_createClass(toString, [{
			key: "app",
			value: function app() {
				console.log("你好新世界的大门");
			}
		}]);

		return toString;
	}();

	exports.default = toString;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);