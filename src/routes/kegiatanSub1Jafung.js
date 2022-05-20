const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/kegiatanSub1Jafung");
const kegiatanSub1 = require("../request/kegiatanSub1Jafung");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", kegiatanSub1.create, create);
router.put("/:id", kegiatanSub1.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
