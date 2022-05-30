const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/jeniskaryatulisController");

const {check, validationResult} = require("express-validator")
 
router.get("/", index);
router.get("/:kode_jenis_karya_tulis", show);
router.post("/",
  [
    check("nama_jenis_karya_tulis")
    .isLength({max : 100})
    .withMessage("Nama Jenis Karya Tulis Maksimal 100 Karakter"), 
    check("nama_jenis_karya_tulis")
    .notEmpty()
    .withMessage("Nama Jenis Karya Tulis Tidak Boleh Kosong")
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
router.put("/:kode_jenis_karya_tulis",
[
  check("nama_jenis_karya_tulis")
  .isLength({max : 100})
  .withMessage("Nama Jenis Karya Tulis Maksimal 100 Karakter"), 
  check("nama_jenis_karya_tulis")
  .notEmpty()
  .withMessage("Nama Jenis Karya Tulis Tidak Boleh Kosong")
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
router.delete("/:kode_jenis_karya_tulis", destroy);

module.exports = router;
