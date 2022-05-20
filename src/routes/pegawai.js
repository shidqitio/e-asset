const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/pegawai");
const pegawaiSchema = require("../request/pegawai");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", pegawaiSchema.create, create);
router.put("/:id", pegawaiSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
