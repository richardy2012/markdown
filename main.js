"Use stricts"
/*----------------------- electron配置 --------------------------*/
var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');

var mainWindow = null;

app.on('window-all-closed',function(){
	if(process.plathfrom != 'darwin'){
		app.quit();
	}
	globalShortcut.unregisterAll();
});
app.on('browser-window-blur',function(){
	globalShortcut.unregister('option+command+i');
	globalShortcut.unregister('command+c');
	globalShortcut.unregister('command+a');
	globalShortcut.unregister('command+v');
	globalShortcut.unregister('command+x');

	console.log('失去焦点');
});


app.on('ready',function(){

	mainWindow = new BrowserWindow({width: 800,height: 600});

	mainWindow.loadURL('file://'+__dirname+'/app/index.html');

	mainWindow.on('closed',function(){
		mainWindow = null;
	});

	globalShortcut.register('option+command+i',function(){
		mainWindow.toggleDevTools();
	});

	app.on('browser-window-focus',function(){
		console.log('获得焦点');
		globalShortcut.register('command+c',function(){
			console.log("复制");
			mainWindow.copy();
		});

		globalShortcut.register('command+a',function(){
			console.log("全选");
			mainWindow.selectAll();
		});

		globalShortcut.register('command+v',function(){
			console.log("粘贴")
			mainWindow.paste();
		});

		globalShortcut.register('command+x',function(){
			console.log("剪除");
			mainWindow.cut();
		});
	});
	
	mainWindow.setTitle("我的markdown");
});
/*----------------------- electron配置 end-----------------------*/