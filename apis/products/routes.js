const express = require("express");
const upload = require("../../middleware/multer");

const Product = require("../../db/models/Product");
const {
  productListFetch,
  productCreate,
  productDelete,
  productUpdate,
  productDetailFetch,
  fetchProduct,
} = require("./controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    next({ status: 404, message: "Product Not Found!" });
  }
});

router.post("/", upload.single("image"), productCreate);

router.get("/", productListFetch);

router.get("/:productId", productDetailFetch);

router.put("/:productId", upload.single("image"), productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
