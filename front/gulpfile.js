var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

// ---------------------------------------------------------------------
// | My Var                                                               |
// ---------------------------------------------------------------------
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var inject = require('gulp-inject');
var manifest = require('gulp-manifest');
// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------



// ---------------------------------------------------------------------
// | My Part                                                        |
// ---------------------------------------------------------------------

gulp.task('manifest', function(){
  gulp.src([
    'dist/**/*',
  ])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      exclude: [
        'dist/templates',
        'dist/font',
        'dist/**/#*',
        'api',
        'app.appache'
      ],
      network: ['https://*'],
      filename: 'app.appcache',
    }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('useref', function () {
  var assets = useref.assets();

  return gulp.src('app/index.html')
    .pipe(assets)
    .pipe(gulpif('*.js', uglify({
      mangle: false
    })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done){
  require('del')([
    dirs.dist
  ], done);
});

gulp.task('copy', [
  'copy:fontawesome',
  'copy:templates',
  'copy:plugins',
  'copy:font',
  'copy:misc',
]);

gulp.task('copy:plugins', function(){
  return gulp.src(['app/js/plugins.js'])
    .pipe(gulp.dest(dirs.dist + '/js/'));
});



gulp.task('copy:fontawesome', function(){
  return gulp.src(['app/font-awesome-4.3.0/**/*'])
    .pipe(gulp.dest(dirs.dist + '/font-awesome-4.3.0'));
});

gulp.task('copy:font', function(){
  return gulp.src(['app/font/**/*'])
    .pipe(gulp.dest(dirs.dist + '/font'));
});


gulp.task('copy:bower', function () {
  return gulp.src(['app/bower_components/**/*'])
    .pipe(gulp.dest(dirs.dist + '/bower_components'));
});

gulp.task('copy:templates', function () {
  return gulp.src(['app/templates/**/*'])
    .pipe(gulp.dest(dirs.dist + '/templates'));
});

gulp.task('copy:misc', function () {
  return gulp.src([

    // Copy all files
    dirs.src + '/**/*',

    // Exclude the following files
    // (other tasks will handle the copying of these files)
    '!' + 'app' + '/css/**/*',
    '!' + 'app' + '/js/**/*',
    '!' + 'app' + '/templates/**/*',
    '!' + 'app' + '/img/**/*',
    '!' + 'app' + '/font/**/*',
    '!' + 'app' + '/font-awesome-4.3.0/**/*',
    '!' + 'app' + '/bower_components/**/*',
    '!' + 'app' + '/bower_components',
    '!' + 'app' + '/index.html'

  ], {

    // Include hidden files by default
    dot: false

  }).pipe(gulp.dest(dirs.dist));
});

//compress image
gulp.task('compress:img', function () {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('compress:icon', function () {
  return gulp.src(['app/*.png', 'app/*.ico'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/'));
});

//compress
gulp.task('compress:js', function() {
  return gulp.src('dist/js/*.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('compress:css', function() {
  return gulp.src('dist/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress:cola', function() {
  return gulp.src('app/js/vendor/cola.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('concat:js', function(){
  return gulp.src([
      'app/js/app.js',
      'app/js/config.js',
      'app/js/directive/equals.js',
      'app/js/directive/checkUsername.js',
      'app/js/directive/ngPin.js',
      'app/js/controllers.js',
      'app/js/controller/home.js',
      'app/js/controller/shop.js',
      'app/js/controller/blog.js',
      'app/js/controller/wiki.js',
      'app/js/controller/wikiarticle.js',
      'app/js/controller/forum.js',
      'app/js/controller/clogin.js',
      'app/js/controller/signup.js',
      'app/js/controller/blogarticles.js',
      'app/js/controller/demo.js',
      'app/js/controller/nav.js',
      'app/js/controller/order.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'));
});



gulp.task('concat:css', function(){
  return gulp.src([
      'app/css/vendor/cola.css',
      'app/css/vendor/fonts.css',
      'app/css/app.css'
  ])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css/'));
});
//relpace

gulp.task('replace', function() {
  gulp.src('app/index.html')
    .pipe(htmlreplace({
      'css': 'css/main.css',
      'js': ['js/plugins.js', 'js/main.js']
    }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('inject', function () {
  gulp.src('dist/index.html')
    .pipe(inject(gulp.src('dist/js/plugins.js', {read: false}), {relative: true}))
    .pipe(gulp.dest('dist'));
});

//Sass part
//
gulp.task('sass:foundation', function(){
  gulp.src(['components/foundation/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});

gulp.task('sass:bootstrap', function(){
  gulp.src(['components/bootstrap/stylesheets/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});


gulp.task('sass:app', function(){
  gulp.src(['scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});


//watch part
//
gulp.task('watch:foundation', function(){
  gulp.watch(['components/foundation/scss/**/*.scss'],
            ['sass:foundation']);
});

gulp.task('watch:bootstrap', function(){
  gulp.watch(['components/bootstrap/stylesheets/**/*.scss'],
             ['sass:bootstrap']);
});

gulp.task('watch:app', function(){
  gulp.watch(['scss/**/*.scss'],
             ['sass:app']);
});

//connect
//
gulp.task('connect', function(){
  connect.server({
    root: "app",
    host: "0.0.0.0",
    port: 8989,
    livereload: true
  });
});

gulp.task('connect:html', function() {
  gulp.src('app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('connect:css', function() {
  gulp.src('app/css/**/*.css')
    .pipe(connect.reload());
});

//connection:watch
//

gulp.task('connect:watch', function() {
  gulp.watch(['app/**/*.html'], ['connect:html']);
  gulp.watch(['app/css/**/*.css'], [ 'connect:css']);
});



// ---------------------------------------------------------------------
// | My Part Task                                                |
// ---------------------------------------------------------------------

gulp.task('watch', function(){

});

gulp.task('serve',
          ['sass:bootstrap',
           'sass:foundation',
           'sass:app',
            'connect',
           'connect:html',
           'connect:css',
           'connect:watch',
           'watch:foundation',
           'watch:bootstrap',
           'watch:app'
          ]);


gulp.task('build',function(done){
  runSequence(
    'clean',
    'sass:bootstrap',
    'sass:foundation',
    'sass:app',
    'useref',
    'copy',
    'compress:img',
    'inject',
    //'manifest',
    done);
});

