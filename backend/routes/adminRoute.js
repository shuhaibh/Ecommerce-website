const express = require('express');
const adminRouter = express.Router();

const { getAllOrders } = require('../controllers/adminController');
const { getPendingProducts } = require('../controllers/adminController');
const { approveProduct } = require('../controllers/adminController');
const { rejectProduct } = require('../controllers/adminController');

const authAdmin = require('../middlewares/authAdmin')

adminRouter.get('/orders', getAllOrders);
adminRouter.get('/products/pending', authAdmin, getPendingProducts);
adminRouter.patch('/products/approve/:productId', authAdmin, approveProduct);
adminRouter.patch('/products/reject/:productId', authAdmin, rejectProduct);

module.exports = adminRouter;
