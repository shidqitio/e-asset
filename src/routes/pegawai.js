const express = require("express");
const router = express.Router();
const {
  index, 
  store, 
  update, 
  show, 
  destroy
} = require("../controllers/pegawaiController");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {check, validationResult} = require("express-validator")

const storage = multer.diskStorage({
  destination : (req, file, callback) => {
    callback(null,"./public/images/foto_pegawai/");
  }, 
  filename: (req, file, callback) => {
    const nama_image = Date.now() + path.parse(file.originalname).ext;
    callback(null, nama_image);
  }
});

const uploadImage = multer({
  storage : storage, 
  fileFilter(req, file, cb) {
    if(
      file.mimetype === "image/png" || 
      file.mimetype === "image/jpg" || 
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})


router.get("/", index);

router.post(
  "/", 
  [
    uploadImage.single("foto_pegawai"),
    check("nip")
    .isLength({max : 20})
    .withMessage("NIP Maksimal 20 Karakter"),
    check("nip")
    .notEmpty()
    .withMessage("NIP Harus Diisi"),
    check("nama_pegawai")
    .isLength({max : 100})
    .withMessage("Nama Pegawai Maksimal 100 Karakter"),
    check("nama_pegawai")
    .notEmpty()
    .withMessage("Nama Pegawai Harus Diisi"),
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode_jafung Harus Diisi"),
    check("nidn")
    .isLength({max : 10})
    .withMessage("NIDN Pegawai Maksimal 10 Karakter"),
    check("tempat_lahir")
    .isLength({max : 100})
    .withMessage("tempat_lahir Maksimal 100 Karakter"),
    check("tempat_lahir")
    .notEmpty()
    .withMessage("Tempat Lahir Harus Diisi"),
    check("tanggal_lahir")
    .notEmpty()
    .withMessage("Tanggal Lahir Tidak Boleh Kosong"),
    check("jenis_kelamin")
    .notEmpty()
    .withMessage("Jenis Kelamin Tidak Boleh Kosong"),
    check("kode_agama")
    .notEmpty()
    .withMessage("Agama Tidak Boleh Kosong"),
    check("tmt_cpns")
    .notEmpty()
    .withMessage("tmt cpns Tidak Boleh Kosong"),
    check("tmt_pns")
    .notEmpty()
    .withMessage("tmt_pns Tidak Boleh Kosong"),
    check("alamat")
    .isLength({max : 300})
    .withMessage("Alamat Maksimal 300 Karakter"),
    check("alamat")
    .notEmpty()
    .withMessage("Alamat Tidak Boleh Kosong"),
    check("nomor_telp")
    .isLength({max:30})
    .withMessage("Nomor Telepon Maksimal 30 Karakter"),
    check("nomor_telp")
    .notEmpty()
    .withMessage("Nomor Telepon Tidak Boleh Kosong"),
    check("status_nikah")
    .notEmpty()
    .withMessage("status_nikah Tidak Boleh Kosong"),
    check("status_pegawai")
    .notEmpty()
    .withMessage("status_pegawai Tidak Boleh Kosong"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error;
    }
    next();
  }, 
  store
)


router.put(
  "/:nip", 
  [
    uploadImage.single("foto_pegawai"),
    check("nama_pegawai")
    .isLength({max : 100})
    .withMessage("Nama Pegawai Maksimal 100 Karakter"),
    check("nama_pegawai")
    .notEmpty()
    .withMessage("Nama Pegawai Harus Diisi"),
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode_jafung Harus Diisi"),
    check("nidn")
    .isLength({max : 10})
    .withMessage("NIDN Pegawai Maksimal 10 Karakter"),
    check("tempat_lahir")
    .isLength({max : 100})
    .withMessage("tempat_lahir Maksimal 100 Karakter"),
    check("tempat_lahir")
    .notEmpty()
    .withMessage("Tempat Lahir Harus Diisi"),
    check("tanggal_lahir")
    .notEmpty()
    .withMessage("Tanggal Lahir Tidak Boleh Kosong"),
    check("jenis_kelamin")
    .notEmpty()
    .withMessage("Jenis Kelamin Tidak Boleh Kosong"),
    check("kode_agama")
    .notEmpty()
    .withMessage("Agama Tidak Boleh Kosong"),
    check("tmt_cpns")
    .notEmpty()
    .withMessage("tmt cpns Tidak Boleh Kosong"),
    check("tmt_pns")
    .notEmpty()
    .withMessage("tmt_pns Tidak Boleh Kosong"),
    check("alamat")
    .isLength({max : 300})
    .withMessage("Alamat Maksimal 300 Karakter"),
    check("alamat")
    .notEmpty()
    .withMessage("Alamat Tidak Boleh Kosong"),
    check("nomor_telp")
    .isLength({max:30})
    .withMessage("Nomor Telepon Maksimal 30 Karakter"),
    check("nomor_telp")
    .notEmpty()
    .withMessage("Nomor Telepon Tidak Boleh Kosong"),
    check("status_nikah")
    .notEmpty()
    .withMessage("status_nikah Tidak Boleh Kosong"),
    check("status_pegawai")
    .notEmpty()
    .withMessage("status_pegawai Tidak Boleh Kosong"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const filename = path.parse(req.file.filename).base;
      const filePath = path.join(
        __dirname,
        "..",
        "..", 
        "public",
        "images",
        "foto_pegawai",
        filename,
      );
      fs.unlink(filePath, (err) => {
        console.log("Unlink Error", err);
      });
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error;
    }
    next();
  },
  update
);

router.get("/:nip", show);

router.delete("/:nip", destroy);




module.exports = router;
