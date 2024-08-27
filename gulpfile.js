const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function styles(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist/styles'))
}

exports.default = styles;
exports.watch = function(){
    gulp.watch('./src/styles/main.scss', {ignoreInitial: false}, gulp.parallel(styles))
}