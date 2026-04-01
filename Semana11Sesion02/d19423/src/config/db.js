const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        autoIndex: true
    });
    } catch (error) {
        console.error(error)
    }
    
    console.log(`MongoDB conectado: ${mongoose.connection.name}`);
}
module.exports = connectDB;