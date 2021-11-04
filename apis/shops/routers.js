const express = require("express");
const router = express.Router();

const { ShopCreate, getShops, productCreate } = require("./controllers");

router.get("/", getShops);
router.post("/", ShopCreate);
router.post("/:shopId/products", productCreate);

module.exports = router;
