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

var domain_name = 'meetup-planner-antony.surge.sh';

var output_dir = {
    base: "app",
    jspm: "app/jspm_packages",
    templates: "app/templates",
};

var paths = {
    pages: ['src/**/*.html', 'src/**/*.js', 'src/**/*.js.map'],
    //templates: ['src/templates/**'],
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

gulp.task("build", ["copy-jspm", "copy-config"], function(callback){
    runSequence(
        "compile",
        "copy-html-js",
        callback);
});

gulp.task("build.prod", ["copy-jspm", "copy-config"], function(callback){
    runSequence(
        "compile",
        "bundle",
        "copy-html-js",
        callback);
});

// gulp.task("bundle", function () {
//     run('jspm bundle ./src/app.js ./src/app.bundle.js --inject --minify').exec();
// });

gulp.task("bundle",function (cb) {
    exec('jspm bundle ./src/app.js ./src/app.bundle.js --inject --minify', function (err, stdout, stderr) {
        // console.log(err);
        // console.log(stdout);
        // console.log(stderr);
        cb(err);
    });
})

gulp.task("compile", function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest("src"));
});

gulp.task("clean", function () {
    return gulp.src(output_dir.base, {read: false})
        .pipe(clean());
})

gulp.task('deploy', ["build"], function () {
    return surge({
        project: './app',         // Path to your static build directory
        domain: domain_name       // Your domain or Surge subdomain
    })
})

gulp.task('watch', function () {
    var watcher = gulp.watch(['src/**/*.ts','src/**/*.html'], ['compile']);
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
