const express = require("express");
const router = express.Router();
const {
    index, 
    store, 
    show, 
    update, 
    destroy
} = require("../controllers/jabatanpengadaanController");

const {check , validationResult} = require("express-validator");

router.get("/", index);

router.get("/:kode_jabatan_pengadaan", show);

router.post("/", 
    [
        check("nama_jabatan_pengadaan")
        .isLength({max : 100})
        .withMessage("Nama Jabatan Pengadaan Maksimal 100 Karakter"),
        check("nama_jabatan_pengadaan")
        .notEmpty()
        .withMessage("Nama Jabatan Pengadaan Tidak Boleh Kosong")
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

router.put("/:kode_jabatan:pengadaan", 
      [
        check("nama_jabatan_pengadaan")
        .isLength({max : 100})
        .withMessage("Nama Jabatan Pengadaan Maksimal 100 Karakter"),
        check("nama_jabatan_pengadaan")
        .notEmpty()
        .withMessage("Nama Jabatan Pengadaan Tidak Boleh Kosong")
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
)

router.delete ("/:kode_jabatan_pengadaan", destroy);

module.exports = router;