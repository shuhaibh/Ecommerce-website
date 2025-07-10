const express = require('express');
const paymentRouter = express.Router();
const { initiatePayment, confirmPayment } = require('../controllers/paymentController');

const authUser = require('../middlewares/authUser'); 

paymentRouter.post('/pay', authUser, initiatePayment);
paymentRouter.post('/confirm', authUser, confirmPayment); 

module.exports = paymentRouter;
