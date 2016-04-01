module.exports = function(gulp, plugins, config) {

    gulp.task('scripts', function() {

        // Delete existing styles
        plugins.del([config.dest.scripts]);

        if(config.env == "local") {

            // LOCAL
            return gulp.src(config.source.scripts)
                .pipe( plugins.sourcemaps.init() )              // Init of sourcemaps
                .pipe( plugins.concat('main.min.js') )
                .pipe( plugins.sourcemaps.write('.') )          // Write the sourcemaps
                .pipe( gulp.dest( config.dest.scripts ) )              // Write JS
            ;

        } else {

            // DEV, PREP or PROD
            return gulp.src(config.source.scripts)
                .pipe( plugins.sourcemaps.init() )              // Init of sourcemaps
                .pipe( plugins.uglify() )                       // Minify js
                .pipe( plugins.concat('main.min.js') )
                .pipe( plugins.sourcemaps.write('.') )          // Write the sourcemaps
                .pipe( gulp.dest( config.dest.scripts ) )              // Write JS
            ;

        }

    });


};