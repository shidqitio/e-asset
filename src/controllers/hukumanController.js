const Hukuman = require("../models/hukuman");

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
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    Hukuman.max("kode_hukuman")
    .then((kode) => {
        let kode_hukuman = "00";

        if(kode !== null) {
            kode_hukuman = kode;
        }

        let kode1 = parseInt(kode_hukuman.charAt(0));
        let kode2 = parseInt(kode_hukuman.charAt(1));

        if(kode > 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1 ;
                kode2 = 0 ;
                kode_hukuman = kode1.toString() + kode2.toString();
            } else {
                kode_hukuman = parseInt(kode_hukuman) + 1
            }
        }

        if(kode1 === 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_hukuman = kode1.toString() + kode2.toString();
            } else {
                kode_hukuman = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }

        if(kode === null) {
            kode_hukuman = "00";
        }

        return Hukuman.create({
            kode_hukuman : kode_hukuman, 
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
    then((hukum) => {
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
    }).catch((err) => {
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
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};