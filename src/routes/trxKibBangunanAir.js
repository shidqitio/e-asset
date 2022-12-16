const express = require("express")
const router = express.Router();

const {
    indexantrian,
    updatenupbangunan
} = require("../controllers/trxkibbangunanairController")


router.get("/antrian", indexantrian)
router.put("/:kode_asset/:kode_pembukuan", updatenupbangunan)


module.exports = router