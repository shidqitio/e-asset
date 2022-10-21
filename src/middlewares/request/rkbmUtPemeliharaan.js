const {check} = require("express-validator")

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"),
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("bas").notEmpty().withMessage("Bas Tidak Boleh Kosong"),
    check("rkbmutpemeliharaan.*.kode_asset").notEmpty().withMessage("Kode Asset Tidak"),
    check("rkbmutpemeliharaan.*.kode_status_barang").notEmpty().withMessage("Kode Status Barang Tidak Boleh Kosong")
]