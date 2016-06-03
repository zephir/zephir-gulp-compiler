module.exports = function(gulp, plugins, config) {

    gulp.task('styles', function() {

        plugins.logger.info('Scripts: ' + config.source.styles + ' -> ' + config.dest.styles);

        // Define postCSS Processors
        var postcssProcessors = [
            plugins.autoprefixer({browsers: ['> 0.1%']}),                             // Run autoprefixer
            plugins.pxtorem({replace: false, rootValue: config.configs.baseFontSize})       // Add rem with px as fallback
        ];

        // Delete existing styles
        // plugins.del([config.dest.styles]);

        gulp.src(config.source.styles)
            .pipe( plugins.gulpif(config.env != "local", plugins.sourcemaps.init()) )
            .pipe( plugins.sass().on('error', function(error) {
                plugins.logger.error(error.relativePath + "\n\r" + error.formatted);
            }) )
            .pipe( plugins.gulpif(config.env != "local", plugins.postcss([plugins.cssnano()]).on('error', function(error) { plugins.logger.error(error.toString()) })) )
            .pipe( plugins.postcss(postcssProcessors).on('error', function(error) { plugins.logger.error(error.toString()) }) )
            .pipe( plugins.gulpif(config.env != "local", plugins.sourcemaps.write('.')) )
            .pipe( gulp.dest(config.dest.styles) )
            .pipe( plugins.gulpif(config.env == "local" && config.configs.enableBrowserSync === true, plugins.browserSync.stream()) )
        ;

    });


};
