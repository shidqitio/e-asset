const express = require("express")
const router = express.Router()

const {
    indexunit, 
    indexppk, 
    indexapip,
    store, 
    ajukanppk,
    parafppk,
    reviewapip, 
    reviewunit,
    parafunitselesai,
    parafapip, 
    update, 
    destroy
} = require("../controllers/rkbmutpemanfaatanController")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/", store)
router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)
router.put("/parafppk/:kode_unit_kerja", parafppk)
router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", reviewunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapip)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)
router.put("/update/:nup", update)
router.delete("/delete/:nup", destroy)






module.exports = router