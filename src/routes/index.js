const express = require("express");
const router = express.Router();
const agamaRoutes = require("./agama");
const fakultasRoutes = require("./fakultas");
const hukumanRoutes = require("./hukuman");
const pegawaiRoutes = require("./pegawai");
const golonganruangRoutes = require("./golonganRuang");
const jenisfungsionalRoutes = require("./jenisFungsional"); 

router.use("/agama", agamaRoutes);
router.use("/fakultas", fakultasRoutes);
router.use("/hukuman", hukumanRoutes);
router.use("/pegawai", pegawaiRoutes);
router.use("/golonganruang",golonganruangRoutes);
router.use("/jenisfungsional",jenisfungsionalRoutes);

module.exports = router;
