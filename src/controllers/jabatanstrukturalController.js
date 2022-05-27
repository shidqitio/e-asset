const JabatanStruktural = require("../models/jabatanStruktural");

exports.index = (req, res, next) => {
    JabatanStruktural.findAll()
    .then((jastruk) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data",
            data: jastruk
        });
    })
    .catch((err) => {
        if(!err.statuCode) {
            err.statuCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    JabatanStruktural.findAll({where : {kode_jabatan_struktural : req.params.kode_jabatan_struktural}})
    .them((app) => {
        if(!app) {
            const error = new Error("Jabatan Struktural Tidak Terdaftar");
            error.statuCode = 422; 
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
            err.statuCode = 500;
        }
        next(err)
    });
};

exports.store = (req, res, next) => {
    JabatanStruktural.max("kode_jabatan_struktural")
    .then((kode) => {
        let kode_jabatan_struktural = "000";

        if(kode!== null){
            kode_jabatan_struktural = kode;
        }
     
        let kode1 = parseInt(kode_jabatan_struktural.charAt(0));
        let kode2 = parseInt(kode_jabatan_struktural.charAt(1));
        let kode3 = parseInt(kode_jabatan_struktural.charAt(2));



        if(kode1 > 0){
            if(kode2 === 9 && kode3 === 9){
                kode1 = parseInt(kode1) + 1;
                kode2 = 0
                kode3 = 0;
                kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
            }

            if(kode2 > 0){
                if(kode3 === 9){
                  kode1 = 0;
                  kode2 = parseInt(kode2) + 1;
                  kode3 = 0;
                  kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
                }
                else{
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + String(parseInt(kode3) + 1);
                }
            }
    
            if(kode2 === 0){
                if(kode3 === 9 ){
                    kode1 = 0
                    kode2 = parseInt(kode2) + 1
                    kode3 = 0
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
                } else if(kode3 > 9) {
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + String(parseInt(kode3) + 1);
                }
            }
        }

        if(kode1 === 0){
            //kode1 = 0 kode2 = 9 kode3 = 9
            //kode1 = 1 kode2 = 0 kode3 = 0
            if(kode2 === 9 && kode3 === 9){
                kode1 = parseInt(kode1) + 1;
                kode2 = 0
                kode3 = 0;
                kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
            }
            else if(kode2 > 0 ){
                if(kode3 === 9){
                  kode1 = 0;
                  kode2 = parseInt(kode2) + 1;
                  kode3 = 0;
                  kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
                }
                else  {
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + String(parseInt(kode3) + 1);
                }
            }
    
            if(kode2 === 0){
                if(kode3 === 9 ){
                    kode1 = 0
                    kode2 = parseInt(kode2) + 1
                    kode3 = 0
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
                } else if(kode3 > 0) {
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + String(parseInt(kode3) + 1);
                }
            }
            
            if(kode1 == 0 && kode2 == 0 && kode3 == 0){
                kode_jabatan_struktural = "001"
            }
        }
        return JabatanStruktural.create({
            kode_jabatan_struktural : kode_jabatan_struktural, 
            nama_jabatan : req.body.nama_jabatan, 
            kode_eselon : req.body.kode_eselon, 
            status_jabatan : req.body.status_jabatan,
            kelas : req.body.kelas, 
        });
    })
    .then((jastruk) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : jastruk,
        });
    })
    .catch((err) => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
        nama_jabatan : req.body.nama_jabatan, 
        kode_eselon : req.body.kode_eselon, 
        status_jabatan : req.body.status_jabatan,
        kelas : req.body.kelas,
    };

    JabatanStruktural.findOne({where : {kode_jabatan_struktural : req.params.kode_jabatan_struktural}})
    .then((ex) => {
        if(!ex) {
            const error = new Error("Kode Jabatan Struktural Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return JabatanStruktural.update(data, {where : {kode_jabatan_struktural: req.params.kode_jabatan_struktural}})
    })
    .then((up) => {
        res.json({
            status : "Success", 
            message : "Berhasil Memperbarui Data", 
            data : data,
        });
    })
    .catch((err) => {
        if(!err.statuCode) {
            err.statuCode = 500
        }
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    JabatanStruktural.findOne({where: {kode_jabatan_struktural : req.params.kode_jabatan_struktural}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jabatan Struktural Tidak Ada");
            error.statuCode = 422; 
            throw error;
        }
        return JabatanStruktural.destroy({
            where: {kode_jabatan_struktural : req.params.kode_jabatan_struktural},
        });
    })
    .then((response) => {
        res.json({
            status : "Success",
            message : "Berhasil Menghapus Data", 
            data : response
        })
        next(err)
    });
};