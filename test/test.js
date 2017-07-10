require('./globalVars.js');
require('./testConfig.js');

var assert = require('assert'),
    fs = require('fs');

function cleanUp() {
    del.sync([
        __dirname + '/output/**/*',
    ]);
}

function runGulp() {
    describe('Prepare testing: \n',  function () {

        it('Delete previously compiled files ...', function(wait) {

            cleanUp();

            setTimeout(wait, 1000);

            describe('Running gulp tasks: \n',  function () {
            return new Promise(function(resolve) {

                require(__dirname + '/../tasks/css/task.js')(gulp, testConfig.css, testConfig.paths.css);
                gulp.start('css');

                resolve();

                }).then(function () {

                require(__dirname + '/../tasks/js/task.js')(gulp, testConfig.js, testConfig.paths.js);
                gulp.start('js');

                }).then(function () {

                require(__dirname + '/../tasks/images/task.js')(gulp, testConfig.images, testConfig.paths.images);
                gulp.start('images');

                });
            });
        });
    });
}

function runTest() {

     describe('Testing gulp tasks: \n',  function () {

         var fileJS = './test/output/js/test.js',
             fileCSS = './test/output/css/main.css',
             fileImage = './test/output/images/test.jpg',
             jsInput = fs.readFileSync('./test/input_comp/js/test.js', 'utf8'),
             cssInput = fs.readFileSync('./test/input_comp/css/main.css', 'utf8'),
             imageInput = './test/input/images/test.jpg',
             compareFiles = function(task) {

                 if (task == "js" && jsInput === fs.readFileSync(fileJS, 'utf8')) {
                     return true;
                 }

                 if (task == "css" && cssInput === fs.readFileSync(fileCSS, 'utf8')) {
                     return true;
                 }

                 if (task == "images" && fs.statSync(imageInput).size > fs.statSync(fileImage).size) {
                     return true;
                 }

                 return false;
             };


         describe('SCSS to CSS compiling ... ', function () {

             it("done", function (scss) {
                 assert.equal(true, compareFiles("css"));
                  setTimeout(scss, 500);

             })
         });

         describe('Javascript compiling ... ', function () {

             it("done", function (js) {
                 assert.equal(true, compareFiles("js"));
                 setTimeout(js, 500);
             })
         });

         describe('Image compression ... ', function () {

             it("done", function (img) {
                 assert.equal(true, compareFiles("images"));
                 setTimeout(img, 500);
             })
         });
     });
}

function Test(run) {
    runGulp();

    setTimeout(run, 1000);
    runTest();
}

Test();


