import express from "express";
import {
  validateResult,
  registerUserValidation,
} from "./middleware/validation.middleware.js";

const app = express();

app.use(express.json()); // IMPORTANT

app.post("/register", registerUserValidation(), validateResult, (req, res) => {
  const { username, email, password } = req.body;
  res
    .status(200)
    .json({
      message: "User registered successfully",
      username,
      email,
      password,
    });
});

export default app;
