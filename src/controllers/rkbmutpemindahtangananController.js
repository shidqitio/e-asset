const RkbmutPemindahtanganan = require("../models/rkbmutPemindahtanganan")
const Aset = require("../models/asset")
const {Op} = require("sequelize")

//Data RKBMUT UNIT
exports.indexunit = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja
        }, 
        include : [
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Data RKBMUT PPK 
exports.indexppk = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
        where  : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            [Op.or] : [
                {status_paraf : 1}, 
                {status_paraf : 2}
            ]
        }, 
       include : [
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
            }
       ]
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

//Data RKBMUT APIP
exports.indexapip = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            status_paraf : 2,
        }, 
        include : [ 
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Insert RKBMUT Pemindahtanganan
