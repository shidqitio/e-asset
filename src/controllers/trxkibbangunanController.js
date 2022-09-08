const Asset = require("../models/asset")
const TrxKibTanah = require("../models/trxKibTanah")
const StatusPemilik = require("../models/statusPemilik")
const TrxKibBangunan = require("../models/trxKibBangunan")
const Pembukuan = require("../models/pembukuan")
const {Op} = require("sequelize")

exports.index = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibBangunan,
                where : [
                    {
                        nup : {
                            [Op.not] : null
                        }
                    }
                ], 
                include : [
                    {
                        model : Asset
                    }, 
                    {
                        model : TrxKibTanah
                    }, 
                    {
                        model : StatusPemilik
                    }
                ]
            }
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Bangunan Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
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
    TrxKibBangunan.findAll()
    .then((data) => {
         //Pemisah Kode dan Nama Unit
         let unit = req.body.unit 
         const split = unit.split("||")
         let kode_unit = split[0]
         let nama_unit = split[1]
         //Pemisahan asset tanah, no kib tanah dan no asset tanah
         let tanah = req.body.tanah
         const split_tanah = tanah.split("||")
         let asset_tanah = split_tanah[0]
         let no_kib_tanah = split_tanah[1]
         let no_asset_tanah = split_tanah[2]

         //Perhitungan Kode 
         if(data.length === 0) {
             no_asset_bangunan = 1
         } 
         else {
            let kode = JSON.parse(JSON.stringify(data))
            let index = data.length
            const {no_asset} = kode[index-1]
            no_asset_bangunan = no_asset + 1
         }
         return TrxKibBangunan.create({
             kode_asset : req.body.kode_asset, 
             kode_status_pemilik : req.body.kode_status_pemilik, 
             no_sppa : req.body.no_sppa, 
             no_asset : no_asset_bangunan, 
             no_kib_bangunan : 4, 
             kode_unit : kode_unit, 
             nama_unit : nama_unit, 
             kode_asset_tanah : asset_tanah, 
             no_kib_tanah : no_kib_tanah, 
             no_asset_tanah : no_asset_tanah, 
             luas_dasar_bangunan : req.body.luas_dasar_bangunan, 
             jumlah_lantai : req.body.jumlah_lantai, 
             type : req.body.type, 
             tahun_bangun : req.body.tahun_bangun, 
             tahun_guna : req.body.tahun_guna, 
             pdf : req.body.pdf, 
             lokasi_bangunan : req.body.lokasi_bangunan, 
             sumber_dana : req.body.sumber_dana, 
             no_dana : req.body.no_dana, 
             tanggal_dana : req.body.tanggal_dana, 
             nilai_wajar : req.body.nilai_wajar, 
             njop : req.body.njop,
             catatan : req.body.catatan
         })
    })
}

//Antrian Nup Bangunan 
exports.indexantrian = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibBangunan, 
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


//Isi Antrian NUP
exports.updatenupbangunan = (req, res, next) => {
    TrxKibBangunan.findAll({
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
            TrxKibBangunan.findAll({
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
                console.log("Cek")   
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
                    no_kib_bangunan = awal++ 
                    barang = barang + 1
                    let nup = data_awal[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_bangunan 
                    cek.push(
                        {
                            no_kib_bangunan : no_kib_bangunan,
                            nup
                        }
                    )
                    TrxKibBangunan.update(cek[i], {
                        where : {
                            kode_asset : req.params.kode_asset, 
                            kode_pembukuan : req.params.kode_pembukuan,
                            no_kib_bangunan : null
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
            TrxKibBangunan.findAll({
                where : {
                    kode_asset : req.params.kode_asset,
                    nup : {
                        [Op.not] : null
                    }
                }
            })   
            .then((data_awal) => {
                TrxKibBangunan.findAll({
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
                    let {no_kib_bangunan} = nup1[index-1]
                    let nup_akhir = no_kib_bangunan + 1
                    data_lanjut.map((barang) => {
                        tanggal_perolehan = barang.Pembukuan.tanggal_perolehan
                    })
                    let string_array = tanggal_perolehan.split('-')
                    let data_asset = data_lanjut[0].kode_asset
                    console.log("Hasil: ", data_asset)
                    cek = []
                    let barang = 0
                    for(let i = 0 ; i < nup2.length ; i++) {
                        no_kib_bangunan = nup_akhir++
                        barang = barang+1
                        let nup = data_lanjut[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_bangunan
                        cek.push({
                            no_kib_bangunan : no_kib_bangunan,
                            nup
                        })
                        TrxKibBangunan.update(cek[i], {
                            where : {
                                kode_asset : req.params.kode_asset, 
                                kode_pembukuan : req.params.kode_pembukuan,
                                no_kib_bangunan : null
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



