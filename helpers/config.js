const fs = require("fs");

/**
 * Checks if the config exists in the working dir
 * @returns {boolean}
 */
const configExists = () => {
    return fs.existsSync(`${globals.cwd}/gulp-config.js`);
};

/**
 * Writes the gulp-config-default.js content from the module dir
 * into gulp-config.js file in the working dir (creates the file)
 */
const writeDefaultConfig = () => {
    // Read the default config
    const defaultConfig = fs.readFileSync(
        `${globals.moduleDir}/gulp-config-default.js`,
        'UTF-8'
    );

    // Write the default config file
    fs.writeFileSync(`${globals.cwd}/gulp-config.js`, defaultConfig);
};

/**
 * Checks if config exists, if not invokes writeDefaultConfig
 * Always returns the config
 * @param gulp
 * @param imagemin
 * @returns {string}
 */
module.exports = (gulp, imagemin) => {
    if (!configExists()) {
        // Write config if it doesn't exist
        writeDefaultConfig();
        log.info(`Config written to ${globals.cwd}/gulp-config.js! Adopt to your needs.`);
    }

    log.info(`Loading config from: ${globals.cwd}/gulp-config.js`);
    return require(`${globals.cwd}/gulp-config.js`)(gulp, imagemin);
};