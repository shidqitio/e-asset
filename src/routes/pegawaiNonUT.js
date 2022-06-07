const express = require("express"); 
const router = express.Router(); 
const {
    index, 
    show, 
    store, 
    update,
    destroy
} = require("../controllers/pegawainonutController");

const {check, validationResult} = require("express-validator");
const { route } = require("./unit");

router.get("/", index); 
router.get("/:nip", show);

router.post("/", post); 

router.put("/:nip", update);

router.delete("/:nip", destroy);