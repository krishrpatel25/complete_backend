import jwt from "jsonwebtoken";
import { musicModel } from "../models/music.model.js";
import { albumModel } from "../models/album.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createMusic(req, res) {
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
    artist: req.user.id,
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
}

export async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });
  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

export async function getAllMusic(req, res) {
  const musics = await musicModel
    .find()
    .skip(1)
    .limit(2)
    .populate("artist", "username email role");
  res
    .status(200)
    .json({ message: "Musics fetched successfully", musics: musics });
}

export async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email role");
  res
    .status(200)
    .json({ message: "Albums fetched successfully", albums: albums });
}
export async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("musics")
    .populate("artist", "username email role");
  res.status(200).json({ message: "Album fetched successfully", album: album });
}
