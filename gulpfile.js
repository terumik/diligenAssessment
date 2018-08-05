const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');


const styleSRC = 'src/scss/style.scss';
const styleDIST = './dist/css/'
const styleWatch = 'src/scss/**/*.scss';

const jsSRC = 'script.js';
const jsFolder = 'src/js/';
const jsDIST = './dist/js/'
const jsWatch = 'src/js/**/*.js';

// SASS to CSS
gulp.task('style', function(){
    gulp.src(styleSRC)
    .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogOnConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix:'.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(styleDIST)); 
});

// JS
    // browserify
    // transform babelify[env]
    // bundle
    // source
    // rename .min
    // buffer
    // init sourcemp
    // uglify
    // write sourcemap
    // save to dist

const jsFILES = [jsSRC];

gulp.task('js', function(){
    
    jsFILES.map(function(entry){
        return browserify({
            entries: [jsFolder + entry],
        },{
            debug:true
        })
        .transform(babelify, {
            sourceMaps: true
        })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({extname:'.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(jsDIST))
    });
});

// DEFAULT
gulp.task('default', ['style', 'js'], function(){
    console.log('gulp did some jobs for you ;)');
});
gulp.task('watch', ['default'], function(){
    gulp.watch(styleWatch,['style']);
    gulp.watch(jsWatch,['js']);
});