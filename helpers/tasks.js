const fs = require('fs');

module.exports = {

    /**
     *
     * @param tasksConfig
     * @returns {Array}
     */
    getTaskListFromConfig: function (tasksConfig) {
        const tasks = [];

        // Try to require task js files by tasks defined in config
        // If the file doesn't exist, create a new task file in cwd/gulp-tasks/
        for (const taskName in tasksConfig) {
            if (fs.existsSync(`${globals.moduleDir}/tasks/${taskName}.js`)) {
                tasks[taskName] = `${globals.moduleDir}/tasks/${taskName}.js`;
            } else if (fs.existsSync(`${globals.cwd}/gulp-tasks/${taskName}.js`)) {
                tasks[taskName] = `${globals.cwd}/gulp-tasks/${taskName}.js`;
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

                tasks[taskName] = `${globals.cwd}/gulp-tasks/${taskName}.js`;
            }
        }

        return tasks;
    },

    getTaskConfig: function (taskName) {
        return globals.config.tasks[taskName];
    },

    getTaskPaths: function (taskName) {
        return globals.config.paths[taskName];
    },

    registerTasks: function (gulp, tasksConfig) {
        const tasks = this.getTaskListFromConfig(tasksConfig);
        for (const taskName in tasks) {
            const taskFile = tasks[taskName];
            const taskConfig = this.getTaskConfig(taskName);
            const taskPaths = this.getTaskPaths(taskName);
            require(taskFile)(
                gulp,
                taskName,
                taskConfig,
                taskPaths
            );
        }
    }

};