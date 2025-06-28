const express = require('express')
const userRouter = express.Router()

const { register } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { logout } = require('../controllers/userController');
const { getProfile } = require('../controllers/userController');
const { updateProfile } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController');
const { checkUser } = require('../controllers/userController');

const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/logout', logout)

userRouter.get('/profile', authUser, getProfile)

userRouter.patch('/update', authUser, updateProfile)

userRouter.delete('/delete/:userId', authAdmin, deleteUser)

userRouter.get('/check-user', authUser,checkUser)

module.exports = userRouter