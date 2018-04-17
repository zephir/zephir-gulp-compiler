const del = require("del");

module.exports = (gulp, taskName, config, paths) => {
    gulp.task(taskName, () => {
        let dels = [];
        for (i in config.paths) {
            dels.push(config.paths[i]);
        }
        return del(dels, { force: true });
    });
};
