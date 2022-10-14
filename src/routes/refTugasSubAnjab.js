const express = require("express")
const router = express.Router();
const{
    storepokok, 
    update, 
    destroy
} = require("../controllers/reftugassubanjabController")

const TugasSubAnjabSchema = require("../middlewares/request/refTugasSubAnjabRequest")

router.post("/", 
TugasSubAnjabSchema.store,
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
storepokok)
router.put("/update/:kode_jabatan_struktural/:kode_unit/:kode_tugas_sub", update)
router.delete("/destroy/:kode_jabatan_struktural/:kode_unit/:kode_tugas_sub",destroy)

module.exports = router