'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var babel = require("gulp-babel");
var babelify = require("babelify");
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

// Production: clean -> compress -> inject
gulp.task('run_default_development', ['clean:js_development',
        'browserify-development'],
    function() {
        var target = gulp.src('index.html');
        var sources = gulp.src(['dev/*.js'], {read: false});

        return target.pipe(inject(sources, {
            ignorePath: 'servo',
            addRootSlash: false
        }))
            .pipe(gulp.dest(''));
    });

// Production: clean -> compress -> inject
gulp.task('run_default_production', ['clean:js_production',
        'browserify-production'],
    function() {
        var target = gulp.src('index.html');
        var sources = gulp.src(['dist/*.js'], {read: false});

        return target.pipe(inject(sources, {
            ignorePath: 'servo',
            addRootSlash: false
        }))
            .pipe(gulp.dest(''));
    });

//Clean js dev
gulp.task('clean:js_development', function (cb) {
    del([
        'dev/**/*'
    ], cb);
});

//Clean js prod
gulp.task('clean:js_production', function (cb) {
    del([
        'dist/**/*'
    ], cb);
});

/*
*   Browserify Development
*
* */
gulp.task('browserify-development', function() {
    return browserify('./js/app.js')
        .transform(babelify, {optional: ["es7.decorators"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(rename({ extname: ''+new Date().getTime()+'.min.js' }))
        .pipe(gulp.dest('dev'));
});

/*
 *   Browserify Production
 *
 * */
gulp.task('browserify-production', function() {
    return browserify('./js/app.js')
        .transform(babelify, {optional: ["optimisation.react.inlineElements", "es7.decorators"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ extname: ''+new Date().getTime()+'.min.js' }))
        .pipe(gulp.dest('dist'));
});

/*
*   Watch for changes
*
* */
gulp.task('watch', function() {
    gulp.watch('js/dev/**/*.js', ['dev']);
    gulp.watch('js/app.js', ['app_dev']);
});

/*
*   Watchify
*
* */
var bundler = watchify(browserify(watchify.args));
// add the file to bundle
bundler.add('./js/app.js');
// add any other browserify options or transforms here
bundler.transform(babelify, {optional: ["es7.decorators"]});

gulp.task('run_watchify_dev', bundle); // so you can run `gulp watchify` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // minify for production
        //.pipe(buffer())
        //.pipe(uglify())
        //.pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dev'));
}
