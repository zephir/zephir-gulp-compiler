var imagemin = require('gulp-imagemin');

module.exports = function(gulp, config, paths) {

    gulp.task('images', function() {

        for (var dest in paths) {
            var source = paths[dest];
            dest = replaceEnv(dest);

            var buffer = gulp.src(source);

            if(isEnabled(config.imagemin.enabled)) {
                buffer = buffer.pipe(imagemin(config.imagemin.config));
            }

            buffer.pipe( gulp.dest(dest) );
        }

    });


};