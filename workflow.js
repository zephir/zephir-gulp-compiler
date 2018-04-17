const fs = require("fs");
const del = require("del");
const junk = require("junk");
const watch = require("gulp-watch");
const runSequence = require("run-sequence");
const gutil = require("gulp-util");

// define globals
global = {};
isEnabled = require("./lib/isEnabled.js");
replaceEnv = require("./lib/replaceEnv.js");

// process cli args
argv = require("yargs")
    .alias("e", "env")
    .default("env", "local").argv;

global.env = argv.env;

console.log(`Environment: ${global.env}`);

const workflow = gulp => {
    if (!gulp) return false;

    // define more globals
    global.moduleRootDir = __dirname;
    global.appRootDir = require("app-root-dir").get();
    global.runFrom = global.appRootDir;

    const config = require("./lib/config.js")();

    // Init all tasks
    const tasks = fs
        .readdirSync(`${global.moduleRootDir}/tasks/`)
        .filter(junk.not);

    // autorequire
    tasks.forEach(task => {
        require(`./tasks/${task}/task.js`)(
            gulp,
            task,
            config[task],
            config.paths[task]
        );
    });

    // create "fake" tasks
    for (const taskName in config.combinedTasks) {
        gulp.task(taskName, (cb) => {
            runSequence.apply(this, config.combinedTasks[taskName], cb);
        });
    }

    // create combined tasks as sequential runs of autoincluded tasks
    for (const taskName in config.extraTasks) {
        const task = config.extraTasks[taskName];
        if(typeof task.runAsTask !== 'undefined') {
            const runAsTask = task.runAsTask;

            require(`./tasks/${runAsTask}/task.js`)(
                gulp,
                taskName,
                config.extraTasks[taskName],
                config.paths[taskName]
            );
        }
    }

    // special watch task
    gulp.task("watch", () => {
        // watch for every path group
        for (const pathGroup in config.watchTask) {
            const sources = config.paths[pathGroup];
            const tasks = config.watchTask[pathGroup];

            if (typeof sources !== "string") {
                for (const dest in sources) {
                    const source = sources[dest];

                    watch(source).on("change", event => {
                        gutil.log(source + " changed");
                        runSequence(tasks);
                    });
                }
            }
        }
    });
};

module.exports = workflow;
