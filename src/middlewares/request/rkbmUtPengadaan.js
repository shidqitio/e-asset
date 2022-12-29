const {check} = require("express-validator")

exports.store = [
    check("tahun").notEmpty().withMessage("Tahun Tidak Boleh Kosong"),
    check("unit").notEmpty().withMessage("Unit dan Kode Unit Tidak Boleh Kosong"),
    check("rkbmutpengadaandetail.*.kode_skema_pengadaan").notEmpty().withMessage("Kode Skema Pengadaan Tidak Boleh Kosong"),
    check("rkbmutpengadaandetail.*.kode_asset").notEmpty().withMessage("Kode Aset Tidak Boleh Kosong"),
]

exports.update = [
    check("rkbmdetail.*.kode_skema_pengadaan").notEmpty().withMessage("Kode Skema Pengadaan Tidak Boleh Kosong"),
    check("rkbmdetail.*.kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"),
    check("rkbmdetail.*.kuantitas").notEmpty().withMessage("Kuantitas Tidak Boleh Kosong"),
    check("rkbmdetail.*.sbsk").notEmpty().withMessage("SBSK Tidak Boleh Kosong"),
    check("rkbmdetail.*.kebutuhan_riil").notEmpty().withMessage("Kebutuhan Riil Tidak Boleh Kosong"),
]


exports.updateunit = [
    check("rkbmdetail.*.kode_skema_pengadaan").notEmpty().withMessage("Kode Skema Pengadaan Tidak Boleh Kosong"),
    check("rkbmdetail.*.kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"),
    check("rkbmdetail.*.kuantitas").notEmpty().withMessage("Kuantitas Tidak Boleh Kosong"),
    check("rkbmdetail.*.sbsk").notEmpty().withMessage("SBKS Tidak Boleh Kosong"),
    check("rkbmdetail.*.kebutuhan_riil").notEmpty().withMessage("Kebutuhan Riil Tidak Boleh Kosong"),
]
