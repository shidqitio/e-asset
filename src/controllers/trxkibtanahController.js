const Asset = require("../models/asset")
const JenisTrn = require("../models/jenisTrn")
const TrxKibTanah = require("../models/trxKibTanah")
const DokumenTanah = require("../models/dokumenTanah")
const StatusPemilik = require("../models/statusPemilik")
const {Op} = require("sequelize")
const Pembukuan = require("../models/pembukuan")

exports.index = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibTanah,
                where : 
                {
                    nup : { 
                        [Op.not] : null
                    }
                }, 
                include : [
                    {
                        model : DokumenTanah, 
                    }, 
                    {
                        model : StatusPemilik
                    }
                ]
            }
        ]
    })
    .then((data) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data",
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

//Store
exports.store = (req, res, next) => {
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
            kode_dokumen : req.body.kode_dokumen,
            no_asset : no_asset_tanah, 
            no_sppa : req.body.no_sppa, 
            no_kib_tanah : 1, 
            kode_unit : kode_unit, 
            nama_unit : nama_unit, 
            longitude : req.body.longitude, 
            alamat : req.body.alamat,
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
        })
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
        return next(err);
    })
}

//Antrian Nup Tanah 
exports.indexantrian = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibTanah, 
                where : {
                    nup : {
                        [Op.is] : null
                    }
                }
            }
        ]
    })
    .then((data) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Antrian NUP", 
            data : data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}

//Isi NUP
exports.updatenuptanah = (req, res, next) => {
    TrxKibTanah.findAll({
        where : {
            kode_asset : req.params.kode_asset, 
            nup : {
                [Op.not] : null
            }
        }
    })
    .then((data) => {
        //Nup Barang Mulai Dari Awal
        if(data.length === 0){
            TrxKibTanah.findAll({
                where : {
                    kode_asset : req.params.kode_asset, 
                    kode_pembukuan : req.params.kode_pembukuan
                }, 
                include : [
                    {
                        model : Pembukuan, 
                        where : [
                            {
                                kode_pembukuan : req.params.kode_pembukuan
                            }
                        ]
                    }
                ]
            })
            .then((data_awal) => {           
                let daftar = JSON.parse(JSON.stringify(data_awal))
                let awal = 1 
                let barang = 0
                data_awal.map((barang) => {
                    tanggal_perolehan = barang.Pembukuan.tanggal_perolehan
                })
                let string_array = tanggal_perolehan.split('-')
                let data_asset = data_awal[0].kode_asset
                let cek = []
                for(let i = 0 ; i < daftar.length ; i++) {
                    no_kib_tanah = awal++ 
                    barang = barang + 1
                    let nup = data_awal[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_tanah 
                    cek.push(
                        {
                            no_kib_tanah : no_kib_tanah,
                            nup
                        }
                    )
                    TrxKibTanah.update(cek[i], {
                        where : {
                            kode_asset : req.params.kode_asset, 
                            kode_pembukuan : req.params.kode_pembukuan,
                            no_kib_tanah : null
                        }
                    })
                }
            })
            .then((respon) => {
                res.json({
                    status : "Success", 
                    message : "Berhasil Memberikan NUP", 
                    data : respon
                })
            })
            .catch((err) => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                return next(err);
            });
        }
        //Nup Mulai Dari Tengah
        else {
            TrxKibTanah.findAll({
                where : {
                    kode_asset : req.params.kode_asset,
                    nup : {
                        [Op.not] : null
                    }
                }
            })   
            .then((data_awal) => {
                TrxKibTanah.findAll({
                    where : {
                        kode_asset : req.params.kode_asset,
                        kode_pembukuan : req.params.kode_pembukuan
                    }, 
                    include : [
                        {
                            model : Pembukuan, 
                            where : [
                                {
                                    kode_pembukuan : req.params.kode_pembukuan
                                }
                            ]
                        }, 
                    ]
                })
                .then((data_lanjut) => {
                    console.log("Jalankan Else")
                    let nup1 = JSON.parse(JSON.stringify(data_awal))
                    let nup2 = JSON.parse(JSON.stringify(data_lanjut))
                    let index = nup1.length
                    let {no_kib_tanah} = nup1[index-1]
                    let nup_akhir = no_kib_tanah + 1
                    data_lanjut.map((barang) => {
                        tanggal_perolehan = barang.Pembukuan.tanggal_perolehan
                    })
                    let string_array = tanggal_perolehan.split('-')
                    let data_asset = data_lanjut[0].kode_asset
                    console.log("Hasil: ", data_asset)
                    cek = []
                    let barang = 0
                    for(let i = 0 ; i < nup2.length ; i++) {
                        no_kib_tanah = nup_akhir++
                        barang = barang+1
                        let nup = data_lanjut[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_tanah
                        cek.push({
                            no_kib_tanah : no_kib_tanah,
                            nup
                        })
                        TrxKibTanah.update(cek[i], {
                            where : {
                                kode_asset : req.params.kode_asset, 
                                kode_pembukuan : req.params.kode_pembukuan,
                                no_kib_tanah : null
                            }
                        })
                    }
                })  
            })
            .then((respon) => {
                res.json({
                    status : "Success", 
                    message : "Berhasil Memberikan NUP", 
                    data : respon
                })
            })
            .catch((err) => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                return next(err);
            });
        }
        // console.log("Data : ", data)
    });
}