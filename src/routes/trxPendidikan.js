const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const{
    index, 
    store, 
    update, 
    show, 
    destroy

} = require("../controllers/trxpendidikanController")

router.get("/", index)

router.get("/:nip/:kode_tingkat_pendidikan", show)

router.post("/", 
    [
        check("nip")
        .notEmpty()
        .withMessage("Nip Tidak Boleh Kosong"),
        check("kode_tingkat_pendidikan")
        .notEmpty()
        .withMessage("Tingkat Pendidikan Tidak Boleh Kosong"), 
        check("nama_sekolah")
        .notEmpty()
        .withMessage("Nama Sekolah Tidak Boleh Kosong"), 
        check("tahun_lulus")
        .notEmpty()
        .withMessage("Tahun Lulus Tidak Boleh Kosong")
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
      store
)

router.put("/:nip/:kode_tingkat_pendidikan", 
[
    check("nip")
    .notEmpty()
    .withMessage("Nip Tidak Boleh Kosong"),
    check("kode_tingkat_pendidikan")
    .notEmpty()
    .withMessage("Tingkat Pendidikan Tidak Boleh Kosong"), 
    check("nama_sekolah")
    .notEmpty()
    .withMessage("Nama Sekolah Tidak Boleh Kosong"), 
    check("tahun_lulus")
    .notEmpty()
    .withMessage("Tahun Lulus Tidak Boleh Kosong")
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
  update
)

router.delete("/:nip/:kode_tingkat_pendidikan", destroy)

module.exports = router