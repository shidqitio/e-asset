const db = require("../database");
const TrxUnitKerjaPegawai = require("../models/Trxunitkerjapegawai");
const TrxJabatanFungsional = require("../models/trxJabatanFungsional");
const TrxProgramStudiPegawai = require("../models/trxProgramStudiPegawai");


exports.index = (req,res,next) => {
    TrxUnitKerjaPegawai.findAll({where : {nip:req.params.nip}})
    .then((app) => {
        if(!app) {
            const error = new Error("Nip Tidak Terdaftar"); 
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
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    console.log(req.body)
    TrxUnitKerjaPegawai.findAll({where : {nip: req.body.nip}})
    .then((app) => {
        if(app) {
            const error = new Error("Nip Sudah Terdaftar"); 
            error.statusCode = 422; 
        }
        return db.transaction()
        .then((t) => {
        TrxUnitKerjaPegawai.findOne({where : {nip: req.body.nip}})
        .then((app)=> {
            if(app){
                const error = new Error("Nip Sudah Terdaftar"); 
                error.statusCode = 422; 
                throw error
            }
            return TrxUnitKerjaPegawai.create({
                kode_unit : req.body.kode_unit, 
                nip : req.body.nip, 
                tanggal_mulai : req.body.tanggal_mulai,
            },{transaction : t})
        })
            .then(() => {
                let kode_jafung_pangkat = req.body.kode_jafung_pangkat ; 
                let kode_jafung = kode_jafung_pangkat.substring(5,0)
                let kode_jenis_fungsional = kode_jafung_pangkat.substring(2,0)
                return TrxJabatanFungsional.create({
                    nip : req.body.nip, 
                    kode_jenis_fungsional : kode_jenis_fungsional, 
                    kode_jafung : kode_jafung, 
                    kode_jafung_pangkat : req.body.kode_jafung_pangkat, 
                    kode_sub_kelas : req.body.kode_sub_kelas, 
                    tmt_awal : req.body.tanggal_mulai, 
                    nomor_sk_jafung : req.body.nomor_sk_jafung,
                    ucr : req.user
                }, {transaction : t})
             })
             .then(() => {
                 let fakultas = req.body.kode_fakultas
                 if(fakultas) {
                    TrxProgramStudiPegawai.create({
                        nip : req.body.nip, 
                        kode_fakultas : req.body.kode_fakultas, 
                        kode_program_studi : req.body.kode_program_studi, 
                        kode_jurusan : req.body.kode_jurusan, 
                        kode_pindah : req.body.kode_pindah, 
                        tanggal_mulai : req.body.tanggal_mulai
                    })
                    return t.commit()
                 } else{
                    return t.commit()
                 } 
             }) 
            .then((create) => {
                res.json({
                    status : "Success", 
                    message : "Berhasil Menambah Data", 
                    data : create
                })
            })
            .catch((err) => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                t.rollback();
                return next(err);
            })
        })
    }) 
}

