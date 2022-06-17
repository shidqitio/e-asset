const Kartu = require("../models/kartu");
const {generateKode} = require("../helper/generatekode2"); 

exports.index = (req, res, next) => {
    Kartu.findAll()
    .then((kartu) => {
        res.json({
            status : "Success",
            message : "Berhasil Menampilkan Data", 
            data : kartu
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req,res,next) => {
    Kartu.max("kode_kartu")
    .then((kode) => {
        const kode_hasil = generateKode(kode);

        return Kartu.create({
            kode_kartu : kode_hasil, 
            nama_kartu : req.body.nama_kartu,
        });
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data",
            data : app
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
        nama_kartu : req.body.nama_kartu
    };

    Kartu.findOne({where : {kode_kartu : req.params.kode_kartu}})
    .then((kartu) => {
        if(!kartu) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return Kartu.update(data, {where : {kode_kartu : req.params.kode_kartu}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
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
    Kartu.findOne({where : {kode_kartu : req.params.kode_kartu}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Kartu.destroy({
            where : {kode_kartu : req.params.kode_kartu}
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
    })
}