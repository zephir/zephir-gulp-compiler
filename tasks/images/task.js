const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const merge = require("merge-stream");
const gnotify = require("gulp-notify");

module.exports = (gulp, taskName, config, paths) => {
    gulp.task(taskName, () => {
        let stream;

        for (let dest in paths) {
            const source = paths[dest];
            dest = replaceEnv(dest);

            let buffer = gulp.src(source);

            if (isEnabled(config.imagemin.enabled)) {
                buffer = buffer.pipe(imagemin(config.imagemin.config));
                buffer = buffer.pipe(imagemin(pngquant()));
            }

            buffer = buffer.pipe(gulp.dest(dest)).on(
                "error",
                gnotify.onError({
                    message: "Error: <%= error.message %>",
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
