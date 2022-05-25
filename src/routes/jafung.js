const express = require("express");
const router = express.Router();
const {
  index,
  store, 
  update, 
  show,
  destroy
  
} = require("../controllers/jafungController");
const {check, validationResult} = require("express-validator");


router.get("/", index);
router.get("/:kode_jafung", show)

router.post("/",
  [
    check("kode_jenis_fungsional")
    .notEmpty()
    .withMessage("Kode Jenis Fungsional Tidak Boleh Kosong"),
    check("nama_jafung")
    .isLength({max : 100})
    .withMessage("Nama Jabatan Fungsional Maksimal 100 Karakter"),
    check("nama_jafung")
    .notEmpty()
    .withMessage("Nama Jabatan Fungsional Tidak Boleh Kosong")
  ], 
  (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error;
    }
    next();
  },
  store
);


router.put("/:kode_jafung", 
  [
    check("kode_jenis_fungsional")
    .notEmpty()
    .withMessage("Kode Jenis Fungsional Tidak Boleh Kosong"),
    check("nama_jafung")
    .isLength({max : 100})
    .withMessage("Nama Jabatan Fungsional Maksimal 100 Karakter"),
    check("nama_jafung")
    .notEmpty()
    .withMessage("Nama Jabatan Fungsional Tidak Boleh Kosong")
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
router.delete("/:kode_jafung", destroy)

module.exports = router;
