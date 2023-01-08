const {text} = require("../helpers/constant")

exports.jsonFormat = (req, res, next) => {
    res.json({
        status : text.response.success, 
        message : msg, 
        data : data
    })
}