const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/unit");
const unitSchema = require("../request/unit");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", unitSchema.create, create);
router.put("/:id", unitSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
