const express = require("express")
const router = express.Router();

const{
    store,
} = require("../controllers/TrxunitkerjapegawaiController")

router.post("/", store)

module.exports = router