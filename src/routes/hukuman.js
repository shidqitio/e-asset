const express = require("express");
const router = express.Router();
const hukumanSchema = require("../request/hukuman");
const {
  getAllHukuman,
  getHukumanById,
  createHukuman,
  updateHukuman,
  deleteHukuman,
} = require("../controllers/hukuman");

router.get("/", getAllHukuman);
router.get("/:id", getHukumanById);
router.post("/", hukumanSchema.create, createHukuman);
router.put("/:id", hukumanSchema.update, updateHukuman);
router.delete("/:id", deleteHukuman);

module.exports = router;
