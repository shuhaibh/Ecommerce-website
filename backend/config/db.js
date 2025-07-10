const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);      
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDB