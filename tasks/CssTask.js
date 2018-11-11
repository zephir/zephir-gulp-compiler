const through = require('through2');
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const changed = require("gulp-changed");
const gnotify = require("gulp-notify");
const merge = require("merge-stream");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const BaseTask = require(globals.moduleDir + '/BaseTask');

class CssTask extends BaseTask {
    constructor(gulp) {
        super(gulp);

        this.id = 'CssTask';
        this.name = "css";
        this.config = {
            paths: {},
            sourcemaps: {
                enabled: true
            },
            autoprefixer: {
                enabled: true,
                config: {
                    browsers: [
                        "> 0.5%",
                        "last 2 versions",
                        "IE 10"
                    ]
                }
            },
            cleanCss: {
                enabled: true,
                config: {
                    level: 2, // https://github.com/jakubpawlowicz/clean-css#optimization-levels
                    compatibility: "ie9"
                }
            },
            scss: {
                config: {
                    outputStyle: "compressed" // nested, compact, expanded and compressed are available options
                }
            }
        };
    }

    run(stream) {
        if(this.hasPaths()) {
            const paths = this.getPaths();
            for (let dest in paths) {
                const source = paths[dest];
                dest = this.replaceEnv(dest);

                let buffer = this.gulp.src(source);

                buffer = this.sourcemaps(buffer);
                buffer = this.compileScss(buffer);
                buffer = this.autoprefix(buffer);
                buffer = this.cleanCss(buffer);

                buffer = this.bufferDest(dest, buffer);

                if (stream === undefined) {
                    stream = buffer;
                } else {
                    stream = merge(stream, buffer);
                }
            }
        } else {
            console.info("No CSS paths found. Did you define any?");
        }

        return super.run(stream);
    }

    cleanCss(buffer) {
        if(this.isEnabled(this.getConfig('cleanCss').enabled)) {
            buffer = buffer.pipe(cleanCSS(this.getConfig('cleanCss').config));
        }

        return buffer;
    }

    autoprefix(buffer) {
        if(this.isEnabled(this.getConfig('autoprefixer').enabled)) {
            buffer = buffer.pipe(
                postcss([autoprefixer(this.getConfig('autoprefixer'))]).on("error", error => {
                    console.error(error.toString());
                })
            );
        }

        return buffer;
    }

    compileScss(buffer) {
        return buffer.pipe(
            sass(this.getConfig('scss').config).on(
                "error",
                gnotify.onError({
                    message: "Error: <%= error.message %>",
                    emitError: true
                })
            )
        );
    }

    getFilePath() {
        return __filename;
    }
}

module.exports = CssTask;
