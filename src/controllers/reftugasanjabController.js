const RefTugasAnjab = require("../models/refTugasAnjab")
const RefTugasSubAnjab = require("../models/refTugasSubAnjab")
const {kodetugaspokok} = require("../helper/kode_anjab")
const {kodetugastambahan} = require("../helper/kode_anjab")

exports.index = (req,res,next) => {
    RefTugasAnjab.findAll({
        include : [
            {
                model : RefTugasSubAnjab
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
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
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}

exports.storepokok = (req, res, next) => {
    let kode_jabatan_struktural = req.body.kode_jabatan_struktural
    let kode_unit = req.body.kode_unit
    let nama_tugas = req.body.nama_tugas
    let status = req.body.status
    return RefTugasAnjab.findAll({
        where : {
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_unit : kode_unit,
            status : "pokok"
        }
    })
    .then((tugas) => {
        if(tugas.length === 0) {
            kode_hasil = "P.01"
        }
        else{
            let cek = JSON.parse(JSON.stringify(tugas))
            let index = tugas.length
            const {kode_tugas} = cek[index-1]
            const kode = JSON.parse(JSON.stringify(kode_tugas))
            kode_hasil = kodetugaspokok(kode);
        }
        return RefTugasAnjab.create({
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_unit : kode_unit, 
            kode_tugas : kode_hasil, 
            nama_tugas : nama_tugas,
            status : status
        });
    })
    .then((create) => {
        return res.json({
            status : "Success", 
            message : "Berhasil Menambah Data", 
            data : create
        });
    })
    .catch((err) => { 
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.storetambahan = (req, res, next) => {
    let kode_jabatan_struktural = req.body.kode_jabatan_struktural
    let kode_unit = req.body.kode_unit
    let nama_tugas = req.body.nama_tugas
    let status = req.body.status
    return RefTugasAnjab.findAll({
        where : {
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_unit : kode_unit, 
            status : "tambahan"
        }
    })
    .then((tugas) => {
        if(tugas.length === 0) {
            kode_hasil = "T.01"
        }
        else{
            let cek = JSON.parse(JSON.stringify(tugas))
            let index = tugas.length
            const {kode_tugas} = cek[index-1]
            const kode = JSON.parse(JSON.stringify(kode_tugas))
            kode_hasil = kodetugastambahan(kode);
        }
        return RefTugasAnjab.create({
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_unit : kode_unit, 
            kode_tugas : kode_hasil, 
            nama_tugas : nama_tugas,
            status : status
        });
    })
    .then((create) => {
        return res.json({
            status : "Success", 
            message : "Berhasil Menambah Data", 
            data : create
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.update = (req, res, next) => {
    let upd = {
        nama_tugas : req.body.nama_tugas
    }
    let param = {
        kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
        kode_unit : req.params.unit,
        kode_tugas : req.params.kode_tugas 
    }
    return RefTugasAnjab.findOne({
        where : param
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Kode Tugas Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return RefTugasAnjab.update(upd,{
            where : param
        });
    })
    .then((update) => {
        if(!update) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Mengubah Data", 
            data : update
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.destroy = (req, res, next) => {
    let param = {
        kode_tugas : req.params.kode_tugas, 
        kode_unit : req.params.kode_unit, 
        kode_jabatan_struktural : req.params.kode_jabatan_struktural
    }
    RefTugasAnjab.findOne({
        where : param
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tugas Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return RefTugasAnjab.destroy({
            where : param
        })
    })
    .then((response) => {
        if(!response) {
            const error = new Error("Gagal Hapus");
            error.statusCode = 422;
            throw error;
        }
        return res.json({
            status: "success",
            message: "Berhasil menghapus data",
            data: response,    
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}