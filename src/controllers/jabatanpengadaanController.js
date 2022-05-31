const JabatanPengadaan = require("../models/jabatanpengadaan");

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
        let kode_jabatan_pengadaan = "00";

        if(kode !== null){
            kode_jabatan_pengadaan = kode;
        }
        let kode1 = parseInt(kode_jabatan_pengadaan.charAt(0));
        let kode2 = parseInt(kode_jabatan_pengadaan.charAt(1));

        if(kode1 > 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1 ;
                kode2 = 0 ;
                kode_jabatan_pengadaan = kode1.toString() + kode2.toString();
            } else {
                kode_jabatan_pengadaan = parseInt(kode_hukuman) + 1
            }
        }

        if(kode1 === 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_jabatan_pengadaan = kode1.toString() + kode2.toString();
            } else {
                kode_jabatan_pengadaan = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }
        
        if(kode === null) {
            kode_jabatan_pengadaan = "00";
        }

        return JabatanPengadaan.create({
            kode_jabatan_pengadaan : kode_jabatan_pengadaan, 
            nama_jabatan_pengadaan : req.body.kode_jabatan_pengadaan,
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
            const error = new Error("Kode Hukuman Tidak Ada");
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
