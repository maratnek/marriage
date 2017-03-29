var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var uglify      = require('gulp-uglifyjs');
var reload      = browserSync.reload;
var nodemon     = require('gulp-nodemon');

var messages = {
    expressBuild: '<span style="color: grey">Running:</span> $ express build'
};

gulp.task('nodemon', function (cb) {
    browserSync.notify(messages.expressBuild);
    
    var called = false;
    return nodemon({ 
       script: 'main.js',
       ext: 'js, jade, html'
    })
    .on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('nodemon-rebuild', function () {
    browserSync.reload({stream:true});
});

/**
 * Wait for jekyll-build, then launch the Server
 */

gulp.task('browser-sync', ['sass', 'js', 'nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        notify: true,
        port: 7000
    });
});


gulp.task('js', function(){
    return gulp.src('public/javascripts/*.js')
    // .pipe(uglify())
    // .pipe(gulp.dest('public/javascripts/*.js'))
    ;
});
/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('public/stylesheets/*.sass')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'], { cascade: true }))
        .pipe(gulp.dest('public/stylesheets/*.css'))
        .pipe(reload({stream:true}))
        .pipe(gulp.dest('public/stylesheets/*.css'))
        ;
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('public/stylesheets/**', ['sass']);
    gulp.watch('public/javascripts/**', ['js']);
    // gulp.watch(['*.html', 'jadefiles/*'], ['nodemon-rebuild']);
    gulp.watch(["*.html", "views/**"]).on("change", reload);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

