const express = require("express")
const router = express.Router()

const {
    indexunit, 
    indexapip,
    store, 
    reviewapip, 
    parafunit, 
    parafunitselesai,
    parafapip, 
} = require("../controllers/rkbmutpemanfaatanController")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexapip", indexapip)
router.post("/", store)
router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/parafunit/:kode_unit_kerja/:nup", parafunit)
router.put("/parafapip/:kode_unit_kerja/:nup", parafapip)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)






module.exports = router