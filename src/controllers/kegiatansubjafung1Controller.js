const KegiatanSub1Jafung = require("../models/kegiatanSub1Jafung");
const KegiatanJafung = require("../models/kegiatanJafung");

exports.index = (req, res, next) => {
    KegiatanJafung.findAll({
        include : [
            {
                model : KegiatanSub1Jafung, 
                attributes : ["kode_kegiatan_sub1", "nama_kegiatan_sub1"],
            },
        ],
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
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.store = (req, res, next) => {
    KegiatanSub1Jafung.findAll({
        attributes : ["kode_kegiatan_sub1"],
        where : {kode_kegiatan : req.body.kode_kegiatan},
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length;
        if(data.length === 0) {
            let kode_kegiatan = req.body.kode_kegiatan;
            kode_hasil = kode_kegiatan + "." + "01";
        }
        else {
            const {kode_kegiatan_sub1} = data[index - 1];
            let tes = kode_kegiatan_sub1.split(".");
            let kode_keg = tes[3];
            let kode_awal = req.body.kode_kegiatan;

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
        return KegiatanSub1Jafung.create({
            kode_kegiatan : req.body.kode_kegiatan, 
            kode_kegiatan_sub1 : kode_hasil, 
            nama_kegiatan_sub1 : req.body.nama_kegiatan_sub1, 
            ucr : req.user,
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
    })
}

exports.show = (req, res, next) => {
    KegiatanSub1Jafung.findOne({where : {kode_kegiatan_sub1 : req.params.kode_kegiatan_sub1}})
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

exports.update = (req, res, next) => {
    const data = {
        kode_kegiatan : req.body.kode_kegiatan, 
        nama_kegiatan_sub1 : req.body.nama_kegiatan_sub1,
        uch : req.user,
    };

    KegiatanSub1Jafung.findOne({where : {kode_kegiatan_sub1 : req.params.kode_kegiatan_sub1}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return KegiatanSub1Jafung.update(data, {where : {kode_kegiatan_sub1 : req.params.kode_kegiatan_sub1}})
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

exports.destroy = (req, res, next) => {
    KegiatanSub1Jafung.findOne({where : {kode_kegiatan_sub1 : req.params.kode_kegiatan_sub1}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return KegiatanSub1Jafung.destroy({
            where: {kode_kegiatan_sub1:req.params.kode_kegiatan_sub1}
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}