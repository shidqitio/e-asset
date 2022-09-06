 const Ruang = require("../models/ruang")
 const {Op} = require("sequelize");
const DaftarBarang = require("../models/daftarBarang");
const Pembukuan = require("../models/pembukuan");


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
            err.statusCode = 500;
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

 //kode By Per Ruang 
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
            }
        ]
    })
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
 

//Update 