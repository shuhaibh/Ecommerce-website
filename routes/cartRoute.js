const express = require('express')
const cartRouter = express.Router()

const { getCart } = require('../controllers/cartController');
const { addToCart } = require('../controllers/cartController');
const { updateCartItem } = require('../controllers/cartController');
const { removeFromCart } = require('../controllers/cartController');
const { clearCart } = require('../controllers/cartController');


cartRouter.get('/', getCart)

cartRouter.post('/add', addToCart)

cartRouter.patch('/update/:productId', updateCartItem)

cartRouter.delete('/remove/:productId', removeFromCart)

cartRouter.delete('/clear', clearCart)


module.exports = cartRouter