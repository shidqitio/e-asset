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
const {validationResult} = require("express-validator")
const RkbmPemanfaatanSchema = require("../middlewares/request/rkbmUtPemanfaatan")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/",
    RkbmPemanfaatanSchema.store,
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


router.put("/ajukanppk/:kode_unit_kerja", ajukanppk)
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






module.exports = router