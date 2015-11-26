'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var ngHtml2Js = require('browserify-ng-html2js');
var minifyHTML = require('gulp-minify-html');

var paths = {
  lint: [
    'src/**/*.js',
  ],
  browserify: [
    'src/**/*.js',
    'src/**/*.html',
  ],
  css: [
    'src/**/*.css',
  ],
  html: [
    'src/popup.html',
  ],
};

gulp.task('default', ['lint'], function() {
  gulp.watch(paths.lint, ['lint']);
  gulp.watch(paths.browserify, ['browserify-popup']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(paths.files2copy, ['copy-files']);
  console.log('gulp default task run');
});

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('browserify-popup', function() {
  return browserify('./src/index.js', {
      insertGlobals: true,
      debug: true
    })
    .transform(ngHtml2Js({
      module: 'app.templates',
      extension: 'html'
    }))
    .bundle()
    .pipe(source('popup.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(uglifycss())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-html', function() {
  return gulp.src(paths.html)
    .pipe(minifyHTML({}))
    .pipe(gulp.dest('./dist'));
});
