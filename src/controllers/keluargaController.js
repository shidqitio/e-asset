const Keluarga = require("../models/keluarga");

exports.index = (req, res, next) => {
    Keluarga.findAll()
    .then((keluarga) => {
        res.json({
            status: "Success", 
            message : "Berhasil Menampilkan Data", 
            data : keluarga
        });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    Keluarga.findAll({where : {kode_keluarga : req.params.kode_keluarga}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Keluarga Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data: app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
};

exports.store = (req,res,next) => {
    Keluarga.max("kode_keluarga")
    .then((kode) => {
        let kode_keluarga = "00";

        if(kode !== null) {
            kode_keluarga = kode;
        }

        let kode1 = parseInt(kode_keluarga.charAt(0));
        let kode2 = parseInt(kode_keluarga.charAt(1));

        if (kode1 > 0) {
            if (kode2 === 9) {
              kode1 = parseInt(kode1) + 1;
              kode2 = 0;
              kode_keluarga = kode1.toString() + kode2.toString();
            } else {
              kode_keluarga = parseInt(kode_agama) + 1;
            }
          }
    
          if (kode1 === 0) {
            if (kode2 === 9) {
              kode1 = parseInt(kode1) + 1;
              kode2 = 0;
              kode_keluarga = kode1.toString() + kode2.toString();
            } else {
              kode_keluarga = kode1.toString() + String(parseInt(kode2) + 1);
            }
          }

          if(kode === null) {
              kode_keluarga = "00";
          }

          return Keluarga.create({
              kode_keluarga : kode_keluarga, 
              nama_keluarga : req.body.nama_keluarga, 
          });
    })
    .then((keluarga) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : keluarga,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500 ;
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_keluarga : req.params.kode_keluarga, 
        nama_keluarga : req.body.nama_keluarga, 
    };

    Keluarga.findOne({where : {kode_keluarga: req.params.kode_keluarga}})
    .then((ex) => {
        if(!ex) {
            const error = new Error("Kode Keluarga Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return Keluarga.update(data, {where : {kode_keluarga : req.params.kode_keluarga}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    Keluarga.findOne({where : {kode_keluarga : req.params.kode_keluarga}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Keluarga Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Keluarga.destroy({
            where : {kode_keluarga : req.params.kode_keluarga},
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

