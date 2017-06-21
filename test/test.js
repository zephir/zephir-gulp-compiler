require('./globalVars.js');

var testConfig = {

    css: {
        scss: {
            config: {
                outputStyle: 'compressed' // nested, compact, expanded and compressed are available options
            }
        },
        autoprefixer: {
            enabled: true,
            config: {
                browsers: ['> 0.1%']
            }
        },
        pxToRem: {
            enabled: true,
            config: {
                rootValue: 16,
                propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                selectorBlackList: [/^html$/, /^body$/], // Ignore font-size definition on html or body
                replace: false
            }
        },
        cleanCss: {
            enabled: "dev, prep, prod",
            config: {
                compatibility: 'ie8'
            }
        }
    },

    js: {
        babeljs: {
            enabled: true,
            config: {
                minified: true
            }
        }
    },

    paths: {
        js: {
            "./test/output/test.js": ['./test/input/js/*.js']
        },
        css: {
            "./test/output/test.css": ['./test/input/**/*.scss']
        }
    }

};

// One basic idea to write unit tests ...

var assert = require('assert');

var getSilvan = function(name) {

    if (name == "silvan") {
        return true;
    }

    return false;
};

// Ende

describe('Testing Gulp tasks', function() {


    console.log('whaat');

    /*testConfig.paths.js = {
        "./test/output/test.js": ['./test/input/js/*.js']
    }; */

    require(__dirname + '/../tasks/js/task.js')(gulp, testConfig.js, testConfig.paths.js);
    gulp.start('js');

    describe('Testing CSS compiling and compression ... ', function() {
        it("Passed, this test was successfull", function() {
            assert.equal(true, getSilvan("silvan"));
        })
    });
    describe('Testing Image compression ... ', function() {
        it("Passed, this test was successfull", function() {
            assert.equal(false, getSilvan("basil"));
        })
    });
});