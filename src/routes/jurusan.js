const express = require("express");
const{check, validationResult} = require("express-validator");
const router = express.Router();

const{
    index,
    store, 
    show, 
    update, 
    destroy
} = require("../controllers/jurusanController");


router.get("/", index);
router.get("/:kode_jurusan", show);
router.post("/",store);
router.put("/:kode_jurusan", update);
router.delete("/:kode_jurusan", destroy);

module.exports = router;