const express = require("express")
const router = express.Router();

const {
    index,
    indexbyid,
    indexantrian,
    store, 
    updatenuptanah
} = require("../controllers/trxkibtanahController")

router.get("/antrian", indexantrian)
router.get("/", index)
router.get("/:kode_pembukuan", indexbyid)
router.post("/", store)
router.put("/:kode_asset/:kode_pembukuan", updatenuptanah)

module.exports = router