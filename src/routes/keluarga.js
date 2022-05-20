const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/keluarga");
const keluargaSchema = require("../request/keluarga");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", keluargaSchema.create, create);
router.put("/:id", keluargaSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
