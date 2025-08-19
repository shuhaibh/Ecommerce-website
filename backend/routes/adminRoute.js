const express = require('express');
const adminRouter = express.Router();

const { 
    getAllOrders, 
    getOrderDetails,
    updateOrderStatus,
    deleteOrder,
    getPendingProducts, 
    approveProduct, 
    rejectProduct,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controllers/adminController');

const authAdmin = require('../middlewares/authAdmin');

adminRouter.use(authAdmin);

// Product Management
adminRouter.get('/products', getPendingProducts);
adminRouter.patch('/products/approve/:productId', approveProduct);
adminRouter.patch('/products/reject/:productId', rejectProduct);

// Order Management
adminRouter.get('/orders', getAllOrders);
adminRouter.get('/orders/:orderId', getOrderDetails);
adminRouter.patch('/orders/:orderId', updateOrderStatus);
adminRouter.delete('/orders/:orderId', deleteOrder);

// User Management
adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:userId', getUserDetails);
adminRouter.patch('/users/:userId', updateUser);
adminRouter.delete('/users/:userId', deleteUser);

module.exports = adminRouter;