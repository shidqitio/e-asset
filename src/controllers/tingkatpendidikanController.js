const TingkatPendidikan = require('../models/tingkatPendidikan');

exports.index = (req, res, next) => {
    TingkatPendidikan.findAll()
    .then((tingpen) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : tingpen,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.store = (req, res, next) => {
    TingkatPendidikan.max("kode_tingkat_pendidikan")
    .then((kode) => {
        let kode_tingkat_pendidikan = "00";

        if(kode !== null) {
            kode_tingkat_pendidikan = kode;
        }

        let kode1 = parseInt(kode_tingkat_pendidikan.charAt(0));
        let kode2 = parseInt(kode_tingkat_pendidikan.charAt(1));

        if(kode1 > 0) {
            if(kode2 == 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0 ;
                kode_tingkat_pendidikan = kode1.toString() + kode2.toString();
            }
            else {
                kode_tingkat_pendidikan = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }

        if(kode1 === 0) {
            if(kode2 === 9) {
                kode1 = parseInt(kode1) + 1;
                kode2 = 0;
                kode_tingkat_pendidikan = kode1.toString() + kode2.toString();
            }
            else{
                kode_tingkat_pendidikan = kode1.toString() + String(parseInt(kode2) + 1);
            }
        }

        if(kode === null) {
            kode_tingkat_pendidikan = "00";
        }

        console.log(kode_tingkat_pendidikan)

        return TingkatPendidikan.create({
            kode_tingkat_pendidikan : kode_tingkat_pendidikan, 
            nama_tingkat_pendidikan : req.body.nama_tingkat_pendidikan,
            ucr : req.user,
        });
    })
    .then((tingpen) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data : tingpen,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    TingkatPendidikan.findOne({where : {kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan}})
    .then((tingpen) => {
        if(!tingpen) {
            const error = new Error("Kode Tingkat Pendidikan Tidak Ada");
            error.statusCode = 422; 
            throw error
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : tingpen
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.update = (req, res, next) => {
    const data = {
        kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan, 
        nama_tingkat_pendidikan : req.body.nama_tingkat_pendidikan,
    }
    TingkatPendidikan.findOne({where : {kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan}})
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Jenis Karya Tulis Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return TingkatPendidikan.update(data, {where : {kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan}})
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
        next(err);
    });
};

exports.destroy = (req, res, next) => {
    TingkatPendidikan.findOne({where : {kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan}})
    .then((app) => {
        if(!app) {
            const error = new Error ("Kode Jenis Karya Tulis Tidak Ada");
            error.statusCode = 422; 
            throw error;
        }
        return TingkatPendidikan.destroy({
            where:{kode_tingkat_pendidikan : req.params.kode_tingkat_pendidikan}
        });
    })
    .then((response) => {
        res.json({
            status : "success", 
            message : "Berhasil Menghapus Data", 
            data : response
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}