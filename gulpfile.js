var gulp = require("gulp");
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var watchify = require("watchify");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var paths = {
    output_dir: "dist",
    output_libs: "dist/lib",
    pages: ['src/*.html'],
    libs: ['bower_components/system.js'
            ,''],
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(output_dir));
});

gulp.task("copy-lib", function () {
    return gulp.src(paths.libs)
        .pipe(gulp.dest(output_libs));
});


gulp.task("default", ["copy-html", "copy-lib"], function () {
    return tsProject.src()
        .pipe(uglify())
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest(paths.output_dir));
});

gulp.task("clean", function () {
    return gulp.src(output_dir, {read: false})
        .pipe(clean());
})