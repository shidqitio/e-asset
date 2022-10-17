const RefIhtisarJabatanAnjab = require("../models/refIhtisarJabatanAnjab")

exports.index = (req, res, next) => {
    RefIhtisarJabatanAnjab.findAll()
    .then((data) => {
        if(data.length === 0 ) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Tampil",
            data : data
        });
    })
    .catch((err) => { 
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.store = (req, res, next) => {}

