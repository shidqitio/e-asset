const Asset = require("../models/asset")
const TrxKibAngkutan = require("../models/trxKibAngkutan")
const JenisTrn = require("../models/jenisTrn")
const StatusPemilik = require("../models/statusPemilik")
const Pembukuan = require("../models/pembukuan")
const {Op} = require("sequelize")


exports.index = (req,res,next) => {
    TrxKibAngkutan.findAll({
        include : [
            {
                model : Asset,
            }, 
            {
                model : JenisTrn
            }, 
            {
                model : StatusPemilik
            }
          
        ]
    })
    .then((data) => {
        if(data.length === 0) {
            const error = new Error("Data Tidak Ada")
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

exports.store = (req, res, next) => {
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
            kode_asset : req.body.kode_asset, 
            no_asset : no_asset_angkutan, 
            no_sppa : req.body.no_sppa, 
            no_kib_angkutan : 2, 
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

//Antrian NUP Angkutan

exports.indexantrian = (req, res, next) => {
    Pembukuan.findAll({
        include : [
            {
                model : TrxKibAngkutan, 
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


exports.updatenupangkutan = (req, res, next) => {
    TrxKibAngkutan.findAll({
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
            TrxKibAngkutan.findAll({
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
                    no_kib_angkutan = awal++ 
                    barang = barang + 1
                    let nup = data_awal[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_angkutan 
                    cek.push(
                        {
                            no_kib_angkutan : no_kib_angkutan,
                            nup
                        }
                    )
                    TrxKibAngkutan.update(cek[i], {
                        where : {
                            kode_asset : req.params.kode_asset, 
                            kode_pembukuan : req.params.kode_pembukuan,
                            no_kib_angkutan : null
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
            TrxKibAngkutan.findAll({
                where : {
                    kode_asset : req.params.kode_asset,
                    nup : {
                        [Op.not] : null
                    }
                }
            })   
            .then((data_awal) => {
                TrxKibAngkutan.findAll({
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
                    let {no_kib_angkutan} = nup1[index-1]
                    let nup_akhir = no_kib_angkutan + 1
                    data_lanjut.map((barang) => {
                        tanggal_perolehan = barang.Pembukuan.tanggal_perolehan
                    })
                    let string_array = tanggal_perolehan.split('-')
                    let data_asset = data_lanjut[0].kode_asset
                    console.log("Hasil: ", data_asset)
                    cek = []
                    let barang = 0
                    for(let i = 0 ; i < nup2.length ; i++) {
                        no_kib_angkutan = nup_akhir++
                        barang = barang+1
                        let nup = data_lanjut[0].kode_unit + "." + string_array[0] + "." + data_asset + "." + no_kib_angkutan
                        cek.push({
                            no_kib_angkutan : no_kib_angkutan,
                            nup
                        })
                        TrxKibAngkutan.update(cek[i], {
                            where : {
                                kode_asset : req.params.kode_asset, 
                                kode_pembukuan : req.params.kode_pembukuan,
                                no_kib_angkutan : null
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

