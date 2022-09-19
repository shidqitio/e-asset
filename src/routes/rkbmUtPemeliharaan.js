const express = require("express")
const router = express.Router()

const{
store,
indexapip,
indexppk,
indexunit,
reviewapip, 
reviewunit, 
parafapip, 
parafunit
} = require("../controllers/rkbmutpemeliharaanController")

//Get
router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexapip/:kode_unit_kerja", indexapip)
router.get("/indexppk/:kode_unit_kerja", indexppk)

router.post("/", store)
router.put("/reviewapip/:kode_unit_kerja/:kode_jenis_belanja", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:kode_jenis_belanja", reviewunit)
router.put("/parafapip/:kode_unit_kerja/:kode_jenis_belanja", parafapip)
router.put("/parafunit/:kode_unit_kerja/:kode_jenis_belanja", parafunit)

module.exports = router