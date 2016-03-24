var gulp = require('gulp');
var replace = require('gulp-replace');
gulp.task('default',function(){
	gulp.src('./main.js')
		.pipe(replace(/mainWindow.loadURL((.*))/,function (a, b) {
                    return  "mainWindow.loadURL('file://'+__dirname+'/index.html');";
                }))
		.pipe(gulp.dest('./app/'));
	gulp.src('./package.json')
		.pipe(gulp.dest('./app/'))
});