const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/kegiatanJafung");
const kegiatanSchema = require("../request/kegiatanJafung");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", kegiatanSchema.create, create);
router.put("/:id", kegiatanSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
