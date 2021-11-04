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
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const shopId = req.params.shopId;
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
