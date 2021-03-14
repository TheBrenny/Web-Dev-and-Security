const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const config = require('./config');
const host = config.serverInfo.host;

gulp.task("sass", function () {
    return gulp.src(["**/assets/scss/**/*.scss"])
        .pipe(sass().on("error", sass.logError))
        .pipe(rename(function (f) {
            f.dirname = path.join(path.dirname(f.dirname), "css");
        }))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("browserSync", function (cb) {
    return browserSync.init({
        proxy: `http://${host}/`,
        files: ["**/views/**/*.*", "**/assets/**/*.*"],
        ignore: ["**/*.scss"],
        open: false,
        port: 81
    }, cb);
});

gulp.task("nodemon", function (cb) {
    var started = false;

    return nodemon({
        script: 'server.js',
        delay: 10,
        env: {
            "NODE_ENV": 'dev',
            "GULPING": true,
            "IS_VSCODE": true,
            "DEMO_MODE": true,
            "HOST": host,
            "PORT": 80
        },
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            started = true;
            console.log("Nodemon started.");
            cb();
        }
    });
});
gulp.task("watch", gulp.series("sass", function (cb) {
    gulp.watch("./**/assets/scss/**/*.scss", gulp.series("sass"));
    console.log("Watching SCSS!");
    cb();
}));


gulp.task("build", gulp.series("sass"));
gulp.task("dev", gulp.series("nodemon", "browserSync", "watch"));