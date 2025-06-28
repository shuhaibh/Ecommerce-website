const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id }).populate('items.product_id');
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user_id: req.user._id,
        items: [{ product_id, quantity }]
      });
    } else {
      const existingItem = cart.items.find(item => item.product_id.toString() === product_id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product_id, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.product_id.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product_id.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
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