const Bank = require("../models/bank");

exports.index = (req, res, next) => {
    Bank.findAll()
    .then((bank) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : bank,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.store = (req, res, next) => {
    Bank.findOne({where : {kode_bank : req.body.kode_bank}})
    .then((kode) => {
        if(kode){
            const error = new Error("Kode Bank Sudah Ada");
            error.statusCode = 422 ;
            throw error;
        }
        return Bank.create({
            kode_bank : req.body.kode_bank, 
            nama_bank : req.body.nama_bank, 
        });
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
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

exports.show = (req, res, next) => {
    Bank.findOne({where : {kode_bank : req.params.kode_bank}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Bank Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status: "Success", 
            message : "Berhasil Menampilkan Data ", 
            data: app,
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
    let data = {
        kode_bank : req.params.kode_bank, 
        nama_bank : req.body.nama_bank, 
    }

    Bank.findOne({where:{kode_bank : req.params.kode_bank}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Bank Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
    })
        return Bank.update(data,{where : {kode_bank : req.params.kode_bank}})
        .then(() => {
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
    Bank.findOne({where : {kode_bank : req.params.kode_bank}})
    .then((app) => {
        if(!app){
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Bank.destroy({
            where : {kode_bank : req.params.kode_bank}
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil",
            data : response,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};