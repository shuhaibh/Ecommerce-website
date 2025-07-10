const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available_count: {
    type: Number,
    default: 0,
  },
  image_url: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
