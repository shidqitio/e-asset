const express = require("express")
const router = express.Router()


const path = require("path")
const fs = require("fs")
const multer = require("multer")
const { index, store, updatemetode, kirimkasubdit, revisikasubdik, kirimudirsarpras, parafdirsarpras } = require("../../controllers/sippan/metodekebutuhanController")
const MetodeKebutuhanSchema = require("../../middlewares/request/identifikasiKebutuhan")
const {checker} = require("../../helpers/utils")

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "./public/files/excel_metode_kebutuhan")
    },
    filename : (req,file,callback) => {
        const path_route = path.parse(file.originalname).ext
        const nama_image = (req.body.kode_kegiatan_rkt) + "-" +  (req.body.kode_asset) + path_route
        callback(null, nama_image)
    }
})

const uploadFile = multer({
    storage : storage, 
    fileFilter(req, file, cb) {
        if(
            file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "application/vnd.ms-excel"
        ) {
            cb(null, true)
        }
        else {
            cb(null, false)
            return cb(new Error("Only Excel allowed"))
        }
    }
})

router.get("/", index)

router.post("/",
    [
        uploadFile.single("upload_file")
    ],
    MetodeKebutuhanSchema.store,
    checker,
store)

router.put("/update_metode_kebutuhan/:kode_kegiatan_rkt/:kode_asset", updatemetode)

router.put("/kirim_metode_kasubdik/:kode_unit_kerja/:tahun", kirimkasubdit)

router.put("/revisi_kasubdik/:kode_kegiatan_rkt/:kode_asset",revisikasubdik)

router.put("/kirim_dirsarpras/:kode_unit_kerja/:tahun", kirimudirsarpras)

router.put("/paraf_dirsarpras/:kode_unit_kerja/:tahun", parafdirsarpras)


module.exports = router
