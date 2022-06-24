const TrxBank = require("../models/trxBank");
const Pegawai = require("../models/pegawai");
const Bank = require("../models/bank")
const {logger} = require("../helper/log");

exports.index = (req, res, next) => {
    TrxBank.findAll({
        include : [
            {
                model : Pegawai, 
                attribute : ["nip", "nama_pegawai"]
            },
            {
                model : Bank, 
                attribute : ["kode_bank", "nama_bank"] 
            },
        ]
    })
    .then((bank) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data",
            data : bank,
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    TrxBank.findOne({
        where : {
            nip : req.body.nip, 
            kode_bank : req.body.kode_bank, 
        }
    })
    .then((bank) => {
        if(bank) {
            const error = new Error ("Data Sudah Ada");
            error.statusCode = 422 ; 
            throw error;
        }
        return TrxBank.create({
            kode_bank : req.body.kode_bank, 
            nip : req.body.nip, 
        });
    })
    .then((create) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : create,
        })
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.show = (req, res, next) => {
    TrxBank.findOne({
        where : {
            kode_bank : req.params.kode_bank, 
            nip : req.params.nip, 
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error ("Data Tidak Ada");
            error.statusCode = 422 ; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        })
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.update = (req,res,next) => {
    const data = {
        no_rekening : req.body.no_rekening
    }
    TrxBank.findOne({
        where : {
            nip : req.params.nip, 
            kode_bank : req.params.kode_bank,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return TrxBank.update(data, {
            where : {
                nip : req.params.nip, 
                kode_bank : req.params.kode_bank
            }
        })
    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
        })
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err); 
    })
}

exports.destroy = (req, res, next) => {
    TrxBank.findOne({
        where : {
            nip : req.params.nip, 
            kode_bank : req.params.kode_bank,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return TrxBank.destroy({
            where : {
                nip : req.params.nip, 
                kode_bank : req.params.kode_bank,
            }
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response
        })
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}