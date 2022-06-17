const JabatanPegawai = require("../models/jabatanPegawai");
const TrxUnitKerja = require("../models/trxUnitKerja");
const TrxAnjabFormA = require("../models/trxAnjabFormA");
const IhtisarJabatan = require("../models/ihtisarJabatan");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

exports.index = (req, res, next) => {
    TrxUnitKerja.findAll({
        // where : {
        //     kode_unit_kerja : {
        //         [Op.notLike] : 'J%'
        //     }
        // },
        include : [
            {
                model : JabatanPegawai, 
                // attributes : ["kode_jabatan_unit_kerja","no_urut_01","tugas_pokok","no_urut_02","no_urut_02_sub","sub_tugas_pokok","status_urjab_form_a","a3","a4","b4","a5","a6","a7","a8"],
                include : [
                    {
                        model : TrxAnjabFormA , 
                        // attributes : ["kode_jabatan_unit_kerja","nama_jabatan_unit_kerja"],
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
};

exports.show = (req, res, next) => {
    TrxAnjabFormA.findAll({
        where : {
            kode_unit_kerja : req.params.kode_unit_kerja,
            kode_jabatan_unit_kerja : req.params.kode_jabatan_unit_kerja,
            // kode_unit_kerja : {
            //     [Op.notLike] : 'J%'
            // }
        } ,
        include : [
            {
                model : TrxUnitKerja,
            }, 
            {
                model : JabatanPegawai, 
                include : [
                    {
                        model : IhtisarJabatan
                    }
                ]
            }
        ]
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Kode Tingkat Pendidikan Tidak Ada");
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