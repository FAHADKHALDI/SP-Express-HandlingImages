const express = require("express");
const router = express.Router();

const {
  categoryCreate,
  getCategories,
  productCreate,
} = require("./controllers");

router.get("/", getCategories);
router.post("/", categoryCreate);
router.post("/:categoryId/products", productCreate);

module.exports = router;
