var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // opens a URL in a web browser
var browserify = require('browserify'); // bundles JS
var babelify = require('babelify'); // transforms to ES6
var source = require('vinyl-source-stream'); // uses conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // lints JS files, including JSX
var sass = require('gulp-sass'); // bundles Sass CSS

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    css: [
      './src/**/*.css'
    ],
    sass: [
      './src/styles/*.scss'
    ],
    fonts: [
      './node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
      './node_modules/font-awesome/fonts/*',
      './src/fonts/**/*'
    ],
    images: './src/images/*',
    dist: './dist',
    mainJs: './src/index.js',
    externalJs: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
    ]
  }
};

// starts a local development server
gulp.task('connect', function() {
  return connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
    fallback: 'dist/index.html'
  });
});

// moves html files to dist folder and reloads
gulp.task('html', function() {
  return gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

// bundles js files, moves them to dist folder, and reloads
gulp.task('js', function() {
  gulp.src(config.paths.externalJs)
      .pipe(gulp.dest(config.paths.dist + '/assets/scripts'))
      .pipe(connect.reload());

  return browserify({
    entries: config.paths.mainJs,
    require: config.paths.extJs,
    extensions: ['.js'],
    debug: true
  })
    .transform(babelify, { presets: ["es2015", "react"] }) // transforms JSX to JS & ES6
    .bundle() // combines all JS files into one
    .on('error', console.error.bind(console)) // reports errors
    .pipe(source('bundle.js')) // names bundle
    .pipe(gulp.dest(config.paths.dist + '/assets/scripts')) // destination
    .pipe(connect.reload()); // reloads browser
});

// bundles sass files, moves them to dist folder
gulp.task('sass', function() {
  return gulp.src(config.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/assets/css'))
    .pipe(connect.reload()); // reloads browser
});

// migrates images to dist folder & publishes favicon
gulp.task('images', function() {
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/assets/images'))
      .pipe(connect.reload());

  gulp.src('./src/favicon.ico')
      .pipe(gulp.dest(config.paths.dist));
});

// migrates fonts to a dist folder
gulp.task('fonts', function() {
  return gulp.src(config.paths.fonts)
      .pipe(gulp.dest(config.paths.dist + '/assets/fonts'))
      .pipe(connect.reload());
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
  gulp.watch(config.paths.sass, ['sass']);
  gulp.watch(config.paths.fonts, ['fonts']);
});

// runs tasks by typing 'npm-exec gulp' in the command line
gulp.task('default', ['html', 'js', 'sass', 'images', 'fonts', 'lint', 'open', 'watch']);
