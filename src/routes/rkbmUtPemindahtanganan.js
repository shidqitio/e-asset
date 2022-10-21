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

const {validationResult} = require("express-validator")

const RkbmPindahtanganSchema = require("../middlewares/request/rkbmUtPemindahtanganan")

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/",
RkbmPindahtanganSchema.store,
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
router.put("/reviewapip/:kode_unit_kerja/:nup", reviewapip)
router.put("/reviewunit/:kode_unit_kerja/:nup", reviewunit)
router.put("/parafapipselesai/:kode_unit_kerja/:nup", parafapipselesai)
router.put("/parafunitselesai/:kode_unit_kerja/:nup", parafunitselesai)

//Update 
router.put("/update/:nup", update)

//delete 
router.delete("/delete/:nup", destroy)

module.exports = router