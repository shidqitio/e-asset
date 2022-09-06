const express = require("express")
const router = express.Router();

const {
    index, 
    showbyunit, 
    store,
    showruang,
} = require("../controllers/ruangController")

router.get("/", index)

router.get("/:kode_unit", showbyunit )

router.get("/barangruang/:kode_ruang", showruang)

router.post ("/", store)

module.exports = router