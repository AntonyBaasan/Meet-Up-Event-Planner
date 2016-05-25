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


var output_dir = "app";
var output_js_file_name = "bundle.js";
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(output_dir));
});


var browserifyChain = browserify({
    basedir: '.',
    debug: true,
    entries: ['src/app.ts'],
    cache: {},
    packageCache: {}
})
    .plugin(tsify);

var watchedBrowserify = watchify(browserifyChain);

function bundle() {
    return watchedBrowserify
        .transform("babelify")
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source(output_js_file_name))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(output_dir));
}


gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

// gulp.task("default", function (cb) {
//     runSequence(
//         "compile",
//         cb
//     );
// })
//
// gulp.task("rebuild", function (cb) {
//     runSequence(
//         "clean",
//         "compile",
//         cb
//     );
// })
//
// gulp.task("compile", function () {
//     return tsProject.src()
//         .pipe(ts(tsProject))
//         .js.pipe(gulp.dest(output_dir));
// })
//
gulp.task("clean", function () {
    return gulp.src(output_dir, {read: false})
        .pipe(clean());
})