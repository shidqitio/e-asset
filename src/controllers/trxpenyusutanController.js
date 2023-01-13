const TrxPenyusutan = require("../models/trxPenyusutan")
const DaftarBarang = require("../models/daftarBarang")
const sequelize = require("sequelize")
const {Op} = require('sequelize')

exports.index = (req, res, next) => {
    return DaftarBarang.findAll({
        include : [
            {
                model : TrxPenyusutan,
                as : "trxpenyusutan",
                required : true,
                on : {
                    kode_pembukuan : sequelize.where(sequelize.col("daftarbarang.kode_pembukuan"),"=", sequelize.col("trxpenyusutan.kode_pembukuan")),
                    kode_barang : sequelize.where(sequelize.col("daftarbarang.kode_barang"),"=", sequelize.col("trxpenyusutan.kode_barang")),
                }
            }
        ],
        
    })
    .then((susut) => {
        if(susut.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data :susut
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}