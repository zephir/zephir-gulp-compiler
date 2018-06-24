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

            css: {
                sourcemaps: {
                    enabled: "local"
                },

                scss: {
                    config: {
                        outputStyle: "compressed" // nested, compact, expanded and compressed are available options
                    }
                },

                autoprefixer: {
                    enabled: true,
                    config: {
                        browsers: browserlist
                    }
                },

                cleanCss: {
                    enabled: true,
                    config: {
                        level: 2, // https://github.com/jakubpawlowicz/clean-css#optimization-levels
                        compatibility: "ie9"
                    }
                }
            },

            js: {},

            images: {},

            clean: {},

            redToBlue: {
                runAsTask: 'css',

            }

        },

        // You can define extra tasks here that use the regular tasks as template but
        // change the config for a special use case
        extraTasks: {},

        // These are all paths for the tasks output => input
        paths: {
            css: {
                'dist/{env}/main.css': [
                    'input/css/**/*.scss'
                ]
            }
        },

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