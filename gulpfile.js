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
var surge = require('gulp-surge')


var domain_name = 'meetup-planner-antony.surge.sh';
var output_dir = "app";
var output_dir_jspm = "app/jspm_packages";
var output_js_file_name = "bundle.js";
var paths = {
    pages: ['src/*.html'],
    config: ['src/config.js'],
    jspm: ['src/jspm_packages/**']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(output_dir));
});

gulp.task("copy-jspm", function () {
    return gulp.src(paths.jspm)
        .pipe(gulp.dest(output_dir_jspm));
});

gulp.task("copy-config", function () {
    return gulp.src(paths.config)
        .pipe(gulp.dest(output_dir));
});

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function (callback) {
    runSequence(
        'build',
        'watch',
        callback);
});

gulp.task("rebuild", function (callback) {
    runSequence('clean',
        'build',
        'watch',
        callback);
});

gulp.task("build", ["compile", "copy-jspm"], function () {
});

gulp.task("compile", ["copy-html", "copy-config"], function(){
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest(output_dir));
});

gulp.task("clean", function () {
    return gulp.src(output_dir, {read: false})
        .pipe(clean());
})

gulp.task('deploy', ["default"], function () {
    return surge({
        project: './app',         // Path to your static build directory
        domain: domain_name       // Your domain or Surge subdomain
    })
})

gulp.task('watch', function () {
    // gulp.watch('files', ['task1', 'task2']);
    var watcher = gulp.watch('src/**', ['compile']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

