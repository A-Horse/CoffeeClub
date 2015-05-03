var winston = require('winston'),
    setting = require('./setting');

var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
          level: setting.log_level,
          colorize: true
        })
    ]
});

module.exports = logger;