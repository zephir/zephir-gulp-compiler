module.exports = function(gulp, plugins, config) {

    gulp.task('watch', ['styles', 'scripts'], function() {
        gulp.watch(config.source.styles, ['styles']);
        gulp.watch(config.source.scripts, ['scripts']);
    });

};