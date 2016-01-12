var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // opens a URL in a web browser
var browserify = require('browserify'); // bundles JS
var reactify = require('reactify'); // transforms JSX into JS
var source = require('vinyl-source-stream'); // uses conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lints JS files, including JSX

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    images: './src/images/*',
    dist: './dist',
    mainJs: './src/main.js'
  }
};

// starts a local development server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

// moves html files to dist folder and reloads
gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

// bundles js files, moves them to dist folder, and reloads
gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify) // transforms JSX to JS
    .bundle() // combines all JS files into one
    .on('error', console.error.bind(console)) // reports errors
    .pipe(source('bundle.js')) // names bundle
    .pipe(gulp.dest(config.paths.dist + '/scripts')) // destination
    .pipe(connect.reload()); // reloads browser
});

// bundles css files, moves them to dist folder
gulp.task('css', function() {
  gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css'));
});

// migrates images to dist folder & publishes favicon
gulp.task('images', function() {
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'))
      .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});

// handles js linting
gulp.task('lint', function() {
  return gulp.src(config.paths.js)
             .pipe(lint({config: '.eslintrc'}))
             .pipe(lint.format());
});

// opens the URL in a web browser
gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// watches files for changes and reloads
gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

// runs tasks by typing 'npm-exec gulp' in the command line
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);