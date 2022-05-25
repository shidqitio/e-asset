
const Jafung = require("../models/jafung");

exports.index = (req, res, next) => {
    Jafung.findAll()
    .then((jafung) => {
        res.json({
            status : "Success", 
            message : " Berhasil Menampilkan Data", 
            data : jafung,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req,res,next) => {
    Jafung.findAll({where : {kode_jafung : req.params.kode_jafung}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
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

exports.store = (req, res, next) => {
    Jafung.findAll({ 
        attributes : ["kode_jafung"],
        where : {kode_jenis_fungsional : req.body.kode_jenis_fungsional},
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length;
        if(data.length === 0){
            let kode_fungsional = req.body.kode_jenis_fungsional;
            kode_hasil = kode_fungsional + "." + "01"
        } 
        else{
        const {kode_jafung} = data[index-1]
        let tes = kode_jafung.split(".");
        let kode_jabatan = tes[1]
        let kode_fungsional = tes[0];
        
        let kode1 = parseInt(kode_jabatan.charAt(0));
        let kode2 = parseInt(kode_jabatan.charAt(1));
        
        if(kode1 > 0) {
            if(kode2 === 9){
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_hasil = kode_fungsional + "." + kode1.toString() + kode2.toString();
            }
        }

        if(kode1 === 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_hasil = kode_fungsional + kode1.toString() + kode2.toString();
            } else {
                 kode_hasil = kode_fungsional + "." + kode1.toString() + String(parseInt(kode2) + 1);
            }
        }
        }
        return Jafung.create({
            kode_jenis_fungsional : req.body.kode_jenis_fungsional, 
            kode_jafung : kode_hasil, 
            nama_jafung : req.body.nama_jafung,
        }); 
    })
    .then((jafung) => {
        res.json({
            status : "Success",
            message : "Berhasil Menyimpan Data", 
            data : jafung
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data ={
        kode_jafung : req.params.kode_jafung, 
        kode_jenis_fungsional : req.body.kode_jenis_fungsional, 
        nama_jafung : req.body.nama_jafung,
    };
    
    Jafung.findAll({where : {kode_jafung:req.params.kode_jafung}})
    .then((app) => {
        if(!app){
            const error = new Error("Kode Jafung Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Jafung.update(data, {where : {kode_jafung : req.params.kode_jafung}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data",
            data: data
        });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    Jafung.findOne({where : {kode_jafung : req.params.kode_jafung}})
    .then((app) => {
        if(!app){
            const error = new Error("Kode Jafung Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Jafung.destroy({
            where: {kode_jafung : req.params.kode_jafung},
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
            err.statusCode = 500
        }
        next(err);
    });
}; 