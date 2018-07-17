const gulp = require('gulp'),
  sass = require('gulp-sass'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  minifyCSS = require('gulp-clean-css'),
  prefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  shell = require('gulp-shell');

const base_path = './',
  src = base_path + 'assets/',
  dist = base_path + '_site/assets',
  paths = {
    js: src + '/js/*.js',
    scss: [src + '/_scss/*.scss',
      src + '/_scss/**/* .scss',
      src + '/_scss/**/**/*.scss'
    ],
    jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*', 'assets/*', 'assets/**/*', '404.html', 'about.md', 'projects.md', 'photography.html', 'reminder.md', 'tags.html']
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

// Build Jekyll
gulp.task('build-jekyll', shell.task(['bundle exec jekyll build']))

// Build Jekyll
gulp.task('serve-jekyll', shell.task(['bundle exec jekyll serve']))

// Setup Server
gulp.task('server', () => {
  connect.server({
    root: ['_site'],
    port: 4000
  });
})

// Watch files
gulp.task('watch', () => {
  //gulp.watch(paths.scss, ['compile-sass']);
  //gulp.watch(paths.jekyll, ['serve-jekyll']);
  gulp.watch(paths.scss, ['serve-jekyll']);
});

// Start everything with the default task
gulp.task('default', ['serve-jekyll', 'watch']);