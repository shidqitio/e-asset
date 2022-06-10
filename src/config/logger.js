const appSettings = {
    log4js: {
        traceLogConfig: {
            appenders: {
                fileAppender: { type: 'file', filename: './logger/logger.log' }
            },
            categories: {
                default: { appenders: ['fileAppender'], level: 'debug' }
            }
        }
    }
};

module.exports = appSettings;