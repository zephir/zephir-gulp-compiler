const fs = require("fs");

const compileConfigExistsInAppRootDir = () =>
    fs.existsSync(`${global.appRootDir}/gulp-config.js`);

const compileConfigExistsInCwd = () => {
    const cwd = process.cwd();
    return fs.existsSync(`${cwd}/gulp-config.js`);
};

const writeDefaultConfig = () => {
    const defaultConfig = fs.readFileSync(
        `${global.moduleRootDir}/gulp-config-default.js`,
        "UTF-8"
    );

    // Write the default compileConfig file
    fs.writeFileSync(`${global.appRootDir}/gulp-config.js`, defaultConfig);
};

const config = () => {
    const defaultConfig = require(`${global.moduleRootDir}/gulp-config-default.js`);

    // nowhere
    if (!compileConfigExistsInAppRootDir() && !compileConfigExistsInCwd()) {
        writeDefaultConfig();
        console.log(`Load config from: ${global.appRootDir}/gulp-config.js`);
        return require(`${global.appRootDir}/gulp-config.js`);
    } else if (compileConfigExistsInAppRootDir()) {
        console.info(
            `Loading config from: ${global.appRootDir}/gulp-config.js`
        );
        return require(`${global.appRootDir}/gulp-config.js`);
    } else if (compileConfigExistsInCwd()) {
        const cwd = process.cwd();
        global.runFrom = cwd;
        console.info(`Loading config from: ${cwd}/gulp-config.js`);
        return require(`${cwd}/gulp-config.js`);
    }
};

module.exports = config;
