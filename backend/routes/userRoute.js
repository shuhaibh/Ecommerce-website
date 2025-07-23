const express = require('express');
const userRouter = express.Router();

const { 
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    upload, 
    deleteUser,
    checkUser,
    becomeSeller
} = require('../controllers/userController');

const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
userRouter.get('/profile', authUser, getProfile);

// This is the single, correct route for updating the profile with an image
userRouter.put('/update', authUser, upload.single('profileImage'), updateProfile);

userRouter.delete('/delete/:userId', authAdmin, deleteUser);
userRouter.get('/check-user', authUser, checkUser);
userRouter.patch('/become-seller', authUser, becomeSeller);
 
module.exports = userRouter;