const express = require("express");
const router = express.Router();
const {
  index,
  store,
  update,
  show,
  destroy,
} = require("../controllers/golonganruangController");
const{check, validationResult } = require("express-validator")

router.get("/", index);
router.post(
  "/", 
  [
    check("kode_golongan_ruang")
    .isLength({max : 10})
    .withMessage("Kode Golongan Ruang Maksimal 10 Karakter"),
    check("kode_golongan_ruang")
    .notEmpty()
    .withMessage("Kode Golongan Ruang Tidak Boleh Kosong"),
    check("keterangan_pangkat")
    .isLength({max : 100})
    .withMessage("Keterangan Pangkat Maksimal 100 Karakter"),
    check("keterangan_pangkat")
    .notEmpty()
    .withMessage("Keterangan Pangkat Tidak Boleh Kosong")
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error;
    }
    next()
  }, 
  store
  );
router.post(
  "/update",
  [
    check("keterangan_pangkat")
      .isLength({max : 100})
      .withMessage("Keterangan Pangkat Maksimal 100 Karakter"),
    check("keterangan_pangkat")
      .notEmpty()
      .withMessage("Keterangan Pangkat Tidak Boleh Kosong")
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
  update
);
router.get("/show", show);
router.post("/delete", destroy);

module.exports = router;
