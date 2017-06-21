var fs = require('fs'),
    del = require('del');

imagemin = require('gulp-imagemin');


global = {};

isEnabled = require('./helpers/isEnabled.js');
replaceEnv = require('./helpers/replaceEnv.js');

argv = require('yargs')
    .alias('e', 'env')
    .default('env', 'local')
    .argv;

global.env = argv.env;

console.log("Environment: " + global.env);

var workflow = function(gulp) {
    if(!gulp)
        return false;

    global.moduleRootDir = __dirname;
    global.appRootDir = require('app-root-dir').get();

    var config = require('./core/config.js')();

    // Init all tasks
    var tasks = fs.readdirSync( global.moduleRootDir + '/tasks/');

    tasks.forEach( function( task ) {

        require('./tasks/' + task + '/task.js')(gulp, config[task], config.paths[task]);

    } );

    gulp.task('clean', function() {
        del([global.env]);
    });

    for( var taskName in config.combinedTasks) {
        gulp.task(taskName, config.combinedTasks[taskName]);
    }

    gulp.task('watch', function() {

        for( var pathGroup in config.watchTask) {
            var sources = config.paths[pathGroup];
            var tasks = config.watchTask[pathGroup];

            if(typeof sources !== 'string') {
                for ( var dest in sources ) {
                    var source = sources[dest];
                    gulp.watch(source, tasks);
                }
            } else {
                gulp.watch(sources, tasks);
            }
        }
    });

};

module.exports = workflow;