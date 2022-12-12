const RkbmutPengadaanHeader = require("../models/rkbmutPengadaanHeader");
const RkbmutPengadaanDetail = require("../models/rkbmutPengadaanDetail");
const TrxRkbmutAll = require("../models/trxRkbmutAll")
const db = require("../config/database");
const {Op} = require("sequelize")

// Data RKBMUT UNIT
exports.index = (req, res, next) => {
    RkbmutPengadaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
        },
        include : [
            {
                model : RkbmutPengadaanDetail
            }, 
        ],
        required : true
       
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
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

// Data RKBMUT PPK
exports.indexppk = (req, res, next) => {
    RkbmutPengadaanHeader.findAll({
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
                model : RkbmutPengadaanDetail
            }, 
        ],
        required : true
       
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
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

// Data RKBMUT APIP
exports.indexapip = (req, res, next) => {
    RkbmutPengadaanHeader.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_paraf : 2 , 
        },
        include : [
            {
                model : RkbmutPengadaanDetail
            }, 
        ],
        required : true
       
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada");
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





//Imsert RKBMUT Pengadaan
exports.store = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        //Pemisah Kode dan Nama Unit
        let unit = req.body.unit 
        const split_unit = unit.split("||")
        let kode_unit = split_unit[0]
        let nama_unit = split_unit[1]
        //Pemisah Kode dan Nama RKT
        let kegiatan_rkt = req.body.kegiatan_rkt
        const split_rkt = kegiatan_rkt.split("||")
        let kode_kegiatan_rkt = parseInt(split_rkt[0])
        RkbmutPengadaanHeader.findAll({where  : {
            tahun : req.body.tahun, 
            kode_unit_kerja : kode_unit, 
            kode_kegiatan_rkt : kode_kegiatan_rkt,
            status_revisi : 0, 
        }
        })
        .then((data) => {
            if(data.length !== 0){
                let datum = JSON.parse(JSON.stringify(data))
                const index = datum.length 
                const {revisi_ke} = datum[index-1]
                revisi = revisi_ke + 1
                // console.log("Jumlah Data",revisi_ke)
                 //Pemisah Kode dan Nama Unit
            let unit = req.body.unit 
            const split_unit = unit.split("||")
            
            let kode_unit = split_unit[0]
            let nama_unit = split_unit[1]
            //Pemisah Kode dan Nama RKT
            let kegiatan_rkt = req.body.kegiatan_rkt
            const split_rkt = kegiatan_rkt.split("||")
            let kode_kegiatan_rkt = parseInt(split_rkt[0])
            let nama_kegiatan_rkt = split_rkt[1]
            //Pemisah Kode dan Nama Program RSB
            let program_rsb = req.body.program_rsb
            const split_rsb = program_rsb.split("||")
            let kode_rsb = split_rsb[0]
            let nama_rsb = split_rsb[1]
            //Pemisah Kode dan Nama Jenis Belanja
            let jenis_belanja = req.body.jenis_belanja
            const split_jenis_belanja = jenis_belanja.split("||")
            let kode_jenis_belanja = split_jenis_belanja[0]
            let nama_jenis_belanja = split_jenis_belanja[1]
            //Pemisah Kode dan Nama Sub Kegiatan
            
            //Insert RKBMUT Header  
            return RkbmutPengadaanHeader.create({
                kode_unit_kerja : kode_unit, 
                nama_unit_kerja : nama_unit, 
                kode_kegiatan_rkt : kode_kegiatan_rkt, 
                nama_kegiatan_rkt : nama_kegiatan_rkt, 
                kode_program_rsb : kode_rsb, 
                nama_program_rsb : nama_rsb, 
                kode_jenis_belanja : kode_jenis_belanja, 
                nama_jenis_belanja : nama_jenis_belanja, 
                tahun : req.body.tahun, 
                status_revisi : 0, 
                revisi_ke : revisi, 
                status_paraf : 0
            },{transaction : t})
            .then((header) => {
                const head = JSON.parse(JSON.stringify(header))
                const request = req.body
                const data = request.rkbmutpengadaandetail.map((item) => {
                    return {
                        kode_skema_pengadaan : item.kode_skema_pengadaan,                         
                        kode_asset : item.kode_asset, 
                        kode_unit_kerja : head.kode_unit_kerja, 
                        kode_kegiatan_rkt : head.kode_kegiatan_rkt, 
                        tahun : head.tahun,
                        kuantitas : item.kuantitas, 
                        sbsk : item.sbsk, 
                        existing_bmut : item.existing_bmut, 
                        kebutuhan_riil : item.kebutuhan_riil, 
                        keterangan : item.keterangan,
                        revisi_ke : head.revisi_ke,
                        status_revisi : 0
                    }
                })
                return RkbmutPengadaanDetail.bulkCreate(data, {transaction : t})
                .then(() => {
                    return t.commit()
                })
                .then((respon) => {
                    res.json({
                        status : "Success", 
                        message : "Berhasil Menambah Data", 
                        data : respon
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
            else{
            //Pemisah Kode dan Nama Unit
            let unit = req.body.unit 
            const split_unit = unit.split("||")
            let kode_unit = split_unit[0]
            let nama_unit = split_unit[1]
            //Pemisah Kode dan Nama RKT
            let kegiatan_rkt = req.body.kegiatan_rkt
            const split_rkt = kegiatan_rkt.split("||")
            let kode_kegiatan_rkt = parseInt(split_rkt[0])
            let nama_kegiatan_rkt = split_rkt[1]
            //Pemisah Kode dan Nama Program RSB
            let program_rsb = req.body.program_rsb
            const split_rsb = program_rsb.split("||")
            let kode_rsb = split_rsb[0]
            let nama_rsb = split_rsb[1]
            //Pemisah Kode dan Nama Jenis Belanja
            let jenis_belanja = req.body.jenis_belanja
            const split_jenis_belanja = jenis_belanja.split("||")
            let kode_jenis_belanja = split_jenis_belanja[0]
            let nama_jenis_belanja = split_jenis_belanja[1]
            //Insert RKBMUT Header 
            RkbmutPengadaanHeader.create({
                kode_unit_kerja : kode_unit, 
                nama_unit_kerja : nama_unit, 
                kode_kegiatan_rkt : kode_kegiatan_rkt, 
                nama_kegiatan_rkt : nama_kegiatan_rkt, 
                kode_program_rsb : kode_rsb, 
                nama_program_rsb : nama_rsb, 
                kode_jenis_belanja : kode_jenis_belanja, 
                nama_jenis_belanja : nama_jenis_belanja, 
                tahun : req.body.tahun, 
                status_revisi : 0, 
                revisi_ke : 0
            },{transaction : t})
            .then((header) => {
                const head = JSON.parse(JSON.stringify(header))
                const request = req.body
                const data = request.rkbmutpengadaandetail.map((item) => {
                    return {
                        kode_skema_pengadaan : item.kode_skema_pengadaan,                         
                        kode_asset : item.kode_asset, 
                        kode_unit_kerja : head.kode_unit_kerja, 
                        kode_kegiatan_rkt : head.kode_kegiatan_rkt, 
                        tahun : head.tahun,
                        kuantitas : item.kuantitas, 
                        sbsk : item.sbsk, 
                        existing_bmut : item.existing_bmut, 
                        kebutuhan_riil : item.kebutuhan_riil, 
                        keterangan : item.keterangan,
                        status_revisi : 0, 
                        revisi_ke : 0
                    }
                })
                return RkbmutPengadaanDetail.bulkCreate(data, {transaction : t})
                .then(() => {
                    return t.commit()
                })
                .then((respon) => {
                    res.json({
                        status : "Success", 
                        message : "Berhasil Menambah Data", 
                        data : respon
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
        })
    })
}

//Unit Mengajukan Ke PPK 
exports.ajukanppk = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : 0 , 
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                }
            })
            .then((app) => {
                if(!app) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422
                    throw error
                }
                return RkbmutPengadaanDetail.update({
                    status_paraf : 1
                },{
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja
                    }
                })
            })
            .then((respon) => {
                res.json({
                    status : "Success", 
                    message : "Berhasil Diajukan Ke PPK", 
                    data : respon
                })
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
    }) 
}

//Perbaikan PPK Berupa Komentar
exports.perbaikanppk = (req,res, next) => {
    let kode_kegiatan_rkt = req.params.kode_kegiatan_rkt
    let kode_unit_kerja = req.params.kode_unit_kerja

    let upd = {
        komentar : req.body.komentar,
        status_paraf : 0,
        status_revisi : 1 
        
    }
    return db.transaction()
    .then((t) => {
        return RkbmutPengadaanHeader.findAll({
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt,
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                kode_kegiatan_rkt : kode_kegiatan_rkt,
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
                return RkbmutPengadaanDetail.update({
                    status_paraf : 0,
                    status_revisi : 1 
                }, 
                {
                    where : 
                    {
                    kode_kegiatan_rkt : kode_kegiatan_rkt,
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

//Perbaikan Oleh Unit 
exports.perbaikanunit = (req, res, next) => {
    let param = {
        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt,
        kode_unit_kerja : req.params.kode_unit_kerja,
    }
    let upd = {
        kode_skema_pengadaan : req.body.kode_skema_pengadaan,
        kuantitas : req.body.kuantitas,
        sbsk : req.body.sbskm,
        kebutuhan_riil : req.body.kebutuhan_riil,
        keterangan : req.body.keterangan
    }
    return db.transaction()
    .then((t) => {
        return RkbmutPengadaanHeader.findAll({
            where : {
                kode_kegiatan_rkt : param.kode_kegiatan_rkt,
                kode_unit_kerja : param.kode_unit_kerja,
                status_revisi : 1,
                status_paraf : 0
            },
            include : {
                model : RkbmutPengadaanDetail
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
                    kode_skema_pengadaan : item.kode_skema_pengadaan,
                    kuantitas : item.kuantitas, 
                    kode_asset : item.kode_asset,
                    sbsk : item.sbsk, 
                    kebutuhan_riil : item.kebutuhan_riil,
                    keterangan : item.keterangan,
                    status_revisi : 0, 
                    status_paraf : 1, 
                    revisi_ke : revisi
                }
            })
            for(let i = 0 ; i < update.length ; i++) {
                RkbmutPengadaanDetail.update(update[i],{
                    where : {
                        kode_asset : update[i].kode_asset,
                        kode_unit_kerja : param.kode_unit_kerja,
                        kode_kegiatan_rkt : param.kode_kegiatan_rkt
                    },
                    transaction : t
                })
            }
            //Kembalikan Pada PPK 
            return RkbmutPengadaanHeader.update({
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

//Setuju dari PPK Perubahan Unit
exports.setujuppk = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : 0,
                kode_unit_kerja : req.params.kode_unit_kerja,
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt,
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
                }, 
                transaction : t
            })
            .then((cek) => {
                return RkbmutPengadaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
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


//Paraf PPK 
exports.parafunit = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : {
                    [Op.or] : [
                        0, 1
                    ]
                 }, 
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                }, 
                transaction : t
            })
            .then((cek) => {
                return RkbmutPengadaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                    }, 
                    transaction : t
                })
            })
            .then((respon) => {
                t.commit()
                return res.json({
                    status : "Success", 
                    message : "Berhasil Paraf Data Ke APIP", 
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

//Paraf Unit Setuju Revisi APIP
exports.parafunitselesai = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : 2 , 
                kode_unit_kerja : req.params.kode_unit_kerja,
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
                }, 
                transaction : t
            })
            .then((head) => {
                if(!head) {
                    const error = new Error("Gagal Update")
                    error.statusCode = 422
                    throw error
                }
                return RkbmutPengadaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
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
                    return RkbmutPengadaanDetail.findAll({
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
                            status_pengadaan = 0
                        }
                        else {
                            status_pengadaan = 1
                        }
                        return TrxRkbmutAll.update(
                        {
                            status_pengadaan : status_pengadaan
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
            t.rollback();
            return next(err);
        })
    }) 
}

//Revisi Dari APIP
exports.review = (req, res, next) => {
        RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : 1,
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja
            },
            include : [
                {
                    model : RkbmutPengadaanDetail 
                }
            ]
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

            data_awal.map((hasil) => {
                data_map = hasil.RkbmutPengadaanDetails
            })
    
            const request = req.body
            const update = request.rkbmdetail.map((item) => {
                return {
                    kode_asset : item.kode_asset, 
                    kuantitas : item.kuantitas, 
                    sbsk : item.sbsk, 
                    kebutuhan_riil : item.kebutuhan_riil,
                    keterangan : item.keterangan,
                    status_revisi : 2, 
                    status_paraf : 2, 
                    revisi_ke : kode
                }
            })
           
            for(let i = 0 ; i < update.length ; i++) {
                RkbmutPengadaanDetail.update(update[i], {
                    where : {
                        kode_asset : update[i].kode_asset, 
                        kode_unit_kerja : req.params.kode_unit_kerja,
                        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
                    }
                })
            }

            const upd = {
                status_revisi : 2,
                revisi_ke : kode
            }
            // Kembalikan Pada Unit
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                    kode_unit_kerja : req.params.kode_unit_kerja
                }
            })
        })
        .then((respon)=> {
            res.json({
                status : "Success", 
                message : "Berhasil Merubah Data",
            })
        })
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            return next(err);
        });
}

//Revisi Dari UNIT
exports.reviewunit = (req, res, next) => {
    RkbmutPengadaanHeader.findAll({
        where : {
            status_revisi : 2,
            kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
            kode_unit_kerja : req.params.kode_unit_kerja
        },
        include : [
            {
                model : RkbmutPengadaanDetail 
            }
        ]
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

        data_awal.map((hasil) => {
            data_map = hasil.RkbmutPengadaanDetails
        })

        const request = req.body
        const update = request.rkbmdetail.map((item) => {
            return {
                kode_asset : item.kode_asset, 
                kuantitas : item.kuantitas, 
                sbsk : item.sbsk, 
                kebutuhan_riil : item.kebutuhan_riil,
                keterangan : item.keterangan,
                status_revisi : 1, 
                status_paraf : 2,
                revisi_ke : kode
            }
        })
       
        for(let i = 0 ; i < update.length ; i++) {
            RkbmutPengadaanDetail.update(update[i], {
                where : {
                    kode_asset : update[i].kode_asset, 
                    kode_unit_kerja : req.params.kode_unit_kerja,
                    kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
                }
            })
        }

        const upd = {
            status_revisi : 1,
            revisi_ke : kode
        }
        // Kembalikan Pada Unit
        return RkbmutPengadaanHeader.update(upd, {
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja
            }
        })
    })
    .then((respon)=> {
        res.json({
            status : "Success", 
            message : "Berhasil Merubah Data",
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}


//Paraf Apip Setuju Selesai
exports.parafapip = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        return RkbmutPengadaanHeader.findAll({
            where : {
                status_revisi : 1 , 
                kode_unit_kerja : req.params.kode_unit_kerja,
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
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
            return RkbmutPengadaanHeader.update(upd, {
                where : {
                    kode_unit_kerja : req.params.kode_unit_kerja, 
                    kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
                }, 
                transaction : t
            })
            .then((head) => {
                if(!head) {
                    const error = new Error("Gagal Update")
                    error.statusCode = 422
                    throw error
                }
                return RkbmutPengadaanDetail.update(upd, {
                    where : {
                        kode_unit_kerja : req.params.kode_unit_kerja, 
                        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt
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
                    return RkbmutPengadaanDetail.findAll({
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
                            status_pengadaan = 0
                        }
                        else {
                            status_pengadaan = 1
                        }
                        return TrxRkbmutAll.update(
                        {
                            status_pengadaan : status_pengadaan
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
            t.rollback();
            return next(err);
        })
    }) 
}

exports.update = (req, res, next) => {
    return db.transaction() 
        .then((t) => {
            //Pemisah Kode dan nama Unit
            let unit = req.body.unit 
            const split_unit = unit.split("||")
            let kode_unit = split_unit[0]
             //Pemisah Kode dan Nama RKT
             let kegiatan_rkt = req.body.kegiatan_rkt
             const split_rkt = kegiatan_rkt.split("||")
             let kode_kegiatan_rkt = parseInt(split_rkt[0])
        return RkbmutPengadaanHeader.findAll({
            where : {
                kode_unit_kerja : kode_unit, 
                kode_kegiatan_rkt : kode_kegiatan_rkt, 
                status_revisi : 0, 
                revisi_ke : 0
            },
            include : [
                {
                    model : RkbmutPengadaanDetail, 
                }
            ]
        })
        .then((head) => {
            if(head.length === 0 ) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422 
                throw error
            }
            let index = head.length
            let head_arr = JSON.parse(JSON.stringify(head))
            const {kode_kegiatan_rkt} = head_arr[index - 1]
            const {kode_unit_kerja} = head_arr[index - 1]
            const {tahun} = head_arr[index-1]
            return RkbmutPengadaanDetail.destroy({
                where : {
                    kode_kegiatan_rkt : kode_kegiatan_rkt, 
                    kode_unit_kerja : kode_unit_kerja, 
                    revisi_ke : 0, 
                    status_revisi : 0
                }
            },{
                transaction : t
            })
            .then((destroy) => {
                if(!destroy){
                    const error = new Error("Data Gagal Dihapus")
                    error.statusCode = 422 
                    throw error
                }
                const request = req.body
                const data = request.rkbmutpengadaandetail.map((item) => {
                    return {
                        kode_skema_pengadaan : item.kode_skema_pengadaan,                         
                        kode_asset : item.kode_asset, 
                        kode_unit_kerja : kode_unit_kerja, 
                        kode_kegiatan_rkt : kode_kegiatan_rkt, 
                        tahun : tahun,
                        kuantitas : item.kuantitas, 
                        sbsk : item.sbsk, 
                        existing_bmut : item.existing_bmut, 
                        kebutuhan_riil : item.kebutuhan_riil, 
                        keterangan : item.keterangan,
                        status_revisi : 0, 
                        revisi_ke : 0
                    }
                });
                return RkbmutPengadaanDetail.bulkCreate(data, {
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

//DELETE SEMENTARA 
exports.destroy = (req, res, next) => {
    RkbmutPengadaanHeader.findOne({
        where : {
            kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPengadaanHeader.destroy({
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
            }
        });
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPengadaanDetail.destroy({
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja
            } .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    })
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
    RkbmutPengadaanHeader.findOne({
        where : {
            kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
            kode_unit_kerja : req.params.kode_unit_kerja, 
            status_revisi : 0, 
            status_paraf : 0
        }
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPengadaanDetail.destroy({
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja, 
                status_revisi : 0, 
                status_paraf : 0
            }
        });
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Dihapus")
            error.statusCode = 422 
            throw error
        }
        return RkbmutPengadaanHeader.destroy({
            where : {
                kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
                kode_unit_kerja : req.params.kode_unit_kerja
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

//Hapus Detail
exports.destroyfromdetail = (req, res, next) => {
    let param = {
        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
        kode_unit_kerja : req.params.kode_unit_kerja, 
        kode_asset : req.params.kode_asset,
        status_revisi : 0, 
        status_paraf : 0
    }
    return RkbmutPengadaanDetail.findOne({
        where  : param
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPengadaanDetail.destroy({
            where : param
        })
    })
    .then((destroy) => {
        if(!destroy) {
            const error = new Error("Data Gagal Hapus")
            error.statusCode = 422
            throw error
        }
        return res.json({
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
