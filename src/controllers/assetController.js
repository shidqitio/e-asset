const Asset = require("../models/asset")
const {Op} = require("sequelize")
const {logger} = require("../helpers/log")

exports.index = (req, res, next) => {
    Asset.findAll()
    .then((data) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        });
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
};

//Show By Id 
exports.show = (req, res, next) => {
    Asset.findAll({
        where : {
            kode_asset : req.params.kode_asset
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        });
    })
    .catch((err) => {
        logger(err)
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
};