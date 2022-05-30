const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const {
  index, 
  store, 
  show, 
  update, 
  destroy

} = require("../controllers/programstudiController");

router.get("/", index); 
router.get("/:kode_program_studi", show);

router.post("/",
  [
    check("kode_fakultas")
    .notEmpty()
    .withMessage("Kode Fakultas Tidak Boleh Kosong"), 
    check("nama_program_studi")
    .notEmpty()
    .withMessage("Nama Prodi Tidak Boleh Kosong")
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
);

router.put("/:kode_program_studi", 
  [
    check("kode_fakultas")
    .notEmpty()
    .withMessage("Kode Fakultas Tidak Boleh Kosong"), 
    check("nama_program_studi")
    .notEmpty()
    .withMessage("Nama Prodi Tidak Boleh Kosong")
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

router.delete("/:kode_program_studi", destroy);


module.exports = router;
