const RkbmutPemeliharaanHeader = require("../models/rkbmutPemeliharaanHeader")
const RkbmutPemeliharaanDetail = require("../models/rkbmutPemeliharaanDetail")
const Aset = require("../models/asset")
const {Op} = require("sequelize")
const db = require("../config/database")

//Data RKBMUT UNIT
exports.indexunit = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja
        }, 
        include : [
            {
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]}, 
                include : [
                    {
                        model : Aset
                    }
                ]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
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

//DATA RKBMUT PPK
exports.indexppk = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            [Op.or] : [
                {status_paraf : 1}, 
                {status_paraf : 2}
            ]
        }, 
        include : [
            {
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]},
                include : [
                    {
                        model : Aset
                    }
                ]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
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

exports.indexapip = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_paraf : 2
        }, 
        include : [
            {
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]},
                include : [
                    {
                        model : Aset
                    }
                ]
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

//INSERT RKBMUT PEMELIHARAAN 


//UNIT MENGAJUKAN KE PPK 


//PPK PARAF DIAJUKAN KE APIP


//REVIEW APIP


//REVIEW UNIT


//PARAF APIP SELESAI 


//PARAF UNIT SELESAI 


//UPDATE 


