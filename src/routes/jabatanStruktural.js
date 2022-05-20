const express = require("express");
const router = express.Router();
const {
  getAllJabatanStruktural,
  createJabatanStruktural,
  getJabatanStrukturalById,
  updateJabatanStruktural,
  deleteJabatanStruktural,
} = require("../controllers/jabatanStruktural");
const jabatanStrukturalSchema = require("../request/jabatanStruktural");

router.get("/", getAllJabatanStruktural);
router.get("/:id", getJabatanStrukturalById);
router.post("/", jabatanStrukturalSchema.create, createJabatanStruktural);
router.put("/:id", jabatanStrukturalSchema.update, updateJabatanStruktural);
router.delete("/:id", deleteJabatanStruktural);

module.exports = router;
