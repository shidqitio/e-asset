const express = require("express")
const router = express.Router();

const {
    indexdetail,
    showbykodeform,
    store,
    antrean, 
    getbarangbyunit
} = require("../controllers/pembukuanController")

router.get("/", indexdetail)

router.get("/antrean", antrean)

router.get("/:kode_pembukuan", showbykodeform)

router.get("/unit/:kode_unit", getbarangbyunit)



router.post("/", store)

module.exports = router