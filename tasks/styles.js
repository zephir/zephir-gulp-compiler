module.exports = function(gulp, plugins, config) {

    gulp.task('styles', function() {

        plugins.logger.info('Scripts: ' + config.source.styles + ' -> ' + config.dest.styles);

        // Define postCSS Processors
        var postcssProcessors = [
            plugins.autoprefixer({browsers: ['> 1%']}),                             // Run autoprefixer
            plugins.pxtorem({replace: false, rootValue: config.baseFontSize})       // Add rem with px as fallback
        ];

        // Delete existing styles
        plugins.del([config.dest.styles]);

        if(config.env == "local") {

            // LOCAL

            gulp.src(config.source.styles)
                .pipe( plugins.sass().on('error', function(error) {
                    plugins.logger.error(error.relativePath + "\n\r" + error.formatted);
                }) )
                .pipe( plugins.postcss(postcssProcessors).on('error', function(error) { plugins.logger.error(error.toString()) }) )
                .pipe( gulp.dest(config.dest.styles) )
            ;

        } else {

            // DEV, PREP or PROD

            gulp.src(config.source.styles)
                .pipe( plugins.sourcemaps.init() )
                .pipe( plugins.sass().on('error',  function(error) {
                    plugins.logger.error(error.relativePath + "\n\r" + error.formatted);
                }) )
                .pipe( plugins.postcss(postcssProcessors).on('error', function(error) { plugins.logger.error(error.toString()) }) )
                .pipe( plugins.postcss([plugins.cssnano()]).on('error', function(error) { plugins.logger.error(error.toString()) }) )
                .pipe( plugins.sourcemaps.write('.') )
                .pipe( gulp.dest(config.dest.styles) )
            ;

        }

    });


};