import jwt from "jsonwebtoken";
import { musicModel } from "../models/music.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createMusic(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don't have access to create music" });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Music file is required" });
    }

    const uploadResult = await uploadFile(req.file);

    const music = await musicModel.create({
      title,
      uri: uploadResult.url,
      artist: decoded.id,
    });

    return res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
