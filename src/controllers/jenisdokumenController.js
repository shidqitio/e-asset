const JenisDokumen = require("../models/jenisDokumen");

exports.index = (req, res, next) => {
    JenisDokumen.findAll()
    .then((dokumen) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : dokumen
        })
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.show = (req, res, next) => {
    JenisDokumen.findOne({where : {kode_jenis_dokumen : req.params.kode_jenis_dokumen}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Dokumen Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.store = (req, res, next) => {
    JenisDokumen.findOne({where : {kode_jenis_dokumen : req.body.kode_jenis_dokumen}})
    .then((app) => {
        if(app) {
            const error = new Error("Kode Jenis Dokumen Sudah Ada");
            error.statusCode = 422; 
            throw error;
        }
        return JenisDokumen.create({
            kode_jenis_dokumen : req.body.kode_jenis_dokumen, 
            nama_jenis_dokumen : req.body.nama_jenis_dokumen,
        });
    })
    .then((create) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : create,
        })
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
        nama_jenis_dokumen : req.body.nama_jenis_dokumen,
    };

    JenisDokumen.findOne({where : {kode_jenis_dokumen : req.params.kode_jenis_dokumen}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Dokumen Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return JenisDokumen.update(data, {where: {kode_jenis_dokumen : req.params.kode_jenis_dokumen}})
    })
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
        next(err)
    });
};

exports.destroy = (req, res, next) => {
    JenisDokumen.findOne({where : {kode_jenis_dokumen : req.params.kode_jenis_dokumen}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Dokumen Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JenisDokumen.destroy({
            where : {kode_jenis_dokumen : req.params.kode_jenis_dokumen}
        })
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data: response
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

