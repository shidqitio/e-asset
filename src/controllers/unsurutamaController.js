const UnsurUtama = require("../models/unsurUtama");

exports.index = (req,res, next) => {
    UnsurUtama.findAll()
    .then((unsur) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : unsur,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    UnsurUtama.findOne({where : {kode_unsur_utama : req.params.kode_unsur_utama}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Unsur Utama Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};