const TrxKartu = require("../models/trxKartu"); 
const Pegawai = require("../models/pegawai");
const Kartu = require("../models/kartu")

exports.index = (req, res, next) => {
    TrxKartu.findAll({
        include : [
            {
                model : Pegawai, 
                attributes : ["nip", "nama_pegawai"]
            }, 
            {
                model : Kartu, 
                attributes : ["kode_kartu", "nama_kartu"]
            }
        ]
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.show = (req, res,next) => {
    TrxKartu.findOne({
        where : {
            nip : req.params.nip, 
            kode_kartu : req.params.kode_kartu
        },
        include : [
            {
                model : Pegawai, 
                attributes : ["nip", "nama_pegawai"]
            }, 
            {
                model : Kartu, 
                attributes : ["kode_kartu", "nama_kartu"]
            }
        ]
    })
    .then((app) => {
        if(!app) {
            const error = new Error ("Nip Sudah Ada");
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.store = (req, res, next) => {
    const request = req.body;
    const data = request.kartu.map((item) => {
    return {
            nip : item.nip, 
            kode_kartu : item.kode_kartu, 
            nomor_kartu : item.nomor_kartu,
        }
    })
    TrxKartu.findOne({
        where : data
    })
    .then((app) => {
        if(app) {
            const error = new Error ("Nip Sudah Ada");
            error.statusCode = 422; 
            throw error
        }
        const request = req.body;
        const data = request.kartu.map((item) => {
            return {
                nip : item.nip, 
                kode_kartu : item.kode_kartu, 
                nomor_kartu : item.nomor_kartu,
            }
        })
        return TrxKartu.bulkCreate(data);
    })
    .then((create) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : create,
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
        nomor_kartu : req.body.nomor_kartu,
    }
    TrxKartu.findOne({
        where : {
            nip : req.params.nip, 
            kode_kartu : req.params.kode_kartu
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Nip / Kode_Kartu Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return TrxKartu.update(data, {where : {
            nip : req.params.nip, 
            kode_kartu : req.params.kode_kartu,
        }})
    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data,
        })
    })
    .catch((err) => {
        if(!err.statuCode){
            err.statuCode = 500;
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    TrxKartu.findOne({
        where : {
            nip : req.params.nip, 
            kode_kartu : req.params.kode_kartu,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statuCode = 422; 
            throw error
        }
        return TrxKartu.destroy({
            where : {
                nip : req.params.nip, 
                kode_kartu : req.params.kode_kartu,
            }
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
        if(!err.statuCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}