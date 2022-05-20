const express = require("express");
const router = express.Router();
const agamaRoutes = require("./agama");
const fakultasRoutes = require("./fakultas");

router.use("/agama", agamaRoutes);
router.use("/fakultas", fakultasRoutes);

module.exports = router;
