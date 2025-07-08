const express = require('express')
const cartRouter = express.Router()

const { getCart } = require('../controllers/cartController');
const { addToCart } = require('../controllers/cartController');
const { updateCartItem } = require('../controllers/cartController');
const { removeFromCart } = require('../controllers/cartController');
const { clearCart } = require('../controllers/cartController');

const authUser = require('../middlewares/authUser')

cartRouter.get('/', authUser, getCart)

cartRouter.post('/add', authUser, addToCart)

cartRouter.patch('/update/:productId', authUser, updateCartItem)

cartRouter.delete('/remove/:productId', authUser, removeFromCart)

cartRouter.delete('/clear', authUser, clearCart)


module.exports = cartRouter