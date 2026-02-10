import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://yt-complete-backend:lNhgYs7ntNZF7bTd@yt-complete-backend.9vbwlma.mongodb.net/halley",
    );
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
