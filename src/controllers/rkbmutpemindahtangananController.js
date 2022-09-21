const RkbmutPemindahtanganan = require("../models/rkbmutPemindahtanganan")
const Aset = require("../models/asset")
const {Op} = require("sequelize")

//Data RKBMUT UNIT
exports.indexunit = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja
        }, 
        include : [
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
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
    RkbmutPemindahtanganan.findAll({
        where  : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            [Op.or] : [
                {status_paraf : 1}, 
                {status_paraf : 2}
            ]
        }, 
       include : [
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
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
    RkbmutPemindahtanganan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            status_paraf : 2,
        }, 
        include : [ 
            {
                model : Aset, 
                attributes : ["kode_asset", "nama_asset"]
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

//Insert RKBMUT Pemindahtanganan
exports.store = (req, res, next) => {
    let unit = req.body.unit 
    const split_unit = unit.split("||")
    let kode_unit = split_unit[0]
    const tahun = req.body.tahun;
    const rquest = req.body; 
    const find = rquest.pemindahtanganan.map((item) => {
        return {
            tahun : tahun, 
            kode_unit_kerja : kode_unit,
            status_revisi : 0, 
            nup : item.nup
        }
    })
    return RkbmutPemindahtanganan.findAll({
        where : find
    })
    .then((data) => {
        if(data.length !== 0) {
            const error = new Error("Data Sudah Ada")
            error.statusCode = 422;
            throw error
        }
         //Pemisah Kode dan Nama Unit
         let unit = req.body.unit
         const split_unit = unit.split("||")
         let kode_unit = split_unit[0]
         let nama_unit = split_unit[1]
         //Insert RKBMUT Pemindahtanganan 
         const request = req.body; 
         const tahun = req.body.tahun;
         const create = request.pemindahtanganan.map((item) => {
            return {
                kode_asset : item.kode_asset, 
                kode_unit_kerja : kode_unit,
                nama_unit_kerja : nama_unit, 
                tahun : tahun, 
                nup : item.nup, 
                revisi_ke : 0, 
                status_revisi : 0, 
                status_paraf : 0, 
                merk : item.merk, 
                umur_ekonomis : item.umur_ekonomis, 
                tahun_perolehan : item.tahun_perolehan, 
                kondisi : item.kondisi, 
                nilai_perolehan : item.nilai_perolehan,
                kode_pindah_tangan : item.kode_pindah_tangan, 
                alasan : item.alasan
            }
         })
         return RkbmutPemindahtanganan.bulkCreate(create);
    })
    .then((result) => {
        res.json({
            status : "Success", 
            message : "Data Berhasil Dimasukkan", 
            data : result
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

//Unit Mengajukan Ke PPK
exports.ajukanppk = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
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
        return RkbmutPemindahtanganan.update(upd, {
            where : {kode_unit_kerja : req.params.kode_unit_kerja}
        })
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

//Paraf PPK Diajukan ke APIP 
 exports.parafppk = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
        where : {
            status_revisi : 0, 
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
        return RkbmutPemindahtanganan.update(upd, {
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

 //Revisi APIP
 exports.reviewapip = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
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
            nilai_perolehan : req.body.nilai_perolehan, 
            kode_pindah_tangan : req.body.kode_pindah_tangan, 
            alasan : req.body.alasan
        }
        return RkbmutPemindahtanganan.update(upd, {
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

 //Revisi Dari UNIT 
 exports.reviewunit = (req, res, next) => {
    RkbmutPemindahtanganan.findAll({
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
            nilai_perolehan : req.body.nilai_perolehan, 
            kode_pindah_tangan : req.body.kode_pindah_tangan, 
            alasan : req.body.alasan
        }
        return RkbmutPemindahtanganan.update(upd, {
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

 //Paraf Unit Setuju Revisi Dari APIP 
 exports.parafunitselesai = (req,res, next) => {
    RkbmutPemindahtanganan.findOne({
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
        return RkbmutPemindahtanganan.update(upd, {
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
        res.json({
            status : "Success", 
            message : "Berhasil Paraf Siap TTE",
            data : paraf
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
 }

 //Paraf APIP setuju Selesai 
 exports.parafapipselesai = (req, res, next) => {
    RkbmutPemindahtanganan.findOne({
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
        return RkbmutPemindahtanganan.update(upd, {
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
        res.json({
            status : "Success", 
            message : "Data Berhasil di Paraf",
            data : paraf
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
 }