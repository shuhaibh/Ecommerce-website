const express = require('express');
const adminRouter = express.Router();

// Import controller functions
const { 
    getAllOrders, 
    getPendingProducts, 
    approveProduct, 
    rejectProduct,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/adminController');

// Import your admin authentication middleware
const authAdmin = require('../middlewares/authAdmin');

// Apply admin authentication to all routes in this file
adminRouter.use(authAdmin);

// --- Product Management ---
adminRouter.get('/products/pending', getPendingProducts);
adminRouter.patch('/products/approve/:productId', approveProduct);
adminRouter.patch('/products/reject/:productId', rejectProduct);

// --- Order Management ---
adminRouter.get('/orders', getAllOrders);

// --- User Management ---
adminRouter.get('/users', getAllUsers);
adminRouter.patch('/users/:userId', updateUser); // For updating roles
adminRouter.delete('/users/:userId', deleteUser);

module.exports = adminRouter;