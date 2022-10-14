const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const TugasAnjabSchema = require("../middlewares/request/refTugasAnjabRequest")
const {
    index, 
    storepokok,
    storetambahan, 
    update,
    destroy
} = require("../controllers/reftugasanjabController")

router.get("/", index)

router.post("/tugas-pokok", 
TugasAnjabSchema.store,
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
router.post("/tugas-tambahan", 
TugasAnjabSchema.store,
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
storetambahan)

router.put("/update/:kode_jabatan_struktural/:kode_unit/:kode_tugas", update)

router.delete("/destroy/:kode_jabatan_struktural/:kode_unit/:kode_tugas", destroy)


module.exports = router