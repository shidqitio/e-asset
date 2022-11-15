const express = require("express")
const router = express.Router()

const {
    updatenup, 
    // qr,
    getbynup
} = require("../controllers/daftarbarangController")

router.put("/nup/:kode_asset/:kode_pembukuan", updatenup)
// router.get("/qrcode/:nup", qr)
router.get("/get-detail/:nup", getbynup)

module.exports = router