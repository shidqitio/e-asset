const express = require("express");
const router = express.Router();
const {
  
  store,

} = require("../controllers/jabatanstrukturalController");

router.post("/", store);


module.exports = router;
