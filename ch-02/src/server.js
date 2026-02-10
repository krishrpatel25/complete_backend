import { app } from "./app.js";
import { connectDB } from "./db/db.js";

const startServer = async () => {
  await connectDB(); // 🔥 WAIT FOR DB

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
