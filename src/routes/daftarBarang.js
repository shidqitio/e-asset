const express = require("express")
const router = express.Router()

const {
    updatenup, 
    qr
} = require("../controllers/daftarbarangController")

router.put("/nup/:kode_asset/:kode_pembukuan", updatenup)
router.get("/qrcode/:nup", qr)

module.exports = router