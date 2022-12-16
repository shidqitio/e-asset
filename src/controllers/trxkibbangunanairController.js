const Asset = require("../models/asset")
const TrxKibTanah = require("../models/trxKibTanah")
const StatusPemilik = require("../models/statusPemilik")
const TrxKibBangunanAir = require("../models/trxKibBangunanAir")
const Pembukuan = require("../models/pembukuan")
const {Op} = require("sequelize")

//Antrian Nup Bangunan Air
exports.indexantrian = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibBangunanAir, 
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
    TrxKibBangunanAir.findAll({
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
            TrxKibBangunanAir.findAll({
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
                    TrxKibBangunanAir.update(cek[i], {
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
            TrxKibBangunanAir.findAll({
                where : {
                    kode_asset : req.params.kode_asset,
                    nup : {
                        [Op.not] : null
                    }
                }
            })   
            .then((data_awal) => {
                TrxKibBangunanAir.findAll({
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
                        TrxKibBangunanAir.update(cek[i], {
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

