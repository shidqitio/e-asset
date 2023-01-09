const {check} = require("express-validator")

exports.store = [
    check("kode_kegiatan_rkt").notEmpty().withMessage("Kode Kegiatan RKT Tidak Boleh Kosong"),
    check("kode_kegiatan_rkt").isNumeric().trim().escape().withMessage("Kode Kegiatan RKT Harus Angka"),
    check("kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"), 
    check("kode_asset").isLength({max : 10}).trim().escape().withMessage("Kode Asset Maksimal 10 Karakter"),
]