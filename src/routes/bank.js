const express = require("express");
const router = express.Router();

const{
    index, 
    store, 
    show, 
    update, 
    destroy,
} = require("../controllers/bankController");
const {check, validationResult} = require("express-validator");

router.get("/", index);
router.get("/:kode_bank",show);

router.post(
    "/",
    [
        check("kode_bank")
        .isLength({max : 3})
        .withMessage("Kode Bank Maksimal 3 Karakter"),
        check("kode_bank")
        .notEmpty()
        .withMessage("Kode Bank Tidak Boleh Kosong"),
        check("nama_bank")
        .notEmpty()
        .withMessage("Nama Bank Tidak Boleh Kosong")
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
)

router.put("/:kode_bank",
      [
        check("kode_bank")
        .isLength({max : 3})
        .withMessage("Kode Bank Maksimal 3 Karakter"),
        check("kode_bank")
        .notEmpty()
        .withMessage("Kode Bank Tidak Boleh Kosong"),
        check("nama_bank")
        .notEmpty()
        .withMessage("Nama Bank Tidak Boleh Kosong")   
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

router.delete("/:kode_bank", destroy);

module.exports = router;