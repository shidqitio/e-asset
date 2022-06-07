const JabatanPengadaan = require("../models/jabatanpengadaan");
const {generateKode} = require("../helper/generatekode2")

exports.index = (req, res, next) => {
    JabatanPengadaan.findAll()
    .then((pengadaan) => {
        res.json({
            status : "Success", 
            message: "Berhasil Menampilkan Data", 
            data : pengadaan,
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
    JabatanPengadaan.findOne({where: {kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan}})
    .then((app) => {
        if(!app) {
            const error = new Error ("Kode Jabatan Pengadaan Tidak Ada");
            error.statusCode = 422 ; 
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
};

exports.store = (req, res, next) => {
    JabatanPengadaan.max("kode_jabatan_pengadaan")
    .then((kode)=> {
        let kode_hasil = generateKode(kode)

        return JabatanPengadaan.create({
            kode_jabatan_pengadaan : kode_hasil, 
            nama_jabatan_pengadaan : req.body.nama_jabatan_pengadaan,
            ucr : req.user,
        });
    })
    .then ((app) => {
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
    })
}

exports.update = (req, res, next) => {
    const data = {
        kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan, 
        nama_jabatan_pengadaan : req.body.nama_jabatan_pengadaan,
        uch : req.user
    }
    JabatanPengadaan.findOne({where : {kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jabatan Pengadaan Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return JabatanPengadaan.update(data,{where : {kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan}})
    })
        .then(()=> {
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

exports.destroy = (req,res,next) => {
    JabatanPengadaan.findOne({where : {kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jabatan pengadaan Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JabatanPengadaan.destroy({
            where : {kode_jabatan_pengadaan : req.params.kode_jabatan_pengadaan}
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
