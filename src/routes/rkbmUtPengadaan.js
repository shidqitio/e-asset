const express = require("express")
const router = express.Router()
const RkbmPengadaanSchema = require("../middlewares/request/rkbmUtPengadaan")
const {validationResult} = require("express-validator")
const {
    index, 
    indexapip,
    indexppk,
    store, 
    review, 
    parafunit, 
    parafunitselesai,
    reviewunit,
    parafapip,
    ajukanppk, 
    update, 
    destroy
} = require("../controllers/rkmbutpengadaanController")

router.get("/:kode_unit_kerja", index)

router.get("/ppk/:kode_unit_kerja",indexppk)

router.get("/apip/:kode_unit_kerja", indexapip)

router.post("/", 
RkbmPengadaanSchema.store, 
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
store)

router.post("/update", 
RkbmPengadaanSchema.store, 
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
update)

router.put("/review/:kode_unit_kerja/:kode_kegiatan_rkt", 
RkbmPengadaanSchema.update,
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
review)

router.put("/reviewunit/:kode_unit_kerja/:kode_kegiatan_rkt", 
RkbmPengadaanSchema.update,
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
reviewunit)

router.put("/parafunit/:kode_unit_kerja",parafunit)

router.put("/parafunitselesai/:kode_unit_kerja/:kode_kegiatan_rkt",parafunitselesai)

router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)

router.put("/parafapip/:kode_unit_kerja/:kode_kegiatan_rkt",parafapip)

router.delete("/delete/:kode_unit_kerja/:kode_kegiatan_rkt", destroy)



module.exports = router