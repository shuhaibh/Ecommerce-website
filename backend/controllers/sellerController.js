const Product = require('../models/Product');
const Order = require('../models/Order');
const Item = require('../models/Item');
const mongoose = require('mongoose');

const getSellerProducts = async (req, res) => {
  try {
    console.log("Seller user object:", req.user);
    const sellerId = req.user.id;
    const products = await Product.find({ seller_id: sellerId }).populate('item_id');
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Seller Products Error:", error);
    res.status(500).json({ error: 'Failed to fetch seller products' });
  }
};

const uploadProduct = async (req, res) => {
  try {
    const { name, category, description, price, keywords } = req.body;
    const image_url = req.file?.path;
    const seller_id = req.user.id;

    if (!image_url || !price) {
      return res.status(400).json({ message: "Image and price are required" });
    }

    const item = await Item.create({
      name,
      category,
      description,
      price: Number(price),
      image_url,
      keywords: keywords ? keywords.split(',') : [],
      available_count: 1,
      rating: 0,
    });

    const product = await Product.create({
      item_id: item._id,
      seller_id,
      status: 'pending',
    });

    res.status(201).json({ message: 'Product uploaded and pending approval', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Product upload failed' });
  }
};

const updateSellerProduct = async (req, res) => {
  try {
    console.log("req.params:", req.params)
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const existingProduct = await Product.findById(productId);
    console.log("Product found without seller check:", existingProduct);

    const product = await Product.findOneAndUpdate(
      { _id: productId, seller_id: req.user.id },
      req.body,
      { new: true }
    );
    console.log(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const orders = await Order.find({}).populate('products_id');

    const sellerOrders = orders.filter(order =>
      order.products_id.some(p => p.seller_id.toString() === sellerId.toString())
    );

    res.status(200).json(sellerOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller orders' });
  }
};

module.exports = {
  getSellerProducts,
  uploadProduct,
  updateSellerProduct,
  getSellerOrders
};
