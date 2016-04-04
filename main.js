"Use stricts"
/*----------------------- electron配置 --------------------------*/
let app = require('app');
let BrowserWindow = require('browser-window');
let globalShortcut = require('global-shortcut');
let Electron = require('electron');

const ipcMain = Electron.ipcMain;

const dialog = Electron.dialog;

let mainWindow = null;

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
	globalShortcut.unregister('command+option+o');
	// console.log('失去焦点');
});



app.on('ready',function(){

	ipcMain.on('asynchronous-message', function(event, arg) {
	  console.log(arg);  // prints "ping"
	  event.sender.send('asynchronous-reply', 'pong');
	});

	ipcMain.on('synchronous-message', function(event, arg) {
	  console.log(arg);  // prints "ping"
	  event.returnValue = 'pong';
	});

	mainWindow = new BrowserWindow({width: 800,height: 600});

	mainWindow.loadURL('file://'+__dirname+'/app/index.html');


	mainWindow.on('closed',function(){
		mainWindow = null;
	});

	mainWindow.setTitle("我的markdown");
});

app.on('browser-window-focus',function(){
	// console.log('获得焦点');
	globalShortcut.register('command+c',function(){
		// console.log("复制");
		mainWindow.copy();
	});

	globalShortcut.register('option+command+i',function(){
		mainWindow.toggleDevTools();
	});
	
	globalShortcut.register('command+a',function(){
		// console.log("全选");
		mainWindow.selectAll();
	});

	globalShortcut.register('command+v',function(){
		// console.log("粘贴");
		mainWindow.paste();
	});

	globalShortcut.register('command+x',function(){
		// console.log("剪除");
		mainWindow.cut();
	});

	globalShortcut.register('command+option+o',function(){
		dialog.showOpenDialog({
			options:{
				properties:['openFile', 'openDirectory']
			}
		})
		// dialog.showOpenDialog(function (fileNames) {
		// 	console.log(fileNames)
		// });
	})
});


/*----------------------- electron配置 end-----------------------*/