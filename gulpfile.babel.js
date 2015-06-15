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
    'public',
    'scripts',
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
    port: 9000,
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

  // Assets
  gulp.watch([`${config.srcDir}/public/**/*`], ['public'])
});

//
// Static files
//
gulp.task('public', () => {
  // Source assets
  gulp
    .src(`${config.srcDir}/public/**/*`)
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

  let files = [
    `${config.srcDir}/**/*.js`,
    // Excludes tests & assets
    `!${config.srcDir}/**/*.spec.js`,
    `!${config.srcDir}/public`,
  ]

  gulp.src(files)
    .pipe($.plumber())
    .pipe($.changed(config.distDir, {extension: '.js'}))
    .pipe($.sourcemaps.init())
    .pipe($.babel(Object.assign({}, compilerOptions, {modules:'system'})))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(config.distDir))
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
