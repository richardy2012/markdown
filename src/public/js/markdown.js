import markdownview from '../view/markdown.html'

var markdown = Vue.extend({
	template: markdownview,
	route: {
		data: function (transition) {
		setTimeout(function () {
			transition.next();
		}, 1400)}
	}
})

export default markdown;