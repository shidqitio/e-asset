const express = require("express");
const router = express.Router();
const agamaRoutes = require("./agama");
const fakultasRoutes = require("./fakultas");
const hukumanRoutes = require("./hukuman");
const pegawaiRoutes = require("./pegawai");
const golonganruangRoutes = require("./golonganRuang");
const jenisfungsionalRoutes = require("./jenisFungsional"); 
const jafungRoutes = require("./jafung");
const jafungpangkatRoutes = require("./jafungPangkat")
const keluargaRoutes = require("./keluarga");
const jabatanstrukturalRoutes = require("./jabatanStruktural");
const jeniskaryatulisRoutes = require("./jenisKaryaTulis");
const tingkatpendidikanRoutes = require("./tingkatPendidikan");
const programstudiRoutes = require("./programStudi");
const jurusanRoutes = require("./jurusan");
const bankRoutes = require("./bank");
const jabatanpengadaanRoutes = require("./jabatanPengadaan");

router.use("/agama", agamaRoutes);
router.use("/fakultas", fakultasRoutes);
router.use("/hukuman", hukumanRoutes);
router.use("/pegawai", pegawaiRoutes);
router.use("/golonganruang",golonganruangRoutes);
router.use("/jenisfungsional",jenisfungsionalRoutes);
router.use("/jafung",jafungRoutes); 
router.use("/jafpang", jafungpangkatRoutes)
router.use("/keluarga",keluargaRoutes);
router.use("/jastruk", jabatanstrukturalRoutes);
router.use("/karya_tulis", jeniskaryatulisRoutes);
router.use("/tingkat_pendidikan", tingkatpendidikanRoutes);
router.use("/prodi", programstudiRoutes);
router.use("/jurusan", jurusanRoutes);
router.use("/bank", bankRoutes);
router.use("/jabatan_pengadaan", jabatanpengadaanRoutes)


module.exports = router;
