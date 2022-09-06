const express = require("express")
const router = express.Router();

const {
    index,
    store, 
    indexantrian,
    updatenupalatbesar
} = require("../controllers/trxkibbesarController")

router.get("/", index)
router.get("/antrian",indexantrian)
router.put("/:kode_asset/:kode_pembukuan", updatenupalatbesar)


module.exports = router