const RkbmutPenghapusan = require("../models/rkbmutPenghapusan")
const Aset = require("../models/asset")
const TrxRkbmutAll = require("../models/trxRkbmutAll")
const {Op} = require("sequelize")
const path = require("path")
const fs = require("fs")

//Data RKBMUT UNIT
exports.indexunit = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja 
        }, 
        include : [
            {
                model : Aset
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Data RKBMUT PPK 
exports.indexppk = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            [Op.or] : [
                {status_paraf : 0},
                {status_paraf : 1}, 
                {status_paraf : 2}
            ]
        }, 
        include : [
            {
                model : Aset
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : data
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Data RKBMUT APIP
exports.indexapip = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            status_paraf : 2
        }, 
        include : [
            {
                model : Aset
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Insert RKBMUT Penghapusan
exports.store = (req, res, next) => {
    //Pemisah Unit dan Nama Unit 
    let unit = req.body.unit
    const split_unit = unit.split("||")
    let kode_unit = split_unit[0]
    let nama_unit = split_unit[1]
    const tahun = req.body.tahun
    
    return RkbmutPenghapusan.findAll({
        where : {
            tahun : tahun, 
            kode_unit_kerja : kode_unit, 
            nup : req.body.nup, 
            revisi_ke : 0, 
            status_revisi : 0, 
        }
    })
    .then((data) => {
        if(data.length !== 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        if(req.file){
            const filename = path.parse(req.file.filename).base
            return RkbmutPenghapusan.create({
                tahun : tahun, 
                kode_unit_kerja : kode_unit, 
                nup : req.body.nup, 
                kode_asset : req.body.kode_asset, 
                revisi_ke : 0, 
                status_revisi : 0, 
                status_paraf : 0, 
                nama_unit_kerja : nama_unit, 
                merk : req.body.merk, 
                kondisi : req.body.kondisi, 
                tahun_perolehan : req.body.tahun_perolehan, 
                nilai_perolehan : req.body.nilai_perolehan,
                alasan : req.body.alasan, 
                foto : "https://dev-sippp.ut.ac.id:2323/public/foto_barang_rusak/" + filename
            });
        }
        else {
            return RkbmutPenghapusan.create({
                tahun : tahun, 
                kode_unit_kerja : kode_unit, 
                nup : req.body.nup, 
                kode_asset : req.body.kode_asset, 
                revisi_ke : 0, 
                status_revisi : 0, 
                status_paraf : 0, 
                nama_unit_kerja : nama_unit, 
                merk : req.body.merk, 
                kondisi : req.body.kondisi, 
                tahun_perolehan : req.body.tahun_perolehan, 
                nilai_perolehan : req.body.nilai_perolehan,
                alasan : req.body.alasan, 
              });
        }
    })
    .then((result) => {
        if(!result) {
            const error = new Error("Insert Data Gagal")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Membuat Data", 
            data : result
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

//Komentar PPK 
exports.perbaikanppk = (req, res, next) => {
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        status_paraf : 1, 
        status_revisi : 0
    }

    return RkbmutPenghapusan.findAll({
        where : param, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPenghapusan.update({
            komentar : req.body.komentar
        }, {
            where : param
        })
    })
    .then((komentar) => {
        if(!komentar) {
            const error = new Error("Komentar Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menambah Komentar", 
            data : komentar
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//PPK Setuju dengan Unit 
exports.setujuppk = (req, res, next) => {
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        status_paraf : 1, 
        status_revisi : 0
    }

    let upd = {
        status_paraf : 1, 
        status_revisi : 1
    }

    return RkbmutPenghapusan.findAll({
        where : param, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada ")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPenghapusan.update(upd, {
            where : param
        })
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Gagal Update Header")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Mengajukan Siap Paraf", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Ajukan PPK RKBMUT PENGHAPUSAN
exports.ajukanppk = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            status_revisi : 0, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_paraf : 0
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Tidak Ada Data Paraf")
            error.statusCode = 422 
            throw error
        }
        const upd = {
            status_paraf : 1
        }
        return RkbmutPenghapusan.update(upd, {
            where : {kode_unit_kerja : req.params.kode_unit_kerja}
        });
    })
    .then((respon) => {
        if(!respon) {
            const error = new Error("Gagal Update Data")
            error.statusCode = 422
            throw error;
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Diajukan Ke PPK",
            data : respon
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Komentar PPK 
exports.perbaikanppk = (req, res, next) => {
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        status_paraf : 1, 
        status_revisi : 0
    }

    let upd = {
        komentar : req.body.komentar, 
        status_paraf : 0, 
        status_revisi : 1
    }

    return RkbmutPenghapusan.findAll({
        where : param, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0 ) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPenghapusan.update(upd, {
            where : param
        })
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Gagal Update Header")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Menambah Komentar", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
} 

//PPK SETUJU DENGAN UNIT
exports.setujuppk = (req, res, next) => {
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        status_paraf : 1, 
        status_revisi : 0
    }
    
    let upd = {
        status_paraf : 1, 
        status_revisi : 1
    }
    
    return RkbmutPenghapusan.findAll({
        where : param, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada ")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPenghapusan.update(upd, {
            where : param
        })
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Gagal Update Header")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Mengajukan Siap Paraf", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Perbaikan Unit
exports.perbaikanunit = (req, res, next) =>{
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        status_paraf : 0, 
        status_revisi : 1
    }

    return RkbmutPenghapusan.findAll({
        where : param
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        let index = data.length; 
        const {revisi_ke} = data[index-1]
        let revisi = revisi_ke + 1
        return RkbmutPenghapusan.update({
            merk : req.body.merk, 
            tahun_perolehan : req.body.tahun_perolehan, 
            kondisi : req.body.kondisi, 
            nilai_perolehan : req.body.nilai_perolehan, 
            alasan : req.body.alasan, 
            status_revisi : 0, 
            status_paraf : 1, 
            revisi_ke : revisi
        }, {
        where : param
        })
    })
    .then((up) => {
        if(!up) {
            const error = new Error("Gagal Diajukan ke PPK")
            error.statusCode = 422
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Update", 
            data : up
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}

//Paraf PPK Setuju Ajukan Ke APIP
exports.parafppk = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            status_revisi : 1, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_paraf : 1
        }
    })
    .then((data) => {
        if(data.length === 0 ) {
            const error = new Error("Tidak Ada Data Paraf")
            error.statusCode = 422 
            throw error
        }
        const upd = {
            status_revisi : 1,
            status_paraf : 2
        }
        return RkbmutPenghapusan.update(upd, {
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja
            }
        });
    })
    .then((respon) => {
        if(!respon) {
            const error = new Error("Gagal Paraf")
            error.statusCode = 422 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Paraf Data Ke APIP", 
            data : respon
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Review APIP
exports.reviewapip = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            status_revisi : 1, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        let data_awal = JSON.parse(JSON.stringify(data))
        let index = data.length
        const {revisi_ke} = data_awal[index-1]
        let kode = revisi_ke + 1
        const upd = {
            revisi_ke : kode, 
            status_revisi : 2, 
            alasan : req.body.alasan
        }
        return RkbmutPenghapusan.update(upd, {
            where : {
                nup : req.params.nup, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                status_revisi : 1
            }
        });
    })
    .then((update) => {
        if(!update){
            const error = new Error("Gagal Update");
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Berhasil Memberi Review", 
            data : update
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Review UNIT
exports.reviewunit = (req, res, next) => {
    RkbmutPenghapusan.findAll({
        where : {
            status_revisi : 2, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        let data_awal = JSON.parse(JSON.stringify(data))
        let index = data.length
        const {revisi_ke} = data_awal[index-1]
        let kode = revisi_ke + 1
        const upd = {
            revisi_ke : kode, 
            status_revisi : 1, 
            alasan : req.body.alasan
        }
        return RkbmutPenghapusan.update(upd, {
            where : {
                nup : req.params.nup, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                status_revisi : 2
            }
        });
    })
    .then((update) => {
        if(!update){
            const error = new Error("Gagal Update");
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Memberi Review", 
            data : update
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Paraf APIP Setuju 
exports.parafapipselesai = (req, res, next) => {
    RkbmutPenghapusan.findOne({
        where : {
            status_revisi : 1, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Tidak Ada Data Paraf")
            error.statusCode = 422 
            throw error
        }
        const upd = {
            status_revisi : 3
        }
        return RkbmutPenghapusan.update(upd, {
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja, 
                nup : req.params.nup
            }
        });
    })
    .then((paraf) => {
        if(!paraf) {
            const error = new Error("Gagal Paraf")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPenghapusan.findAll({
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja,
                status_revisi : {
                    [Op.not] : 3,
                },
            }
        })
        .then((det) => {
            console.log(det.length)
            if(det.length !== 0) {
                status_penghapusan = 0
            }
            else {
                status_penghapusan = 1
            }
            return TrxRkbmutAll.update(
            {
                status_penghapusan : status_penghapusan
            }, 
            {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                }
            }
            )
            .then((trx) => {
                if(!trx) {
                    const error = new Error("Data Gagal Masuk")
                    error.statusCode = 422
                    throw error
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Diubah",
                    data : {
                        "penghapusan" : paraf,
                        "all" : trx
                    }
                })
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}


// Paraf Unit SETUJU 
exports.parafunitselesai = (req,res, next) => {
    RkbmutPenghapusan.findOne({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup, 
            status_revisi : 2
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Tidak Ada Data Paraf")
            error.statusCode = 422 
            throw error
        }
        const upd = {
            status_revisi : 3
        }
        return RkbmutPenghapusan.update(upd, {
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja,
                nup : req.params.nup
            }
        });
    })
    .then((paraf) => {
        if(!paraf) {
            const error = new Error("Gagal Paraf")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPenghapusan.findAll({
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja,
                status_revisi : {
                    [Op.not] : 3,
                },
            }
        })
        .then((det) => {
            console.log(det.length)
            if(det.length !== 0) {
                status_penghapusan = 0
            }
            else {
                status_penghapusan = 1
            }
            return TrxRkbmutAll.update(
            {
                status_penghapusan : status_penghapusan
            }, 
            {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                }
            }
            )
            .then((trx) => {
                if(!trx) {
                    const error = new Error("Data Gagal Masuk")
                    error.statusCode = 422
                    throw error
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Diubah",
                    data : {
                        "penghapusan" : paraf,
                        "all" : trx
                    }
                })
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
 }

 //Update  
 exports.update = (req, res, next) => {
    let data = {
        alasan : req.body.alasan
    }

    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja, 
        nup : req.params.nup, 
        status_revisi : 0, 
        status_paraf : 0
    }
    if(req.file) {
        const filename = path.parse(req.file.filename).base;
        data = {
            alasan : req.body.alasan,
            foto : "https://dev-sippp.ut.ac.id:2323/public/foto_barang_rusak/" + filename 
        }
    }

    RkbmutPenghapusan.findOne({
        where : param
    })
    .then((app) => {
        if(req.file) {
            if(app.foto !== null) {
                
                let cek = app.foto 
                let split_foto = cek.split("/")
                clearImage(split_foto[5]);
                return RkbmutPenghapusan.update(data, {
                    where : param
                })
            }
            else if(app.foto === null){
                
                return RkbmutPenghapusan.update(data, {
                    where : param
                })
            }
        }
        else {
            return RkbmutPenghapusan.update({
                alasan : req.body.alasan
            }, {
                where : param
            })
        }

        if(!app) {
            const error = new Error("NIP Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
    })
    .then((finis) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : finis
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
 }

 //Destroy
 exports.destroy = (req, res, next) => {
    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja, 
        nup : req.params.nup, 
        status_revisi : 0, 
        status_paraf : 0
    }
    RkbmutPenghapusan.findOne({
        where : param
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        if(data.foto == null){
            return RkbmutPenghapusan.destroy({
                where : param
            })
        }
        else {
            let cek = data.foto 
            let split_foto = cek.split("/")
            clearImage(split_foto[5]);
            if(!clearImage) {
                const error = new Error("Gagal Hapus Gambar")
                error.statusCode = 422 
                throw error
            }
            else {
                return RkbmutPenghapusan.destroy({
                    where : param
                });   
            }
        }
    })
    .then((respons) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : respons
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
 }

 const clearImage = (filePath) => {
    filePath = path.join(__dirname,"..","..","public","images","foto_barang_rusak",filePath);
    fs.unlink(filePath, (err) => {
        console.log("Unlink error", err)
    })
 }