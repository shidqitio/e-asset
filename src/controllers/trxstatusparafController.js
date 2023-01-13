const TrxStatusParaf = require("../models/trxStatusParaf")

exports.index = (req, res, next) => {
    return TrxStatusParaf.findAll()
    .then((data) => {
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}