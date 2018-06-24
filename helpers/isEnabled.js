module.exports = (param) =>
    param === true || (typeof param === "string" && param.indexOf(globals.env) !== -1);