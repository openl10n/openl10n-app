import browserSync from 'browser-sync'
import fs from 'fs'
import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import runSequence from 'run-sequence'

const $ = gulpLoadPlugins()
const reload = browserSync.reload

//
// Configuration
//
let config = {
  assetsDir: 'assets',
  srcDir: 'src',
  distDir: 'dist',
}

//
// Default
//
gulp.task('default', ['watch'])

//
// Build
//
gulp.task('build', ['clean'], cb => {
  runSequence(
    'assets',
    'scripts',
    'styles',
    'templates',
    cb
  );
})

//
// Clean
//
gulp.task('clean', cb => {
  del(config.distDir, cb)
});

//
// Serve
//
gulp.task('serve', ['build'], cb => {
  browserSync({
    open: true,
    port: 3000,
    files: {
      // src: config.srcDir
    },
    server: {
      baseDir: ['.'],
      // Because the server use the current directory to serve files then we
      // auto prefix path if the required file is in the dist directory.
      // Otherwise it means it tries to require a file in the `jspm_packages`
      // directory.
      middleware: function (req, res, next) {
        // Every files should be in dist directory except:
        // - jspm.conf.js
        // - jspm_packages/*
        if (!req.url.match(/^\/(jspm.conf.js|jspm_packages)/)) {
          req.url = '/' + config.distDir + req.url
        }

        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
      }
    }
  }, cb)
})

//
// Watch
//
gulp.task('watch', ['serve'], () => {
  // Javascript
  gulp.watch([`${config.srcDir}/**/*.js`], ['scripts'])

  // Stylesheets
  gulp.watch([`${config.srcDir}/**/*.scss`], ['styles'])

  // Templates
  gulp.watch([`${config.srcDir}/**/*.html`], ['templates'])

  // Assets
  gulp.watch([`${config.assetsDir}/**/*`], ['assets'])
});

//
// Static files
//
gulp.task('assets', () => {
  // Source assets
  gulp
    .src(`${config.assetsDir}/**/*`)
    .pipe(gulp.dest(config.distDir))
    .pipe(reload({ stream: true }))
})

//
// Stylesheets
//
gulp.task('styles', () => {
  let files = [
    'jspm_packages/github/angular/bower-material*/angular-material.min.css',
    `${config.srcDir}/styles/**/*.scss`,
    `${config.srcDir}/components/**/*.scss`,
  ]

  gulp
    .src(files)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.css'))
    .pipe($.sass({
      precision: 10,
    }).on('error', $.sass.logError))
    //.pipe($.autoprefixer({
    //  browsers: ['last 1 versions'],
    //  cascade: false,
    //}))
    .pipe($.minifyCss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(`${config.distDir}/css`))
    .pipe($.size({title: 'styles'}))
    .pipe(reload({ stream: true }))
})

//
// Templates
//
gulp.task('templates', () => {
  gulp
    .src(`${config.srcDir}/**/*.html`)
    .pipe(gulp.dest(config.distDir))
    .pipe(reload({ stream: true }))
})

//
// Javascript
//
gulp.task('scripts', () => {
  let compilerOptions = {
    modules: 'system',
    moduleIds: false,
    stage: 2,
    optional: [
      'es7.decorators',
      'es7.classProperties'
    ]
  }

  // All javascript files except tests
  let files = [
    `${config.srcDir}/**/*.js`,
    `!${config.srcDir}/**/*.spec.js`,
  ]

  gulp.src(files)
    .pipe($.plumber())
    .pipe($.changed(config.distDir, {extension: '.js'}))
    .pipe($.sourcemaps.init())
    .pipe($.babel(Object.assign({}, compilerOptions, {modules:'system'})))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(config.distDir))
    .pipe($.size({title: 'scripts'}))
    .pipe(reload({ stream: true }))
})

//
// Lint
//
gulp.task('lint', function() {
  return gulp.src(`${config.srcDir}/**/*.js`)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});
