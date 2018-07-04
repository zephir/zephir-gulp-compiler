// Require needed modules
const fs = require('fs');
const cache = require('gulp-cached');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const gnotify = require('gulp-notify');
const merge = require('merge-stream');
const postcss = require('gulp-postcss');
const cleancss = require('gulp-clean-css');

// POSTCSS plugins
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

const isEnabled = require(globals.moduleDir + '/helpers/isEnabled');
const replaceEnv = require(globals.moduleDir + '/helpers/replaceEnv');

module.exports = (gulp, taskName, config, paths) => {
    gulp.task(taskName, () => {
        let stream;

        if (typeof paths === 'undefined' || paths.length > 0) {
            log.error(`No paths defined for task "${taskName}"`);
        }

        for (let dest in paths) {
            const source = paths[dest];
            dest = replaceEnv(dest);

            // Define the gulp buffer
            let buffer = gulp.src(source);

            if (isEnabled(config.cache.enabled)) {
                buffer = buffer.pipe(cache('css'));
            }

            // If sourcemaps is enabled, init sourcemaps
            if (isEnabled(config.sourcemaps.enabled)) {
                buffer = buffer.pipe(sourcemaps.init());
            }

            // Parse SCSS
            buffer = buffer.pipe(
                sass(config.scss.config).on(
                    'error',
                    gnotify.onError({
                        message: 'Error: <%= error.message %>',
                        emitError: true
                    })
                )
            );

            // RUN POSTCSS
            // Autoprefix properties
            // Add rem units for px values
            const postcssProcessors = [];
            isEnabled(config.autoprefixer.enabled) && postcssProcessors.push(autoprefixer(config.autoprefixer.config));
            isEnabled(config.pxtorem.enabled) && postcssProcessors.push(pxtorem(config.pxtorem.config));

            // If there is a postCss task, run it through gulp-postcss
            if (postcssProcessors.length > 0) {
                buffer = buffer.pipe(
                    postcss(postcssProcessors)
                ).on(
                    'error',
                    gnotify.onError({
                        message: 'Error: <%= error.message %>',
                        emitError: true
                    })
                );
            }

            // CleanCSS
            if (isEnabled(config.cleancss.enabled)) {
                buffer = buffer.pipe(cleancss(config.cleancss.config)).on(
                    'error',
                    gnotify.onError({
                        message: 'Error: <%= error.message %>',
                        emitError: true
                    })
                );
            }

            // Write Sourcemap
            if (isEnabled(config.sourcemaps.enabled)) {
                buffer = buffer.pipe(sourcemaps.write()).on(
                    'error',
                    gnotify.onError({
                        message: 'Error: <%= error.message %>',
                        emitError: true
                    })
                );
            }

            // Write file to dest
            buffer = buffer.pipe(gulp.dest(dest)).on(
                'error',
                gnotify.onError({
                    message: 'Error: <%= error.message %>',
                    emitError: true
                })
            );

            if (stream === undefined) {
                stream = buffer;
            } else {
                stream = merge(stream, buffer);
            }
        }

        return stream;
    });
};