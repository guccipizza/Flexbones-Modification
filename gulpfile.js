global.localhostProxy = "localhost/port";
global.themePath = "app/themes/flexbones";

global.minifiedJsName = "scripts.min.js";
global.minifiedCssName = "min-style.css"; 
global.jsFolder = themePath + "/components/*";
global.scssFolder = themePath + "/assets/sass";



/******************************************/
/*	  _____ _    _ _      _____           */
/*	 / ____| |  | | |    |  __ \          */
/*	| |  __| |  | | |    | |__) |         */
/*	| | |_ | |  | | |    |  ___/          */
/*	| |__| | |__| | |____| |              */
/* 	 \_____|\____/|______|_|              */
/*                      				  */
/******************************************/

//Dependencies
var gulp = require('gulp'),
	sass = require('gulp-sass'),
 	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	prefix = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

//default task
gulp.task('default', ['watch']);

//Watch for changes on files
gulp.task('watch', function(){
	browserSync.init({ proxy: localhostProxy, files: ["**/*.php"] });
	gulp.watch(jsFolder + "/*.js", ['minJs']); //watch all js files
	gulp.watch(themePath + "/**/*.scss", ['scssCompile']); //watch all scss files
	gulp.watch(localhostProxy + "/**/*.php", ['phpUpdate']); //watch all scss files  
});

//Minify the JS code
gulp.task('minJs', function() {
	gulp.src(jsFolder + '/*.js') //load only js files
		.pipe(concat('all.js')) //compile all into one file
		.pipe(uglify()) //minify
		.on('error', console.error.bind(console)) //keep it going if error
		.pipe(rename( minifiedJsName )) //rename to min
		.pipe(gulp.dest( themePath )) //save in min-js
		.pipe(browserSync.stream()); //update browser sync
});

//Compile the SCSS code
gulp.task('scssCompile', function() {
	gulp.src(scssFolder + "/style.scss")
		.pipe(sass({outputStyle: 'compressed'})) //compile + minify
		.on('error', console.error.bind(console)) //keep it going if error
		.pipe(prefix()) //auto prefix bc otherwise cross browser would be bad
		.pipe(rename( minifiedCssName )) //rename to min
		.pipe(gulp.dest( themePath )) //destination
		.pipe(browserSync.stream()); //update browser sync
});

