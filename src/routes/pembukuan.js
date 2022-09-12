const express = require("express")
const router = express.Router();

const {
    indexdetail,
    showbykodeform,
    store,
    antrean, 
    gettanahbyunit, 
    getbarangbyunit, 
    getangkutanbyunit
} = require("../controllers/pembukuanController")

router.get("/", indexdetail)

router.get("/antrean", antrean)

router.get("/:kode_pembukuan", showbykodeform)

router.get("/tanah/:kode_unit", gettanahbyunit)

router.get("/barang/:kode_unit",getbarangbyunit )

router.get("/angkutan/:kode_unit",getangkutanbyunit )


router.post("/", store)

module.exports = router