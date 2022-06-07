const Unit = require("../models/unit");

exports.index = (req, res, next) => {
    Unit.findAll()
    .then((unit) => {
        res.json({
            status : "Success",
            message : "Berhasil Menampilkan Data",
            data : unit,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    Unit.findOne({where : {kode_unit : req.body.kode_unit}})
    .then((app) => {
        if(app) {
            const error = new Error("Kode Unit Sudah Ada");
            error.statusCode = 422; 
            throw error;
        }
       
        return Unit.create({
            kode_unit : req.body.kode_unit, 
            nama_unit : req.body.nama_unit, 
            induk_unit : req.body.induk_unit, 
            ucr : req.user,
        });
    })
    .then((unit) => {
        res.json({
            status : "Success", 
            message : "Berhasil menyimpan Data", 
            data : unit, 
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
    Unit.findOne({where : {kode_unit : req.params.kode_unit}})
    .then((app) => {
        if(!app) {
            const error = new Error ("Kode Hukuman Tidak Ada");
            error.statusCode = 422 ; 
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

exports.update = (req, res, next) => {
    let data = {
        kode_unit : req.params.kode_unit, 
        revisi_ke : req.body.revisi_ke,
        nama_unit : req.body.nama_unit, 
        induk_unit : req.body.induk_unit, 
        status_aktif_unit : req.body.status_aktif_unit,
        uch : req.user
    }
    
    Unit.findOne({ where : {kode_unit : req.params.kode_unit}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return Unit.update(data, {where : {kode_unit : req.params.kode_unit}})
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

exports.destroy = (req, res, next) => {
    Unit.findOne({where : {kode_unit : req.params.kode_unit}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Hukuman Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Unit.destroy({
            where : {kode_unit : req.params.kode_unit}
        });
    })
    .then((response) => {
        res.json({
            status: "Success", 
            message : "Berhasil Menghapus Data", 
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