const express = require("express")
const router = express.Router();

const {
    index,
    indexantrian,
    store, 
    updatenuptanah
} = require("../controllers/trxkibtanahController")

router.get("/", index)
router.get("/antrian", indexantrian)
router.post("/", store)
router.put("/:kode_asset/:kode_pembukuan", updatenuptanah)

module.exports = router