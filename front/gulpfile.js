'use strict';

var gulp, del, path, $, es6ify, source;

gulp = require('gulp');
del  = require('del');
path = require('path');
$    = require('gulp-load-plugins')();
es6ify = require('es6ify');
source = require('source');

// Styles
gulp.task('styles', function () {

    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['./bower_components'],
            compass: true
        }))
        // .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());

});

gulp.task('scripts', function(){

  // console.log(es6ify.runtime);

  gulp.src('app/scripts/runtime.js')
    .pipe(gulp.dest('dist/scripts'));

  return gulp.src('app/scripts/main.js')
    .pipe(
      $.browserify(
        {
          insertGlobals: true,
          // add: es6ify.runtime,
          transform: [
            'reactify',
            'es6ify',
            'envify'
          ]
        }
      )
    )
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());

});

gulp.task('html', function(){

  return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());

});

gulp.task('images', function(){

  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optilisationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());

});

// Clean
gulp.task('clean', function(cb){
  del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});
// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default
gulp.task('default', ['clean', 'build']);

// Serve
gulp.task('serve', function(){

  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000
    }))

});

// Bower
gulp.task('bower', function(){
  gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('watch', ['html', 'serve'], function(){

  // Watch .html files
  gulp.watch('app/*.html', ['html']);

  // Watch .sass
  gulp.watch('app/styles/*.{sass,scss}', ['styles']);

  gulp.watch('app/scripts/**/*.js', ['scripts']);

  gulp.watch('app/images**/*', ['images']);

});
