var gulp = require('gulp')
var gutil = require('gulp-util')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var iconfont = require('gulp-iconfont')
var iconfontCSS = require("gulp-iconfont-css")
var ngAnnotate = require('gulp-ng-annotate')
var plumber = require('gulp-plumber')
var rimraf = require('rimraf')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')

//
// Variables
//
var srcDir = './src';
var distDir = './dist';
var vendorDir = './bower_components';
var isDebug = !gutil.env.prod;

var javascriptFiles = [
  vendorDir + '/lodash/dist/lodash.js',
  vendorDir + '/string/lib/string.js',
  vendorDir + '/angular/angular.js',
  vendorDir + '/angular-ui-router/release/angular-ui-router.js',
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
  gulp.start('scripts', 'styles', 'public', 'templates');
});

//
// Watch
//
gulp.task('watch', ['server'], function() {
  gulp.watch(srcDir + '/**/*.js', ['scripts']);

  gulp.watch(srcDir + '/**/*.scss', ['styles']);

  gulp.watch(srcDir + '/public/**/*', ['public']);

  gulp.watch(srcDir + '/templates/**/*', ['templates']);
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
  gulp.src(srcDir + '/public/**/*')
    .pipe(gulp.dest(distDir))
})

//
// Templates
//
gulp.task('templates', function () {
  gulp.src(srcDir + '/templates/**/*')
    .pipe(gulp.dest(distDir + '/partials'))
})


//
// Javascript
//
gulp.task('scripts', function () {
  gulp.src(javascriptFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('app.js', {newLine: ';'}))
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
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(distDir + '/css'))
})

//
// Icons
//
gulp.task('icons', function(){
  gulp.src([srcDir + '/icons/*.svg'])
    .pipe(iconfontCSS({
      fontName : 'icons',
      // path: 'scss',
      path: srcDir + '/styles/templates/icons.scss',
      targetPath: '../../styles/icons.scss',
      fontPath: '../fonts/' // relative path
    }))
    .pipe(iconfont({
      fontName: 'icons',
      // fixedWidth: true,
      normalize: true
    }))
    .pipe(gulp.dest(srcDir + '/public/fonts'));
});
