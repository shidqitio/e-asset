const express = require("express")
const router = express.Router();

const {
    index, 
    show, 
    store, 
    update, 
    destroy
} = require("../controllers/trxbankController");

const {check , validationResult} = require("express-validator");

router.get("/", index);

router.get("/:nip/:kode_bank", show);

router.post("/", store)

router.put("/:nip/:kode_bank", update)

router.delete("/:nip/:kode_bank", destroy)

module.exports = router