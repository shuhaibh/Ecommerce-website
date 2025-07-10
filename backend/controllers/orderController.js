const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    const { products_id, amount } = req.body;

    if (!products_id || !amount) {
      return res.status(400).json({ message: 'Incomplete order data' });
    }

    const order = await Order.create({
      user_id: req.user.id,
      products_id,
      amount
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error("Order Placement Error:", error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const orders = await Order.find({ user_id: userId }).populate('products_id');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    const orders = await Order.find().populate('user_id products_id');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
