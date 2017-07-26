var cleanCSS = require('gulp-clean-css');

module.exports = function(buffer, config) {

    return buffer.pipe(
        cleanCSS(config)
    );

};