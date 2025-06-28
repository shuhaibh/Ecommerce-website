const express = require('express')
const orderRouter = express.Router()

const { placeOrder } = require('../controllers/orderController');
const { getUserOrders } = require('../controllers/orderController');
const { getAllOrders } = require('../controllers/orderController');
const { updateOrderStatus } = require('../controllers/orderController');


orderRouter.post('/', placeOrder)

orderRouter.get('/user/:userId', getUserOrders)

orderRouter.get('/admin', getAllOrders)

orderRouter.patch('/update/:orderId', updateOrderStatus)


module.exports = orderRouter