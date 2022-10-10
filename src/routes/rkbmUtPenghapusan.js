const express = require("express")
const router = express.Router()

const {validationResult} = require("express-validator")

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
    parafapipselesai, 
} = require("../controllers/rkbmutpenghapusanController")

const path = require("path")
const fs = require("fs")
const multer = require("multer")

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null,"./public/images/foto_barang_rusak")
    }, 
    filename : (req,file, callback) => {
        const nama_image = Date.now() + "-" + Math.round(Math.random() * 1E9) + path.parse(file.originalname).ext
        callback(null, nama_image)
    }
});

const uploadImage = multer({
    storage : storage, 
    fileFilter(req,file,cb) {
        if(
            file.mimetype === "image/png" || 
            file.mimetype === "image/jpg" || 
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        }
        else {
            cb(null, true)
        }
    }
})

router.get("/indexunit/:kode_unit_kerja", indexunit)
router.get("/indexppk/:kode_unit_kerja", indexppk)
router.get("/indexapip/:kode_unit_kerja", indexapip)

router.post("/",
    [
        uploadImage.single("foto")
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
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






module.exports = router