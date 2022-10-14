const {check} = require('express-validator')

exports.store = [
    check("kode_unit").notEmpty().withMessage("Kode Unit Tidak Boleh Kosong"),
    check("kode_jabatan_struktural").notEmpty().withMessage("Kode Jabatan Struktural Tidak Boleh Kosong"),
    check("nama_tugas").notEmpty().withMessage("Nama Tugas Tidak Boleh Kosong"),
    check("status").isIn(["pokok","tambahan"]).withMessage("Tidak Ada Dalam Pilihan")
]