var postcss = require('gulp-postcss'),
    pxtorem = require('postcss-pxtorem');

module.exports = function(buffer, config) {

    return buffer.pipe(
        postcss([ pxtorem(config) ]).on('error', function(error) {
            console.error(error.toString())
        })
    );

};