var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var complexity = require('gulp-complexity');



var paths = {
    scripts: ['lib/date-utils.js']
};

gulp.task('build', function() {
    return gulp.src(paths.scripts).
        pipe(uglify()).
        pipe(rename('date-utils.min.js')).
        pipe(gulp.dest('lib'));
});

gulp.task('docs', shell.task([
  './node_modules/jsdoc/jsdoc.js -c jsdoc.json -d doc -t ./node_modules/ink-docstrap/template README.md lib/date-utils.js'
]));

gulp.task('complexity', function() {
    return gulp.src(paths.scripts).
        pipe(complexity());
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['build', 'docs', 'complexity']);
});

gulp.task('default', ['build', 'docs', 'complexity', 'watch']);
