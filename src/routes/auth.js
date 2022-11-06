const express = require("express")
const router = express.Router();

const {
    tesopen, 
    index
} = require("../controllers/authController/authorizationController")

router.post("/tes", tesopen)
router.get("/tes", index)

module.exports = router