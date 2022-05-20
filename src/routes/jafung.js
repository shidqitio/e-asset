const express = require("express");
const router = express.Router();
const {
  getAllJafung,
  createJafung,
  getJafungById,
  updateJafung,
  deleteJafung,
} = require("../controllers/jafung");
const jafungSchema = require("../request/jafung");

router.get("/", getAllJafung);
router.get("/:id", getJafungById);
router.post("/", jafungSchema.create, createJafung);
router.put("/:id", jafungSchema.update, updateJafung);
router.delete("/:id", deleteJafung);

module.exports = router;
