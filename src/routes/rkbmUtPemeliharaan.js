const express = require("express")
const router = express.Router()

const{
store,
indexapip,
indexppk,
indexunit,
ajukanppk,
parafppk,
reviewapip, 
reviewunit, 
parafapip, 
parafunit, 
perbaikanppk,
perbaikanunit,
setujuppk,
update, 
destroy, 
destroyfromhead, 
destroyfromdetail
} = require("../controllers/rkbmutpemeliharaanController")

const {validationResult} = require("express-validator")
const RkbmPemeliharaanSchema = require("../middlewares/request/rkbmUtPemeliharaan")

//Get
router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexapip/:kode_unit_kerja", indexapip)
router.get("/indexppk/:kode_unit_kerja", indexppk)

router.post("/", 
RkbmPemeliharaanSchema.store,
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
router.post("/update", update)

//ajukan ke ppk 
router.put("/ajukanppk/:kode_unit_kerja",ajukanppk)

//Perbaikan PPK
router.put("/komentarppk/:jenis_belanja/:kode_unit_kerja", perbaikanppk)

//PPK Setuju Pengisian Unit
router.put("/setujuppk/:jenis_belanja/:kode_unit_kerja", setujuppk)

//Perbaikan Unit 
router.put("/perbaikanunit/:jenis_belanja/:kode_unit_kerja", perbaikanunit)

//paraf ppk
router.put("/parafppk/:kode_unit_kerja", parafppk)

router.put("/reviewapip/:kode_unit_kerja/:kode_jenis_belanja", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:kode_jenis_belanja", reviewunit)
router.put("/parafapip/:kode_unit_kerja/:kode_jenis_belanja", parafapip)
router.put("/parafunit/:kode_unit_kerja/:kode_jenis_belanja", parafunit)


router.delete("/delete/:kode_unit_kerja/:jenis_belanja", destroy)
router.delete("/delete/head/:kode_unit_kerja/:jenis_belanja", destroyfromhead)
router.delete("/delete/detail/:kode_unit_kerja/:jenis_belanja/:kode_asset", destroyfromdetail)

module.exports = router