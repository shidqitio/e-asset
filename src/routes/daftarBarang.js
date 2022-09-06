const express = require("express")
const router = express.Router()

const {
    updatenup
} = require("../controllers/daftarbarangController")

router.put("/nup/:kode_asset/:kode_pembukuan", updatenup)

module.exports = router