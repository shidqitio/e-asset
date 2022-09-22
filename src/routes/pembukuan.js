const express = require("express")
const router = express.Router();

const {check, validationResult } = require('express-validator')

const {
    indexdetail,
    showbykodeform,
    store,
    antrean, 
    gettanahbyunit, 
    getangkutanbyunit,
    getbarangbyunit,
    getalatbesarbyunit,
    getbangunanbyunit
} = require("../controllers/pembukuanController")

const pembukuanSchema = require("../middlewares/request/pembukuan")

router.get("/", indexdetail)

router.get("/antrean", antrean)

router.get("/:kode_pembukuan", showbykodeform)


router.get("/tanah/:kode_unit", gettanahbyunit)

router.get("/barang/:kode_unit",getbarangbyunit )

router.get("/angkutan/:kode_unit",getangkutanbyunit )

router.get("/alatbesar/:kode_unit",getalatbesarbyunit )

router.get("/bangunan/:kode_unit",getbangunanbyunit )


router.post("/", 
    [
        check("kode_asset").notEmpty().withMessage("Kode Asset Tidak Boleh Kosong"),
        check("asal_perolehan").notEmpty().withMessage("Asal Perolehan Tidak Boleh Kosong"),
        check("jumlah_barang").notEmpty().withMessage("Jumlah Barang Tidak Boleh Kosong"),
        check("jumlah_barang").isNumeric().withMessage("Jumlah Barang harus angka"),
        check("no_bukti_perolehan").notEmpty().withMessage("No Bukti Perolehan Tidak Boleh Kosong"),
        check("tanggal_pembukuan").notEmpty().withMessage("Tanggal Pembukuan Tidak Boleh Kosong"),
        check("merk").notEmpty().withMessage("Merk Tidak Boleh Kosong"),
        check("nilai_item").notEmpty().withMessage("Nilai Item Tidak Boleh Kosong"),
        check("nilai_item").isNumeric().withMessage("Nilai Item harus angka"),
        check("dasar_harga").notEmpty().withMessage("Dasar Harga Tidak Boleh Kosong"),
        check("metode_penyusutan").if(check('catat').equals('DBR' || 'DBL')).notEmpty().withMessage("Metode Penyusutan Tidak Boleh Kosong"),
        check("barang.*.kode_barang").if(check('catat').equals('DBR' || 'DBL')).notEmpty().withMessage("Kode Barang Tidak Boleh Kosong"),
        check("barang.*.kode_ruang").if(check('catat').equals('DBR' || 'DBL')).notEmpty().withMessage("Kode Ruang Tidak Boleh Kosong"),
        check("barang.*.deskripsi").if(check('catat').equals('DBR' || 'DBL')).notEmpty().withMessage("Deskripsi Tidak Boleh Kosong"),
        check("barang.*.kondisi").if(check('catat').equals('DBR' || 'DBL')).notEmpty().withMessage("Kondisi Tidak Boleh Kosong"),
        check("unit").if(check('catat').equals('KIB')).notEmpty().withMessage("Unit Tidak Boleh Kosong"),
        check("longitude").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Longitude Tidak Boleh Kosong"),
        check("latitude").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Latitude Tidak Boleh Kosong"),
        check("tanah_bangunan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Tanah Bangunan Tidak Boleh Kosong"),
        check("tanah_bangunan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).isNumeric().withMessage("Tanah Bangunan Harus Angka"),
        check("tanah_sarana").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Tanah Sarana Tidak Boleh Kosong"),
        check("tanah_sarana").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).isNumeric().withMessage("Tanah Sarana Harus Angka"),
        check("tanah_kosong").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Tanah Kosong Tidak Boleh Kosong"),
        check("tanah_kosong").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).isNumeric().withMessage("Tanah Kosong Harus Angka"),
        check("batas_utara").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Batas Utara Tidak Boleh Kosong"),
        check("batas_timur").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Batas Timur Tidak Boleh Kosong"),
        check("batas_selatan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Batas Selatan Tidak Boleh Kosong"),
        check("batas_barat").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Batas Barat Tidak Boleh Kosong"),
        check("no_dokumen").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Nomor Dokumen Tidak Boleh Kosong"),
        check("tanggal_dokumen").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Tanggal Dokumen Tidak Boleh Kosong"),
        check("instansi_penerbit").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Instansi Penerbit Tidak Boleh Kosong"),
        check("no_dana").if(check('catat').equals('KIB')).notEmpty().withMessage("Nomor Dokumen Tidak Boleh Kosong"),
        check("tanggal_dana").if(check('catat').equals('KIB')).notEmpty().withMessage("Tanggal Dana Tidak Boleh Kosong"),
        check("harga_taksiran_satuan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Harga Taksiran Satuan Tidak Boleh Kosong"),
        check("harga_taksiran_satuan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).isNumeric().withMessage("Harga Taksiran Satuan Harus Angka"),
        check("harga_njop_satuan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).notEmpty().withMessage("Harga NJOP Satuan Tidak Boleh Kosong"),
        check("harga_njop_satuan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^2.*$/)).isNumeric().withMessage("Harga NJOP Satuan Harus Angka"),
        check("kode_status_pemilik").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Kode Status Pemilik Tidak Boleh Kosong"),
        check("tahun_pembuatan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Tahun Pembuatan Tidak Boleh Kosong"),
        check("pabrik").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Pabrik Tidak Boleh Kosong"),
        check("negara").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("negara Tidak Boleh Kosong"),
        check("perakitan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Perakitan Tidak Boleh Kosong"),
        check("daya_muat").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Daya Muat Tidak Boleh Kosong"),
        check("bobot").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Bobot Tidak Boleh Kosong"),
        check("daya_mesin").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Daya Mesin Tidak Boleh Kosong"),
        check("mesin_penggerak").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Mesin Penggerak Tidak Boleh Kosong"),
        check("jumlah_mesin").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Jumlah Mesin Tidak Boleh Kosong"),
        check("bahan_bakar").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Bahan Bakar Tidak Boleh Kosong"),
        check("no_mesin").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Nomor Mesin Tidak Boleh Kosong"),
        check("no_rangka").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Nomor Rangka Tidak Boleh Kosong"),
        check("no_bpkp").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Nomor BPKB Tidak Boleh Kosong"),
        check("no_polis").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Nomor Polis Tidak Boleh Kosong"),
        check("harga_wajar").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).isNumeric().withMessage("Harga Wajar Harus Angka"),
        check("harga_wajar").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Harga Wajar Tidak Boleh Kosong"),
        check("catatan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^302.*$/)).notEmpty().withMessage("Catatan Tidak Boleh Kosong"),
        check("tahun_pembuatan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Tahun Pembuatan Tidak Boleh Kosong"),
        check("pabrik").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Pabrik Tidak Boleh Kosong"),
        check("negara").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Negara Tidak Boleh Kosong"),
        check("perakitan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Perakitan Tidak Boleh Kosong"),
        check("kapasitas").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Kapasitas Tidak Boleh Kosong"),
        check("sistem_pendingin").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Sistem Pendingin Tidak Boleh Kosong"),
        check("sistem_operasi").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Sistem Operasi Tidak Boleh Kosong"),
        check("sistem_pembakar").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Sistem Pembakar Tidak Boleh Kosong"),
        check("dudukan_peralatan").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Dudukan Peralatan Tidak Boleh Kosong"),
        check("power_train").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Power Train Tidak Boleh Kosong"),
        check("no_mesin").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Nomor Mesin Tidak Boleh Kosong"),
        check("no_rangka").if(check('catat').equals('KIB')).if(check('kode_asset').matches(/^301.*$/)).notEmpty().withMessage("Nomor Rangka Tidak Boleh Kosong"),
    ], 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error();
            error.statusCode = 422;
            error.message = errors.array();
            throw error;
          }
          next();
    },
store)

module.exports = router