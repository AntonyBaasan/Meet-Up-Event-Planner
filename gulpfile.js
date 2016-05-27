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
var Server = require('karma').Server;
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
//var run = require("gulp-run");
var exec = require('child_process').exec;
var gls = require('gulp-live-server');

var domain_name = 'meetup-planner-antony.surge.sh';

var output_dir = {
    base: "app",
    jspm: "app/jspm_packages",
    templates: "app/templates",
};

var paths = {
    pages: ['src/**/*.html', 'src/**/*.js', 'src/**/*.js.map'],
    config: ['src/config.js'],
    jspm: ['src/jspm_packages/**']
};

gulp.task("copy-html-js", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(output_dir.base));
});

gulp.task("copy-jspm", function () {
    return gulp.src(paths.jspm)
        .pipe(gulp.dest(output_dir.jspm));
});

gulp.task("copy-config", function () {
    return gulp.src(paths.config)
        .pipe(gulp.dest(output_dir.base));
});

gulp.task("default", ['build']);

gulp.task("rebuild", function (callback) {
    runSequence('clean',
        'build',
        callback);
});

gulp.task("build", ["copy-jspm"], function(callback){
    runSequence(
        "compile",
        callback);
});

gulp.task("build.prod", ["copy-jspm"], function(callback){
    runSequence(
        "compile.prod",
        callback);
});

gulp.task("compile", function(callback){
    runSequence(
        "compile-ts",
        "unbundle",
        "copy-config",
        "copy-html-js",
        callback);
});
gulp.task("compile.prod", function(callback){
    runSequence(
        "compile-ts",
        "bundle",
        "copy-config",
        "copy-html-js",
        callback);
});


gulp.task("bundle",function (cb) {
    exec('jspm bundle ./src/app.js ./src/app.bundle.js --inject --minify', function (err, stdout, stderr) {
        cb(err);
    });
})

gulp.task("unbundle", ['clean-bundle-result'],function (cb) {
    exec('jspm unbundle', function (err, stdout, stderr) {
        cb(err);
    });
});

gulp.task("clean-bundle-result",function (cb) {
    return gulp.src('./src/app.bundle.*', {read: false})
        .pipe(clean());
});

gulp.task("compile-ts", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest("src"));
});

gulp.task("clean", ['unbundle'],function () {
    return gulp.src(output_dir.base, {read: false})
        .pipe(clean());
})

gulp.task('deploy', ["build"], function () {
    return surge({
        project: './app',         // Path to your static build directory
        domain: domain_name       // Your domain or Surge subdomain
    })
})

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('serve', ['build'], function() {
    var server = gls.static('app', 8888);
    server.start();


    gulp.watch(['src/**/*.ts','src/**/*.html'], ['compile'], function (file) {
        server.notify.apply(server, [file]);
    });

});

gulp.task('serve.prod', ['build.prod'], function() {
    var server = gls.static('app', 8888);
    server.start();


    gulp.watch(['src/**/*.ts','src/**/*.html'], ['compile.prod'], function (file) {
        server.notify.apply(server, [file]);
    });
});
