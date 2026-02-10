import express from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    return res.status(200).json({
      message: "Post created",
      user,
    });
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid" });
  }
});

export default router;
