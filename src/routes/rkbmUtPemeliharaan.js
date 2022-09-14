const express = require("express")
const router = express.Router()

const{
store
} = require("../controllers/rkbmutpemeliharaanController")

router.post("/", store)

module.exports = router