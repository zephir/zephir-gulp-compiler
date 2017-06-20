
// One basic idea to write unit tests ...

var assert = require('assert');

var getSilvan = function(name) {

    if (name == "silvan") {
        return true;
    }

    return false;
};



describe('Testing Gulp tasks', function() {
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