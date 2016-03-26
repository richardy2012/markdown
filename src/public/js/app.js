import '../css/index.css';
import '../css/window.less';
import '../css/loading.less';

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
	}
});

router.start(router, '#app');