import index from './index.js';
import '../css/index.css'
var indexfn = new index();

indexfn.app()

Vue.use(require('vue-resource'));

var ref = new Wilddog("https://doubi.wilddogio.com/");

// sessionStorage.lastname="Smith";
console.log(sessionStorage.lastname);

var content=new Vue({
	el: '#app',
	data: {
		message: '你好世界!',
		data: sessionStorage.lastname
	},
	methods:{
		copy:function(){
			// ref.set({
			//     "worktile" : {
			//         "type" : "word",
			//         "content" : this.data
			//     }
			// });
			// alert("保存成功");
			sessionStorage.lastname=this.data;
		}
	}
})
// ref.child("worktile/content").on("value", function(datasnapshot) {
	
// });
