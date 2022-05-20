const express = require("express");
const router = express.Router();
const {
  getAllJenisDokumen,
  createJenisDokumen,
  getJenisDokumenById,
  updateJenisDokumen,
  deleteJenisDokumen,
} = require("../controllers/jenisDokumen");
const jenisDokumenSchema = require("../request/jenisDokumen");

router.get("/", getAllJenisDokumen);
router.get("/:id", getJenisDokumenById);
router.post("/", jenisDokumenSchema.create, createJenisDokumen);
router.put("/:id", jenisDokumenSchema.update, updateJenisDokumen);
router.delete("/:id", deleteJenisDokumen);

module.exports = router;
