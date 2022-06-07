const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  index,
  show,
  store, 
  update, 
  destroy
} = require("../controllers/kegiatansubjafung1Controller");

router.get("/",index); 
router.get("/:kode_kegiatan_sub1", show)
router.post("/", 
  [
    check("kode_kegiatan")
    .notEmpty()
    .withMessage("Kode Kegiatan Tidak Boleh Kosong"), 
    check("nama_kegiatan_sub1")
    .notEmpty()
    .withMessage("Nama Kegiatan Sub 1 Tidak Boleh Kosong")
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
router.put("/:kode_kegiatan_sub1", 
  [
    check("kode_kegiatan")
    .notEmpty()
    .withMessage("Kode Kegiatan Tidak Boleh Kosong"), 
    check("nama_kegiatan_sub1")
    .notEmpty()
    .withMessage("Nama Kegiatan Sub 1 Tidak Boleh Kosong")
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
)
router.delete("/:kode_kegiatan_sub1", destroy)



module.exports = router;
