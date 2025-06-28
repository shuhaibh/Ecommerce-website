const mongoose = require('mongoose');

console.log(process.env.MONGODB_URL)

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);      
    } catch (error) {
        console.log(error)
    }

}

module.exports = connectDB