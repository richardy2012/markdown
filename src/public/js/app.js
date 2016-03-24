import '../css/index.css';
import markdown from '../js/markdown.js';
import my from '../js/my.js'

Vue.component('markdown', markdown)
Vue.component('my',my);

new Vue({ 
	el: '#app'
})