module.exports = param =>
    param === true || (typeof param === "string" && param.indexOf(global.env) !== -1);
