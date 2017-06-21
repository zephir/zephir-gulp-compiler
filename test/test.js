require('./globalVars.js');
var assert = require('assert');
var fs = require('fs');

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
            "./test/output/js/test.js":['./test/input/js/**/*.js']
        },
        css: {
            "./test/output/":['./test/input/**/*.scss']
        }
    }

};


// A callback needs to be implemented, so that runGulp() is completely done before runTest() starts

function runGulp() {
    require(__dirname + '/../tasks/js/task.js')(gulp, testConfig.js, testConfig.paths.js);
    gulp.start('js');

    require(__dirname + '/../tasks/css/task.js')(gulp, testConfig.css, testConfig.paths.css);
    gulp.start('css');

    var jsInput = fs.readFileSync('./test/input/compiled/js/test.js', 'utf8');
    var jsOutput = fs.readFileSync('./test/output/js/test.js', 'utf8');

    var cssInput = fs.readFileSync('./test/input/compiled/css/main.css', 'utf8');
    var cssOutput = fs.readFileSync('./test/output/css/main.css', 'utf8');

    var compareFiles = function(id) {

        if (id == "js" && jsInput === jsOutput) {
            return true;
        }

        if (id == "css" && cssInput === cssOutput) {
            return true;
        }

        return false;
    };
}

 function runTest() {

     describe('Gulp tasks testing', function () {

         describe('CSS compiling and compression ... ', function () {
             it("Test was done", function () {
                 assert.equal(true, compareFiles("css"));
             })
         });
         describe('Testing JS compression ... ', function () {

             it("Test was done", function () {
                 assert.equal(true, compareFiles("js"));
             })
         });
     });
     
 }

runGulp();

// Or create implement script which waits until the compiled files are available in output

runTest();
