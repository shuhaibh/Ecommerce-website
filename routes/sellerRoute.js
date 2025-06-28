const express = require('express')
const sellerRouter = express.Router()

const { getSellerProducts } = require('../controllers/sellerController');
const { uploadProduct } = require('../controllers/sellerController');
const { updateSellerProduct } = require('../controllers/sellerController');
const { getSellerOrders } = require('../controllers/sellerController');



sellerRouter.get('/products', getSellerProducts)

sellerRouter.post('/upload', uploadProduct)

sellerRouter.patch('/update/:sellerId', updateSellerProduct)

sellerRouter.get('/orders', getSellerOrders)


module.exports = sellerRouter