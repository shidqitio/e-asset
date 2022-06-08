const express = require("express")
const router = express.Router();

const {
    index, 
    store, 
    show, 
    update, 
    destroy
} = require("../controllers/jabatanpengadaandetailController");

const {check, validationResult} = require("express-validator");

router.get("/", index);

router.get("/:id", show); 

router.post("/", 
    [
        check("kode_jabatan_pengadaan")
        .notEmpty()
        .withMessage("Kode Jabatan Pengadaan Tidak Boleh Kosong"),
        check("nama_jabatan_pengadaan_detail")
        .notEmpty()
        .withMessage("Nama Jabatan Pengadaan Detail Tidak Boleh Kosong")
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

router.put("/:id", 
      [
        check("kode_jabatan_pengadaan")
        .notEmpty()
        .withMessage("Kode Jabatan Pengadaan Tidak Boleh Kosong"),
        check("nama_jabatan_pengadaan_detail")
        .notEmpty()
        .withMessage("Nama Jabatan Pengadaan Detail Tidak Boleh Kosong")
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

router.delete("/:id", destroy)

module.exports = router