var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['less', 'minify-css', 'browserSync'], function(){
  gulp.watch('app/less/*.less', ['less', 'minify-css', browserSync.reload]);
  gulp.watch('app/*.html', browserSync.reload);
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

gulp.task('minify-css', ['less'], function() {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', ['less', 'minify-css'], function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})
