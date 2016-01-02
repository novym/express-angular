var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var styleInput ='./src/styles/**/*.scss';
var outputPath = 'public';
console.log(styleInput);
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
// ===== Compile SCSS files to CSS
gulp.task('sass', function () {
    return gulp
      .src(styleInput)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(gulp.dest(outputPath));
});

// ===== Watch source files, if changed run the tasks again.
gulp.task('watch', function() {
    return gulp.watch(styleInput, ['sass'])
    .on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
});



gulp.task('default', ['sass', 'watch']);
