const {validationResult} = require('express-validator')

exports.checker = (req, res, next) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
          const error = new Error();
          error.statusCode = 422;
          error.message = errors.array();
          throw error;
        }
        next()
}