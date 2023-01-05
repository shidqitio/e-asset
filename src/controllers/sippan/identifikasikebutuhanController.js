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
const {Op, where} = require("sequelize")



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

//Kirim Ke Kasubdit 
exports.kirimkasubdit = (req, res, next) => {
    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja,
    }
    return RkbmutPengadaanDetail.findAll({
        where : {
            kode_unit_kerja : param.kode_unit_kerja,
            status_sippan_posisi : 0,
            status_sippan : 1
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
            if(rkbm.length !== 0 ) {
                const error = new Error("Data Belum Siap Kirim")
                error.statusCode = 422
                throw error
            }
            console.log(rkbm)
            return RkbmutPengadaanDetail.update({ 
                status_sippan_posisi : 1
            }, 
            {
                where : param
            })
            .then((data) => {
                if(!data) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422 
                    throw error
                }
                return res.json({
                    status : "Success", 
                    message : "Data Berhasil di Kirim ke Kasubdit",
                    data : data
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

//REVISI KASUBDIT
exports.komentar = (req, res, next) => {
    let param = {
        kode_kegiatan_rkt : parseInt(req.params.kode_kegiatan_rkt), 
        kode_asset : req.params.kode_asset
    }
    let komentar_identifikasi1 = req.body.komentar_identifikasi1
    let komentar_identifikasi2 = req.body.komentar_identifikasi2
    let komentar_identifikasi3 = req.body.komentar_identifikasi3
    let komentar_identifikasi4 = req.body.komentar_identifikasi4
    let komentar_identifikasi5 = req.body.komentar_identifikasi5
    let komentar_identifikasi6 = req.body.komentar_identifikasi6
    return db.transaction()
    .then((t) => {
        console.log(param.kode_kegiatan_rkt)
        return RkbmutPengadaanDetail.findAll({
            where : {
                kode_kegiatan_rkt : param.kode_kegiatan_rkt,
                kode_asset : param.kode_asset,
                status_sippan_posisi : 1,
                [Op.or] : [
                    {
                        status_sippan : 1
                    },
                    {
                        status_sippan : 2
                    }, 
                    {
                        status_sippan : 3
                    }
                ]
            }, 
        })
        .then((rkbmut) => {
            if(rkbmut.length === 0) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422
                throw error
            }
            return RefIdentifikasiKebutuhan1.update({
                komentar : komentar_identifikasi1
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
                return RefIdentifikasiKebutuhan2.update({
                    komentar : komentar_identifikasi2
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
                    return RefIdentifikasiKebutuhan3.update({
                        komentar : komentar_identifikasi3
                    },
                    {
                        where : param, 
                        transaction : t
                    })
                    .then((update3) => {
                        if(!update3) {
                            const error = new Error("Data Gagal Update")
                            error.statusCode = 422
                            throw error
                        }
                        return RefIdentifikasiKebutuhan4.update({
                            komentar : komentar_identifikasi4
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
                            return RefIdentifikasiKebutuhan5.update({
                                komentar : komentar_identifikasi5
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
                                    komentar : komentar_identifikasi6
                                },
                                {
                                    where : param, 
                                    transaction : t
                                })
                                .then((update6) => {
                                    if(!update6) {
                                        const error = new Error("Data Gagal Update")
                                        error.statusCode = 422
                                        throw error
                                    }
                                    if(komentar_identifikasi1 === "" && komentar_identifikasi2 === "" 
                                        && komentar_identifikasi3 === "" && komentar_identifikasi4 === "" 
                                        && komentar_identifikasi5 === "" && komentar_identifikasi6 === "") 
                                        {
                                            console.log("Jalankan Ini")
                                            return RkbmutPengadaanDetail.update({
                                                status_sippan : 4, 
                                                status_sippan_posisi : 1, 
                                            }, 
                                            {
                                                where : param,
                                                transaction : t
                                            })
                                            .then((detail) => {
                                                if(!detail) {
                                                    const error = new Error("Data Gagal Update")
                                                    error.statusCode = 422
                                                    throw error
                                                }
                                                t.commit()
                                                return res.json({
                                                    status : "Success", 
                                                    message : "Data Berhasil Update",
                                                    data : {
                                                        update1, update2, update3, update4, update5, update6, detail
                                                    }
                                                })
                                            })
                                        }
                                        console.log("coba ini")
                                        return RkbmutPengadaanDetail.update({
                                            status_sippan : 2, 
                                            status_sippan_posisi : 1
                                        }, 
                                        {
                                            where : param,
                                            transaction : t
                                        })
                                        .then((detail) => {
                                            if(!detail) {
                                                const error = new Error("Data Gagal Update")
                                                error.statusCode = 422
                                                throw error
                                            }
                                            t.commit()
                                            return res.json({
                                                status : "Success", 
                                                message : "Data Berhasil Update",
                                                data : {
                                                    update1, update2, update3, update4, update5, update6, detail
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
        .catch((err) => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            t.rollback()
            return next(err);
        });
    })
}

//Kirim Balik Unit 
exports.kirimunit = (req, res, next) => {
    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja
    }
    return RkbmutPengadaanHeader.findAll({
        where : {
            kode_unit_kerja : param.kode_unit_kerja,
            tahun : req.params.tahun
        },
        include : [
            {
                model : RkbmutPengadaanDetail,
                where : {
                    [Op.or] : [
                        {
                            status_sippan : 2
                        },
                        {
                            status_sippan : 4
                        }
                    ],
                    status_sippan_posisi : 1
                }
            }
        ]
    })
    .then((exist) => {
        if(exist.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return RkbmutPengadaanHeader.findAll({
            where : {
                kode_unit_kerja : param.kode_unit_kerja, 
                tahun : req.params.tahun
            },
            include : [
                {
                    model : RkbmutPengadaanDetail,
                    where : {
                        kode_unit_kerja : param.kode_unit_kerja, 
                        [Op.or] : [
                            {
                                [Op.and] : [
                                    {
                                        status_sippan : {
                                            [Op.not] : 2
                                        }
                                    },
                                    {
                                        status_sippan : {
                                            [Op.not] : 4
                                        }
                                    },
                                    
                                ],
                            },
                            {
                                status_sippan_posisi : {
                                    [Op.not] : 1
                                }
                            }
                        ],
                    },
                    required : true,
                }
            ],
            raw : true
        })
        .then((cekrkbmut) => {
            if(cekrkbmut.length !== 0) {
                const error = new Error("Data Belum Siap Dikirim")
                error.statusCode = 422
                throw error
            }
            console.log(cekrkbmut)
            return RkbmutPengadaanHeader.findAll({
                where : {
                    kode_unit_kerja : param.kode_unit_kerja,
                    tahun : req.params.tahun
                },
                include : [
                    {
                        model : RkbmutPengadaanDetail,
                        where : {
                            kode_unit_kerja : param.kode_unit_kerja,
                            [Op.or] : [
                                {
                                    status_sippan_posisi : {
                                        [Op.not] : 1
                                    }
                                },
                                {
                                    status_sippan : {
                                        [Op.not] : 4
                                    }
                                }
                                
                            ], 
                            
                        }
                    }
                ]
            })
            .then((ceksetuju) => {
                if(ceksetuju.length !== 0 ) {
                    return RkbmutPengadaanDetail.update({
                        status_sippan_posisi : 0
                    }, 
                    {
                        where : param
                    })
                    .then((update) => {
                        if(!update) {
                            const error = new Error("Data Gagal Update")
                            error.statusCode = 422
                            throw error
                        }
                        return res.json({
                            status : "Success",
                            message : "Data Berhasil Kembali Ke Unit",
                            data : update
                        })
                    })
                }
                return RkbmutPengadaanDetail.update({
                    status_sippan : 5, 
                    status_sippan_posisi : 0
                }, 
                {
                    where : param
                })
                .then((update) => {
                    if(!update) {
                        const error = new Error("Data Gagal Update")
                        error.statusCode = 422
                        throw error
                    }
                    return res.json({
                        status : "Success",
                        message : "Data Berhasil Kembali Ke Unit",
                        data : update
                    })
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

//Kirim Revisian Unit ke Kasubdit
exports.kirimrevisiunit = (req, res, next) => {
    let param = {
        kode_unit_kerja : req.params.kode_unit_kerja,
    }
    return RkbmutPengadaanDetail.findAll({
        where : {
            kode_unit_kerja : param.kode_unit_kerja,
            status_sippan_posisi : 0,
            [Op.or] : [
                {
                    status_sippan : 3, 
                }, 
                {
                    status_sippan : 4
                }
            ]
            
            
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
                        [Op.or] : [
                            {
                                [Op.and] : [
                                    {
                                        status_sippan : {
                                            [Op.not] : 3
                                        }
                                    },
                                    {
                                        status_sippan : {
                                            [Op.not] : 4
                                        }
                                    },
                                    
                                ],
                            },
                            {
                                status_sippan_posisi : {
                                    [Op.not] : 0
                                }
                            }
                        ],
                    },
                    required : true
                }
            ],
            raw : true
        })
        .then((rkbm) => {
            if(rkbm.length !== 0 ) {
                const error = new Error("Data Belum Siap Kirim")
                error.statusCode = 422
                throw error
            }
            console.log(rkbm)
            return RkbmutPengadaanDetail.update({ 
                status_sippan_posisi : 1, 
            }, 
            {
                where : param
            })
            .then((data) => {
                if(!data) {
                    const error = new Error("Data Gagal Update")
                    error.statusCode = 422 
                    throw error
                }
                return res.json({
                    status : "Success", 
                    message : "Data Berhasil di Kirim ke Kasubdit",
                    data : data
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

//Update Revisi Komentar Dari Kasubdik
exports.updaterevisi = (req, res, next) => {
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
        return RkbmutPengadaanDetail.findAll({
            where : {
                kode_kegiatan_rkt : param.kode_kegiatan_rkt, 
                kode_asset : param.kode_asset, 
                status_sippan : 2, 
                status_sippan_posisi : 0
            }
        })
        .then((detil) => {
            if(detil.length === 0) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422
                throw error
            }
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
                                                        return RkbmutPengadaanDetail.update({
                                                            status_sippan : 3
                                                        }, {
                                                            where : param, 
                                                            transaction : t
                                                        })
                                                        .then((rkbm_up) => {
                                                            if(!rkbm_up) {
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
                                                                                      "update6" : update6, 
                                                                                      "rkbmut" : rkbm_up
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
                                                                                      "update6" : update6,
                                                                                      "rkbmut" : rkbm_up
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