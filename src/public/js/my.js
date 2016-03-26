import myview from '../view/my.html'

var my = Vue.extend({
	template: myview,
	route: {
		data: function (transition) {
		setTimeout(function () {
			transition.next();
		}, 1400)}
	}
}); 
export default my;