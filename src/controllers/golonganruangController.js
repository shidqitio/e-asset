const Golongan_Ruang = require("../models/golonganRuang");

exports.index = (req, res, next) => {
    Golongan_Ruang.findAll()
    .then((gol_ruang) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : gol_ruang,
        });
    })
    .catch((err) => {
        if(err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
};

exports.store = (req,res,next) => {
    Golongan_Ruang.findOne({where : {kode_golongan_ruang : req.body.kode_golongan_ruang}})
    .then((gol_ruang) => {
        if(gol_ruang){
            const error = new Error("Kode Golongan Ruang Sudah Terpakai");
            error.statusCode = 422;
            throw error;
        }
        return Golongan_Ruang.create({
            kode_golongan_ruang : req.body.kode_golongan_ruang, 
            keterangan_pangkat : req.body.keterangan_pangkat,
            ucr : req.user
        });
    })
    .then((create_golongan) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menambah Data",
            data : create_golongan,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500 ;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    Golongan_Ruang.findOne({where : {kode_golongan_ruang : req.body.kode_golongan_ruang}})
    .then((app) => {
        if(!app) {
            const error = new Error("kode Golongan Ruang Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data",
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update = (req,res,next) => {
    let data = {
        keterangan_pangkat : req.body.keterangan_pangkat, 
        uch : req.user,
    };

    Golongan_Ruang.findOne({where : {kode_golongan_ruang : req.body.kode_golongan_ruang}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Golongan Ruang Tidak Ada");
            error.statusCode = 422; 
            throw err; 
        }
        return Golongan_Ruang.update(data, {where: {kode_golongan_ruang : req.body.kode_golongan_ruang}})      
    })
    .then(() => {
        res.json({
            status : "Success",
            message : "Berhasil Memperbarui Data", 
            data : data,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.destroy = async(req, res, next) => {
    Golongan_Ruang.findOne({where : {kode_golongan_ruang : req.body.kode_golongan_ruang}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Golongan Ruang Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return Golongan_Ruang.destroy({
            where : {
                kode_golongan_ruang : req.body.kode_golongan_ruang
            },
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
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
};