const RefMetodeKebutuhan = require("../../models/sippan/refMetodeKebutuhan")
const RkbmutPengadaanHeader = require("../../models/rkbmutPengadaanHeader")
const RkbmutPengadaanDetail = require("../../models/rkbmutPengadaanDetail")

exports.store = (req, res, next) => {
    const rquest = req.body
    const kode_kegiatan_rkt = rquest.kode_kegiatan_rkt;
    let kode_asset = rquest.kode_asset;
    let nama_rup = rquest.nama_rup;
    let jenis_pengadaan = rquest.jenis_pengadaan;
    let metode_pengadaan = rquest.metode_pengadaan
    let lokasi = rquest.lokasi
    let uraian_pekerjaan = rquest.uraian_pekerjaan
    let spesifikasi = rquest.spesifikasi
    let volume = rquest.volume
    let satuan = rquest.satuan
    let produksi_dalam_negeri = rquest.produksi_dalam_negeri
    let usaha = rquest.usaha
    let sumber_dana = rquest.sumber_dana
    let pilih_penyedia_mulai = rquest.pilih_penyedia_mulai
    let pilih_penyedia_selesai = rquest.pilih_penyedia_selesai
    let pelaksanaan_kontrak_mulai = rquest.pelaksanaan_kontrak_mulai
    let pelaksanaan_kontrak_selesai = rquest.pelaksanaan_kontrak_selesai
    let rencana_pemanfaatan_mulai = rquest.rencana_pemanfaatan_mulai
    let rencana_pemanfaatan_selesai = rquest.rencana_pemanfaatan_selesai
    const path = require('path')
    const filename = path.parse(req.file.filename).base
    

    return RefMetodeKebutuhan.findAll({
        where : {
            kode_kegiatan_rkt : kode_kegiatan_rkt,
            kode_asset : kode_asset
        }
    })
    .then((app) => {
        if(app.length !== 0) {
            const error = new Error("Data Sudah Ada")
            error.statusCode = 422
            throw error
        }
        return RefMetodeKebutuhan.create({
            kode_kegiatan_rkt : kode_kegiatan_rkt, 
            kode_asset : kode_asset, 
            nama_rup : nama_rup,
            jenis_pengadaan : jenis_pengadaan,
            metode_pengadaan : metode_pengadaan,
            lokasi : lokasi, 
            uraian_pekerjaan : uraian_pekerjaan, 
            spesifikasi : spesifikasi, 
            volume : volume, 
            satuan : satuan, 
            produksi_dalam_negeri : produksi_dalam_negeri, 
            usaha : usaha, 
            sumber_dana : sumber_dana, 
            pilih_penyedia_mulai : pilih_penyedia_mulai, 
            pilih_penyedia_selesai : pilih_penyedia_selesai,
            pelaksanaan_kontrak_mulai : pelaksanaan_kontrak_mulai, 
            pelaksanaan_kontrak_selesai : pelaksanaan_kontrak_selesai,
            rencana_pemanfaatan_mulai : rencana_pemanfaatan_mulai, 
            rencana_pemanfaatan_selesai : rencana_pemanfaatan_selesai,
            upload_file : filename
        })
        .then((data) => {
            if(!data) {
                const error = new Error("Data Gagal di Input")
                error.statusCode = 422
                throw error
            }
            if(!req.file) {
                const error = new Error("Data Gagal di Input")
                error.statusCode = 422
                throw error
            }

            return RkbmutPengadaanDetail.update({
                status_sippan : 5
            }, 
            {
                where : {
                    kode_kegiatan_rkt : kode_kegiatan_rkt, 
                    kode_asset : kode_asset
                }
            })
            .then((upd) => {
                if(!upd) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422
                    throw error
                }
                return res.json({
                    status : "Success", 
                    message : "Data Berhasil Ditambah",
                    data : data
                })
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        return next(err)
    });
}

exports.updatemetode = (req, res, next) => {
    const rquest = req.body
    let nama_rup = rquest.nama_rup;
    let jenis_pengadaan = rquest.jenis_pengadaan;
    let metode_pengadaan = rquest.metode_pengadaan
    let lokasi = rquest.lokasi
    let uraian_pekerjaan = rquest.uraian_pekerjaan
    let spesifikasi = rquest.spesifikasi
    let volume = rquest.volume
    let satuan = rquest.satuan
    let produksi_dalam_negeri = rquest.produksi_dalam_negeri
    let usaha = rquest.usaha
    let sumber_dana = rquest.sumber_dana
    let pilih_penyedia_mulai = rquest.pilih_penyedia_mulai
    let pilih_penyedia_selesai = rquest.pilih_penyedia_selesai
    let pelaksanaan_kontrak_mulai = rquest.pelaksanaan_kontrak_mulai
    let pelaksanaan_kontrak_selesai = rquest.pelaksanaan_kontrak_selesai
    let rencana_pemanfaatan_mulai = rquest.rencana_pemanfaatan_mulai
    let rencana_pemanfaatan_selesai = rquest.rencana_pemanfaatan_selesai
    let param = {
        kode_kegiatan_rkt : parseInt(req.params.kode_kegiatan_rkt), 
        kode_asset : req.params.kode_asset
    }

    return RefMetodeKebutuhan.findAll({
        where : param
    })
    .then((metode) => {
        return RefMetodeKebutuhan.update({
            nama_rup : nama_rup, 
            jenis_pengadaan : jenis_pengadaan, 
            metode_pengadaan : metode_pengadaan, 
            lokasi : lokasi, 
            uraian_pekerjaan : uraian_pekerjaan, 
            spesifikasi : spesifikasi, 
            volume : volume,
            satuan : satuan, 
            produksi_dalam_negeri : produksi_dalam_negeri, 
            usaha : usaha, 
            sumber_dana : sumber_dana, 
            pilih_penyedia_mulai : pilih_penyedia_mulai, 
            pilih_penyedia_selesai : pilih_penyedia_selesai, 
            pelaksanaan_kontrak_mulai : pelaksanaan_kontrak_mulai, 
            pelaksanaan_kontrak_selesai : pelaksanaan_kontrak_selesai,
            rencana_pemanfaatan_mulai : rencana_pemanfaatan_mulai, 
            rencana_pemanfaatan_selesai : rencana_pemanfaatan_selesai
        }, 
        {
            where : param
        }).then((upd) => {
            if(!upd) {
                const error = new Error("Data Gagal Update")
                error.statusCode = 422
                throw error
            }
            return res.json({
                status : "Success", 
                message : "Data Berhasil Diubah",
                data : upd
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
}

exports.kirimkasubdit = (req, res, next) => {
    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja
    }

    return RkbmutPengadaanDetail.findAll({
        where : {
            kode_unit_kerja : param.kode_unit_kerja, 
            status_sippan : 5, 
            status_sippan_posisi : 0
        }
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPengadaanHeader.findAll({
            where : {
                tahun : req.params.tahun, 
                kode_unit_kerja : param.kode_unit_kerja
            }, 
            include : [
                {
                    model : RkbmutPengadaanDetail, 
                    where : {
                        kode_unit_kerja : param.kode_unit_kerja, 
                        status_sippan : 0
                    },
                }
            ],
            raw : true
        })
        .then((rkbm) => {
            if(rkbm.length === 0) {
                const error = new Error("Data Belum Siap Kirim")
                error.statusCode = 422
                throw error
            }
            return RkbmutPengadaanDetail.update({
                status_sippan_posisi : 1
            }, 
            {
                where : param
            })
            .then((upd) => {
                if(!upd) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422 
                    throw error
                }
                return res.json({
                    status : "Success", 
                    message : "Data Berhasil di Kirim ke Kasubdit",
                    data : upd
                })
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}