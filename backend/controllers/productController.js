const Product = require('../models/Product');
const Item = require('../models/Item');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'approved' }).populate('item_id seller_id');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('item_id seller_id');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { item_id } = req.body;
    const seller_id = req.user._id;

    const product = await Product.create({
      item_id,
      seller_id,
      status: 'pending' 
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const updated = await Product.findOneAndUpdate(
      { _id: productId, seller_id: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found or not owned by you' });

    res.status(200).json({ message: 'Product updated', product: updated });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findOneAndDelete({
      _id: productId,
      seller_id: req.user.id
    });

    if (!deleted) return res.status(404).json({ message: 'Product not found or not owned by you' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
