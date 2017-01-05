var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['less', 'sass', 'minify-css', 'browserSync'], function(){
  gulp.watch('app/less/*.less', ['less', 'minify-css', browserSync.reload]);
  gulp.watch('app/sass/*.scss', ['sass', 'minify-css', browserSync.reload]);
  gulp.watch('app/dist/*.html', browserSync.reload);
})

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', ['less'], function () {
  return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('minify-css', ['less', 'sass'], function() {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', ['less', 'sass', 'minify-css'], function() {
  browserSync.init({
    server: {
      baseDir: 'app/dist'
    },
  })
})
