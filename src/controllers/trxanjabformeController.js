const TrxUnitKerja = require("../models/trxUnitKerja");
const TrxAnjabFormE = require("../models/trxAnjabFormE");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.index = (req, res, next) => {
    TrxUnitKerja.findAll({
        where : {
            kode_unit_kerja : {
                [Op.notLike] : 'J%'
            }
        },
        include : [
            {
                model : TrxAnjabFormE , 
            }
        ]
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
}

exports.show = (req, res, next) => {
    TrxAnjabFormE.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
        } ,
        include : [
            {
                model : TrxUnitKerja,
            }
           
        ]
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Anjab Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
}