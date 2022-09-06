const express = require("express")
const router = express.Router();

const {
    index,
    store, 
    indexantrian,
    updatenupbangunan
} = require("../controllers/trxkibbangunanController")

router.get("/", index)
router.get("/antrian", indexantrian)
router.put("/:kode_asset/:kode_pembukuan", updatenupbangunan)


module.exports = router