const through = require('through2');
const sourcemaps = require("gulp-sourcemaps");
const gutil = require("gulp-util");

class BaseTask {
    constructor(gulp) {
        this.id = 'BaseTask';
        this.name = 'BaseTask';
        this.gulp = gulp;
        this.sourcemapsEnabled = false;
        this.config = {};
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setConfig(options) {
        this.config = {...this.config, ...options};
        return this;
    }

    getConfig(key) {
        if(key) {
            return this.config[key];
        }

        return this.config;
    }

    getPaths() {
        return this.config.paths;
    }

    hasPaths() {
        return Object.keys(this.getPaths()).length > 0;
    }

    register() {
        this.gulp.task(this.getName(), () => {
            let stream;
            return this.run(stream);
        });
    }

    run(stream) {
        return stream;
    }

    sourcemaps(buffer) {
        if (this.getConfig('sourcemaps').enabled && this.isEnabled(this.getConfig('sourcemaps').enabled)) {
            this.sourcemapsEnabled = true;
            buffer = buffer.pipe(sourcemaps.init());
        }
        return buffer;
    }

    isEnabled(param) {
        return param === true || (typeof param === "string" && param.indexOf(globals.env) !== -1);
    }

    replaceEnv(string) {
        return string.replace("{env}", globals.env);
    }

    bufferDest(dest, buffer) {
        if(this.sourcemapsEnabled) {
            buffer = buffer.pipe(sourcemaps.write('.'));
        }
        return buffer.pipe(this.gulp.dest(dest)).on("error", gutil.log);
    }

    logMe() {
        console.log(this);
    }
}

module.exports = BaseTask;


/*

// Constructor
function BaseTask() {
}

BaseTask.prototype.setOptions = function(options) {
    this.options = {...this.options, ...options};
    return this.options;
};

BaseTask.prototype.getOptions = function() {
    return this.options;
};

module.exports = BaseTask;*/
