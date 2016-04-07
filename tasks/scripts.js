module.exports = function(gulp, plugins, config) {

    gulp.task('scripts', function() {

        plugins.logger.info('Scripts: ' + config.source.scripts + ' -> ' + config.dest.scripts);

        // Delete existing styles
        // plugins.del([config.dest.scripts]);

        gulp.src(config.source.scripts)
            .pipe( plugins.gulpif(config.env != "local", plugins.sourcemaps.init()) )                                                               // Init of sourcemaps
            .pipe( plugins.gulpif(config.env != "local", plugins.uglify().on('error', function(err) { plugins.logger.error(err.toString()) })) )    // Minify js if env = local
            .pipe( plugins.concat('main.min.js').on('error', function(err) { plugins.logger.error(err.toString()) }) )
            .pipe( plugins.gulpif(config.env != "local", plugins.sourcemaps.write('.')) )                                                           // Write the sourcemaps
            .pipe( gulp.dest( config.dest.scripts ) )
            .pipe( plugins.gulpif(config.env == "local" && config.configs.enableBrowserSync === true, plugins.browserSync.stream()) )               // Write JS
        ;

    });


};