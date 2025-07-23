
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// --- Existing Functions ---
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user_id', 'name email')
      .populate('products_id'); // Assuming this should be orderItems or similar
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ status: 'pending' }).populate('item_id seller_id');
    res.status(200).json(pendingProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending products' });
  }
};

const approveProduct = async (req, res) => {
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
  try {
    const { productId } = req.params;
    const updated = await Product.findByIdAndUpdate(productId, { status: 'rejected' }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product rejected', product: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject product' });
  }
};


// --- User Management Functions ---

const getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude their passwords from the result
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, role } = req.body; // Allow updating role, name, or email

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


// --- EXPORT everything ---
module.exports = {
  getAllOrders,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getAllUsers,
  updateUser,
  deleteUser
};