let testConfig = require("../gulp-config-default");

// Enable uglify which is disabled by default
testConfig.js.uglify.enabled = true;
testConfig.extraTasks.es6.uglify.enabled = true;

testConfig.clean = {
    paths: ["./output/favicons/deleteme.txt"]
};

testConfig.paths = {
    // "DESTINATION" : ['SOURCE']
    css: {
        "./output/css/": ["./input/css/**/*.scss"]
    },
    es6: {
        "./input/tmp/": ["./input/es6/*.js"]
    },
    es6Watch: {
        watch: ["./input/es6/**/*.js"]
    },
    js: {
        "./output/js/script.js": ["./input/tmp/*.js", "./input/js/*.js"]
    },
    images: {
        "./output/images/": [
            "./input/images/**/*.jpeg",
            "./input/images/**/*.jpg",
            "./input/images/**/*.png",
            "./input/images/**/*.gif"
        ]
    },
    svg: {
        "./output/images/": ["./input/images/**/*.svg"]
    },
    copy: {
        "./output/favicons/": ["./input/favicons/**/*.*"],
    }
};

testConfig.combinedTasks.test = ["es6", "js", "images", "svg", "css", "copy"];

module.exports = testConfig;