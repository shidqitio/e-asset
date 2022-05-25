const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/hukumanController");
const { check, validationResult } = require("express-validator");


router.get("/", index);
router.get("/:kode_hukuman", show);
router.post(
  "/",
  [
    check("nama_hukuman")
      .isLength({ max: 100 })
      .withMessage("Nama fakultas maximal 100 karakter"),
    check("nama_hukuman")
      .notEmpty()
      .withMessage("Nama Hukuman harus di isi."),
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
router.put("/:kode_hukuman", 
  [
    check("nama_hukuman")
    .isLength({ max: 100 })
    .withMessage("Nama fakultas maximal 100 karakter"),
    check("nama_hukuman")
    .notEmpty()
    .withMessage("Nama Hukuman harus di isi."),
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
update);
router.delete("/:kode_hukuman", destroy);

module.exports = router;
