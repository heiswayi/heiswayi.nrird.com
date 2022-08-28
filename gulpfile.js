'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

const destDir = '_site/assets/css';
const scssDir = [
    'assets/_scss/*.scss',
    'assets/_scss/**/*.scss',
    'assets/_scss/**/**/*.scss'
];

gulp.task('compile-scss', () => {
    console.log('Compiling .scss files using gulp...');
    return gulp.src(scssDir)
        .pipe(sass())
        .pipe(prefixer('last 3 version', 'ie 9'))
        .pipe(minify())
        .pipe(rename({
            dirname: destDir
        }))
        .pipe(gulp.dest(baseDir));
});