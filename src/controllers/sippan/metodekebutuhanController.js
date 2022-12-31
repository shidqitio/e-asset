const RefMetodeKebutuhan = require("../../models/sippan/refMetodeKebutuhan")
const RkbmutPengadaanHeader = require("../../models/rkbmutPengadaanHeader")
const RkbmutPengadaanDetail = require("../../models/rkbmutPengadaanDetail")

exports.store = (req, res, next) => {
    let request = req.body
    let kode_kegiatan_rkt = request.kode_kegiatan_rkt;
    let kode_asset = request.kode_asset;
    let nama_rup = request.nama_rup;
    let jenis_pengadaan = request.jenis_pengadaan;
    let metode_pengadaan = request.metode_pengadaan
    let lokasi = request.lokasi
    let uraian_pekerjaan = request.uraian_pekerjaan
    let spesifikasi = request.spesifikasi
    let volume = request.volume
    let satuan = request.satuan
    let produksi_dalam_negeri = request.produksi_dalam_negeri
    let usaha = request.usaha
    let sumber_dana = request.sumber_dana
    let pilih_penyedia_mulai = request.pilih_penyedia_mulai
    let pilih_penyedia_selesai = request.pilih_penyedia_selesai
    let pelaksanaan_kontrak_mulai = request.pelaksanaan_kontrak_mulai
    let pelaksanaan_kontrak_selesai = request.pelaksanaan_kontrak_selesai
    let rencana_pemanfaatan_mulai = request.rencana_pemanfaatan_mulai
    let rencana_pemanfaatan_selesai = request.rencana_pemanfaatan_selesai

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
            rencana_pemanfaatan_selesai : rencana_pemanfaatan_selesai
        })
        .then((data) => {
            if(!data) {
                const error = new Error("Data Gagal di Inputan")
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