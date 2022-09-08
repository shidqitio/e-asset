const express = require("express")
const router = express.Router();

const {
    index,
    indexbyid,
    store, 
    indexantrian,
    updatenupalatbesar
} = require("../controllers/trxkibbesarController")

router.get("/", index)
router.get("/:kode_pembukuan", indexbyid)
router.get("/antrian",indexantrian)
router.put("/:kode_asset/:kode_pembukuan", updatenupalatbesar)


module.exports = router