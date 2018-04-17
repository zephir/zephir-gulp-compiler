const cleanCSS = require("gulp-clean-css");

module.exports = (buffer, config) => buffer.pipe(cleanCSS(config));
