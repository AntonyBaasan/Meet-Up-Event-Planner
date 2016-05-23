var gulp = require("gulp");
// var ts = require("gulp-typescript");
// var tsProject = ts.createProject("tsconfig.json");
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

var output_dir = "dist";
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/app.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(output_dir));
});

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