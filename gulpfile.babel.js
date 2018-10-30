import 'babel-polyfill';
import babelify from 'babelify';

import postcss from 'gulp-postcss';
import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import less from 'gulp-less';
import clean from 'gulp-clean';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import log from 'gulplog';
import tap from 'gulp-tap';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssnano';
import prefix from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import sassLint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';

// // Temporary solution until gulp 4
// // https://github.com/gulpjs/gulp/issues/355
import runSequence from 'run-sequence';

// SETUP ERROR DISPLAY
var displayError = function(error) {
  // Initial building up of the error
  var errorString = '[' + error.plugin.error.bold + ']';
  errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
      errorString += ' in ' + error.fileName;

  if(error.lineNumber)
      errorString += ' on line ' + error.lineNumber.bold;

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString);
};

// SETUP ERROR ALERT
var onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err);
  this.emit('end');
};

var sassOptions = {
  outputStyle: 'expanded'
};

var prefixerOptions = {
  browsers: ['last 4 versions']
};



gulp.task('clean-sass', function() {
	return gulp.src('./assets/css/**/*', {read: false})
		.pipe(clean());
});
gulp.task('styles', ['clean-sass'], function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(prefix(prefixerOptions))
    // .pipe(rename('style.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('sass-lint', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});



gulp.task('clean-js', function() {
  return gulp.src('./assets/js/**/*', {read: false})
    .pipe(clean());
});
// THANK YOU: https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-multiple-destination.md
gulp.task('js', ['clean-js'], () => {
  return gulp.src('src/js/*.js',{read: false})
    .pipe(tap(function(file){
      log.info('bundling ' + file.path);
      file.contents = browserify(file.path, {debug:true}).transform('babelify', {presets: ['env']}).bundle();
    }))
    .pipe(buffer())
    .pipe(gulp.dest('assets/js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))    
    .pipe(gulp.dest('assets/js'));
});











gulp.task('clean-styles', function() {
	return gulp.src('./css/styles.css', {read: false})
		.pipe(clean());
});
gulp.task('clean-header', function() {
	return gulp.src('./css/customproductcolor.css', {read: false})
		.pipe(clean());
});


gulp.task('less', ['clean-styles'], function() {
	var plugins = [
		autoprefixer({browsers: ['last 3 versions']}),
		cssnano()
	];
    return gulp.src('./less/styles.less')  // only compile the entry file
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./css'))
});

// gulp.task('header', ['clean-header'], function() {
// 	var plugins = [
// 		autoprefixer({browsers: ['last 3 versions']}),
// 		cssnano()
// 	];
//     return gulp.src('./less/customproductcolor.less')
//         .pipe(less())
//         .pipe(postcss(plugins))
//         .pipe(gulp.dest('./css'))
// });


gulp.task('watch', function() {
  gulp.watch('./less/*.less', ['less']);  // Watch all the .less files, then run the less task
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['js']);
});



// gulp.task('watch', function() {
//     gulp.watch('./less/*.less', ['less']);  // Watch all the .less files, then run the less task
// });

gulp.task('default', ['watch']); // Default will run the 'entry' watch task

gulp.task('build', ['js','styles','less']); // Run less build
// gulp.task('build', ['js','styles','less','header']); // Run less build