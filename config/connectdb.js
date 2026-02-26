import mongoose from "mongoose";

const connectdb = async () => {
  try {
    
    mongoose.connection.on("connected", () => {
      console.log(" Database connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);


  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};

export default connectdb;
