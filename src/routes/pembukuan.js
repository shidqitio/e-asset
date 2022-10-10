const express = require("express")
const router = express.Router();

const {check, validationResult } = require('express-validator')

const {
    indexdetail,
    showbykodeform,
    store,
    antrean, 
    gettanahbyunit, 
    getangkutanbyunit,
    getbarangbyunit,
    getalatbesarbyunit,
    getbangunanbyunit
} = require("../controllers/pembukuanController")

const pembukuanSchema = require("../middlewares/request/pembukuan")

router.get("/", indexdetail)

router.get("/antrean", antrean)

router.get("/:kode_pembukuan", showbykodeform)


router.get("/tanah/:kode_unit", gettanahbyunit)

router.get("/barang/:kode_unit",getbarangbyunit )

router.get("/angkutan/:kode_unit",getangkutanbyunit )

router.get("/alatbesar/:kode_unit",getalatbesarbyunit )

router.get("/bangunan/:kode_unit",getbangunanbyunit )


router.post("/", 
    pembukuanSchema.store
    , 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error();
            error.statusCode = 422;
            error.message = errors.array();
            throw error;
          }
          next();
    },
store)

module.exports = router