const express = require('express')
const sellerRouter = express.Router()

const { getSellerProducts } = require('../controllers/sellerController');
const { uploadProduct } = require('../controllers/sellerController');
const { updateSellerProduct } = require('../controllers/sellerController');
const { getSellerOrders } = require('../controllers/sellerController');

const authSeller = require('../middlewares/authSeller')

const upload = require('../middlewares/multer');

sellerRouter.get('/products', authSeller, getSellerProducts)

sellerRouter.post('/upload', authSeller, upload.single('image'), uploadProduct)

sellerRouter.patch('/update/:productId', authSeller, updateSellerProduct)

sellerRouter.get('/orders', authSeller, getSellerOrders)


module.exports = sellerRouter