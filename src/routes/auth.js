const express = require("express")
const router = express.Router();

const {
    token, 
    get_token
    
} = require("../controllers/authController/authorizationController")

router.post("/", token)
router.get("/", get_token)
// router.get("/tes", index)

module.exports = router