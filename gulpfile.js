// Automatizador de tarefas
const gulp = require('gulp');
// Faz a compilação do SASS e Comprime o CSS de saída
const sass = require('gulp-sass')(require('sass'));
// Diminui o peso da imagens mantendo a qualidade
const imagemin = require('gulp-imagemin');
// Cria um Map
const sourcemaps = require('gulp-sourcemaps');
// Comprime o JavaScript
const uglify = require('gulp-uglify');
// Ofusca o JavaScript
const obfuscate = require('gulp-obfuscate');
// Minifica o HTML
const htmlmin = require('gulp-htmlmin');

// Minifica e Ofusca o JavaScript
function scripts(){
    return gulp.src('./src/scripts/main.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./dist/scripts'));
}

// Não está funcionando - Depreciated
// function images(){
//     return gulp.src('./src/images/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./dist/images'))
// }

// Minifica o CSS de saída e faz um Map
function styles(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'));
}

// Minifica o HTML
function html(){
    return gulp.src('./src/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
}

exports.default = gulp.parallel(html, styles, scripts);
exports.watch = function(){
    gulp.watch('./src/index.html', {ignoreInitial: false}, gulp.parallel(html))
    gulp.watch('./src/styles/*.scss', {ignoreInitial: false}, gulp.parallel(styles))
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.parallel(scripts))
}