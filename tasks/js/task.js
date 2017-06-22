var babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    gutil = require('gulp-util');

module.exports = function(gulp, config, paths) {

    gulp.task('js', function() {

        for (var dest in paths) {
            var source = paths[dest];
            dest = replaceEnv(dest);

            var file = dest.replace(/^.*[\\\/]/, '');
            var isFile = file.length > 0;

            if(isFile) {
                dest = dest.replace(file, '');
            }

            var buffer = gulp.src(source);

            if(isEnabled(config.babeljs.enabled)) {
                buffer = buffer.pipe(babel(config.babeljs.config));
            }

            if(isFile) {
                buffer = buffer.pipe(concat(file));
            }

            buffer.pipe( gulp.dest(dest)).on('error', gutil.log);;

        }

    });

};