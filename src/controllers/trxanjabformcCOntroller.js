const JabatanPegawai = require("../models/jabatanPegawai");
const TrxAnjabFormD = require("../models/trxAnjabFormD");
const TrxUnitKerja = require("../models/trxUnitKerja");

exports.index = (req, res, next) => {
    TrxUnitKerja.findAll({
        // kode_unit_kerja : {
        //     [Op.notLike] : 'J%'
        // },
        include : [
            {
                model : JabatanPegawai, 
                // attributes : ["kode_jabatan_unit_kerja","no_urut_01","tugas_pokok","no_urut_02","no_urut_02_sub","sub_tugas_pokok","status_urjab_form_a","a3","a4","b4","a5","a6","a7","a8"],
                include : [
                    {
                        model : TrxAnjabFormD , 
                        attributes : ["kode_unit_kerja","kode_jabatan_unit_kerja","beban_kerja","butuh_pegawai", "butuh_pegawai", "isi_data","jumlah_pegawai"],
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
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
}

exports.show = (req, res, next) => {
    TrxAnjabFormD.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            // kode_unit_kerja : {
            //     [Op.notLike] : 'J%'
            // }
        } ,
        include : [
            {
                model : TrxUnitKerja,
            }, 
            {
                model : JabatanPegawai
            }
        ]
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Anjab Tidak Ada");
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
            err.statusCode = 500
        }
        next(err);
    })
}

