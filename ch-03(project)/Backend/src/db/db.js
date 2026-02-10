import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(
    process.env.MONGODB_URL,
  );
  console.log("connected to DB");
  
}