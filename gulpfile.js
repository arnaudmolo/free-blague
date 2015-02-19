'use strict';

var gulp, del, path, $, dist, app, browserify, reactify, to5Browserify, fs, envify, aliasify;

del           = require('del');
fs            = require('fs');
path          = require('path');
gulp          = require('gulp');

$             = require('gulp-load-plugins')();

browserify    = require('browserify');
to5Browserify = require('6to5ify');
envify        = require('envify');
aliasify      = require('aliasify').configure({
  aliases: {
      "API": "./front/app/scripts/front-api.js"
  },
  configDir: __dirname
});

dist          = './client';
app           = './front/app/';

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

// Font
gulp.task('fonts', function () {

  return gulp.src(app + 'fonts/**/*')
    .pipe(gulp.dest(dist + '/fonts'));

});

function scripts(){

  var bundler = browserify({ debug: false })
    .transform(to5Browserify.configure({experimental: true}))
    .transform(envify)
    .transform(aliasify);

    if (process.env.NODE_ENV === 'production') {
      bundler
        .transform({
          global: true
        }, 'uglifyify');
    };

  return bundler
    .require(app + 'scripts/main.js', { entry: true })
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
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
  $.cache.clearAll();

});

// Bundle
gulp.task('bundle', ['styles', 'images', 'fonts', 'scripts', 'bower'], function(){

  return gulp.src(app + './*.html')
    .pipe($.plumber())
    .pipe($.useref.assets())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest(dist));

});

// Build
gulp.task('build', ['html', 'bundle']);

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
         '!' + app + './scripts/utils/string-to-color.js'])
    .pipe($.react())
    .pipe($.jshint('./.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'));

});

// Bower
gulp.task('bower', function(){

  gulp.src(app + 'bower_components/**/*.js', {base: app + 'bower_components'})
    .pipe(gulp.dest(dist + '/bower_components'));

});

// App watcher
gulp.task('watch', ['html', 'scripts', 'images', 'fonts', 'styles', 'serve'], function(){

  // Watch .html files
  gulp.watch(app + '*.html', ['html']);

  // Watch .sass
  gulp.watch(app + 'styles/*.{sass,scss}', ['styles']);

  gulp.watch(app + 'scripts/**/*.js', ['scripts']);

  gulp.watch(app + 'images/**/*', ['images']);

});
