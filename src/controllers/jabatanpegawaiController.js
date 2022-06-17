const IhtisarJabatan = require("../models/ihtisarJabatan");
const JabatanPegawai = require("../models/jabatanPegawai");
const TrxUnitKerja = require("../models/trxUnitKerja")

exports.index = (req, res, next) => {
    TrxUnitKerja.findAll({
        include : [
            {
                model : JabatanPegawai, 
                attributes : ["kode_unit_kerja", "kode_jabatan_unit_kerja","status_aktif","nama_jabatan_unit_kerja","beban_kerja","kebutuhan_pegawai","isi_data","jumlah_pegawai"],
                include : [
                    {
                        model:IhtisarJabatan,
                    }
                ]
            }
        ]
    })
    .then((app) => {
        res.json({
            status : "Success", 
            message : "Berhasil Menampilkan Data", 
            data : app
        });
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    JabatanPegawai.findOne({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja, 
            kode_jabatan_unit_kerja : req.params.kode_jabatan_unit_kerja
        }
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Nip Tidak Ada"); 
            error.statusCode = 422; 
            throw error
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