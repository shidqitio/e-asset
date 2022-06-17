const express = require("express");
const {check, validationResult} = require("express-validator");
const router = express.Router();
const {
    index, 
    store, 
    update, 
    destroy
} = require("../controllers/kartuController");

router.get("/", index)

router.post("/", 
    [
        check("nama_kartu")
        .notEmpty()
        .withMessage("Nama Kartu Tidak Boleh Kosong")
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
      )

router.put("/:kode_kartu", 
      [
        check("nama_kartu")
        .notEmpty()
        .withMessage("Nama Kegiatan Tidak Boleh Kosong")
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
)

router.delete("/:kode_kartu", destroy);

module.exports = router;