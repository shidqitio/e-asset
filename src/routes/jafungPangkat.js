const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/jafungPangkat");
const jafungPangkatRoutes = require("../request/jafungPangkat");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", jafungPangkatRoutes.create, create);
router.put("/:id", jafungPangkatRoutes.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
