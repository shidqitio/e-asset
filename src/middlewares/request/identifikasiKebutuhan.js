const {check} = require("express-validator")

exports.store = [
    check("kode_kegiatan_rkt").notEmpty().withMessage("Kode Kegiatan RKT Tidak Boleh Kosong"),
    check("kode_kegiatan_rkt").isNumeric().trim().escape().withMessage("Kode Kegiatan RKT Harus Angka"),
    check("kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"), 
    check("kode_asset").isLength({max : 10}).trim().escape().withMessage("Kode Asset Maksimal 10 Karakter"),
]

exports.update_pertama = [
    check("kode_kegiatan_rkt").notEmpty().withMessage("Kode Kegiatan RKT Tidak Boleh Kosong"),
    check("kode_kegiatan_rkt").isNumeric().trim().escape().withMessage("Kode Kegiatan RKT Harus Angka"),
    check("kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"), 
    check("kode_asset").isLength({max : 10}).trim().escape().withMessage("Kode Asset Maksimal 10 Karakter"),
    check("perkiraan_biaya").isNumeric().trim().escape().withMessage("Perkiraan Biaya Harus Angka"),
    check("kebutuhan_riil").isNumeric().trim().escape().withMessage("Perkiraan Biaya Harus Angka"),
    check("sedikit_tkdn").isNumeric().trim().escape().withMessage("Sedikit TKDN Harus Angka"),
    check("pnbp").isNumeric().trim().escape().withMessage("PNBP Harus Angka"),
    check("rm").isNumeric().trim().escape().withMessage("RM Harus Angka"),
]