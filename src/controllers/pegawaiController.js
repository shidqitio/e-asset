const Pegawai = require("../models/pegawai");
const Agama = require("../models/agama"); 
const jafung = require("../models/jafung");
const path = require("path");
const fs = require("fs");



exports.index = (req, res, next) => {
    Pegawai.findAll()
    .then((pegawai) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : pegawai,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.store = (req, res, next) =>{
    const filename = path.parse(req.file.filename).base;
    Pegawai.findOne({where : {nip : req.body.nip}})
    .then((pegawai)=> {
        if(pegawai){
            const error = new Error("NIP Sudah Terdaftar");
            error.statusCode = 422; 
            throw error;
        }
        return Pegawai.create({
            nip : req.body.nip, 
            nama_pegawai : req.body.nama_pegawai,
            kode_jafung : req.body.kode_jafung, 
            nidn : req.body.nidn, 
            tempat_lahir : req.body.tempat_lahir, 
            tanggal_lahir : req.body.tanggal_lahir, 
            jenis_kelamin : req.body.jenis_kelamin, 
            kode_agama : req.body.kode_agama, 
            tmt_cpns : req.body.tmt_cpns, 
            tmt_pns : req.body.tmt_pns,
            alamat : req.body.alamat,
            nomor_telp : req.body.nomor_telp, 
            email : req.body.email, 
            status_nikah : req.body.status_nikah, 
            status_pegawai : req.body.status_pegawai, 
            foto_pegawai : filename,
            ucr : req.user
        });
    })
    .then((create_pegawai) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menambah Data", 
            data : create_pegawai
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
    Pegawai.findOne({where : {nip : req.params.nip}})
    .then((app) => {
        if(!app) {
            const error = new Error("Nip Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next (err);
    });
};

exports.update = (req, res, next) => {
    let data = {
        nama_pegawai : req.body.nama_pegawai,
        kode_jafung : req.body.kode_jafung, 
        nidn : req.body.nidn, 
        tempat_lahir : req.body.tempat_lahir, 
        tanggal_lahir : req.body.tanggal_lahir, 
        jenis_kelamin : req.body.jenis_kelamin, 
        kode_agama : req.body.kode_agama, 
        tmt_cpns : req.body.tmt_cpns, 
        tmt_pns : req.body.tmt_pns,
        alamat : req.body.alamat,
        nomor_telp : req.body.nomor_telp, 
        email : req.body.email, 
        status_nikah : req.body.status_nikah, 
        status_pegawai : req.body.status_pegawai, 
        uch : req.user,
    };

    if(req.file) {
        const filename = path.parse(req.file.filename).base;
        data = {
            nama_pegawai : req.body.nama_pegawai,
            kode_jafung : req.body.kode_jafung, 
            nidn : req.body.nidn, 
            tempat_lahir : req.body.tempat_lahir, 
            tanggal_lahir : req.body.tanggal_lahir, 
            jenis_kelamin : req.body.jenis_kelamin, 
            kode_agama : req.body.kode_agama, 
            tmt_cpns : req.body.tmt_cpns, 
            tmt_pns : req.body.tmt_pns,
            alamat : req.body.alamat,
            nomor_telp : req.body.nomor_telp, 
            email : req.body.email, 
            status_nikah : req.body.status_nikah, 
            status_pegawai : req.body.status_pegawai, 
            foto_pegawai : filename,
            uch : req.user,
        }
    }

    Pegawai.findOne({ where : {nip : req.params.nip}})
    .then((app) => {
        if(req.file) {
            clearImage(app.foto_pegawai);
        }
        if(!app) {
            const error = new Error("NIP Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Pegawai.update(data, {where : {nip : req.params.nip}});
    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.destroy = async (req, res, next) => {
    Pegawai.findOne({where : {nip : req.params.nip }})
    .then((app) => {
        if(!app) {
            const error = new Error("NIP Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        clearImage(app.foto_pegawai);
        return Pegawai.destroy({
            where : {nip : req.params.nip},
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname,"..","..","public","images","foto_pegawai", filePath);
    fs.unlink(filePath, (err) => {
        console.log("Unlink error", err);
    });
};