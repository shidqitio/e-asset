const {check} = require("express-validator")

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"), 
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("pemindahtangan.*.kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"),
    check("pemindahtangan.*.nup").notEmpty().withMessage("NUP Tidak Boleh Kosong"),
    check("pemindahtangan.*.kode_pindah_tangan").notEmpty().withMessage("Kode Pindah Tangan Tidak Boleh Kosong"),
]