const Product = require('../models/Product');
const Order = require('../models/Order');

const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const products = await Product.find({ seller_id: sellerId }).populate('item_id');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seller products' });
  }
};

const uploadProduct = async (req, res) => {
  try {
    const { item_id } = req.body;

    const newProduct = await Product.create({
      item_id,
      seller_id: req.user._id,
    });

    res.status(201).json({ message: 'Product uploaded', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Product upload failed' });
  }
};

const updateSellerProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOneAndUpdate(
      { _id: productId, seller_id: req.user._id },
      req.body,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
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