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
const unitRoutes = require("./unit")
const eselonRoutes = require("./eselon")
const kegiatanjafungRoutes = require("./kegiatanjafung");
const kegiatanjafungsub1Routes = require("./kegiatanSub1Jafung");
const kegiatanjafungsub2Routes = require("./kegiatanSub2Jafung");
const jenisdokumenRoutes = require("./jenisDokumen")
const jabatanpengadaandetailRoutes = require("./jabatanPengadaanDetail");
const trxjabatanstrukturalRoutes = require("./TrxJabatanStruktural");
const trxbankRouter = require("./trxBank");
const trxunitpegawaiRouter = require("./trxUnitKerjaPegawai")
const trxpendidikanRouter = require("./trxPendidikan")
const kartuRouter = require("./kartu")
const trxkartuRouter = require("./trxKartu")
const trxunitkerjaRouter = require("./trxUnitKerja")
const jabatanpegawaiRouter = require("./jabatanPegawai");
const trxanjabformaRouter = require("./trxAnjabFormA")
const trxanjabformbRouter = require("./trxAnjabFormB")
const trxanjabformcRouter = require("./trxAnjabFormC")
const trxanjabformdRouter = require("./trxAnjabFormD")
const trxanjabformeRouter = require("./trxAnjabFormE");
const trxunitkerjaupbjjRouter = require("./trxUnitKerjaUpbjj");
const trxanjabformeupbjjRouter = require("./trxAnjabFormEUpbjj")
const subkelasRouter = require("./subKelas");


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
router.use("/jabatanpengadaan", jabatanpengadaanRoutes);
router.use("/unit", unitRoutes);
router.use("/eselon", eselonRoutes);
router.use("/kegiatanjafung", kegiatanjafungRoutes);
router.use("/kegiatansub1", kegiatanjafungsub1Routes);
router.use("/kegiatansub2", kegiatanjafungsub2Routes);
router.use("/jenisdokumen", jenisdokumenRoutes);
router.use("/jabatanpengadaandetail", jabatanpengadaandetailRoutes);
router.use("/trxjabatanstruktural", trxjabatanstrukturalRoutes)
router.use("/trxbank", trxbankRouter)
router.use("/trxunitkerjapegawai", trxunitpegawaiRouter);
router.use("/trxpendidikan", trxpendidikanRouter);
router.use("/kartu", kartuRouter);
router.use("/trxkartu",trxkartuRouter);
router.use("/trxunitkerja", trxunitkerjaRouter);
router.use("/jabatanpegawai", jabatanpegawaiRouter);
router.use("/trxanjabforma", trxanjabformaRouter)
router.use("/trxanjabformb", trxanjabformbRouter);
router.use("/trxanjabformc", trxanjabformcRouter);
router.use("/trxanjabformd", trxanjabformdRouter );
router.use("/trxanjabforme", trxanjabformeRouter);
router.use("/trxunitkerjaupbjj", trxunitkerjaupbjjRouter);
router.use("/trxanjabformeupbjj", trxanjabformeupbjjRouter)
router.use("/subkelas", subkelasRouter)



module.exports = router;
