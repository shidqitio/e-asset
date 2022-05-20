const express = require("express");
const router = express.Router();
const {
  index,
  store,
  show,
  update,
  destroy,
} = require("../controllers/agamaController");
const { check, validationResult } = require("express-validator");
const Pegawai = require("../models/pegawai");

router.get("/", index);
router.post(
  "/",
  [
    check("nama_agama").notEmpty().withMessage("Nama agama harus di isi."),
    check("nama_agama")
      .isLength({ max: 25 })
      .withMessage("Nama agama maximal 25 karakter"),
    check("ucr")
      .custom(async (value, { req }) => {
        const user = await Pegawai.findOne({
          where: {
            nip: value,
          },
        });

        if (!user) {
          throw new Error("User tidak valid.");
        }
        req.user = user;
      })
      .withMessage("User tidak valid."),
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
router.put(
  "/:id",
  [
    check("nama_agama")
      .isLength({ max: 25 })
      .withMessage("Nama agama maximal 25 karakter"),
    check("nama_agama").notEmpty().withMessage("Nama agama harus di isi."),
    check("uch")
      .custom(async (value, { req }) => {
        const user = await Pegawai.findOne({
          where: {
            nip: value,
          },
        });

        if (!user) {
          throw new Error("User tidak valid.");
        }
        req.user = user;
      })
      .withMessage("User tidak valid."),
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
router.delete("/:id", destroy);

module.exports = router;
