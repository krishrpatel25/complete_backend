import express from "express";
import multer from "multer";
import "dotenv/config";
import { uploadFile } from "./service/storage.service.js";
import postModel from "./models/post.models.js";
import cors from "cors"
export const app = express();
app.use(cors())
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-posts", upload.single("image"), async (req, res) => {
  const result = await uploadFile(req.file.buffer);
  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });
  res.status(201).json({
    message: "post created",
    post,
  });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();
  res.status(200).json({    
    message: "all posts fetched",
    posts,
  });
});