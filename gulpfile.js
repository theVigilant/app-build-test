"use strict";
//css imports
const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const uglifyCSS = require("gulp-uglifycss");
//js imports
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglifyJS = require("gulp-uglify");

//paths
const paths = {
	src: {
		scss: "./src/scss/*.scss",
		js: "./src/js/*.js",
		json: "./src/json/*.json",
		html: "./src/*.html"
	},
	build: {
		css: "./build/css",
		js: "./build/js",
		html: "./build",
		json: "./build/json",
	}

};


//CSS tasks
gulp.task("compile-sass", () => {
	return gulp.src(paths.src.scss)
		.pipe(
			sass().on("error", sass.logError))
		.pipe(uglifyCSS({
			"uglyComments": true
		}))
		.pipe(gulp.dest(paths.build.css))
});

gulp.task("sass:watch", () => {
	gulp.watch(paths.src.scss, gulp.series("compile-sass"));
});


//JS tasks
gulp.task("js-build", () => {
	return gulp.src(paths.src.js)
		.pipe(
			concat("main.js")
		)
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(uglifyJS())
		.pipe(gulp.dest(paths.build.js))
});


gulp.task("js:watch", () => {
	gulp.watch(paths.src.js, gulp.series("js-build"))
});

//html + json files
gulp.task("move-html", () => {
	return gulp.src(paths.src.html)
		.pipe(gulp.dest(paths.build.html));

});
//this doesn't work for some reason
gulp.task("move-json", () => {
	console.log("moving json!");
	return gulp.src(paths.src.json)
		.pipe(gulp.dest(paths.build.json))
});
gulp.task("move-files", gulp.series("move-html", "move-json"));

//default task
gulp.task("default", gulp.series("move-files", "compile-sass", "js-build", gulp.parallel("sass:watch", "js:watch")));