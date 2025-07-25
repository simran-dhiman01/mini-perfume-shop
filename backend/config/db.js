const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL  || 'mongodb://127.0.0.1:27017/perfume-store');
        console.log('mongodb connected successfully');

    } catch (error) {
        console.log(error.message);
    }
}
module.exports=connectDB;
