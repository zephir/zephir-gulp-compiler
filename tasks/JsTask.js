var BaseTask = require(globals.moduleDir + '/BaseTask');

class JsTask extends BaseTask {
    constructor(gulp) {
        super(gulp);
        this.id = 'JsTask';
        this.name = 'js';
        this.config = {
            paths: {},
            minify: true
        };
    }

    getFilePath() {
        return __filename;
    }
}

module.exports = JsTask;



// Require needed modules here
/*const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');
const sass = require("gulp-sass");
const gnotify = require("gulp-notify");
const merge = require("merge-stream");

const isEnabled = require(globals.moduleDir + '/helpers/isEnabled');
const replaceEnv = require(globals.moduleDir + '/helpers/replaceEnv');

module.exports = {

    options: {

    },

    run: ((gulp, taskName, config, paths)) => {

    },

    setOptions: function() {
        this.options
        return this;
    },

    getOptions: function() {
        return this.options;
    },

    /*gulp.task(taskName, () => {
        let stream;

        for (let dest in paths) {
            const source = paths[dest];
            dest = replaceEnv(dest);

            let buffer = gulp.src(source);

            if (isEnabled(config.sourcemaps.enabled)) {
                buffer = buffer.pipe(sourcemaps.init());
            }

            buffer = buffer.pipe(
                sass(config.scss.config).on(
                    "error",
                    gnotify.onError({
                        message: "Error: <%= error.message %>",
                        emitError: true
                    })
                )
            );

            console.log(dest, source);

            buffer = buffer.pipe(gulp.dest(dest)).on("error", );

            if (stream === undefined) {
                stream = buffer;
            } else {
                stream = merge(stream, buffer);
            }
        }

        return stream;
    });
};
*/
