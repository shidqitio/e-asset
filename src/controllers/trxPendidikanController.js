const TrxPendidikan = require("../models/trxPendidikan");
const TingkatPendidikan = require("../models/tingkatPendidikan")

exports.index = (req, res, next) => {
    TrxPendidikan.findAll({
        include : [
            {
                model : TingkatPendidikan,
                attributes : ["kode_tingkat_pendidikan", "nama_tingkat_pendidikan"]
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

exports.show = (req, res, next) => {
    TrxPendidikan.findOne({
        where : {
            nip : req.params.nip, 
            kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Nip Tidak Ada"); 
            error.statusCode = 422; 
            throw error
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

exports.store = (req,res,next) => {
    TrxPendidikan.findOne({
        where : {
            nip : req.body.nip, 
            kode_tingkat_pendidikan :req.body.kode_tingkat_pendidikan
        }
    })
    .then((app) => {
        if(app) {
            const error = new Error("Nip / Tingkat Pendidikan Sudah Terdaftar"); 
            error.statusCode = 422; 
            throw error
        }
        return TrxPendidikan.create({
            nip : req.body.nip, 
            kode_tingkat_pendidikan : req.body.kode_tingkat_pendidikan, 
            nama_sekolah : req.body.nama_sekolah, 
            jurusan : req.body.jurusan, 
            tahun_lulus : req.body.tahun_lulus, 
            lokasi_sekolah : req.body.lokasi_sekolah, 
            nama_pimpinan_sekolah : req.body.nama_pimpinan_sekolah, 
            nomor_ijazah : req.body.nomor_ijazah, 
            judul_skripsi : req.body.judul_skripsi, 
            ucr : req.user,
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
    })
}

exports.update = (req, res, next) => {
    const data = {
        nip : req.body.nip, 
            kode_tingkat_pendidikan : req.body.kode_tingkat_pendidikan, 
            nama_sekolah : req.body.nama_sekolah, 
            jurusan : req.body.jurusan, 
            tahun_lulus : req.body.tahun_lulus, 
            lokasi_sekolah : req.body.lokasi_sekolah, 
            nama_pimpinan_sekolah : req.body.nama_pimpinan_sekolah, 
            nomor_ijazah : req.body.nomor_ijazah, 
            judul_skripsi : req.body.judul_skripsi, 
            uch : req.user,
    }
    TrxPendidikan.findOne({
        where : {
            nip : req.params.nip, 
            kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return TrxPendidikan.update(data, {where : {
            nip : req.params.nip, 
            kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan,
        }})
    })
    .then(() => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statuCode){
            err.statuCode = 500;
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    TrxPendidikan.findOne({
        where : {
            nip : req.params.nip, 
            kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan,
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Program Studi Tidak Ada");
            error.statuCode = 422; 
            throw error
        }
        return TrxPendidikan.destroy({
            where : {
                nip : req.params.nip, 
                kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan,    
            }
        })
    })
    .then((response) => {
        res.json({
            status : "Successs", 
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