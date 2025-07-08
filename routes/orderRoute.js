const express = require('express')
const orderRouter = express.Router()

const { placeOrder } = require('../controllers/orderController');
const { getUserOrders } = require('../controllers/orderController');
const { getAllOrders } = require('../controllers/orderController');
const { updateOrderStatus } = require('../controllers/orderController');

const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

orderRouter.post('/', authUser, placeOrder)

orderRouter.get('/user/:userId', authUser, getUserOrders)

orderRouter.get('/admin', authAdmin, getAllOrders)

orderRouter.patch('/update/:orderId', authAdmin, updateOrderStatus)


module.exports = orderRouter