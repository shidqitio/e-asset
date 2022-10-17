const DaftarBarang = require("../models/daftarBarang")
const Pembukuan = require("../models/pembukuan")
const Ruang = require("../models/ruang")
const {Op} = require("sequelize")
const QrCode = require("qrcode")

exports.updatenup = (req, res, next) => {

    DaftarBarang.findAll({
        where : {
            kode_asset : req.params.kode_asset, 
            kode_asset_nup : {
                [Op.not] : null
            }
        }
    })
    .then((data) => {
        //Nup Barang Mulai Dari Awal
        if(data.length === 0){
            DaftarBarang.findAll({
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
                    {
                        model : Ruang
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
                data_awal.map((barang) => {
                    kode_unit = barang.Ruang.kode_unit
                })
                
                let string_array = tanggal_perolehan.split('-')
                let data_asset = data_awal[0].kode_asset
                let cek = []
                for(let i = 0 ; i < daftar.length ; i++) {
                    kode_asset_nup = awal++ 
                    barang = barang + 1
                    let nup = kode_unit + "." + string_array[0] + "." + data_asset + "." + kode_asset_nup 
                    cek.push(
                        {
                            kode_asset_nup : kode_asset_nup,
                            barang, 
                            nup
                        }
                    )

                    // DaftarBarang.update(cek[i], {
                    //     where : {
                    //         kode_asset : req.params.kode_asset, 
                    //         kode_pembukuan : req.params.kode_pembukuan,
                    //         kode_barang :  cek[i].barang,
                    //         kode_asset_nup : null
                    //     }
                    // })
                }
            })
            .then((respon) => {
                res.json({
                    status : "Success", 
                    message : "Berhasil Memberikan NUP", 
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
            DaftarBarang.findAll({
                where : {
                    kode_asset : req.params.kode_asset,
                    kode_asset_nup : {
                        [Op.not] : null
                    }
                }
            })   
            .then((data_awal) => {
                DaftarBarang.findAll({
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
                        {
                            model : Ruang
                        }
                    ]
                })
                .then((data_lanjut) => {
                    console.log("Jalankan Else")
                    let nup1 = JSON.parse(JSON.stringify(data_awal))
                    let nup2 = JSON.parse(JSON.stringify(data_lanjut))
                    let index = nup1.length
                    let {kode_asset_nup} = nup1[index-1]
                    let nup_akhir = kode_asset_nup + 1
                    data_lanjut.map((barang) => {
                        tanggal_perolehan = barang.Pembukuan.tanggal_perolehan
                    })
                    data_lanjut.map((barang) => {
                        kode_unit = barang.Ruang.kode_unit
                    })
                    let string_array = tanggal_perolehan.split('-')
                    let data_asset = data_lanjut[0].kode_asset

                    cek = []
                    let barang = 0
                    for(let i = 0 ; i < nup2.length ; i++) {
                        kode_asset_nup = nup_akhir++
                        barang = barang+1
                        let nup = kode_unit + "." + string_array[0] + "." + data_asset + "." + kode_asset_nup
                        cek.push({
                            kode_asset_nup : kode_asset_nup,
                            barang,
                            nup
                        })
                        DaftarBarang.update(cek[i], {
                            where : {
                                kode_asset : req.params.kode_asset, 
                                kode_pembukuan : req.params.kode_pembukuan,
                                kode_barang :  cek[i].barang,
                                kode_asset_nup : null
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

exports.qr = (req, res, next) => {
    DaftarBarang.findOne({
        where : {
            nup : req.params.nup
        }
    })
    .then((data) => {
        let cek = JSON.stringify(data)
        QrCode.toFile("qr.png",cek,{type: 'terminal'},
        ((err, QrCode) => {
            if(err) {
                return console.log("error occured")
            }
            console.log(QrCode)
        })
        )
    })
    

}