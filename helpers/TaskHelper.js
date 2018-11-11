const fs = require('fs');

class TaskHelper {

    constructor(gulp) {
        if(!TaskHelper.instance) {
            this.gulp = gulp;
            this.tasks = {};
            TaskHelper.instance = this;
        }

        return TaskHelper.instance;
    }

    getAllTasks() {
        if(Object.keys(this.tasks).length > 0) {
            return this.tasks;
        }

        let projectTaskFiles = [];
        if (fs.existsSync(globals.projectTasksDir)) {
            projectTaskFiles = fs.readdirSync(globals.projectTasksDir);
        }

        const defaultTaskFiles = fs.readdirSync(globals.defaultTasksDir);

        projectTaskFiles.forEach((file, index) => {
            let Task = require(`${globals.projectTasksDir}/${file}`);
            Task = new Task(this.gulp);
            this.tasks[Task.getId()] = Task;
        });

        let taskConfigs = {};
        defaultTaskFiles.forEach((file, index) => {
            if(!projectTaskFiles.includes(file)) {
                let Task = require(`${globals.defaultTasksDir}/${file}`);
                Task = new Task(this.gulp);
                this.tasks[Task.getId()] = Task;
            }
        });

        return this.tasks;
    }

    getTaskConfig(taskId) {
        const tasks = this.getAllTasks();
        return tasks[taskId].getTaskConfig();
    }

    getTaskPaths(taskId) {
        const tasks = this.getAllTasks();
        return tasks[taskId].getPaths();
    }

    registerTasks() {
        const tasks = this.getAllTasks();
        for (const taskId in tasks) {
            const Task = tasks[taskId];
            Task.register();
        }
    }

}

module.exports = TaskHelper;
