const {check} = require('express-validator')

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"),
    check("unit").notEmpty().withMessage("Unit Tidak Boleh Kosong"),
    check("pemanfaatan.*.kode_asset").notEmpty().withMessage("Kode Aset Tidak Boleh Kosong"),
    check("pemanfaatan.*.nup").notEmpty().withMessage("NUP Tidak Boleh Kosong"),
    check("pemanfaatan.*.kode_status_pemilik").notEmpty().withMessage("Kode Status Pemilik Tidak Boleh Kosong"),
    check("pemanfaatan.*.jumlah_item").isInt().withMessage("Jumlah Item Harus Angka"),
    check("pemanfaatan.*.total_realisasi_pnpb").isInt().withMessage("Total Realisasi PNPB harus angka")
]

exports.update = [
    check("total_realisasi_pnpb").isInt().withMessage("Total Realisasi PNPB harus angka"),
    check("jumlah_item").isInt().withMessage("Jumlah Item PNPB harus angka"),
    check("potensi_pnpb").isInt().withMessage("Potensi PNPB PNPB harus angka")
]