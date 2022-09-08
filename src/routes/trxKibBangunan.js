const express = require("express")
const router = express.Router();

const {
    index,
    indexbyid,
    store, 
    indexantrian,
    updatenupbangunan
} = require("../controllers/trxkibbangunanController")

router.get("/", index)
router.get("/:kode_pembukuan", indexbyid)
router.get("/antrian", indexantrian)
router.put("/:kode_asset/:kode_pembukuan", updatenupbangunan)


module.exports = router