const express = require("express")
const router = express.Router();

const {
    index,
    indexbyid,
    store, 
    updatenupangkutan
} = require("../controllers/trxkibangkutanController")

router.get("/", index)
router.get("/:kode_pembukuan", indexbyid)
router.post("/", store)
router.put("/:kode_asset/:kode_pembukuan", updatenupangkutan)

module.exports = router