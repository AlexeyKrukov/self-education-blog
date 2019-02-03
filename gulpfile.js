const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
gulp.task('sass', () => {
    return gulp.src('dev/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        //.pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))
       // .pipe(browserSync.stream())
});
gulp.task('html', () => {
    return gulp.src('views/*.ejs')
        .pipe(browserSync.stream())
});
gulp.task('js', () => {
    return gulp.src('dev/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
});
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: true
    })
});
gulp.task('watch', () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('views/*.ejs', gulp.series('html'));
    gulp.watch('dev/js/**/*.js', gulp.series('js'));
});
gulp.task('default', gulp.parallel('sass'/*, 'browser-sync'*/, 'watch'));
