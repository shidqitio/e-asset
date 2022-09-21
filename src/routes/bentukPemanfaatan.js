const express = require("express")
const router = express.Router();

const {
    index, 
    show
} = require("../controllers/bentukpemanfaatanController")

router.get("/", index)

router.get("/:kode_bentuk_pemanfaatan", show)

module.exports = router