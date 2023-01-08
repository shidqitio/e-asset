const express = require("express")
const router = express.Router()

const {
    indexunit,
    indexapip, 
    indexppk, 
    store, 
    ajukanppk, 
    parafppk,
    perbaikanppk, 
    setujuppk,
     perbaikanunit,
    reviewapip,    
    reviewunit, 
    parafapipselesai, 
    parafunitselesai, 
    update, 
    destroy,
    destroypemindahtanganan
} = require("../controllers/rkbmutpemindahtangananController")

const {validationResult} = require("express-validator")

const {checker} = require("../helpers/utils")

const RkbmPindahtanganSchema = require("../middlewares/request/rkbmUtPemindahtanganan")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/",
RkbmPindahtanganSchema.store,
checker,
store)
//Proses PPK
router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)
router.put("/komentarppk/:kode_unit_kerja/:nup", perbaikanppk)
router.put("/setujuppk/:kode_unit_kerja/:nup", setujuppk)
router.put("/perbaikanunit/:kode_unit_kerja/:nup", perbaikanunit)
router.put("/parafppk/:kode_unit_kerja", parafppk)

router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", reviewunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapipselesai)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)

//Update 
router.put("/update/:nup", update)

//delete 
router.delete("/delete/:nup", destroy)
router.delete("/deletepindahtangan/:nup", destroypemindahtanganan)

module.exports = router