var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');

var jsFiles = './assets/js/*.js';
var scssFiles = './assets/sass/**/*.scss';
var imgFiles = './assets/images/*';

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(concat('./dist/js'))
		.pipe(rename('dist.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', function () {
	return gulp.src(scssFiles)
	    .pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
	    .pipe(gulp.dest('./dist/css'));
});

gulp.task('imagemin', () =>
    gulp.src(imgFiles)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);
 
gulp.task('watch', function () {
	gulp.watch(scssFiles, ['sass']);
	gulp.watch(jsFiles, ['js']);
});

gulp.task('default', function() {
	gulp.run('js', 'sass', 'imagemin');
});