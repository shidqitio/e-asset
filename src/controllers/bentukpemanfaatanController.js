const BentukPemanfaatan = require("../models/bentukPemanfaatan")

exports.index = (req, res, next) => {
    BentukPemanfaatan.findAll({
        attributes : {exclude: ["udcr", "udch"]}
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Show By Id 
exports.show = (req, res, next) => {
    BentukPemanfaatan.findAll({
        where : {
            kode_bentuk_pemanfaatan : req.params.kode_bentuk_pemanfaatan
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
};