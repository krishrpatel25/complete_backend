//server ne create karva
const express = require("express");

const app = express();
app.use(express.json());

const notes = [];

// get notes data from frontend and store in notes array
// GET /notes
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({ message: "Note created" });
});

// fetch notes data from notes array and send to frontend
// POST /notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes fetched",
    notes: notes,
  });
});

// delete note from notes array based on index
//DELETE /notes/:index
// index kem use thay body kem nai ????
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];
  res.status(200).json({ message: "Note deleted" });
});

// update note description based on index
// PATCH /notes/:index
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const description = req.body.description;
  notes[index].description = description;
  res.status(200).json({ message: "Note updated" });
});

module.exports = app;


