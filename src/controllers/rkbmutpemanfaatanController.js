const db = require("../config/database");
const RkbmUTPemanfaatan = require("../models/rkbmutPemanfaatan")

//Data RKBMUT UNIT 
exports.indexunit = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
        where : {
            status_revisi : 0,
            kode_unit_kerja : req.params.kode_unit_kerja 
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

//Data RKBMUT APIP 
exports.indexapip = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
        where : {
            status_revisi : 1, 
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

//INSERT RKBMUT PEMANFAATAN
exports.store = (req, res, next) => {
    let unit = req.body.unit
    const split_unit = unit.split("||")
    let kode_unit = split_unit[0]
    let nama_unit = split_unit[1]
    RkbmUTPemanfaatan.findAll({
        tahun : req.body.tahun, 
        kode_unit_kerja : kode_unit, 
        status_revisi : 0, 
        nup : req.body.nup
    })
    .then((data) => {
        if(data.length !== 0){ 
            let datum = JSON.parse(JSON.stringify(data))
            const index = datum.length
            const {revisi_ke} = datum[index - 1]
            revisi = revisi_ke + 1 
            
        }
    })
}