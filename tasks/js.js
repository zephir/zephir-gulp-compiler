// Require needed modules
const fs = require('fs');
const cache = require('gulp-cached');
const gnotify = require('gulp-notify');
const merge = require('merge-stream');
const tap = require('gulp-tap');
const browserify = require('browserify');
const babelify = require('babelify');
const vinylbuffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const vinylsource = require('vinyl-source-stream');
const rename = require('gulp-rename');

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
            const fileUrlParts = dest.split('/');
            const fileName = fileUrlParts[fileUrlParts.length -1];
            delete fileUrlParts[fileUrlParts.length -1];
            dest = fileUrlParts.join('/');

                // Define the gulp buffer, read source, sourcemaps
            let buffer = gulp.src(source, {read: false});

            if (isEnabled(config.cache.enabled)) {
                buffer = buffer.pipe(cache('css'));
            }

            buffer = buffer.pipe(tap(function (file) {
                console.log('bundling ' + file.path);

                // replace file contents with browserify's bundle stream
                file.contents = browserify(file.path, {debug: true})
                    .transform(babelify, {
                        'presets': [
                            ['babel-preset-es2015']
                        ]
                    })
                    .bundle();
            }));

            buffer = buffer.pipe(vinylbuffer());

            buffer = buffer.pipe(rename(fileName));

            buffer = buffer.pipe(sourcemaps.init({loadMaps: true}));

            buffer = buffer.pipe(uglify());

            buffer = buffer.pipe(sourcemaps.write('./'));

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