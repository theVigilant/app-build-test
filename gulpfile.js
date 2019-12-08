"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const babel = require("gulp-babel");




//CSS stuff
gulp.task("compile-sass", () => {
	return gulp.src("./scss/*.scss")
		.pipe(
			sass().on("error", sass.logError))
		.pipe(gulp.dest("./css"))
});

gulp.task("sass:watch", () => {
	gulp.watch("./scss/*.scss", gulp.series("compile-sass"));
});

gulp.task("default", gulp.series("compile-sass", "sass:watch"));

//JS stuff
