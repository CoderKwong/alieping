var gulp = require("gulp"),
    rev = require("gulp-rev-append"),
    css = require("gulp-uglifycss"),
    uglify = require("gulp-uglify");

gulp.task("revGulp",function () {
    gulp.src("./distTpl/*html")
        .pipe(rev())
        .pipe(gulp.dest("./tpl"))
});
gulp.task("css",function () {
    gulp.src("./distCss/*.css")
        .pipe(css())
        .pipe(gulp.dest("./css"))
});
gulp.task("uglify",function () {
    gulp.src("./distJs/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./js"))
});
gulp.task("watch",function () {
    gulp.watch("./distCss/*.css",["css","revGulp"]);
    gulp.watch("./distJs/*.js",["uglify","revGulp"]);
});
gulp.task("default",["watch"]);