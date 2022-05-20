const express = require("express");
const router = express.Router();
const {
  index,
  store,
  show,
  update,
  destroy,
} = require("../controllers/fakultasController");
const { check, validationResult } = require("express-validator");

router.get("/", index);
router.post(
  "/",
  [
    check("nama_fakultas")
      .isLength({ max: 25 })
      .withMessage("Nama fakultas maximal 25 karakter"),
    check("nama_fakultas")
      .notEmpty()
      .withMessage("Nama fakultas harus di isi."),
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
router.get("/:kode_fakultas", show);
router.put("/:kode_fakultas",
[
  check("nama_fakultas")
  .isLength({ max: 25 })
  .withMessage("Nama fakultas maximal 25 karakter"),
  check("nama_fakultas")
  .notEmpty()
  .withMessage("Nama fakultas harus di isi."),

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
router.delete("/:kode_fakultas", destroy);

module.exports = router;
