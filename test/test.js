'use strict';

require('./globalVars.js');
require('./testConfig.js');

var assert = require('assert'),
    fs = require('fs');


function runGulp() {

    require(__dirname + '/../tasks/js/task.js')(gulp, testConfig.js, testConfig.paths.js);
    gulp.start('js');

    // console.log(gulp.tasks.js.done);

    require(__dirname + '/../tasks/css/task.js')(gulp, testConfig.css, testConfig.paths.css);
    gulp.start('css');


    require(__dirname + '/../tasks/images/task.js')(gulp, testConfig.images, testConfig.paths.images);
    gulp.start('images');

}

function runTest() {

     describe('Testing gulp tasks: \n',  function () {

         var fileJS = './test/output/js/test.js',
             fileCSS = './test/output/css/main.css',
             fileImage = './test/output/images/test.jpg',
             jsInput = fs.readFileSync('./test/input_comp/js/test.js', 'utf8'),
             cssInput = fs.readFileSync('./test/input_comp/css/main.css', 'utf8'),
             imageInput = './test/output/images/test.jpg',
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
             it("done", function () {
                 assert.equal(true, compareFiles("css"));
             })
         });
         describe('Javascript compiling ... ', function () {

             it("done", function () {
                 assert.equal(true, compareFiles("js"));
             })
         });
         describe('Image compression ... ', function () {

             it("done", function () {
                 assert.equal(true, compareFiles("images"));
             })
         });
     });

}

runGulp();

runTest();


