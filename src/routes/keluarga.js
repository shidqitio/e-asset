const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/keluargaController");

const {check, validationResult} = require("express-validator")

router.get("/", index);
router.get("/:kode_keluarga", show);
router.post("/",
  [
    check("nama_keluarga")
    .isLength({ max : 100})
    .withMessage("Nama Keluarga maximal 100 Karakter"),
    check("nama_keluarga")
    .notEmpty()
    .withMessage("Nama Keluarga Tidak Boleh Kosong"),
  ], 
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error();
      error.statusCode = 422; 
      error.message = errors.array();
      throw error;
    }
    next()
  },
store);
router.put("/:kode_keluarga",
[
  check("nama_keluarga")
  .isLength({ max : 100})
  .withMessage("Nama Keluarga maximal 100 Karakter"),
  check("nama_keluarga")
  .notEmpty()
  .withMessage("Nama Keluarga Tidak Boleh Kosong"),
], 
(req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = new Error();
    error.statusCode = 422; 
    error.message = errors.array();
    throw error;
  }
  next()
},
update
);
router.delete("/:kode_keluarga", destroy);

module.exports = router;
