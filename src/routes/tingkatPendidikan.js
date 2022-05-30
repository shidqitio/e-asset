const express = require("express");
const router = express.Router();
const {
  index,
  store,
  show,
  update,
  destroy,
} = require("../controllers/tingkatpendidikanController");

const {check, validationResult} = require("express-validator")

router.get("/", index);
router.get("/:kode_tingkat_pendidikan", show);
router.post("/", 
  [
    check("nama_tingkat_pendidikan")
    .isLength({max : 100})
    .withMessage("Nama Tingkat Pendidikan Maksimal 100 Karakter"),
    check("nama_tingkat_pendidikan")
    .notEmpty()
    .withMessage("Nama Tingkat Pendidikan Tidak Boleh Kosong")
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

router.put("/:kode_tingkat_pendidikan", 
  [
    check("nama_tingkat_pendidikan")
    .isLength({max : 100})
    .withMessage("Nama Tingkat Pendidikan Maksimal 100 Karakter"),
    check("nama_tingkat_pendidikan")
    .notEmpty()
    .withMessage("Nama Tingkat Pendidikan Tidak Boleh Kosong")
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422;
      error.message = errors.array();
      throw error;
    }
    next();
  },
  update
);

router.delete("/:kode_tingkat_pendidikan", destroy);

module.exports = router;
