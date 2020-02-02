const gulp = require('gulp'),
  sass = require('gulp-sass'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-clean-css'),
  prefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  shell = require('gulp-shell'),
  checkCSS = require('gulp-check-unused-css');

const base_path = './',
  src = base_path + 'assets/',
  dist = base_path + '_site/assets',
  paths = {
    js: src + '/js/*.js',
    scss: [src + '/_scss/*.scss',
    src + '/_scss/**/* .scss',
    src + '/_scss/**/**/*.scss'
    ],
    jekyll: [
      '*.html',
      '_posts/*',
      '_layouts/*',
      '_includes/*',
      'assets/*',
      'assets/**/*',
    ]
  };

// Compile SASS to CSS
gulp.task('compile-sass', () => {
  return gulp.src(paths.scss)
    .pipe(plumber((error) => {
      gutil.log(gutil.colors.red(error.message));
      gulp.task('compile-sass').emit('end');
    }))
    .pipe(sass())
    .pipe(prefixer('last 3 version', 'ie 9'))
    .pipe(minifyCSS())
    .pipe(rename({
      dirname: dist + '/css'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('copy-css', function () {
  return gulp.src('./assets/css/main.css').pipe(gulp.dest('./'));
});

// Build Jekyll DEV
gulp.task('build-jekyll-dev', shell.task(['bundle exec jekyll build --config=_config.yml,_config-dev.yml']))

// Serve Jekyll DEV
gulp.task('serve-jekyll-dev', shell.task(['bundle exec jekyll serve --config=_config.yml,_config-dev.yml']))

// Build Jekyll PROD
gulp.task('build-jekyll-prod', shell.task(['JEKYLL_ENV=production bundle exec jekyll build']))

// Setup Server
gulp.task('server', () => {
  connect.server({
    root: ['_site'],
    port: 4000
  });
})

// Check unused CSS
gulp.task('check-css', () => {
  return gulp.src(['_site/assets/css/*.css', '_site/*.html'])
    .pipe(checkCSS());
})

// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.jekyll, ['serve-jekyll-dev']);
});

// Start everything with the default task
gulp.task('default', ['serve-jekyll-dev', 'watch']);