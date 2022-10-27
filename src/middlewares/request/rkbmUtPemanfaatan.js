const {check} = require('express-validator')

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"),
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("pemanfaatan.*.kode_asset").notEmpty().withMessage("Kode Aset Tidak Boleh Kosong"),
    check("pemanfaatan.*.nup").notEmpty().withMessage("NUP Tidak Boleh Kosong"),
    check("pemanfaatan.*.kode_status_pemilik").notEmpty().withMessage("Kode Status Pemilik Tidak Boleh Kosong")
]