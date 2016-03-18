var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var App = Vue.extend({
	template:'<div>你好，一个完美的开端<p>谢谢</p></div>'
})

var router = new VueRouter()

// router.map({
//     '/foo': {
//         component: Foo
//     },
//     '/bar': {
//         component: Bar
//     }
// })

router.start(App, '#app')