module.exports = {

    chalk: require('chalk'), // Used for better log formatting

    success: function(message) {
        console.log(
            this.getFormattedTime() +
            this.chalk.green(message)
        );
    },
    error: function(message) {
        console.log(
            this.getFormattedTime() +
            this.chalk.red(message)
        );
    },
    warning: function(message) {
        console.log(
            this.getFormattedTime() +
            this.chalk.yellow(message)
        );
    },
    info: function(message) {
        console.log(
            this.getFormattedTime() +
            this.chalk.blue(message)
        );
    },

    getFormattedTime: function() {
        var time = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric", second: "numeric"});
        return this.chalk.cyan('[' + time + '] ');
    }

}