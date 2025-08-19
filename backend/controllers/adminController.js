const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// --- Order Management ---

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// NEW: Get single order details
const getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user_id', 'name email')
      .populate({
        path: 'orderItems.product', // Ensure nested population works if needed
        model: 'Product'
      });
      
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order details', error: error.message });
  }
};

// NEW: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.orderStatus = status;
    await order.save({ validateBeforeSave: false }); // Add validation if needed

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

// NEW: Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};


// --- Product Management ---

const getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await Product.find({ status: 'pending' }).populate('seller_id', 'name email');
    res.status(200).json(pendingProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending products', error: error.message });
  }
};

const approveProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.productId, { status: 'approved' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product approved', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve product', error: error.message });
  }
};

const rejectProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.productId, { status: 'rejected' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product rejected', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject product', error: error.message });
  }
};


// --- User Management ---

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// NEW: Get single user details
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);

    // Check for duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email address is already in use.' });
    }

    // Check for validation error from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: error.message });
    }
    
    // Check for bad ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Generic server error for everything else
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  deleteOrder,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser
};