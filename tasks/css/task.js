var sass = require('gulp-sass'),
    mkdirp = require('mkdirp'),
    changed = require('gulp-changed');

module.exports = function(gulp, config, paths) {

    gulp.task('css', function() {

        for (var dest in paths) {
            var source = paths[dest];
            dest = replaceEnv(dest);

            var buffer = gulp.src(source);

            buffer = buffer.pipe(sass(config.scss.config).on('error', sass.logError));

            if(isEnabled(config.autoprefixer.enabled)) {
                buffer = require('./autoprefixer.js')(buffer, config.autoprefixer.config);
            }

            if(isEnabled(config.pxToRem.enabled)) {
                buffer = require('./pxToRem.js')(buffer, config.pxToRem.config);
            }

            if(isEnabled(config.cleanCss.enabled)) {
                buffer = require('./cleanCss.js')(buffer, config.cleanCss.config);
            }

            buffer.pipe( gulp.dest(dest) );

        }

    });


};