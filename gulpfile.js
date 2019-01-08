'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

// Scripts!

// Default task 
gulp.task('default', ['styles', 'copyHTML', 'imageMin', 'scripts', 'copyFiles', 'watcher' ]);

// Watcher
gulp.task('watcher', function(){
  gulp.watch('src/sass/*.scss', ['styles'])
  gulp.watch('src/*.html', ['copyHTML'])
  gulp.watch('src/img/*', ['imageMin'])
  gulp.watch('src/ts/*', ['scripts'])
  gulp.watch('src/files/*', ['copyFiles'])
})

// Translate SASS to CSS
gulp.task('styles', function(){
    return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('pub/css')); 
})

// Translates ts to js and uglifies
gulp.task('scripts', function () {
  return gulp.src('src/ts/*')
      .pipe(ts({
          noImplicitAny: true,
          outFile: 'output.js'
      }))
      .pipe(uglify())
      .pipe(gulp.dest('pub/js'));
});

// Minimizes images
gulp.task('imageMin', function(){
    return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('pub/img'));
});

// Copy files from src/ to pub
gulp.task('copyFiles', function(){
    return gulp.src('src/files/*')
    .pipe(gulp.dest('pub/files'))
});

// Copy all HTML files from src/ to pub/
gulp.task('copyHTML', function(){
  return gulp.src('src/*.html')
  .pipe(gulp.dest('pub'));
});