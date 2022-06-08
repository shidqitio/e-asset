const TrxJabatanStruktural = require("../models/TrxJabatanStruktural")
const Pegawai = require("../models/pegawai")

exports.index = (req, res, next) => {
    TrxJabatanStruktural.findAll({
        include : [
            {
                model : Pegawai, 
                attributes : ["nip","nama_pegawai"]
            }
        ]
    })
    .then((jabstruk) => {
        res.json({
            status : "Success",
            message : "Berhasil Menampilkan Data",
            data : jabstruk,
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.store = (req, res, next) => {
    TrxJabatanStruktural.findOne({where : 
        {
            nip : req.body.nip, 
            kode_jabatan_struktural : req.body.kode_jabatan_struktural, 
            periode : req.body.periode,    
        }
    })
    .then((jabstruk) => {
        if(jabstruk) {
            const error = new Error ("Data Sudah Ada");
            error.statusCode = 422 ; 
            throw error;
        }
        return TrxJabatanStruktural.create({
            nip : req.body.nip, 
            kode_jabatan_struktural : req.body.kode_jabatan_struktural, 
            periode : req.body.periode, 
            kelas : req.body.kelas, 
            tmt_awal : req.body.tmt_awal,
            tmt_akhir : req.body.tmt_akhir, 
            nomor_sk_jabatan_struktural : req.body.nomor_sk_jabatan_struktural,
            ucr : req.user,
        })
    })
    .then((create) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menyimpan Data", 
            data:create
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.show = (req,res, next) => {
    TrxJabatanStruktural.findOne({where : 
        {
            nip : req.params.nip, 
            kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
            periode : req.params.periode

        }
    })
    .then((trx) => {
        if(!trx) {
            const error = new Error ("NIP Tidak Ada");
            error.statusCode = 422 ; 
            throw error;
        }
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : trx
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.update = (req, res, next) => {
    const data = {
        kelas : req.body.kelas, 
        tmt_awal : req.body.tmt_awal, 
        tmt_akhir : req.body.tmt_akhir, 
        nomor_sk_jabatan_struktural : req.body.nomor_sk_jabatan_struktural,
        uch : req.user,
    }
    TrxJabatanStruktural.findOne(
        {where : {
            nip : req.params.nip, 
            kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
            periode : req.params.periode
        }}
    )
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return TrxJabatanStruktural.update(data, 
            {where : {
                nip : req.params.nip, 
                kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
                periode : req.params.periode,    
            }})
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
    TrxJabatanStruktural.findOne({where : 
        {
            nip : req.params.nip, 
            kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
            periode : req.params.periode,    
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tidak Ada");
            error.statusCode = 422; 
            throw error ;
        }
        return TrxJabatanStruktural.destroy({
            where : {
                nip : req.params.nip, 
                kode_jabatan_struktural : req.params.kode_jabatan_struktural, 
                periode : req.params.periode,    
            }
        });
    })
    .then((response) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menghapus Data", 
            data : response
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};


