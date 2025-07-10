const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    minLength: [5, 'Email must be atleast 5 characters long'],
    maxLength: [100, 'Email cannot exceed 100 characters'],
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },

  phoneNo: {
    type: Number,
    required: false,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be atleast 8 characters long'],
    maxLength: [128, 'Password cannot exceed 128 characters']
  },

  address: {
    type: [String],
    default: [],
  },

  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user',
},

isSeller: {
  type: Boolean,
  default: false
}
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;