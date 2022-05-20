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
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
