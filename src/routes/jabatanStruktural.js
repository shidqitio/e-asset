const express = require("express");
const router = express.Router();
const {
  index,
  store,
  show, 
  update,
  destroy

} = require("../controllers/jabatanstrukturalController");
const {check, validationResult} = require("express-validator");


router.get("/", index);
router.get("/:kode_jabatan_struktural", show)
router.post("/",
  [
    check("nama_jabatan")
    .isLength({ max : 50})
    .withMessage("Nama Jabatan Maksimal 50 Karakter"),
    check("nama_jabatan")
    .notEmpty()
    .withMessage("Nama Jabatan Tidak Boleh Kosong"),
    check("kode_eselon")
    .notEmpty()
    .withMessage("Kode Eselon Tidak Boleh Kosong"),
    check("status_jabatan_struktural")
    .notEmpty()
    .withMessage("Status Jabatan Tidak Boleh Kosong"),
    check("kelas")
    .notEmpty()
    .withMessage("Kelas Tidak Boleh Kosong"), 
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
);

router.put("/:kode_jabatan_struktural", 
  [
    check("nama_jabatan")
    .isLength({ max : 50})
    .withMessage("Nama Jabatan Maksimal 50 Karakter"),
    check("nama_jabatan")
    .notEmpty()
    .withMessage("Nama Jabatan Tidak Boleh Kosong"),
    check("kode_eselon")
    .notEmpty()
    .withMessage("Kode Eselon Tidak Boleh Kosong"),
    check("status_jabatan_struktural")
    .notEmpty()
    .withMessage("Status Jabatan Tidak Boleh Kosong"),
    check("kelas")
    .notEmpty()
    .withMessage("Kelas Tidak Boleh Kosong"), 
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

router.delete("/kode_jabatan_struktural", destroy);


module.exports = router;

