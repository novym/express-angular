var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack-stream');

var PATHS = {
  styles: './src/styles/**/*.scss',
  bundle: './src/**/*.js',
  output: 'public'
};
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// ===== Remove the public directory (it will be recreated during the build task)
gulp.task('clean', function() {
  return del([
    'public/'
  ]);
});

// ===== Compile SCSS files to CSS
gulp.task('styles', function() {
  return gulp
    .src(PATHS.styles)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(PATHS.output))
    .pipe(livereload());
});

// ===== bundle modules with webpack
gulp.task('bundle', function(callback) {
  return gulp.src('src/main/bootstrap.js')
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest(PATHS.output))
    .pipe(livereload());
});

gulp.task('build', ['clean', 'styles', 'bundle']);

// ===== Watch source files, if changed run the tasks again.
gulp.task('watch',['build'], function() {
  livereload.listen();
  gulp.watch(PATHS.styles, ['styles']);
  gulp.watch(PATHS.output).on('change', livereload.changed);
});


gulp.task('default', ['watch']);
