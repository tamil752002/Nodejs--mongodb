const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error: ", error.message); 
    
    setTimeout(() => process.exit(1), 3000); 
  }
};

module.exports = connectDb;
