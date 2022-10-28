const Ruang = require("../models/ruang")
const {Op} = require("sequelize");
const DaftarBarang = require("../models/daftarBarang");
const Pembukuan = require("../models/pembukuan");
const Asset = require("../models/asset");
const TrxKibTanah = require("../models/trxKibTanah");
const TrxKibAngkutan = require("../models/trxKibAngkutan");
const TrxKibAlatbesar = require("../models/trxKibBesar");
const TrxKibBangunan = require("../models/trxKibBangunan");


exports.index = (req, res, next) => {
   Ruang.findAll()
   .then((data) => {
       res.json({
           status : "Success",
           message : "Berhasil Menampilkan Data",
           data : data,
       });
   })
   .catch((err) => {
       if(!err.statusCode) {
           err.statusCode = 500;
       }
       next(err)
   });
};

//Show by Kode Unit
exports.showbyunit = (req,res,next) => {
   Ruang.findAll({
       where : {
           kode_unit : req.params.kode_unit
       },
       include : {
           model : DaftarBarang, 
       }
       
   })
   .then((data) => {
       if(data.length === 0) {
           const error = new Error("Ruangan Tidak Ada")
           error.statusCode = 422;
           throw error
       }
       res.json({
           status : "Success",
           message : "Berhasil Menampilkan Data",
           data : data,
       });
   })
   .catch((err) => {
       if(!err.statusCode) {
           err.statusCode = 500;ya
       }
       next(err)
   });
};

//Store
exports.store = (req, res, next) => {
   Ruang.findAll()
   .then((data) => {
       if(data.length === 0) {
           kode_ruangan = 1
       }
       else {
           //KODE
           let kode = JSON.parse(JSON.stringify(data))
           let index = data.length
           const {kode_ruang} = kode[index-1]
           kode_ruangan = kode_ruang + 1
       }
       let unit = req.body.unit 
       let pj = req.body.pj
       const split_pj = pj.split("||")
       let nip = split_pj[0]
       let nama_pj = split_pj[1]
       const split_unit = unit.split("||")
       let kode_unit = split_unit[0]
       let nama_unit = split_unit[1]
       return Ruang.create({
           kode_ruang : kode_ruangan, 
           nip : nip,
           nama_pj : nama_pj, 
           kode_unit : kode_unit, 
           nama_unit : nama_unit,
           nama_ruang : req.body.nama_ruang, 
       })
   })
   .then((result) => {
       res.json({
           status : "Success", 
           message : "Data Berhasil Ditambahkan",
           data : result
       });
   })
   .catch((err) => {
       if(!err.statusCode) {
           err.statusCode = 500
       }
       next(err)
   });
};

 //Barang By Unit
 exports.barangbyunit = (req, res, next) => {
    return DaftarBarang.count({
        where : {
            nup : {
                [Op.not] : null
            }, 
            kode_asset : req.params.kode_asset,
            kondisi : "Baik"
        },
        include : [
            {
                model : Ruang,
                where : {
                    kode_unit : req.params.kode_unit
                }
            }, 
        ]
    })
    .then((baik) => {
        if(baik.length === 0) {
            baik = 0
        }
        return DaftarBarang.count({
            where : {
                nup : {
                    [Op.not] : null
                }, 
                kode_asset : req.params.kode_asset,
                kondisi : "Rusak Ringan"
            },
            include : [
                {
                    model : Ruang,
                    where : {
                        kode_unit : req.params.kode_unit
                    }
                }
            ]
        })
        .then((rusak) => {
            if(rusak.length === 0) {
                rusak = 0
            } 
            let kebutuhan = baik + rusak
            console.log(rusak)
            return res.json({
                status : "Success", 
                message : "Berhasil Menampilkan Data",
                data : {
                    "kondisi_baik" : baik,
                    "Kondisi_rusak_ringan" : rusak,
                    "kebutuhan_pemeliharaan" : kebutuhan
                }
            })
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
 }
 
 //kode By Per Ruang 
exports.showruang = (req, res, next) => {
   Pembukuan.findAll({
       include : [
           {
               model : DaftarBarang, 
               where : {
                   kode_ruang : req.params.kode_ruang,
                   kode_asset_nup : {
                       [Op.not] : null
                   }
               }, 
               include : {
                   model : Ruang
               }
           }
       ]
   })
   .then((data) => {
       res.json({
           status : "Success",
           message : "Berhasil Menampilkan Data",
           data : {
               "jumlah_barang" : data
           }
       });
   })
   .catch((err) => {
       if(!err.statusCode) {
           err.statusCode = 500;
       }
       next(err)
   });
};

//Barang By Unit Data Select
exports.barangbyunitdata = (req, res, next) => {
    return Asset.findAll({
        include : [
            {
                model : DaftarBarang, 
                where : {
                    nup : {
                        [Op.not] : null
                    },
                },
                include : [
                    {
                        model : Ruang,
                        where : {
                            kode_unit : req.params.kode_unit
                        }
                    }
                ]
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
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    });
 }

//Update 

//Jumlah Barang By Unit 
exports.jumlahbarangbyunit = (req, res, next) => {
    let kode_asset = req.params.kode_asset
    let kode_unit = req.params.kode_unit
    return Pembukuan.findAll({
        where : {
            kode_asset : kode_asset
        },
        raw : true
    })
    .then((data) => {
        if(data.length === 0) {
            jml = 0
            return res.json({
                status : "Success", 
                message : "Data Berhasil Ditampilkan",
                data : {
                    "existing_rkbmut" : jml
                }
            })
        }
        if(data[0].kode_asset.match(/^2.*$/)){
            //Kib Tanah
            return TrxKibTanah.count({
                where : {
                    kode_unit : kode_unit,
                    kode_asset : kode_asset, 
                    nup : {[Op.not] : null}
                }
            })
            .then((jml) => {
                if(jml.length === 0) {
                    jml = 0
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Ditampilkan",
                    data : {
                        "existing_rkbmut" : jml
                    }
                })
            })
        }
        else if(data[0].kode_asset.match(/^302.*$/)){
            //Kib Angkutan 
            return TrxKibAngkutan.count({
                where : {
                    kode_unit : kode_unit, 
                    kode_asset : kode_asset,
                    nup : {[Op.not] : null}
                }
            })
            .then((jml) => {
                if(jml.length === 0) {
                    jml = 0
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Ditampilkan",
                    data : {
                        "existing_rkbmut" : jml
                    }
                })
            })
        }
        else if(data[0].kode_asset.match(/^301.*$/)) {
            //Kib Alat Besar
            return TrxKibAlatbesar.count({
                where : {
                    kode_asset : kode_asset,
                    kode_unit : kode_unit
                }
            })
            .then((jml) => {
                if(jml.length === 0) {
                    jml = 0
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Ditampilkan",
                    data : {
                        "existing_rkbmut" : jml
                    }
                })
            })
        }
        else if(data[0].kode_asset.match(/^4.*$/)) {
            TrxKibBangunan.count({
                where : {
                    kode_asset : kode_asset, 
                    kode_unit : kode_unit,
                    nup : {[Op.not] : null}
                }
            })
            .then((jml) => {
                if(jml.length === 0) {
                    jml = 0
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Ditampilkan",
                    data : {
                        "existing_rkbmut" : jml
                    }
                })
            })
        }
        else {
            return DaftarBarang.count({
                where : {
                    kode_asset : req.params.kode_asset,
                    nup : {[Op.not] : null}
                },
                include : [
                    {
                        model : Ruang,
                        where : {
                            kode_unit : req.params.kode_unit
                        }
                    }
                ]
            })
            .then((jml) => {
                if(jml.length === 0) {
                    jml = 0
                }
                return res.json({
                    status : "Success",
                    message : "Data Berhasil Ditampilkan",
                    data : {
                        "existing_rkbmut" : jml
                    }
                })
            })
        }
        
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}