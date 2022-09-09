const express = require("express")
const router = express.Router()

const {
    index, 
    store, 
    reviewapip, 
    reviewunit,
    parafunit, 
    parafunitselesai,
    parafapip, 
} = require("../controllers/rkbmutpemanfaatanController")

router.get("/index/:kode_unit_kerja", index)

router.post("/", store)
router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", reviewunit)
router.put("/parafunit/:kode_unit_kerja/:nup", parafunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapip)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)






module.exports = router