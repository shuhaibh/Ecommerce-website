const User = require('../models/User');
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const createToken = require('../utils/generateToken')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {}
    console.log(name, email, password);

    if(!name || !email || !password) {
      return res.status(400).json({error: "All fields are required"})
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    } 

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({ name, email, password: hashedPassword });

    const savedUser = await newUser.save()
    const userData = savedUser.toObject();
    delete userData.password;

    res.status(201).json({ message: 'Registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    console.log(email, password);

    if(!email || !password) {
      return res.status(400).json({error: "All fields are required"})
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(userExists)  

    const passwordMatch = await bcrypt.compare(password, userExists.password)
    console.log(passwordMatch, "passwordMatch");

    if(!passwordMatch) {
      return res.status(400).json({ error: "Not a valid password"})
    }

    const userObject = userExists.toObject()
    delete userObject.password
    const token = createToken(userExists._id, userExists.role, userExists.isSeller)

    const node_env = process.env.NODE_ENV

    userObject.token = token

    console.log(token)
    console.log(process.env.NODE_ENV)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({ message: 'Login successful', userObject });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({error: error.message|| "Internal server error"})
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("token")
    res.json({message:"User logout successful."})
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({error: error.message|| "Internal server error"})
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id 
    const userData = await User.findById(userId).select('-password');
    
    res.json({data: userData})
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message|| "Internal server error"})
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phoneNo, password, address, role } = req.body || {};
    const userId = req.user.id;

    const userData = await User.findByIdAndUpdate(userId, { name, email, phoneNo, password, address, role}, { new: true })
    const userObject = userData.toObject()
    delete userObject.password

    res.json({data: userObject, message:"User details updated."})
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({error: error.message|| "Internal server error"})
  }
};

const deleteUser = async (req, res,next) => {
  try {
    const userId = req.params?.userId
    if(!userId) {
      return res.status(400).json({ error: "User ID is required"});
    }

    const userData = await User.findByIdAndDelete(userId)
    if(!userData) {
      return res.status(404).json({ error: "User not found"});
    }

    res.json({message:"User deleted", deleteUser: userData._id})
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message|| "Internal server error"})
  }
};

const checkUser = async (req, res, next) => {
  try {
    res.json({message:"User authorized", loggedinUser: req.user.id })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message|| "Internal server error"})
  }
};

const becomeSeller = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isSeller) {
      return res.status(400).json({ message: 'Already a seller' });
    }

    user.isSeller = true;
    await user.save();

    const token = createToken(user._id, user.role, user.isSeller);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({
      message: 'You are now a seller',
      user: userObject
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to become seller' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteUser,
  checkUser,
  becomeSeller
};
