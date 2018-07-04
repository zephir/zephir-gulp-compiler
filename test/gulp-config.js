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
                cache: {
                    enabled: true,
                    config: {
                        optimizeMemory: false // https://github.com/gulp-community/gulp-cached#possible-options
                    }
                },

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

                pxtorem: {
                    enabled: true,
                    config: {
                        rootValue: 16,
                        unitPrecision: 5,
                        propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                        selectorBlackList: [],
                        replace: false,
                        mediaQuery: false,
                        minPixelValue: 0
                    } // https://github.com/cuth/postcss-pxtorem#options
                },

                cleancss: {
                    enabled: true,
                    config: {
                        level: {
                            2: {

                                skipProperties: ['font-size']
                            }
                        }, // https://github.com/jakubpawlowicz/clean-css#optimization-levels
                        compatibility: "*", // https://github.com/jakubpawlowicz/clean-css#compatibility-modes
                        inline: ['local'] // https://github.com/jakubpawlowicz/clean-css#inlining-options
                    }
                }
            },

            js: {
                cache: {
                    enabled: true,
                    config: {
                        optimizeMemory: false // https://github.com/gulp-community/gulp-cached#possible-options
                    }
                },

                sourcemaps: {
                    enabled: "local"
                },



            },

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
                'dist/{env}/css/': [
                    'input/css/**/*.scss'
                ]
            },

            js: {
                'dist/{env}/js/script.js': [
                    'input/js/**/*.js'
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