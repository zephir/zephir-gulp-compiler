'use strict';

module.exports = function (gulp) {

    // Try to determine enviroment. If nothing's given, use "local".
    var argv = require('yargs').argv;

    var env = "local";
    if (argv.dev == true) {
        env = "dev";
    } else if (argv.prep == true || argv.preproduction == true) {
        env = "prep";
    } else if (argv.prod == true || argv.production == true) {
        env = "prod";
    }

    gulp.task('default', function() {
        console.log(env);
    });

};