import '../css/index.css';
import markdown from '../js/markdown.js';
import my from '../js/my.js';
Vue.use(VueRouter);

var router = new VueRouter();

router.map({
	'/':{
		component: my
	},
	'/markdown': {
		component: markdown
	},
	'/my': {
		component: my
	}
});
router.start(router, '#app');