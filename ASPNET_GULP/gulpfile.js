/// <binding BeforeBuild='bootstrap_css, jquery' />
var gulp = require('gulp');
var del = require('del');
var gulpcsso = require('gulp-csso');

gulp.task('jquery', function ()
{
    gulp.src(["node_modules/jquery/dist/jquery.js"])
        .pipe(gulp.dest("wwwroot/js"));

    gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js"])
        .pipe(gulp.dest("wwwroot/js"));
});

gulp.task('bootstrap_css', function ()
{
    gulp.src(["node_modules/bootstrap/dist/css/bootstrap.css"])
        .pipe(gulp.dest("wwwroot/css"));
});

gulp.task('clean', function ()
{
    return del(["wwwroot/js/*.js", "wwwroot/css/*.css"]);
});


gulp.task('gulpcsso', function ()
{
    return gulp.src('wwwroot/css/*.css')
        .pipe(gulpcsso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('wwwroot/prod'));
});

gulp.task('cleanprod', function ()
{
    return del(["wwwroot/prod/*.*"]);
});

