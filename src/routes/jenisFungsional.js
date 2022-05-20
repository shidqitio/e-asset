const express = require("express");
const router = express.Router();
const {
  getAllJenisFungsional,
  createJenisFungsional,
  getJenisFungsionalById,
  updateJenisFungsional,
  deleteJenisFungsional,
} = require("../controllers/jenisFungsional");
const jenisFungsionalSchema = require("../request/jenisFungsional");

router.get("/", getAllJenisFungsional);
router.get("/:id", getJenisFungsionalById);
router.post("/", jenisFungsionalSchema.create, createJenisFungsional);
router.put("/:id", jenisFungsionalSchema.update, updateJenisFungsional);
router.delete("/:id", deleteJenisFungsional);

module.exports = router;
