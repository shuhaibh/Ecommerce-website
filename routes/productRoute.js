const express = require('express')
const productRouter = express.Router()

const { getAllProducts } = require('../controllers/productController');
const { getProductById } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');
const { updateProduct } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');


productRouter.get('/', getAllProducts)

productRouter.get('/:productId', getProductById)

productRouter.post('/create', createProduct)

productRouter.patch('/update/:productId', updateProduct)

productRouter.delete('/delete/:productId', deleteProduct)


module.exports = productRouter