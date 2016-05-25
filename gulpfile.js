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
var output_js_file_name = "bundle.js";
var paths = {
    pages: ['src/*.html'],
    config: ['src/config.js'],
    jspm: ['src/jspm_packages/']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(output_dir));
});

gulp.task("copy-jspm", function () {
    return gulp.src(paths.jspm)
        .pipe(gulp.dest(output_dir));
});

gulp.task("copy-config", function () {
    return gulp.src(paths.config)
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


gulp.task("default", ["copy-html", "copy-config","copy-jspm"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

gulp.task("clean", function () {
    return gulp.src(output_dir, {read: false})
        .pipe(clean());
})

gulp.task('deploy', [], function () {
    return surge({
        project: './app',         // Path to your static build directory
        domain: domain_name       // Your domain or Surge subdomain
    })
})