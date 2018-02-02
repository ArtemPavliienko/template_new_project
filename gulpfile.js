var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-csso'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();


gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './project'
    });

    gulp.watch('./project/*.sass',['sass']);
    gulp.watch('./project/js/main.js',['js']);
    gulp.watch('./project/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
    gulp.watch('./project/*.sass', ['sass']);
    gulp.src('./project/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./project/css/'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() { 
  gulp.src('./project/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./project/css/'))
});

gulp.task('js', function() {
   return gulp.src('./project/main.js')
});
gulp.task('js', function() {
    browserSync.reload();
});


gulp.task('default', ['serve']);
