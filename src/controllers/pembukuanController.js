const PembukuanDetail = require("../models/pembukuan")
const DaftarBarang = require("../models/daftarBarang")
const Asset = require("../models/asset")
const TrxKibTanah = require("../models/trxKibTanah")
const TrxKibAngkutan = require("../models/trxKibAngkutan")
const TrxKibAlatbesar = require("../models/trxKibBesar")
const TrxKibBangunan = require("../models/trxKibBangunan")
const db = require("../config/database")
const {QueryTypes, Op} = require("sequelize")
const Ruang = require("../models/ruang")
const StatusPemilik = require("../models/statusPemilik")



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
                    "udcr","DESC"
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
                console.log("Coba :", kode_pembukuan.catat)
                    if(kode_pembukuan.catat === "DBR" || kode_pembukuan.catat === "DBL") {
                    const request = req.body;
                    const data = request.barang.map((item) => {
                        return {
                            kode_barang : item.kode_barang, 
                            kode_pembukuan : kode_pembukuan.kode_pembukuan,
                            kode_asset : kode_pembukuan.kode_asset, 
                            nilai_item : kode_pembukuan.nilai_item,  
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
                    else if(kode_pembukuan.kode_asset.match(/^302.*$/)) {
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
                    else if(kode_pembukuan.kode_asset.match(/^301.*$/)) {
                        //Jika Kib Alat  Besar
                        TrxKibAlatbesar.findAll()
                        .then((data) => {
                            //Pemisah Kode dan Nama Unit
                            let unit = req.body.unit 
                            const split = unit.split("||")
                            let kode_unit = split[0]
                            let nama_unit = split[1]

                            //perhitungan kode
                            if(data.length === 0) {
                                no_asset_alatbesar = 1
                            }
                            else {
                                //KODE
                                let kode = JSON.parse(JSON.stringify(data))
                                let index = data.length
                                const {no_asset} = kode[index-1]
                                no_asset_alatbesar = no_asset + 1
                            }

                            return TrxKibAlatbesar.create({
                                kode_asset : kode_pembukuan.kode_asset, 
                                kode_status_pemilik : req.body.kode_status_pemilik, 
                                kode_unit : kode_unit, 
                                nama_unit : nama_unit,
                                no_asset : no_asset_alatbesar, 
                                kode_pembukuan : kode_pembukuan.kode_pembukuan, 
                                merk : kode_pembukuan.merk, 
                                type : req.body.type, 
                                tahun_pembuatan : req.body.tahun_pembuatan,
                                pabrik : req.body.pabrik, 
                                perakitan : req.body.perakitan, 
                                negara : req.body.negara,
                                kapasitas : req.body.kapasitas, 
                                sistem_pendingin : req.body.sistem_pendingin,
                                sistem_operasi : req.body.sistem_operasi, 
                                sistem_pembakar : req.body.sistem_pembakar, 
                                dudukan_peralatan : req.body.dudukan_peralatan, 
                                power_train : req.body.power_train, 
                                no_mesin : req.body.no_mesin, 
                                no_rangka : req.body.no_rangka, 
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
                    //JIKA KIB BANGUNAN
                    else if(kode_pembukuan.kode_asset.match(/^4.*$/)) {
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
                        .catch((err) => {
                            if(!err.statusCode) {
                                err.statusCode = 500;
                            }
                            t.rollback();
                            return next(err);
                        })
                    }
                }
            })
        })
      
    })
}

// Get Tanah By UNit
exports.gettanahbyunit = (req, res, next) => {
    PembukuanDetail.findAll({
        attributes : ["kode_asset", "kode_pembukuan", "no_sppa", "jumlah_barang", "asal_perolehan"],
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
                        model : Asset, 
                        attributes : ["kode_asset","nama_asset"]
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
    PembukuanDetail.findAll({
        attributes : ["kode_asset", "kode_pembukuan", "no_sppa", "jumlah_barang", "asal_perolehan"],
        order : [
            ['udcr','ASC']
        ],
        include : [
            {
                model : DaftarBarang, 
                attributes : ["kode_asset", "nup","kondisi"],
                include : [
                    {
                        model : Ruang, 
                        where : {kode_unit : req.params.kode_unit}
                    }
                ],
                required : true, 
                
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

// Get Alat Besar By UNit
exports.getalatbesarbyunit = (req, res, next) => {
    PembukuanDetail.findAll({
        attributes : ["kode_asset", "kode_pembukuan", "no_sppa", "jumlah_barang", "asal_perolehan"],
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
                    },
                    {
                        model : Asset, 
                        attributes : ["kode_asset","nama_asset"]
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
    PembukuanDetail.findAll({
        attributes : ["kode_asset", "kode_pembukuan", "no_sppa", "jumlah_barang", "asal_perolehan"],
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
                    {
                        model : Asset, 
                        attributes : ["kode_asset","nama_asset"]
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

//Get Angkutan by Unit
exports.getangkutanbyunit = (req, res, next) => {
    PembukuanDetail.findAll({
        attributes : ["kode_asset", "kode_pembukuan", "no_sppa", "jumlah_barang", "asal_perolehan"],
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