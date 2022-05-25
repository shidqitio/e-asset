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

        if(kode === null) {
            kode_jabatan_struktural = "000";
        }

        let kode1 = parseInt(kode_jabatan_struktural.charAt(0));
        let kode2 = parseInt(kode_jabatan_struktural.charAt(1));
        let kode3 = parseInt(kode_jabatan_struktural.charAt(2));

        if(kode1 > 0){
            if(kode2 > 0){
                if(kode3 === 9){
                    kode1 = 0 
                    kode2 = parseInt(kode2) + 1 ;
                    kode3 = 0 
                    kode_jabatan_struktural = kode1.toString() + kode2.toString() + kode3.toString();
                }
            }
        }

        

        console.log(kode_jabatan_struktural)

    })
}