const browserlist = [
    "> 0.5%",
    "last 2 versions",
    "IE 10"
];

module.exports = (gulp, imagemin) => {
    if (!gulp || !imagemin) return false;

    return {
        // These are the available environments which can be compiled for
        // "local" is the default env that will always exist
        envs: [
            'dev', 'prep', 'prod'
        ],

        // These are the configurations for the default tasks
        // You can either enable them generally (true) or for a special env
        tasks: {

            css: {},

            js: {},

            images: {},

            clean: {},

            redToBlue: {}

        },

        // You can define extra tasks here that use the regular tasks as template but
        // change the config for a special use case
        extraTasks: {},

        // These are all paths for the tasks output => input
        paths: {},

        // Here you can combine tasks to
        combinedTasks: {
            default: [],
            compile: [],
        },

        // These are the tasks that should be watched
        watchTask: {

        }
    }
};