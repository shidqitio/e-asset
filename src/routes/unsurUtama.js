const express = require("express");
const router = express.Router();
const {
  index,
  create,
  show,
  updateId,
  deleteId,
} = require("../controllers/unsurutamaController");

router.get("/", index);
router.get("/:kode_unsur_utama", show);


module.exports = router;
