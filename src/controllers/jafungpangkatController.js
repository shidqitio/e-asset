const Jafung = require("../models/jafung");
const Jafung_Pangkat = require("../models/jafungPangkat");

exports.index = (req, res, next) => {
    Jafung.findAll({
        include : [
            {
                model : Jafung_Pangkat, 
                attributes : ["kode_jafung_pangkat", "nama_jafung_pangkat", "kode_golongan_ruang","angka_kredit"]
            }
        ]
    })
    .then((jafpang) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data: jafpang,
        });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    Jafung_Pangkat.findAll({where : {kode_jafung_pangkat : req.params.kode_jafung_pangkat}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.store = (req, res, next) => {
    Jafung_Pangkat.findAll({
        attributes: ["kode_jafung_pangkat"],
        where : {kode_jafung : req.body.kode_jafung}
    })
    .then((kode) => {
        let data = JSON.parse(JSON.stringify(kode))
        let index = data.length;
        if(data.length === 0){
            let kode_jafung = req.body.kode_jafung;
            kode_hasil = kode_jafung + "." + "01"
        }
        else{
            const {kode_jafung_pangkat} = data[index-1];
            let tes = kode_jafung_pangkat.split(".");
            let kode_jafpang = tes[2];
            let kode_awal = req.body.kode_jafung;
            
            let kode1 = parseInt(kode_jafpang.charAt(0));
            let kode2 = parseInt(kode_jafpang.charAt(1));

            if(kode1 > 0) {
                if(kode2 === 9){
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = kode_awal + "." + kode1.toString() + kode2.toString();
                }
                else {
                    kode_hasil =    kode_awal + "." + kode1.toString() + kode2.toString();
                }
            }
            
            if(kode1 === 0) {
                if(kode2 === 9) {
                    kode1 = parseInt(kode1) + 1;
                    kode2 = 0;
                    kode_hasil = kode_awal + "." + kode1.toString() + kode2.toString();
                } else {
                     kode_hasil = kode_awal + "." + kode1.toString() + String(parseInt(kode2) + 1);
                }
            }
        }
        return Jafung_Pangkat.create({
            kode_jafung : req.body.kode_jafung, 
            kode_jafung_pangkat : kode_hasil, 
            nama_jafung_pangkat : req.body.nama_jafung_pangkat, 
            kode_golongan_ruang : req.body.kode_golongan_ruang, 
            angka_kredit : req.body.angka_kredit
        });
    })
    .then((jafpang) => {
        res.json({
            status : "Success",
            message : "Berhasil Menyimpan Data",
            data : jafpang
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_jafung : req.body.kode_jafung, 
        kode_jafung_pangkat : req.params.kode_jafung_pangkat, 
        nama_jafung_pangkat : req.body.nama_jafung_pangkat, 
        kode_golongan_ruang : req.body.kode_golongan_ruang, 
        angka_kredit : req.body.angka_kredit
    }; 

    Jafung_Pangkat.findOne({ where : {kode_jafung_pangkat : req.params.kode_jafung_pangkat}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return Jafung_Pangkat.update(data, {where : {kode_jafung_pangkat : req.params.kode_jafung_pangkat}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
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

exports.destroy = (req, res, next) => {
    Jafung_Pangkat.findOne({where : {kode_jafung_pangkat : req.params.kode_jafung_pangkat}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jafung Pangkat Tidak Ada");
            error.statusCode = 422;
            throw error;
        }
        return Jafung_Pangkat.destroy({
            where: {kode_jafung_pangkat : req.params.kode_jafung_pangkat},
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};