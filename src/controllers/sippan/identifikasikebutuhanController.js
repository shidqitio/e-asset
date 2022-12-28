const db = require("../../config/database")
const Asset = require("../../models/asset")
const RkbmutPengadaanDetail = require("../../models/rkbmutPengadaanDetail")
const RkbmutPengadaanHeader = require("../../models/rkbmutPengadaanHeader")
const RefIdentifikasiKebutuhan1 = require("../../models/sippan/refIdentifikasiKebutuhan1")
const RefIdentifikasiKebutuhan2 = require("../../models/sippan/refIdentifikasiKebutuhan2")
const RefIdentifikasiKebutuhan3 = require("../../models/sippan/refIdentifikasiKebutuhan3")
const RefIdentifikasiKebutuhan4 = require("../../models/sippan/refIdentifikasiKebutuhan4")
const RefIdentifikasiKebutuhan5 = require("../../models/sippan/refIdentifikasiKebutuhan5")
const RefIdentifikasiKebutuhan6 = require("../../models/sippan/refIndentifikasiKebutuhan6")
const RefKriteriaBarang = require("../../models/sippan/refKriteriaBarang")



exports.store = (req, res, next) => {
    let kode_kegiatan_rkt = req.body.kode_kegiatan_rkt
    let kode_asset = req.body.kode_asset
    let waktu_pemanfaatan = req.body.waktu_pemanfaatan
    let perkiraan_pengadaan = req.body.perkiraan_pengadaan
    let pihak_pengguna = req.body.pihak_pengguna
    let ekatalog = req.body.ekatalog
    let tingkat_prioritas = req.body.tingkat_prioritas
    let perkiraan_biaya = req.body.perkiraan_biaya
    let kegunaan = req.body.kegunaan
    let spesifikasi = req.body.spesifikasi
    let kebutuhan_riil = req.body.kebutuhan_riil
    let jumlah_pegawai = req.body.jumlah_pegawai
    let tingkat_beban_tugas = req.body.tingkat_beban_tugas
    let jumlah_barang_tersedia = req.body.jumlah_barang_tersedia
    let existing_bmut = req.body.existing_bmut  
    let kondisi_baik = req.body.kondisi_baik
    let kondisi_rusak_ringan = req.body.kondisi_rusak_ringan
    let kondisi_rusak_berat = req.body.kondisi_rusak_berat
    let pnbp = req.body.pnbp
    let rm = req.body.rm
    let barang_pasar = req.body.barang_pasar
    let produsen_syarat = req.body.produsen_syarat
    let persyaratan_barang = req.body.persyaratan_barang
    let sedikit_tkdn = req.body.sedikit_tkdn
    let cara_pengiriman = req.body.cara_pengiriman
    let cara_pengakuan = req.body.cara_pengakuan
    let cara_pemasangan = req.body.cara_pemasangan
    let cara_penimbunan = req.body.cara_penimbunan
    let cara_pengoperasian = req.body.cara_pengoperasian
    let kebutuhan_pelatihan = req.body.kebutuhan_pelatihan
    let aspek_pengadaan = req.body.aspek_pengadaan
    let barang_sejenis = req.body.barang_sejenis
    let konsolidasi = req.body.konsolidasi

    return db.transaction()
    .then((t) => {
        RefIdentifikasiKebutuhan1.findAll({
            where : {
                kode_kegiatan_rkt : kode_kegiatan_rkt, 
                kode_asset : kode_asset
            }
        })
        .then((kebutuhan1) => {
            if(kebutuhan1.length !== 0) {
                const error = new Error("Data Sudah Ada")
                error.statusCode = 422
                throw error
            }
            return RefIdentifikasiKebutuhan1.create({
                kode_kegiatan_rkt : kode_kegiatan_rkt,
                kode_asset : kode_asset, 
                waktu_pemanfaatan : waktu_pemanfaatan,
                perkiraan_pengadaan : perkiraan_pengadaan,
                pihak_pengguna : pihak_pengguna,
                ekatalog : ekatalog, 
                tingkat_prioritas : tingkat_prioritas, 
                perkiraan_biaya : perkiraan_biaya,
                kegunaan : kegunaan,
                spesifikasi : spesifikasi, 
                kebutuhan_riil : kebutuhan_riil, 
            }, {transaction : t})
            .then((insert1) => {
                if(!insert1) {
                    const error = new Error("Data Gagal Masuk")
                    error.statusCode = 422
                    throw error
                }
                return RefIdentifikasiKebutuhan2.create({
                    kode_kegiatan_rkt : kode_kegiatan_rkt,
                    kode_asset : kode_asset,
                    jumlah_pegawai : jumlah_pegawai, 
                    tingkat_beban_tugas : tingkat_beban_tugas,
                    jumlah_barang_tersedia : jumlah_barang_tersedia
                },{transaction : t})
                .then((insert2) => {
                    if(!insert2) {
                        const error = new Error("Data Gagal Masuk")
                        error.statusCode = 422
                        throw error
                    }
                    return RefIdentifikasiKebutuhan3.create({
                        kode_kegiatan_rkt : kode_kegiatan_rkt,
                        kode_asset : kode_asset,
                        existing_bmut : existing_bmut,
                        kondisi_baik : kondisi_baik,
                        kondisi_rusak_ringan : kondisi_rusak_ringan,
                        kondisi_rusak_berat : kondisi_rusak_berat,
                        pnbp : pnbp, 
                        rm : rm
                    }, {transaction :t})
                    .then((insert3) => {
                        if(!insert3) {
                            const error = new Error("Data Gagal Masuk")
                            error.statusCode = 422
                            throw error
                        }
                        return RefIdentifikasiKebutuhan4.create({
                            kode_kegiatan_rkt : kode_kegiatan_rkt,
                            kode_asset : kode_asset, 
                            barang_pasar : barang_pasar,
                            produsen_syarat : produsen_syarat,
                            persyaratan_barang : persyaratan_barang,
                            sedikit_tkdn : sedikit_tkdn
                        }, {transaction : t})
                        .then((insert4) => {
                            if(!insert4) {
                                const error = new Error("Data Gagal Masuk")
                                error.statusCode = 422
                                throw error
                            }
                            return RefIdentifikasiKebutuhan5.create({
                                kode_kegiatan_rkt : kode_kegiatan_rkt,
                                kode_asset : kode_asset, 
                                cara_pengiriman : cara_pengiriman, 
                                cara_pemasangan : cara_pemasangan, 
                                cara_pengakuan : cara_pengakuan,
                                cara_penimbunan : cara_penimbunan, 
                                cara_pengoperasian : cara_pengoperasian, 
                                kebutuhan_pelatihan : kebutuhan_pelatihan, 
                                aspek_pengadaan : aspek_pengadaan
                            },{transaction : t})
                            .then((insert5) => {
                                if(!insert5) {
                                    const error = new Error("Data Gagal Masuk")
                                    error.statusCode = 422
                                    throw error
                                }
                                return RefIdentifikasiKebutuhan6.create({
                                    kode_kegiatan_rkt : kode_kegiatan_rkt,
                                    kode_asset : kode_asset, 
                                    barang_sejenis : barang_sejenis, 
                                    konsolidasi : konsolidasi
                                }, {transaction : t})
                                .then((insert6) => {
                                    if(!insert6) {
                                        const error = new Error("Data Gagal Insert")
                                        error.statusCode = 422
                                        throw error
                                    }
                                    const request = req.body
                                    const data = request.kriteria_barang.map((item) => {
                                        return {
                                            kode_kegiatan_rkt : kode_kegiatan_rkt,
                                            kode_asset : kode_asset, 
                                            "kriteria_barang" : item
                                        }
                                    })
                                    console.log(data)
                                    return RefKriteriaBarang.bulkCreate(data)
                                    .then((kriteria) => {    
                                        return RkbmutPengadaanDetail.update({
                                            status_sippan : 1
                                        }, 
                                        {
                                            where : {
                                                kode_kegiatan_rkt : kode_kegiatan_rkt, 
                                                kode_asset : kode_asset
                                            },
                                            transaction : t
                                        })
                                        .then((update_rkbm) => {
                                            if(!update_rkbm) {
                                                const error = new Error("Data Gagal Update")
                                                error.statusCode = 422
                                                throw error
                                            }
                                            t.commit()
                                            return res.json({
                                                status : "Success", 
                                                message : "Data Identifikasi Berhasil Ditambah",
                                                data : {
                                                    "identifikasi_kebutuhan1" : insert1,
                                                    "identifikasi_kebutuhan2" : insert2, 
                                                    "identifikasi_kebutuhan3" : insert3, 
                                                    "identifikasi_kebutuhan4" : insert4, 
                                                    "identifikasi_kebutuhan5" : insert5,
                                                    "identifikasi_kebutuhan6" : insert6, 
                                                    "update_rkbm" : update_rkbm
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        .catch((err) => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            t.rollback()
            return next(err)
        });
    })
}

//Get All Form
exports.indexsippan = (req, res, next) => {
    let params = {
        kode_kegiatan_rkt : req.params.kode_kegiatan_rkt, 
        kode_asset : req.params.kode_asset
    }
    return RefIdentifikasiKebutuhan1.findAll({
        where : params, 
        include : [
            {
                model : Asset
            },
            {
                model : RkbmutPengadaanHeader
            }
        ]
    })
    .then((identifikasi1) => {
        return RefIdentifikasiKebutuhan2.findAll({
            where : params
        })
        .then((identifikasi2) => {
            return RefIdentifikasiKebutuhan3.findAll({
                where : params
            })
            .then((identifikasi3) => {
                return RefIdentifikasiKebutuhan4.findAll({
                    where : params
                })
                .then((identifikasi4) => {
                    return RefKriteriaBarang.findAll({
                        where : params
                    })
                    .then((kriteria) => {
                        return RefIdentifikasiKebutuhan5.findAll({
                            where : params
                        })
                        .then((identifikasi5) => {
                            return res.json({
                                status : "Success", 
                                message : "Berhasil Menampilkan Data",
                                data : {
                                    "identifikasi1" : identifikasi1,
                                    "identifikasi2" : identifikasi2,
                                    "identifikasi3" : identifikasi3,
                                    "identifikasi4" : identifikasi4, 
                                    "kriteria" : kriteria,
                                    "identifikasi5" : identifikasi5
                                }
                            })
                        })
                    })
                })
            })
        })
    })
}

exports.updatesippan = (req, res, next) => {
    let kode_kegiatan_rkt = req.body.kode_kegiatan_rkt
    let kode_asset = req.body.kode_asset
    let waktu_pemanfaatan = req.body.waktu_pemanfaatan
    let perkiraan_pengadaan = req.body.perkiraan_pengadaan
    let pihak_pengguna = req.body.pihak_pengguna
    let ekatalog = req.body.ekatalog
    let tingkat_prioritas = req.body.tingkat_prioritas
    let perkiraan_biaya = req.body.perkiraan_biaya
    let kegunaan = req.body.kegunaan
    let spesifikasi = req.body.spesifikasi
    let kebutuhan_riil = req.body.kebutuhan_riil
    let jumlah_pegawai = req.body.jumlah_pegawai
    let tingkat_beban_tugas = req.body.tingkat_beban_tugas
    let jumlah_barang_tersedia = req.body.jumlah_barang_tersedia
    let existing_bmut = req.body.existing_bmut  
    let kondisi_baik = req.body.kondisi_baik
    let kondisi_rusak_ringan = req.body.kondisi_rusak_ringan
    let kondisi_rusak_berat = req.body.kondisi_rusak_berat
    let pnbp = req.body.pnbp
    let rm = req.body.rm
    let barang_pasar = req.body.barang_pasar
    let produsen_syarat = req.body.produsen_syarat
    let persyaratan_barang = req.body.persyaratan_barang
    let sedikit_tkdn = req.body.sedikit_tkdn
    let cara_pengiriman = req.body.cara_pengiriman
    let cara_pengakuan = req.body.cara_pengakuan
    let cara_pemasangan = req.body.cara_pemasangan
    let cara_penimbunan = req.body.cara_penimbunan
    let cara_pengoperasian = req.body.cara_pengoperasian
    let kebutuhan_pelatihan = req.body.kebutuhan_pelatihan
    let aspek_pengadaan = req.body.aspek_pengadaan
    let param = {
        kode_kegiatan_rkt : parseInt(req.params.kode_kegiatan_rkt), 
        kode_asset : req.params.kode_asset
    }
    let barang_sejenis = req.body.barang_sejenis
    let konsolidasi = req.body.konsolidasi

    return db.transaction()
    .then((t) => {
        return RefIdentifikasiKebutuhan1.findAll({
            where : param
        })
        .then((kebutuhan1) => {
            return RefIdentifikasiKebutuhan1.update({
                waktu_pemanfaatan : waktu_pemanfaatan,
                perkiraan_pengadaan : perkiraan_pengadaan,
                pihak_pengguna : pihak_pengguna,
                ekatalog : ekatalog, 
                tingkat_prioritas : tingkat_prioritas, 
                perkiraan_biaya : perkiraan_biaya,
                kegunaan : kegunaan,
                spesifikasi : spesifikasi, 
                kebutuhan_riil : kebutuhan_riil, 
            }, 
            {
                where : param,
                transaction : t
            })
            .then((update1) => {
                if(!update1) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422
                    throw error
                }
                return RefIdentifikasiKebutuhan2.findAll({
                    where : param
                })
                .then((kebutuhan2) => {
                    return RefIdentifikasiKebutuhan2.update({
                        kode_kegiatan_rkt : kode_kegiatan_rkt,
                        kode_asset : kode_asset,
                        jumlah_pegawai : jumlah_pegawai, 
                        tingkat_beban_tugas : tingkat_beban_tugas,
                        jumlah_barang_tersedia : jumlah_barang_tersedia
                    }, 
                    {
                        where : param,
                        transaction : t
                    })
                    .then((update2) => {
                        if(!update2) {
                            const error = new Error("Data Gagal Update")
                            error.statusCode = 422
                            throw error
                        }
                        return RefIdentifikasiKebutuhan3.findAll({
                            where : param
                        })
                        .then((kebutuhan3) => {
                            return RefIdentifikasiKebutuhan3.update({
                                kode_kegiatan_rkt : kode_kegiatan_rkt,
                                kode_asset : kode_asset,
                                existing_bmut : existing_bmut,
                                kondisi_baik : kondisi_baik,
                                kondisi_rusak_ringan : kondisi_rusak_ringan,
                                kondisi_rusak_berat : kondisi_rusak_berat,
                                pnbp : pnbp, 
                                rm : rm
                            },{
                                where : param, 
                                transaction : t
                            })
                            .then((update3) => {
                                if(!update3) {
                                    const error = new Error("Data Gagal Update")
                                    error.statusCode = 422
                                    throw error
                                }
                                return RefIdentifikasiKebutuhan4.findAll({
                                    where : param
                                })
                                .then((kebutuhan4) => {
                                    return RefIdentifikasiKebutuhan4.update({
                                        kode_kegiatan_rkt : kode_kegiatan_rkt,
                                        kode_asset : kode_asset, 
                                        barang_pasar : barang_pasar,
                                        produsen_syarat : produsen_syarat,
                                        persyaratan_barang : persyaratan_barang,
                                        sedikit_tkdn : sedikit_tkdn
                                    }, 
                                    {
                                        where : param, 
                                        transaction : t
                                    })
                                    .then((update4) => {
                                        if(!update4) {
                                            const error = new Error("Data Gagal Update")
                                            error.statusCode = 422
                                            throw error
                                        }
                                        return RefIdentifikasiKebutuhan5.findAll({
                                            where : param
                                        })
                                        .then((kebutuhan5) => {
                                            return RefIdentifikasiKebutuhan5.update({
                                                cara_pengiriman : cara_pengiriman, 
                                                cara_pemasangan : cara_pemasangan, 
                                                cara_pengakuan : cara_pengakuan,
                                                cara_penimbunan : cara_penimbunan, 
                                                cara_pengoperasian : cara_pengoperasian, 
                                                kebutuhan_pelatihan : kebutuhan_pelatihan, 
                                                aspek_pengadaan : aspek_pengadaan
                                            },
                                            {
                                                where : param, 
                                                transaction : t
                                            })
                                            .then((update5) => {
                                                if(!update5) {
                                                    const error = new Error("Data Gagal Update")
                                                    error.statusCode = 422
                                                    throw error
                                                }
                                                return RefIdentifikasiKebutuhan6.update({
                                                    barang_sejenis : barang_sejenis, 
                                                    konsolidasi : konsolidasi
                                                },  {
                                                    where : param,
                                                    transaction : t
                                                })
                                                .then((update6) => {
                                                    if(!update6) {
                                                        const error = new Error("Data Gagal Update")
                                                        error.statusCode = 422
                                                        throw error
                                                    }
                                                    return RefKriteriaBarang.findAll({
                                                        where : param,
                                                        raw : true
                                                    })
                                                    .then((krit)=> {
                                                        if(krit.length !== 0) {
                                                            return RefKriteriaBarang.destroy({
                                                              where : param,
                                                              transaction : t
                                                            })
                                                            .then((destroy) => {
                                                              if(!destroy) {
                                                                  const error = new Error("Data Gagal Hapus")
                                                                  error.statusCode = 422
                                                                  throw error
                                                              }
                                                              const request = req.body
                                                              const data = request.kriteria_barang.map((item) => {
                                                                  return {
                                                                      kode_kegiatan_rkt : parseInt(req.params.kode_kegiatan_rkt),
                                                                      kode_asset : req.params.kode_asset, 
                                                                      "kriteria_barang" : item
                                                                  }
                                                              })
                                                              console.log(data)
                                                              return RefKriteriaBarang.bulkCreate(data, {transaction : t})
                                                              .then((kriteria) => {
                                                                  if(!kriteria) {
                                                                      const error = new Error("Gagal Insert kriteria")
                                                                      error.statusCode = 422
                                                                      throw error
                                                                  }
                                                                  return t.commit()
                                                                  .then(() => {
                                                                      return res.json({
                                                                          status : "Success", 
                                                                          message : "Data Berhasil Di Update",
                                                                          data : {
                                                                              "update1" : update1,
                                                                              "update2" : update2,
                                                                              "update3" : update3,
                                                                              "update4" : update4,
                                                                              "update5" : update5,
                                                                              "update6" : update6
                                                                          }
                                                                      })
                                                                  })
                                                              })
                                                            })
                                                        }
                                                        const request = req.body
                                                              const data = request.kriteria_barang.map((item) => {
                                                                  return {
                                                                      kode_kegiatan_rkt : parseInt(req.params.kode_kegiatan_rkt),
                                                                      kode_asset : req.params.kode_asset, 
                                                                      "kriteria_barang" : item
                                                                  }
                                                              })
                                                              console.log(data)
                                                              return RefKriteriaBarang.bulkCreate(data, {transaction : t})
                                                              .then((kriteria) => {
                                                                  if(!kriteria) {
                                                                      const error = new Error("Gagal Insert kriteria")
                                                                      error.statusCode = 422
                                                                      throw error
                                                                  }
                                                                  return t.commit()
                                                                  .then(() => {
                                                                      return res.json({
                                                                          status : "Success", 
                                                                          message : "Data Berhasil Di Update",
                                                                          data : {
                                                                              "update1" : update1,
                                                                              "update2" : update2,
                                                                              "update3" : update3,
                                                                              "update4" : update4,
                                                                              "update5" : update5,
                                                                              "update6" : update6
                                                                          }
                                                                      })
                                                                  })
                                                              })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
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

//Revisi 
exports.revisisippan = (req, res, next) => {
    
}