const express = require("express");
const router = express.Router();
const {
  index, 
  show, 
  store, 
  update, 
  destroy
} = require("../controllers/jenisdokumenController");

const {check , validationResult} = require("express-validator")

router.get("/", index);
router.get("/:kode_jenis_dokumen", show);
router.post("/", 
  [
    check("kode_jenis_dokumen")
    .notEmpty()
    .withMessage("Kode Jenis Dokumen Tidak Boleh Kosong"),
    check("nama_jenis_dokumen")
    .notEmpty()
    .withMessage("Nama Jenis Dokumen Tidak Boleh Kosong")
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

router.put("/:kode_jenis_dokumen",
  [ 
    check("nama_jenis_dokumen")
    .notEmpty()
    .withMessage("Nama Jenis Dokumen Tidak Boleh Kosong")
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
  update
);
router.delete("/:kode_jenis_dokumen", destroy);

module.exports = router;
