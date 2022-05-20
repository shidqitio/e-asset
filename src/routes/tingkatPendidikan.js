const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/tingkatPendidikan");
const tingkatSchema = require("../request/tingkatPendidikan");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", tingkatSchema.create, create);
router.put("/:id", tingkatSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
