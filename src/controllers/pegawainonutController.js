const PegawaiNonUT = require("../models/pegawaiNonUt");

exports.index = (req, res, next) => {
    PegawaiNonUT.findAll()
    .then((pegawai) => {
        res.json({
            status : "Success", 
            message : "Berhasil Meanampilkan Data", 
            data : pegawai,
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
    PegawaiNonUT.findOne({ where : {nip : req.body.nip}})
    .then((app) => {
        if(app) {
            const error = new Error("Nip Sudah Terpakai");
            error.statusCode = 422; 
            throw error;
        }
        return PegawaiNonUT.create({
            nip : req.body.nip, 
            nama_pegawai : req.body.nama_pegawai, 
            nidn : req.body.nidn, 
            tempat_lahir : req.body.tempat_lahir, 
            tanggal_lahir : req.body.tanggal_lahir, 
            jenis_kelamin : req.body.jenis_kelamin, 
            alamat : req.body.alamat, 
            nomor_telp : req.body.nomor_telp, 
            email : req.body.email, 
            nomor_rekening : req.body.nomor_rekening,
        });
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

exports.show = (req,res,next) => {
    PegawaiNonUT.findOne({where : {nip : req.params.nip}})
    .then((pegawai) => {
        if(!pegawai){
            const error = new Error("Kode Pegawai Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : pegawai,
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        nip : req.params.nip, 
        nama_pegawai : req.body.nama_pegawai, 
        nidn : req.body.nidn, 
        tempat_lahir : req.body.tempat_lahir, 
        tanggal_lahir : req.body.tanggal_lahir, 
        jenis_kelamin : req.body.jenis_kelamin, 
        alamat : req.body.alamat, 
        nomor_telp : req.body.nomor_telp, 
        email : req.body.email, 
        nomor_rekening : req.body.nomor_rekening,
        uch : req.user,
    }
    PegawaiNonUT.findOne({where : {nip : req.params.nip}})
    .then((pegawai) => {
        if(!pegawai) {
            const error = new Error("Kode Jenis Karya Tulis Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return PegawaiNonUT.update(data, {where : {nip : req.params.nip}})
        .then((app) => {
            res.json({
                status : "Success", 
                message : "Berhasil Memperbarui Data", 
                data: data,
            });
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    });
};

exports.destroy = (req, res, next) => {
    PegawaiNonUT.findOne({where : {nip : req.params.nip}})
    .then((app) => {
        if(!app) {
            const error = new Error ("Kode Jenis Karya Tulis Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return PegawaiNonUT.destroy({
            where : {nip: req.params.nip}
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
            err.statusCode = 500;
        }
        next(err);
    });
};