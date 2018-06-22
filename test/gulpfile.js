// Delete generated config for tests
const fs = require('fs');
if (fs.existsSync(`${process.cwd()}/gulp-config.js`)) {
    console.log(`Removed generated ${process.cwd()}/gulp-config.js`);
    fs.unlinkSync(`${process.cwd()}/gulp-config.js`);
}

require("../index.js")(require("gulp"));