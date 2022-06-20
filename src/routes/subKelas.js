const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  destroy,

} = require("../controllers/subkelasController");

const {check, validationResult} = require("express-validator")

router.get("/", index);
router.get("/:kode_tingkat_pendidikan", show);

router.post("/", 
  [
    check("gaji")
    .notEmpty()
    .withMessage("Gaji Tidak Boleh Kosong"), 
    
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

router.delete("/:kode_sub_kelas", destroy)


module.exports = router;
