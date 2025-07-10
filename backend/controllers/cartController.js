const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user_id: userId }).populate('items.product_id');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
};


const addToCart = async (req, res) => {
  try {
    const { product_id } = req.body;
    const userId = req.user.id;

    if (!product_id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $addToSet: { product_ids: product_id } }, // ✅ prevents duplicate adds
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart || !Array.isArray(cart.items)) {
      return res.status(404).json({ message: 'Cart or item list not found' });
    }

    const item = cart.items.find(i => i.product_id.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart item updated', cart });
  } catch (error) {
    console.error('Update Cart Item Error:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $pull: { product_ids: product_id } },
      { new: true }
    );

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove product' });
  }
};


const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $set: { product_ids: [] } },
      { new: true }
    );

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};


module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
