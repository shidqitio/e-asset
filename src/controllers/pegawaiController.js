const Pegawai = require("../models/pegawai");
const Agama = require("../models/agama"); 
const TrxUnitKerjaPegawai = require("../models/trxUnitKerjaPegawai");
const TrxBank = require("../models/trxBank");
const Unit = require("../models/unit")
const path = require("path");
const fs = require("fs");
const Bank = require("../models/bank");
const {logger} = require("../helper/log");  
const TrxJabatanFungsional = require("../models/trxJabatanFungsional");
const JenisFungsional = require("../models/jenisFungsional");
const Jafung = require("../models/jafung");
const JafungPangkat = require("../models/jafungPangkat");
const TrxJabatanPengadaan = require("../models/trxJabatanPengadaan");
const JabatanPengadaanDetail = require("../models/jabatanpengadaandetail");


exports.index = (req, res, next) => {
    Pegawai.findAll({
        attributes: {
            exclude : ["ucr","uch","udcr","udch"]
        },
        include : [
            {
                model : Agama, 
                attributes : ["kode_agama","nama_agama"],
            },
            {
                model : TrxUnitKerjaPegawai, 
                attributes : ["kode_unit", "nip"], 
                include : [
                    {
                        model : Unit, 
                        attributes : ["kode_unit", "nama_unit"]
                    }
                ]
            }, 
            {
                model : TrxBank, 
                attributes : ["kode_bank", "no_rekening"],
                include : [
                    {
                        model : Bank, 
                        attributes : ["kode_bank", "nama_bank"],
                    }
                ]
            }
        ],
    })
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
    Pegawai.findOne({where : {nip : req.body.nip}})
    .then((pegawai)=> {
        if(pegawai){
            const error = new Error("NIP Sudah Terdaftar");
            error.statusCode = 422; 
            throw error;
        }
        if(req.file){
            const filename = path.parse(req.file.filename).base;
            return Pegawai.create({
                nip : req.body.nip, 
                nama_pegawai : req.body.nama_pegawai,
                nidn : req.body.nidn, 
                tempat_lahir : req.body.tempat_lahir, 
                tanggal_lahir : req.body.tanggal_lahir, 
                jenis_kelamin : req.body.jenis_kelamin, 
                kode_agama : req.body.kode_agama, 
                tmt_cpns : req.body.tmt_cpns, 
                tmt_pns : req.body.tmt_pns,
                ktp : req.body.ktp,
                alamat : req.body.alamat,
                nomor_telp : req.body.nomor_telp, 
                email : req.body.email, 
                status_nikah : req.body.status_nikah, 
                status_pegawai : req.body.status_pegawai,
                foto_pegawai : filename,
                facebook : req.body.facebook, 
                instagram : req.body.instagram, 
                twitter : req.body.twitter, 
                ucr : req.user
            });
        }
        else{
            return Pegawai.create({
                nip : req.body.nip, 
                nama_pegawai : req.body.nama_pegawai,
                nidn : req.body.nidn, 
                tempat_lahir : req.body.tempat_lahir, 
                tanggal_lahir : req.body.tanggal_lahir, 
                jenis_kelamin : req.body.jenis_kelamin, 
                kode_agama : req.body.kode_agama, 
                tmt_cpns : req.body.tmt_cpns, 
                tmt_pns : req.body.tmt_pns,
                ktp : req.body.ktp,
                alamat : req.body.alamat,
                nomor_telp : req.body.nomor_telp, 
                email : req.body.email, 
                status_nikah : req.body.status_nikah, 
                status_pegawai : req.body.status_pegawai,
                facebook : req.body.facebook, 
                instagram : req.body.instagram, 
                twitter : req.body.twitter, 
                ucr : req.user
            });
        }   
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
    Pegawai.findOne({where : {nip : req.params.nip},
        attributes: {
            exclude : ["ucr","uch","udcr","udch"]
        },
        include : [
            {
                model : Agama, 
                attributes : ["kode_agama","nama_agama"],
            },
            {
                model : TrxUnitKerjaPegawai, 
                attributes : ["kode_unit", "nip"], 
                include : [
                    {
                        model : Unit, 
                        attributes : ["kode_unit", "nama_unit"]
                    }
                ]
            }, 
            {
                model : TrxBank, 
                attributes : ["kode_bank", "nip", "no_rekening"],
                include : [
                    {
                        model : Bank, 
                        attributes : ["kode_bank", "nama_bank"],
                    }
                ]
            }
        ],
    })
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
        logger(err)
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next (err);
    });
};

exports.update = (req, res, next) => {
    let data = {
        nama_pegawai : req.body.nama_pegawai,
        nidn : req.body.nidn, 
        tempat_lahir : req.body.tempat_lahir, 
        tanggal_lahir : req.body.tanggal_lahir, 
        jenis_kelamin : req.body.jenis_kelamin, 
        kode_agama : req.body.kode_agama, 
        kode_golongan_ruang : req.body.kode_golongan_ruang,
        tmt_cpns : req.body.tmt_cpns, 
        tmt_pns : req.body.tmt_pns,
        alamat : req.body.alamat,
        nomor_telp : req.body.nomor_telp, 
        email : req.body.email, 
        status_nikah : req.body.status_nikah, 
        status_pegawai : req.body.status_pegawai, 
        facebook : req.body.facebook, 
        instagram : req.body.instagram, 
        twitter : req.body.twitter,
        uch : req.user,
    };

    if(req.file) {
        const filename = path.parse(req.file.filename).base;
        data = {
            nama_pegawai : req.body.nama_pegawai,
            nidn : req.body.nidn, 
            tempat_lahir : req.body.tempat_lahir, 
            tanggal_lahir : req.body.tanggal_lahir, 
            jenis_kelamin : req.body.jenis_kelamin, 
            kode_agama : req.body.kode_agama, 
            kode_golongan_ruang : req.body.kode_golongan_ruang,
            tmt_cpns : req.body.tmt_cpns, 
            tmt_pns : req.body.tmt_pns,
            alamat : req.body.alamat,
            nomor_telp : req.body.nomor_telp, 
            email : req.body.email, 
            status_nikah : req.body.status_nikah, 
            status_pegawai : req.body.status_pegawai, 
            foto_pegawai : filename,
            facebook : req.body.facebook, 
            instagram : req.body.instagram, 
            twitter : req.body.twitter,    
            uch : req.user,
        }
    }

    Pegawai.findOne({ where : {nip : req.params.nip}})
    .then((app) => {
        if(req.file){
            if(app.foto_pegawai !== null) {
                clearImage(app.foto_pegawai);
                return Pegawai.update(data, {where : {nip : req.params.nip}});
            } else if(app.foto_pegawai === null) {
                return Pegawai.update(data, {where : {nip : req.params.nip}});
            }
        }
        else{
            return Pegawai.update(data, {where : {nip : req.params.nip}});
        }

        if(!app) {
            const error = new Error("NIP Tidak Ada");
            error.statusCode = 422;
            throw error;
        }

    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
        });
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.destroy =  (req, res, next) => {
    Pegawai.findOne({where : {nip : req.params.nip }})
    .then((app) => {
        if(!app) {
            const error = new Error("NIP Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        if(app.foto_pegawai === null){
            return Pegawai.destroy({
                where : {nip : req.params.nip},
            });
        } else{
            clearImage(app.foto_pegawai);
            return Pegawai.destroy({
                where : {nip : req.params.nip},
            });
        }

    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response,
        });
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.showbyEmail = (req, res, next) => {
    Pegawai.findOne({
        where : {email : req.params.email},
        attributes : ["nip", "nama_pegawai", "foto_pegawai", "email"], 
        include : [
            {
                model : TrxUnitKerjaPegawai, 
                attributes : ["kode_unit", "nip"], 
                include : [
                    {
                        model : Unit, 
                        attributes : ["kode_unit", "nama_unit"]
                    }
                ]
            }, 
            {
                model : TrxJabatanFungsional, 
                attributes : ["nip", "kode_sub_kelas", "tmt_awal"], 
                include : [
                    {
                        model : JenisFungsional , 
                        attributes : ["kode_jenis_fungsional", "nama_jenis_fungsional"], 
                    }, 
                    {
                        model : Jafung, 
                        attributes : ["kode_jenis_fungsional", "kode_jafung", "nama_jafung"]
                    }, 
                    {
                        model : JafungPangkat, 
                        attributes : ["kode_jafung", "kode_jafung_pangkat", "nama_jafung_pangkat", "kode_golongan_ruang", "angka_kredit"]
                    }
                ]
            }
        ]
    
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Email Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

const clearImage = (filePath) => {
    filePath = path.join(__dirname,"..","..","public","images","foto_pegawai", filePath);
    fs.unlink(filePath, (err) => {
        console.log("Unlink error", err);
    });
};

//Kebutuhan Expenditure
exports.pegawaippk = (req, res, next) => {
    Pegawai.findOne({
        where : {
            nip : req.params.nip
        },
        include : [
            {
                model : TrxUnitKerjaPegawai, 
                where : {
                    kode_unit : req.params.kode_unit,
                },
                include : [
                    {
                        model : Unit
                    }
                ]
            },
        ],
        include : [
            {
                model: TrxJabatanPengadaan, 
                where : {
                    kode_jabatan_pengadaan_detail : "01.01"
                },
                include : [
                    {
                        model : JabatanPengadaanDetail
                    }
                ]
            }
        ]
    })
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
        logger(err)
        if(!err.statusCode ) {
            err.statusCode = 500;
        }
        next (err);
    });
}