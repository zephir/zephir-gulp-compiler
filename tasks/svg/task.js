var svgmin = require('gulp-svgmin');

module.exports = function(gulp, config, paths) {

    gulp.task('svg', function() {

        for (var dest in paths) {
            var source = paths[dest];
            dest = replaceEnv(dest);

            var buffer = gulp.src(source);

            if(isEnabled(config.svgmin.enabled)) {
                buffer = buffer.pipe( svgmin(config.svgmin.config) );
            }

            buffer.pipe( gulp.dest(dest) );
        }

    });


};