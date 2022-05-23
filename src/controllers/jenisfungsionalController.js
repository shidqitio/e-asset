const JenisFungsional = require("../models/jenisFungsional");

exports.index = (req, res, next) => {
    JenisFungsional.findAll()
    .then((fungsi) => {
        res.json({
            status : "Success",
            message : "Berhasil Menampilkan Data",
            data : fungsi,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    JenisFungsional.max("kode_jenis_fungsional")
    .then((kode) => {
        let kode_jenis_fungsional = "00";

        if(kode !== null) {
            kode_jenis_fungsional = kode;
        }
        let kode1 = parseInt(kode_jenis_fungsional.charAt(0));
        let kode2 = parseInt(kode_jenis_fungsional.charAt(1));

        if(kode1 > 0) {
            if(kode2 === 9){
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_jenis_fungsional = kode1.toString() + kode2.toString();
            }
            else {
                kode_jenis_fungsional = parseInt(kode_jenis_fungsional) + 1
            }
        }

        if(kode1 == 0) {
            if(kode2 == 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_jenis_fungsional = kode1.toString() + kode2.toString();
            } else {
                kode_jenis_fungsional = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }

        if(kode === null) {
            kode_jenis_fungsional = "00";
        }

        return JenisFungsional.create({
            kode_jenis_fungsional : kode_jenis_fungsional, 
            nama_jenis_fungsional : req.body.nama_jenis_fungsional,
            ucr : req.user,
        });
    })
    .then((jenis_fungsional) => {
        res.json({
            status: "Success", 
            message : "Berhasil Menyimpan Data", 
            data : jenis_fungsional
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
    JenisFungsional.findOne({where : {kode_jenis_fungsional : req.params.kode_jenis_fungsional}})
    .then((fungsi) => {
        if(!fungsi) {
            const error = new Error("Kode Jenis Fungsional Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : fungsi,
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update = (req,res,next) => {
    const data = {
        kode_jenis_fungsional : req.body.kode_jenis_fungsional, 
        nama_jenis_fungsional : req.body.nama_jenis_fungsional, 
        uch : req.user,
    }
    JenisFungsional.findOne({where : {kode_jenis_fungsional : req.params.kode_jenis_fungsional}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Fungsional Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JenisFungsional.update(data, {where : {kode_jenis_fungsional : req.params.kode_jenis_fungsional}})
    })
    .then((up) => {
        res.json({
            status: "Success",
            message : "Berhasil Memperbarui Data",
            data : data,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    JenisFungsional.findOne({ where : {kode_jenis_fungsional : req.params.kode_jenis_fungsional}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Fungsional Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JenisFungsional.destroy({
            where: {
                kode_jenis_fungsional : req.params.kode_jenis_fungsional,
            },
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

