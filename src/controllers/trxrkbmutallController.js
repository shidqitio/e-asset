const TrxRkbmutAll = require("../models/trxRkbmutAll")


exports.index = (req, res, next) => {
    return TrxRkbmutAll.findAll()
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422;
            throw error
        }
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