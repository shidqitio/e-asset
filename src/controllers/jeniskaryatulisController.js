const JenisKaryaTulis = require('../models/jenisKaryaTulisan');

exports.index = (req, res, next) => {
    JenisKaryaTulis.findAll()
    .then((kartul) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : kartul,
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
    JenisKaryaTulis.max("kode_jenis_karya_tulis")
    .then((kode) => {
        let kode_jenis_karya_tulis = "00";

        if(kode !== null) {
            kode_jenis_karya_tulis = kode;
        }

        let kode1 = parseInt(kode_jenis_karya_tulis.charAt(0));
        let kode2 = parseInt(kode_jenis_karya_tulis.charAt(1));

        if(kode1 > 0) {
            if(kode2 == 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0 ;
                kode_jenis_karya_tulis = kode1.toString() + kode2.toString();
            }
        }

        if(kode1 === 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_jenis_karya_tulis = kode1.toString() + kode2.toString();
            }
            else{
                kode_jenis_karya_tulis = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }

        if(kode === null) {
            kode_jenis_karya_tulis = "00";
        }

        return JenisKaryaTulis.create({
            kode_jenis_karya_tulis : kode_jenis_karya_tulis, 
            nama_jenis_karya_tulis : req.body.kode_jenis_karya_tulis, 
            ucr : req.user,
        });
    })
    .then((kartul) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : kartul,
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
    JenisKaryaTulis.findOne({where : {kode_jenis_karya_tulis : req.params.kode_jenis_karya_tulis}})
    .then((kartul) => {
        if(!kartul){
            const error = new Error("Kode Jenis Karya Tulis Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : kartul,
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    });
}; 