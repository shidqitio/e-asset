const Kelas = require("../models/kelas")
const SubKelas = require("../models/subKelas")

exports.index = (req, res, next) => {
    Kelas.findAll({
        include : [
            {
                model : SubKelas,
            },
        ],
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err){ 
            err.statuCode = 500;
        }
        next(err);
    });
}

exports.show = (req, res, next) => {
    SubKelas.findOne({where : {kode_sub_kelas : req.params.kode_sub_kelas}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Sub Kelas Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.store = (req,res,next) => {
   let data = {
    kode_kelas : req.body.kode_kelas,
    sub : req.body.kode_sub_kelas
   }
    SubKelas.findAll({where : {kode_kelas : req.body.kode_kelas}})
    .then((kode) => {
        // if(app) {
        //     const error = new Error("Kode Sub Kelas Sudah Ada");
        //     error.statusCode = 422; 
        //     throw error;
        // }
    if(kode.length === 0 ) {
        
        kode_hasil = "A"
        
    }
    else {
        let coba = JSON.parse(JSON.stringify(kode))
        let index = coba.length;
        const {kode_sub_kelas} = coba[index-1]
        let tes = kode_sub_kelas.split(".")
        let huruf = tes[1];
        kode_hasil = String.fromCharCode(huruf.charCodeAt(0) + 1)
 
    }
    // console.log(data.kode_kelas + "." + kode_hasil)
        return SubKelas.create({
            kode_kelas : data.kode_kelas, 
            kode_sub_kelas : data.kode_kelas + "." + kode_hasil, 
            gaji : req.body.gaji, 
            tunjangan : req.body.tunjangan
        })
    })
    .then((create) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menambahkan Data", 
            data : create
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.destroy = (req, res, next) => {
    SubKelas.findOne({where : {kode_sub_kelas : req.params.kode_sub_kelas}})
    .then((app) => {
        if(!app) {
            const error = new Error ("Kode Sub Kelas Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return SubKelas.destroy({
            where : {kode_sub_kelas : req.params.kode_sub_kelas}
        })
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data",
            data : response
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}