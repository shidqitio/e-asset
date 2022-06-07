const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
  index,
  store,
  update,
  destroy,
  show,
} = require("../controllers/kegiatanjafungController");

router.get("/", index)
router.get("/:kode_kegiatan", show)

router.post("/",
[
  check("kode_unsur_utama")
  .notEmpty()
  .withMessage("Kode Unsur Tidak Boleh Kosong"),
  check("nama_kegiatan")
  .notEmpty()
  .withMessage("Nama Kegiatan Tidak Boleh Kosong")
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

router.put("/:kode_kegiatan", 
  [
    check("kode_unsur_utama")
    .notEmpty()
    .withMessage("Kode Unsur Tidak Boleh Kosong"),
    check("nama_kegiatan")
    .notEmpty()
    .withMessage("Nama Kegiatan Tidak Boleh Kosong")
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

router.delete("/:kode_kegiatan", destroy);


module.exports = router;
