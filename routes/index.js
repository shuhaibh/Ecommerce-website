const express = require('express')
const router = express.Router()

const userRouter = require('./userRoute')
const productRouter = require('./productRoute')
const itemRouter = require('./itemRoute')
const cartRouter = require('./cartRoute')
const orderRouter = require('./orderRoute')
const sellerRouter = require('./sellerRoute')
const reviewRouter = require('./reviewRoute')
const adminRouter = require('./adminRoute')

router.use('/user', userRouter)
router.use('/products', productRouter)
router.use('/items', itemRouter)
router.use('/cart', cartRouter)
router.use('/orders', orderRouter)
router.use('/seller', sellerRouter)
router.use('/reviews', reviewRouter)
router.use('/admin', adminRouter)

module.exports = router