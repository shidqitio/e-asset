const express = require("express");
const router = express.Router();
const {
  getAllJenisKaryaTulis,
  createJenisKaryaTulis,
  getJenisKaryaTulisById,
  updateJenisKaryaTulis,
  deleteJenisKaryaTulis,
} = require("../controllers/jenisKaryaTulis");
const jenisKaryaTulisSchema = require("../request/jenisKaryaTulis");

router.get("/", getAllJenisKaryaTulis);
router.get("/:id", getJenisKaryaTulisById);
router.post("/", jenisKaryaTulisSchema.create, createJenisKaryaTulis);
router.put("/:id", jenisKaryaTulisSchema.update, updateJenisKaryaTulis);
router.delete("/:id", deleteJenisKaryaTulis);

module.exports = router;
