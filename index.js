// process cli args
argv = require("yargs")
    .alias("e", "env")
    .default("env", "local").argv;

// Define globals
globals = {};
log = require('fancy-log');
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

    globals.config = config;

    const tasksHelper = require('./helpers/tasks');

    tasksHelper.registerTasks(gulp, config.tasks);
    tasksHelper.registerTasks(gulp, config.extraTasks);
};