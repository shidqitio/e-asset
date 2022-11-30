const {check} = require('express-validator')

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"),
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("nup").notEmpty().withMessage("Nup Tidak Boleh Kosong"),
    check("kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"),
    check("nilai_perolehan").notEmpty().withMessage("Nilai Perolehan Tidak Boleh Kosong"),
    check("nilai_perolehan").isNumeric().withMessage("Nilai Perolehan Harus Angka"),
    check("alasan").notEmpty().withMessage("Alasan Tidak Boleh Kosong"),
]