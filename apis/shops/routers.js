const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middleware/multer");

const { ShopCreate, getShops, productCreate } = require("./controllers");

router.get("/", getShops);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ShopCreate
);
// router.post("/", ShopCreate);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);
// router.post("/:shopId/products", productCreate);

module.exports = router;
