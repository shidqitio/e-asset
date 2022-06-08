const JabatanPengadaan = require("../models/jabatanpengadaan");
const JabatanPengadaanDetail = require("../models/jabatanpengadaandetail")

exports.index = (req, res, next) => {
    JabatanPengadaan.findAll({
        include : [
            {
                model : JabatanPengadaanDetail, 
                attributes : ["kode_jabatan_pengadaan", "kode_jabatan_pengadaan_detail", "nama_jabatan_pengadaan_detail"]
            }
        ]
    })
    .then((jabatan) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : jabatan
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
    JabatanPengadaanDetail.findOne({where : {kode_jabatan_pengadaan_detail : req.params.id}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jabatan Pengadaan Detail Tidak Ada");
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
    })
} 

exports.store = (req, res, next) => {
    JabatanPengadaanDetail.findAll({
        attributes : ["kode_jabatan_pengadaan_detail"],
        where : {kode_jabatan_pengadaan_detail : req.body.kode_jabatan_pengadaan_detail}
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length;
        if(data.length === 0) {
            let kode_jabatan_pengadaan = req.body.kode_jabatan_pengadaan;
            kode_hasil = kode_jabatan_pengadaan + "." + "01"
        }
        else {
            const {kode_jabatan_pengadaan_detail} = data[index-1]
            let tes = kode_jabatan_pengadaan_detail.split(".");
            let kode_jabatan = tes[1];
            let JabatanPengadaan = req.body.kode_jabatan_pengadaan

            let kode1 = parseInt(kode_jabatan.charAt(0));
            let kode2 = parseInt(kode_jabatan.charAt(1));
            
            if(kode1 > 0) {
                if(kode2 === 9){
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = JabatanPengadaan + "." + kode1.toString() + kode2.toString();
                }
            }
    
            if(kode1 === 0) {
                if(kode2 === 9) {
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = JabatanPengadaan + kode1.toString() + kode2.toString();
                } else {
                     kode_hasil = JabatanPengadaan + "." + kode1.toString() + String(parseInt(kode2) + 1);
                }
            }
        }
        return JabatanPengadaanDetail.create({
            kode_jabatan_pengadaan : req.body.kode_jabatan_pengadaan, 
            kode_jabatan_pengadaan_detail : kode_hasil, 
            nama_jabatan_pengadaan_detail : req.body.nama_jabatan_pengadaan_detail,
            ucr : req.user,
        })
    })
    .then((jabatan_detail) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : jabatan_detail,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_jabatan_pengadaan : req.body.kode_jabatan_pengadaan, 
        nama_jabatan_pengadaan_detail : req.body.nama_jabatan_pengadaan_detail,
    };

    JabatanPengadaanDetail.findAll({where : {kode_jabatan_pengadaan_detail: req.params.id}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JabatanPengadaanDetail.update(data, {where : {kode_jabatan_pengadaan_detail : req.params.id}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data",
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
}

exports.destroy = (req, res, next) => {
    JabatanPengadaanDetail.findOne({where : {kode_jabatan_pengadaan_detail : req.params.id}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jabatan Pengadaan Detail Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return JabatanPengadaanDetail.destroy({
            where : {kode_jabatan_pengadaan_detail : req.params.id},
        });
    })
    then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};