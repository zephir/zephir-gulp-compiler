const fs = require("fs");

class ConfigHelper {

    constructor(gulp) {
        const TaskHelper = require('./TaskHelper');
        this.TaskHelper = new TaskHelper;

        this.gulp = gulp;
        if(!this.configExists()) {
            this.writeDefaultConfig();
        } else {
            this.updateTaskConfigs();
        }
    }

    /**
     * Checks if the config exists in the working dir
     * @returns {boolean}
     */
    configExists() {
        return fs.existsSync(globals.projectConfigFile);
    }

    getTaskConfigs() {
        const tasks = this.TaskHelper.getAllTasks();
        let taskConfigs = {};
        for (let taskId in tasks) {
            const Task = tasks[taskId];
            taskConfigs[taskId] = Task.getConfig();
        }
        return taskConfigs;
    }

    updateTaskConfigs() {
        const config = this.readConfig();
        const tasks = this.TaskHelper.getAllTasks();
        for (let taskId in tasks) {
            const Task = tasks[taskId];
            Task.setConfig(config[taskId]);
        }
    }

    readConfig() {
        console.info(`Reading config from ${globals.projectConfigFile}.`)
        return JSON.parse(fs.readFileSync(globals.projectConfigFile, 'utf8'));
    }

    writeDefaultConfig() {
        const defaultConfig = this.getTaskConfigs();
        console.info(`Config written to ${globals.projectConfigFile} Adopt to your needs.`)
        fs.writeFileSync(globals.projectConfigFile, JSON.stringify(defaultConfig, null, 4), 'utf8');
    }

}

module.exports = ConfigHelper;
