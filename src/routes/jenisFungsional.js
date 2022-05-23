const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/jenisfungsionalController");
const {check, validationResult} = require("express-validator");

router.get("/", index);
router.get("/:kode_jenis_fungsional", show);
router.post(
  "/",
  [
    check("nama_jenis_fungsional")
    .isLength({max : 100})
    .withMessage("Jenis Fungsional Maksimal 100 Karakter"),
    check("nama_jenis_fungsional")
    .notEmpty()
    .withMessage("Jenis Fungsional Tidak Boleh Kosong")
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
router.put(
  "/:kode_jenis_fungsional",
  [
    check("nama_jenis_fungsional")
    .isLength({max : 100})
    .withMessage("Jenis Fungsional Maksimal 100 Karakter"),
    check("nama_jenis_fungsional")
    .notEmpty()
    .withMessage("Jenis Fungsional Tidak Boleh Kosong")
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
router.delete("/:kode_jenis_fungsional",destroy);

module.exports = router;
