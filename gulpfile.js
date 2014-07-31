var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var connect = require('gulp-connect')
var ngAnnotate = require('gulp-ng-annotate');
var rimraf = require('rimraf')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass');
var uglify = require('gulp-uglify')

//
// Variables
//
var srcDir = './src';
var distDir = './dist';
var vendorDir = './bower_components';
var isDebug = !gutil.env.prod;

var javascriptFiles = [
  vendorDir + '/angular/angular.js',
  srcDir + '/app.js',
  srcDir + '/**/*.js'
];

//
// Default
//
gulp.task('default', ['build'], function() {
  gulp.start('watch');
});

//
// Clean
//
gulp.task('clean', function(cb) {
  rimraf(distDir, cb);
});

//
// Build
//
gulp.task('build', ['clean'], function() {
  gulp.start('scripts', 'styles', 'public');
});

//
// Watch
//
gulp.task('watch', ['server'], function() {
  gulp.watch(srcDir + '/**/*.js', ['scripts']);

  gulp.watch(srcDir + '/**/*.styl', ['styles']);
});

//
// Server
//
gulp.task('server', function() {
  connect.server({
    root: distDir,
    port: 3000,
    livereload: false
  });
});

//
// Assets
//
gulp.task('public', function () {
  gulp.src(srcDir + '/public/*')
    .pipe(gulp.dest(distDir))
})


//
// Javascript
//
gulp.task('scripts', function () {
  gulp.src(javascriptFiles)
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(ngAnnotate())
      // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir + '/js'))
})

//
// Stylesheet
//
gulp.task('styles', function () {
  gulp.src(srcDir + '/styles/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(distDir + '/css'))
})
