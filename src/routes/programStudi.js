const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/programStudi");
const programStudiSchema = require("../request/programStudi");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", programStudiSchema.create, create);
router.put("/:id", programStudiSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
