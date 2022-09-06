const DokumenTanah = require("../models/dokumenTanah")

exports.index = (req, res, next) => {
    DokumenTanah.findAll()
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Barang Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}