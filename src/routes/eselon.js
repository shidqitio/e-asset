const express = require("express");
const router = express.Router();
const {
    index, 
    show, 
    store, 
    update, 
    destroy
} = require("../controllers/eselonController");

const {check , validationResult} = require("express-validator");

router.get("/", index); 
router.get("/:kode_eselon", show);

router.post("/", 
    [
        check("nama_eselon")
        .isLength({max : 100})
        .withMessage("Nama Eselon Maksimal 100 Karakter "),
        check("nama_eselon")
        .notEmpty()
        .withMessage("Nama Eselon Tidak Boleh Kosong")
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

router.put("/:kode_eselon", 
[
    check("nama_eselon")
    .isLength({max : 100})
    .withMessage("Nama Eselon Maksimal 100 Karakter "),
    check("nama_eselon")
    .notEmpty()
    .withMessage("Nama Eselon Tidak Boleh Kosong")
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

router.delete("/:kode_eselon", destroy);

module.exports = router;