const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const config = require('./config');
const host = config.serverInfo.host;

// [a] because that way the directory structure is maintained!

gulp.task("sass", function () {
    return gulp.src("./app/assets/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./app/assets/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task("browserSync", function (cb) {
    return browserSync.init({
        proxy: `http://${host}/`,
        files: ["app/views/**/*.*", "app/assets/**/*.*"],
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
    // sassGlobs.forEach((glob) => {
    //     gulp.watch(glob, {
    //         delay: 300
    //     }, gulp.series("sass"));
    // });
    gulp.watch("./app/assets/scss/**/*.scss", {
        delay: 500
    }, gulp.series("sass"));
    console.log("Watching SCSS!");
    cb();
}));


gulp.task("build", gulp.series("sass"));
gulp.task("dev", gulp.series("nodemon", "browserSync", "watch"));