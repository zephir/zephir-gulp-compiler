const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

module.exports = (buffer, config) =>
    buffer.pipe(
        postcss([autoprefixer(config)]).on("error", error => {
            console.error(error.toString());
        })
    );
