const KegiatanJafung = require("../models/kegiatanJafung");
const KegiatanSub1Jafung = require("../models/kegiatanSub1Jafung");
const UnsurUtama = require("../models/unsurUtama")

exports.index = (req, res, next) => {
    UnsurUtama.findAll({
        include: [
            {
                model : KegiatanJafung, 
                attributes : ["kode_kegiatan", "nama_kegiatan"],
                include : [
                    {
                        model : KegiatanSub1Jafung, 
                        attributes : ["kode_kegiatan_sub1", "nama_kegiatan_sub1"]
                    }
                ]
            },
        ],
    })
    .then((data) => {
        res.json({
            status : "Success", 
            message: "Berhasil Menampilkan Data", 
            data : data,
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
    KegiatanJafung.findAll({
        attributes : ["kode_kegiatan"],
        where : {kode_unsur_utama : req.body.kode_unsur_utama},
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length;
        if(data.length === 0) {
            let kode_unsur_utama = req.body.kode_unsur_utama;
            kode_hasil = kode_unsur_utama + "." + "01";
        }
        else {
            const {kode_kegiatan} = data[index-1];
            let tes = kode_kegiatan.split(".");
            let kode_keg = tes[2];
            let kode_awal = req.body.kode_unsur_utama;

            let kode1 = parseInt(kode_keg.charAt(0));
            let kode2 = parseInt(kode_keg.charAt(1));

            if(kode1 > 0) {
                if(kode2 === 9) {
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = kode_awal + "." + kode1.toString() + kode2.toString();
                }else {
                    kode_hasil = kode_awal + "." + kode1.toString() + kode2.toString();
                }
            }

            if(kode1 === 0){
                if(kode2 === 9){
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = kode_awal + "." + kode1.toString() + kode2.toString();
                }
                else {
                    kode_hasil = kode_awal + "." + kode1.toString() + String(parseInt(kode2) + 1);
                }
                }
            }
            return KegiatanJafung.create({
                kode_unsur_utama : req.body.kode_unsur_utama,
                nama_kegiatan: req.body.nama_kegiatan_kegiatan, 
                ucr : req.user,
            })
    })
    .then((insert) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data",
            data : insert,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update= (req, res, next) => {
    const data = {
        kode_unsur_utama : req.body.kode_unsur_utama, 
        kode_kegiatan : req.params.kode_kegiatan, 
        nama_kegiatan : req.body.nama_kegiatan,
        uch : req.user,
    };

    KegiatanJafung.findOne({where : {kode_kegiatan : req.params.kode_kegiatan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return KegiatanJafung.update(data, {where : {kode_kegiatan : req.params.kode_kegiatan}})
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
        next(err)
    });
};

exports.show = (req, res, next) => {
    KegiatanJafung.findAll({where : {kode_kegiatan : req.params.kode_kegiatan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Kegiatan Jafung Tidak Ada");
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

exports.destroy = (req, res, next) => {
    KegiatanJafung.findOne({where : {kode_kegiatan : req.params.kode_kegiatan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return KegiatanJafung.destroy({
            where : {kode_kegiatan : req.params.kode_kegiatan},
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response,
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}