const express = require('express')
const productRouter = express.Router()

const { getAllProducts } = require('../controllers/productController');
const { getProductById } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');
const { updateProduct } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');

const authSeller = require('../middlewares/authSeller')

productRouter.get('/', getAllProducts)

productRouter.get('/:productId', getProductById)

productRouter.post('/create', authSeller, createProduct)

productRouter.patch('/update/:productId', authSeller, updateProduct)

productRouter.delete('/delete/:productId', authSeller, deleteProduct)


module.exports = productRouter