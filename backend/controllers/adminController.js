const Order = require('../models/Order');
const Product = require('../models/Product');

const checkAdmin = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

const getAllOrders = async (req, res) => {
  checkAdmin(req, res);

  try {
    const orders = await Order.find()
      .populate('user_id', 'name email')
      .populate('products_id');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getPendingProducts = async (req, res) => {
  checkAdmin(req, res);

  try {
    const pendingProducts = await Product.find({ status: 'pending' }).populate('item_id seller_id');
    res.status(200).json(pendingProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending products' });
  }
};

const approveProduct = async (req, res) => {
  checkAdmin(req, res);

  try {
    const { productId } = req.params;
    const updated = await Product.findByIdAndUpdate(productId, { status: 'approved' }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product approved', product: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve product' });
  }
};

const rejectProduct = async (req, res) => {
  checkAdmin(req, res);

  try {
    const { productId } = req.params;
    const updated = await Product.findByIdAndUpdate(productId, { status: 'rejected' }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product rejected', product: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject product' });
  }
};

module.exports = {
  getAllOrders,
  getPendingProducts,
  approveProduct,
  rejectProduct
};
