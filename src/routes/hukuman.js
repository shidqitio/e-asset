const express = require("express");
const router = express.Router();
const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/hukumanController");

router.get("/", index);
router.get("/:kode_hukuman", show);
router.post("/", store);
router.put("/:kode_hukuman", update);
router.delete("/:kode_hukuman", destroy);

module.exports = router;
