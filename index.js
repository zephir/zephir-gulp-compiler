// process cli args
argv = require("yargs")
    .alias("e", "env")
    .default("env", "local").argv;

// Define globals
globals = {};
log = require('fancy-log');
isEnabled = require('./helpers/isEnabled');
replaceEnv = require('./helpers/replaceEnv');
globals.env = argv.env;

// Define local variables
const imagemin = require('imagemin');
const fs = require('fs');

module.exports = (gulp) => {
    if (!gulp) return false;

    // Working dir (where gulp is executed)
    globals.cwd = process.cwd();
    // Module dir (where this module is located)
    globals.moduleDir = __dirname;

    // Load the config
    // Pass gulp and imagemin for easier use in config
    const config = require('./helpers/config')(gulp, imagemin);

    // Add default local env to config
    config.envs.unshift('local');

    // Check if env is defined
    if (config.envs.indexOf(globals.env) === -1) {
        throw new Error(`Env ${globals.env} is not defined, you can use ${config.envs.join(', ')}!`);
    }

    // Try to require task js files by config tasks
    for (const taskName in config.tasks) {
        if (fs.existsSync(`${globals.moduleDir}/tasks/${taskName}.js`)) {
            // Load task
        } else if (fs.existsSync(`${globals.cwd}/gulp-tasks/${taskName}.js`)) {
            // Load task
        } else {
            const taskTemplate = fs.readFileSync(
                `${globals.moduleDir}/gulp-task-template.js`,
                'UTF-8'
            );

            if (!fs.existsSync(`${globals.cwd}/gulp-tasks/`)) {
                fs.mkdirSync(`${globals.cwd}/gulp-tasks/`);
            }

            fs.writeFileSync(`${globals.cwd}/gulp-tasks/${taskName}.js`, taskTemplate);
            log.warn(`No task for config ${taskName} found! A project related task file ${globals.cwd}/gulp-tasks/${taskName}.js was created.`);
        }

        // console.log(taskName);
    }
};