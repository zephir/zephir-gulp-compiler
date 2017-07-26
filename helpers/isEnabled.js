module.exports = function(param) {
    return param === true || (typeof param === 'string' && param.indexOf(global.env) !== -1);
};