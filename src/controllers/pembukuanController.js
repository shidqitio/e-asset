const PembukuanDetail = require("../models/pembukuan")
const DaftarBarang = require("../models/daftarBarang")
const Asset = require("../models/asset")
const TrxKibTanah = require("../models/trxKibTanah")
const TrxKibAngkutan = require("../models/trxKibAngkutan")
const TrxKibAlatbesar = require("../models/trxKibBesar")
const TrxKibBangunan = require("../models/trxKibBangunan")
const TrxKibBangunanAir = require("../models/trxKibBangunanAir")
const db = require("../config/database")
const {QueryTypes, Op, where} = require("sequelize")
const Ruang = require("../models/ruang")
const StatusPemilik = require("../models/statusPemilik")
const sequelize = require("sequelize")
const DokumenTanah = require("../models/dokumenTanah")
const RkbmutPemeliharaanDetail = require("../models/rkbmutPemeliharaanDetail")
const axios = require("axios")
require("dotenv").config();


exports.indexdetail = (req, res, next) => {
    PembukuanDetail.findAll()
    .then((data) => {
        res.json({
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

//Antrian NUP 
exports.antrean = (req, res, next) => {
    PembukuanDetail.findAll({
        include : [
            {
                model : Asset
            },
            {
            model : DaftarBarang, 
            where : {
                kode_asset_nup : {
                    [Op.eq] : null
                }
            }
        }]
    })
    .then((data) => {
        res.json({
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

//Antrian NUP 
exports.antreannupeproc = (req, res, next) => {
    PembukuanDetail.findAll({
        where : {
            no_sppa : "A0222"
        },
        include : [
            {
                model : Asset
            },
            {
            model : DaftarBarang, 
            where : {
                kode_asset_nup : {
                    [Op.eq] : null
                }, 
            }
        }]
    })
    .then((data) => {
        res.json({
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

//Get Data By Kode Form 
exports.showbykodeform = (req, res, next) => {
    PembukuanDetail.findOne({
        where : {
            kode_pembukuan : req.params.kode_pembukuan
        }, 
        include: [
            {
                model : DaftarBarang
            }
        ]
    })
    .then((data) => {
        if(!data) {
            const error = new Error("Data Barang Tidak Ada");
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

exports.store = (req, res, next) => {
    return db.transaction()
    .then((t) => {
        PembukuanDetail.findAll({
            where : {
                no_sppa : req.body.no_sppa
            }, 
            order : [
                [
                    "udcr","ASC"
                ]
            ]
        })
        .then((data) => {
            let kode = JSON.parse(JSON.stringify(data))
            let index = data.length
            if(data.length === 0) {
                let no_sppa = req.body.no_sppa ; 
                hasil_kode = no_sppa + 1
            }
            else{
                const {kode_pembukuan} = kode[index-1];
                let no_sppa = req.body.no_sppa;
                let hasil = kode_pembukuan.substring(5);
                hasil = parseInt(hasil);
                let kode_akhir = hasil + 1;
                hasil_kode = no_sppa + JSON.stringify(kode_akhir)
                console.log("Tes Data Aja :",kode_pembukuan)
            }
            const jumlah_barang = req.body.jumlah_barang
            const nilai_item = req.body.nilai_item
            return PembukuanDetail.create({
                kode_asset : req.body.kode_asset, 
                no_sppa : req.body.no_sppa,
                kode_pembukuan : hasil_kode, 
                jumlah_barang : req.body.jumlah_barang, 
                asal_perolehan : req.body.asal_perolehan, 
                no_bukti_perolehan : req.body.no_bukti_perolehan, 
                tanggal_perolehan : req.body.tanggal_perolehan,
                tanggal_pembukuan : req.body.tanggal_pembukuan, 
                keterangan : req.body.keterangan, 
                merk : req.body.merk, 
                nilai_item : req.body.nilai_item, 
                total_nilai : jumlah_barang * nilai_item, 
                dasar_harga : req.body.dasar_harga, 
                metode_penyusutan : req.body.metode_penyusutan, 
                catat : req.body.catat
            },{transaction : t})
            .then((pembukuan) => {     
                const kode_pembukuan = JSON.parse(JSON.stringify(pembukuan))
                // console.log("Coba :", kode_pembukuan.kode_asset)
                return Asset.findAll({
                    where : {
                        kode_asset : kode_pembukuan.kode_asset
                    },
                    raw : true
                })
                .then((ass) => {
                  if(ass.length === 0) {
                    const error = new Error("Data Tidak Ada")
                    error.statusCode = 422
                    throw error
                  }  
                  
                    if(kode_pembukuan.catat === "DBR" || kode_pembukuan.catat === "DBL") {
                    const request = req.body;
                    const data = request.barang.map((item) => {
                        return {
                            kode_barang : item.kode_barang, 
                            kode_pembukuan : kode_pembukuan.kode_pembukuan,
                            kode_asset : kode_pembukuan.kode_asset, 
                            nilai_item : kode_pembukuan.nilai_item,  
                            merk : kode_pembukuan.merk, 
                            tanggal_perolehan : kode_pembukuan.tanggal_perolehan,
                            kode_ruang : item.kode_ruang, 
                            deskripsi : item.deskripsi, 
                            kondisi : item.kondisi, 
                            optional_key : item.optional_key,
                        }
                    })
                    return DaftarBarang.bulkCreate(data, {transaction : t})
                    .then(() => {
                        return t.commit()
                    })
                    .then((respons) => {
                        res.json({
                            status : "Success", 
                            message : "Berhasil Menambah Data", 
                            data : respons
                        })
                    })
                    .catch((err) => {
                        if(!err.statusCode) {
                            err.statusCode = 500;
                        }
                        t.rollback();
                        return next(err);
                    })
                }
                else{
                    if(kode_pembukuan.kode_asset.match(/^2.*$/)) {
                        //Jika Kib Tanah
                        TrxKibTanah.findAll()
                        .then((data) => {
                            //Pemisah Kode dan Nama Unit
                            let unit = req.body.unit 
                            const split = unit.split("||")
                            let kode_unit = split[0]
                            let nama_unit = split[1]
                            //Perhitungan
                            let tanah_bangunan = req.body.tanah_bangunan;
                            let tanah_sarana = req.body.tanah_sarana; 
                            let tanah_kosong = req.body.tanah_kosong;
                            let tanah_seluruh = tanah_bangunan + tanah_sarana + tanah_kosong
                            let taksiran = req.body.harga_taksiran_satuan
                            let njop = req.body.harga_njop_satuan
                            let taksiran_total = taksiran * tanah_seluruh
                            let njop_total = njop * tanah_seluruh
                    
                            //perhitungan kode
                            if(data.length === 0) {
                                no_asset_tanah = 1
                            }
                            else {
                                //KODE
                                let kode = JSON.parse(JSON.stringify(data))
                                let index = data.length
                                const {no_asset} = kode[index-1]
                                no_asset_tanah = no_asset + 1
                            }
                            
                            return TrxKibTanah.create({
                                kode_asset : req.body.kode_asset, 
                                kode_status_pemilik : req.body.kode_status_pemilik, 
                                kode_pembukuan : kode_pembukuan.kode_pembukuan,
                                kode_dokumen : req.body.kode_dokumen,
                                no_asset : no_asset_tanah, 
                                no_sppa : kode_pembukuan.no_sppa, 
                                kode_unit : kode_unit, 
                                nama_unit : nama_unit, 
                                alamat : req.body.alamat,
                                longitude : req.body.longitude, 
                                latitude : req.body.latitude, 
                                tanah_bangunan : req.body.tanah_bangunan, 
                                tanah_sarana : req.body.tanah_sarana, 
                                tanah_kosong : req.body.tanah_kosong, 
                                tanah_seluruh : tanah_seluruh,
                                batas_utara : req.body.batas_utara, 
                                batas_timur : req.body.batas_timur, 
                                batas_barat : req.body.batas_barat, 
                                batas_selatan : req.body.batas_selatan, 
                                no_dokumen : req.body.no_dokumen, 
                                tanggal_dokumen : req.body.tanggal_dokumen, 
                                instansi_penerbit : req.body.instansi_penerbit, 
                                dana : req.body.dana, 
                                tanggal_dana : req.body.tanggal_dana, 
                                harga_taksiran_satuan : req.body.harga_taksiran_satuan, 
                                harga_njop_satuan : req.body.harga_njop_satuan, 
                                harga_taksiran_total :  taksiran_total , 
                                harga_njop_total : njop_total, 
                                catatan : req.body.catatan,
                            },{transaction : t})
                            .then(() => {
                                return t.commit()
                            })
                            .then((respons) => {
                                res.json({
                                    status : "Success", 
                                    message : "Berhasil Menambah Data", 
                                    data : respons
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
                    else if(kode_pembukuan.kode_asset.match(/^302.*$/) && ass[0].kode_kartu == 3) {
                    //Jika Kib Angkutan
                    TrxKibAngkutan.findAll()
                    .then((data) => {
                    //Pemisah Kode dan Nama Unit
                    let unit = req.body.unit 
                    const split = unit.split("||")
                    let kode_unit = split[0]
                    let nama_unit = split[1]

                    //perhitungan kode
                    if(data.length === 0) {
                        no_asset_angkutan = 1
                    }
                    else {
                        //KODE
                        let kode = JSON.parse(JSON.stringify(data))
                        let index = data.length
                        const {no_asset} = kode[index-1]
                        no_asset_angkutan = no_asset + 1
                    }

                    return TrxKibAngkutan.create({
                        kode_status_pemilik : req.body.kode_status_pemilik, 
                        kode_pembukuan : kode_pembukuan.kode_pembukuan,
                        kode_asset : kode_pembukuan.kode_asset, 
                        no_asset : no_asset_angkutan, 
                        no_sppa : kode_pembukuan.no_sppa, 
                        kode_unit : kode_unit, 
                        nama_unit : nama_unit, 
                        tahun_pembuatan : req.body.tahun_pembuatan, 
                        pabrik : req.body.pabrik, 
                        negara : req.body.negara,
                        perakitan : req.body.perakitan, 
                        daya_muat : req.body.daya_muat, 
                        bobot : req.body.bobot, 
                        daya_mesin : req.body.daya_mesin, 
                        mesin_penggerak : req.body.mesin_penggerak, 
                        jumlah_mesin : req.body.jumlah_mesin, 
                        bahan_bakar : req.body.bahan_bakar, 
                        no_mesin : req.body.no_mesin, 
                        no_rangka : req.body.no_rangka,
                        no_bpkp : req.body.no_bpkp, 
                        no_polisi : req.body.no_polisi, 
                        perlengkapan1 : req.body.perlengkapan1,
                        perlengkapan2 : req.body.perlengkapan2,
                        perlengkapan3 : req.body.perlengkapan3,
                        sumber_dana : req.body.sumber_dana, 
                        no_dana : req.body.no_dana,
                        tanggal_dana : req.body.tanggal_dana,
                        harga_wajar : req.body.harga_wajar, 
                        catatan : req.body.catatan
                            },{transaction : t})
                        })
                        .then(() => {
                            return t.commit()
                        })
                        .then((respons) => {
                            res.json({
                                status : "Success", 
                                message : "Berhasil Menambah Data", 
                                data : respons
                            })
                        })
                        .catch((err) => {
                            if(!err.statusCode) {
                                err.statusCode = 500;
                            }
                            t.rollback();
                            return next(err);
                        })
                    }
                    // else if(kode_pembukuan.kode_asset.match(/^301.*$/)) {
                    //     //Jika Kib Alat  Besar
                    //     TrxKibAlatbesar.findAll()
                    //     .then((data) => {
                    //         //Pemisah Kode dan Nama Unit
                    //         let unit = req.body.unit 
                    //         const split = unit.split("||")
                    //         let kode_unit = split[0]
                    //         let nama_unit = split[1]

                    //         //perhitungan kode
                    //         if(data.length === 0) {
                    //             no_asset_alatbesar = 1
                    //         }
                    //         else {
                    //             //KODE
                    //             let kode = JSON.parse(JSON.stringify(data))
                    //             let index = data.length
                    //             const {no_asset} = kode[index-1]
                    //             no_asset_alatbesar = no_asset + 1
                    //         }

                    //         return TrxKibAlatbesar.create({
                    //             kode_asset : kode_pembukuan.kode_asset, 
                    //             kode_status_pemilik : req.body.kode_status_pemilik, 
                    //             kode_unit : kode_unit, 
                    //             nama_unit : nama_unit,
                    //             no_asset : no_asset_alatbesar, 
                    //             kode_pembukuan : kode_pembukuan.kode_pembukuan, 
                    //             merk : kode_pembukuan.merk, 
                    //             type : req.body.type, 
                    //             tahun_pembuatan : req.body.tahun_pembuatan,
                    //             pabrik : req.body.pabrik, 
                    //             perakitan : req.body.perakitan, 
                    //             negara : req.body.negara,
                    //             kapasitas : req.body.kapasitas, 
                    //             sistem_pendingin : req.body.sistem_pendingin,
                    //             sistem_operasi : req.body.sistem_operasi, 
                    //             sistem_pembakar : req.body.sistem_pembakar, 
                    //             dudukan_peralatan : req.body.dudukan_peralatan, 
                    //             power_train : req.body.power_train, 
                    //             no_mesin : req.body.no_mesin, 
                    //             no_rangka : req.body.no_rangka, 
                    //             perlengkapan1 : req.body.perlengkapan1,
                    //             perlengkapan2 : req.body.perlengkapan2,
                    //             perlengkapan3 : req.body.perlengkapan3,
                    //             sumber_dana : req.body.sumber_dana,
                    //             no_dana : req.body.no_dana, 
                    //             tanggal_dana : req.body.tanggal_dana, 
                    //             harga_wajar : req.body.harga_wajar, 
                    //             catatan : req.body.catatan
                    //         },{transaction : t})
                    //     })
                    //     .then(() => {
                    //         return t.commit()
                    //     })
                    //     .then((respons) => {
                    //         res.json({
                    //             status : "Success", 
                    //             message : "Berhasil Menambah Data", 
                    //             data : respons
                    //         })
                    //     })
                    //     .catch((err) => {
                    //         if(!err.statusCode) {
                    //             err.statusCode = 500;
                    //         }
                    //         t.rollback();
                    //         return next(err);
                    //     })
                    // }
                    //JIKA KIB BANGUNAN
                    else if(kode_pembukuan.kode_asset.match(/^4.*$/) || kode_pembukuan.kode_asset.match(/^503.*$/) || kode_pembukuan.kode_asset.match(/^504.*$/)) {
                        TrxKibBangunan.findAll()
                        .then((data) => {
                            //Pemisah Kode dan Nama Unit
                            let unit = req.body.unit 
                            const split = unit.split("||")
                            let kode_unit = split[0]
                            let nama_unit = split[1]

                            //perhitungan kode
                            if(data.length === 0) {
                                no_asset_bangunan = 1
                            }
                            else {
                                //KODE
                                let kode = JSON.parse(JSON.stringify(data))
                                let index = data.length
                                const {no_asset} = kode[index-1]
                                no_asset_bangunan = no_asset + 1
                            }

                            return TrxKibBangunan.create({
                                kode_asset : kode_pembukuan.kode_asset, 
                                kode_status_pemilik : req.body.kode_status_pemilik, 
                                kode_unit : kode_unit, 
                                nama_unit : nama_unit, 
                                no_asset : no_asset_bangunan, 
                                nup_tanah : req.body.nup_tanah,
                                kode_pembukuan : kode_pembukuan.kode_pembukuan, 
                                luas_bangunan : req.body.luas_bangunan, 
                                luas_dasar_bangunan : req.body.luas_dasar_bangunan, 
                                jumlah_lantai : req.body.jumlah_lantai, 
                                type : req.body.type, 
                                lokasi_bangunan : req.body.lokasi_bangunan,
                                tahun_bangun : req.body.tahun_bangun, 
                                tahun_guna : req.body.tahun_bangun,
                                pdf : req.body.pdf,
                                sumber_dana : req.body.sumber_dana,
                                no_dana : req.body.no_dana, 
                                tanggal_dana : req.body.tanggal_dana,
                                nilai_wajar : req.body.nilai_wajar,
                                njop : req.body.njop,
                                catatan : req.body.catatan
                            },{transaction : t})
                        })
                        .then(() => {
                            return t.commit()
                        })
                        .then((respons) => {
                            res.json({
                                status : "Success", 
                                message : "Berhasil Menambah Data", 
                                data : respons
                            })
                        })
                    }
                    else if(kode_pembukuan.kode_asset.match(/^502.*$/)) {
                        TrxKibBangunan.findAll()
                        .then((data) => {
                            //Pemisah Kode dan Nama Unit
                            let unit = req.body.unit 
                            const split = unit.split("||")
                            let kode_unit = split[0]
                            let nama_unit = split[1]

                            //perhitungan kode
                            if(data.length === 0) {
                                no_asset_bangunan = 1
                            }
                            else {
                                //KODE
                                let kode = JSON.parse(JSON.stringify(data))
                                let index = data.length
                                const {no_asset} = kode[index-1]
                                no_asset_bangunan = no_asset + 1
                            }

                            return TrxKibBangunanAir.create({
                                kode_asset : kode_pembukuan.kode_asset, 
                                kode_status_pemilik : req.body.kode_status_pemilik, 
                                kode_unit : kode_unit, 
                                nama_unit : nama_unit, 
                                no_asset : no_asset_bangunan, 
                                nup_tanah : req.body.nup_tanah,
                                kode_pembukuan : kode_pembukuan.kode_pembukuan, 
                                luas_bangunan : req.body.luas_bangunan, 
                                luas_dasar_bangunan : req.body.luas_dasar_bangunan, 
                                kapasitas : req.body.kapasitas, 
                                kuantitas : req.body.kuantitas, 
                                lokasi_bangunan : req.body.lokasi_bangunan,
                                tahun_bangun : req.body.tahun_bangun, 
                                tahun_guna : req.body.tahun_bangun,
                                pdf : req.body.pdf,
                                sumber_dana : req.body.sumber_dana,
                                no_dana : req.body.no_dana, 
                                tanggal_dana : req.body.tanggal_dana,
                                nilai_wajar : req.body.nilai_wajar,
                                njop : req.body.njop,
                                catatan : req.body.catatan
                            },{transaction : t})
                        })
                        .then(() => {
                            return t.commit()
                        })
                        .then((respons) => {
                            res.json({
                                status : "Success", 
                                message : "Berhasil Menambah Data", 
                                data : respons
                            })
                        })
                    }
                    else{
                        const error = new Error("Data Tidak Terdaftar")
                        error.statusCode = 422
                        throw error
                    }
                }  
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

// Get Tanah By UNit
exports.gettanahbyunit = (req, res, next) => {
    Asset.findAll({
        attributes : ["kode_asset", "nama_asset"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : TrxKibTanah, 
                attributes : ["kode_asset", "nup", "kode_status_pemilik"],
                where : {
                    kode_unit : req.params.kode_unit, 
                    nup : {
                        [Op.not] : null
                    }
                },
                required : true,
                include : [
                    {
                        model : StatusPemilik, 
                        attributes : ["kode_status_pemilik","nama_status_pemilik"]
                    }, 
                    {
                        model : DokumenTanah,
                        attributes : ["kode_dokumen", "nama_dokumen"]
                    }
                ]
            }, 
        ],
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}



//Get Barang By Unit
exports.getbarangbyunit = (req, res, next) => {
    DaftarBarang.findAll({
        attributes : [
            'kode_pembukuan', 
            'nup', 
            'kode_asset', 
            'merk',
            'nilai_item', 
            'udcr',
            [sequelize.fn('date_format', sequelize.col('tanggal_perolehan'),'%Y'),'tahun_perolehan']
        ],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : Ruang, 
                attributes : {exclude : ["udcr", "udch", "uch", "ucr"]}, 
                where : {
                    kode_unit : req.params.kode_unit
                }
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}

//Get Barang By Unit Filter
exports.getbarangbyunitfilter = (req, res, next) => {
    let p = []
    return RkbmutPemeliharaanDetail.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit
        },
        raw : true
    })
    .then((cek) => { 
       if (cek.length !== 0){
           const pemeliharaan = cek.map((item) => {
                return {
                    kode_asset : item.kode_asset
                }
            })
            
            console.log(pemeliharaan[0].kode_asset)
            for (let i = 0 ; pemeliharaan.length > i ; i++) {
                let pem = pemeliharaan[i].kode_asset 
                p.push({
                    kode_asset : {
                        [Op.not] : pemeliharaan[i].kode_asset
                    }, 
                })
            }
       } 
       p.push()
       return DaftarBarang.findAll({
            where : p,
            attributes : [
                'kode_pembukuan', 
                'nup', 
                'kode_asset', 
                'merk',
                'nilai_item', 
                'udcr',
                [sequelize.fn('date_format', sequelize.col('tanggal_perolehan'),'%Y'),'tahun_perolehan']
            ],
            order : [
                ['udcr','ASC']
            ],
            include : [
                {
                    model : Ruang, 
                    attributes : {exclude : ["udcr", "udch", "uch", "ucr"]}, 
                    where : {
                        kode_unit : req.params.kode_unit
                    }
                }
            ]
        })
        .then((data) => {
            
            if(data.length === 0) {
                const error = new Error("Data Tidak Ada")
                error.statusCode = 422 
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
            return next(err);
        })
    })
}

// Get Alat Besar By UNit
exports.getalatbesarbyunit = (req, res, next) => {
    Asset.findAll({
        attributes : ["kode_asset", "nama_asset"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : TrxKibAlatbesar, 
                attributes : ["kode_asset", "nup", "kode_status_pemilik"],
                where : {
                    kode_unit : req.params.kode_unit, 
                    nup : {
                        [Op.not] : null
                    }
                },
                required : true,
                include : [
                    {
                        model : StatusPemilik, 
                        attributes : ["kode_status_pemilik","nama_status_pemilik"]
                    }
                ]
            }, 
        ],
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}

// Get Bangunan By UNit
exports.getbangunanbyunit = (req, res, next) => {
    Asset.findAll({
        attributes : ["kode_asset", "nama_asset"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : TrxKibBangunan, 
                attributes : ["kode_asset", "nup", "kode_status_pemilik"],
                where : {
                    kode_unit : req.params.kode_unit, 
                    nup : {
                        [Op.not] : null
                    }
                },
                required : true,
                include : [
                    {
                        model : StatusPemilik, 
                        attributes : ["kode_status_pemilik","nama_status_pemilik"]
                    },
                ]
            }, 
        ],
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}

//Get Angkutan by Unit
exports.getangkutanbyunit = (req, res, next) => {
    Asset.findAll({
        attributes : ["kode_asset", "nama_asset"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : TrxKibAngkutan, 
                attributes : ["kode_asset", "nup", "kode_status_pemilik"],
                where : {
                    kode_unit : req.params.kode_unit, 
                    nup : {
                        [Op.not] : null
                    }
                },
                required : true
            }, 
        ],
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}

exports.getbangunanairbyunit = (req, res, next) => {
    Asset.findAll({
        attributes : ["kode_asset", "nama_asset"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : TrxKibBangunanAir, 
                attributes : ["kode_asset", "nup", "kode_status_pemilik"],
                where : {
                    kode_unit : req.params.kode_unit, 
                    nup : {
                        [Op.not] : null
                    }
                },
                required : true,
                include : [
                    {
                        model : StatusPemilik, 
                        attributes : ["kode_status_pemilik","nama_status_pemilik"]
                    },
                ]
            }, 
        ],
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
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
        return next(err);
    })
}

exports.storefrompromise = (req, res, next) => {
    let no_sppa = req.body.no_sppa
    let kode_asset = req.body.kode_asset
    let jumlah_barang = req.body.jumlah_barang
    let asal_perolehan = req.body.asal_perolehan
    let no_bukti_perolehan = req.body.no_bukti_perolehan
    let merk = req.body.merk
    let ruang = req.body.ruang
    let metode_penyusutan = req.body.metode_penyusutan
    let dasar_harga = req.body.dasar_harga
    let id_permintaan_item = req.body.id_permintaan_item
    let penyedia = req.body.penyedia
    let status_permintaan_item = 0

    const split_ruang = ruang.split("-")
    const kode_ruang = parseInt(split_ruang[1])

    return db.transaction()
    .then((t) => { 
        return PembukuanDetail.findAll({
            where  : {
                no_sppa : no_sppa
            }, 
            order : [ 
                ['udcr', 'ASC']
            ],
            raw : true, 
        })
        .then((data) => {
            let kode = JSON.parse(JSON.stringify(data))
            let index = data.length
            if(data.length === 0) {
                hasil_kode = no_sppa + 1
            }
            else{
                const {kode_pembukuan} = kode[index-1];
                let hasil = kode_pembukuan.substring(5);
                hasil = parseInt(hasil)
                
                let kode_akhir = hasil + 1
                hasil_kode = no_sppa + JSON.stringify(kode_akhir)
                console.log("Tes Data :", kode_pembukuan)
            }
            return PembukuanDetail.create({
                no_sppa : no_sppa,
                kode_asset : kode_asset, 
                kode_pembukuan : hasil_kode,
                jumlah_barang : jumlah_barang, 
                asal_perolehan : asal_perolehan, 
                no_bukti_perolehan : no_bukti_perolehan, 
                metode_penyusutan : metode_penyusutan,
                dasar_harga : dasar_harga,
                merk : merk
            }, {transaction : t})
            .then((insert) => {
                if(!insert) {
                    const error = new Error("Data Gagal Masuk")
                    error.statusCode = 422
                    throw error
                }
                const pembukuan = JSON.parse(JSON.stringify(insert))
                let jmlbarang = pembukuan.jumlah_barang
                let arr_dafbar = [] 
                let barang = 1
                for(i = 1 ; i <= jmlbarang ; i++) {
                    let kode_barang = i
                    let deskripsi = pembukuan.merk + i
                    // console.log("Deskripsi : ", deskripsi)
                    arr_dafbar.push({
                        kode_barang : kode_barang, 
                        kode_ruang : kode_ruang,
                        kode_asset : pembukuan.kode_asset,
                        kode_pembukuan : pembukuan.kode_pembukuan,
                        deskripsi : deskripsi, 
                        merk : pembukuan.merk,
                        kondisi : "Baik"
                    })
                }
                // console.log(arr_dafbar)
                return DaftarBarang.bulkCreate(arr_dafbar,
                    {transaction : t})
                .then((bcreate) => {
                    if(!bcreate) {
                        const error = new Error("Data Gagal Insert")
                        error.statusCode = 422
                        throw error
                    }
                    console.log(`${process.env.BASE_PATH_EPROC}/update_status_asset/${penyedia}/${id_permintaan_item}`)
                    return axios.put(`${process.env.BASE_PATH_EPROC}/update_status_asset/${penyedia}/${id_permintaan_item}`, {
                        status_permintaan_item : 0
                    })
                    .then((res_eproc) => {
                        t.commit()
                        return res.json({
                            status : "Success", 
                            message : "Data Berhasil Masuk", 
                            data : {
                                "pembukuan" : insert,
                                "daftar_barang" : bcreate
                            }
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


