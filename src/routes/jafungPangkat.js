const express = require("express");
const router = express.Router();
const {
  index,
  tampil,
  show, 
  store,
  update, 
  destroy 

} = require("../controllers/jafungpangkatController");
const {check, validationResult} = require("express-validator");

router.get("/", index)
router.get("/data",tampil)
router.get("/:kode_jafung_pangkat", show)
router.post("/",
  [
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode Jafung Tidak Boleh Kosong"),
    check("nama_jafung_pangkat")
    .isLength({max : 100})
    .withMessage("Nama Jafung Pangkat Maksimal 100 Karakter"),
    check("kode_golongan_ruang")
    .notEmpty()
    .withMessage("Kode Golongan Ruang Tidak Boleh Kosong"), 
    check("angka_kredit")
    .notEmpty()
    .withMessage("Angka Kredit Tidak Boleh Kosong")
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422; 
      error.message - errors.array();
      throw error;
    }
    next()
  }, 
  store
);

router.put("/:kode_jafung_pangkat"
,
  [
    check("kode_jafung")
    .notEmpty()
    .withMessage("Kode Jafung Tidak Boleh Kosong"),
    check("nama_jafung_pangkat")
    .isLength({max : 100})
    .withMessage("Nama Jafung Pangkat Maksimal 100 Karakter"),
    check("kode_golongan_ruang")
    .notEmpty()
    .withMessage("Kode Golongan Ruang Tidak Boleh Kosong"), 
    check("angka_kredit")
    .notEmpty()
    .withMessage("Angka Kredit Tidak Boleh Kosong")
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
);

router.delete("/:kode_jafung_pangkat", destroy)



module.exports = router;
