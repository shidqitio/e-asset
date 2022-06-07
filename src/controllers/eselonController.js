const Eselon = require('../models/eselon')
const {generateKode1} = require("../helper/generatekode1")

exports.index = (req, res, next) => {
    Eselon.findAll()
    .then((eselon) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : eselon,
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
    Eselon.max("kode_eselon")
    .then((kode) => {
        const kode_hasil = generateKode1(kode)

          return Eselon.create({
              kode_eselon : kode_hasil, 
              nama_eselon : req.body.nama_eselon,
              ucr : req.user
          });
     
    })
    .then((eselon) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : eselon,
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
    Eselon.findOne({where : {kode_eselon : req.params.kode_eselon}})
    .then((eselon) => {
        if(!eselon) {
            const error = new Error("Kode Eselon tidak ada.");
            error.statusCode = 422;
            throw error; 
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : eselon,
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err); 
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_eselon : req.params.kode_eselon, 
        nama_eselon : req.body.nama_eselon, 
        uch : req.user
    };
    Eselon.findOne({where : {kode_eselon : req.params.kode_eselon}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Eselon tidak ada.");
            error.statusCode = 422;
            throw error;
        }
        return Eselon.update(data, {where : {kode_eselon : req.params.kode_eselon}})
    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data,
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
};

exports.destroy = (req, res, next) => {
    Eselon.findOne({where : {kode_eselon : req.params.kode_eselon}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Fakultas tidak ada.");
            error.statusCode = 422;
            throw error;
        }
        return Eselon.destroy({
            where : {kode_eselon : req.params.kode_eselon}
        })
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response,
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};