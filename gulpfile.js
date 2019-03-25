'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var del = require('del');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var svgo = require('svgo');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('js_min', function () {
  return gulp.src('source/js/js_module/*.js')
  .pipe(concat('javascript.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(uglify())
  .pipe(rename('javascript-min.js'))
  .pipe(gulp.dest('build/js'))
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        cascade: false,
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(csso())
    .pipe(rename('style-min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.task('refresh', function (done) {
    server.reload();
    done();
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'refresh'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/js_module/*.js', gulp.series('js_min', 'refresh'));
});

gulp.task('images', function() {
  return gulp.src('source/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function() {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('source/img'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
  .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'js_min'));

gulp.task('start', gulp.series('build', 'server'));
