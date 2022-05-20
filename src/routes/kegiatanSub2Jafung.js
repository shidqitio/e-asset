const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  getById,
  updateId,
  deleteId,
} = require("../controllers/kegiatanSub2Jafung");
const kegiatanSub2 = require("../request/kegiatanSub2Jafung");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", kegiatanSub2.create, create);
router.put("/:id", kegiatanSub2.update, updateId);
router.delete("/:id", deleteId);

module.exports = router;
