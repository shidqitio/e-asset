const JenisTrn = require("../models/jenisTrn")
const {Op} = require("sequelize")

exports.index = (req, res, next) => {
    JenisTrn.findAll()
    .then((jenis) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : jenis
        });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    });
};

//Show by No_SPPA
exports.show = (req, res, next) => {
    JenisTrn.findOne({
        where : {
            no_sppa : req.params.no_sppa
        }
    })
    .then((jenis) => {
        if(!jenis) {
            const error = new Error("no_sppa Tidak Ada")
            error.statusCode = 422
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data",
            data : jenis
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
};

exports.store = (req, res, next) => {
    JenisTrn.findOne({
        where : {
            [Op.or] : [
                {no_sppa : req.body.no_sppa},
                {kode_trn : req.body.kode_trn}
            ]
        }
    })
    .then((jenis) => {
        if(jenis){
            const error = new Error("Data Sudah Ada")
            error.statusCode = 422; 
            throw error;
        }
        return JenisTrn.create({
            no_sppa : req.body.no_sppa, 
            kode_trn : req.body.kode_trn, 
            jenis_trn : req.body.jenis_trn
        });
    })
    .then((data) => {
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditambahkan", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}