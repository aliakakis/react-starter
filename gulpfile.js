'use strict';

require("babel-core/register");

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
var notify = require('gulp-notify');
var mocha = require('gulp-mocha');

// Production: clean -> compress -> inject
gulp.task('01_run_default_development', ['clean:js_development',
        'browserify-development', 'inject:js_development']);

// Production: clean -> compress -> inject
gulp.task('02_run_default_production', ['clean:js_production',
        'browserify-production', 'inject:js_production']);

//Clean js dev
gulp.task('clean:js_development', function () {
    del([
        'dev/**/*'
    ]);
});

//Clean js prod
gulp.task('clean:js_production', function () {
    del([
        'dist/**/*'
    ]);
});

/**
 * Browserify Development
 */
gulp.task('browserify-development', ['clean:js_development'], function() {
    return browserify('./js/app.js')
        .transform(babelify, {
            presets: ["es2015", "react"],
            plugins: ["transform-decorators-legacy",
                      "transform-class-properties"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(rename({ extname: ''+new Date().getTime()+'.js' }))
        .pipe(gulp.dest('dev'));
});

/**
 * Browserify Production
 */
gulp.task('browserify-production', ['clean:js_production'], function() {
    return browserify('./js/app.js')
        .transform(babelify, {
            presets: ["es2015", "react"],
            plugins: ["transform-decorators-legacy",
                      "transform-react-inline-elements",
                      "transform-class-properties"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ extname: ''+new Date().getTime()+'.min.js' }))
        .pipe(gulp.dest('dist'));
});

//Inject js dev
gulp.task('inject:js_development', ['browserify-development'], function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['dev/*.js'], {read: false});

    return target.pipe(inject(sources, {
            ignorePath: 'react-starter',
            addRootSlash: false
        }))
        .pipe(gulp.dest(''));
});

//Inject production dev
gulp.task('inject:js_production', ['browserify-production'], function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['dist/*.js'], {read: false});

    return target.pipe(inject(sources, {
            ignorePath: 'react-starter',
            addRootSlash: false
        }))
        .pipe(gulp.dest(''));
});

/**
 * Testing
 */
gulp.task('test', function () {
    return gulp.src('js/dev/**/*.spec.js', { read: false })
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});

/**
 * Watch for changes
 */

gulp.task('watch', function() {
    gulp.watch('js/dev/**/*.js', ['dev']);
    gulp.watch('js/app.js', ['app_dev']);
});

/**
 * Watchify
 */
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
