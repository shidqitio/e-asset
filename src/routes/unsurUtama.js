const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/unsurUtama");
const unsurSchema = require("../request/unsurUtama");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", unsurSchema.create, create);
router.put("/:id", unsurSchema.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
