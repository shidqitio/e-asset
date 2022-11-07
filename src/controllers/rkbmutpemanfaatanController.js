const db = require("../config/database");
const RkbmUTPemanfaatan = require("../models/rkbmutPemanfaatan")
const Aset = require("../models/asset")
const TrxRkbmutAll = require("../models/trxRkbmutAll")
const {Op} = require("sequelize")

//Data RKBMUT UNIT 
exports.indexunit = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
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
    RkbmUTPemanfaatan.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            [Op.or] : [
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
    RkbmUTPemanfaatan.findAll({
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

//INSERT RKBMUT PEMANFAATAN
exports.store = (req, res, next) => {
    let unit = req.body.unit
    const split_unit = unit.split("||")
    let kode_unit = split_unit[0]
    let nama_unit = split_unit[1]
    const tahun = req.body.tahun;
    const rquest = req.body; 
    const find = rquest.pemanfaatan.map((item) => {
        return {
            tahun : tahun, 
            kode_unit_kerja : kode_unit,
            status_revisi : 0, 
            nup : item.nup
        }
    })
    RkbmUTPemanfaatan.findAll(
        {where : find}
    )
    .then((data) => {
        if(data.length !== 0){ 
            const error = new Error("Data Sudah Ada")
            error.statusCode = 422;
            throw error
        }
        //Pemisah Kode dan Nama Unit
        let unit = req.body.unit
        const split_unit = unit.split("||")
        let kode_unit = split_unit[0]
        let nama_unit = split_unit[1]
        //Insert RKBMUT Pemanfaatan 
        const request = req.body; 
        const tahun = req.body.tahun;
        const create = request.pemanfaatan.map((item) => {
            return {
                kode_asset : item.kode_asset, 
                kode_unit_kerja : kode_unit,
                nama_unit_kerja : nama_unit,
                tahun : tahun, 
                nup : item.nup, 
                revisi_ke : 0, 
                status_revisi : 0,
                kode_status_pemilik : item.kode_status_pemilik,
                kondisi_barang : item.kondisi_barang, 
                total_realisasi_pnpb : item.total_realisasi_pnpb, 
                jumlah_item : item.jumlah_item,
                kode_bentuk_pemanfaatan : item.kode_bentuk_pemanfaatan,
                peruntukan : item.peruntukan, 
                jangka_waktu : item.jangka_waktu, 
                potensi_pnpb : item.potensi_pnpb,
                keterangan : item.keterangan 
            }
        })
        return RkbmUTPemanfaatan.bulkCreate(create);
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
    });
}

//Unit Mengajukan Ke PPK 
exports.ajukanppk = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
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
        return RkbmUTPemanfaatan.update(upd, {
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
    let nup = req.params.nup
    let kode_unit_kerja = req.params.kode_unit_kerja

    let upd = {
        komentar : req.body.komentar, 
        status_paraf : 0, 
        status_revisi : 1
    }

    return RkbmUTPemanfaatan.findAll({
        where : {
            nup : nup, 
            kode_unit_kerja : kode_unit_kerja,
            status_paraf : 1, 
            status_revisi : 0
        }, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada ")
            error.statusCode = 422 
            throw error
        }
        return RkbmUTPemanfaatan.update(upd, {
            where : {
            nup : nup, 
            kode_unit_kerja : kode_unit_kerja,
            status_paraf : 1, 
            status_revisi : 0
            }
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
    let nup = req.params.nup
    let kode_unit_kerja = req.params.kode_unit_kerja

    let upd = { 
        status_paraf : 1, 
        status_revisi : 1
    }

    return RkbmUTPemanfaatan.findAll({
        where : {
            nup : nup, 
            kode_unit_kerja : kode_unit_kerja,
            status_paraf : 1, 
            status_revisi : 0
        }, 
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada ")
            error.statusCode = 422 
            throw error
        }
        return RkbmUTPemanfaatan.update(upd, {
            where : {
            nup : nup, 
            kode_unit_kerja : kode_unit_kerja,
            status_paraf : 1, 
            status_revisi : 0
            }
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
        t.rollback()
        return next(err);
    })
}

//Perbaikan unit 
exports.perbaikanunit = (req, res, next) => {
    let param = {
        nup : req.params.nup, 
        kode_unit_kerja : req.params.kode_unit_kerja,
        status_paraf : 0,
        status_revisi : 1
    }
    let upd = {
        jumlah_item : req.body.jumlah_item,
        kode_bentuk_pemanfaatan : req.body.kode_bentuk_pemanfaatan, 
        peruntukan : req.body.peruntukan, 
        jangka_waktu : req.body.jangka_waktu, 
        potensi_pnpb : req.body.potensi_pnpb, 
        kode_status_pemilik : req.body.kode_status_pemilik, 
        kondisi_barang : req.body.kondisi_barang, 
        total_realisasi_pnpb : req.body.total_realisasi_pnpb,
        keterangan : req.body.keterangan, 
    }
    return RkbmUTPemanfaatan.findAll({
        where : param, 
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
        return RkbmUTPemanfaatan.update(upd, param)
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
        t.rollback()
        return next(err);
    });
}

//Paraf PPK Diajukan KE APIP
exports.parafppk = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
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
        return RkbmUTPemanfaatan.update(upd, {
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

//REVISI DARI APIP 
exports.reviewapip = (req, res, next) => {
    RkbmUTPemanfaatan.findAll({
        where : {
            status_revisi : 1, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(data.length === 0){
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
            total_realisasi_pnpb : req.body.total_realisasi_pnpb, 
            jumlah_item : req.body.jumlah_item, 
            kode_bentuk_pemanfaatan : req.body.kode_bentuk_pemanfaatan, 
            peruntukan : req.body.peruntukan,
            jangka_waktu : req.body.jangka_waktu, 
            potensi_pnpb : req.body.potensi_pnpb, 
            keterangan : req.body.keterangan
        }

        return RkbmUTPemanfaatan.update(upd, {
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
    RkbmUTPemanfaatan.findAll({
        where : {
            status_revisi : 2, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        let data_awal = JSON.parse(JSON.stringify(data))
        let index = data.length
        const {revisi_ke} = data_awal[index-1]
        let kode = revisi_ke + 1
        const upd = {
            kode_asset : req.body.kode_asset, 
            tahun : req.body.tahun, 
            revisi_ke : kode, 
            status_revisi : 1,
            revisi_ke : kode,  
            total_realisasi_pnpb : req.body.total_realisasi_pnpb, 
            jumlah_item : req.body.jumlah_item, 
            kode_bentuk_pemanfaatan : req.body.kode_bentuk_pemanfaatan, 
            peruntukan : req.body.peruntukan,
            jangka_waktu : req.body.jangka_waktu, 
            potensi_pnpb : req.body.potensi_pnpb, 
            keterangan : req.body.keterangan
        }

        return RkbmUTPemanfaatan.update(upd, {
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
exports.parafunitselesai = (req, res, next) => {
    RkbmUTPemanfaatan.findOne({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            nup : req.params.nup, 
            status_revisi : 2
        }
    })
    .then((data) => {
        if(!data){
            const error = new Error("Tidak Ada Data Paraf")
            error.statusCode = 422 
            throw error
        }
        const upd = {
            status_revisi : 3
        }
        return RkbmUTPemanfaatan.update(upd, {
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
        return RkbmUTPemanfaatan.findAll({
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
                status_pemanfaatan = 0
            }
            else {
                status_pemanfaatan = 1
            }
            return TrxRkbmutAll.update(
            {
                status_pemanfaatan : status_pemanfaatan
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
                        "pemanfaatan" : paraf,
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

//Paraf APIP Setuju Selesai
exports.parafapip = (req, res, next) => {
    const upd = {
        status_revisi : 3
    }
    RkbmUTPemanfaatan.findOne({
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
        
        return RkbmUTPemanfaatan.update(upd, {
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
        return RkbmUTPemanfaatan.update(upd, {
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
        return RkbmUTPemanfaatan.findAll({
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
                status_pemanfaatan = 0
            }
            else {
                status_pemanfaatan = 1
            }
            return TrxRkbmutAll.update(
            {
                status_pemanfaatan : status_pemanfaatan
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
                        "pemanfaatan" : paraf,
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

exports.update = (req, res, next) => {
    let upd = {
        jumlah_item : req.body.jumlah_item,
        kode_bentuk_pemanfaatan : req.body.kode_bentuk_pemanfaatan, 
        peruntukan : req.body.peruntukan, 
        jangka_waktu : req.body.jangka_waktu, 
        potensi_pnpb : req.body.potensi_pnpb, 
        keterangan : keterangan
    }
    RkbmUTPemanfaatan.findAll({
        where : {
            nup : req.params.nup, 
            status_revisi : 0, 
            revisi_ke : 0, 
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422;
            throw error
        }
        return RkbmUTPemanfaatan.update(upd, {
            where : {
                nup : req.params.nup, 
                status_revisi : 0, 
                revisi_ke : 0, 
            }
        })
    })
    .then((update) => {
        if(!update){
            const error = new Error("Data Gagal Update")
            error.statusCode = 422;
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Di Update",
            data : update
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Delete Sementara 
exports.destroy = (req, res, next) => {
    RkbmUTPemanfaatan.findOne({
        where :{
            nup : req.params.nup
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return RkbmUTPemanfaatan.destroy({
            where : {
                nup : req.params.nup
            }
        });
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Dihapus",
            data : destroy
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

//Delete Pemanfaatan Sebelum Paraf 
exports.destroymanfaat = (req, res, next) => {
    RkbmUTPemanfaatan.findOne({
        where :{
            nup : req.params.nup, 
            status_paraf : 0, 
            status_revisi : 0
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return RkbmUTPemanfaatan.destroy({
            where : {
                nup : req.params.nup,
                status_paraf : 0, 
                status_revisi : 0
            }
        });
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Dihapus",
            data : destroy
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
}

