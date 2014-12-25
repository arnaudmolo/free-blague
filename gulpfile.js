'use strict';

var gulp, del, path, $, dist, jshint, app, gulpMerge, react;

gulp      = require('gulp');
del       = require('del');
path      = require('path');
$         = require('gulp-load-plugins')();
jshint    = require('gulp-jshint');

gulpMerge = require('gulp-merge');
react     = require('gulp-react');

dist      = './client';
app       = './front/app/';

var browserify = require('browserify');
var reactify = require('reactify');
var to5Browserify = require('6to5ify');
var fs = require('fs');
var envify = require('envify');

// Styles
gulp.task('styles', function () {

  return gulp.src(app + 'styles/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['./front/bower_components'],
      compass: true
    }))
    .pipe(gulp.dest(dist + '/styles'))
    .pipe($.size());

});

var scripts;

scripts = function(){

  return browserify({ debug: false })
    // .add(require.resolve("6to5/browser-polyfill"))
    .transform(reactify)
    .transform(to5Browserify.configure({ modules: 'commonInterop' }))
    .transform(envify)
    .require(app + 'scripts/main.js', { entry: true })
    .bundle()
    .pipe(fs.createWriteStream(dist + '/scripts/main.js'));
};

gulp.task('scripts', scripts);

gulp.task('compress', ['scripts'], function(){
  return gulp.src(dist + '/scripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest(dist + '/scripts'));
});


gulp.task('html', function(){

  return gulp.src(app + '*.html')
    .pipe($.useref())
    .pipe(gulp.dest(dist))
    .pipe($.size());

});

gulp.task('images', function(){

  return gulp.src(app + 'images/**/*')
    .pipe($.cache($.imagemin({
      optilisationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(dist + '/images'))
    .pipe($.size());

});

// Clean
gulp.task('clean', function(cb){
  del([dist], {force: true}, cb);
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
  return gulp.src(app + './*.html')
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest(dist));
});

// Build
gulp.task('build', ['html', 'bundle', 'images', 'compress']);

// Default
gulp.task('default', ['clean', 'build']);

// Serve
gulp.task('serve', function(){

  gulp.src(dist)
    .pipe($.webserver({
      livereload: true,
      port: 9000
    }));

});

gulp.task('jshint', function(){

  return gulp.src(
    [app + './scripts/**/*.js',
         '!' + app + './scripts/utils/string-to-color.js',
         '!' + app + '/scripts/runtime.js'])
    .pipe($.react())
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));

});

// Bower
gulp.task('bower', function(){
  gulp.src(app + 'bower_components/**/*.js', {base: app + 'bower_components'})
    .pipe(gulp.dest(dist + '/bower_components'));
});

gulp.task('watch', ['html', 'scripts', 'serve'], function(){

  // Watch .html files
  gulp.watch(app + '*.html', ['html']);

  // Watch .sass
  gulp.watch(app + 'styles/*.{sass,scss}', ['styles']);

  gulp.watch(app + 'scripts/**/*.js', ['scripts']);

  gulp.watch(app + 'images**/*', ['images']);

});
