const express = require("express");
const router = express.Router();
const {
  index, 
  store, 
  show, 
  update, 
  destroy
} = require("../controllers/kegiatansubjafungsub2Controller");

const {check, validationResult} = require("express-validator");

router.get("/", index);
router.get("/:kode_kegiatan_sub2", show);
router.post("/", 
  [
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode Jafung Tidak Boleh Kosong"), 
    check("kode_kegiatan_sub1")
    .notEmpty()
    .withMessage("Kode Kegiatan Sub 1 Tidak Boleh Kosong"),
    check("nama_kegiatan_sub2")
    .notEmpty()
    .withMessage("Nama Kegiatan Tidak Boleh Kosong"),
    check("bukti_kegiatan")
    .notEmpty()
    .withMessage("Bukti Kegiatan Tidak Boleh Kosong"),
    check("batas_maks")
    .notEmpty()
    .withMessage("Batas Maksimal Tidak Boleh Kosong"),
    check("angka_kredit")
    .notEmpty()
    .withMessage("Angka Kredit Tidak Boleh Kosong"),
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error
    }
    next();
  },
  store
)

router.put("/:kode_kegiatan_sub2",
  [
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode Jafung Tidak Boleh Kosong"), 
    check("kode_kegiatan_sub1")
    .notEmpty()
    .withMessage("Kode Kegiatan Sub 1 Tidak Boleh Kosong"),
    check("nama_kegiatan_sub2")
    .notEmpty()
    .withMessage("Nama Kegiatan Tidak Boleh Kosong"),
    check("bukti_kegiatan")
    .notEmpty()
    .withMessage("Bukti Kegiatan Tidak Boleh Kosong"),
    check("batas_maks")
    .notEmpty()
    .withMessage("Batas Maksimal Tidak Boleh Kosong"),
    check("angka_kredit")
    .notEmpty()
    .withMessage("Angka Kredit Tidak Boleh Kosong"),
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error
    }
    next();
  },
  update
)

router.delete("/:kode_kegiatan_sub2", destroy);


module.exports = router;
