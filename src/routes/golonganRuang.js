const express = require("express");
const router = express.Router();
const {
  getAllGolonganRuang,
  createGolonganRuang,
  getGolonganRuangById,
  updateGolonganRuang,
  deleteGolonganRuang,
} = require("../controllers/golonganRuang");
const golonganRuangSchema = require("../request/golonganRuang");

router.get("/", getAllGolonganRuang);
router.post("/", golonganRuangSchema.create, createGolonganRuang);
router.post("/update", golonganRuangSchema.update, updateGolonganRuang);
router.get("/show", getGolonganRuangById);
router.post("/delete", deleteGolonganRuang);

module.exports = router;
