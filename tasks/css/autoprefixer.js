var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');

module.exports = function(buffer, config) {

    return buffer.pipe(
        postcss([ autoprefixer(config) ]).on('error', function(error) {
            console.error(error.toString())
        })
    );

};