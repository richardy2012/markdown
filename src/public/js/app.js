import index from './index.js';
import '../css/index.css'
var indexfn = new index();

indexfn.app()

Vue.use(require('vue-resource'));

var ref = new Wilddog("https://doubi.wilddogio.com/");

console.log(sessionStorage.lastname);

var content=new Vue({
	el: '#app',
	data: {
		message: '你好世界!',
		data: sessionStorage.lastname
	},
	methods:{
		copy:function(){
			sessionStorage.lastname=this.data;
		}
	}
})
