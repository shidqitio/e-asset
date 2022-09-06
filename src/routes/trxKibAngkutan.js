const express = require("express")
const router = express.Router();

const {
    index,
    store, 
    updatenupangkutan
} = require("../controllers/trxkibangkutanController")

router.get("/", index)
router.post("/", store)
router.put("/:kode_asset/:kode_pembukuan", updatenupangkutan)

module.exports = router