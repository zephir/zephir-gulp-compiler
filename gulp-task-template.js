// Require needed modules here
const fs = require("fs");

module.exports = (gulp, taskName, config, paths) => {
    gulp.task(taskName, () => {
        // Do your work here
        console.log(config);
        console.log(paths);
    });
};
