"Use stricts"
/*----------------------- electron配置 --------------------------*/
var app = require('app');
var BrowserWindow = require('browser-window');


var mainWindow = null;

app.on('window-all-closed',function(){
	if(process.plathfrom != 'darwin'){
		app.quit();
	}
});

app.on('ready',function(){
	mainWindow = new BrowserWindow({width: 800,height: 600});

	mainWindow.loadURL('file://'+__dirname+'/app/index.html');
	
	mainWindow.on('closed',function(){
		mainWindow = null;
	});

	mainWindow.setTitle("我的markdown");
});
/*----------------------- electron配置 end-----------------------*/