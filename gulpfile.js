var gulp = require('gulp')
var gutil = require('gulp-util')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var iconfont = require('gulp-iconfont')
var iconfontCSS = require("gulp-iconfont-css")
var jshint = require('gulp-jshint')
var karma = require('gulp-karma')
var ngAnnotate = require('gulp-ng-annotate')
var plumber = require('gulp-plumber')
var rimraf = require('rimraf')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var streamqueue = require('streamqueue')
var templateCache = require('gulp-angular-templatecache')
var uglify = require('gulp-uglify')

//
// Variables
//
var srcDir = './src';
var distDir = './dist';
var vendorDir = './bower_components';
var isDebug = !gutil.env.prod;

var vendorFiles = [
  vendorDir + '/jquery/dist/jquery.js',
  vendorDir + '/lodash/dist/lodash.js',
  vendorDir + '/string/lib/string.js',
  vendorDir + '/angular/angular.js',
  vendorDir + '/angular-ui-router/release/angular-ui-router.js',
  vendorDir + '/angular-gravatar/build/md5.js',
  vendorDir + '/angular-gravatar/build/angular-gravatar.js',
  vendorDir + '/angular-hotkeys/build/hotkeys.js',
  vendorDir + '/ngInfiniteScroll/build/ng-infinite-scroll.js',
  vendorDir + '/angular-elastic/elastic.js',
  vendorDir + '/angular-scroll/angular-scroll.js',
];
var sourceFiles = [
  srcDir + '/app.js',
  srcDir + '/**/*.js',
  '!' + srcDir + '/public/**/*.js',
];
var testFiles = [
  'bower_components/angular-mocks/angular-mocks.js',
  'test/**/*.js'
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

  gulp.watch(srcDir + '/views/**/*', ['templates']);

  gulp.src(vendorFiles.concat(sourceFiles).concat(testFiles))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
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
  // Versionned assets
  gulp.src(srcDir + '/public/**/*')
    .pipe(gulp.dest(distDir))

  // Flags icons
  gulp.src(vendorDir + '/flag-icon-css/flags/**/*')
    .pipe(gulp.dest(distDir + '/images/flags'))
})

//
// Templates
//
gulp.task('templates', function () {
  gulp.src(srcDir + '/views/**/*')
    .pipe(gulp.dest(distDir + '/views'))
})

//
// Javascript
//
gulp.task('scripts', function () {
  var bootstrap = gulp.src(srcDir + '/bootstrap.js');

  var vendor = gulp.src(vendorFiles)

  var src = gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(ngAnnotate())

  // Combine into a single app script
  var queue = new streamqueue({ objectMode: true })
    .queue(bootstrap)
    .queue(vendor)
    .queue(src)

  // Inline templates in prod mode
  if (!isDebug) {
    var templates = gulp.src(srcDir + '/views/*.html')
      .pipe(templateCache('templates.js', {
        standalone: true,
        root: 'views',
      }))

    queue.queue(templates)
  }

  queue.done()
    .pipe(sourcemaps.init())
      .pipe(concat('app.js', {newLine: ';'}))
      // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir))
})

//
// Stylesheet
//
gulp.task('styles', function () {
  gulp.src(srcDir + '/styles/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(distDir))
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

//
// Lint
//
gulp.task('lint', function() {
  return gulp.src(sourceFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//
// Test
//
gulp.task('test', function (done) {
  var files = [srcDir + '/bootstrap.js']
    .concat(vendorFiles)
    .concat(sourceFiles)
    .concat(testFiles)

  return gulp.src(files)
    .pipe(karma({
      configFile: __dirname + '/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
