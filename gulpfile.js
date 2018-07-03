const gulp = require('gulp'),
      babel = require('gulp-babel'),
      sass = require('gulp-sass'),
      minifyCSS = require('gulp-csso'),
      rename = require('gulp-rename'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create(),
      image = require('gulp-image');


gulp.task('serve', ['sass', 'babel'], () => {
    browserSync.init({
        server: './project'
    });

    gulp.watch('./project/common.blocks/**/*.sass',['sass']);
    browserSync.watch('project/**/*.*').on('change', browserSync.reload);
});


gulp.task('sass', () => {
    gulp.watch('./project/common.blocks/style.sass');
    gulp.src('./project/common.blocks/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 7 versions']
        }))
        .pipe(gulp.dest('./project/css/'))
        .pipe(browserSync.stream());
});


gulp.task('css', () => {
  gulp.src('./project/css/style.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./project/css/'))
});


gulp.task('babel', () => {
    gulp.src('./project/js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename({suffix: '.es5'}))
        .pipe(gulp.dest('./project/js/bab/'))
});


gulp.task('image', () => {
    gulp.src('./project/img/**/*')
        .pipe(image())
        .pipe(gulp.dest('./project/img/'));
});


gulp.task('delCss', () => {
    return gulp.src('./project/css/style.css')
        .pipe(uncss({
            html: ['./project/index.html']
        }))
        .pipe(gulp.dest('./project/css/'));
});


gulp.task('default', ['serve']);

gulp.task('cssImg', ['css', 'image', 'delCss']);
