const {check} = require('express-validator')

exports.store = [
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("pj").notEmpty().withMessage("PJ Tidak Boleh Kosong"),
    check("nama_ruang").notEmpty().withMessage("nama Ruang Tidak Boleh Kosong")
]