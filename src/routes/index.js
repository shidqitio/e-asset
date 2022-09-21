const express = require("express");
const router = express.Router();

//Call Function  
const jenistrnRoutes = require("./jenisTrn");
const ruangRoutes = require("./ruang"); 
const assetRoutes = require("./asset")
const pembukuanRoutes = require("./pembukuan")
const daftarbarangRoutes = require("./daftarBarang")
const trxkibtanahRoutes = require("./trxKibTanah")
const dokumentanahRoutes = require("./dokumenTanah")
const statuspemilikRoutes = require("./statusPemilik")
const trxkibangkutanRoutes = require("./trxKibAngkutan")
const trxkibalatbesarRoutes = require("./trxKibBesar")
const trxkibbangunanRoutes = require("./trxKibBangunan")
const rkbmutpengadaanRoutes = require("./rkbmUtPengadaan")
const rkbmutpemanfaatanRoutes = require("./rkbmUtPemanfaatan")
const rkbmutpemeliharaanRoutes = require("./rkbmUtPemeliharaan")
const rkbmutpemindahtangananRoutes = require("./rkbmUtPemindahtanganan")
const bentukpemanfaatanRoutes = require("./bentukPemanfaatan")

//Routing 
router.use("/jenistrn", jenistrnRoutes)
router.use("/ruang", ruangRoutes)
router.use("/asset", assetRoutes)
router.use("/pembukuan", pembukuanRoutes)
router.use("/daftarbarang", daftarbarangRoutes)
router.use("/dokumentanah", dokumentanahRoutes)
router.use("/statuspemilik", statuspemilikRoutes)
router.use("/kibtanah", trxkibtanahRoutes)
router.use("/kibangkutan", trxkibangkutanRoutes)
router.use("/kibalatbesar",trxkibalatbesarRoutes)
router.use("/kibbangunan",trxkibbangunanRoutes)
router.use("/rkbmpengadaan", rkbmutpengadaanRoutes)
router.use("/rkbmpemanfaatan", rkbmutpemanfaatanRoutes)
router.use("/rkbmpemeliharaan", rkbmutpemeliharaanRoutes)
router.use("/rkbmpemindahtanganan", rkbmutpemindahtangananRoutes)
router.use("/bentukpemanfaatan", bentukpemanfaatanRoutes)

module.exports = router;