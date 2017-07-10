module.exports = function(string) {
    return string.replace('{env}', global.env);
};