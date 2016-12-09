var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');

gulp.task('watch', function(){
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/less/*.less', ['minify-css']);
})

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
