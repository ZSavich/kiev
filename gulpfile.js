var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

gulp.task('less', function(){
	return gulp.src('./less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascase: false
			}))
		.pipe(gulp.dest('./css'))
		.pipe(browsersync.stream())
		.pipe(csso())
		.pipe(rename({
			suffix: '.min'
			}))
		.pipe(gulp.dest('./css/'));
});

gulp.task('server', ['less'], function(){
	browsersync.init({
		server: {
			baseDir: './'
		}
		});
	gulp.watch('./less/**/*.less', ['less']);
	gulp.watch('*.html').on('change', browsersync.reload);
});

gulp.task('html:build', function(){
	gulp.src('*.html')
		.pipe(gulp.dest('dist/'));
});

gulp.task('js:build', function(){
	gulp.src('.js/**/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({
				suffix: '.min'
			}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css:build', function(){
	gulp.src('./css/*.css')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('image:build', function(){
	gulp.src('img/**/*.*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
			}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('fonts:build', function(){
	gulp.src('fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', [
	'html:build',
	'js:build',
	'css:build',
	'image:build',
	'fonts:build'
]);

gulp.task('clean', function(cb){
	rimraf('dist', cb);
});