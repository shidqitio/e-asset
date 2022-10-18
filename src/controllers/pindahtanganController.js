const PindahTangan = require("../models/pindahTangan")

exports.index = (req, res, next) => {
    PindahTangan.findAll()
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
}