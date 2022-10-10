const express = require("express")
const router = express.Router()

const {
    indexunit,
    indexapip, 
    indexppk, 
    store, 
    ajukanppk, 
    parafppk, 
    reviewapip, 
    reviewunit, 
    parafapipselesai, 
    parafunitselesai, 
    update, 
    destroy
} = require("../controllers/rkbmutpemindahtangananController")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/", store)
router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)
router.put("/parafppk/:kode_unit_kerja", parafppk)
router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", reviewunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapipselesai)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)

//Update 
router.put("/update/:nup", update)

//delete 
router.delete("/delete/:nup", destroy)

module.exports = router