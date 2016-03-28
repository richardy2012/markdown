import markdownview from '../view/markdown.html';

import '../css/markdown.less';
import 'github-markdown-css';

var markdown = Vue.extend({
	template: markdownview,
	data:function(){
		return {
			ru:'这将是一个美好的开始'
		}
	},
	computed:{
		chu:function(){
			return Marked(this.ru);
		}
	},
	route: {
		data: function (transition) {
		setTimeout(function () {
			transition.next();
		}, 1400)}
	}
})

export default markdown;