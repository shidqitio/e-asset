const RefTugasSubAnjab = require("../models/refTugasSubAnjab")
const {kodesubtugas} = require("../helper/kode_anjab")

exports.index = (req, res, next) => {
    RefTugasSubAnjab.findAll()
    .then((data) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data,
        });
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.storepokok = (req, res, next) => {
    let kode_unit = req.body.kode_unit
    let kode_jabatan_struktural = req.body.kode_jabatan_struktural
    let kode_tugas = req.body.kode_tugas
    let nama_tugas_sub = req.body.nama_tugas_sub
    let status = req.body.status
    return RefTugasSubAnjab.max("kode_tugas_sub", {
        where : {
            kode_unit : kode_unit, 
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_tugas : kode_tugas
        }
    })
    .then((kode) => {
        const kode_hasil = kode_tugas + "." + kodesubtugas(kode)
        return RefTugasSubAnjab.create({
            kode_unit : kode_unit, 
            kode_jabatan_struktural : kode_jabatan_struktural, 
            kode_tugas : kode_tugas, 
            kode_tugas_sub : kode_hasil, 
            nama_tugas_sub : nama_tugas_sub,
            status : status
        });
    })
    .then((insert) => {
        if(!insert) {
            const error = new Error("Data Gagal Masuk")
            error.statusCode = 422;
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : insert,
        })
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
        nama_tugas_sub : req.body.nama_tugas_sub
    }
    let param = {
        kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
        kode_unit : req.params.kode_unit, 
        kode_tugas_sub : req.params.kode_tugas_sub
    }
    RefTugasSubAnjab.findOne({
        where : param
    })
    .then((data)=> {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RefTugasSubAnjab.update(upd,{
            where : param
        })
    })
    .then((update) => {
        if(!update) {
            const error = new Error("Data Gagal Update")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Mengubah Data", 
            data : update
        })
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
        kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
        kode_unit : req.params.kode_unit, 
        kode_tugas_sub : req.params.kode_tugas_sub
    }
    RefTugasSubAnjab.findOne({
        where : param
    })
    .then((data)=> {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RefTugasSubAnjab.destroy({
            where : param
        })
    })
    .then((des) => {
        if(!des) {
            const error = new Error("Data Gagal Hapus")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Mengubah Data", 
            data : des
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}