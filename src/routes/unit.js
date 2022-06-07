const express = require("express");
const router = express.Router();
const {
  index,
  store,
  show,
  update,
  destroy,
} = require("../controllers/unitController");

const {check, validationResult} = require("express-validator");

router.get("/", index);

router.get("/:kode_unit", show);

router.post("/", 
  [
    check("kode_unit")
    .isLength({max : 100})
    .withMessage("Kode Unit Maksimal 100 Karakter"), 
    check("kode_unit")
    .notEmpty()
    .withMessage("Kode Unit Tidak Boleh Kosong"),
    check("nama_unit")
    .notEmpty()
    .withMessage("Nama Unit Tidak Boleh Kosong"),
    check("induk_unit")
    .isLength({max : 6})
    .withMessage("Induk Unit Maksimal 6 Karakter"), 
    check("induk_unit")
    .notEmpty()
    .withMessage("Induk Unit Tidak Boleh Kosong"),
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


router.put("/:kode_unit",
  [
    check("kode_unit")
    .isLength({max : 100})
    .withMessage("Kode Unit Maksimal 100 Karakter"), 
    check("kode_unit")
    .notEmpty()
    .withMessage("Kode Unit Tidak Boleh Kosong"),
    check("nama_unit")
    .notEmpty()
    .withMessage("Nama Unit Tidak Boleh Kosong"),
    check("induk_unit")
    .isLength({max : 6})
    .withMessage("Induk Unit Maksimal 6 Karakter"), 
    check("induk_unit")
    .notEmpty()
    .withMessage("Induk Unit Tidak Boleh Kosong"),
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
);
router.delete("/:kode_unit", destroy);

module.exports = router;
