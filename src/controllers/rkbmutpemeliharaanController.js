const RkbmutPemeliharaanHeader = require("../models/rkbmutPemeliharaanHeader")
const RkbmutPemeliharaanDetail = require("../models/rkbmutPemeliharaanDetail")
const Aset = require("../models/asset")
const {Op} = require("sequelize")
const db = require("../config/database")
const TrxRkbmutAll = require("../models/trxRkbmutAll")

//Data RKBMUT UNIT
exports.indexunit = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja
        }, 
        include : [
            {
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]}, 
                include : [
                    {
                        model : Aset
                    }
                ]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
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

//DATA RKBMUT PPK
exports.indexppk = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
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
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]},
                include : [
                    {
                        model : Aset
                    }
                ]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422; 
            throw error
        }
        return res.json({
            status : "Success", 
            message : "Data Berhasil Ditampilkan", 
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

exports.indexapip = (req, res, next) => {
    RkbmutPemeliharaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_paraf : 2
        }, 
        include : [
            {
                model : RkbmutPemeliharaanDetail, 
                attributes : {exclude : ["udcr", "udch", "ucr", "uch"]},
                include : [
                    {
                        model : Aset
                    }
                ]
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

//INSERT RKBMUT PEMELIHARAAN 
exports.store = (req, res, next) => {
    return db.transaction()
    .then((t) => {
         //Pemisah Kode dan Nama Unit
         let unit = req.body.unit 
         const split_unit = unit.split("||")
         let kode_unit = split_unit[0]
         let nama_unit = split_unit[1]
        //Pemish Kode dan BAS 
        let bas = req.body.bas 
        const split_bas = bas.split("||")
        let kode_bas = split_bas[0];
        let nama_bas = split_bas[1];
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                tahun : req.body.tahun, 
                kode_unit_kerja : kode_unit, 
                jenis_belanja : kode_bas
            }
        })
        .then((data) => {
            if(data.length !== 0) {
                const error = new Error("Data Sudah Ada")
                error.statusCode = 422;
                throw error
            }
            //Pemish Kode dan BAS 
            let bas = req.body.bas 
            const split_bas = bas.split("||")
            let kode_bas = split_bas[0];
            let nama_bas = split_bas[1];
            console.log(kode_bas)
            //Insert RKBMUT Pemeliharaan 
            return RkbmutPemeliharaanHeader.create({
                tahun : req.body.tahun, 
                kode_unit_kerja : kode_unit, 
                nama_unit_kerja : nama_unit, 
                jenis_belanja : kode_bas, 
                nama_jenis_belanja : nama_bas, 
                status_revisi : 0, 
                revisi_ke : 0, 
                status_paraf : 0 
            }, {transaction : t});
        })
        .then((insert) => {
            if(!insert){
                const error = new Error("Insert Header Gagal")
                error.statusCode = 422;
                throw error
            }
            const header = JSON.parse(JSON.stringify(insert))
            const request = req.body
            const insert_data = request.rkbmutpemeliharaan.map((item) => {
                let kondisi_baik = item.kondisi_baik
                let kondisi_rusak_ringan = item.kondisi_rusak_ringan
                return{
                    kode_unit_kerja : header.kode_unit_kerja, 
                    kode_asset : item.kode_asset, 
                    revisi_ke : header.revisi_ke, 
                    status_paraf : header.status_paraf, 
                    status_revisi : header.status_revisi, 
                    jenis_belanja : header.jenis_belanja,
                    kode_status_barang : item.kode_status_barang, 
                    kondisi_baik : kondisi_baik,
                    kondisi_rusak_ringan : kondisi_rusak_ringan, 
                    kebutuhan_pemeliharaan : kondisi_baik + kondisi_rusak_ringan,
                    keterangan : item.keterangan
                }
            });
            return RkbmutPemeliharaanDetail.bulkCreate(insert_data, 
                {transaction : t});
        })
        .then((insert2) => {
            if(!insert2) {
                const error = new Error("Insert Detail Gagal")
                error.statusCode = 422;
                throw error
            }
            res.json({
                status : "Success", 
                message : "Data Berhasil Di Insert"
            });
            return t.commit()
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err)
        });
    })
}

//UNIT MENGAJUKAN KE PPK 
exports.ajukanppk = (req, res,next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 0, 
                kode_unit_kerja : req.params.kode_unit_kerja,
                status_paraf : 0
            } 
        })
        .then((data) => {
            if(data.length === 0 ) {
                const error = new Error("Tidak Ada Data Paraf")
                error.statusCode = 422 
                throw error
            }
            const upd = {
                status_paraf : 1
            }
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja
                }, 
                transaction : t
            })
        })
        .then((update) => {
            if(!update) {
                const error = new Error("gagal Paraf")
                error.statusCode = 422 
                throw error
            }
            const ubah = {
                status_paraf : 1
            }
            return RkbmutPemeliharaanDetail.update(ubah, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja
                }, 
                transaction : t
            })
        })
        .then(() => {
            res.json({
                status : "Success", 
                message : "Berhasil Diajukan Data"
            })
            t.commit()
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback();
            return next(err);
        })
    })
}
 
//PPK PARAF DIAJUKAN KE APIP
exports.parafppk = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        RkbmutPemeliharaanHeader.findAll({
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
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                }, 
                transaction : t
            });
        })
        .then((update) => {
            if(!update) {
                const error = new Error("Gagal Paraf Header")
                error.statusCode = 422 
                throw error
            }
            const upd = {
                status_revisi : 1,
                status_paraf : 2
            }
            return RkbmutPemeliharaanDetail.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja
                }, 
                transaction : t
            });
        })
        .then(() => {
            res.json({
                status : "Success",
                message : "Berhasil Paraf PPK " 
            });
            return t.commit()
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback();
            return next(err);
        })
    })
}

//Komentar PPK 
exports.perbaikanppk = (req,res, next) => {
    let jenis_belanja = req.params.jenis_belanja
    let kode_unit_kerja = req.params.kode_unit_kerja

    let upd = {
        komentar : req.body.komentar,
        status_paraf : 0,
        status_revisi : 1 
        
    }
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                jenis_belanja : req.params.jenis_belanja,
                kode_unit_kerja : req.params.kode_unit_kerja,
                status_paraf : 1, 
                status_revisi : 0
            },
            raw : true
        })
        .then((data) => {
            // console.log(data)
            if(data.length === 0) {
                const error = new Error("Data Tidak Ada ")
                error.statusCode = 422 
                throw error
            }
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                jenis_belanja : jenis_belanja,
                kode_unit_kerja : kode_unit_kerja,
                status_paraf : 1, 
                status_revisi : 0
                },
                transaction : t 
            })
            .then((app) => {
                if(!app) {
                    const error = new Error("Gagal Update Header")
                    error.statusCode = 422
                    throw error
                }
                return RkbmutPemeliharaanDetail.update({
                    status_paraf : 0,
                    status_revisi : 1 
                }, 
                {
                    where : 
                    {
                    jenis_belanja : jenis_belanja,
                    kode_unit_kerja : kode_unit_kerja,
                    status_paraf : 1, 
                    status_revisi : 0
                    }, 
                    transaction : t
                })
                .then((update) => {
                    if(!update) {
                        const error = new Error("Gagal Update Data")
                        error.statusCode = 422 
                        throw error
                    }
                    t.commit();
                    return res.json({
                        status : "Success", 
                        message : "Berhasil Menambah Komentar",
                        data : {
                            "header" : app,
                            "detail" : update 
                        }
                    })
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        })
    })
}

//PPK Setuju Dengan Unit 

exports.setujuppk = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 0,
                kode_unit_kerja : req.params.kode_unit_kerja,
                jenis_belanja : req.params.jenis_belanja,
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
                status_paraf : 1
            }
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    jenis_belanja : req.params.jenis_belanja
                }, 
                transaction : t
            })
            .then((cek) => {
                return RkbmutPemeliharaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        jenis_belanja : req.params.jenis_belanja
                    }, 
                    transaction : t
                })
            })
            .then((respon) => {
                t.commit()
                return res.json({
                    status : "Success", 
                    message : "Data Siap Paraf", 
                    data : respon
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback();
            return next(err);
        })
    })
}

//Perbaikan Oleh Unit
exports.perbaikanunit = (req, res, next) => {
    let param = {
        jenis_belanja : req.params.jenis_belanja,
        kode_unit_kerja : req.params.kode_unit_kerja,
    }
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                jenis_belanja : param.jenis_belanja,
                kode_unit_kerja : param.kode_unit_kerja,
                status_revisi : 1,
                status_paraf : 0
            },
            include : {
                model : RkbmutPemeliharaanDetail
            }, 
            raw : true
        })
        .then((header) => {
            if(header.length === 0) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422
                throw error
            }
            let index = header.length 
            const{revisi_ke} = header[index - 1]
            let revisi = revisi_ke + 1
            
            const request = req.body
            const update = request.rkbmdetail.map((item) => {
                return {
                    kode_asset : item.kode_asset,
                    keterangan : item.keterangan,
                    status_revisi : 1, 
                    status_paraf : 1, 
                    revisi_ke : revisi
                }
            })
            for(let i = 0 ; i < update.length ; i++) {
                RkbmutPemeliharaanDetail.update(update[i],{
                    where : {
                        kode_asset : update[i].kode_asset,
                        kode_unit_kerja : param.kode_unit_kerja,
                        jenis_belanja : param.jenis_belanja
                    },
                    transaction : t
                })
            }
            //Kembalikan Pada PPK 
            return RkbmutPemeliharaanHeader.update({
                status_paraf : 1, 
                status_revisi : 1,
                revisi_ke : revisi
            }, 
            {
                where : param,
                transaction : t
            })
            .then((ppk) => {
                if(!ppk) {
                    const error = new Error("Gagal Diajukan ke PPK")
                    error.statusCode = 422
                    throw error
                }
                t.commit()
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Di Update",
                    data : ppk
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        });
    })
}

//REVIEW APIP
exports.reviewapip = (req,res, next) => {
       RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 1, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.kode_jenis_belanja
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
            const request = req.body
            const update = request.rkbmdetail.map((item) => {
                return {
                    kode_asset : item.kode_asset,
                    keterangan : item.keterangan, 
                    status_revisi : 2, 
                    revisi_ke : kode
                }
            });
            for(let i = 0 ; i < update.length ; i ++) {
               RkbmutPemeliharaanDetail.update(update[i], {
                    where : {
                        kode_asset : update[i].kode_asset,
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        jenis_belanja : req.params.kode_jenis_belanja
                    },        
                })
            }
            const upd = {
                status_revisi : 2,
                revisi_ke : kode
            }
             //Kembalikan Ke Unit 
              RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja,
                    jenis_belanja : req.params.kode_jenis_belanja 
                }, 
            })
            .then(() => {
                res.json({
                    status : "Success",
                    message : "Data Berhasil Diubah"
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

//REVIEW UNIT
exports.reviewunit = (req,res, next) => {
     RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 2, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.kode_jenis_belanja
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
            const request = req.body
            const update = request.rkbmdetail.map((item) => {
                return {
                    kode_asset : item.kode_asset,
                    keterangan : item.keterangan, 
                    status_revisi : 1, 
                    revisi_ke : kode
                }
            });
            for(let i = 0 ; i < update.length ; i ++) {
            RkbmutPemeliharaanDetail.update(update[i], {
                    where : {
                        kode_asset : update[i].kode_asset,
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        jenis_belanja : req.params.kode_jenis_belanja
                    }
                })
            }
            const upd = {
                status_revisi : 1, 
                revisi_ke : kode
            }
            //Kembalikan Ke Unit 
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja,
                    jenis_belanja : req.params.kode_jenis_belanja 
                }
            });
        })
        .then(() => {
            res.json({
                status : "Success",
                message : "Data Berhasil Diubah"
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }

            return next(err);
        })
}

//PARAF APIP SELESAI 
exports.parafapip = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 1 , 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.kode_jenis_belanja
            }
        })
        .then((data) => {
            if(data.length === 0 ) {
                const error = new Error("Tidak Ada Data Paraf")
                error.statusCode = 422 
                throw error
            }
            const upd = {
                status_revisi : 3
            }
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    jenis_belanja : req.params.kode_jenis_belanja
                },
                transaction : t
            })
            .then((head) => {
                return RkbmutPemeliharaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        jenis_belanja : req.params.kode_jenis_belanja
                    }, 
                    transaction : t
                })
                .then((detail) => {
                    if(!detail) {
                        const error = new Error("Gagal Update")
                        error.statusCode = 422
                        throw error
                    }
                    t.commit()
                    return RkbmutPemeliharaanDetail.findAll({
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
                            status_pemeliharaan = 0
                        }
                        else {
                            status_pemeliharaan = 1
                        }
                        return TrxRkbmutAll.update(
                        {
                            status_pemeliharaan : status_pemeliharaan
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
                                    "header" : head,
                                    "detail" : detail,
                                    "all" : trx
                                }
                            })
                        })
                    })
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        });
    })
}

//PARAF UNIT SELESAI 
exports.parafunit = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                status_revisi : 2 , 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.kode_jenis_belanja
            }
        })
        .then((data) => {
            if(data.length === 0 ) {
                const error = new Error("Tidak Ada Data Paraf")
                error.statusCode = 422 
                throw error
            }
            const upd = {
                status_revisi : 3
            }
            return RkbmutPemeliharaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    jenis_belanja : req.params.kode_jenis_belanja
                },
                transaction : t
            })
            .then((head) => {
                return RkbmutPemeliharaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        jenis_belanja : req.params.kode_jenis_belanja
                    }, 
                    transaction : t
                })
                .then((detail) => {
                    if(!detail) {
                        const error = new Error("Gagal Update")
                        error.statusCode = 422
                        throw error
                    }
                    t.commit()
                    return RkbmutPemeliharaanDetail.findAll({
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
                            status_pemeliharaan = 0
                        }
                        else {
                            status_pemeliharaan = 1
                        }
                        return TrxRkbmutAll.update(
                        {
                            status_pemeliharaan : status_pemeliharaan
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
                                    "header" : head,
                                    "detail" : detail,
                                    "all" : trx
                                }
                            })
                        })
                    })
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        });
    })
}

//UPDATE 
exports.update = (req, res, next) => {
    //Pemisah Unit
    let unit = req.body.unit
    const split_unit = unit.split("||")
    let kode_unit = split_unit[0]
    let nama_unit = split_unit[1]
    //Pemish Kode dan BAS 
    let bas = req.body.bas 
    const split_bas = bas.split("||")
    let kode_bas = split_bas[0];
    let nama_bas = split_bas[1];
    return db.transaction()
    .then((t) => {
        return RkbmutPemeliharaanHeader.findAll({
            where : {
                kode_unit_kerja : kode_unit, 
                jenis_belanja : kode_bas, 
                status_revisi : 0, 
                revisi_ke : 0
            }, 
            include : {
                model : RkbmutPemeliharaanDetail
            }
        })
        .then((head) => {
            if(head.length === 0) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422 
                throw error
            }
            let index = head.length
            let head_arr = JSON.parse(JSON.stringify(head))
            const {jenis_belanja} = head_arr[index-1]
            const {kode_unit_kerja} = head_arr[index-1]
            return RkbmutPemeliharaanDetail.destroy({
                where : {
                    jenis_belanja : jenis_belanja, 
                    kode_unit_kerja : kode_unit_kerja, 
                    revisi_ke : 0,
                    status_revisi : 0
                },
                transaction : t 
            })
            .then((destroy) => {
                if(!destroy){
                    const error = new Error("Data Gagal Dihapus")
                    error.statusCode = 422 
                    throw error
                }
                const request = req.body
                const data = request.rkbmutpemeliharaan.map((item) => {
                    let kondisi_baik = item.kondisi_baik
                    let kondisi_rusak_ringan = item.kondisi_rusak_ringan
                    return {
                        kode_unit_kerja : kode_unit_kerja, 
                        kode_asset : item.kode_asset, 
                        revisi_ke : 0, 
                        status_paraf : 0, 
                        status_revisi : 0, 
                        jenis_belanja : jenis_belanja,
                        kode_status_barang : item.kode_status_barang, 
                        kondisi_baik : kondisi_baik,
                        kondisi_rusak_ringan : kondisi_rusak_ringan, 
                        kebutuhan_pemeliharaan : kondisi_baik + kondisi_rusak_ringan,
                        keterangan : item.keterangan
                    }
                });
                return RkbmutPemeliharaanDetail.bulkCreate(data, {
                    transaction : t
                })
                .then((insert) => {
                    if(!insert) {
                        const error = new Error("Data Gagal Dibuat")
                        error.statusCode = 422 
                        throw error
                    }
                    res.json({
                        status : "Success", 
                        message : "Berhasil Menambah Data",
                        data : insert
                    })
                    return t.commit()
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        })
    })
}

//Delete Sementara 
exports.destroy = (req, res, next) => {
    RkbmutPemeliharaanHeader.findOne({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            jenis_belanja : req.params.jenis_belanja
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPemeliharaanHeader.destroy({
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.jenis_belanja
            }
        });
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPemeliharaanDetail.destroy({
            where : {
                kode_unit_kerja : req.params.kode_unit_kerja, 
                jenis_belanja : req.params.jenis_belanja
            }
        });
    })
    .then((destroyall) => {
        if(!destroyall) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Dihapus", 
            data : destroyall
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
} 

//Hapus Header
exports.destroyfromhead = (req, res, next) => {
    RkbmutPemeliharaanHeader.findOne({
        where : {
            jenis_belanja : jenis_belanja, 
            kode_unit_kerja : kode_unit_kerja, 
            revisi_ke : 0,
            status_revisi : 0
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPemeliharaanHeader.destroy({
            where : {
            jenis_belanja : jenis_belanja, 
            kode_unit_kerja : kode_unit_kerja, 
            revisi_ke : 0,
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
        return RkbmutPemeliharaanDetail.destroy({
            where : {
            jenis_belanja : jenis_belanja, 
            kode_unit_kerja : kode_unit_kerja, 
            revisi_ke : 0,
            status_revisi : 0
            }
        });
    })
    .then((destroyall) => {
        if(!destroyall) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Data Berhasil Dihapus", 
            data : destroyall
        });
    })
   
}