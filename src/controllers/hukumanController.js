const Hukuman = require("../models/hukuman");
const {generateKode} = require("../helper/generatekode2")
const {logger} = require("../helper/log");

exports.index = (req, res, next) => {
    Hukuman.findAll()
    .then((hukum) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : hukum,
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

exports.store = (req, res, next) => {
    Hukuman.max("kode_hukuman")
    .then((kode) => {
        const kode_hasil = generateKode(kode);

        return Hukuman.create({
            kode_hukuman : kode_hasil, 
            nama_hukuman : req.body.nama_hukuman, 
            ucr : "Indrawan",
        })
    })
    .then((hukum) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : hukum,
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

exports.show = (req, res, next) => {
    Hukuman.findOne({where : {kode_hukuman : req.params.kode_hukuman}})
    .then((hukum) => {
        if(!hukum) {
            const error = new Error ("Kode Hukuman Tidak Ada");
            error.statusCode = 422 ; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : hukum
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_hukuman : req.params.kode_hukuman, 
        nama_hukuman : req.body.nama_hukuman, 
        uch : "Indrawan"
    };

    Hukuman.findOne({ where : {kode_hukuman : req.params.kode_hukuman}})
    .then((hukum) => {
        if(!hukum) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return Hukuman.update(data, {where : {kode_hukuman : req.params.kode_hukuman}})
        })
        .then((up) => {
            res.json({
                status : "Success", 
                message : "Berhasil Memperbarui Data", 
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
};

exports.destroy = (req, res, next) => {
    Hukuman.findOne({where : {kode_hukuman : req.params.kode_hukuman}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Hukuman.destroy({
            where: {kode_hukuman : req.params.kode_hukuman}
        });
    })
    .then((response) => {
        res.json({
            status: "success",
            message: "Berhasil menghapus data",
            data: response,    
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