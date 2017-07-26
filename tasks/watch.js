module.exports = function(gulp, plugins, config) {

    gulp.task('watch', ['styles', 'scripts'], function() {
        
        if(config.configs.enableBrowserSync == true) {
            plugins.browserSync.init({
                proxy: config.configs.browserSyncHost
            });
        }

        gulp.watch(config.source.styles, ['styles']);
        gulp.watch(config.source.scripts, ['scripts']);
        gulp.watch(config.source.filesToWatch).on('change', plugins.browserSync.reload);

    });

};