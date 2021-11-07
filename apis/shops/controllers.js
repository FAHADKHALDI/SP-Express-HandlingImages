const Shop = require("../../db/models/Shop");

exports.getShops = async (req, res) => {
  try {
    const Shops = await Shop.find().populate("products");
    return res.json(Shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ShopCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const shopId = req.params.shopId;

    if (!req.user._id.equals(req.shop.owner._id)) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.shopId = req.shop._id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);
    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
