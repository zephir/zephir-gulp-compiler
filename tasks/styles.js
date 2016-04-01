module.exports = function(gulp, plugins, config) {

    gulp.task('styles', function() {

        // Define postCSS Processors
        var postcssProcessors = [
            plugins.autoprefixer({browsers: ['> 1%']}),                             // Run autoprefixer
            plugins.pxtorem({replace: false, rootValue: config.baseFontSize})       // Add rem with px as fallback
        ];

        // Delete existing styles
        plugins.del([config.dest.styles]);

        if(config.env == "local") {

            // LOCAL

            return gulp.src(config.source.styles)
                .pipe( plugins.sass().on('error', function(error) {
                    console.log(error.relativePath + "\n\r" + error.formatted);
                }) )
                .pipe( plugins.postcss(postcssProcessors) )
                .pipe( gulp.dest(config.dest.styles) )
            ;

        } else {

            // DEV, PREP or PROD

            return gulp.src(config.source.styles)
                .pipe( plugins.sourcemaps.init() )
                .pipe( plugins.sass().on('error',  function(error) {
                    console.log(error.relativePath + "\n\r" + error.formatted);
                }) )
                .pipe( plugins.postcss(postcssProcessors) )
                .pipe( plugins.postcss([plugins.cssnano()]) )
                .pipe( plugins.sourcemaps.write('.') )
                .pipe( gulp.dest(config.dest.styles) )
            ;

        }

    });


};