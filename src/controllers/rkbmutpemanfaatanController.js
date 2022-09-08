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
            const error = new Error("Data Sudah Ada")
            error.statusCode = 422;
            throw error
        }
        //Pemisah Kode dan Nama Unit
        let unit = req.body.unit
        const split_unit = unit.split("||")
        let kode_unit = split_unit[0]
        let nama_unit = split_unit[1]
        //Insert RKBMUT Pemanfaatan 
        RkbmUTPemanfaatan.create({
            kode_unit_kerja : kode_unit, 
            nama_unit_kerja : nama_unit, 
            kode_asset : req.body.kode_asset, 
            tahun : req.body.tahun, 
            nup : req.body.nup, 
            revisi_ke : 0, 
            status_revisi : 0, 
            total_realisasi_pnpb : req.body.total_realisasi_pnpb, 
            jumlah_item : req.body.jumlah_item, 
            kode_bentuk_pemanfaatan : req.body.kode_bentuk_pemanfaatan, 
            peruntukan : req.body.peruntukan,
            jangka_waktu : req.body.jangka_waktu, 
            potensi_pnpb : req.body.potensi_pnpb, 
            keterangan : req.body.keterangan
        })
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Data Gagal Dimasukkan")
            error.statusCode = 422;
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Dimasukkan", 
            data : app
        });
    })
    .then((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}