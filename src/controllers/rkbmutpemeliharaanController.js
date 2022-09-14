const RkbmutPemeliharaanHeader = require("../models/rkbmutPemeliharaanHeader")
const RkbmutPemeliharaanDetail = require("../models/rkbmutPemeliharaanDetail")
const Aset = require("../models/asset")
const {Op} = require("sequelize")
const db = require("../config/database")

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
                    kode_jenis_belanja : header.jenis_belanja,
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


//PPK PARAF DIAJUKAN KE APIP


//REVIEW APIP


//REVIEW UNIT


//PARAF APIP SELESAI 


//PARAF UNIT SELESAI 


//UPDATE 


