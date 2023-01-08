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
    destroy,
    setujuppk, 
    perbaikanppk, 
    perbaikanunit,
    destroymanfaat
} = require("../controllers/rkbmutpemanfaatanController")
const {validationResult} = require("express-validator")
const RkbmPemanfaatanSchema = require("../middlewares/request/rkbmUtPemanfaatan")
const {checker} = require("../helpers/utils")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/",
    RkbmPemanfaatanSchema.store,
    checker,
store)

//Proses PPK
router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)
router.put("/komentarppk/:kode_unit_kerja/:nup", perbaikanppk)
router.put("/setujuppk/:kode_unit_kerja/:nup", setujuppk)
router.put("/perbaikanunit/:kode_unit_kerja/:nup", perbaikanunit)
router.put("/parafppk/:kode_unit_kerja", parafppk)



router.put("/reviewapip/:kode_unit_kerja/:nup", 
RkbmPemanfaatanSchema.update,
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
reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", 
RkbmPemanfaatanSchema.update,
(req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       const error = new Error();
       error.statusCode = 422;
       error.message = errors.array();
       throw error;
     }    
     next();
}, reviewunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapip)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)
router.put("/update/:nup", update)

router.delete("/delete/:nup", destroy)
router.delete("/deletepemanfaatan/:nup", destroymanfaat)





module.exports = router