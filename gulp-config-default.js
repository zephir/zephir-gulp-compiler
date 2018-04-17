const imagemin = require("gulp-imagemin");
const browserlist = [
    "> 0.5%",
    "last 2 versions",
    "IE 10"
];

module.exports = {
    css: {
        scss: {
            config: {
                outputStyle: "compressed" // nested, compact, expanded and compressed are available options
            }
        },

        sourcemaps: {
            enabled: "local"
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
                compatibility: "ie8"
            }
        }
    },

    js: {
        sourcemaps: {
            enabled: "local"
        },
        browserify: {
            enabled: false
        },
        uglify: {
            enabled: false
        },
        babeljs: {
            enabled: true,
            config: {
                minified: true,
                comments: false
            }
        }
    },

    es6: {
        sourcemaps: {
            enabled: "local"
        },
        browserify: {
            enabled: true
        },
        uglify: {
            enabled: false
        },
        babeljs: {
            enabled: true,
            config: {
                minified: false,
                presets: [
                    [
                        "env",
                        {
                            targets: {
                                browsers: browserlist
                            }
                        }
                    ]
                ]
            }
        }
    },

    clean: {
        enabled: "dist",
        paths: ["../public/**/*.map", "../src/tmp"]
    },

    images: {
        imagemin: {
            enabled: true,
            config: [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({ plugins: [{ removeViewBox: true }] })
            ]
        }
    },

    svg: {
        svgmin: {
            enabled: true,
            config: {}
        }
    },

    paths: {
        // "DESTINATION" : ['SOURCE']
        css: {
            "dist/{env}/css/": ["src/scss/**/*.scss"]
        },
        es6: {
            "src/tmp/es6-bundle.js": ["src/es6/**/*.js"]
        },
        es6Watch: {
            "src/tmp/es6-bundle.js": ["src/es6/**/*.js"]
        },
        js: {
            "dist/{env}/js/script.js": [
                "src/tmp/es6-bundle.js",
                "src/js/**/*.js"
            ]
        },
        images: {
            "../public_html/images/": [
                "src/images/**/*.jpeg",
                "src/images/**/*.jpg",
                "src/images/**/*.png",
                "src/images/**/*.gif"
            ]
        },
        svg: {
            "../public_html/images/": ["src/images/**/*.svg"]
        },
        copy: {
            "../public/fonts/": ["../src/fonts/**/*.*"],
            "../public/favicons/": ["../src/favicons/**/*.*"]
        }
    },

    // All tasks above are available (css, js, images and svg)
    combinedTasks: {
        default: [["dist", "watch"]],
        dist: ["es6", "js", "images", "svg", "css", "copy", "clean"],
    },

    watchTask: {
        images: ["images"],
        svg: ["svg"],
        css: ["css"],
        es6Watch: ["es6"],
        js: ["js"],
        copy: ["copy"]
    }
};
