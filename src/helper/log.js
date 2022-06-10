exports.logger = (err) => {
    const log4js = require("log4js")

    const {traceLogConfig} = require("../config/logger").log4js;

    log4js.configure(traceLogConfig);

    const logger = log4js.getLogger();

    return logger.debug(err)
}