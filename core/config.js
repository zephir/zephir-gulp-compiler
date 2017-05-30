var fs = require('fs');

var compileCnfigExists = function() {
    return fs.existsSync(global.appRootDir + '/compileConfig.js');
};

var writeDefaultConfig = function() {
    var defaultConfig = fs.readFileSync(global.moduleRootDir + '/defaultConfig.js', 'UTF-8');

    // Write the default compileConfig file
    fs.writeFileSync(global.appRootDir + '/compileConfig.js', defaultConfig);
};

var configVersionsDifferent = function() {
    var defaultConfig = require(global.moduleRootDir + '/defaultConfig.js');
    var compileConfig = require(global.appRootDir + '/compileConfig.js');

    return compileConfig.version !== defaultConfig.version;
};

var config = function() {
    var defaultConfig = require(global.moduleRootDir + '/defaultConfig.js');

    if(!compileCnfigExists()) {
        writeDefaultConfig();
    }

    if(configVersionsDifferent()) {
        console.info("The defaultConfig was updated! Be sure to update you compileConfig accordingly. New version: " + defaultConfig.version);
    }

    return require(global.appRootDir + '/compileConfig.js');
    // return require(global.moduleRootDir + '/defaultConfig.js');
};

module.exports = config;